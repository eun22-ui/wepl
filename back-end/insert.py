import requests
import json
import pymysql
from datetime import datetime

# ✅ MySQL DB 설정
DB_CONFIG = {
    "host": "127.0.0.1",         # 또는 RDS 주소
    "user": "root",     # 사용자명
    "password": "mysql", # 비밀번호
    "database": "wepl",  # DB 이름
    "charset": "utf8mb4"
}

