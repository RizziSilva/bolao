export function handleUserGroupGuesses(guesses) {
  const selectedTeams = {};

  guesses.forEach(({ groupId, qualifiers }) => {
    selectedTeams[groupId] = qualifiers;
  });

  return selectedTeams;
}
