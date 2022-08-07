import { request, gql } from 'graphql-request'


const profiles = `
query MyQuery {
    token(token: {address: "0xB2837f4B89F921101A8098EbfcDc00b6A70E18fc", tokenId: "1"}, network: {chain: RINKEBY}) {
      token {
        metadata
      }
    }
  }
  
  
`


var response

await request('https://api.zora.co/graphql', profiles).then(data => {
    response = data 
})
console.log(response.token.token.metadata)

