'use client';

import { useEffect, useState } from 'react';
import { fetchHousingData, HousingItem } from "@/lib/api"; 

export function HousingList() {
  const [data, setData] = useState<HousingItem[] | null>(null);

  useEffect(() => {
    console.log('🏁 useEffect 실행됨');
    fetchHousingData()
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return <div>Loading housing data...</div>;

  return (
    <div className="grid gap-4 p-4">
      {data.map((item) => (
        <div key={item.공고번호} className="border p-4 rounded shadow">
          <h2 className="text-lg font-bold">{item.공고유형ID} {item.지역자치명_도}</h2>
          <p>{item.지역자치명_도}</p>
          <p>📅 신청기간: {item.공고시작일} ~ {item.공고마감일}</p>
          <p>🏠 유형: {item.건물타입}</p>
          <p>💰 보증금: {item.보증금.toLocaleString()}원 / 월세: {item.월세.toLocaleString()}원</p>
          <a href={item.url} target="_blank" className="text-blue-600 underline">신청하러 가기</a>
        </div>
      ))}
    </div>
  );
}
