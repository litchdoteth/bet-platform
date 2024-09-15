import { PublicKey } from '@solana/web3.js'
import { FAKE_TOKEN_MINT, PoolToken, TokenMeta, makeHeliusTokenFetcher } from 'gamba-react-ui-v2'

// Get RPC from the .env file or default to the public RPC.
export const RPC_ENDPOINT = import.meta.env.VITE_RPC_ENDPOINT

// Solana address that will receive fees when somebody plays on this platform
export const PLATFORM_CREATOR_ADDRESS = new PublicKey(
  '6ytMdqDQjmTuvTwjjiZZwzkZLMg2kyK8TVQtbTu1Qjvb',
)

// Gamba explorer URL - Appears in RecentPlays
export const EXPLORER_URL = 'https://explorer.gamba.so'

// Platform URL - Appears in ShareModal
export const PLATFORM_SHARABLE_URL = 'play.betyourmemes.fun'

// Creator fee (in %)
export const PLATFORM_CREATOR_FEE = 0.019 // 1.9%  !!max 5%!!

// Jackpot fee (in %)
export const PLATFORM_JACKPOT_FEE = 0.001 // 0.1%

// Referral fee (in %) - this gets deducted from the creator fee
export const PLATFORM_REFERRAL_FEE = 0.0025 // 0.25%

/** If the user should be able to revoke an invite after they've accepted an invite */
export const PLATFORM_ALLOW_REFERRER_REMOVAL = true

// Just a helper function
const lp = (tokenMint: PublicKey | string, poolAuthority?: PublicKey | string): PoolToken => ({
  token: new PublicKey(tokenMint),
  authority: poolAuthority !== undefined ? new PublicKey(poolAuthority) : undefined,
})

/**
 * List of pools supported by this platform
 * Make sure the token you want to list has a corresponding pool on https://explorer.gamba.so/pools
 * For private pools, add the creator of the Liquidity Pool as a second argument
 */
export const POOLS = [

    // SOL:
    lp('So11111111111111111111111111111111111111112'),
    // USDC:
    lp('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
    // Wormhole:
    lp('85VBFQZC9TZkfaptBWjvUw7YbZjy52A6mjtPGjstQAmQ'),

  //---------------------------------------
  // Fake token:
  lp(FAKE_TOKEN_MINT),
  
]

// The default token to be selected
export const DEFAULT_POOL = POOLS[0]

/**
 * List of token metadata for the supported tokens
 * Alternatively, we can provide a fetcher method to automatically fetch metdata. See TOKEN_METADATA_FETCHER below.
 */
export const TOKEN_METADATA: (Partial<TokenMeta> & {mint: PublicKey})[] = [
  {
    mint: FAKE_TOKEN_MINT,
    name: 'Fake',
    symbol: 'FAKE',
    image: '/fakemoney.png',
    baseWager: 1e9,
    decimals: 9,
    usdPrice: 0,
  },
  {
    mint: new PublicKey('85VBFQZC9TZkfaptBWjvUw7YbZjy52A6mjtPGjstQAmQ'),
    name: 'W',
    symbol: 'Wormhole',
    image: 'https://wormhole.com/token.png',
    baseWager: 1e6,
    decimals: 6,
    usdPrice: 0,
  },
]

/** HTML to display to user that they need to accept in order to continue */
export const TOS_HTML = `
<p><b>Age Requirement:</b> To participate in games on the Bet Your Memes Platform, you must be at least 18 years old or of legal age in your jurisdiction.</p>

<p><b>Legal Compliance:</b>  Ensure your participation aligns with your local laws. We trust our users to engage with our website responsibly.</p>

<p><b>Risk Acknowledgement:</b>  Games on the Bet Your Memes Platform carry risks, and losses are possible. Please remember that winning is not guaranteed.</p>

<p><b>No Warranty:</b>  Our games are offered "as is" without any warranties. They operate on a random basis with varying chances of winning.</p>

<p><b>Limitation of Liability:</b>  While we aim to provide an enjoyable experience, we are not responsible for any damages that may result from your use of the website.</p>

<p><b>Licensing Disclaimer:</b> Bet Your Memes Platform is not a licensed casino; the term "casino" is used descriptively to simulate real casino games. Please note that Bet Your Memes Platform does not hold an actual casino license, and users should participate with this understanding.</p>

<p><i>By clicking "<b> Acknowledge</b> ", you confirm that you have read, understood, and accepted these terms and conditions. You also affirm your compliance with all applicable laws and regulations related to online gaming in your area.</i></p>
`

/**
 * A method for automatically fetching Token Metadata.
 * Here we create a fetcher that uses Helius metadata API, if an API key exists as an environment variable.
 */
export const TOKEN_METADATA_FETCHER = (
  () => {
    if (import.meta.env.VITE_HELIUS_API_KEY) {
      return makeHeliusTokenFetcher(
        import.meta.env.VITE_HELIUS_API_KEY,
        { dollarBaseWager: 1 },
      )
    }
  }
)()
