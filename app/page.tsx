import MnemonicCard from "@/components/MnemonicCard";
import SelectWallet from "@/components/WalletCheckList";

export default function Home() {
  return (
    
     <div className="bg-black px-20 m-10 text-white">
      <h1 className="text-3xl font-semibold space-x-2 ml-10 gap-2 py-2 space-y-2">Welcome to khata </h1>
      <p className="text-md ml-10 text-gray-400 mb-4">create your web3 wallet seamlessly</p>
      <SelectWallet/>
      <MnemonicCard/>
      </div>
  );
}
