"use client"
import { Keypair, PublicKey } from "@solana/web3.js";
import { mnemonicToSeed } from "bip39"
import { derivePath } from "ed25519-hd-key"
import { useState } from "react";
import nacl from "tweetnacl";
import bs58 from "bs58";
import { ChevronDown, ChevronUp, Eye, EyeOff, Trash2Icon } from "lucide-react";


export function SolWallets({ mnemonic }: { mnemonic: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedIndexes, setExpandedIndexes] = useState<number[]>([]);
  const [showPublicKeys, setShowPublicKeys] = useState<boolean[]>([]);

  const [wallets, setWallets] = useState<
    { publicKey: string; privateKey: string }[]
  >([]);

  const handleDelete = (index: number) => {
    const updatedWallets = [...wallets];
    updatedWallets.splice(index, 1);
    setWallets(updatedWallets);
  };

  const handleToggleExpand = (index: number) => {
    if (expandedIndexes.includes(index)) {
      setExpandedIndexes(expandedIndexes.filter(i => i !== index));
    } else {
      setExpandedIndexes([...expandedIndexes, index]);
    }
  };

  const handleTogglePublicKey = (index: number) => {
    const updatedShow = [...showPublicKeys];
    updatedShow[index] = !updatedShow[index];
    setShowPublicKeys(updatedShow);
  };

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
    setShowPublicKeys(prev => [...prev, false]);
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
    <div >
      <button onClick={addWallets} className="bg-gray-600 px-4 py-2 mt-8  rounded border border-transparent text-center text-md text-white transition-all shadow-md hover:shadow-lg focus:bg-gray-600 focus:shadow-none active:bg-gray-600 hover:bg-gray-600 active:shadow-none " type="button">Add Solana Wallet</button>
      <div className="mt-8 space-y-8 rounded-lg text-[#ECECEC] py-2 ">
        {wallets.map((w, index) => (
          <div key={index} className="border border-gray-600 space-y-6 rounded-lg px-4">
            <div className="flex justify-between items-center pb-2">
              <div className="flex space-x-4 text-3xl items-center mt-4 justify-centre ">
                <img src="/solana-sol-logo.svg" alt="Solana logo" className="h-7 w-7" />
                <strong className="text-3xl my-2 pb-2">Account {index + 1}</strong>
              </div>
              <div className="flex space-x-4 mr-4">
                <button
                  onClick={() => handleDelete(index)}
                  className="mr-4 hover:text-red-500 transition-colors"
                >
                  <Trash2Icon size={20} className="text-red-800" />
                </button>
                <button onClick={() => handleToggleExpand(index)}>
                  {expandedIndexes.includes(index) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>
            </div>
            {expandedIndexes.includes(index) && (<div className=" space-y-8 mt-4 mb-2">
              <div className="text-gray-300 my-4 py-2"><strong className="text-xl">Public Key:  </strong>{w.publicKey}</div>
              <div className="text-gray-300 my-4 pb-2 flex items-center justify-between">
                <div><strong className="text-xl">Private Key: </strong>  <span className={`${showPublicKeys[index] ? "" : ""} break-all`}>
                {showPublicKeys[index] ? w.privateKey : "•••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••"}
              </span>
              </div>
                <button onClick={() => handleTogglePublicKey(index)}>
                  {showPublicKeys[index] ? <Eye size={20} /> : <EyeOff size={20} />}
                </button></div>
            </div>)}
          </div>
        ))}
      </div>
    </div>
  )
}