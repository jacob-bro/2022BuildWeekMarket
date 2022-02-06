const db = require('../data/dbConfig.js');

module.exports = {
  findBy,
  get,
  getById,
  create,
  remove,
  update,
};

function findBy(filter) {
    return db('item').where(filter)
}

function get(){
	return db("item").select("*")
}

function getById(id) {
  return db('item')
    .where({ id }).first();
}

async function create(item) {
  const [id] = await db('item').insert(item).returning('id');
  return findById(id);
}

function remove(id) {
  return db('item')
    .where({ id }).del();
}

function update(id, changes) {
  return db('item')
    .where({ id }).update(changes, '*');
}