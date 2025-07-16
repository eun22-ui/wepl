import pymysql
from concurrent.futures import ThreadPoolExecutor

def run_query():
    conn = pymysql.connect(
        host='127.0.0.1',
        user='admin',
        password='wepl1234',
        db='wepl',
        charset='utf8mb4',
        autocommit=True
    )
    with conn.cursor() as cursor:
        cursor.execute("SELECT SLEEP(1);")  # 부하 테스트용 쿼리
    conn.close()

with ThreadPoolExecutor(max_workers=50) as executor:
    for _ in range(1000):
        executor.submit(run_query)
