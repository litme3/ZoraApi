import LitJsSdk from 'lit-js-sdk/build/index.node.js';
import * as u8a from "uint8arrays";
import ethers from "ethers";
import siwe from "siwe";

const go = async () => {

    // -- init litNodeClient
    const litNodeClient = new LitJsSdk.LitNodeClient();

    await litNodeClient.connect();

    const messageToEncrypt = " This dude has followed me ";

    const chain = 'goerli';

    const authSig = await signAuthMessage();

    const accessControlConditions = [
        {
          contractAddress: '0x39Ec448b891c476e166b3C3242A90830DB556661',
          standardContractType: 'ERC721',
          chain,
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

    // 1. Encryption
    // <Blob> encryptedString
    // <Uint8Array(32)> symmetricKey 
    const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(messageToEncrypt);

    // 2. Saving the Encrypted Content to the Lit Nodes
    // <Unit8Array> encryptedSymmetricKey
    const encryptedSymmetricKey = await litNodeClient.saveEncryptionKey({
        accessControlConditions,
        symmetricKey,
        authSig,
        chain,
    });

    console.log("ENCRYPTEEEED", encryptedString);
   

    // 3. Decrypt it
    // <String> toDecrypt
    const toDecrypt = LitJsSdk.uint8arrayToString(encryptedSymmetricKey, 'base16');

    // <Uint8Array(32)> _symmetricKey 
    const _symmetricKey = await litNodeClient.getEncryptionKey({
        accessControlConditions,
        toDecrypt,
        chain,
        authSig
    })

    // <String> decryptedString
    let decryptedString;

    try{
        decryptedString = await LitJsSdk.decryptString(
            encryptedString,
            _symmetricKey
        );
    }catch(e){
        console.log(e);
    }

    console.warn("decryptedString:", decryptedString);
}

/**
 * Get auth signature using siwe
 * @returns 
 */
const signAuthMessage = async () => {

    const privKey ="PRIVATE_KEY";
    const privKeyBuffer = u8a.fromString(privKey, "base16");
    const wallet = new ethers.Wallet(privKeyBuffer);

    const domain = "localhost";
    const origin = "https://localhost/login";
    const statement =
    "This is a test statement.  You can put anything you want here.";

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

go();