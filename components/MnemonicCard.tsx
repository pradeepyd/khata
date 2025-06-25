import { mnemonic } from "@/lib/wallet"

const wordsArray = mnemonic.trim().split(/\s+/);
const MnemonicCard = () => {
    return (
        <div>
        {wordsArray.map((word,index) => (
            <div key={index}>
               {index + 1}. {word}
            </div>
        ))}
        </div>
    )
}

export default MnemonicCard;