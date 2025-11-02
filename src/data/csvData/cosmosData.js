// Cosmos CSV 데이터를 텍스트로 import
import cosmosCSV from '../Cosmos/base-information-of-cosmos-latest (1).csv?raw'
import { parseLatestCoinData, parseTimeSeriesData } from '../../utils/csvParser'

export const cosmosData = parseLatestCoinData(cosmosCSV)
export const cosmosTimeSeriesData = parseTimeSeriesData(cosmosCSV)

