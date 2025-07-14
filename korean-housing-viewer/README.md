# 공공주택 신청 현황 뷰어

데이터베이스 스키마에 맞춘 한국 공공주택 신청 현황 웹사이트입니다. 사용자는 다양한 필터를 통해 자신이 신청 가능한 주택을 쉽게 찾을 수 있습니다.

## 데이터베이스 스키마 매핑

이 웹사이트는 다음 데이터베이스 스키마와 정확히 일치합니다:

\`\`\`sql
CREATE TABLE 공고 (
  공고번호 INT AUTO_INCREMENT PRIMARY KEY,
  공고유형ID INT,
  기관명 CHAR(255),
  지역자치명_도 CHAR(255),
  지역자치명_시 CHAR(255),
  상세주소 VARCHAR(20),
  공고시작일 DATE,
  공고마감일 DATE,
  건물타입 CHAR(255),
  url CHAR(255),
  보증금 DECIMAL(14,2),
  월세 DECIMAL(14,2),
  한줄요약 VARCHAR(200),
  rawjson JSON
);
\`\`\`

## 주요 기능

- **실시간 필터링**: 데이터베이스 필드 기반 필터링
- **색상 코딩**: 공고유형과 건물타입별 색상 구분
- **반응형 디자인**: 모바일과 데스크톱에서 모두 최적화된 UI
- **상세 정보**: 각 주택의 상세 정보, 신청 절차, 필요 서류 등 제공
- **직접 신청**: 각 주택의 공식 신청 페이지로 바로 연결

## 필터 항목

1. **공고유형**: 공고유형ID 기반 (1: 일반공급, 2: 청년우선공급, 3: 신혼부부우선공급, 4: 다자녀우선공급)
2. **지역 - 시/도**: 지역자치명_도 필드
3. **지역 - 시/군/구**: 지역자치명_시 필드  
4. **건물 타입**: 건물타입 필드
5. **기관명**: 기관명 필드

## HTML 데이터 구조

주택 정보는 다음과 같은 HTML 구조로 입력해야 합니다:

\`\`\`html
<div class="housing-item" 
     data-공고번호="1"
     data-공고유형ID="1"
     data-기관명="LH한국토지주택공사"
     data-지역자치명_도="서울특별시"
     data-지역자치명_시="강남구"
     data-상세주소="테헤란로 123"
     data-공고시작일="2024-01-15"
     data-공고마감일="2024-01-25"
     data-건물타입="아파트"
     data-url="https://apply.lh.or.kr"
     data-보증금="35000000"
     data-월세="350000"
     data-한줄요약="강남구 역세권 공공임대주택 신규 공급"
     data-rawjson="{}">
    
    <!-- 기본 정보 -->
    <h3 class="title">서울시 강남구 공공임대주택</h3>
    <p class="description">강남구 역세권 공공임대주택 신규 공급</p>
    <p class="address">서울특별시 강남구 테헤란로 123</p>
    <p class="total-units">120</p>
    <p class="application-period">2024.01.15 ~ 2024.01.25</p>
    <p class="move-in-date">2024.06.01</p>
    <p class="application-url">https://apply.lh.or.kr</p>
    
    <!-- 건물 정보 -->
    <div class="building-info">
        <p class="floors">건물 층수</p>
        <p class="parking-spaces">주차대수</p>
        <p class="construction-company">시공사</p>
        <p class="completion-date">준공예정일</p>
        <div class="facilities">
            <span>시설1</span>
            <span>시설2</span>
        </div>
    </div>
    
    <!-- 세대 정보 -->
    <div class="unit-types">
        <div class="unit-type" 
             data-type="평형" 
             data-units="세대수" 
             data-deposit="보증금" 
             data-rent="월임대료">
        </div>
    </div>
    
    <!-- 자격 요건 -->
    <div class="eligibility-requirements">
        <p>요건1</p>
        <p>요건2</p>
    </div>
    
    <!-- 신청 절차 -->
    <div class="application-process">
        <p>절차1</p>
        <p>절차2</p>
    </div>
    
    <!-- 필요 서류 -->
    <div class="required-documents">
        <p>서류1</p>
        <p>서류2</p>
    </div>
</div>
\`\`\`

## 데이터 입력 방법

1. 각 공고는 `<div class="housing-item">` 태그로 감싸기
2. 모든 데이터베이스 필드를 `data-*` 속성으로 입력
3. 날짜는 `YYYY-MM-DD` 형식 사용
4. 금액은 숫자만 입력 (원 단위)
5. rawjson은 JSON 문자열로 입력

이 구조를 통해 백엔드에서 데이터베이스 데이터를 HTML로 렌더링하면, 프론트엔드에서 자동으로 파싱하여 필터링 가능한 UI를 제공합니다.

## 기술 스택

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Icons**: Lucide React
- **Data**: Static HTML parsing

## 사용 방법

1. 메인 페이지에서 원하는 필터 조건을 선택합니다
2. 조건에 맞는 주택 목록이 실시간으로 필터링됩니다
3. 관심 있는 주택의 "상세보기" 버튼을 클릭하여 자세한 정보를 확인합니다
4. "신청하기" 버튼을 통해 공식 신청 페이지로 이동합니다

## 반응형 지원

- 모바일: 세로 레이아웃, 터치 친화적 UI
- 태블릿: 적응형 그리드 레이아웃
- 데스크톱: 전체 기능 활용 가능한 넓은 레이아웃

## 접근성

- 시맨틱 HTML 사용
- 키보드 네비게이션 지원
- 스크린 리더 호환
- 적절한 색상 대비
- ARIA 레이블 적용

이 웹사이트는 정적 사이트로 설계되어 빠른 로딩과 높은 성능을 제공하며, 서버 사이드 렌더링을 통해 SEO에도 최적화되어 있습니다.
