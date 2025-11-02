import Papa from 'papaparse'

/**
 * CSV 텍스트를 파싱하여 가장 최근 데이터를 반환
 * @param {string} csvText - CSV 파일의 텍스트 내용
 * @returns {object} 최신 데이터 (accountsTotal, transactionsPerBlock)
 */
export function parseLatestCoinData(csvText) {
  const result = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: false
  })

  if (result.data && result.data.length > 0) {
    // 첫 번째 행이 가장 최근 데이터
    const latestRow = result.data[0]
    
    return {
      accountsTotal: formatNumber(latestRow.accountsTotal),
      transactionsPerBlock: parseFloat(latestRow.tpb).toFixed(2)
    }
  }

  return {
    accountsTotal: 'N/A',
    transactionsPerBlock: 'N/A'
  }
}

/**
 * CSV 텍스트를 파싱하여 전체 시계열 데이터를 반환
 * @param {string} csvText - CSV 파일의 텍스트 내용
 * @returns {array} 시계열 데이터 배열 (timestamp, accountsMonthly, price)
 */
export function parseTimeSeriesData(csvText) {
  const result = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: false
  })

  if (result.data && result.data.length > 0) {
    // 데이터를 변환 (역순으로 - 오래된 것부터)
    return result.data
      .reverse()
      .map(row => ({
        timestamp: parseInt(row.timestamp),
        date: new Date(parseInt(row.timestamp)),
        accountsMonthly: parseInt(row.accountsMonthly) || 0,
        price: parseFloat(row.marketPrice) || 0
      }))
      .filter(row => !isNaN(row.timestamp) && row.timestamp > 0)
  }

  return []
}

/**
 * 숫자를 천 단위 콤마로 포맷
 * @param {string|number} num - 포맷할 숫자
 * @returns {string} 포맷된 숫자 문자열
 */
function formatNumber(num) {
  const number = parseInt(num)
  if (isNaN(number)) return 'N/A'
  return number.toLocaleString('en-US')
}

