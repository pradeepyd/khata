"use client";
import { useState } from "react";
import MnemonicCard from "./MnemonicCard";

const SelectWallet = () => {
  const [selectedWallet, setSelectedWallet] = useState("");

  const handleWalletChange = (e:any) => {
    setSelectedWallet(e.target.value);
  };

  return (
    <div className="ml-10">
      <h2 className="text-gray-300 font-normal mb-4">
        Select the blockchain you want to create an account
      </h2>

      <div className="flex flex-col space-y-2">
        <label className="flex items-center space-x-3">
          <input
            type="radio"
            name="wallet"
            value="solana"
            checked={selectedWallet === "solana"}
            onChange={handleWalletChange}
            className="form-radio h-5 w-5 text-blue-600"
          />
          <span className="text-white">Solana Wallet</span>
        </label>

        <label className="flex items-center space-x-3">
          <input
            type="radio"
            name="wallet"
            value="ethereum"
            checked={selectedWallet === "ethereum"}
            onChange={handleWalletChange}
            className="form-radio h-5 w-5 text-blue-600"
          />
          <span className="text-white">Ethereum Wallet</span>
        </label>
      </div>

      <div className="mt-6">
        {selectedWallet && <MnemonicCard selectedWallet={selectedWallet} />}
      </div>
    </div>
  );
};

export default SelectWallet;
