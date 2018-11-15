const findFromDb = (db, key, id) => db.find(item => item[key] == id);
export default {
  findFromDb
};
