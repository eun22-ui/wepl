import json
import requests
import time

# ✅ Gemini API 설정
GEMINI_API_KEY = "AIzaSyAT8J767N1WIzQHqqvQO1WC9r1xTNVmVqk"
GEMINI_MODEL = "models/gemini-1.5-flash"
GEMINI_API_URL = f"https://generativelanguage.googleapis.com/v1/{GEMINI_MODEL}:generateContent"

# ✅ JSON 파일 로드
with open("hug-olddata.json", "r", encoding="utf-8") as f:
    raw_data = json.load(f)

# ✅ Gemini API 호출 함수
def call_gemini(prompt):
    headers = {
        "Content-Type": "application/json",
        "x-goog-api-key": GEMINI_API_KEY,
    }

    body = {
        "contents": [
            {
                "parts": [
                    {
                        "text": prompt
                    }
                ]
            }
        ]
    }

    response = requests.post(GEMINI_API_URL, headers=headers, json=body)

    if response.status_code == 200:
        try:
            return response.json()["candidates"][0]["content"]["parts"][0]["text"]
        except Exception as e:
            return f"⚠️ 응답 파싱 실패: {e}"
    else:
        return f"❌ API 호출 실패: {response.status_code} - {response.text}"

# ✅ 문장 생성 루프
print("📦 Gemini Flash 모델로 문장 생성 중...\n")

for i, item in enumerate(raw_data[:10], 1):  # 상위 10개 항목 처리
    try:
        area = item.get("AREA_DTL_DCD_NM", "지역 정보 없음")
        prop_type = item.get("PROP_KIND_CD2_NM", "주택 유형 없음")
        size = item.get("EXUS_ARA", "0")
        deposit = int(item.get("LEAS_GUAR_WN", "0"))

        # 자연어 프롬프트 생성
        prompt = (
            f"{area}에 위치한 {prop_type}, 전용면적 {size}㎡, "
            f"보증금은 {deposit:,}원입니다. "
            "이 정보를 사용자에게 친절하게 설명하는 문장으로 바꿔줘."
        )

        print(f"[{i}] 요청 중... ➡️ {prompt}".encode('utf-8', errors='ignore').decode('utf-8'))
        result = call_gemini(prompt)
        print(f"[{i}] 📝 결과: {result}".encode('utf-8', errors='ignore').decode('utf-8'))
        print()

        time.sleep(5)  # 5초 간격 요청

    except Exception as e:
        print(f"[{i}] ❌ 오류 발생: {e}")
