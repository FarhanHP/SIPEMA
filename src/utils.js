export const isEmail = (email) => {
  // eslint-disable-next-line
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  return email.match(regex);
};
