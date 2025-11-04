import { useState, useMemo, useCallback, useRef, memo } from 'react'
import {
  ComposedChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'

// 좌측 정보 패널 컴포넌트 (메모이제이션으로 최적화)
const InfoPanel = memo(({ displayData }) => {
  return (
    <div className="w-[125px] ml-[34px] flex-shrink-0 mt-[24px]">
      {displayData ? (
        <>
          {/* 날짜 */}
          <p className="text-[16px] text-text-primary mb-[13px] leading-[19px]">
            {displayData.dateStr}
          </p>
          
          {/* 구분선 */}
          <div className="divider-light mb-[25px]" />
          
          {/* Active Accounts */}
          <div className="mb-[15px]">
            <p className="text-[14px] text-text-secondary mb-[7px] leading-[16px]">
              Active Accounts
            </p>
            <p className="text-[24px] font-bold text-orange leading-[28px]">
              {displayData.accountsMonthly.toLocaleString()}
            </p>
          </div>
          
          {/* Price */}
          <div>
            <p className="text-[14px] text-text-secondary mb-[7px] leading-[16px]">
              Price
            </p>
            <p className="text-[24px] font-bold text-purple leading-[28px]">
              ${displayData.price.toFixed(2)}
            </p>
          </div>
        </>
      ) : (
        <p className="text-[14px] text-text-secondary">No data available</p>
      )}
    </div>
  )
})

function TimeSeriesAnalysis({ selectedCoin, dateRange }) {
  const [hoveredData, setHoveredData] = useState(null)
  const lastHoveredKey = useRef(null)

  // 날짜 범위에 맞는 데이터 필터링 및 최적화
  const filteredData = useMemo(() => {
    if (!selectedCoin?.timeSeriesData || !dateRange.startDate || !dateRange.endDate) {
      return []
    }

    const startTime = dateRange.startDate.getTime()
    // endDate 다음 날 자정까지 포함 (endDate 당일 전체를 포함하기 위함)
    const endTime = dateRange.endDate.getTime() + 24 * 60 * 60 * 1000

    const filtered = selectedCoin.timeSeriesData
      .filter(item => {
        const itemTime = item.date.getTime()
        return itemTime >= startTime && itemTime < endTime
      })
      .map(item => ({
        date: item.date.getDate(), // 일자만 표시 (X축 레이블용)
        dateKey: `${item.date.getMonth()}-${item.date.getDate()}`, // 고유 키 (월-일 조합)
        dateStr: `${item.date.toLocaleString('en-US', { month: 'long' })} ${item.date.getDate()}`,
        accountsMonthly: item.accountsMonthly,
        price: item.price
      }))
    
    // 성능 최적화: 데이터가 너무 많으면 적절히 샘플링
    // 180일 이상의 데이터는 2일마다 하나씩 샘플링 (마지막 데이터는 항상 포함)
    if (filtered.length > 180) {
      const sampled = []
      for (let i = 0; i < filtered.length; i += 2) {
        sampled.push(filtered[i])
      }
      // 마지막 데이터가 포함되지 않았으면 추가
      if (filtered.length % 2 !== 0) {
        sampled.push(filtered[filtered.length - 1])
      }
      return sampled
    }
    
    return filtered
  }, [selectedCoin, dateRange])

  // X축 tick 계산 (선택한 기간에 따라 동적으로 조정)
  const xAxisTicks = useMemo(() => {
    if (filteredData.length === 0) return []
    
    const dataLength = filteredData.length
    let interval = 1
    
    // 데이터 개수에 따라 간격 조정
    if (dataLength > 90) {
      interval = Math.floor(dataLength / 10) // 약 10개 표시
    } else if (dataLength > 60) {
      interval = Math.floor(dataLength / 12) // 약 12개 표시
    } else if (dataLength > 30) {
      interval = Math.floor(dataLength / 15) // 약 15개 표시
    } else if (dataLength > 14) {
      interval = 2 // 2일 간격
    }
    // 14일 이하는 모든 날짜 표시
    
    return filteredData
      .filter((_, index) => index % interval === 0 || index === dataLength - 1)
      .map(item => item.dateKey)
  }, [filteredData])

  // 현재 표시할 정보 (hover된 데이터 또는 가장 최근 데이터)
  const displayData = hoveredData || (filteredData.length > 0 ? filteredData[filteredData.length - 1] : null)

  // 커스텀 툴팁 (최적화: 동일한 데이터 포인트는 상태 업데이트 안함)
  const CustomTooltip = useCallback(({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      const currentKey = data.dateKey
      
      // 이전과 다른 데이터 포인트일 때만 상태 업데이트
      if (lastHoveredKey.current !== currentKey) {
        lastHoveredKey.current = currentKey
        setHoveredData(data)
      }
    }
    return null
  }, [])
  
  // 마우스가 차트를 벗어날 때
  const handleMouseLeave = useCallback(() => {
    lastHoveredKey.current = null
    setHoveredData(null)
  }, [])

  return (
    <div className="bg-white rounded-[20px] flex-1 pt-[25px] pb-[25px] flex flex-col">
      {/* 타이틀 */}
      <h2 className="text-[20px] font-medium text-text-primary mb-[38px] pl-[25px] leading-[23px]">
        Time Series Analysis
      </h2>
      
      {/* 좌측 정보와 그래프를 같은 row에 배치 */}
      <div className="flex items-start">
        {/* 좌측 선택된 정보 */}
        <InfoPanel displayData={displayData} />

        {/* 그래프 영역 */}
        <div className="w-[626px] h-[261px] flex-shrink-0 relative ml-[13px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={filteredData}
            margin={{ top: 0, right: 5, left: 7, bottom: 23 }}
            onMouseLeave={handleMouseLeave}
          >
            <defs>
              <linearGradient id="colorActiveAccounts" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff9c4d" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#ff9c4d" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#bb4ce8" stopOpacity={0.4} />
                <stop offset="60%" stopColor="#bb4ce8" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#bb4ce8" stopOpacity={0} />
              </linearGradient>
            </defs>
            
            <CartesianGrid 
              strokeDasharray="0" 
              stroke="#e8e8e8" 
              strokeOpacity={0.3} 
              strokeWidth={2}
              vertical={true}
              horizontal={false}
            />
            
            <XAxis
              dataKey="dateKey"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6c6e6f', fontSize: 10 }}
              ticks={xAxisTicks}
              tickFormatter={(value) => {
                // "9-30" -> "30" 형식으로 변환 (월-일 -> 일자만)
                const parts = value.split('-')
                return parts.length === 2 ? parts[1] : value
              }}
              dy={8}
            />
            
            <YAxis
              yAxisId="left"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6c6e6f', fontSize: 10 }}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
              tickCount={5}
              domain={['dataMin - 5000', 'dataMax + 5000']}
              label={{ 
                value: 'Active Accounts', 
                angle: -90, 
                position: 'insideLeft',
                offset: 12,
                style: { 
                  textAnchor: 'middle',
                  fill: '#6c6e6f',
                  fontSize: 12,
                  lineHeight: '14.0625px'
                }
              }}
            />
            
            <YAxis
              yAxisId="right"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6c6e6f', fontSize: 10 }}
              tickFormatter={(value) => value.toFixed(2)}
              tickCount={5}
              domain={['dataMin - 0.5', 'dataMax + 0.5']}
              label={{ 
                value: 'Price', 
                angle: 90, 
                position: 'insideRight',
                offset: 12,
                style: { 
                  textAnchor: 'middle',
                  fill: '#6c6e6f',
                  fontSize: 12,
                  lineHeight: '14.0625px'
                }
              }}
            />
            
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#6c6e6f', strokeWidth: 1, strokeOpacity: 0.3 }} />
            
            <Legend
              verticalAlign="bottom"
              height={14}
              iconType="square"
              iconSize={10}
              align="center"
              wrapperStyle={{ 
                position: 'absolute',
                bottom: '0px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '12px'
              }}
              formatter={(value) => (
                <span style={{ color: '#6c6e6f', fontSize: '12px', marginLeft: '7px' }}>{value}</span>
              )}
            />
            
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="accountsMonthly"
              name="Active Accounts"
              stroke="#ff9c4d"
              strokeWidth={3}
              fill="url(#colorActiveAccounts)"
              dot={false}
              activeDot={{ r: 5, fill: '#ff9c4d', strokeWidth: 0 }}
            />
            
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="price"
              name="Price"
              stroke="#bb4ce8"
              strokeWidth={3}
              fill="url(#colorPrice)"
              dot={false}
              activeDot={{ r: 5, fill: '#bb4ce8', strokeWidth: 0 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default TimeSeriesAnalysis

