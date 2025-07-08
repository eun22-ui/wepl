import requests
import json
from datetime import datetime

def get_json_from_api(url: str):
    """
    Fetches JSON data from a given API URL and decodes it into a Python object.
    """
    try:
        response = requests.get(url)
        response.encoding = 'utf-8'
        response.raise_for_status()
        json_data = response.json()
        print("✅ JSON 데이터 수신 완료")
        return json_data

    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
        print(f"Response content: {response.text}")
    except requests.exceptions.ConnectionError as conn_err:
        print(f"Connection error occurred: {conn_err}")
    except requests.exceptions.Timeout as timeout_err:
        print(f"Timeout error occurred: {timeout_err}")
    except requests.exceptions.RequestException as req_err:
        print(f"Request exception: {req_err}")
    except json.JSONDecodeError as json_err:
        print(f"JSON decoding error: {json_err}")
        print(f"Raw response text: {response.text}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
    return None

def save_json_file(filename, data):
    try:
        with open(filename, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"📁 저장 완료: {filename}")
    except Exception as e:
        print(f"❌ 저장 실패: {e}")

def parse_hug_data(data):
    if not isinstance(data, list):
        print("⚠️ 예상과 다른 데이터 형식입니다.")
        return []

    parsed = []
    for item in data:
        try:
            begin_raw = item.get("SBSR_RCVI_SDT", "")
            end_raw = item.get("SBSR_RCVI_EDT", "")
            begin = datetime.strptime(begin_raw[:8], "%Y%m%d").strftime("%Y-%m-%d") if begin_raw else "-"
            end = datetime.strptime(end_raw[:8], "%Y%m%d").strftime("%Y-%m-%d") if end_raw else "-"
        except:
            begin, end = begin_raw, end_raw

        parsed_item = {
            "시도": item.get("AREA_DCD_NM", "없음"),
            "시군구": item.get("AREA_DTL_DCD_NM", "없음"),
            "모집시작일": begin,
            "모집종료일": end,
            "주택유형": item.get("PROP_KIND_CD2_NM", "없음"),
            "보증금": int(item.get("LEAS_GUAR_WN", 0)),
            "공급기관": "HUG"
        }
        parsed.append(parsed_item)
        print(parsed_item)

    return parsed

if __name__ == "__main__":
    api_url = "https://www.khug.or.kr/SelectListInfo.do?API_KEY=d052c5b0-c68d-407f-8ce4-ae3243973b57"

    data = get_json_from_api(api_url)

    if data:
        # 1. 원본 데이터 저장
        save_json_file("raw_data.json", data)

        # 2. 파싱
        parsed_data = parse_hug_data(data)

        # 3. 파싱 결과 저장
        save_json_file("parsed_result.json", parsed_data)
    else:
        print("❌ 데이터를 받아올 수 없습니다.")
