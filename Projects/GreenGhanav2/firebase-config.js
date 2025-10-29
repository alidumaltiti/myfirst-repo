
// =================================================================================
// MODULE 1: FIREBASE INITIALIZATION & SETUP (firebase-config.js)
// =================================================================================
// This script initializes the Firebase app and exports the core services (Auth, Firestore).
// It's the central point of connection to your Firebase backend.

// Import the necessary functions from the Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// ---------------------------------------------------------------------------------
// IMPORTANT: SECURE YOUR CONFIGURATION
// ---------------------------------------------------------------------------------
// The configuration object below contains sensitive API keys.
// 1. Go to your Firebase Project Console: https://console.firebase.google.com/
// 2. Navigate to Project Settings > General tab.
// 3. Under "Your apps", find and select your web app.
// 4. Copy the firebaseConfig object provided.
// 5. **BEST PRACTICE:** Do NOT commit these keys directly into your repository.
//    Use a secure method like environment variables (e.g., with a tool like Vite or
//    a custom build script) or Firebase Hosting's reserved URLs to inject them at runtime.
//    For this educational project, we are placing them here with placeholders.
// ---------------------------------------------------------------------------------

const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_AUTH_DOMAIN_HERE",
  projectId: "YOUR_PROJECT_ID_HERE",
  storageBucket: "YOUR_STORAGE_BUCKET_HERE",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID_HERE",
  appId: "YOUR_APP_ID_HERE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the Authentication service
const auth = getAuth(app);

// Get a reference to the Cloud Firestore database service
const db = getFirestore(app);

// Export the initialized services to be used in other modules
export { auth, db };
