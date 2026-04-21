import { db } from "../db/connection.js";
import { getRecommendations } from "../utils/getRecommendations.js";

export const recommendProducts = async (req, res) => {
  try {
    const { skinType, concern, budget } = req.body;

    const [products] = await db.query("SELECT * FROM products");

    const filtered = getRecommendations(products, {
      skinType,
      concern,
      budget,
    });

    res.json(filtered);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};