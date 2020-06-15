const URN_CLIENT = process.env.NODE_ENV === 'production' ? 'TODO' : 'http://localhost:3000';
const URN_SERVER = process.env.NODE_ENV === 'production' ? 'TODO' : 'http://localhost:5002';

module.exports = { URN_CLIENT, URN_SERVER };