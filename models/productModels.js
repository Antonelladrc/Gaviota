var pool = require("./bd");

async function getProduct() {
  var query = "select * from product";
  var rows = await pool.query(query);
  return rows;
}

async function insertProduct(obj) {
  try {
    var query = "insert into product set ?";
    var rows = await pool.query(query, [obj]);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function deleteProductById(id) {
  var query = "delete from product where id = ?";
  var rows = await pool.query(query, [id]);
  return rows;
}

async function getProductById(id) {
  var query = "select * from product where id = ?";
  var rows = await pool.query(query, [id]);
  return rows[0];
}

async function modificarProductById(obj, id) {
  try {
    var query = "update product set ? where id= ?";
    var rows = await pool.query(query, [obj, id]);
    return rows;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  getProduct,
  insertProduct,
  deleteProductById,
  getProductById,
  modificarProductById,
};
