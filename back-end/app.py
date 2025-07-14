from flask import Flask, jsonify
import pymysql

app = Flask(__name__)

def get_db_connection():
    return pymysql.connect(
          host="127.0.0.1",
          user="root",
          password="mysql",
          database="wepl",
          charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )

@app.route('/api/housings', methods=['GET'])
def get_housings():
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            sql = "SELECT * FROM 공고"  # 본인 테이블명으로 바꾸기
            cursor.execute(sql)
            results = cursor.fetchall()
            print(results)  # 여기서 데이터 출력
    finally:
        conn.close()
    return jsonify(results)

if __name__ == '__main__':
    # 5000번 포트에서 Flask 서버 실행
    app.run(host='0.0.0.0', port=5000)
