

### AuthSig data structure : 


``` {
    "sig": "0x18720b54cf0d29d618a90793d5e76f4838f04b559b02f1f01568d8e81c26ae9536e11bb90ad311b79a5bc56149b14103038e5e03fee83931a146d93d150eb0f61c",
    "derivedVia": "web3.eth.personal.sign",
    "signedMessage": "localhost wants you to sign in with your Ethereum account:\n0x1cD4147AF045AdCADe6eAC4883b9310FD286d95a\n\nThis is a test statement.  You can put anything you want here.\n\nURI: https://localhost/login\nVersion: 1\nChain ID: 1\nNonce: gzdlw7mR57zMcGFzz\nIssued At: 2022-04-15T22:58:44.754Z",
    "address": "0x1cD4147AF045AdCADe6eAC4883b9310FD286d95a"
}
```

sig: signature
derivedVia : method used 
signedMessage : message signed
address : msg.sender 