export const usePostImage = (filePath: string) => {
  console.log(filePath);
  return `${process.env.SERVER_URL}/${filePath}`;
};
