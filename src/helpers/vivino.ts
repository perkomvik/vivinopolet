const abbreviations = new Map<string, string>([
  ["dom.", "domaine"],
  ["ch.", "chateau"],
  ["prod.", "produttori"],
  ["extradry", "extra dry"],
]);

export const getWineUrl = (wineName: string) => {
  let modifiedWineName = wineName.toLowerCase();
  abbreviations.forEach((value, key) => {
    modifiedWineName = modifiedWineName.replace(new RegExp(key, "gi"), value);
  });
  return `https://www.vivino.com/search/wines?q=${encodeURIComponent(modifiedWineName)}`;
};
