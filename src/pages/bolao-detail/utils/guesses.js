export function handleUserGroupGuesses(guesses) {
  const selectedTeams = {};

  guesses.forEach(({ groupId, qualifiers }) => {
    selectedTeams[groupId] = qualifiers;
  });

  return selectedTeams;
}

export function handleInitialGuesses(guesses) {
  return guesses.reduce((guesses, currentGuess) => {
    guesses[currentGuess.matchId] = currentGuess;

    return guesses;
  }, {});
}
