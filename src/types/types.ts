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

export type QuadFundEventListType = QuadFundEventType[];

