// Osmosis CSV 데이터를 텍스트로 import
import osmosisCSV from '../osmisis/base-information-of-osmosis-latest (1).csv?raw'
import { parseLatestCoinData, parseTimeSeriesData } from '../../utils/csvParser'

export const osmosisData = parseLatestCoinData(osmosisCSV)
export const osmosisTimeSeriesData = parseTimeSeriesData(osmosisCSV)

