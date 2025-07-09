import json
from datetime import datetime
import pymysql  

def parse_date(date_str):
    try:
        return datetime.strptime(date_str, "%Y%m%d").date()
    except Exception:
        return None

def insert_notices(data_list, start_id, conn):
    try:
        with conn.cursor() as cursor:
            for i, item in enumerate(data_list):
                공고번호 = start_id + i
                기관명 = item.get("suplyInsttNm", "")
                지역자치명_도 = item.get("brtcNm", "")
                지역자치명_시 = item.get("signguNm", "")
                상세주소 = item.get("fullAdres", "")[:20]
                공고시작일 = parse_date(item.get("beginDe", ""))
                공고마감일 = parse_date(item.get("endDe", ""))
                건물타입 = item.get("houseTyNm", "")
                공고유형 = item.get("suplyTyNm", "")
                url = item.get("pcUrl", "")
                보증금 = item.get("rentGtn", 0)
                월세 = item.get("mtRntchrg", 0)
                한줄요약 = ''
                소득 = 0
                가구원수 = 0
                주택보유여부 = 0
                자동차가액 = 0
                자산 = 0
                rawjson = json.dumps(item, ensure_ascii=False)

                sql = """
                INSERT INTO 공고 (
                    공고번호, 기관명, 지역자치명_도, 지역자치명_시, 상세주소,
                    공고시작일, 공고마감일, 건물타입, 공고유형, url,
                    보증금, 월세, 한줄요약, 소득, 가구원수,
                    주택보유여부, 자동차가액, 자산, rawjson
                ) VALUES (
                    %s, %s, %s, %s, %s,
                    %s, %s, %s, %s, %s,
                    %s, %s, %s, %s, %s,
                    %s, %s, %s, %s
                )
                """
                cursor.execute(sql, (
                    공고번호, 기관명, 지역자치명_도, 지역자치명_시, 상세주소,
                    공고시작일, 공고마감일, 건물타입, 공고유형, url,
                    보증금, 월세, 한줄요약, 소득, 가구원수,
                    주택보유여부, 자동차가액, 자산, rawjson
                ))
        conn.commit()
        print("데이터 삽입 완료 (총", len(data_list), "건)")
    except Exception as e:
        print("에러 발생:", e)
        conn.rollback()


def load_and_insert(file_path, json_path=None, start_id=1, conn=None):
    print(f" {file_path} → DB 삽입 시작")
    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    if json_path:  # 예: ["response", "body", "item"]
        for key in json_path:
            data = data.get(key, {})
        if isinstance(data, dict):  # 데이터가 dict인 경우 list로 강제 변환
            data = [data]

    insert_notices(data, start_id=start_id, conn=conn)


# ----------------- 실행부 -------------------------------

# 연결 예시
conn = pymysql.connect(
    host="127.0.0.1",
    user="root",
    password="mysql",
    database="wepl",
    charset="utf8mb4"
)

try:
    start_id = 1

    # LH
    load_and_insert("lh_api.json", json_path=["response", "body", "item"], start_id=start_id, conn=conn)
    start_id += 10000

    # SH
    load_and_insert("pdf_based_housing_data.json", json_path=None, start_id=start_id, conn=conn)
    start_id += 10000

    # HUG
    load_and_insert("hug_final_dndeonjeonse.json", json_path=None, start_id=start_id, conn=conn)

finally:
    conn.close()
