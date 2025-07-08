"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { MapPin, Users, DollarSign, Phone, ExternalLink } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import LoginModal from "./login-modal"
import ListingDetail from "./listing-detail"

interface HousingListing {
  id: string
  name: string
  address: string
  city: string
  type: string
  bedrooms: number
  rent: number
  waitlistOpen: boolean
  description: string
  phone: string
  website?: string
  thumbnailUrl: string
  images: string[]
  buildingSpecs: {
    totalFloors: number
    totalUnits: number
    buildYear: number
    parkingSpaces: number
    elevators: number
    heatingType: string
    structure: string
  }
  services: string[]
  nearbyFacilities: {
    category: string
    name: string
    distance: string
    walkTime: number
  }[]
  eligibilityRequirements: {
    maxIncome: number
    minAge?: number
    maxAge?: number
    familySize?: number[]
    veteranPreference?: boolean
    disabilityPreference?: boolean
    seniorPreference?: boolean
    workingFamilyPreference?: boolean
  }
}

const housingListings: HousingListing[] = [
  {
    id: "1",
    name: "강변 행복주택",
    address: "서울시 강동구 천호대로 1234",
    city: "서울",
    type: "신혼부부·청년",
    bedrooms: 2,
    rent: 450000,
    waitlistOpen: true,
    description:
      "전용면적 59㎡, 지하철역까지 도보 8분. 한강이 인근에 있어 쾌적한 주거환경을 제공하며, 신혼부부와 청년층을 위한 맞춤형 주택입니다. 최신 시설과 편의시설이 완비되어 있어 편리한 생활이 가능합니다.",
    phone: "02-1234-5678",
    website: "https://example.com",
    thumbnailUrl: "/images/apartment1.jpg",
    images: ["/images/apartment1.jpg", "/images/apartment2.jpg", "/images/apartment3.jpg", "/images/apartment4.jpg"],
    buildingSpecs: {
      totalFloors: 15,
      totalUnits: 120,
      buildYear: 2022,
      parkingSpaces: 80,
      elevators: 2,
      heatingType: "지역난방",
      structure: "철근콘크리트",
    },
    services: [
      "주차장",
      "인터넷",
      "보안시스템",
      "엘리베이터",
      "관리사무소",
      "택배보관함",
      "피트니스센터",
      "커뮤니티룸",
      "어린이놀이터",
      "CCTV",
    ],
    nearbyFacilities: [
      { category: "교육", name: "천호초등학교", distance: "300m", walkTime: 4 },
      { category: "교육", name: "강동중학교", distance: "500m", walkTime: 6 },
      { category: "쇼핑", name: "롯데마트", distance: "800m", walkTime: 10 },
      { category: "쇼핑", name: "천호시장", distance: "400m", walkTime: 5 },
      { category: "의료", name: "강동성심병원", distance: "1.2km", walkTime: 15 },
      { category: "교통", name: "천호역 버스정류장", distance: "200m", walkTime: 3 },
      { category: "지하철", name: "천호역(5,8호선)", distance: "600m", walkTime: 8 },
      { category: "공원", name: "한강공원", distance: "1km", walkTime: 12 },
    ],
    eligibilityRequirements: {
      maxIncome: 4500000,
      familySize: [2, 3, 4],
      workingFamilyPreference: true,
    },
  },
  {
    id: "2",
    name: "은빛마을 시니어하우스",
    address: "서울시 노원구 상계로 567",
    city: "서울",
    type: "고령자",
    bedrooms: 1,
    rent: 320000,
    waitlistOpen: true,
    description: "전용면적 39㎡, 지하철역까지 도보 12분",
    phone: "02-2345-6789",
    thumbnailUrl: "/images/apartment2.jpg",
    images: [],
    buildingSpecs: {
      totalFloors: 8,
      totalUnits: 60,
      buildYear: 2018,
      parkingSpaces: 40,
      elevators: 1,
      heatingType: "개별난방",
      structure: "벽돌조",
    },
    services: ["주차장", "인터넷", "보안시스템", "엘리베이터", "관리사무소", "택배보관함", "경로당", "실버케어 서비스"],
    nearbyFacilities: [
      { category: "교육", name: "상계고등학교", distance: "700m", walkTime: 9 },
      { category: "쇼핑", name: "롯데백화점", distance: "1km", walkTime: 13 },
      { category: "의료", name: "노원 을지대학교병원", distance: "1.5km", walkTime: 18 },
      { category: "교통", name: "상계역 버스정류장", distance: "300m", walkTime: 4 },
      { category: "지하철", name: "상계역(4호선)", distance: "900m", walkTime: 11 },
      { category: "공원", name: "수락산", distance: "2km", walkTime: 25 },
    ],
    eligibilityRequirements: {
      maxIncome: 3200000,
      minAge: 65,
      seniorPreference: true,
    },
  },
  {
    id: "3",
    name: "보훈 아파트",
    address: "서울시 동작구 보라매로 890",
    city: "서울",
    type: "국가유공자",
    bedrooms: 1,
    rent: 380000,
    waitlistOpen: false,
    description: "전용면적 42㎡, 지하철역까지 도보 15분",
    phone: "02-3456-7890",
    thumbnailUrl: "/images/apartment3.jpg",
    images: [],
    buildingSpecs: {
      totalFloors: 10,
      totalUnits: 80,
      buildYear: 2015,
      parkingSpaces: 60,
      elevators: 1,
      heatingType: "개별난방",
      structure: "철근콘크리트",
    },
    services: ["주차장", "인터넷", "보안시스템", "엘리베이터", "관리사무소", "택배보관함", "보훈회관", "상담실"],
    nearbyFacilities: [
      { category: "교육", name: "강남초등학교", distance: "600m", walkTime: 8 },
      { category: "쇼핑", name: "롯데백화점", distance: "1.2km", walkTime: 15 },
      { category: "의료", name: "보라매병원", distance: "500m", walkTime: 7 },
      { category: "교통", name: "보라매역 버스정류장", distance: "200m", walkTime: 3 },
      { category: "지하철", name: "보라매역(7호선)", distance: "1km", walkTime: 12 },
      { category: "공원", name: "보라매공원", distance: "300m", walkTime: 4 },
    ],
    eligibilityRequirements: {
      maxIncome: 4000000,
      veteranPreference: true,
    },
  },
  {
    id: "4",
    name: "무장애 생활주택",
    address: "서울시 성북구 정릉로 321",
    city: "서울",
    type: "장애인",
    bedrooms: 1,
    rent: 350000,
    waitlistOpen: true,
    description: "전용면적 45㎡, 지하철역까지 도보 6분",
    phone: "02-4567-8901",
    thumbnailUrl: "/images/apartment4.jpg",
    images: [],
    buildingSpecs: {
      totalFloors: 5,
      totalUnits: 40,
      buildYear: 2020,
      parkingSpaces: 30,
      elevators: 1,
      heatingType: "개별난방",
      structure: "철근콘크리트",
    },
    services: [
      "주차장",
      "인터넷",
      "보안시스템",
      "엘리베이터",
      "관리사무소",
      "택배보관함",
      "장애인 편의시설",
      "재활센터",
    ],
    nearbyFacilities: [
      { category: "교육", name: "서울사대부설초등학교", distance: "800m", walkTime: 10 },
      { category: "쇼핑", name: "현대백화점", distance: "1.5km", walkTime: 18 },
      { category: "의료", name: "고려대학교병원", distance: "1km", walkTime: 12 },
      { category: "교통", name: "정릉역 버스정류장", distance: "200m", walkTime: 3 },
      { category: "지하철", name: "정릉역(우이신설선)", distance: "500m", walkTime: 6 },
      { category: "공원", name: "북한산", distance: "2km", walkTime: 25 },
    ],
    eligibilityRequirements: {
      maxIncome: 3800000,
      disabilityPreference: true,
    },
  },
  {
    id: "5",
    name: "가족형 공공주택",
    address: "서울시 양천구 목동서로 654",
    city: "서울",
    type: "다자녀가구",
    bedrooms: 3,
    rent: 580000,
    waitlistOpen: true,
    description: "전용면적 84㎡, 지하철역까지 도보 20분",
    phone: "02-5678-9012",
    thumbnailUrl: "/images/apartment5.jpg",
    images: [],
    buildingSpecs: {
      totalFloors: 20,
      totalUnits: 160,
      buildYear: 2023,
      parkingSpaces: 120,
      elevators: 3,
      heatingType: "지역난방",
      structure: "철근콘크리트",
    },
    services: [
      "주차장",
      "인터넷",
      "보안시스템",
      "엘리베이터",
      "관리사무소",
      "택배보관함",
      "어린이놀이터",
      "커뮤니티룸",
      "게스트하우스",
    ],
    nearbyFacilities: [
      { category: "교육", name: "목동초등학교", distance: "400m", walkTime: 5 },
      { category: "교육", name: "목동중학교", distance: "600m", walkTime: 8 },
      { category: "쇼핑", name: "현대백화점", distance: "1km", walkTime: 12 },
      { category: "의료", name: "이대목동병원", distance: "1.5km", walkTime: 18 },
      { category: "교통", name: "목동역 버스정류장", distance: "300m", walkTime: 4 },
      { category: "지하철", name: "목동역(5호선)", distance: "1.2km", walkTime: 15 },
      { category: "공원", name: "양천공원", distance: "500m", walkTime: 7 },
    ],
    eligibilityRequirements: {
      maxIncome: 5500000,
      familySize: [4, 5, 6],
    },
  },
  {
    id: "6",
    name: "청년 원룸형 주택",
    address: "서울시 마포구 홍대로 987",
    city: "서울",
    type: "청년",
    bedrooms: 0,
    rent: 280000,
    waitlistOpen: true,
    description: "전용면적 20㎡, 지하철역까지 도보 3분",
    phone: "02-6789-0123",
    thumbnailUrl: "/images/apartment6.jpg",
    images: [],
    buildingSpecs: {
      totalFloors: 7,
      totalUnits: 50,
      buildYear: 2021,
      parkingSpaces: 35,
      elevators: 1,
      heatingType: "개별난방",
      structure: "철근콘크리트",
    },
    services: ["주차장", "인터넷", "보안시스템", "엘리베이터", "관리사무소", "택배보관함", "공용세탁실", "스터디룸"],
    nearbyFacilities: [
      { category: "교육", name: "홍익대학교", distance: "500m", walkTime: 6 },
      { category: "쇼핑", name: "AK플라자", distance: "800m", walkTime: 10 },
      { category: "의료", name: "세브란스병원", distance: "2km", walkTime: 25 },
      { category: "교통", name: "홍대입구역 버스정류장", distance: "100m", walkTime: 2 },
      { category: "지하철", name: "홍대입구역(2호선, 경의중앙선, 공항철도)", distance: "300m", walkTime: 4 },
      { category: "공원", name: "경의선 숲길", distance: "400m", walkTime: 5 },
    ],
    eligibilityRequirements: {
      maxIncome: 3000000,
      familySize: [1],
      maxAge: 39,
    },
  },
]

interface UserCriteria {
  monthlyIncome: number
  age: number
  familySize: number
  isVeteran: boolean
  hasDisability: boolean
  isSenior: boolean
  isWorkingFamily: boolean
}

export default function HousingFinder() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const [selectedListing, setSelectedListing] = useState<HousingListing | null>(null)

  const [userCriteria, setUserCriteria] = useState<UserCriteria>({
    monthlyIncome: 0,
    age: 0,
    familySize: 1,
    isVeteran: false,
    hasDisability: false,
    isSenior: false,
    isWorkingFamily: false,
  })

  const [showOnlyEligible, setShowOnlyEligible] = useState(false)

  const eligibleListings = useMemo(() => {
    return housingListings.filter((listing) => {
      const req = listing.eligibilityRequirements

      // Income check
      if (userCriteria.monthlyIncome > 0 && userCriteria.monthlyIncome > req.maxIncome) {
        return false
      }

      // Age checks
      if (req.minAge && userCriteria.age > 0 && userCriteria.age < req.minAge) {
        return false
      }
      if (req.maxAge && userCriteria.age > 0 && userCriteria.age > req.maxAge) {
        return false
      }

      // Family size check
      if (req.familySize && !req.familySize.includes(userCriteria.familySize)) {
        return false
      }

      return true
    })
  }, [userCriteria])

  const displayedListings = showOnlyEligible ? eligibleListings : housingListings

  const isEligible = (listing: HousingListing) => {
    return eligibleListings.includes(listing)
  }

  const handleIncomeChange = (value: string) => {
    const income = Number.parseInt(value) || 0
    setUserCriteria((prev) => ({ ...prev, monthlyIncome: income }))
  }

  const handleAgeChange = (value: string) => {
    const age = Number.parseInt(value) || 0
    setUserCriteria((prev) => ({
      ...prev,
      age,
      isSenior: age >= 65,
    }))
  }

  const handleFamilySizeChange = (value: string) => {
    const size = Number.parseInt(value) || 1
    setUserCriteria((prev) => ({ ...prev, familySize: size }))
  }

  const formatKRW = (amount: number) => {
    return new Intl.NumberFormat("ko-KR").format(amount)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {!selectedListing && (
        <>
          {/* Header with Login Button */}
          <header className="bg-white shadow-sm border-b">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">공공주택 찾기</h1>
              </div>
              <div>
                {isLoggedIn ? (
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">{userEmail}님</span>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsLoggedIn(false)
                        setUserEmail("")
                      }}
                    >
                      로그아웃
                    </Button>
                  </div>
                ) : (
                  <Button onClick={() => setShowLoginModal(true)}>로그인</Button>
                )}
              </div>
            </div>
          </header>

          <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <p className="text-gray-600">귀하의 자격 조건에 맞는 공공주택을 찾아보세요</p>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1">
                <Card className="sticky top-4">
                  <CardHeader>
                    <CardTitle className="text-lg">신청자 정보</CardTitle>
                    <p className="text-sm text-gray-600">정보를 입력하시면 신청 가능한 주택을 확인할 수 있습니다</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="income">월 가구소득 (원)</Label>
                      <input
                        id="income"
                        type="number"
                        placeholder="예: 3500000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => handleIncomeChange(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="age">나이</Label>
                      <input
                        id="age"
                        type="number"
                        placeholder="예: 35"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => handleAgeChange(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="family-size">가구원 수</Label>
                      <select
                        id="family-size"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => handleFamilySizeChange(e.target.value)}
                      >
                        <option value="1">1인</option>
                        <option value="2">2인</option>
                        <option value="3">3인</option>
                        <option value="4">4인</option>
                        <option value="5">5인</option>
                        <option value="6">6인 이상</option>
                      </select>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <Label className="text-base font-medium">우선공급 대상</Label>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="veteran"
                          checked={userCriteria.isVeteran}
                          onCheckedChange={(checked) => setUserCriteria((prev) => ({ ...prev, isVeteran: !!checked }))}
                        />
                        <Label htmlFor="veteran" className="text-sm">
                          국가유공자
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="disability"
                          checked={userCriteria.hasDisability}
                          onCheckedChange={(checked) =>
                            setUserCriteria((prev) => ({ ...prev, hasDisability: !!checked }))
                          }
                        />
                        <Label htmlFor="disability" className="text-sm">
                          장애인
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="working"
                          checked={userCriteria.isWorkingFamily}
                          onCheckedChange={(checked) =>
                            setUserCriteria((prev) => ({ ...prev, isWorkingFamily: !!checked }))
                          }
                        />
                        <Label htmlFor="working" className="text-sm">
                          신혼부부·청년
                        </Label>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="eligible-only"
                        checked={showOnlyEligible}
                        onCheckedChange={(checked) => setShowOnlyEligible(!!checked)}
                      />
                      <Label htmlFor="eligible-only" className="text-sm font-medium">
                        신청 가능한 주택만 보기
                      </Label>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Listings */}
              <div className="lg:col-span-3">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">공급 가능 주택 ({displayedListings.length})</h2>
                    {showOnlyEligible && <p className="text-sm text-green-600 mt-1">신청 가능한 주택만 표시 중</p>}
                  </div>
                </div>

                <div className="grid gap-6">
                  {displayedListings.map((listing) => {
                    const eligible = isEligible(listing)

                    return (
                      <Card
                        key={listing.id}
                        className={`${!eligible && showOnlyEligible ? "opacity-50" : ""} cursor-pointer hover:shadow-lg transition-shadow`}
                        onClick={() => setSelectedListing(listing)}
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              <Image
                                src={listing.thumbnailUrl || "/placeholder.svg"}
                                alt={`${listing.name} 건물 사진`}
                                width={80}
                                height={60}
                                className="rounded-md object-cover flex-shrink-0"
                              />
                              <div>
                                <CardTitle className="text-xl text-gray-900">{listing.name}</CardTitle>
                                <div className="flex items-center text-gray-600 mt-1">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  <span className="text-sm">{listing.address}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              {eligible ? (
                                <Badge variant="default" className="bg-green-100 text-green-800">
                                  신청가능
                                </Badge>
                              ) : (
                                <Badge variant="secondary">신청불가</Badge>
                              )}
                              {!listing.waitlistOpen && (
                                <Badge variant="destructive" className="ml-2">
                                  접수마감
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700 mb-6">{listing.description}</p>

                          {/* Housing Details and Application Criteria - Side by Side */}
                          <div className="grid md:grid-cols-2 gap-6 mb-4">
                            {/* Housing Details Section - Left */}
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                                주택 정보
                              </h4>
                              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                <div className="flex items-center text-sm text-gray-700">
                                  <Users className="w-4 h-4 mr-3 text-gray-500" />
                                  <span>
                                    {listing.bedrooms === 0 ? "원룸형" : `${listing.bedrooms}룸`} • {listing.type}
                                  </span>
                                </div>
                                <div className="flex items-center text-sm text-gray-700">
                                  <DollarSign className="w-4 h-4 mr-3 text-gray-500" />
                                  <span>월 임대료 {formatKRW(listing.rent)}원</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-700">
                                  <Phone className="w-4 h-4 mr-3 text-gray-500" />
                                  <span>{listing.phone}</span>
                                </div>
                                {listing.website && (
                                  <div className="flex items-center text-sm text-gray-700">
                                    <ExternalLink className="w-4 h-4 mr-3 text-gray-500" />
                                    <a
                                      href={listing.website}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:underline"
                                    >
                                      홈페이지 방문
                                    </a>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Application Criteria Section - Right */}
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                                신청 자격
                              </h4>
                              <div className="border-l-4 border-blue-200 bg-blue-50 rounded-r-lg p-4 space-y-3">
                                <div className="text-sm">
                                  <span className="font-medium text-gray-800">월 소득 한도:</span>
                                  <span className="ml-2 text-gray-700">
                                    {formatKRW(listing.eligibilityRequirements.maxIncome)}원
                                  </span>
                                </div>
                                {listing.eligibilityRequirements.minAge && (
                                  <div className="text-sm">
                                    <span className="font-medium text-gray-800">최소 연령:</span>
                                    <span className="ml-2 text-gray-700">
                                      {listing.eligibilityRequirements.minAge}세
                                    </span>
                                  </div>
                                )}
                                {listing.eligibilityRequirements.maxAge && (
                                  <div className="text-sm">
                                    <span className="font-medium text-gray-800">최대 연령:</span>
                                    <span className="ml-2 text-gray-700">
                                      {listing.eligibilityRequirements.maxAge}세
                                    </span>
                                  </div>
                                )}
                                {listing.eligibilityRequirements.familySize && (
                                  <div className="text-sm">
                                    <span className="font-medium text-gray-800">가구원 수:</span>
                                    <span className="ml-2 text-gray-700">
                                      {listing.eligibilityRequirements.familySize.join(", ")}인
                                    </span>
                                  </div>
                                )}

                                {/* Preferences */}
                                {(listing.eligibilityRequirements.veteranPreference ||
                                  listing.eligibilityRequirements.disabilityPreference ||
                                  listing.eligibilityRequirements.seniorPreference ||
                                  listing.eligibilityRequirements.workingFamilyPreference) && (
                                  <div className="pt-2 border-t border-blue-200">
                                    <span className="font-medium text-gray-800 text-sm block mb-2">우선공급 대상:</span>
                                    <div className="flex flex-wrap gap-2">
                                      {listing.eligibilityRequirements.veteranPreference && (
                                        <Badge variant="outline" className="bg-white">
                                          국가유공자
                                        </Badge>
                                      )}
                                      {listing.eligibilityRequirements.disabilityPreference && (
                                        <Badge variant="outline" className="bg-white">
                                          장애인
                                        </Badge>
                                      )}
                                      {listing.eligibilityRequirements.seniorPreference && (
                                        <Badge variant="outline" className="bg-white">
                                          고령자
                                        </Badge>
                                      )}
                                      {listing.eligibilityRequirements.workingFamilyPreference && (
                                        <Badge variant="outline" className="bg-white">
                                          신혼부부·청년
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>

                {displayedListings.length === 0 && (
                  <Card>
                    <CardContent className="text-center py-12">
                      <p className="text-gray-500 text-lg">현재 조건에 맞는 주택이 없습니다.</p>
                      <p className="text-gray-400 text-sm mt-2">
                        필터 조건을 조정하거나 주택공사에 직접 문의해 주세요.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {selectedListing && <ListingDetail listing={selectedListing} onBack={() => setSelectedListing(null)} />}

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLogin={(email) => {
            setIsLoggedIn(true)
            setUserEmail(email)
            setShowLoginModal(false)
          }}
        />
      )}
    </div>
  )
}
