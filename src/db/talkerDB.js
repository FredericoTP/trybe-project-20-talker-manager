const conn = require('./connection');

const findAll = () => conn.execute('SELECT * FROM talkers');

module.exports = { findAll };