const db = require('../data/dbConfig.js');

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
};

function get(){
	return db("items").select("*")
}

function getById(id) {
  return db('items')
    .where({ id }).first();
}

async function create(item) {
  const [id] = await db('items').insert(item).returning('id');
  return findById(id);
}

function remove(id) {
  return db('items')
    .where({ id }).del();
}

function update(id, changes) {
  return db('items')
    .where({ id }).update(changes, '*');
}