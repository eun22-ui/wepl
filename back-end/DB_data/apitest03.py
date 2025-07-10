import requests
import asyncio
import aiohttp
import ssl
import json
import os

# API URLs
api_url_hug = "https://www.khug.or.kr/SelectListInfo.do?API_KEY=d052c5b0-c68d-407f-8ce4-ae3243973b57"
api_url_lh = "https://apis.data.go.kr/1613000/HWSPR02/rsdtRcritNtcList?serviceKey=f9H0sMaIgHzEwJXnMEvYztGW02vB4SWctsNPJJ3Kd9msWP6IBj%2BLsLdKH8I24UolAdaOaf5J%2BmJQh3x46foU5Q%3D%3D"

def get_hug_api():
    try:
        response = requests.get(api_url_hug, timeout=30)
        response.raise_for_status()
        data = response.json()
        file_path = os.path.abspath('hug_api.json')
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"HUG API JSON saved as {file_path}")
    except Exception as e:
        print(f"Error fetching HUG API: {e}")

async def get_lh_api():
    try:
        ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_CLIENT)
        ssl_context.check_hostname = False
        ssl_context.verify_mode = ssl.CERT_NONE
        ssl_context.set_ciphers('DEFAULT@SECLEVEL=1')
        connector = aiohttp.TCPConnector(ssl=ssl_context)
        async with aiohttp.ClientSession(connector=connector, timeout=aiohttp.ClientTimeout(total=30)) as session:
            async with session.get(api_url_lh) as response:
                response.raise_for_status()
                data = await response.json()
                file_path = os.path.abspath('lh_api.json')
                with open(file_path, 'w', encoding='utf-8') as f:
                    json.dump(data, f, ensure_ascii=False, indent=2)
                print(f"LH API JSON saved as {file_path}")
    except Exception as e:
        print(f"Error fetching LH API: {e}")

def main():
    get_hug_api()
    asyncio.run(get_lh_api())

if __name__ == "__main__":
    main()