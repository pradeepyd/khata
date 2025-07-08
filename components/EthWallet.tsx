"use client"
import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";



export const EthWallet = ({ mnemonic }: { mnemonic: string }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [wallets, setWallets] = useState<
        { publicKey: string; privateKey: string }[]
    >([]);

    async function AddEthWallet() {
        const seed = await mnemonicToSeed(mnemonic);
        const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
        const hdNode = HDNodeWallet.fromSeed(seed);
        const child = hdNode.derivePath(derivationPath);
        const privateKey = child.privateKey;
        const wallet = new Wallet(privateKey);
        const publicKey = wallet.address;
        setCurrentIndex((prev) => prev + 1);
        setWallets((prev) => [
            ...prev,
            {
                publicKey: publicKey,
                privateKey: privateKey
            }
        ])
    }

    return (
        <div className="items-center m-4 p-2">
            <button onClick={AddEthWallet} className="bg-gray-800 px-4 m-4 ml-8 py-2 rounded border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-gray-600 focus:shadow-none active:bg-gray-600 hover:bg-gray-600 active:shadow-none " type="button">
                Add ETH wallet
            </button>
            <div className="m-4 space-y-4 rounded text-white">
                {wallets.map((w, index) => (
                    <div key={index} className="border border-gray-600 space-y-2 rounded p-2 m-4 ">
                        <div className="flex space-x-4 text-2xl items-center justify-centre "><img src="/ethereum-eth-logo.svg" alt="Ethereum logo" className="h-6 w-6" /><strong>Account {index + 1}</strong></div>
                        <div className="text-gray-300">Public Key: {w.publicKey}</div>
                        <div className="text-gray-300">Private Key: {w.privateKey}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}