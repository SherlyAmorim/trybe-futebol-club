const login = {
  email: 'admin@admin.com',
  password: 'secret_admin',
};

const rash = {
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
};

const validLoginBody = [{ email: 'admin@admin.com', password: 'secret_admin' }];
const invalidLoginBody = { email: 'sherly@admin.com', password: 'secret_admin' };
const noPasswordLoginBody = { email: 'admin@admin.com' };
const noEmailLoginBody = { password: 'secret_admin' };
const role = { role: 'admin'};
const invalidateEmail = { email: 'admin.com', password: 'secret_admin' };
const invalidatePassword = { email: 'admin@admin.com', password: 'sec' };

export {
  login,
  rash,
  validLoginBody,
  invalidLoginBody,
  noPasswordLoginBody,
  noEmailLoginBody,
  role,
  invalidateEmail,
  invalidatePassword,
};