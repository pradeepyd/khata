"use client"
import { Keypair, PublicKey } from "@solana/web3.js";
import { mnemonicToSeed } from "bip39"
import { derivePath } from "ed25519-hd-key"
import { useState } from "react";
import nacl from "tweetnacl";
import bs58 from "bs58";

export function SolWallets({ mnemonic }: { mnemonic: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wallets, setWallets] = useState<
    { publicKey: string; privateKey: string }[]
  >([]);

  async function addWallets() {
    //for solana
    let solPrivateKey: string;
    const seed = await mnemonicToSeed(mnemonic);
    const solPath = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(solPath, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);
    solPrivateKey = bs58.encode(secret);
    const solPublicKey = keypair.publicKey.toBase58();
    setCurrentIndex((prev) => prev + 1);
    setWallets((prev) => [
      ...prev,
      {
        publicKey: solPublicKey,
        privateKey: solPrivateKey,
      },
    ]);

  }

  return (
    <div className="items-center m-4 p-2">
      <button onClick={addWallets} className="bg-gray-800 px-4 py-2 m-4 ml-8 rounded border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-gray-600 focus:shadow-none active:bg-gray-600 hover:bg-gray-600 active:shadow-none " type="button">Add Wallet</button>
      <div className="m-4 space-y-4 rounded text-white">
        {wallets.map((w, index) => (
          <div key={index} className="border border-gray-600 space-y-2 rounded  p-2 m-4 ">
            <div className="flex space-x-4 text-2xl items-center justify-centre "><img src="/solana-sol-logo.svg" alt="Solana logo" className="h-6 w-6" /><strong>Account {index + 1}</strong></div>
            <div className="">
            <div className="text-gray-300">Public Key: {w.publicKey}</div>
            <div className="text-gray-300">Private Key: {w.privateKey}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}