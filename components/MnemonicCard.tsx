"use client";
import { generateMnemonic } from "bip39";
import { useState } from "react";
import { SolWallets } from "./SolWallet";
import { EthWallet } from "./EthWallet";
import { Eye, EyeOff, ChevronDown, ChevronUp } from "lucide-react";

const MnemonicCard = () => {
  const [mnemonic, setMnemonic] = useState("");
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState("");
  const words = mnemonic.split(" ");

  async function generateMenonics() {
    const mn = await generateMnemonic();
    setMnemonic(mn);
    setIsExpanded(false);
    setShowMnemonic(false);
  }

  const handleWalletChange = (e: any) => {
    setSelectedWallet(e.target.value);
  };

  return (
    <div className="text-[#F5F5F5] px-10">

      <h2 className="text-gray-300 font-normal mb-4">
        Select the blockchain you want to create an account
      </h2>
      <div className="flex flex-col md:flex-row justify-between items-start w-full">
        <div className="flex flex-col  space-y-2 mb-6">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="wallet"
              value="solana"
              checked={selectedWallet === "solana"}
              onChange={handleWalletChange}
              className="form-radio h-5 w-5 text-blue-600"
            />
            <span className="text-white/85">Solana Wallet</span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="wallet"
              value="ethereum"
              checked={selectedWallet === "ethereum"}
              onChange={handleWalletChange}
              className="form-radio h-5 w-5 text-blue-600"
            />
            <span className="text-white/85">Ethereum Wallet</span>
          </label>
        </div>

      
        {!mnemonic && (<button
          onClick={generateMenonics}
          disabled={!selectedWallet}
          className="bg-gray-600 px-4 mt-4 mb-4 py-2 rounded border"
        >
          Generate Wallet
        </button>)}
      </div>
      {mnemonic && (
        <div className="group flex flex-col cursor-pointer rounded-lg border border-gray-600 px-8 justify-between">
          <div className="flex items-center justify-between">
            <h1 className="font-neutral py-2 mt-4 mb-2 text-2xl md:text-3xl">
              Your Seed Phrase
            </h1>

            <div className="flex space-x-4">
              {/* Eye icon */}
              <button onClick={() => setShowMnemonic(!showMnemonic)}>
                {showMnemonic ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>

              {/* Chevron icon */}
              <button onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>
          </div>

          {isExpanded && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-center w-full items-center mx-auto m-4 mb-8">
              {words.map((word, index) => (
                <p
                  key={index}
                  className={`md:text-lg flex items-center rounded-lg px-3 py-3 space-x-2 border border-gray-600 bg-[#0B1215] shadow-inner text-sm transition-all duration-500 ${showMnemonic ? "blur-none" : "blur-sm"
                    }`}
                >
                  {index + 1}.&nbsp;{word}
                </p>
              ))}
            </div>
          )}

          <p className="p-2 mb-4 text-md">
            <span className="text-red-500">*</span> Please keep this code securely.
          </p>
        </div>
      )}

      {mnemonic && selectedWallet === "solana" && <SolWallets mnemonic={mnemonic} />}
      {mnemonic && selectedWallet === "ethereum" && <EthWallet mnemonic={mnemonic} />}
    </div>
  );
};

export default MnemonicCard;
