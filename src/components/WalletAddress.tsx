"use client"
import { useAccount } from 'wagmi'

const WalletAddress = () => {
    const account = useAccount()
    const address = account?.address ?? '';
    console.log(address)
    const slicedAddress = address.slice(0, 4) + "..." + address.slice(-4);
    return ( 
        <>
            {account && <div>{slicedAddress}</div>}
        </>
    );
}
 
export default WalletAddress;