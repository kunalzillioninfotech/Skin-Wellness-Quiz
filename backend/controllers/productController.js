import { db } from "../db/connection.js";

export const addProduct = async (req, res) => {
    try {
      const { name, skin_type, concern, budget, description } = req.body;
  
      const image = req.file?.path;
  
      const sql = `
        INSERT INTO products 
        (name, skin_type, concern, budget, description, image)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
  
      await db.query(sql, [
        name,
        skin_type,
        concern,
        budget,
        description,
        image,
      ]);
  
      res.json({ message: "Product added successfully" });
    } catch (err) {
      console.error("ERROR:", err);
      res.status(500).json({ error: err.message });
    }
  };

export const getProducts = async (req, res) => {
    try {
      let { page = 1, limit = 10 } = req.query;
  
      page = parseInt(page);
      limit = parseInt(limit);
  
      const offset = (page - 1) * limit;
  
      const [data] = await db.query(
        "SELECT * FROM products LIMIT ? OFFSET ?",
        [limit, offset]
      );
  
      const [countResult] = await db.query(
        "SELECT COUNT(*) as total FROM products"
      );
  
      const total = countResult[0].total;
  
      res.json({
        data,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM products WHERE id = ?", [id]);

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};