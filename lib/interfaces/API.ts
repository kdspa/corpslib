export interface Corps {
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

export interface Event {
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
    schedules: Schedule[];
    venue: Venue;
    image: string;
    ticketingMapImage: string;
    googleMapsImage: string;
}

export interface Schedule {
    unitName: string;
    displayCity: string;
    time: string;
}

export interface Venue {
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
}