import { useMemo } from 'react'
import { 
  calculateSpearmanCorrelation, 
  calculateChangeRate, 
  formatChangeRate,
  correlationToPosition 
} from '../utils/correlation'

function AnalysisSummary({ selectedCoin, dateRange }) {
  // 날짜 범위 내의 데이터 필터링 및 계산
  const analysisData = useMemo(() => {
    if (!selectedCoin || !dateRange || !selectedCoin.timeSeriesData) {
      return {
        accountsChange: 0,
        priceChange: 0,
        correlation: 0,
        accountsChangeFormatted: '+ 0.0%',
        priceChangeFormatted: '+ 0.0%',
        indicatorPosition: 50
      }
    }

    const { startDate, endDate } = dateRange
    
    // 날짜 범위 내의 데이터 필터링
    const filteredData = selectedCoin.timeSeriesData.filter(item => {
      const itemDate = new Date(item.date)
      return itemDate >= startDate && itemDate <= endDate
    })

    if (filteredData.length === 0) {
      return {
        accountsChange: 0,
        priceChange: 0,
        correlation: 0,
        accountsChangeFormatted: '+ 0.0%',
        priceChangeFormatted: '+ 0.0%',
        indicatorPosition: 50
      }
    }

    // 첫 번째와 마지막 데이터
    const firstData = filteredData[0]
    const lastData = filteredData[filteredData.length - 1]

    // 변화율 계산
    const accountsChange = calculateChangeRate(firstData.accountsMonthly, lastData.accountsMonthly)
    const priceChange = calculateChangeRate(firstData.price, lastData.price)

    // 스피어만 상관계수 계산
    const accounts = filteredData.map(d => d.accountsMonthly)
    const prices = filteredData.map(d => d.price)
    const correlation = calculateSpearmanCorrelation(accounts, prices)

    // 인디케이터 위치 계산
    const indicatorPosition = correlationToPosition(correlation)

    return {
      accountsChange,
      priceChange,
      correlation,
      accountsChangeFormatted: formatChangeRate(accountsChange),
      priceChangeFormatted: formatChangeRate(priceChange),
      indicatorPosition
    }
  }, [selectedCoin, dateRange])

  return (
    <div className="bg-white rounded-[20px] flex-1 p-6 pr-[35px] pb-[29px]">
      {/* 제목 */}
      <h2 className="text-[20px] font-medium text-black mb-[25px] leading-[23px]">
        Analysis Summary
      </h2>
      
      {/* 내용 영역 (제목보다 안쪽으로) */}
      <div className="pl-[13px]">
        {/* Active Accounts Change & Price Change */}
        <div className="space-y-[20px] mb-[26px]">
          {/* Active Accounts Change */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[7px]">
              <div className="indicator-box bg-orange" />
              <span className="text-[16px] text-text-secondary leading-[19px]">Active Accounts Change</span>
            </div>
            <span 
              className={`text-[16px] leading-[19px] transition-color-smooth ${
                analysisData.accountsChange >= 0 ? 'text-success' : 'text-danger'
              }`}
            >
              {analysisData.accountsChangeFormatted}
            </span>
          </div>

          {/* Price Change */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[7px]">
              <div className="indicator-box bg-purple" />
              <span className="text-[16px] text-text-secondary leading-[19px]">Price Change</span>
            </div>
            <span 
              className={`text-[16px] leading-[19px] transition-color-smooth ${
                analysisData.priceChange >= 0 ? 'text-success' : 'text-danger'
              }`}
            >
              {analysisData.priceChangeFormatted}
            </span>
          </div>
        </div>

        {/* 구분선 */}
        <div className="divider-medium mb-[21px]" />

        {/* Correlation Coefficient */}
        <div className="mb-[29px]">
          <p className="text-[16px] text-text-secondary mb-[6px] leading-[19px]">Correlation Coefficient</p>
          <p className="text-[24px] font-medium text-text-primary leading-[28px]">
            {analysisData.correlation.toFixed(2)}
          </p>
        </div>

        {/* Correlation Scale */}
        <div className="mb-[9px] relative">
          {/* 그라디언트 라인 */}
          <div className="h-[10px] w-full bg-correlation-gradient rounded-full" />
          
          {/* 구분선 (흰색 세로선) */}
          <div className="absolute left-[25%] top-0 w-[1px] h-[10px] bg-white" />
          <div className="absolute left-[50%] top-0 w-[1px] h-[10px] bg-white" />
          <div className="absolute left-[75%] top-0 w-[1px] h-[10px] bg-white" />
          
          {/* 현재 값 인디케이터 */}
          <div 
            className="absolute top-[-3px] transition-smooth" 
            style={{ left: `${analysisData.indicatorPosition}%` }}
          >
            <div className="correlation-indicator" />
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

        {/* 설명 텍스트 */}
        <p className="text-[12px] text-tertiary leading-[14px]">
          This shows how strongly two variables move together. <br />
          0 means no correlation, +1 means a strong positive link, <br />
          and -1 means a strong negative link.
        </p>
      </div>
    </div>
  )
}

export default AnalysisSummary

