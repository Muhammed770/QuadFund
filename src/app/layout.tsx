
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MainNavbar } from "@/components/MainNavbar";
const inter = Inter({ subsets: ["latin"] });
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
// import { createConfig } from 'wagmi'
// import {
//   mainnet,
//   polygon,
//   optimism,
//   arbitrum,
//   base,
// } from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

export const metadata: Metadata = {
  title: "QuadFund",
  description: "Empowering Social Good Through Proper Funding",
};

// const config = getDefaultConfig({
//   appName: 'My RainbowKit App',
//   projectId: '6ac8e2179e976b262d34f3b452091a7a',
//   chains: [mainnet, polygon, optimism, arbitrum, base],
//   ssr: true, // If your dApp uses server side rendering (SSR)
// });
import { http, createConfig } from 'wagmi'
import { base, mainnet, optimism } from 'wagmi/chains'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'

const projectId = '<WALLETCONNECT_PROJECT_ID>'

export const config = createConfig({
  chains: [mainnet, base],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    metaMask(),
    safe(),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
})
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <MainNavbar/>
              {children}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
        </body>
    </html>
  );
}
