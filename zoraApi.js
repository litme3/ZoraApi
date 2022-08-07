import { ZDK, ZDKNetwork, ZDKChain } from "@zoralabs/zdk";

const networkInfo = {
    network: ZDKNetwork.Ethereum,
    chain: ZDKChain.Mainnet,
  }

const API_ENDPOINT = "https://api.zora.co/graphql";


let arrayOfArgs = []

let arrayOfTokens = [
    [
        "0x8d04a8c79cEB0889Bdd12acdF3Fa9D207eD3Ff63", //address
        "314"        //tokenId 
    ],
    [
        "0x8d04a8c79cEB0889Bdd12acdF3Fa9D207eD3Ff63", //another address 
        "314"     // another tokenId 
    ]
]

for(let i = 0; i < arrayOfTokens.length; i++){//pushing addresses and tokens to args object
    arrayOfArgs.push({
        token: {
            address: arrayOfTokens[i][0],
            tokenId: arrayOfTokens[i][1]
        },
        includeFullDetails: false 

    })
    
}


// RESPONSE 

const zdk = new ZDK() 

arrayOfArgs.map((args) => {
    const response = zdk.token(args)
    console.log(response)
    response.then(function(result) {
        console.log(result)

    })
}) 

