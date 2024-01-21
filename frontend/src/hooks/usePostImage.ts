export const usePostImage = (filePath: string) => {
  return `${process.env.SERVER_URL}/${filePath}`;
};
