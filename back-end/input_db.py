import pymysql
from datetime import datetime

def calc_status(start_date, end_date):
    today = datetime.today().date()
    if start_date and today < start_date:
        return 'M'  # 모집전
    elif start_date and end_date and start_date <= today <= end_date:
        return 'Y'  # 모집중
    elif end_date and today > end_date:
        return 'N'  # 모집종료
    return 'M'

def insert_hug_data_to_wepl_mysql(host, user, password, database, data_list, agency_name):
    agency_id = 1 if agency_name == "HUG" else 2

    try:
        conn = pymysql.connect(
            host="",
            port=3306,  
            user=user,
            password=password,
            database=database,
            charset='utf8mb4'
        )
        cur = conn.cursor()

        # 테이블 이름 및 컬럼명에 맞춰 수정
        cur.execute("INSERT IGNORE INTO agency (agency_id, agency_name) VALUES (1, 'HUG')")
        cur.execute("INSERT IGNORE INTO agency (agency_id, agency_name) VALUES (2, 'LH')")
        # cur.execute("INSERT IGNORE INTO agency (agency_id, agency_name) VALUES (3, 'SH')")

        for item in data_list:
            start_date = None
            end_date = None
            try:
                start_date = datetime.strptime(item["모집시작일"], "%Y-%m-%d").date() if item["모집시작일"] != "-" else None
                end_date = datetime.strptime(item["모집종료일"], "%Y-%m-%d").date() if item["모집종료일"] != "-" else None
            except:
                pass

            status = calc_status(start_date, end_date)

            cur.execute("""
                INSERT INTO notice (
                    status,
                    region_province,
                    region_city,
                    address_detail,
                    apply_start,
                    apply_end,
                    house_type,
                    supply_type_id,
                    application_url,
                    deposit,
                    monthly_rent,
                    agency_id
                )
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                status,
                item.get("시도", ""),
                item.get("시군구", ""),
                None,
                start_date,
                end_date,
                item.get("주택유형", ""),
                None,
                None,
                item.get("보증금", 0),
                item.get("월세", 0),
                agency_id
            ))

        conn.commit()
        print(f"✅ {agency_name} 데이터 MySQL DB insert 완료")

    except Exception as e:
        print(f"❌ MySQL insert 실패: {e}")
    finally:
        conn.close()
