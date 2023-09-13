const match = {
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
};

const matches = [match];

const matches_input_patch_id = {
  "homeTeamGoals": 6,
  "awayTeamGoals": 1,
};

export {
  match,
  matches,
  matches_input_patch_id,
};