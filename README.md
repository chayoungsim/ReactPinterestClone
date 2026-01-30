# Pinterest Clone
- Masonry 레이아웃(벽돌 쌓기 형태)**과 모달/라우팅의 결합을 연습

## 1단계: 복잡한 레이아웃과 데이터 바인딩 (퍼블리싱 강화)
목표: 단순한 그리드가 아닌, 높이값이 다른 이미지들을 빈틈없이 채우는 Masonry Layout 구현.

학습 포인트: 
* 리액트 기반의 레이아웃 라이브러리(예: react-masonry-css) 활용.
* dummy data를 활용하여 다양한 비율의 이미지 카드 컴포넌트 설계.
* 반응형(Responsive) 처리를 넘어, 이미지가 로드될 때 레이아웃이 깨지지 않도록 하는 최적화.

### 실습
```bash
npm create vite@latest ReactPinterestClone -- --template react
SCSS : $ npm install -D sass-embedded
API : $ npm install axios
```
* Unsplash API 연동 코드 발급 : https://unsplash.com/developers;


## 2단계: 인터랙티브 요소와 로컬 상태 (Interaction)
목표: 이미지 마우스 오버 시 나타나는 '저장' 버튼, '공유' 버튼, 그리고 '핀 확장' 애니메이션.

학습 포인트:
* 개별 카드의 호버 상태 관리.
* 리액트 포털(createPortal)을 이용한 모달(Modal) 구현. (상세 페이지를 모달로 띄우기)
* CSS Transition과 리액트 상태(State)를 결합한 부드러운 UI 전환.
* framer-motion
```bash
    모달구현 : createPortal
    모션적용 : npm install framer-motion
```

## 3단계: 무한 스크롤과 외부 API (Data Handling)
목표: Unsplash API를 연동하여 실제 고화질 이미지를 끝없이 불러오기.

학습 포인트:
* Intersection Observer API를 활용한 무한 스크롤(Infinite Scroll) 구현.
* 비동기 데이터 추가 로딩 시 기존 데이터와 합치는 로직.
* 이미지 지연 로딩(Lazy Loading) 처리.
```bash
Intersection Observer API 

useStore()

```

<!-- ## 4단계: 드래그 앤 드롭 및 전역 상태 (Advanced)
목표: 사용자가 이미지를 드래그하여 자신의 '보드'에 담기, 혹은 직접 이미지 업로드하기.

학습 포인트:
* react-beautiful-dnd 또는 dnd-kit을 이용한 드래그 앤 드롭 기능.
* Zustand나 Redux를 사용하여 '내가 저장한 핀' 목록을 앱 전체에서 관리.
* 이미지 업로드 폼(Preview 기능 포함). -->
