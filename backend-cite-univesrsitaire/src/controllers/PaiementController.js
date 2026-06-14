import resend from "../emailService/resend.js";
import Paiement from "../models/PaiementModel.js";
import ConfirmationPaiement from "../../emails/ConfirmationPaiement.jsx";
import { render } from "@react-email/render";
import React from "react";

const getPaiements = async (req, res) => {
  try {
    const results = await Paiement.getAllPaiements();
    res.json(results);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getEtudiantPaiement = async (req, res) => {
  const { idEtu } = req.params;
  try {
    const results = await Paiement.findPaiementByEtudiant(idEtu);
    res.json(results);
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
