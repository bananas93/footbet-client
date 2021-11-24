export const updateMatch = (matches, match) => {
  const date = match.datetime.split('T')[0];
  const newMatches = [...matches];
  const matchesTour = newMatches.findIndex((item) => item.date === date);
  // eslint-disable-next-line max-len
  const matchIndex = newMatches[matchesTour].games.findIndex((item) => Number(item.id) === Number(match.id));
  const updatedMatch = newMatches[matchesTour].games[matchIndex];
  updatedMatch.bets = match.bets;
  updatedMatch.homeGoals = match.homeGoals;
  updatedMatch.awayGoals = match.awayGoals;
  updatedMatch.status = match.status;
  return newMatches;
};
