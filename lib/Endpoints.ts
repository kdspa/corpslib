const BASE = 'https://api.dci.org/api/v1/';

const COMPETITIONS =  (season?: string, competition?: string) => `${BASE}/competitions${season !== undefined ? `?season=${season}` : ''}${competition !== undefined ? `/${competition}` : ''}`;
const CORPS = (name?: string) => `${BASE}/corps${name!== undefined ? `/${name}` : ''}`;
const EVENTS = (event?: string) => `${BASE}/events${event !== undefined ? `/${event}` : ''}`;
const SPONSORS = (sponsor?: string) => `${BASE}/sponsors${sponsor !== undefined ? `/${sponsor}` : ''}`;
