import { ethers } from "ethers";
import { FACTORY_CONTRACT_ADDRESS, SUBGRAPH_QUERY_URL } from "./const";
import FACTORY_ABI from "./abis/Factory.json";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

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

const mainnetClient = new ApolloClient({
    uri: SUBGRAPH_QUERY_URL,
    cache: new InMemoryCache(),
});
export const getAllEvents = async () => {

    const query = `
    query {
        quadFundEvents {
          id
          owner
          name
          description
          prizePool
          startTime
          endTime
          resultPublished
        }
      }
  `;
    try {

        const data = await mainnetClient.query({
            query: gql(query),
        });
        return data.data.quadFundEvents;
    } catch (err) {
        console.log("Error fetching data: ", err);
    }
};
