export type QuadFundEventType = {
    __typename: string;
    id: string;
    owner: {
        __typename: string;
        id: string;
    };
    name: string;
    description: string;
    prizePool: string;
    startTime: string;
    endTime: string;
    resultPublished: boolean;
};

export type ProjectType = {
    __typename: string;
    about: string;
    contributionsReceived: string;
    description: string;
    isWithdrawnFund: boolean;
    logo: string;
    matchingPrizePool: string;
    name: string;
    prizeWon: string;
    twitter: string;
    website: string;
    id: string;
    owner: {
        __typename: string;
        id: string;
    };
};

export type ProjectListType = ProjectType[];

export type QuadFundEventListType = QuadFundEventType[];

export type ContributionsType = {
    __typename:string;
    amount: string;
    user: {
        id: string;
        __typename: string;
    }
};
