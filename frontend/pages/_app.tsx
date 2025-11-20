import type { AppProps } from 'next/app';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';

import { config } from '../config/web3';
import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';

/**
 * React Query client for data fetching
 */
const queryClient = new QueryClient();

/**
 * Custom App component
 * Wraps all pages with Web3 providers (Wagmi + RainbowKit)
 * 
 * Architecture:
 * - Wagmi: Core Web3 provider
 * - RainbowKit: Wallet connection UI
 * - React Query: Data fetching and caching
 */
export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: '#7b3ff2',
            accentColorForeground: 'white',
            borderRadius: 'medium',
          })}
          showRecentTransactions={true}
        >
          <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
