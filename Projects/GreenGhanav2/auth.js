
// =================================================================================
// MODULE 2: MANDATORY USER AUTHENTICATION & GATING (auth.js)
// =================================================================================
// This script handles all user authentication logic: sign-up, sign-in, sign-out,
// and session management. It also provides the critical function to "gate" or
// protect pages, ensuring only authenticated users can access them.

// Import Firebase services and database functions
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { auth } from './firebase-config.js';
import { createUserProfile } from './database.js'; // Assumes database.js is in the same directory

// A global variable to hold the current user's state, including the UID.
// This is a simple approach for this project. In larger apps, consider a state management library.
let currentUser = null;

/**
 * Handles the user sign-up process.
 * Creates a new user with email and password, then creates their profile in Firestore.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's chosen password.
 * @returns {Promise<UserCredential|Error>} A promise that resolves with the user credential or rejects with an error.
 */
async function handleSignUp(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('Sign-up successful!', userCredential.user);

        // After successful sign-up, create a corresponding user profile in Firestore.
        await createUserProfile(userCredential.user.uid, email);
        console.log('User profile created in Firestore.');

        return userCredential;
    } catch (error) {
        console.error('Error during sign-up:', error.message);
        // You can add UI feedback here (e.g., showing an error message to the user)
        throw error;
    }
}

/**
 * Handles the user sign-in process.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<UserCredential|Error>} A promise that resolves with the user credential or rejects with an error.
 */
async function handleSignIn(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('Sign-in successful!', userCredential.user);
        return userCredential;
    } catch (error) {
        console.error('Error during sign-in:', error.message);
        // Add UI feedback for failed login
        throw error;
    }
}

/**
 * Handles the user sign-out process.
 * @returns {Promise<void|Error>} A promise that resolves on successful sign-out or rejects with an error.
 */
async function handleSignOut() {
    try {
        await signOut(auth);
        console.log('User signed out successfully.');
        // After sign-out, you'll likely want to redirect the user.
        window.location.href = '/login.html';
    } catch (error) {
        console.error('Error during sign-out:', error.message);
        throw error;
    }
}

/**
 * Initializes the authentication state listener.
 * This function is crucial for session persistence. It observes the user's
 * sign-in state and updates the `currentUser` variable accordingly.
 * It should be called once when the application loads.
 */
function initializeAuthStateListener() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in.
            console.log('Auth state changed: User is signed in.', user);
            currentUser = { uid: user.uid, email: user.email };
        } else {
            // User is signed out.
            console.log('Auth state changed: User is signed out.');
            currentUser = null;
        }
    });
}

/**
 * The security gate for protected pages.
 * Checks if a user is authenticated. If not, it redirects them to the login page.
 * This function should be called at the very top of any script on a protected page.
 * @param {string} [targetUrl='/login.html'] - The URL to redirect to if the user is not authenticated.
 */
function checkAuthAndRedirect(targetUrl = '/login.html') {
    // Use onAuthStateChanged to ensure Firebase has initialized and checked the session.
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            // No user is signed in.
            console.log('Access Denied. Redirecting to login page.');
            window.location.href = targetUrl;
        } else {
            // User is signed in, allow access.
            console.log('Access Granted. User is authenticated.');
            // The `currentUser` variable is already set by the listener.
        }
    });
}

// Export the functions to be used in your UI event listeners
export { 
    handleSignUp, 
    handleSignIn, 
    handleSignOut, 
    initializeAuthStateListener, 
    checkAuthAndRedirect,
    currentUser // Exporting currentUser for easy access, but use with caution.
};