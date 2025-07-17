import json
from datetime import datetime
import pymysql

def parse_date(date_str):
    try:
        return datetime.strptime(date_str, "%Y%m%d").date()
    except Exception:
        return None

def get_공고유형_id(유형명: str) -> int:
    mapping = {
        "매입임대": 1,
        "국민임대": 2,
        "안심주택": 3,
        "장기전세": 4,
        "행복주택": 5,
        "신혼신생아 전세임대": 6,
        "든든전세": 7
    }
    return mapping.get(유형명, None)

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
                공고유형명 = item.get("suplyTyNm", "")
                공고유형ID = get_공고유형_id(공고유형명)

                if 공고유형ID is None:
                    print(f"⚠️ 공고유형 '{공고유형명}' 매핑되지 않음 → 건너뜀")
                    continue

                url = item.get("pcUrl", "")
                보증금 = item.get("rentGtn", 0)
                월세 = item.get("mtRntchrg", 0)
                한줄요약 = ''
                rawjson = json.dumps(item, ensure_ascii=False)

                sql = """
                INSERT INTO 공고 (
                    공고번호, 공고유형ID, 기관명, 지역자치명_도, 지역자치명_시, 상세주소,
                    공고시작일, 공고마감일, 건물타입, url,
                    보증금, 월세, 한줄요약, rawjson
                ) VALUES (
                    %s, %s, %s, %s, %s, %s,
                    %s, %s, %s, %s,
                    %s, %s, %s, %s
                )
                """
                cursor.execute(sql, (
                    공고번호, 공고유형ID, 기관명, 지역자치명_도, 지역자치명_시, 상세주소,
                    공고시작일, 공고마감일, 건물타입, url,
                    보증금, 월세, 한줄요약, rawjson
                ))
        conn.commit()
        print("데이터 삽입 완료 (총", len(data_list), "건 중 유효:", cursor.rowcount, "건)")
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

conn = pymysql.connect(
    host="wepl-database-mysql.cd4gwa442142.ap-northeast-2.rds.amazonaws.com",
    user="admin",
    password="wepl1234",
    database="wepl",
    charset="utf8mb4"
)

try:
    start_id = 1

    # LH
#    load_and_insert("lh_api.json", json_path=["response", "body", "item"], start_id=start_id, conn=conn)
    start_id += 10000

    # SH
    load_and_insert("SH_housing_final.json", json_path=None, start_id=start_id, conn=conn)
    start_id += 10000

    # HUG
#    load_and_insert("hug_final_dndeonjeonse.json", json_path=None, start_id=start_id, conn=conn)

finally:
    conn.close()
