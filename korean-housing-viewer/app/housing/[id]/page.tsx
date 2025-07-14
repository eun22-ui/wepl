"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Calendar, ExternalLink, Building, Hash, Globe } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Sample data matching your new database schema
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
  },
]

const 공급유형매핑 = {
  1: "일반공급",
  2: "청년우선공급",
  3: "신혼부부우선공급",
  4: "다자녀우선공급",
}

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
}

const getSupplyTypeColor = (typeId: number) => {
  switch (typeId) {
    case 1:
      return "bg-blue-100 text-blue-800 border-blue-200"
    case 2:
      return "bg-green-100 text-green-800 border-green-200"
    case 3:
      return "bg-pink-100 text-pink-800 border-pink-200"
    case 4:
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

export default function HousingDetail() {
  const params = useParams()
  const [housing, setHousing] = useState<HousingData | null>(null)

  useEffect(() => {
    const foundHousing = sampleHousingData.find((item) => item.notice_id === Number.parseInt(params.id as string))
    if (foundHousing) {
      setHousing(foundHousing)
    }
  }, [params.id])

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

  if (!housing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">공고를 찾을 수 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                목록으로
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {housing.region_province} {housing.region_city} {housing.house_type}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge className={`${getStatusColor(housing.status)} border`}>
                  {housing.status === "Y" ? "공고중" : "종료"}
                </Badge>
                <Badge className={`${getSupplyTypeColor(housing.supply_type_id)} border`}>
                  {공급유형매핑[housing.supply_type_id as keyof typeof 공급유형매핑]}
                </Badge>
                <Badge className={`${getHouseTypeColor(housing.house_type)} border`}>{housing.house_type}</Badge>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  기본 정보
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">공고번호:</span>
                    <span>{housing.notice_id}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">상태:</span>
                    <Badge className={`${getStatusColor(housing.status)} border text-xs`}>
                      {housing.status === "Y" ? "공고중" : "종료"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">위치:</span>
                    <span>
                      {housing.region_province} {housing.region_city}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">상세주소:</span>
                    <span>{housing.address_detail}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">신청시작일:</span>
                    <span>{formatDate(housing.apply_start)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">신청마감일:</span>
                    <span>{formatDate(housing.apply_end)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">주택유형:</span>
                    <Badge className={`${getHouseTypeColor(housing.house_type)} border text-xs`}>
                      {housing.house_type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">공급유형:</span>
                    <Badge className={`${getSupplyTypeColor(housing.supply_type_id)} border text-xs`}>
                      {공급유형매핑[housing.supply_type_id as keyof typeof 공급유형매핑]}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">주관기관:</span>
                    <span>{기관매핑[housing.agency_id as keyof typeof 기관매핑]}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">기관ID:</span>
                    <span>{housing.agency_id}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Price Information */}
            <Card>
              <CardHeader>
                <CardTitle>임대료 정보</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">보증금</p>
                    <p className="text-3xl font-bold text-blue-600">{formatCurrency(housing.deposit)}</p>
                    <p className="text-xs text-gray-500 mt-1">NUMERIC(14,2): {housing.deposit.toLocaleString()}</p>
                  </div>
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">월세</p>
                    <p className="text-3xl font-bold text-green-600">{formatCurrency(housing.monthly_rent)}</p>
                    <p className="text-xs text-gray-500 mt-1">NUMERIC(14,2): {housing.monthly_rent.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Application Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  신청 정보
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium">신청 URL:</span>
                    <div className="mt-1">
                      <a
                        href={housing.application_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline break-all"
                      >
                        {housing.application_url}
                      </a>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <span className="font-medium">신청 기간:</span>
                      <p className="text-gray-700">
                        {formatDate(housing.apply_start)} ~ {formatDate(housing.apply_end)}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium">신청 상태:</span>
                      <p className="text-gray-700">{housing.status === "Y" ? "현재 신청 접수 중" : "신청 접수 종료"}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Database Fields Summary */}
            <Card>
              <CardHeader>
                <CardTitle>데이터베이스 필드 정보</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">notice_id:</span>
                    <span className="font-mono">{housing.notice_id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">status:</span>
                    <span className="font-mono">'{housing.status}'</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">region_province:</span>
                    <span className="font-mono">'{housing.region_province}'</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">region_city:</span>
                    <span className="font-mono">'{housing.region_city}'</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">address_detail:</span>
                    <span className="font-mono">'{housing.address_detail}'</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">apply_start:</span>
                    <span className="font-mono">{housing.apply_start}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">apply_end:</span>
                    <span className="font-mono">{housing.apply_end}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">house_type:</span>
                    <span className="font-mono">'{housing.house_type}'</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">supply_type_id:</span>
                    <span className="font-mono">{housing.supply_type_id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">agency_id:</span>
                    <span className="font-mono">{housing.agency_id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">deposit:</span>
                    <span className="font-mono">{housing.deposit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">monthly_rent:</span>
                    <span className="font-mono">{housing.monthly_rent}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Application Button */}
            <Card>
              <CardContent className="p-6">
                <Button asChild className="w-full mb-4 h-auto" size="lg">
                  <a
                    href={housing.application_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center py-3 px-4 min-h-[60px]"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">신청하기</span>
                      <ExternalLink className="w-4 h-4" />
                    </div>
                    <span className="text-xs opacity-80 leading-tight">
                      {기관매핑[housing.agency_id as keyof typeof 기관매핑]}
                    </span>
                  </a>
                </Button>
                <p className="text-sm text-gray-600 text-center">신청 마감: {formatDate(housing.apply_end)}</p>
                {housing.status === "N" && (
                  <p className="text-sm text-red-600 text-center mt-2 font-medium">⚠️ 신청 접수가 종료되었습니다</p>
                )}
              </CardContent>
            </Card>

            {/* Summary Information */}
            <Card>
              <CardHeader>
                <CardTitle>공고 요약</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">공고번호</span>
                  <span className="font-semibold">{housing.notice_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">공급유형</span>
                  <span className="font-semibold">
                    {공급유형매핑[housing.supply_type_id as keyof typeof 공급유형매핑]}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">주택유형</span>
                  <span className="font-semibold">{housing.house_type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">주관기관</span>
                  <span className="font-semibold">{기관매핑[housing.agency_id as keyof typeof 기관매핑]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">상태</span>
                  <Badge className={`${getStatusColor(housing.status)} border text-xs`}>
                    {housing.status === "Y" ? "공고중" : "종료"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
