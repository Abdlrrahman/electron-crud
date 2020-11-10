const { BrowserWindow, Notification, screen } = require("electron");
const { getConnection } = require("./database");

let window;

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  window = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  window.loadFile("src/screens/html/index.html");
}


const createProduct = async (product) => {
  try {
    const conn = await getConnection();
    product.price = parseFloat(product.price);
    const result = await conn.query("INSERT INTO products SET ?", product);
    product.id = result.insertId;

    // Notify the User
    new Notification({
      title: "Electron Mysql",
      body: "New Product Saved Successfully",
    }).show();

    // Return the created Product
    return product;
  } catch (error) {
    console.log(error);
  }
};

const getProducts = async () => {
  const conn = await getConnection();
  const results = await conn.query("SELECT * FROM products ORDER BY id DESC");
  return results;
};

const deleteProduct = async (id) => {
  const conn = await getConnection();
  const result = await conn.query("DELETE FROM products WHERE id = ?", id);
  return result;
};

const getProductById = async (id) => {
  const conn = await getConnection();
  const result = await conn.query("SELECT * FROM products WHERE id = ?", id);
  return result[0];
};

const updateProduct = async (id, product) => {
  const conn = await getConnection();
  const result = await conn.query("UPDATE products SET ? WHERE Id = ?", [
    product,
    id,
  ]);
  console.log(result)
};

module.exports = {
  createWindow,
  createProduct,
  getProducts,
  deleteProduct,
  getProductById,
  updateProduct
};