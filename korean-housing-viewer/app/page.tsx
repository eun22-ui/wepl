"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
// import { HousingList }  from "@/components/ui/db"
import { MapPin, Calendar, ExternalLink, Filter, X } from "lucide-react"
import Link from "next/link"
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


// Sample data with income/asset requirements added
const sampleHousingData = [
  {
    notice_id: 1,
    status: "Y",
    region_province: "서울특별시",
    region_city: "강남구",
    address_detail: "테헤란로 123",
    apply_start: "2024-01-15",
    apply_end: "2024-01-25",
    house_type: "아파트",
    supply_type_id: 1,
    application_url: "https://apply.lh.or.kr",
    deposit: 35000000,
    monthly_rent: 350000,
    agency_id: 1,
    // Added eligibility requirements
    income_limit: 7000, // 만원
    asset_limit: 28800, // 만원
    vehicle_limit: 3496, // 만원
  },
  {
    notice_id: 2,
    status: "Y",
    region_province: "서울특별시",
    region_city: "마포구",
    address_detail: "월드컵로 456",
    apply_start: "2024-01-20",
    apply_end: "2024-01-30",
    house_type: "아파트",
    supply_type_id: 2,
    application_url: "https://apply.sh.or.kr",
    deposit: 25000000,
    monthly_rent: 280000,
    agency_id: 2,
    income_limit: 5000,
    asset_limit: 20000,
    vehicle_limit: 2500,
  },
  {
    notice_id: 3,
    status: "N",
    region_province: "부산광역시",
    region_city: "해운대구",
    address_detail: "해운대해변로 789",
    apply_start: "2024-02-01",
    apply_end: "2024-02-10",
    house_type: "연립주택",
    supply_type_id: 3,
    application_url: "https://apply.bmc.or.kr",
    deposit: 20000000,
    monthly_rent: 220000,
    agency_id: 3,
    income_limit: 6000,
    asset_limit: 25000,
    vehicle_limit: 3000,
  },
  {
    notice_id: 4,
    status: "Y",
    region_province: "인천광역시",
    region_city: "연수구",
    address_detail: "컨벤시아대로 321",
    apply_start: "2024-02-15",
    apply_end: "2024-02-25",
    house_type: "다가구주택",
    supply_type_id: 1,
    application_url: "https://apply.imc.or.kr",
    deposit: 18000000,
    monthly_rent: 200000,
    agency_id: 4,
    income_limit: 5500,
    asset_limit: 22000,
    vehicle_limit: 2800,
  },
]

// 공급유형 매핑 (supply_type_id -> 텍스트)
const 공급유형매핑 = {
  1: "일반공급",
  2: "청년우선공급",
  3: "신혼부부우선공급",
  4: "다자녀우선공급",
}

// 기관 매핑 (agency_id -> 텍스트)
const 기관매핑 = {
  1: "LH한국토지주택공사",
  2: "SH서울주택도시공사",
  3: "부산도시공사",
  4: "인천도시공사",
}

interface HousingData {
  notice_id: number
  status: string
  region_province: string
  region_city: string
  address_detail: string
  apply_start: string
  apply_end: string
  house_type: string
  supply_type_id: number
  application_url: string
  deposit: number
  monthly_rent: number
  agency_id: number
  income_limit: number
  asset_limit: number
  vehicle_limit: number
}

// Color coding functions
const getSupplyTypeColor = (typeId: number) => {
  switch (typeId) {
    case 1: // 일반공급
      return "bg-blue-100 text-blue-800 border-blue-200"
    case 2: // 청년우선공급
      return "bg-green-100 text-green-800 border-green-200"
    case 3: // 신혼부부우선공급
      return "bg-pink-100 text-pink-800 border-pink-200"
    case 4: // 다자녀우선공급
      return "bg-purple-100 text-purple-800 border-purple-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getHouseTypeColor = (type: string) => {
  switch (type) {
    case "아파트":
      return "bg-indigo-100 text-indigo-800 border-indigo-200"
    case "연립주택":
      return "bg-orange-100 text-orange-800 border-orange-200"
    case "다가구주택":
      return "bg-teal-100 text-teal-800 border-teal-200"
    case "단독주택":
      return "bg-amber-100 text-amber-800 border-amber-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getStatusColor = (status: string) => {
  return status === "Y" ? "bg-green-100 text-green-800 border-green-200" : "bg-red-100 text-red-800 border-red-200"
}

export default function HousingViewer() {
  const [housingData, setHousingData] = useState<HousingData[]>([])
  const [filteredData, setFilteredData] = useState<HousingData[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    supply_type_id: "",
    region_province: "",
    region_city: "",
    house_type: "",
    income: "", // 월 소득
    asset: "", // 총 자산
    vehicle: "", // 보유차량가액
  })

  useEffect(() => {
    // In a real implementation, this would parse HTML data
    setHousingData(sampleHousingData)
    setFilteredData(sampleHousingData)
  }, [])

  useEffect(() => {
    const filtered = housingData.filter((item) => {
      // Income/asset/vehicle filtering - user must meet the limits
      const incomeMatch = !filters.income || item.income_limit >= Number.parseInt(filters.income)
      const assetMatch = !filters.asset || item.asset_limit >= Number.parseInt(filters.asset)
      const vehicleMatch = !filters.vehicle || item.vehicle_limit >= Number.parseInt(filters.vehicle)

      return (
        (!filters.supply_type_id || item.supply_type_id === Number.parseInt(filters.supply_type_id)) &&
        (!filters.region_province || item.region_province === filters.region_province) &&
        (!filters.region_city || item.region_city === filters.region_city) &&
        (!filters.house_type || item.house_type === filters.house_type) &&
        incomeMatch &&
        assetMatch &&
        vehicleMatch
      )
    })
    setFilteredData(filtered)
  }, [filters, housingData])

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      supply_type_id: "",
      region_province: "",
      region_city: "",
      house_type: "",
      income: "",
      asset: "",
      vehicle: "",
    })
  }

  const uniqueProvinces = [...new Set(housingData.map((item) => item.region_province))]
  const uniqueCities = [
    ...new Set(
      housingData
        .filter((item) => !filters.region_province || item.region_province === filters.region_province)
        .map((item) => item.region_city),
    ),
  ]
  const uniqueHouseTypes = [...new Set(housingData.map((item) => item.house_type))]

  const formatDate = (dateString: string) => {
    return dateString.replace(/-/g, ".")
  }

  const formatCurrency = (amount: number) => {
    if (amount >= 100000000) {
      return `${(amount / 100000000).toFixed(1)}억원`
    } else if (amount >= 10000) {
      return `${(amount / 10000).toFixed(0)}만원`
    } else {
      return `${amount.toLocaleString()}원`
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
       <HousingList />
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="pl-3">
              <h1 className="text-3xl font-bold text-gray-900">한눈에 공공임대</h1>
              <p className="text-gray-600 mt-2">LH, SH, HUG 주택공고를 한곳에서</p>
            </div>
            <Button
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden flex items-center gap-2"
              variant="outline">
              <Filter className="w-4 h-4" /> 
              필터
            </Button>
          </div>
        </div>
      </header>

      <div className="lg:flex lg:gap-4 lg:max-w-7xl lg:mx-auto lg:px-4 lg:py-8">
        {/* Floating Filter Panel - positioned relative to content, not viewport */}
        <div className="lg:w-80 lg:flex-shrink-0">
          <div
            className={`lg:sticky lg:top-8 lg:block ${
              isFilterOpen ? "fixed inset-0 z-50 flex items-start justify-start p-4 lg:p-0" : "hidden"
            }`}
          >
            <Card className="w-full max-w-sm lg:max-w-none shadow-xl border border-gray-200 bg-white lg:shadow-lg max-h-[calc(100vh-6rem)] lg:max-h-[calc(100vh-4rem)]">
              <div className="h-full overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">필터</h2>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={clearFilters} className="text-xs bg-transparent">
                        초기화
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setIsFilterOpen(false)} className="lg:hidden">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">공고유형</label>
                      <Select
                        value={filters.supply_type_id}
                        onValueChange={(value) => handleFilterChange("supply_type_id", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="선택하세요" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">일반공급</SelectItem>
                          <SelectItem value="2">청년우선공급</SelectItem>
                          <SelectItem value="3">신혼부부우선공급</SelectItem>
                          <SelectItem value="4">다자녀우선공급</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">지역 - 시/도</label>
                      <Select
                        value={filters.region_province}
                        onValueChange={(value) => handleFilterChange("region_province", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="선택하세요" />
                        </SelectTrigger>
                        <SelectContent>
                          {uniqueProvinces.map((province) => (
                            <SelectItem key={province} value={province}>
                              {province}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">지역 - 시/군/구</label>
                      <Select
                        value={filters.region_city}
                        onValueChange={(value) => handleFilterChange("region_city", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="선택하세요" />
                        </SelectTrigger>
                        <SelectContent>
                          {uniqueCities.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">주택 유형</label>
                      <Select
                        value={filters.house_type}
                        onValueChange={(value) => handleFilterChange("house_type", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="선택하세요" />
                        </SelectTrigger>
                        <SelectContent>
                          {uniqueHouseTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">월 소득 (만원)</label>
                      <Input
                        type="number"
                        placeholder="예: 5000"
                        value={filters.income}
                        onChange={(e) => handleFilterChange("income", e.target.value)}
                      />
                      <p className="text-xs text-gray-500 mt-1">입력한 소득 이하로 제한된 공고만 표시</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">총 자산 (만원)</label>
                      <Input
                        type="number"
                        placeholder="예: 20000"
                        value={filters.asset}
                        onChange={(e) => handleFilterChange("asset", e.target.value)}
                      />
                      <p className="text-xs text-gray-500 mt-1">입력한 자산 이하로 제한된 공고만 표시</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">보유차량가액 (만원)</label>
                      <Input
                        type="number"
                        placeholder="예: 3000"
                        value={filters.vehicle}
                        onChange={(e) => handleFilterChange("vehicle", e.target.value)}
                      />
                      <p className="text-xs text-gray-500 mt-1">입력한 차량가액 이하로 제한된 공고만 표시</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Overlay for mobile */}
        {isFilterOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setIsFilterOpen(false)} />
        )}

        {/* Main Content */}
        <div className="flex-1 lg:ml-4">
          <div className="max-w-4xl mx-auto px-0 py-0">
            {/* Results */}
            <div className="mb-6">
              <p className="text-gray-600">
                총 <span className="font-semibold text-blue-600">{filteredData.length}</span>개의 공고가 있습니다.
              </p>
            </div>

            {/* Housing Cards */}
            <div className="space-y-4">
              {filteredData.map((housing) => (
                <Card key={housing.notice_id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-xl font-semibold flex-1 pr-4">
                            {housing.region_province} {housing.region_city} {housing.house_type}
                          </h3>
                          <div className="flex gap-2 flex-shrink-0">
                            <Badge className={`${getStatusColor(housing.status)} border`}>
                              {housing.status === "Y" ? "공고중" : "종료"}
                            </Badge>
                            <Badge className={`${getSupplyTypeColor(housing.supply_type_id)} border`}>
                              {공급유형매핑[housing.supply_type_id as keyof typeof 공급유형매핑]}
                            </Badge>
                            <Badge className={`${getHouseTypeColor(housing.house_type)} border`}>
                              {housing.house_type}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>
                              {housing.region_province} {housing.region_city}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {formatDate(housing.apply_start)} ~ {formatDate(housing.apply_end)}
                            </span>
                          </div>
                        </div>

                        <p className="text-gray-700 mb-3">{housing.address_detail}</p>
                        <p className="text-sm text-gray-600 mb-3">
                          주관기관: {기관매핑[housing.agency_id as keyof typeof 기관매핑]}
                        </p>

                        <div className="flex gap-4 text-sm mb-3">
                          <span>
                            보증금: <strong>{formatCurrency(housing.deposit)}</strong>
                          </span>
                          <span>
                            월세: <strong>{formatCurrency(housing.monthly_rent)}</strong>
                          </span>
                        </div>

                        <div className="flex gap-4 text-xs text-gray-500">
                          <span>소득한도: {housing.income_limit.toLocaleString()}만원</span>
                          <span>자산한도: {housing.asset_limit.toLocaleString()}만원</span>
                          <span>차량가액: {housing.vehicle_limit.toLocaleString()}만원</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 ml-6">
                        <Link href={`/housing/${housing.notice_id}`}>
                          <Button variant="outline" className="w-full bg-transparent">
                            상세보기
                          </Button>
                        </Link>
                        <Button asChild className="h-auto">
                          <a
                            href={housing.application_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center justify-center py-2 px-3 min-h-[44px]"
                          >
                            <div className="flex items-center gap-1 mb-0.5">
                              <span className="text-sm font-medium">신청하기</span>
                              <ExternalLink className="w-3 h-3" />
                            </div>
                            <span className="text-xs opacity-70 leading-tight">
                              {기관매핑[housing.agency_id as keyof typeof 기관매핑]}
                            </span>
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredData.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">조건에 맞는 공고가 없습니다.</p>
                <Button variant="outline" onClick={clearFilters} className="mt-4 bg-transparent">
                  필터 초기화
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
