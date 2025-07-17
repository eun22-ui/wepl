import pymysql
import time
from datetime import datetime, timedelta
from concurrent.futures import ThreadPoolExecutor

# DB 연결 및 쿼리 실행
def run_query():
    try:
        conn = pymysql.connect(
            host='aurora-test-instance-1.cd4gwa442142.ap-northeast-2.rds.amazonaws.com',  # 실제 RDS 엔드포인트로 교체
            user='admin',
            password='wepl1234',
            db='wepl',
            charset='utf8mb4',
            autocommit=True
        )
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM 공고 LIMIT 10;")  # 실제 read 쿼리로 변경
        conn.close()
        print(f"[{datetime.now()}] Query executed successfully.")
    except Exception as e:
        print(f"[{datetime.now()}] Query failed: {e}")

# 테스트 기간: 12시간
end_time = datetime.now() + timedelta(hours=12)

# 10분마다 실행
while datetime.now() < end_time:
    print(f"[{datetime.now()}] Starting RDS read test...")

    # 동시에 여러 연결 테스트 (ex: 10개)
    with ThreadPoolExecutor(max_workers=10) as executor:
        for _ in range(10):  # 동시 실행 수 (조정 가능)
            executor.submit(run_query)

    # 10분 대기
    time.sleep(600)
