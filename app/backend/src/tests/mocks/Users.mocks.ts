const login = {
  email: 'admin@admin.com',
  password: 'secret_admin',
};

const rash = {
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
};

const token = {
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY5MzUzMDgwNiwiZXhwIjoxNjk0ODI2ODA2fQ.eyzg115v3nvZOGROVVHxxRxy7f29SEmFsSIse0NBXyk"
}

const validLoginBody = [{ email: 'admin@admin.com', password: 'secret_admin' }];
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