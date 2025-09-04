// importing anchor lang
// rust - crates
use anchor_lang::prelude::*;

// this is the pubkey of our program
declare_id!("EtCJbCfCYnVDuTjfSCNYsMVPGzJw4i1vX9yckhcFgHEM");

#[program]
pub mod wallet_log {
    use super::*;

    // this is an instruction
    // and we use it to tell our program what to do
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Log our wallet: {}", ctx.accounts.signer.key);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
}
