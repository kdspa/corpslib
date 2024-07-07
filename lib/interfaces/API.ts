export interface ICorps {
    id: string;
    name: string;
    type: string;
    website: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
    about: string;
    status: string;
    displayCity: string;
    corpsLogo: string;
    corpsPhoto: string;
    corpsMMDLLinkAudio: string;
    corpsMMDLLinkVideo: string;
    entityType: string;
    slug: string;
    auditions: string;
};

export interface IEvent {
    id: string;
    name: string;
    slug: string;
    locationCity: string;
    locationState: string;
    timezone: string;
    tickets: string;
    ticketsOnSale: string;
    sponsor: string;
    livestream: string;
    thumbnail: string;
    startDate: string;
    startTime: string;
    schedules: ISchedule[];
    venue: IVenue;
    image: string;
    ticketingMapImage: string;
    googleMapsImage: string;
};

export interface ISchedule {
    unitName: string;
    displayCity: string;
    time: string;
};

export interface ICompetition {
    scores: Score[];
}

interface Score {
    categories: CaptionCategory[];
    divisionName: string;
    round: string;
    groupName: string;
    orgGroupIdentifier: string;
    totalScore: number;
    rank: number;
    subtotalScore: number;
    subtotalRank: number;
    active: boolean;
    isOtherType: boolean;
    competition: Competition;
}

interface Competition {
    groupTypes: GroupType[];
    eventName: string;
    location: string;
    date: string;
    competitionLevel: number;
    chiefJudge: string;
    scoresReleased: boolean;
    recapReleased: boolean;
    seasonName: string;
    slug: string;
}

interface GroupType {
    id: number;
    name: string;
}

interface CaptionCategory {
    captions: Caption[];
    name: string;
    score: string;
    rank: number;
}
interface Caption {
    subCaptions: SubCaption[];
    judgeFirstName: string;
    judgeLastName: string;
    judge: number;
    name: string;
    initials: string;
    score: string;
    rank: string;
}

interface SubCaption {
    name: string;
    initials: string;
    score: string;
    rank: number;
}

export interface IVenue {
    name: string;
    address: string;
    zipcode: string;
    fieldHashmarks: boolean;
    fieldHashmarksType: string;
    goalPosts: boolean;
    fieldElectricity: boolean;
    americanFlagLocation: string;
    tunnelHeight: string;
    videoBoard: boolean;
    accessToBoxOffice: boolean;
    airConditioning: boolean;
    clearBagVenue: boolean;
    marketplaceLocation: string;
    bagPolicy: string;
    spectatorEntrance: string;
    spectatorReEntry: string;
    willCallLocation: string;
    concessions: string;
    ambulanceLocation: string;
    micsOnField: string;
    soundOrdinance?: string;
    ticketTakers: string;
    boxOfficeVolunteers: boolean;
    ushers: string;
    security: string;
    seatNumbering: false;
    seatSize: string;
    marketplaceType: string;
    marketplaceElectricity: string;
    bagPolicyDescription: string;
    cashless: boolean;
};