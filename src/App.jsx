import { useState } from 'react'
import CoinSelect from './components/CoinSelect'
import CoinData from './components/CoinData'
import TimeSeriesAnalysis from './components/TimeSeriesAnalysis'
import CorrelationAnalysis from './components/CorrelationAnalysis'
import Calendar from './components/Calendar'
import AnalysisSummary from './components/AnalysisSummary'
import { coinsData } from './data/coinsData'

function App() {
  const [selectedCoin, setSelectedCoin] = useState(coinsData[0])
  const [dateRange, setDateRange] = useState({
    startDate: new Date(2025, 9, 14), // October 14, 2025
    endDate: new Date(2025, 9, 30)    // October 30, 2025
  })

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="bg-bg-main rounded-[20px] w-[1300px] h-[950px] p-6 shadow-[10px_10px_50px_0px_rgba(0,0,0,0.1)]">
        <div className="flex gap-6 h-full">
          {/* 왼쪽 영역 */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex flex-col gap-[10px]">
              <CoinSelect 
                coins={coinsData} 
                selectedCoin={selectedCoin} 
                onSelectCoin={setSelectedCoin} 
              />
              <CoinData selectedCoin={selectedCoin} />
            </div>
            <TimeSeriesAnalysis 
              selectedCoin={selectedCoin}
              dateRange={dateRange}
            />
            <CorrelationAnalysis 
              selectedCoin={selectedCoin}
              dateRange={dateRange}
            />
          </div>
          
          {/* 오른쪽 영역 */}
          <div className="w-[413px] flex flex-col gap-6 mt-[53px]">
            <Calendar 
              onDateRangeChange={setDateRange}
            />
            <AnalysisSummary 
              selectedCoin={selectedCoin}
              dateRange={dateRange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
