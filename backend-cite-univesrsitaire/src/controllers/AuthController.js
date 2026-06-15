import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [users] = await db.query(
      "SELECT * FROM Utilisateur WHERE email = ?",
      [email],
    );

    if (users.length === 0) {
      return res.status(400).json({
        message: "Utilisateur introuvable",
      });
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(password, user.motDePasse);

    if (!isMatch) {
      return res.status(400).json({
        message: "Mot de passe incorrect",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.json({
      message: "Connexion réussie",
      token,
      user: {
        id: user.id,
        nom: user.nom,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export default login;
