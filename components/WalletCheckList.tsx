
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface WalletChecklistProps {
  selectedWallets: { solana: boolean; ethereum: boolean };
  onSelectionChange: (wallets: { solana: boolean; ethereum: boolean }) => void;
}

const WalletChecklist = ({
  selectedWallets,
  onSelectionChange,
}:WalletChecklistProps) => {
  // const handleWalletToggle = (walletType: 'solana' | 'ethereum') => {
  //   onSelectionChange({
  //     ...selectedWallets,
  //     [walletType]: !selectedWallets[walletType],
  //   });
  // };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <Checkbox
          id="solana"
          checked={selectedWallets.solana}
          // onCheckedChange={() => handleWalletToggle('solana')}
          className="border-gray-600 data-[state=checked]:bg-gray-600 data-[state=checked]:border-gray-600"
        />
        <Label htmlFor="solana" className="text-lg font-medium cursor-pointer text-white flex items-center space-x-2">
          <span className="text-xl"><path fill="url(#pn47x3vj)" d="m25.033 17.458-4.087 4.382a.95.95 0 0 1-.692.302H.879a.476.476 0 0 1-.348-.798l4.082-4.382a.95.95 0 0 1 .692-.302H24.68a.473.473 0 0 1 .353.798m-4.087-8.827a.96.96 0 0 0-.692-.302H.879a.475.475 0 0 0-.348.798l4.082 4.385a.96.96 0 0 0 .692.302H24.68a.476.476 0 0 0 .346-.798zM.879 5.483h19.375a.95.95 0 0 0 .692-.302L25.033.798a.475.475 0 0 0-.09-.724A.47.47 0 0 0 24.68 0H5.305a.95.95 0 0 0-.692.302L.531 4.685a.475.475 0 0 0 .348.798"></path></span>
          <span>Solana</span>
        </Label>
      </div>
      <div className="flex items-center space-x-3">
        <Checkbox
          id="ethereum"
          checked={selectedWallets.ethereum}
          // onCheckedChange={() => handleWalletToggle('ethereum')}
          className="border-gray-600 data-[state=checked]:bg-gray-600 data-[state=checked]:border-gray-600"
        />
        <Label htmlFor="ethereum" className="text-lg font-medium cursor-pointer text-white flex items-center space-x-2">
          <span className="text-xl">Ξ</span>
          <span>Ethereum</span>
        </Label>
      </div>
    </div>
  );
};

export default WalletChecklist;
