import { ConnectButton } from '@rainbow-me/rainbowkit';
import { SquareUserRound } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const CustomConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');
        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button onClick={openConnectModal} type="button" className='bg-black text-sm text-white p-2 rounded-lg bg-card text-card-foreground hover:shadow-lg transition-shadow duration-200 ease-in-out cursor-pointer'>
                    Connect Wallet
                  </button>
                );
              }else{

              }
              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }
              return (
                <div style={{ display: 'flex', gap: 12 }}>
                  
                  <button onClick={openAccountModal} type="button" className='text-sm font-bold border border-black rounded-lg p-2 '>
                    {account.displayName}
                  </button>
                  <Link href="/profile">
                    {/* <SquareUserRound size={38} className='flex justify-center items-center'/> */}
                    <Image
                      src={'/profile.png'}
                      alt="User Avatar"
                      width={38}
                      height={38}
                      className='rounded-full'/>
                  </Link>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};