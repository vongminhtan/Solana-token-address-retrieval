function getSolBalance(tokenAddress, walletAddress) {
  const url = `https://api.mainnet-beta.solana.com`;
  const data = {
      "jsonrpc": "2.0", 
      "id": 1,
      "method": "getTokenAccountsByOwner",
      "params": [
          walletAddress,
          {
            "mint": tokenAddress
          },
          {
            "encoding": "jsonParsed"
          }
      ]
  };

  const options =  {
    'method' : 'post',
    'muteHttpExceptions': true,
    'contentType': 'application/json',
    'payload': JSON.stringify(data)
  }
  
  try {
    const response = UrlFetchApp.fetch(url, options);

    if (response.getResponseCode() == 200){      
      const result = JSON.parse(response.getContentText());

      if(!result) {
        return 0;
      }

      const balance = result.result.value[0].account.data.parsed.info.tokenAmount.uiAmount;

      return balance || 0;
    }
    
    return 0;
   
  } catch {
    return 0;
  }
}