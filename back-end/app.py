from flask import Flask, jsonify
from flask_cors import CORS  # ← 추가
import pymysql
import boto3
import json
import os

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000", "http://54.180.202.149:3000"])

def get_db_connection():
    # 환경변수에서 값 가져오기
    secret_name = os.environ.get('AWS_SECRET_NAME')
    region_name = os.environ.get('AWS_REGION', 'ap-northeast-2')
    
    # AWS Secrets Manager에서 DB 정보 가져오기
    client = boto3.client('secretsmanager', region_name=region_name)
    response = client.get_secret_value(SecretId=secret_name)
    secret_data = json.loads(response['SecretString'])
    
    # DB 연결
    return pymysql.connect(
        host=secret_data["host"],
        user=secret_data["username"],
        password=secret_data["password"],
        database=secret_data["dbname"],
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
            sql = "SELECT * FROM 공고 JOIN 공고유형 ON 공고.공고유형ID = 공고유형.공고유형ID"  
            cursor.execute(sql)
            results = cursor.fetchall()
            print(results)  # 여기서 데이터 출력
    finally:
        conn.close()
    return jsonify(results)

if __name__ == '__main__':
    # 5000번 포트에서 Flask 서버 실행
    app.run(host='0.0.0.0', port=5000)




