const login = {
  email: 'admin@admin.com',
  password: 'secret_admin',
};

const rash = {
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
};

const token = {
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY5MzQ0NzU0MiwiZXhwIjoxNjk0NzQzNTQyfQ.FISwHzZeenG0vNZ-YQI70A0C4UNgH1BjiqFwpUm100Y"
}

const validLoginBody = { email: 'admin@admin.com', password: 'secret_admin' };
const noPasswordLoginBody = { email: 'admin@admin.com' };
const noEmailLoginBody = { password: 'secret_admin' };

export {
  login,
  rash,
  token,
  validLoginBody,
  noPasswordLoginBody,
  noEmailLoginBody,
};