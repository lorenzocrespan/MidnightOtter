/*
 *  NOTE:
 *    The following file defines the calls to interact with the
 *    smart contract.
 *
 */

import { ethers } from "ethers";

const loadContractABI = async () => {
  // Load the ABI from the ABI file.
  const data = require("./smartcontract.json");
  // Return the ABI.
  return data.abi;
};

const loadContractAddress = async () => {
  // Load the contract address from the .env.local file.
  const address = "0x1bf296B7F9B19DdA530bAA8D15d8D840e1f62209";
  // Return the contract address.
  return address;
};

export const getContract = async () => {
  console.log("[SMART CONTRACT] Init get contract");
  // Load the ABI.
  const abi = await loadContractABI();
  // Load the contract address.
  const address = await loadContractAddress();

  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();

  const contract = new ethers.Contract(address, abi, provider) as any;

  const contractWithSigner = contract.connect(signer);

  return contractWithSigner;
};

/**
 * Function to send a transaction to the smart contract.
 *
 * @param contract Contract to send the transaction to.
 * @param func Function to call.
 * @param args Arguments to pass to the function.
 * @returns The transaction receipt.
 *
 */
export const sendTransaction = async (contract: any, func: any, args: any) => {
  console.log("[SMART CONTRACT] Init send transaction");
  const tx = await contract[func](...args);
  const receipt = await tx.wait();
  return receipt;
};

/**
 * Function to interact with read-only functions of the smart contract.
 *
 * @param contract Contract to send the transaction to.
 * @param func Function to call.
 * @param args Arguments to pass to the function.
 * @returns The transaction receipt.
 *
 */
export const callReadOnly = async (contract: any, func: any, args: any) => {
  console.log("[SMART CONTRACT] Init call read only");
  const result = await contract[func](...args);
  return result;
};
