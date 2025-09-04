import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { WalletLog } from "../target/types/wallet_log";

describe("wallet-log", () => {
  // Configure the client to use the local cluster
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.walletLog as Program<WalletLog>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx_sig = await program.methods.initialize().rpc();
    const tx = await provider.connection.getTransaction(tx_sig, {
      commitment: "confirmed",
    });
    console.log(tx.meta.logMessages);
  });
});
