export const useMoscowDate = (utcDateString: string) => {
  const utcDate = new Date(utcDateString);

  const moscowDate = new Date(
    utcDate.toLocaleString('en-US', { timeZone: 'Europe/Moscow' }),
  );

  return moscowDate.toLocaleString();
};
