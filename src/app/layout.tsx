"use client"
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
import {
  sepolia,
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner"
import { ThirdwebProvider } from "@thirdweb-dev/react";

//  const metadata: Metadata = {
//   title: "QuadFund",
//   description: "Empowering Social Good Through Proper Funding",
// };

const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: '6ac8e2179e976b262d34f3b452091a7a',
  chains: [mainnet, sepolia, polygon, optimism, arbitrum, base],
});
// import { http, createConfig } from 'wagmi'
// import { base, mainnet, optimism } from 'wagmi/chains'
// import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head><title>QuadFund</title></head>
      <body className={inter.className}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              <ThirdwebProvider
                clientId={process.env.THIRDWEB_CLIENT_ID} // You can get a client id from dashboard settings
              >
                <MainNavbar />
                {children}
                <Toaster />
              </ThirdwebProvider>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
