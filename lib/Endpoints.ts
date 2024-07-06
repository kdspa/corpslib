const BASE = 'https://api.dci.org/api/v1/';

const COMPETITIONS =  (season: string) => `${BASE}/competitions?${season}`;
const COMPETITION = (season: string, competition: string) => `${BASE}/competitions?${season}/${competition}`;

