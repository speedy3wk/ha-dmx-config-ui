export const clone = <T>(value: T): T => structuredClone(value);

export const moveItem = <T>(list: T[], from: number, to: number) => {
  if (to < 0 || to >= list.length) return;
  const [item] = list.splice(from, 1);
  list.splice(to, 0, item);
};
