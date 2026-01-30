/**
 * LAB - Point d'entrée React isolé
 * 
 * Ce fichier initialise React pour la page Lab uniquement.
 * Complètement séparé de l'application principale.
 * 
 * IMPORTANT: Supprimez ce dossier (src/lab/) et lab.html après les tests.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LabPage } from './LabPage';
import './lab.css';
import '../index.css'; // Import global styles for FxImage to work

createRoot(document.getElementById('lab-root')!).render(
    <StrictMode>
        <LabPage />
    </StrictMode>
);
