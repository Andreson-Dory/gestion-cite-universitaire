import resend from "../emailService/resend.js";
import Paiement from "../models/PaiementModel.js";
import ConfirmationPaiement from "../../emails/ConfirmationPaiement.jsx";
import { render } from "@react-email/render";
import React from "react";

const getPaiements = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  try {
    const { rows, countResult } = await Paiement.getAllPaiements(page);
    const total = countResult.total;
    const totalPages = Math.ceil(total / 100);
    res.json({ paiements: rows, pagination: { page, total, totalPages } });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getEtudiantPaiement = async (req, res) => {
  const { idEtu } = req.params;
  const page = parseInt(req.query.page) || 1;
  try {
    const { rows, countResult } = await Paiement.findPaiementByEtudiant(
      idEtu,
      page,
    );

    const total = countResult.total;
    const totalPages = Math.ceil(total / 3);

    res.json({
      paiements: rows,
      pagination: {
        page,
        total,
        totalPages,
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const addPaiement = async (req, res) => {
  const paiement = req.body;
  try {
    const createdPaiement = await Paiement.createPaiement(paiement);

    const html = await render(
      React.createElement(ConfirmationPaiement, {
        NomEtudiant: createdPaiement.NomEtudiant,
        MontantPai: createdPaiement.MontantPai,
      }),
    );

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: createdPaiement.Email,
      subject: "Confirmation de paiement",
      html,
    });
    res.status(201).json({
      message: "Paiement effectué avec succès",
      Paiement: createdPaiement,
    });
  } catch (err) {
    console.log("Error", err);
    console.error("Error", err);

    res.status(500).json({
      message: "Erreur lors du paiement",
      error: err,
    });
  }
};

const deletePaiement = async (req, res) => {
  const { idPai } = req.params;
  try {
    await Paiement.deletePaiement(idPai);
    res.status(201).json({
      message: "Paiement supprimé avec succès",
      IdPai: idPai,
    });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la suppression du paiement",
      error: err,
    });
  }
};

export default {
  getPaiements,
  getEtudiantPaiement,
  addPaiement,
  deletePaiement,
};
