export const hideLongText = (str: string, maxLength: number): string => {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + '...';
  } else {
    return str;
  }
};
