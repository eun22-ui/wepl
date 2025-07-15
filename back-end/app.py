from flask import Flask, jsonify
from flask_cors import CORS  # ← 추가
import pymysql

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000", "http://192.168.56.1:3000"])

def get_db_connection():
    return pymysql.connect(
          host="127.0.0.1",
          user="root",
          password="mysql",
          database="wepl",
          charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )


@app.route('/')
def index():
    return "Flask 백엔드가 실행 중입니다. /api/housings를 호출하세요."


@app.route('/api/housings', methods=['GET'])
def get_housings():
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            sql = "SELECT * FROM 공고"  # 본인 테이블명으로 바꾸기
            cursor.execute(sql)
            results = cursor.fetchall()
            # print(results)  # 여기서 데이터 출력
    finally:
        conn.close()
    return jsonify(results)

if __name__ == '__main__':
    # 5000번 포트에서 Flask 서버 실행
    app.run(host='0.0.0.0', port=5000)




