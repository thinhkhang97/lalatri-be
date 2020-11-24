export const CREATE_USER_QUERY = `
  insert into public."user" (email, salt, hashed_password) values ($1, $2, $3);
`;
