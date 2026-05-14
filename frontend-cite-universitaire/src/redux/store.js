import { configureStore } from "@reduxjs/toolkit";
import attribuerReducer from "./features/attribuer/attibuerSlice";
import batimentReducer from "./features/batiment/batimentSlice";
import chambreReducer from "./features/chambre/chambreSlice";
import etudiantReducer from "./features/Etudiant/etudiantSlice";
import paiementReducer from "./features/paiement/paiementSlice";
import reclamationReducer from "./features/reclamation/reclamationSlice";
import sanctionReducer from "./features/sanction/sanctionSlice";
import statistiqueReducer from "./features/statistique/statistiqueSlice";

export const store = configureStore({
  reducer: {
    attribuer: attribuerReducer,
    batiment: batimentReducer,
    chambre: chambreReducer,
    etudiant: etudiantReducer,
    paiement: paiementReducer,
    reclamation: reclamationReducer,
    sanction: sanctionReducer,
    statistique: statistiqueReducer
  },
});