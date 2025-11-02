function CoinData({ selectedCoin }) {
  return (
    <div className="bg-white rounded-[20px] h-[91px] pl-[25px] pr-[17px] py-[13px] flex items-center gap-[8px]">
      {/* 코인 아이콘 */}
      <img src={selectedCoin.icon} alt={selectedCoin.name} className="w-[72px] h-[72px]" />
      
      {/* 코인 이름 */}
      <div className="flex flex-col justify-center">
        <h2 className="text-2xl font-medium text-text-primary">{selectedCoin.name}</h2>
        <p className="text-xl text-text-secondary">{selectedCoin.symbol}</p>
      </div>
      
      {/* 오른쪽 정보 카드들 */}
      <div className="ml-auto flex gap-[13px]">
        {/* Accounts Total */}
        <div className="bg-card-bg rounded-[10px] w-[198px] h-[65px] px-[17px] py-[10px]">
          <p className="text-[15px] text-text-secondary leading-[18px] mb-[4px]">Accounts Total</p>
          <p className="text-xl font-medium text-text-primary leading-[23px]">{selectedCoin.accountsTotal}</p>
        </div>
        
        {/* Transactions Per Block */}
        <div className="bg-card-bg rounded-[10px] w-[198px] h-[65px] px-[17px] py-[10px]">
          <p className="text-[15px] text-text-secondary leading-[18px] mb-[4px]">Transactions Per Block</p>
          <p className="text-xl font-medium text-text-primary leading-[23px]">{selectedCoin.transactionsPerBlock}</p>
        </div>
      </div>
    </div>
  )
}

export default CoinData

