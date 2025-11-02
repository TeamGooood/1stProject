import cosmosIcon from '../assets/cosmos.png'
import babylonIcon from '../assets/babylon.png'
import osmosisIcon from '../assets/osmosis.png'
import secretIcon from '../assets/secret.png'
import { cosmosData, cosmosTimeSeriesData } from './csvData/cosmosData'
import { babylonData, babylonTimeSeriesData } from './csvData/babylonData'
import { secretData, secretTimeSeriesData } from './csvData/secretData'
import { osmosisData, osmosisTimeSeriesData } from './csvData/osmosisData'

export const coinsData = [
  {
    id: 'cosmos',
    name: 'COSMOS HUB',
    symbol: 'ATOM',
    icon: cosmosIcon,
    accountsTotal: cosmosData.accountsTotal,
    transactionsPerBlock: cosmosData.transactionsPerBlock,
    timeSeriesData: cosmosTimeSeriesData
  },
  {
    id: 'osmosis',
    name: 'OSMOSIS',
    symbol: 'OSMO',
    icon: osmosisIcon,
    accountsTotal: osmosisData.accountsTotal,
    transactionsPerBlock: osmosisData.transactionsPerBlock,
    timeSeriesData: osmosisTimeSeriesData
  },
  {
    id: 'secret',
    name: 'SECRET',
    symbol: 'SCRT',
    icon: secretIcon,
    accountsTotal: secretData.accountsTotal,
    transactionsPerBlock: secretData.transactionsPerBlock,
    timeSeriesData: secretTimeSeriesData
  },
  {
    id: 'babylon',
    name: 'BABYLON',
    symbol: 'BABY',
    icon: babylonIcon,
    accountsTotal: babylonData.accountsTotal,
    transactionsPerBlock: babylonData.transactionsPerBlock,
    timeSeriesData: babylonTimeSeriesData
  }
]

