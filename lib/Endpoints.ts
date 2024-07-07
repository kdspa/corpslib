export const BASE = 'https://api.dci.org/api/v1/';

export const COMPETITIONS =  (season?: string, competition?: string) => `${BASE}/competitions${season !== undefined ? `?season=${season}` : ''}${competition !== undefined ? `/${competition}` : ''}`;
export const CORPS = (name?: string) => `${BASE}/corps${name!== undefined ? `/${name}` : ''}`;
export const EVENTS = (event?: string) => `${BASE}/events${event !== undefined ? `/${event}` : ''}`;
export const SPONSORS = (sponsor?: string) => `${BASE}/sponsors${sponsor !== undefined ? `/${sponsor}` : ''}`;
