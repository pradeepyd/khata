"use client"
import { Keypair, PublicKey } from "@solana/web3.js";
import { mnemonicToSeed } from "bip39"
import { derivePath } from "ed25519-hd-key"
import { useState } from "react";
import nacl from "tweetnacl";
import bs58 from "bs58";
import { Wallet , HDNodeWallet } from "ethers";

export function MultiChainWallets({ mnemonic }: { mnemonic: string }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [publicKeys, setPublicKeys] = useState<PublicKey[]>([]);
     const [wallets, setWallets] = useState<
    { chain: string; publicKey: string; privateKey: string }[]
  >([]);

    async function addWallets() {
        //for solana
        let solPrivateKey : string;
        const seed = await mnemonicToSeed(mnemonic);
        const solPath = `m/44'/501'/${currentIndex}'/0'`;
        const derivedSeed = derivePath(solPath, seed.toString("hex")).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const keypair = Keypair.fromSecretKey(secret);
        solPrivateKey = bs58.encode(secret);
        const solPublicKey = keypair.publicKey.toBase58();

        //for eth
        const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
        const hdNode = HDNodeWallet.fromSeed(seed);
        const child = hdNode.derivePath(derivationPath);
        const privateKey = child.privateKey;
        const wallet = new Wallet(privateKey);
        const ethPublicKey = wallet.address;

         setWallets((prev) => [
      ...prev,
      {
        chain: "Solana",
        // address: solPublicKey,
        publicKey:solPublicKey,
        privateKey: solPrivateKey,
      },
      {
        chain: "Ethereum",
        publicKey: ethPublicKey,
        privateKey:privateKey,
      },
    ]);

    setCurrentIndex((prev) => prev + 1);
    }

    return (
        <div>
      <button onClick={addWallets}>Add Solana + Ethereum Wallet</button>
      {wallets.map((w, i) => (
        <div key={i} className="border p-2 my-1">
          <div><strong>{w.chain} Wallet</strong></div>
          <div>Address: {w.publicKey}</div>
          <div>Private Key: {w.privateKey}</div>
        </div>
      ))}
    </div>
    )
}