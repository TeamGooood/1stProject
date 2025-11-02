function CoinSelect({ coins, selectedCoin, onSelectCoin }) {
  return (
    <div className="flex gap-3">
      {coins.map((coin) => (
        <button
          key={coin.id}
          onClick={() => onSelectCoin(coin)}
          className={`rounded-[22px] h-[44px] px-[17px] flex items-center justify-center transition-all ${
            selectedCoin.id === coin.id
              ? 'bg-purple-light'
              : 'bg-white hover:bg-gray-100'
          }`}
        >
          <span className={`text-base ${
            selectedCoin.id === coin.id
              ? 'text-white font-medium'
              : 'text-text-primary'
          }`}>
            {coin.name}
          </span>
        </button>
      ))}
    </div>
  )
}

export default CoinSelect

