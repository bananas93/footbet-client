export const normalizeTabName = (key, tournament) => {
  const has3rdPlaceMatch = tournament?.slug === 'world-cup-2022';
  if (key === 0) {
    return 'Фінал';
  }
  if (key === 1) {
    return has3rdPlaceMatch ? 'Матч за 3-тє місце' : '1/2 фіналу';
  }
  if (key === 2) {
    return has3rdPlaceMatch ? '1/2 фіналу' : '1/4 фіналу';
  }
  if (key === 3) {
    return has3rdPlaceMatch ? '1/4 фіналу' : '1/8 фіналу';
  }
  if (key === 4) {
    return has3rdPlaceMatch ? '1/8 фіналу' : '1/16 фіналу';
  }
  return `${key} тур`;
};
