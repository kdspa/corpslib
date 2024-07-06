const BASE = 'https://api.dci.org/api/v1/';

const COMPETITIONS =  (season: string) => `${BASE}/competitions?${season}`;
const COMPETITION = (competition: string) => `${COMPETITIONS}/${competition}`;

