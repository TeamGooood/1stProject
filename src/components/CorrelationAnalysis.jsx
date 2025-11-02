import { useMemo } from 'react'

// 숫자를 읽기 쉬운 형식으로 포맷
function formatNumber(num) {
  if (num === 0) return '0'
  
  const absNum = Math.abs(num)
  
  if (absNum >= 1000000) {
    // 백만 단위
    const val = num / 1000000
    return val % 1 === 0 ? `${val.toFixed(0)}M` : `${val.toFixed(1)}M`
  } else if (absNum >= 1000) {
    // 천 단위
    const val = num / 1000
    return val % 1 === 0 ? `${val.toFixed(0)}K` : `${val.toFixed(1)}K`
  } else if (absNum >= 10) {
    // 10 이상은 소수점 없이
    return num.toFixed(0)
  } else if (absNum >= 1) {
    // 1~10은 소수점 1자리
    return num.toFixed(1)
  } else {
    // 1 미만은 소수점 2자리
    return num.toFixed(2)
  }
}

// 깔끔한 눈금 간격 계산
function getNiceTick(range, targetTicks = 5) {
  const roughStep = range / (targetTicks - 1)
  const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)))
  
  // 1, 2, 5 규칙 적용 (예: 0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50, 100...)
  const normalized = roughStep / magnitude
  let niceTick
  
  if (normalized <= 1) niceTick = 1
  else if (normalized <= 2) niceTick = 2
  else if (normalized <= 5) niceTick = 5
  else niceTick = 10
  
  return niceTick * magnitude
}

// 데이터 범위에 맞는 깔끔한 최소/최대값 계산
function getNiceRange(minValue, maxValue) {
  if (minValue === maxValue) {
    return { min: 0, max: maxValue * 1.2 || 1 }
  }
  
  const dataRange = maxValue - minValue
  
  // 깔끔한 눈금 간격 계산
  const tickSpacing = getNiceTick(dataRange, 5)
  
  // 최소값과 최대값을 눈금 간격에 맞춰 반올림
  let niceMin = Math.floor(minValue / tickSpacing) * tickSpacing
  let niceMax = Math.ceil(maxValue / tickSpacing) * tickSpacing
  
  // 최소값이 작으면 0으로
  if (niceMin < tickSpacing * 0.5) niceMin = 0
  
  // 범위가 너무 좁으면 약간 확장
  if (niceMax - niceMin < tickSpacing * 3) {
    niceMax = niceMin + tickSpacing * 4
  }
  
  return { min: niceMin, max: niceMax }
}

function CorrelationAnalysis({ selectedCoin, dateRange }) {
  // 날짜 범위에 따라 필터링된 데이터
  const filteredData = useMemo(() => {
    if (!selectedCoin?.timeSeriesData || !dateRange) return []
    
    const { startDate, endDate } = dateRange
    return selectedCoin.timeSeriesData.filter(item => {
      const itemDate = new Date(item.date)
      return itemDate >= startDate && itemDate <= endDate
    })
  }, [selectedCoin, dateRange])

  // 산점도 데이터 계산
  const scatterData = useMemo(() => {
    return filteredData.map(item => ({
      accounts: item.accountsMonthly,
      price: item.price
    }))
  }, [filteredData])

  // 축 범위 계산
  const { minAccounts, maxAccounts, minPrice, maxPrice } = useMemo(() => {
    if (scatterData.length === 0) {
      return { minAccounts: 0, maxAccounts: 32000, minPrice: 0, maxPrice: 0.6 }
    }
    
    const accounts = scatterData.map(d => d.accounts)
    const prices = scatterData.map(d => d.price)
    
    const minAcc = Math.min(...accounts)
    const maxAcc = Math.max(...accounts)
    const minPr = Math.min(...prices)
    const maxPr = Math.max(...prices)
    
    // 깔끔한 범위 계산
    const accountsRange = getNiceRange(minAcc, maxAcc)
    const priceRange = getNiceRange(minPr, maxPr)
    
    return {
      minAccounts: accountsRange.min,
      maxAccounts: accountsRange.max || 32000,
      minPrice: priceRange.min,
      maxPrice: priceRange.max || 0.6
    }
  }, [scatterData])

  // Y축 레이블 생성 (깔끔한 간격으로)
  const yLabels = useMemo(() => {
    const range = maxPrice - minPrice
    const tickSpacing = getNiceTick(range, 5)
    const labels = []
    
    for (let i = 0; i < 5; i++) {
      labels.push(minPrice + tickSpacing * i)
    }
    
    return labels.reverse()
  }, [minPrice, maxPrice])

  // X축 레이블 생성 (깔끔한 간격으로)
  const xLabels = useMemo(() => {
    const range = maxAccounts - minAccounts
    const tickSpacing = getNiceTick(range, 5)
    const labels = []
    
    for (let i = 0; i < 5; i++) {
      labels.push(minAccounts + tickSpacing * i)
    }
    
    return labels
  }, [minAccounts, maxAccounts])

  // 좌표를 픽셀로 변환
  const chartWidth = 696
  const chartHeight = 186
  const getX = (accounts) => 
    ((accounts - minAccounts) / (maxAccounts - minAccounts)) * chartWidth
  const getY = (price) => 
    chartHeight - ((price - minPrice) / (maxPrice - minPrice)) * chartHeight

  return (
    <div className="bg-white rounded-[20px] h-[330px] px-[25px] py-[25px] overflow-visible">
      <h2 className="text-[20px] font-medium text-text-primary mb-[25px]">
        Correlation Analysis
      </h2>
      
      <div className="relative overflow-visible" style={{ width: '759px', height: '186px' }}>
        {/* Y축 (Price) */}
        <div className="absolute left-0 top-0 w-[54px] h-[210px] overflow-visible">
          {yLabels.map((label, index) => (
            <div 
              key={index} 
              className="absolute text-[10px] text-text-secondary text-right pr-[12px] leading-[10px] transition-all duration-300"
              style={{ 
                top: index === 0 ? '0px' : index === yLabels.length - 1 ? `${chartHeight - 10}px` : `${index * (chartHeight / 4) - 5}px`, 
                width: '54px' 
              }}
            >
              {formatNumber(label)}
            </div>
          ))}
          <div className="absolute left-[6px] top-1/2 -translate-y-1/2 -rotate-90 origin-left text-[12px] text-text-secondary whitespace-nowrap">
            Price
          </div>
        </div>

        {/* 차트 영역 */}
        <div className="absolute left-[59px] top-0 overflow-visible" style={{ width: '696px', height: '186px' }}>
          {/* 그리드 라인 */}
          <svg className="absolute inset-0 overflow-visible" width="696" height="186">
            {/* 수직 그리드 라인 */}
            {xLabels.map((_, index) => (
              <line
                key={`v-${index}`}
                x1={index * (chartWidth / 4)}
                y1="0"
                x2={index * (chartWidth / 4)}
                y2={chartHeight}
                stroke="#E8E8E8"
                strokeOpacity="0.4"
                strokeWidth="2"
              />
            ))}
            
            {/* 산점도 */}
            {scatterData.map((point, index) => (
              <circle
                key={index}
                cx={getX(point.accounts)}
                cy={getY(point.price)}
                r="3.5"
                fill="#bb4ce8"
                fillOpacity="0.75"
                style={{ transition: 'cx 0.3s ease, cy 0.3s ease' }}
              />
            ))}
          </svg>
        </div>

        {/* X축 (Active Accounts) */}
        <div className="absolute left-[59px] bottom-0 overflow-visible" style={{ width: '696px' }}>
          {xLabels.map((label, index) => (
            <div 
              key={index} 
              className="absolute text-[10px] text-text-secondary transition-all duration-300 -translate-x-1/2"
              style={{ left: `${index * (chartWidth / 4)}px` }}
            >
              {formatNumber(label)}
            </div>
          ))}
        </div>
        <div 
          className="absolute -translate-x-1/2 text-[12px] text-text-secondary leading-[14px]"
          style={{ left: '407px', top: '213px' }}
        >
          Active Accounts
        </div>
      </div>
    </div>
  )
}

export default CorrelationAnalysis

