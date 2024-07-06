export interface Corps {
    name: string;
    directors: string[];
    founded: Date;
    championships: number;
    last_score: number;
};

export interface Competition {
    name: string;
    location: string;
    date: Date;
    schedules: Schedule[];
}

export interface Schedule {
    unitName: string;
    displayCity: string;
    time: string;
}