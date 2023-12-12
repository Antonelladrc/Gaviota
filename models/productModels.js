var pool = require("./bd");

async function getProduct() {
  let query = "select * from product";
  let rows = await pool.query(query);
  return rows;
}

async function insertProduct(obj) {
  try {
    let query = "insert into product set ?";
    let rows = await pool.query(query, [obj]);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function deleteProductById(id) {
  let query = "delete from product where id = ?";
  let rows = await pool.query(query, [id]);
  return rows;
}

async function getProductById(id) {
  let query = "select * from product where id = ?";
  let rows = await pool.query(query, [id]);
  return rows[0];
}

async function modificarProductById(obj, id) {
  try {
    let query = "update product set ? where id= ?";
    let rows = await pool.query(query, [obj, id]);
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
