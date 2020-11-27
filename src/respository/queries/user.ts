export const CREATE_USER_QUERY = `
  insert into public."user" (email, salt, hashed_password) values ($1, $2, $3)
  returning *;
`;

export const GET_USER_QUERY = `
  select * from public."user" as u where u.email = $1 
`;
