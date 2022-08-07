import LitJsSdk from "lit-js-sdk";


const litNodeClient = new LitJsSdk.LitNodeClient();
await litNodeClient.connect();

const chain = 'goerli';


const accessControlConditionsNFT = [
    {
      contractAddress: '0x39Ec448b891c476e166b3C3242A90830DB556661',
      standardContractType: 'ERC721',
      chain : "chain",
      method: 'balanceOf',
      parameters: [
        ':userAddress'
      ],
      returnValueTest: {
        comparator: '>',
        value: '0'
      }
    }
  ]

class Lit {
  litNodeClient

  async connect() {
    await client.connect()
    this.litNodeClient = client
  }

  async encryptString(str) {
    if (!this.litNodeClient) {
      await this.connect()
    }
    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })
    const { encryptedString, symmetricKey } = await LitJsSdk.encryptString("OOOOOK")
    console.log(encryptedString)


    const encryptedSymmetricKey = await this.litNodeClient.saveEncryptionKey({
      accessControlConditions: accessControlConditionsNFT,
      symmetricKey,
      authSig,
      chain,
    })

    
    return {
      encryptedFile: encryptedString,
      encryptedSymmetricKey: LitJsSdk.uint8arrayToString(encryptedSymmetricKey, "base16")
    }

  }




  async decryptString(encryptedStr, encryptedSymmetricKey) {
    if (!this.litNodeClient) {
      await this.connect()
    }
    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })
    const symmetricKey = await this.litNodeClient.getEncryptionKey({
      accessControlConditions: accessControlConditionsNFT,
      toDecrypt: encryptedSymmetricKey,
      chain,
      authSig
    })
    const decryptedFile = await LitJsSdk.decryptString(
      encryptedStr,
      symmetricKey
    );
    // eslint-disable-next-line no-console
    console.log({
      decryptedFile
    })
    return { decryptedFile }
  }

  async signAuthMessage() {

   
    const siweMessage = new siwe.SiweMessage({
    domain,
    address: wallet.address,
    statement,
    uri: origin,
    version: "1",
    chainId: "5",
    });

    const messageToSign = siweMessage.prepareMessage();

    const signature = await wallet.signMessage(messageToSign);

    //console.log("signature", signature);

    const recoveredAddress = ethers.utils.verifyMessage(messageToSign, signature);

    const authSig = {
    sig: signature,
    derivedVia: "web3.eth.personal.sign",
    signedMessage: messageToSign,
    address: recoveredAddress,
    };

    return authSig;
}


}

