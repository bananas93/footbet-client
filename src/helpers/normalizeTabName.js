export const normalizeTabName = (key) => {
  if (key === 0) {
    return 'Фінал';
  }
  if (key === 1) {
    return '1/2 фіналу';
  }
  if (key === 2) {
    return '1/4 фіналу';
  }
  if (key === 3) {
    return '1/8 фіналу';
  }
  if (key === 4) {
    return '1/16 фіналу';
  }
  if (key === 5) {
    return '1/32 фіналу';
  }
  return `${key} тур`;
};
