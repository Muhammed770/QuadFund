import { ethers } from "ethers";
import { FACTORY_CONTRACT_ADDRESS } from "./const";
import FACTORY_ABI from "./abis/Factory.json";

export const createNewEvent = async (
    eventName: string,
    eventDesc: string,
    prizePool: string,
    duration: string,
) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider)

    const contract = new ethers.Contract(FACTORY_CONTRACT_ADDRESS, FACTORY_ABI, provider)

    await window.ethereum.request({ method: 'eth_requestAccounts' });

    const signer = provider.getSigner();
    console.log({ signer })

    const transaction = await contract.connect(signer).createFundingContract(
        eventName,
        eventDesc,
        prizePool,
        duration
    );
    console.log({ transaction })

    const response = await transaction.wait();
    return response
}