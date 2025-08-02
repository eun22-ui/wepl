#### **This repository is for personal improvement and study after completing a team project**

<hr/>

> ### **Korean Housing**
> 공공주택 통합 플랫폼 : 
접근성과 확장성을 모두 갖춘 공공주택 안내 서비스 제공 플랫폼입니다.


<br>

> ### 개발기간 
2025.06.24 ~ 2025.07.31




인원 : 5명 / 개발기간 : 6주

<br>


> ### 아키텍쳐 / 기술스스택 
* 운영체제 : Linux/UNIX

* 사용언어 : Web backend / Web frontend


                Python, AWS Lambda, Amazon RDS (MySQL) / HTML5, CSS3, JS, Amazon S3

* 오케스트레이션 : Docker, Amazon ECS
* Server : AWS Linux(c7g.medium)
* 외부 서비스 API : Google AI, Heygen, YouTube, Kakao map, 공공데이터포털
* CI/CD : AWS CodePipeline, AWS CodeBuild, AWS Lambda
* 모니터링 : Amazon CloudWatch
* Tooling / Collaboration : Notion, Visual Studio / GitHub

<br>

> ### ERD 구조
> <img width="650" height="292" alt="AD_4nXfk3fa6oMbKON8WgA5TYTyiyc5kWaR7J77Wdkk8WoEy6Yo66Hjl4-tunVgAM4DdKyRJw9EqqhGEYwviKhYVDEkQWeI7lNxpwXZ7XDPCuM0HOLf_IqNa9e6pCqF8Uo33Yeg_P6U1nA" src="https://github.com/user-attachments/assets/4e83689d-1349-4909-af53-e714c30c4d4f" />
<br>

> <img width="650" height="401" alt="AD_4nXePerVN2d_nqLtfAybfE8U6TC_GOdz4rBcwxD28IFuvf5eKGzPrZdYm1UvniYQAMv_WsqyeP4WitiPYLdXShMLUdgfKrjxLjrK5V_tqtZZlX3-B_sbv18CzcCPPHXBlSnZsY7NTjQ (8)" src="https://github.com/user-attachments/assets/daf946db-0583-4fb9-816b-b0f401fac7b1" />
> <img width="550" height="800" alt="AD_4nXdB3ODKRJt6HcmmceYdp646w2RpOChYUA-kKqQUOq-8xXjyh9KAw-bWKujSq55m_L4kdFuxrUyFm1pVe1LeZOYmvWuB_-mX0ibZD2uw413RuM_oH-KHbwcX6l1uY80x739l5eVMYg" src="https://github.com/user-attachments/assets/ea0b01f1-1bcb-41d1-970e-608de21ebd12" />



<br>

> ### 주요기능
##### 1.   메인페이지(index)

   
       공연 검색어 / 티켓 오픈 / 장르별, 지역별 랭킹 / 실시간 공연 순위

##### 2.    로그인 / 회원가입 / 마이페이지 


       회원정보 수정/배송지 관리 / 비밀번호 변경/ 회원 탈퇴 / 소모임, 채팅방 목록    
       조회 / 구독 서비스 / 회원등급 / 문의 내역 조회 / 결제 목록 조회

##### 3.   상세 페이지

    
       기본, 상세 정보/ 공연 리뷰 (평점)
##### 4.   예약 및 결제 페이지 


       회차 및 날짜 선택 / 좌석선택 / 멤버등급별 쿠폰적용 /
      결제(카드/무통장)  / 결제 완료 데이터 / 환불
##### 5.  고객센터


       자주하는 질문 답변(FAQ) / 1:1 문의 
##### 6.  커뮤니티


    
       공연 관련 채팅 / 공연 관람 소모임
##### 7.  공지사항
     
       일반 공지
       
##### 8.  관리자페이지
     
       회원관리 / 공연 관리 / 커뮤니티 관리 / 고객센터 관리


<br>


> ### 담당역할
> ##### 공연 상세페이지부터 좌석선택 및 예약, API를 활용한 결제 및 환불을 구현했습니다.
> * 공연 상세 페이지
>
>
>        상세정보 기본정보 / 공연 리뷰 (평점) - CRUD
> * 예약 페이지
>
>  
>         공연별 회차선택 (공연날짜/회차 및 시간) / 좌석 선택 
>         결제 (무통장입급/카드결제) – 결제확인정보 / 예약 / 티켓(수, 좌석) / 영수증  
>         환불 
> * 스케줄러를 활용한 이탈데이터 복구 
> * 온프레미스 환경 구축 – 서버 / 데이터베이스 




        

