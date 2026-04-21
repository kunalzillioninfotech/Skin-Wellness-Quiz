import jwt from "jsonwebtoken";

export const login = (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@gmail.com" && password === "123456") {
    const token = jwt.sign(
      { role: "admin" },
      "secret123",
      { expiresIn: "1d" }
    );

    return res.json({ token });
  }

  res.status(401).json({ message: "Invalid credentials" });
};