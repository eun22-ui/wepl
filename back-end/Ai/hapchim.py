import json
import requests
import time
import os

# =============== Gemini 설정 ===============
GEMINI_API_KEY = "AIzaSyB_H9F0tkZYJS2hC9nuiFdiBI8gMysX57M"
GEMINI_MODEL = "models/gemini-1.5-flash"
GEMINI_API_URL = f"https://generativelanguage.googleapis.com/v1/{GEMINI_MODEL}:generateContent"

# =============== Heygen 설정 ===============
HEYGEN_API_KEY = os.getenv("HEYGEN_API_KEY", "MmJjNWNkZGViYmQyNDM0ZGFiYmZhY2M3NDM4YWNmZmUtMTc1MTUxNDU2Mg==")
GENERATE_URL = "https://api.heygen.com/v2/video/generate"
STATUS_URL = "https://api.heygen.com/v1/video_status.get"
HEADERS_HEYGEN = {
    "X-Api-Key": HEYGEN_API_KEY,
    "Content-Type": "application/json"
}

# =============== JSON 데이터 로드 ===============
with open("hug-olddata.json", "r", encoding="utf-8") as f:
    raw_data = json.load(f)

# =============== Gemini API 호출 함수 ===============
def call_gemini(prompt):
    headers = {
        "Content-Type": "application/json",
        "x-goog-api-key": GEMINI_API_KEY,
    }
    body = {
        "contents": [
            {"parts": [{"text": prompt}]}
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

# =============== Heygen 영상 생성 및 다운로드 함수 ===============
def generate_video(script_text):
    payload = {
        "caption": True,
        "dimension": {"width": 1280, "height": 720},
        "video_inputs": [
            {
                "character": {
                    "type": "avatar",
                    "avatar_id": "Annie_expressive12_public",
                    "avatar_style": "normal"
                },
                "voice": {
                    "type": "text",
                    "voice_id": "bef4755ca1f442359c2fe6420690c8f7",
                    "input_text": script_text
                },
                "background": {
                    "type": "video",
                    "video_asset_id": "c0178a77f6334f7d9dbb50b86a1e1661",
                    "play_style": "loop",
                    "fit": "cover"
                }
            }
        ]
    }
    resp = requests.post(GENERATE_URL, headers=HEADERS_HEYGEN, json=payload)
    if resp.status_code != 200:
        print(":x: 생성 요청 실패:", resp.status_code, resp.text)
        return None
    data = resp.json().get("data", {})
    return data.get("video_id")

def check_status(video_id):
    resp = requests.get(STATUS_URL, headers=HEADERS_HEYGEN, params={"video_id": video_id})
    if resp.status_code != 200:
        print(":x: 상태 조회 실패:", resp.status_code, resp.text)
        return None
    return resp.json().get("data", {})

def download_by_url(url, filename):
    print(f"📥 다운로드 시작 → {filename}")
    resp = requests.get(url, stream=True)
    if resp.status_code == 200:
        with open(filename, "wb") as f:
            for chunk in resp.iter_content(8192):
                f.write(chunk)
        print(f"✅ 다운로드 완료: {filename}")
    else:
        print(":x: 다운로드 실패:", resp.status_code)

# =============== 메인 루프 ===============
for i, item in enumerate(raw_data[:10], 1):  # 상위 10개만
    try:
        area = item.get("AREA_DTL_DCD_NM", "지역 정보 없음")
        prop_type = item.get("PROP_KIND_CD2_NM", "주택 유형 없음")
        size = item.get("EXUS_ARA", "0")
        deposit = int(item.get("LEAS_GUAR_WN", "0"))

        prompt = (
            f"{area}에 위치한 {prop_type}, 전용면적 {size}㎡, "
            f"보증금은 {deposit:,}원입니다. "
            "이 정보를 사용자에게 친절하게 설명하는 문장으로 바꿔줘."
        )

        print(f"\n[{i}] 📝 Gemini 요청 → {prompt}")
        script_text = call_gemini(prompt)
        print(f"[{i}] ✏️ Gemini 결과 → {script_text}")

        # 영상 생성
        print(f"[{i}] 🎬 Heygen 영상 생성 요청...")
        vid = generate_video(script_text)
        if not vid:
            continue

        # 상태 확인
        for attempt in range(1):
            time.sleep(20)
            data = check_status(vid)
            if not data:
                break
            status = data.get("status")
            print(f"[{i}] {attempt+1}/15 ⏳ 현재 상태: {status}")
            if status == "completed":
                url = data.get("video_url_caption") or data.get("caption_video_url") or data.get("captioned_video_url")
                if url:
                    filename = f"captioned_{i}.mp4"
                    download_by_url(url, filename)
                else:
                    print(":x: 자막 포함 URL을 찾을 수 없습니다.")
                break
            elif status == "failed":
                print(":x: 생성 실패:", data.get("error"))
                break
        else:
            print(":x: 최대 재시도 초과 — 영상 생성 실패.")

    except Exception as e:
        print(f"[{i}] ❌ 오류 발생: {e}")

    time.sleep(10)  # Gemini 간 5초 딜레이
