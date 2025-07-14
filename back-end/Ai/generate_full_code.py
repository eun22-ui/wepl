import os
import time
import requests
import json

API_KEY = os.getenv("HEYGEN_API_KEY", "MmJjNWNkZGViYmQyNDM0ZGFiYmZhY2M3NDM4YWNmZmUtMTc1MTUxNDU2Mg==")

GENERATE_URL = "https://api.heygen.com/v2/video/generate"
STATUS_URL = "https://api.heygen.com/v1/video_status.get"
HEADERS = {
    "X-Api-Key": API_KEY,
    "Content-Type": "application/json"
}

payload = {
    "caption": True,
    "dimension": {"width": 1280, "height": 720},
    "video_inputs": [
        {
            "character": {
                "type": "avatar",
                "avatar_id": "Annie_expressive12_public",  # 원하는 아바타 ID
                "avatar_style": "normal"
            },
            "voice": {
                "type": "text",
                "voice_id": "bef4755ca1f442359c2fe6420690c8f7",  # 원하는 음성 ID
                "input_text": """이 곳에 스크립트를 넣어주세요."""
            },
            "background": {
                "type": "video",
                "video_asset_id": "c0178a77f6334f7d9dbb50b86a1e1661",  # 지정한 video_asset_id
                "play_style": "loop",
                "fit": "cover"
            }
        }
    ]
}

def generate_video():
    print("▶️ 영상 생성 요청 중...")
    resp = requests.post(GENERATE_URL, headers=HEADERS, json=payload)
    if resp.status_code != 200:
        print("❌ 생성 요청 실패:", resp.status_code, resp.text)
        return None
    data = resp.json().get("data", {})
    vid = data.get("video_id")
    if vid:
        print("✅ 생성 요청 성공! video_id:", vid)
        with open("response_generate.json", "w", encoding="utf-8") as f:
            json.dump(data, f, indent=4, ensure_ascii=False)
    else:
        print("❌ video_id를 찾을 수 없음:", data)
    return vid

def check_status(video_id):
    resp = requests.get(STATUS_URL, headers=HEADERS, params={"video_id": video_id})
    if resp.status_code != 200:
        print("❌ 상태 조회 실패:", resp.status_code, resp.text)
        return None
    return resp.json().get("data", {})

def download_by_url(url, filename):
    print(f"📥 다운로드 시작 → {filename}")
    resp = requests.get(url, stream=True)
    if resp.status_code == 200:
        with open(filename, "wb") as f:
            for chunk in resp.iter_content(8192):
                f.write(chunk)
        print("✅ 다운로드 완료:", filename)
    else:
        print("❌ 다운로드 실패:", resp.status_code)

def main():
    vid = generate_video()
    if not vid:
        return

    for attempt in range(15):
        time.sleep(20)
        data = check_status(vid)
        if not data:
            return
        status = data.get("status")
        print(f"{attempt+1}/15 ▶ 현재 상태: {status}")
        if status == "completed":
            caption_url = data.get("video_url_caption") or data.get("caption_video_url") or data.get("captioned_video_url")
            if caption_url:
                download_by_url(caption_url, "captioned_video.mp4")
            else:
                print("❌ 자막 포함 URL을 찾을 수 없습니다.")
            return
        elif status == "failed":
            print("❌ 생성 실패:", data.get("error"))
            return
    print("❌ 최대 재시도 초과 — 영상 생성 완료되지 않았습니다.")

if __name__ == "__main__":
    main()