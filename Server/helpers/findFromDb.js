const findFromDb = (db, index, id) => db.find(item => item[index] == id);
export default {
  findFromDb
};
