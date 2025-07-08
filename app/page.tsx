import MnemonicCard from "@/components/MnemonicCard";
import WalletChecklist from "@/components/WalletCheckList";

export default function Home() {
  return (
    
     <div className="bg-black">
      <WalletChecklist/>
      <MnemonicCard/>
      </div>
  );
}
