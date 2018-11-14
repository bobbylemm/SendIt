const findFromDb = (db, par, id) => {
  return db.find(user => {
    return user[par] == id;
  });
};
export default {
  findFromDb
};
