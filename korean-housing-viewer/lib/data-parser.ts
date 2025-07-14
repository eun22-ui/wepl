// 데이터베이스 스키마에 맞춘 데이터 파싱 유틸리티

export interface HousingData {
  공고번호: number
  공고유형ID: number
  기관명: string
  지역자치명_도: string
  지역자치명_시: string
  상세주소: string
  공고시작일: string
  공고마감일: string
  건물타입: string
  url: string
  보증금: number
  월세: number
  한줄요약: string
  rawjson: any
}

/**
 * HTML에서 주택 데이터를 파싱하는 함수
 * 데이터베이스 스키마와 정확히 일치하는 구조로 파싱
 */
export function parseHousingData(htmlContent: string | Document): HousingData[] {
  let doc: Document

  if (typeof htmlContent === "string") {
    const parser = new DOMParser()
    doc = parser.parseFromString(htmlContent, "text/html")
  } else {
    doc = htmlContent
  }

  const housingItems = doc.querySelectorAll(".housing-item")
  const housingData: HousingData[] = []

  housingItems.forEach((item) => {
    const data: HousingData = {
      공고번호: Number.parseInt(item.getAttribute("data-공고번호") || "0"),
      공고유형ID: Number.parseInt(item.getAttribute("data-공고유형ID") || "0"),
      기관명: item.getAttribute("data-기관명") || "",
      지역자치명_도: item.getAttribute("data-지역자치명_도") || "",
      지역자치명_시: item.getAttribute("data-지역자치명_시") || "",
      상세주소: item.getAttribute("data-상세주소") || "",
      공고시작일: item.getAttribute("data-공고시작일") || "",
      공고마감일: item.getAttribute("data-공고마감일") || "",
      건물타입: item.getAttribute("data-건물타입") || "",
      url: item.getAttribute("data-url") || "",
      보증금: Number.parseFloat(item.getAttribute("data-보증금") || "0"),
      월세: Number.parseFloat(item.getAttribute("data-월세") || "0"),
      한줄요약: item.getAttribute("data-한줄요약") || "",
      rawjson: JSON.parse(item.getAttribute("data-rawjson") || "{}"),
    }

    housingData.push(data)
  })

  return housingData
}

/**
 * 필터 조건에 따라 주택 데이터를 필터링하는 함수
 */
export function filterHousingData(
  data: HousingData[],
  filters: {
    공고유형ID?: number
    지역자치명_도?: string
    지역자치명_시?: string
    건물타입?: string
    기관명?: string
  },
): HousingData[] {
  return data.filter((item) => {
    return (
      (!filters.공고유형ID || item.공고유형ID === filters.공고유형ID) &&
      (!filters.지역자치명_도 || item.지역자치명_도 === filters.지역자치명_도) &&
      (!filters.지역자치명_시 || item.지역자치명_시 === filters.지역자치명_시) &&
      (!filters.건물타입 || item.건물타입 === filters.건물타입) &&
      (!filters.기관명 || item.기관명 === filters.기관명)
    )
  })
}

/**
 * 고유한 값들을 추출하는 유틸리티 함수들
 */
export function getUnique지역자치명_도(data: HousingData[]): string[] {
  return [...new Set(data.map((item) => item.지역자치명_도))]
}

export function getUnique지역자치명_시(data: HousingData[], 도?: string): string[] {
  const filteredData = 도 ? data.filter((item) => item.지역자치명_도 === 도) : data
  return [...new Set(filteredData.map((item) => item.지역자치명_시))]
}

export function getUnique기관명(data: HousingData[]): string[] {
  return [...new Set(data.map((item) => item.기관명))]
}

export function getUnique건물타입(data: HousingData[]): string[] {
  return [...new Set(data.map((item) => item.건물타입))]
}

/**
 * 공고유형ID를 텍스트로 변환
 */
export const 공고유형매핑 = {
  1: "일반공급",
  2: "청년우선공급",
  3: "신혼부부우선공급",
  4: "다자녀우선공급",
}

export function get공고유형Text(공고유형ID: number): string {
  return 공고유형매핑[공고유형ID as keyof typeof 공고유형매핑] || "알 수 없음"
}
