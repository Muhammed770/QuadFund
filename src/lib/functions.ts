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
          owner{
            id
          }
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

export const getEventById = async (eventId: string) => {

  const query = `
    query {
        quadFundEvents(where: {id: "${eventId}"}) {
          id
          owner{
            id
          }
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

export const getEventByOwner = async (ownerAddress: string) => {

  const query = `
    query {
        quadFundEvents(where: {owner_: {id: "${ownerAddress}"}}) {
          id
          owner {
            id
          }
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

export const getProjectsByEventId = async (eventId: string) => {

  const query = `
    query {
        projects(where: {quadFundEvent_: {id: "${eventId}"}}) {
          about
          contributionsReceived
          description
          isWithdrawnFund
          logo
          matchingPrizePool
          name
          prizeWon
          twitter
          website
          id
          owner {
            id
          }
        }
      }
  `;
  try {

    const data = await mainnetClient.query({
      query: gql(query),
    });
    return data.data.projects;
  } catch (err) {
    console.log("Error fetching data: ", err);
  }
};

export const getProjectById = async (projectId: string) => {

  const query = `
    query {
        projects(where: {id: "${projectId}"}) {
          about
          contributionsReceived
          description
          isWithdrawnFund
          logo
          matchingPrizePool
          name
          prizeWon
          twitter
          website
          id
          owner {
            id
          }
        }
      }
  `;
  try {

    const data = await mainnetClient.query({
      query: gql(query),
    });
    return data.data.projects;
  } catch (err) {
    console.log("Error fetching data: ", err);
  }
};

export const getProjectsByOwner = async (ownerAddress: string) => {

  const query = `
    query {
        projects(where: {owner_: {id: "${ownerAddress}"}}) {
          about
          contributionsReceived
          description
          isWithdrawnFund
          logo
          matchingPrizePool
          name
          prizeWon
          twitter
          website
          id
          owner {
            id
          }
        }
      }
  `;
  try {

    const data = await mainnetClient.query({
      query: gql(query),
    });
    return data.data.projects;
  } catch (err) {
    console.log("Error fetching data: ", err);
  }
};

export const getContributionsByProjectId = async (projectId: string) => {

  const query = `
    query {
      contributions(where: {project_: {id: "${projectId}"}}) {
        amount
        user {
          id
        }
      }
    }
  `;
  try {

    const data = await mainnetClient.query({
      query: gql(query),
    });
    return data.data.contributions;
  } catch (err) {
    console.log("Error fetching data: ", err);
  }
};

export const getContributionsByEventId = async (eventId: string) => {

  const query = `
    query {
      quadFundEvent(id:"${eventId}") {
        contributions(orderBy:amount,orderDirection:desc){
          user {
            id
          }
          amount
        }
      }
    }
  `;
  try {

    const data = await mainnetClient.query({
      query: gql(query),
    });
    return data.data.contributions;
  } catch (err) {
    console.log("Error fetching data: ", err);
  }
};

export const getContributionsByUser = async (userAddress: string) => {

  const query = `
    query {
      user(id:"${userAddress}"){
        contributions{
          amount
          project{
            name
            id
          }
        }
      }
    }
  `;
  try {

    const data = await mainnetClient.query({
      query: gql(query),
    });
    return data.data.contributions;
  } catch (err) {
    console.log("Error fetching data: ", err);
  }
};

export const weiToUSD = (wei: string) => {
  let eth = parseInt(wei) / 10 ** 18;
  let USD = eth * 3340;
  USD = Math.round((USD + Number.EPSILON) * 1000) / 1000; // rounding to the nearest 1000th
  return USD;
}

export const USDToWei = (USD: string) => {
  let eth = parseInt(USD) / 3340;
  let wei = eth * 10 ** 18
  return wei;
}
