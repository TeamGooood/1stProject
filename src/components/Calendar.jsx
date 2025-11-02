import { useState, useEffect } from 'react'

function Calendar({ onDateRangeChange }) {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 1)) // October 2025
  const [startDate, setStartDate] = useState(new Date(2025, 9, 14)) // October 14, 2025
  const [endDate, setEndDate] = useState(new Date(2025, 9, 30)) // October 30, 2025

  // 날짜 범위가 변경될 때 부모 컴포넌트에 알림
  useEffect(() => {
    if (startDate && endDate && onDateRangeChange) {
      onDateRangeChange({ startDate, endDate })
    }
  }, [startDate, endDate, onDateRangeChange])

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December']

  // 달력 생성 함수 (6줄 고정, 앞뒤 달 날짜 포함)
  const generateCalendar = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const daysInPrevMonth = new Date(year, month, 0).getDate()
    
    // 이전 달의 마지막 날짜들
    const prevMonthDays = []
    for (let i = firstDay - 1; i >= 0; i--) {
      prevMonthDays.push({
        date: daysInPrevMonth - i,
        isCurrentMonth: false
      })
    }
    
    // 현재 달의 날짜들
    const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => ({
      date: i + 1,
      isCurrentMonth: true
    }))
    
    // 다음 달의 처음 날짜들 (6줄 = 42개 셀을 채우기 위해)
    const totalCells = prevMonthDays.length + currentMonthDays.length
    const remainingCells = 42 - totalCells
    const nextMonthDays = []
    for (let i = 1; i <= remainingCells; i++) {
      nextMonthDays.push({
        date: i,
        isCurrentMonth: false
      })
    }
    
    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]
  }

  const calendarDays = generateCalendar()

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  // Date 객체 비교 헬퍼 함수
  const isSameDate = (date1, date2) => {
    if (!date1 || !date2) return false
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate()
  }

  const isStartDate = (dateObj) => {
    if (!startDate || !dateObj.isCurrentMonth) return false
    return currentDate.getMonth() === startDate.getMonth() &&
           currentDate.getFullYear() === startDate.getFullYear() &&
           dateObj.date === startDate.getDate()
  }

  const isEndDate = (dateObj) => {
    if (!endDate || !dateObj.isCurrentMonth) return false
    return currentDate.getMonth() === endDate.getMonth() &&
           currentDate.getFullYear() === endDate.getFullYear() &&
           dateObj.date === endDate.getDate()
  }

  const isInRange = (dateObj) => {
    if (!startDate || !endDate || !dateObj.isCurrentMonth) return false
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), dateObj.date)
    return checkDate >= startDate && checkDate <= endDate
  }

  // 날짜 클릭 핸들러
  const [selecting, setSelecting] = useState(false)
  
  const handleDateClick = (dateObj) => {
    // 해당 달이 아닌 날짜는 클릭 불가
    if (!dateObj.isCurrentMonth) return
    
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), dateObj.date)
    
    if (!selecting) {
      setStartDate(clickedDate)
      setEndDate(null)
      setSelecting(true)
    } else {
      if (clickedDate < startDate) {
        setEndDate(startDate)
        setStartDate(clickedDate)
      } else {
        setEndDate(clickedDate)
      }
      setSelecting(false)
    }
  }

  // 선택 영역 회색 배경 계산
  const getSelectionBackgrounds = () => {
    if (!startDate || !endDate) return []
    
    // 현재 보고 있는 달의 선택된 날짜만 계산
    const viewYear = currentDate.getFullYear()
    const viewMonth = currentDate.getMonth()
    const firstDay = new Date(viewYear, viewMonth, 1).getDay()
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
    
    const backgrounds = []
    
    // 현재 달의 각 날짜를 확인
    for (let day = 1; day <= daysInMonth; day++) {
      const checkDate = new Date(viewYear, viewMonth, day)
      
      // 선택 범위에 포함되는지 확인
      if (checkDate >= startDate && checkDate <= endDate) {
        const index = firstDay + day - 1
        const row = Math.floor(index / 7)
        const col = index % 7
        
        if (!backgrounds[row]) {
          backgrounds[row] = { row, minCol: col, maxCol: col }
        } else {
          backgrounds[row].minCol = Math.min(backgrounds[row].minCol, col)
          backgrounds[row].maxCol = Math.max(backgrounds[row].maxCol, col)
        }
      }
    }
    
    // 각 행의 회색 배경 위치/크기 계산 (퍼센트로)
    return backgrounds.filter(Boolean).map(bg => {
      const dateCount = bg.maxCol - bg.minCol + 1
      return {
        leftPercent: (bg.minCol / 7) * 100,
        widthPercent: (dateCount / 7) * 100,
        row: bg.row,
        minCol: bg.minCol,
        maxCol: bg.maxCol
      }
    })
  }

  const selectionBackgrounds = getSelectionBackgrounds()


  return (
    <div className="bg-white rounded-[20px] h-[451px] px-[26px] py-[25px]">
      {/* 월/년도와 화살표 */}
      <div className="flex items-center justify-center mb-[25px] relative">
        <button 
          onClick={prevMonth}
          className="absolute left-[16px] text-purple-light hover:text-purple transition-colors"
        >
          <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 1L2 8L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h3 className="text-xl font-medium text-text-primary">
          {monthNames[currentDate.getMonth()]}&nbsp;&nbsp;{currentDate.getFullYear()}
        </h3>
        <button 
          onClick={nextMonth}
          className="absolute right-[16px] text-purple-light hover:text-purple transition-colors"
        >
          <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L8 8L1 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 mb-[35px]">
        {weekDays.map((day) => (
          <div key={day} className="text-base text-text-secondary text-center">
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-y-[35px] relative">
        {/* 선택 영역 회색 배경 */}
        {selectionBackgrounds.map((bg, index) => {
          // 각 행의 날짜 텍스트 중심 계산 (날짜 텍스트 높이 19px, 행 간격 35px)
          // 날짜 텍스트 중심: row * (19px + 35px) + 19px/2
          // 보라색 원 중심 = 날짜 텍스트 중심
          // 보라색 원 top = 원 중심 - 39px/2 = row * (19px + 35px) + 19px/2 - 39px/2
          // 회색 배경 top = 보라색 원 top - 2px = row * (19px + 35px) + 19px/2 - 39px/2 - 2px
          const rowTop = bg.row * (19 + 35) + 19/2 - 39/2 - 2
          const bgHeight = 43 // 39px (보라색 원) + 4px (상하 각 2px)
          // 보라색 원형의 border-radius는 39px / 2 = 19.5px
          // 회색 배경도 같은 곡률을 가지므로, 보라색 원형의 반지름(19.5px)에 2px를 더한 값
          const borderRadius = 21.5 // 19.5px + 2px
          const leftOffset = 2 // 좌우 확장 수치 (px)
          
          return (
            <div
              key={`bg-${bg.row}-${bg.minCol}-${bg.maxCol}-${startDate?.getTime()}-${endDate?.getTime()}`}
              className="absolute bg-gray-light pointer-events-none"
              style={{
                left: `calc(${bg.leftPercent}% + 4px)`,
                top: `${rowTop}px`,
                width: `calc(${bg.widthPercent}% - 8px)`,
                height: `${bgHeight}px`,
                borderRadius: `${borderRadius}px`
              }}
            />
          )
        })}

        {calendarDays.map((dateObj, index) => (
          <div key={index} className="flex items-center justify-center h-[19px] relative">
            <>
              {/* Start/End 원형 배경 */}
              {(isStartDate(dateObj) || isEndDate(dateObj)) && (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[39px] h-[39px] bg-purple-light rounded-full" />
              )}
              
              {/* 날짜 텍스트 */}
              <button
                onClick={() => handleDateClick(dateObj)}
                disabled={!dateObj.isCurrentMonth}
                className={`relative z-10 text-base transition-opacity ${
                  !dateObj.isCurrentMonth
                    ? 'text-text-secondary opacity-50 cursor-not-allowed'
                    : isStartDate(dateObj) || isEndDate(dateObj)
                    ? 'text-white cursor-pointer hover:opacity-80'
                    : 'text-text-primary cursor-pointer hover:opacity-80'
                }`}
              >
                {dateObj.date}
              </button>
            </>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Calendar

