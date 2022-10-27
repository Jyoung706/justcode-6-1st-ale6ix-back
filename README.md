## Ale6ix 프로젝트 소개

- 해외 유명 디자이너 브랜드 👉[ALESSI](http://alessi.co.kr) 를 클론 코딩 하였습니다.
- 처음 시도해보는 프로젝트인 만큼 기능이 너무 어렵지 않은 사이트를 선정하여 프로젝트를 했습니다.
<br/>디자인은 원래의 홈페이지를 참고하여 클론코딩을 했고 기능의 경우 스스로 생각하여 개발을 했습니다.
- 프로젝트 내의 기간동안 부트캠프에서 배운 내용을 복습하며 부트캠프를 하며 구현해보지 못했던 기능들을 구현해보고자 학습목적에 의의를 두었습니다.

### 개발 인원 및 기간

- 개발기간 : 2022/8/29 ~ 2022/9/8
- 개발 인원 : 프론트엔드 4명, 백엔드 2명
- 프론트 엔드 : 김충만, 서지원, 양미옥, 이기완
- 백엔드 : 김윤희, 전준영

>### DB모델링
>
>![dbdiagram](https://user-images.githubusercontent.com/108918591/189637074-f0625129-197c-4797-b49c-8d292311a169.png)
 
## 적용 기술 및 구현기능

### 적용 기술

> - 주요 기술 : 
<img src = "https://img.shields.io/badge/-JavaScript-%23F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"/>&nbsp;
<img src = "https://img.shields.io/badge/-Node.js-%23339933?style=for-the-badge&logo=Node.js&logoColor=white"/>&nbsp;
<img src = "https://img.shields.io/badge/-Express-%23000000?style=for-the-badge&logo=Express&logoColor=white"/>&nbsp;
<img src = "https://img.shields.io/badge/-MySQL-%234479A1?style=for-the-badge&logo=MySQL&logoColor=white"/>&nbsp;
>
> - 사용한 라이브러리 :
<img src = "https://img.shields.io/badge/-typeorm-orange?style=for-the-badge&logo=typeorm&logoColor=white"/>&nbsp;
<img src = "https://img.shields.io/badge/-Nodemon-%2376D04B?style=for-the-badge&logo=Nodemon&logoColor=white"/>&nbsp;
<img src = "https://img.shields.io/badge/-JSON%20Web%20Tokens-%23000000?style=for-the-badge&logo=JSON%20Web%20Tokens&logoColor=white"/>&nbsp;
<img src = "https://img.shields.io/badge/-bcrypt-%23000000?style=for-the-badge"/>&nbsp;
<img src = "https://img.shields.io/badge/-.ENV-%23ECD53F?style=for-the-badge&logo=.ENV&logoColor=black"/> &nbsp;
>
> - Common :
<img src = "https://img.shields.io/badge/-RESTful%20API-%23000000?style=for-the-badge"/>&nbsp;
<img src = "https://img.shields.io/badge/-Postman-%23FF6C37?style=for-the-badge&logo=Postman&logoColor=white"/> &nbsp;
<img src = "https://img.shields.io/badge/-Git-%23F05032?style=for-the-badge&logo=Git&logoColor=white"/>&nbsp;
<img src ="https://img.shields.io/badge/-GitHub-%23181717?style=for-the-badge&logo=GitHub&logoColor=white"/>&nbsp;
<img src = "https://img.shields.io/badge/-Slack-%234A154B?style=for-the-badge&logo=Slack&logoColor=white"/>&nbsp;

### API 설계
|기능|Method|URL|
|:---:|:---:|:---:|
|계정 중복체크|GET|/users/signup?accout={체크할 계정}|
|회원가입|POST|/users/signup|
|상세페이지 조회|GET|/products/detail/{조회할 상품 id}|
|리뷰 작성|POST|/products/detail/{리뷰 작성할 상품 id}/review|
|리뷰 조회|GET|/products/detail/{리뷰 조회할 상품 id}/review|
|리뷰 삭제|DELETE|/products/detail/{리뷰 삭제할 상품 id}/review/{삭제할 리뷰id}|
|문의 작성|POST|/products/detail/{문의 작성할 상품 id}/question|
|문의 정보 조회|GET|/products/detail/{문의 정보 조회할 상품 id}/question|
|문의 삭제|DELETE|/products/detail/{문의 삭제할 상품 id}/question/{삭제할 문의id}|


### 내가 구현한 기능

#### 1. 회원가입 기능 ( + 계정 중복확인 기능)
- 유저가 서비스를 이용하기 위해 회원가입 하는 기능입니다.
- 회원가입 시 중복확인 버튼을 누를 때 요청이 들어오며 회원가입 가능 여부를 반환합니다. 
- 회원가입시 bcrypt를 사용해 비밀번호를 암호화처리합니다.

#### 2. nav 카테고리 불러오기
- nav 메인 카테고리명과 세부 카테고리명, 카테고리에 쓰일 이미지를 불러오는 기능입니다.

#### 3. 제품 상세페이지 불러오기
- 제품 상세페이지에 쓰이는 상품 이름,가격,이미지,남은 재고, 리뷰, 문의 데이터를 불러오는 기능입니다.
- 상세페이지에 리뷰와 문의가 상세페이지 아래부분에 쓰이기 때문에 상세페이지 요청이 들어오면 우선 한번에 데이터를 보내줍니다.

#### 4. 후기 불러오기,작성,삭제
- 상세페이지 내에서 상품의 후기에 대해 불러오기, 작성, 삭제하는 기능입니다.
- input 값의 여부, input의 길이에 대한 유효성 검사가 있습니다.
- user의 id를 요청값으로 받으며 토큰으로 구매한 이력이 있는지 우선적으로 검증한 후 구매한 상품에 대해서만 작성이 가능합니다.
- 작성이 완료되었으면 후기의 id, 작성한 유저의 계정, 후기 제목,내용, 작성시간을 반환합니다.
- 불러오기의 경우 상세페이지 불러오기 API 에서도 후기에 대한 정보를 반환하지만 리뷰 작성, 삭제에 대한 변경사항까지 다시 웹에 반영해야 하기때문에
후기에 대한 데이터만 따로 불러오도록 했습니다.
- 삭제의 경우 작성한 유저만 삭제할 수 있도록 기능을 구현했습니다.

#### 5. 문의 불러오기, 작성,삭제
- 상세페이지 내에서 상품의 문의에 대해 불러오기, 작성, 삭제하는 기능입니다.
- 후기와 다르게 문의는 누구나 상품 문의를 할 수 있기때문에 구매한 이력이 없어도 작성할 수 있도록 해놓았습니다.
- 후기와 마찬가지로 input 값의 여부, input의 길이에 대한 유효성 검증이 있습니다.
- 작성이 완료되었으면 문의의 id , 작성한 유저의 계정, 문의 제목, 내용, 작성시간을 반환합니다.
- 불러오기의 경우 후기와 마찬가지로 작성, 삭제의 변경사항을 웹에 다시 반영해야 하기때문에 문의에 대한 데이터만 따로 불러오도록 했습니다.
- 삭제의 경우 작성한 유저만 삭제할 수 있도록 기능을 구현했습니다.

**자세한 요청과 응답값에 대한 부분은 api 명세서를 참고해주시면 감사하겠습니다.**

👉 [API Docs](https://documenter.getpostman.com/view/22723440/VUxNSTYp)
****

### 프로젝트를 하면서 느낀 점

첫 프로젝트이자 첫 협업이기 때문에 대단한 기능을 만드는 것에 목적을 두기보다는 협업을 해보는 것에 의의를 두고, 
<br/>지금까지 배운 것을 최대한 활용하여 API를 만들어내며 마감기간을 철저하게 지켜보자 라는 마인드로 프로젝트에 임했다.
<br/>협업이란 것을 해보면서 여럿이서 합을 맞추어 어떤 일을 해낸다는 것 자체가 이렇게 어려운 것이구나 라고 깨달았다.
<br/>하지만 그간 내가 배운것을 활용해서 다른 누군가와 협동해 어떤 결과물을 만들어 냈다는 것 자체가 정말 감격스러운 경험이었고 힘들지만 행복했던 시간이었다.

****
