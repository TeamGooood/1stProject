# Design System

프로젝트 전반에 걸쳐 사용되는 디자인 시스템 가이드입니다.

## 📐 Color System

### Primary Colors
| 색상 | HEX | Tailwind Class | 용도 |
|------|-----|----------------|------|
| Purple Light | `#DB93F7` | `bg-purple-light`, `text-purple-light` | 강조, 그라디언트 |
| Purple | `#BB4CE8` | `bg-purple`, `text-purple` | 주요 색상, 인디케이터 |
| Orange | `#FF9C4D` | `bg-orange`, `text-orange` | 주요 색상, 인디케이터 |

### Neutral Colors
| 색상 | HEX | Tailwind Class | 용도 |
|------|-----|----------------|------|
| Gray Light | `#F0F1F6` | `bg-gray-light`, `text-gray-light` | 배경, 구분선 |
| Gray | `#BAB9BF` | `bg-gray`, `text-gray` | 보조 텍스트 |
| Gray Dark | `#67687D` | `bg-gray-dark`, `text-gray-dark` | 본문 텍스트 |

### Text Colors
| 색상 | HEX | Tailwind Class | 용도 |
|------|-----|----------------|------|
| Text Primary | `#1a191c` | `text-text-primary` | 주요 텍스트 (제목, 숫자) |
| Text Secondary | `#6c6e6f` | `text-text-secondary` | 보조 텍스트 (레이블) |
| Text Tertiary | `#b6b7b7` | - | 설명 텍스트 |

### Status Colors
| 색상 | HEX | 용도 |
|------|-----|------|
| Success/Positive | `#46b88b` | 증가, 양수 값 (녹색) |
| Danger/Negative | `#fc4117` | 감소, 음수 값 (빨간색) |
| Border | `#e8e8e8` | 테두리, 구분선 |

### Gradients
**Correlation Gradient** (상관계수 스케일)
```css
background: linear-gradient(90deg, #BB4CE8 0%, #E8AFEA 49.52%, #FF9C4D 100%);
```
- **클래스명**: `bg-correlation-gradient`
- **사용처**: Analysis Summary의 상관계수 스케일 바
- **특징**: 보라색(-1) → 연보라(0) → 주황색(+1)

---

## ✍️ Typography

### Font Family
전체 프로젝트에서 **Roboto** 폰트 사용

### Font Weights & Usage
| Weight | 값 | Tailwind Class | 용도 |
|--------|-----|----------------|------|
| Medium | 500 | `font-medium` | 제목, 헤딩, 강조 텍스트 |
| Regular | 400 | `font-normal` | 본문, 일반 텍스트 |

### Font Sizes & Line Heights
| 크기 | Line Height | 용도 | 예시 |
|------|-------------|------|------|
| 24px | 28px (`leading-[28px]`) | 대형 숫자, 주요 값 | 상관계수 0.84 |
| 20px | 23px (`leading-[23px]`) | 컴포넌트 제목 | Analysis Summary |
| 16px | 19px (`leading-[19px]`) | 레이블, 변화율 | Active Accounts Change |
| 12px | 14px (`leading-[14px]`) | 설명 텍스트 | 상관계수 설명 |
| 10px | 12px (`leading-[12px]`) | 스케일 레이블 | -1.0, 0.0, +1.0 |

---

## 📏 Spacing System

### Component Spacing
| 용도 | 값 | 설명 |
|------|-----|------|
| 제목 하단 여백 | `mb-[25px]` | 컴포넌트 제목 아래 |
| 섹션 간 구분 | `mb-[26px]` ~ `mb-[29px]` | 주요 섹션 구분 |
| 항목 간 간격 | `space-y-[20px]` | 리스트 항목 사이 |
| 내부 콘텐츠 들여쓰기 | `pl-[13px]` | 제목보다 안쪽 콘텐츠 |
| 구분선 하단 | `mb-[21px]` | 구분선 아래 여백 |

### Padding
| 컴포넌트 | 값 | 설명 |
|----------|-----|------|
| Card 기본 | `p-6` | 모든 카드 컴포넌트 |
| Analysis Summary 우측 | `pr-[35px]` | 우측 여백 추가 |
| Analysis Summary 하단 | `pb-[29px]` | 하단 여백 추가 |

### Border Radius
| 용도 | 값 |
|------|-----|
| Card 모서리 | `rounded-[20px]` |
| 그라디언트 라인 | `rounded-full` |
| 인디케이터 | `rounded-[4.5px]` |

---

## 🎬 Animations

### Transition Classes
```jsx
// 색상 변화 (0.3초, 부드러운 전환)
transition-colors duration-300

// 전체 속성 변화 (0.7초, ease-in-out)
transition-all duration-700 ease-in-out
```

### Animation Usage
| 요소 | 애니메이션 | 설명 |
|------|-----------|------|
| 인디케이터 이동 | `transition-all duration-700 ease-in-out` | 상관계수 변경 시 위치 이동 |
| 색상 전환 | `transition-colors duration-300` | 양수/음수 값 변경 시 색상 페이드 |
| 값 변화 | 숫자 애니메이션 없음 | 직접 교체 (명확성) |

---

## 🎨 Custom CSS Classes

프로젝트에서 자주 사용되는 패턴을 위한 커스텀 클래스입니다. (`src/index.css`)

### Status Colors
| 클래스명 | 색상 | 용도 |
|---------|------|------|
| `.text-success` | `#46b88b` | 증가, 양수 값 표시 |
| `.text-danger` | `#fc4117` | 감소, 음수 값 표시 |

### Theme Colors
| 클래스명 | 색상 | 용도 |
|---------|------|------|
| `.text-orange` | `#FF9C4D` | 오렌지 텍스트 (Active Accounts) |
| `.text-purple` | `#BB4CE8` | 보라색 텍스트 (Price) |
| `.text-tertiary` | `#b6b7b7` | 삼차 텍스트 (설명) |
| `.bg-border` | `#e8e8e8` | 테두리 배경 |

```jsx
<span className="text-success">+ 12.4%</span>
<span className="text-danger">- 8.1%</span>
<span className="text-orange">Active Accounts</span>
<span className="text-purple">Price</span>
<p className="text-tertiary">Description text</p>
```

### Animation Utilities
| 클래스명 | 효과 | 용도 |
|---------|------|------|
| `.transition-smooth` | `all 0.7s ease-in-out` | 인디케이터 이동 |
| `.transition-color-smooth` | `color 0.3s ease` | 색상 전환 |

```jsx
<div className="transition-smooth" style={{ left: `${position}%` }}>
<span className="transition-color-smooth text-success">
```

### Common Patterns
| 클래스명 | 스타일 | 용도 |
|---------|--------|------|
| `.card-base` | `bg-white rounded-[20px] p-6` | 기본 카드 |
| `.divider-light` | `w-full h-[1px] bg-gray-light` | 얇은 구분선 |
| `.divider-medium` | `w-full h-[2px] bg-gray-light` | 두꺼운 구분선 |
| `.indicator-box` | `10x10px rounded-sm` | 색상 인디케이터 |
| `.correlation-indicator` | `10x16px rounded border` | 상관계수 인디케이터 |

```jsx
// 카드
<div className="card-base">
  {/* Content */}
</div>

// 구분선
<div className="divider-medium" />

// 색상 인디케이터
<div className="indicator-box bg-orange" />

// 상관계수 인디케이터
<div className="correlation-indicator" />
```

---

## 🧩 Component Patterns

### Analysis Summary Structure
```jsx
<div className="bg-white rounded-[20px] flex-1 p-6 pr-[35px] pb-[29px]">
  {/* 제목 */}
  <h2 className="text-[20px] font-medium text-black mb-[25px] leading-[23px]">
    Analysis Summary
  </h2>
  
  {/* 내용 영역 (제목보다 13px 안쪽) */}
  <div className="pl-[13px]">
    {/* 변화율 섹션 */}
    <div className="space-y-[20px] mb-[26px]">
      {/* Active Accounts Change */}
      {/* Price Change */}
    </div>
    
    {/* 구분선 */}
    <div className="w-full h-[2px] bg-gray-light mb-[21px]" />
    
    {/* 상관계수 */}
    <div className="mb-[29px]">
      <p className="text-[16px] text-text-secondary mb-[6px] leading-[19px]">
        Correlation Coefficient
      </p>
      <p className="text-[24px] font-medium text-text-primary leading-[28px]">
        0.84
      </p>
    </div>
    
    {/* 그라디언트 스케일 */}
    <div className="mb-[9px] relative">
      <div className="h-[10px] w-full bg-correlation-gradient rounded-full" />
      {/* 인디케이터 */}
    </div>
  </div>
</div>
```

### 변화율 표시 (공통 패턴)
```jsx
<div className="flex items-center justify-between">
  <div className="flex items-center gap-[7px]">
    {/* 색상 인디케이터 */}
    <div className="w-[10px] h-[10px] rounded-sm bg-orange" />
    <span className="text-[16px] text-text-secondary leading-[19px]">
      Label
    </span>
  </div>
  
  {/* 동적 색상 값 */}
  <span 
    className="text-[16px] leading-[19px] transition-colors duration-300"
    style={{ color: value >= 0 ? '#46b88b' : '#fc4117' }}
  >
    {value >= 0 ? '+' : '-'} {Math.abs(value).toFixed(1)}%
  </span>
</div>
```

### 그라디언트 스케일 바
```jsx
<div className="relative">
  {/* 그라디언트 라인 */}
  <div className="h-[10px] w-full bg-correlation-gradient rounded-full" />
  
  {/* 구분선 (흰색 세로선) */}
  <div className="absolute left-[25%] top-0 w-[1px] h-[10px] bg-white" />
  <div className="absolute left-[50%] top-0 w-[1px] h-[10px] bg-white" />
  <div className="absolute left-[75%] top-0 w-[1px] h-[10px] bg-white" />
  
  {/* 동적 인디케이터 */}
  <div 
    className="absolute top-[-3px] transition-all duration-700 ease-in-out"
    style={{ left: `${position}%` }}
  >
    <div className="w-[10px] h-[16px] bg-white border border-[#e8e8e8] rounded-[4.5px]" />
  </div>
  
  {/* 스케일 레이블 */}
  <div className="flex justify-between text-[10px] text-text-secondary opacity-50 mt-[4px]">
    <span className="leading-[12px]">-1.0</span>
    <span className="leading-[12px]">-0.5</span>
    <span className="leading-[12px]">0.0</span>
    <span className="leading-[12px]">+0.5</span>
    <span className="leading-[12px]">+1.0</span>
  </div>
</div>
```

---

## 💡 Usage Examples

### 기본 카드
```jsx
<div className="bg-white rounded-[20px] p-6">
  <h2 className="text-[20px] font-medium text-text-primary mb-[25px]">
    Card Title
  </h2>
  <div className="space-y-4">
    {/* Content */}
  </div>
</div>
```

### 제목 및 본문
```jsx
// 컴포넌트 제목
<h2 className="text-[20px] font-medium text-black leading-[23px]">
  Title
</h2>

// 레이블
<p className="text-[16px] text-text-secondary leading-[19px]">
  Label
</p>

// 주요 값
<p className="text-[24px] font-medium text-text-primary leading-[28px]">
  0.84
</p>
```

### 구분선
```jsx
// 얇은 구분선
<div className="w-full h-[1px] bg-gray-light" />

// 두꺼운 구분선
<div className="w-full h-[2px] bg-gray-light mb-[21px]" />
```

---

## 🎯 Design Principles

### 일관성
- 모든 카드는 `rounded-[20px]`, `p-6` 사용
- 제목은 항상 `mb-[25px]` 여백
- 색상은 정의된 디자인 시스템 내에서만 사용

### 직관성
- 증가/긍정 = 녹색 (`#46b88b`)
- 감소/부정 = 빨간색 (`#fc4117`)
- 중요도에 따른 텍스트 색상 구분

### 반응성
- 부드러운 애니메이션으로 변화 표현
- 인터랙티브 요소는 시각적 피드백 제공

### 가독성
- 명확한 폰트 크기 및 line height 체계
- 적절한 여백으로 정보 구분
- 색상 대비를 통한 계층 구조 표현
