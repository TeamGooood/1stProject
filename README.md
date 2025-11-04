# Cosmos Ecosystem Data Visualization

Cosmos 생태계 코인들(ATOM, OSMO, SCRT, BABY)의 가격과 사용자 데이터를 시각화하고 상관관계를 분석하는 인터랙티브 대시보드입니다.

## 🎯 주요 기능

### 1. 코인 선택 및 정보 표시
- 4개 코인 중 선택 가능 (COSMOS HUB, OSMOSIS, SECRET, BABYLON)
- 총 계정 수, 블록당 트랜잭션 수 실시간 표시

### 2. 시계열 데이터 분석 (Time Series Analysis)
- 선택한 날짜 범위의 가격 및 사용자 수 추이 그래프
- 듀얼 Y축 차트로 두 지표를 동시 비교

### 3. 상관관계 분석 (Correlation Analysis)
- 가격과 사용자 수의 상관관계를 산점도로 시각화
- 추세선으로 상관성 확인

### 4. 캘린더 날짜 선택
- 날짜 범위를 선택하여 데이터 필터링
- 모든 차트가 선택된 범위에 맞춰 동적 업데이트

### 5. 분석 요약 (Analysis Summary)
- **Active Accounts Change**: 선택 기간 동안의 사용자 수 변화율
- **Price Change**: 선택 기간 동안의 가격 변화율
- **Correlation Coefficient**: 스피어만 상관계수 계산 (-1 ~ +1)
- 상관계수에 따라 움직이는 인터랙티브 인디케이터
- 증가/감소 색상 자동 변경 (녹색/빨간색)

## 🛠 기술 스택

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: TailwindCSS v4
- **Charts**: Recharts
- **Data Parsing**: PapaParse
- **Font**: Google Fonts (Roboto)

## 📁 프로젝트 구조

```
3weekproject/
├── src/
│   ├── components/          # React 컴포넌트
│   │   ├── CoinSelect.jsx           # 코인 선택 버튼
│   │   ├── CoinData.jsx             # 코인 정보 카드
│   │   ├── Calendar.jsx             # 날짜 범위 선택기
│   │   ├── TimeSeriesAnalysis.jsx   # 시계열 차트
│   │   ├── CorrelationAnalysis.jsx  # 상관관계 산점도
│   │   └── AnalysisSummary.jsx      # 분석 요약 (NEW)
│   │
│   ├── data/                # 데이터 파일
│   │   ├── coinsData.js             # 코인 메타데이터
│   │   ├── csvData/                 # CSV 파싱 데이터
│   │   │   ├── cosmosData.js
│   │   │   ├── babylonData.js
│   │   │   ├── osmosisData.js
│   │   │   └── secretData.js
│   │   └── [코인별 CSV 폴더]/      # 원본 CSV 파일
│   │
│   ├── utils/               # 유틸리티 함수
│   │   ├── csvParser.js             # CSV 파싱 유틸
│   │   └── correlation.js           # 상관계수 계산 (NEW)
│   │
│   ├── assets/              # 이미지 파일
│   ├── App.jsx              # 메인 앱 컴포넌트
│   ├── main.jsx             # 엔트리 포인트
│   └── index.css            # 글로벌 스타일 및 디자인 시스템
│
├── DESIGN_SYSTEM.md         # 디자인 시스템 문서
├── package.json
└── vite.config.js
```

## 🧩 주요 컴포넌트

### 1. `AnalysisSummary.jsx` (신규)
선택된 날짜 범위와 코인의 데이터를 분석하여 요약 정보를 제공합니다.

**Props:**
- `selectedCoin`: 선택된 코인 객체
- `dateRange`: { startDate, endDate } 객체

**주요 기능:**
- 사용자 수 변화율 계산 및 표시
- 가격 변화율 계산 및 표시
- 스피어만 상관계수 계산
- 상관계수에 따라 인디케이터 위치 동적 조정
- 증가/감소에 따른 색상 자동 변경
- 부드러운 애니메이션 효과 (0.7초)

**데이터 계산:**
```javascript
// 변화율 계산
accountsChange = (lastAccounts - firstAccounts) / firstAccounts * 100
priceChange = (lastPrice - firstPrice) / firstPrice * 100

// 스피어만 상관계수
correlation = calculateSpearmanCorrelation(accounts[], prices[])
```

### 2. `TimeSeriesAnalysis.jsx`
가격과 사용자 수의 시계열 데이터를 듀얼 Y축 차트로 시각화합니다.

### 3. `CorrelationAnalysis.jsx`
가격과 사용자 수의 상관관계를 산점도로 표시합니다.

### 4. `Calendar.jsx`
날짜 범위를 선택하여 데이터를 필터링합니다.

### 5. `CoinSelect.jsx`
4개 코인 중 하나를 선택할 수 있는 인터페이스입니다.

## 📊 데이터 구조

### coinsData.js
```javascript
{
  id: 'cosmos',
  name: 'COSMOS HUB',
  symbol: 'ATOM',
  icon: cosmosIcon,
  accountsTotal: '123,456',
  transactionsPerBlock: '12.34',
  timeSeriesData: [
    {
      timestamp: 1234567890,
      date: Date,
      accountsMonthly: 10000,
      price: 15.67
    },
    // ...
  ]
}
```

## 🔧 유틸리티 함수

### csvParser.js
CSV 파일을 파싱하여 사용 가능한 데이터로 변환합니다.

**주요 함수:**
- `parseLatestCoinData(csvText)`: 최신 데이터 추출
- `parseTimeSeriesData(csvText)`: 시계열 데이터 배열 생성

### correlation.js (신규)
상관관계 분석을 위한 수학적 계산을 수행합니다.

**주요 함수:**
```javascript
// 스피어만 순위 상관계수 계산
calculateSpearmanCorrelation(x[], y[]) => number (-1 ~ 1)

// 변화율 계산
calculateChangeRate(start, end) => number (%)

// 변화율 포맷팅
formatChangeRate(changeRate) => string ("+ 12.4%", "- 8.1%")

// 상관계수를 위치(%)로 변환
correlationToPosition(coefficient) => number (0 ~ 100)
```

**스피어만 상관계수 알고리즘:**
1. 각 배열의 순위(rank) 계산
2. 순위 차이의 제곱 합 계산
3. ρ = 1 - (6 * Σd²) / (n * (n² - 1))

## 🎨 디자인 시스템

프로젝트는 일관된 디자인 시스템을 따릅니다.

**주요 색상:**
- **Primary**: Purple (#BB4CE8), Orange (#FF9C4D)
- **Success**: Green (#46b88b) - 증가, 양수 값
- **Danger**: Red (#fc4117) - 감소, 음수 값
- **Text**: Primary (#1a191c), Secondary (#6c6e6f)

**애니메이션:**
- 색상 전환: 0.3초 부드러운 전환
- 인디케이터 이동: 0.7초 ease-in-out 애니메이션

**👉 자세한 내용은 [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) 참조**

## 🚀 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

### 3. 빌드
```bash
npm run build
```

### 4. 프리뷰
```bash
npm run preview
```

## 📦 주요 패키지

- **react** ^18.3.1 - UI 라이브러리
- **recharts** ^2.15.0 - 차트 시각화
- **papaparse** ^5.4.1 - CSV 파싱
- **tailwindcss** ^4.0.0 - 스타일링

## 🌟 주요 특징

### 반응형 레이아웃
- 최대 너비 1300px, 좌우 영역으로 나뉜 효율적인 구조
- 데이터 차트(좌) / 날짜 선택 및 요약(우)

### 실시간 인터랙션
- 날짜 범위 변경 시 모든 차트 및 분석 데이터 자동 업데이트
- useMemo를 활용한 최적화된 계산

### 직관적인 UX
- 부드러운 애니메이션 전환 효과
- 상관계수에 따라 움직이는 인터랙티브 인디케이터
- 증가/감소를 색상으로 직관적 표현 (녹색/빨간색)

---

**개발 기간**: 3주 프로젝트  
**주제**: Cosmos 생태계 데이터 시각화 및 상관관계 분석
