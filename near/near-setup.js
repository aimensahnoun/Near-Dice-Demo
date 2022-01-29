import {
  keyStores,
  Near,
  WalletConnection,
  utils as nearUtils,
} from "near-api-js";

export const CONTRACT_ID = "dice.aimensh.testnet";

export const initNear = () => {
  //Testnet config
  const near = new Near({
    networkId: "testnet",
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
  });

  //Wallet init
  wallet = new WalletConnection(near, "Near Dice Game");
};

//Loaded after the being server to the client
//Due to keystore needing access to the window object
export let wallet = null;
export let contract = null;
export const utils = nearUtils;

//Methods

export const signIn = () => {
  wallet.requestSignIn(CONTRACT_ID);
};

export const signOut = () => {
  wallet.signOut();
};

export const viewFunction = async (functionName, args = {}) => {
  const result = await wallet
    .account()
    .viewFunction(CONTRACT_ID, functionName, args);

  return result;
};

export const callFunction = async (functionName, args = {}, deposit = "0") => {
  const result = await wallet.account().functionCall({
    contractId: CONTRACT_ID,
    methodName: functionName,
    args: args,
    attachedDeposit: utils.format.parseNearAmount(deposit),
  });
  return result;
};
