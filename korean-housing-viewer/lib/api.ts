export interface HousingItem {
  공고번호 : number;
  공고유형ID : number;
  기관명 : string;
  지역자치명_도 : string;
  지역자치명_시 : string;
  상세주소 : string;
  공고시작일 : string;
  공고마감일 : string;
  건물타입 : string;
  url : string;
  보증금 : string;
  월세 : string;
  한줄요약 : string;
  rawjson : JSON;
}

'use client';

export async function fetchHousingData(): Promise<HousingItem[]> {
  // console.log('API 호출 시작');
  const res = await fetch('http://localhost:5000/api/housings');
  if (!res.ok) throw new Error('Failed to fetch data');
  const data = await res.json();
  // console.log('받아온 데이터:', data);
  return data;
}
