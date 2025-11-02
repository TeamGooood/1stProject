// Secret CSV 데이터를 텍스트로 import
import secretCSV from '../secret/base-information-of-secret-latest.csv?raw'
import { parseLatestCoinData, parseTimeSeriesData } from '../../utils/csvParser'

export const secretData = parseLatestCoinData(secretCSV)
export const secretTimeSeriesData = parseTimeSeriesData(secretCSV)

