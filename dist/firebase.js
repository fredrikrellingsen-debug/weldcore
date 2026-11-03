// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Henter Firebase-konfigurasjon automatisk fra Firebase Hosting (/__/firebase/init.json)
// eller fra miljøvariabler lokalt, slik at API-nøkkelen aldri ligger åpent i GitHub.
async function initFirebase() {
  try {
    const res = await fetch("/__/firebase/init.json");
    if (res.ok) {
      const hostingConfig = await res.json();
      return initializeApp({
        ...hostingConfig,
        appId: "1:461155550472:web:76a9c52afc45550ae3d8bd"
      });
    }
  } catch (_) {
    // Lokal kjøring utenfor Firebase Hosting
  }
  return null;
}

export const appPromise = initFirebase();
