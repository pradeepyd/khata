"use client"
import { generateMnemonic } from "bip39";
import { useState } from "react";
import { SolWallets } from "./SolWallet";
import { EthWallet } from "./EthWallet";

const MnemonicCard = () => {
    const [mnemonic, setMnemonic] = useState("");
    const words = mnemonic.split(" ");
    let num = 0;
    async function generateMenonics() {
        const mn = await generateMnemonic();
        setMnemonic(mn)
    }
    return (
        <div className="text-white mt-10 mx-auto items-center justify-center w-[700px]">
            <button onClick={generateMenonics} className="bg-gray-800 px-4 m-4 ml-8 py-2 rounded border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-gray-600 focus:shadow-none active:bg-gray-600 hover:bg-gray-600 active:shadow-none " type="button">
                Create Seed Phrase
            </button>
            <div className=" group flex flex-col items-center gap-4 cursor-pointer rounded-lg border border-primary/10 p-8">
                {mnemonic && (<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-center w-full items-center mx-auto my-8">
                    {words.map((word, index) => (
                        <p
                            key={index}
                            className="md:text-lg flex items-center hover:bg-foreground/10 transition-all duration-300 rounded-lg px-3 py-3  space-x-2 border border-gray-600 bg-gray-900 shadow-inner text-sm"
                        >
                            {index + 1}.{word}
                        </p>
                    ))}
                </div>)}
            </div>
            {mnemonic && <SolWallets mnemonic={mnemonic} />}
            {mnemonic && <EthWallet mnemonic={mnemonic} />}
        </div>
    )
}
export default MnemonicCard;
