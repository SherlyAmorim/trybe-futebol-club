const token = {
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY5NDAxOTI5NSwiZXhwIjoxNjk1MzE1Mjk1fQ.iKi4hV7-k7mCkoRLdF-NzonZSIz7ryj49JYDJoPUxsM',
};

const matchAll = [
  {
  "id": 1,
  "homeTeamId": 16,
  "homeTeamGoals": 1,
  "awayTeamId": 8,
  "awayTeamGoals": 1,
  "inProgress": false,
  "homeTeam": {
    "teamName": "São Paulo"
  },
  "awayTeam": {
    "teamName": "Grêmio"
  }
},
{
  "id": 49,
  "homeTeamId": 7,
  "homeTeamGoals": 3,
  "awayTeamId": 11,
  "awayTeamGoals": 0,
  "inProgress": false,
  "homeTeam": {
    "teamName": "Flamengo"
  },
  "awayTeam": {
    "teamName": "Napoli-SC"
  }
},
];

const matchTrue = [{
  "id": 41,
  "homeTeamId": 16,
  "homeTeamGoals": 2,
  "awayTeamId": 9,
  "awayTeamGoals": 0,
  "inProgress": true,
  "homeTeam": {
    "teamName": "São Paulo"
  },
  "awayTeam": {
    "teamName": "Internacional"
  }
}];

const matchFalse = [  {
  "id": 1,
  "homeTeamId": 16,
  "homeTeamGoals": 1,
  "awayTeamId": 8,
  "awayTeamGoals": 1,
  "inProgress": false,
  "homeTeam": {
    "teamName": "São Paulo"
  },
  "awayTeam": {
    "teamName": "Grêmio"
  }
}];

const matches = matchAll;

const matches_input_patch_id = {
  "homeTeamGoals": 6,
  "awayTeamGoals": 1,
};

const createInputMatch = {
  "homeTeamId": 10,
  "awayTeamId": 8,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2
};

const createInputMatchNull = {
  "homeTeamId": 10,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
}

const createOutputMatch = {
  "id": 51,
  "homeTeamId": 10,
  "homeTeamGoals": 2,
  "awayTeamId": 8,
  "awayTeamGoals": 2,
  "inProgress": true
}

const matchesMiddleware = {
  "homeTeamId": 10,
  "awayTeamId": 10,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2
};

export {
  token,
  matchAll,
  matchTrue,
  matchFalse,
  matches,
  matches_input_patch_id,
  createInputMatch,
  createInputMatchNull,
  createOutputMatch,
  matchesMiddleware,
};