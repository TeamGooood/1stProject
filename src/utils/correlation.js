/**
 * 스피어만 순위 상관계수 계산
 * @param {number[]} x - 첫 번째 변수 배열
 * @param {number[]} y - 두 번째 변수 배열
 * @returns {number} 스피어만 상관계수 (-1 ~ 1)
 */
export function calculateSpearmanCorrelation(x, y) {
  if (!x || !y || x.length !== y.length || x.length === 0) {
    return 0
  }

  const n = x.length

  // 1. 각 배열의 순위(rank) 계산
  const rankX = getRanks(x)
  const rankY = getRanks(y)

  // 2. 순위 차이의 제곱 합 계산
  let d2Sum = 0
  for (let i = 0; i < n; i++) {
    const d = rankX[i] - rankY[i]
    d2Sum += d * d
  }

  // 3. 스피어만 상관계수 공식: ρ = 1 - (6 * Σd²) / (n * (n² - 1))
  const rho = 1 - (6 * d2Sum) / (n * (n * n - 1))

  return rho
}

/**
 * 배열의 순위(rank) 계산
 * @param {number[]} arr - 순위를 계산할 배열
 * @returns {number[]} 각 원소의 순위 배열
 */
function getRanks(arr) {
  // 값과 인덱스를 함께 저장
  const indexed = arr.map((value, index) => ({ value, index }))
  
  // 값으로 정렬 (오름차순)
  indexed.sort((a, b) => a.value - b.value)
  
  // 순위 배열 생성
  const ranks = new Array(arr.length)
  
  for (let i = 0; i < indexed.length; i++) {
    // 동일한 값 처리 (평균 순위 부여)
    let j = i
    while (j < indexed.length - 1 && indexed[j].value === indexed[j + 1].value) {
      j++
    }
    
    // 순위는 1부터 시작 (i+1)
    const avgRank = (i + j) / 2 + 1
    
    for (let k = i; k <= j; k++) {
      ranks[indexed[k].index] = avgRank
    }
    
    i = j
  }
  
  return ranks
}

/**
 * 변화율 계산 (백분율)
 * @param {number} start - 시작 값
 * @param {number} end - 끝 값
 * @returns {number} 변화율 (%)
 */
export function calculateChangeRate(start, end) {
  if (!start || start === 0) return 0
  return ((end - start) / start) * 100
}

/**
 * 변화율을 포맷된 문자열로 변환
 * @param {number} changeRate - 변화율 (%)
 * @returns {string} 포맷된 문자열 (예: "+ 12.4%", "- 8.1%")
 */
export function formatChangeRate(changeRate) {
  const sign = changeRate >= 0 ? '+' : '-'
  const absValue = Math.abs(changeRate).toFixed(1)
  return `${sign} ${absValue}%`
}

/**
 * 상관계수를 그라디언트 바의 위치(%)로 변환
 * @param {number} coefficient - 상관계수 (-1 ~ 1)
 * @returns {number} 위치 (0 ~ 100%)
 */
export function correlationToPosition(coefficient) {
  // -1 → 0%, 0 → 50%, +1 → 100%
  return ((coefficient + 1) / 2) * 100
}

