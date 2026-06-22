export function handleUserGroupGuesses(guesses) {
  console.log("guesses", guesses);
  const selectedTeams = {};

  guesses.forEach(({ groupId, qualifiers }) => {
    selectedTeams[groupId] = qualifiers;
  });

  return selectedTeams;
}
