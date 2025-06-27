"use client"
import { generateMnemonic } from "bip39";
import { useState } from "react";
import { MultiChainWallets } from "./SolWallet";
const MnemonicCard = () => {
    const [mnemonic, setMnemonic] = useState("");
    return (
        <div>
    <button onClick={async function () {
        const mn = await generateMnemonic();
        setMnemonic(mn)
    }}>
        Create Seed Phrase
    </button>
    {/* <input type="text" readOnly value={mnemonic}></input> */}
    <p>{mnemonic}</p>
       {mnemonic && <MultiChainWallets mnemonic={mnemonic}/>}
    </div>
)
}
export default MnemonicCard;
