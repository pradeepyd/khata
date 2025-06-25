import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";

export const mnemonic = generateMnemonic();
const seed = mnemonicToSeedSync(mnemonic);
for (let i = 0; i < 4; i++) {
  const path = `m/44'/501'/${i}'/0'`; // This is the derivation path
  const derivedSeed = derivePath(path, seed.toString("hex")).key;
  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
  console.log("private:",secret);
  const publicKey = Keypair.fromSecretKey(secret).publicKey.toBase58();
  console.log("public",publicKey);
}

// export function deriveSolanaPrivateKey(
//   seed: Buffer,
//   derivationPath: string
// ): Uint8Array {
//   let derivedSeed: Buffer;
//   if (derivationPath.startsWith("501'")) {
//     // Sollet deprecated path
//     derivedSeed = fromSeed(seed).derivePath(derivationPath).privateKey!;
//   } else {
//     derivedSeed = derivePath(derivationPath, seed.toString("hex")).key;
//   }
//   return nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
// }