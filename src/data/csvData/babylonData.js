// Babylon CSV 데이터를 텍스트로 import
import babylonCSV from '../babylon/base-information-of-babylon-latest.csv?raw'
import { parseLatestCoinData, parseTimeSeriesData } from '../../utils/csvParser'

export const babylonData = parseLatestCoinData(babylonCSV)
export const babylonTimeSeriesData = parseTimeSeriesData(babylonCSV)

