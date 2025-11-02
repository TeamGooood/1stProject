# Design System

## Color System

### Primary Colors
- **Purple Light**: `#DB93F7` - `bg-purple-light`, `text-purple-light`
- **Purple**: `#BB4CE8` - `bg-purple`, `text-purple`
- **Orange**: `#FF9C4D` - `bg-orange`, `text-orange`

### Neutral Colors
- **Gray Light**: `#F0F1F6` - `bg-gray-light`, `text-gray-light`
- **Gray**: `#BAB9BF` - `bg-gray`, `text-gray`
- **Gray Dark**: `#67687D` - `bg-gray-dark`, `text-gray-dark`

## Typography

### Roboto Medium (500)
- **사용처**: Component and layout headings
- **Tailwind 클래스**: `font-roboto font-medium`

### Roboto Regular (400)
- **사용처**: Short paragraph, commonly used in components
- **Tailwind 클래스**: `font-roboto font-normal`

## 사용 예시

```jsx
// Heading
<h1 className="font-roboto font-medium text-purple">제목</h1>

// Paragraph
<p className="font-roboto font-normal text-gray-dark">본문 텍스트</p>

// Button
<button className="bg-purple text-white font-roboto font-medium">
  버튼
</button>

// Card with background
<div className="bg-gray-light p-4 rounded-lg">
  <h2 className="font-roboto font-medium text-gray-dark">카드 제목</h2>
  <p className="font-roboto font-normal text-gray">카드 내용</p>
</div>
```

