export const BASE = 'api/v1';

export const COMPETITIONS =                        (season?: string)  => `/competitions${season !== undefined ? `?season=${season}` : ''}`;
export const COMPETITION =    (competition: string, season?: string)  => `/competitions${season!== undefined ? `?season=${season}` : ''}/${competition}`
export const CORPS_LIST =                                                `/corps`;
export const CORPS =                                   (name: string) => `/corps/${name}`;
export const EVENTS =                               (season?: string) => `/events${season !== undefined ? `?season=${season}` : ''}`;
export const EVENT =                (event?: string, season?: string) => `/events${season !== undefined ? `?season=${season}` : ''}/${event}`;
export const SPONSORS =                                                  `/sponsors`;
export const SPONSOR =                              (sponsor: string) => `/sponsors/${sponsor}`;
