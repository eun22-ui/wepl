"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  MapPin,
  Phone,
  ExternalLink,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Car,
  Wifi,
  Shield,
  Zap,
  Droplets,
  Wind,
  Building,
  GraduationCap,
  ShoppingCart,
  Stethoscope,
  Bus,
  Train,
  TreePine,
} from "lucide-react"
import Image from "next/image"

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

interface ListingDetailProps {
  listing: HousingListing
  onBack: () => void
}

export default function ListingDetail({ listing, onBack }: ListingDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const formatKRW = (amount: number) => {
    return new Intl.NumberFormat("ko-KR").format(amount)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % listing.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + listing.images.length) % listing.images.length)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "교육":
        return <GraduationCap className="w-4 h-4" />
      case "쇼핑":
        return <ShoppingCart className="w-4 h-4" />
      case "의료":
        return <Stethoscope className="w-4 h-4" />
      case "교통":
        return <Bus className="w-4 h-4" />
      case "지하철":
        return <Train className="w-4 h-4" />
      case "공원":
        return <TreePine className="w-4 h-4" />
      default:
        return <MapPin className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            목록으로 돌아가기
          </Button>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{listing.name}</h1>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{listing.address}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600 mb-2">월 {formatKRW(listing.rent)}원</div>
              {listing.waitlistOpen ? (
                <Badge variant="default" className="bg-green-100 text-green-800">
                  신청접수중
                </Badge>
              ) : (
                <Badge variant="destructive">접수마감</Badge>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={listing.images[currentImageIndex] || "/placeholder.svg"}
                    alt={`${listing.name} 사진 ${currentImageIndex + 1}`}
                    width={800}
                    height={400}
                    className="w-full h-96 object-cover rounded-t-lg"
                  />
                  {listing.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                        {currentImageIndex + 1} / {listing.images.length}
                      </div>
                    </>
                  )}
                </div>
                {listing.images.length > 1 && (
                  <div className="p-4">
                    <div className="flex gap-2 overflow-x-auto">
                      {listing.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 ${index === currentImageIndex ? "ring-2 ring-blue-500" : ""}`}
                        >
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`썸네일 ${index + 1}`}
                            width={80}
                            height={60}
                            className="w-20 h-15 object-cover rounded"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>주택 개요</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{listing.description}</p>
              </CardContent>
            </Card>

            {/* Building Specifications */}
            <Card>
              <CardHeader>
                <CardTitle>건물 정보</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">총 층수</span>
                      <span className="font-medium">{listing.buildingSpecs.totalFloors}층</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">총 세대수</span>
                      <span className="font-medium">{listing.buildingSpecs.totalUnits}세대</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">준공년도</span>
                      <span className="font-medium">{listing.buildingSpecs.buildYear}년</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">구조</span>
                      <span className="font-medium">{listing.buildingSpecs.structure}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">주차대수</span>
                      <span className="font-medium">{listing.buildingSpecs.parkingSpaces}대</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">엘리베이터</span>
                      <span className="font-medium">{listing.buildingSpecs.elevators}대</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">난방방식</span>
                      <span className="font-medium">{listing.buildingSpecs.heatingType}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">방 구성</span>
                      <span className="font-medium">{listing.bedrooms === 0 ? "원룸형" : `${listing.bedrooms}룸`}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Services & Amenities */}
            <Card>
              <CardHeader>
                <CardTitle>편의시설 및 서비스</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {listing.services.map((service, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      {service.includes("주차") && <Car className="w-5 h-5 text-blue-500" />}
                      {service.includes("인터넷") && <Wifi className="w-5 h-5 text-blue-500" />}
                      {service.includes("보안") && <Shield className="w-5 h-5 text-blue-500" />}
                      {service.includes("전기") && <Zap className="w-5 h-5 text-blue-500" />}
                      {service.includes("수도") && <Droplets className="w-5 h-5 text-blue-500" />}
                      {service.includes("환기") && <Wind className="w-5 h-5 text-blue-500" />}
                      {!service.includes("주차") &&
                        !service.includes("인터넷") &&
                        !service.includes("보안") &&
                        !service.includes("전기") &&
                        !service.includes("수도") &&
                        !service.includes("환기") && <Building className="w-5 h-5 text-blue-500" />}
                      <span className="text-sm">{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Nearby Facilities */}
            <Card>
              <CardHeader>
                <CardTitle>주변 시설</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["교육", "쇼핑", "의료", "교통", "지하철", "공원"].map((category) => {
                    const facilities = listing.nearbyFacilities.filter((f) => f.category === category)
                    if (facilities.length === 0) return null

                    return (
                      <div key={category}>
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                          {getCategoryIcon(category)}
                          {category}
                        </h4>
                        <div className="grid gap-3">
                          {facilities.map((facility, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div>
                                <span className="font-medium">{facility.name}</span>
                                <span className="text-sm text-gray-600 ml-2">({facility.distance})</span>
                              </div>
                              <span className="text-sm text-blue-600">도보 {facility.walkTime}분</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>문의 정보</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <span>{listing.phone}</span>
                  </div>
                  {listing.website && (
                    <div className="flex items-center gap-3">
                      <ExternalLink className="w-5 h-5 text-gray-500" />
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
                  <Button className="w-full mt-4" disabled={!listing.waitlistOpen}>
                    {listing.waitlistOpen ? "신청 문의하기" : "접수 마감"}
                  </Button>
                </CardContent>
              </Card>

              {/* Application Criteria */}
              <Card>
                <CardHeader>
                  <CardTitle>신청 자격</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-200">
                    <div className="space-y-3">
                      <div>
                        <span className="font-medium text-gray-800">월 소득 한도:</span>
                        <div className="text-lg font-bold text-blue-600">
                          {formatKRW(listing.eligibilityRequirements.maxIncome)}원
                        </div>
                      </div>
                      {listing.eligibilityRequirements.minAge && (
                        <div>
                          <span className="font-medium text-gray-800">최소 연령:</span>
                          <span className="ml-2 text-gray-700">{listing.eligibilityRequirements.minAge}세</span>
                        </div>
                      )}
                      {listing.eligibilityRequirements.maxAge && (
                        <div>
                          <span className="font-medium text-gray-800">최대 연령:</span>
                          <span className="ml-2 text-gray-700">{listing.eligibilityRequirements.maxAge}세</span>
                        </div>
                      )}
                      {listing.eligibilityRequirements.familySize && (
                        <div>
                          <span className="font-medium text-gray-800">가구원 수:</span>
                          <span className="ml-2 text-gray-700">
                            {listing.eligibilityRequirements.familySize.join(", ")}인
                          </span>
                        </div>
                      )}
                    </div>

                    {(listing.eligibilityRequirements.veteranPreference ||
                      listing.eligibilityRequirements.disabilityPreference ||
                      listing.eligibilityRequirements.seniorPreference ||
                      listing.eligibilityRequirements.workingFamilyPreference) && (
                      <>
                        <Separator className="my-4" />
                        <div>
                          <span className="font-medium text-gray-800 block mb-2">우선공급 대상:</span>
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
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>주요 정보</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">주택 유형</span>
                      <span className="font-medium">{listing.type}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">방 구성</span>
                      <span className="font-medium">{listing.bedrooms === 0 ? "원룸형" : `${listing.bedrooms}룸`}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">준공년도</span>
                      <span className="font-medium">{listing.buildingSpecs.buildYear}년</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">총 세대수</span>
                      <span className="font-medium">{listing.buildingSpecs.totalUnits}세대</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
