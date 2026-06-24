export function groupMatchesByDay(matches) {
  return matches.reduce((acc, match) => {
    const day = match.matchDate.split("T")[0];
    const group = acc.find((group) => group.day === day);

    if (group) group.matches.push(match);
    else acc.push({ day, matches: [match] });

    return acc;
  }, []);
}

export function formatMatchsDayDate(dayDate) {
  const date = new Date(`${dayDate}T12:00:00`);
  const weekday = date.toLocaleDateString("pt-BR", { weekday: "long" });
  const dayAndMonth = date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
  });
  const dayAndMonthWithoutDe = dayAndMonth.replace(/ de /g, " ");

  return `${weekday} - ${dayAndMonthWithoutDe}`;
}

export function formatMatchDate(matchDate) {
  const date = new Date(matchDate);
  const day = date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });
  const time = date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedDay = day.replace(/ de /g, " ").replace(".", "");

  return `${formattedDay} - ${time}`;
}
