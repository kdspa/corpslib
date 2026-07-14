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
    name: string;
    location: string;
    timezone: string;
    tickets: string;
    ticketsOnSale: string;
    sponsor: string;
    livestream: string;
    image: string;
    startDate: string;
    startTime: string;
    lineup: ISchedule[];
    venue: IVenue;
};

export interface ISchedule {
    time: string;
    name: string;
    location: string;
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
    city: string;
};

export interface ISponsor {}