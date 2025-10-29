
// =================================================================================
// MODULE 3: DATABASE SERVICE LAYER & SCHEMAS (database.js)
// =================================================================================
// This script provides a clean API for all Firestore database operations.
// It abstracts the underlying Firebase calls into reusable functions corresponding
// to the application's data models: users, quiz_results, etc.

// Import Firebase services and necessary Firestore functions
import { db } from './firebase-config.js';
import { 
    doc, 
    setDoc, 
    addDoc, 
    collection, 
    Timestamp, 
    runTransaction,
    query,
    where,
    getDocs
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

/**
 * Creates a new user profile document in the 'users' collection.
 * This is typically called immediately after a new user signs up.
 * @param {string} uid - The user's unique ID from Firebase Authentication.
 * @param {string} email - The user's email address.
 * @returns {Promise<void|Error>} A promise that resolves on success or rejects on failure.
 */
async function createUserProfile(uid, email) {
    // Create a reference to the new user document in the 'users' collection
    const userDocRef = doc(db, 'users', uid);
    try {
        // Set the initial data for the user profile
        await setDoc(userDocRef, {
            email: email,
            created_at: Timestamp.now(),
            total_points: 0, // Gamification starts at zero
            display_name: email.split('@')[0] // A default display name
        });
        console.log(`Successfully created profile for user ${uid}`);
    } catch (error) {
        console.error("Error creating user profile:", error);
        throw error;
    }
}

/**
 * Saves a user's quiz result to the 'quiz_results' collection.
 * @param {string} uid - The user's unique ID.
 * @param {string} quizName - The name or ID of the quiz taken.
 * @param {object} scoreData - An object containing score details.
 * @param {number} scoreData.percentage - The overall score percentage.
 * @param {object} scoreData.result_breakdown - A map of scores by category (e.g., {'WaterMgt': 4, 'WasteRed': 5}).
 * @returns {Promise<DocumentReference|Error>} A promise that resolves with the new document reference or rejects on failure.
 */
async function saveQuizResult(uid, quizName, scoreData) {
    // Create a reference to the 'quiz_results' collection
    const quizResultsColRef = collection(db, 'quiz_results');
    try {
        // Add a new document with the quiz data
        const docRef = await addDoc(quizResultsColRef, {
            user_id: uid,
            quiz_name: quizName,
            taken_at: Timestamp.now(),
            score_percentage: scoreData.percentage,
            result_breakdown: scoreData.result_breakdown // Nested map
        });
        console.log(`Quiz result saved with ID: ${docRef.id}`);
        return docRef;
    } catch (error) {
        console.error("Error saving quiz result:", error);
        throw error;
    }
}

/**
 * Logs a user's environmental impact activity and updates their total points.
 * This function uses a transaction to ensure both operations (logging and updating points) succeed or fail together.
 * @param {string} uid - The user's unique ID.
 * @param {string} activityType - The type of activity (e.g., 'Cycling', 'WasteRecycled').
 * @param {number} metricValue - The value associated with the activity (e.g., 10 for 10km).
 * @param {number} co2SavedKg - The calculated CO2 savings in kilograms.
 * @returns {Promise<void|Error>} A promise that resolves on success or rejects on failure.
 */
async function logImpactActivity(uid, activityType, metricValue, co2SavedKg) {
    const userDocRef = doc(db, 'users', uid);
    const impactLogColRef = collection(db, 'impact_activities');
    const pointsAwarded = Math.round(co2SavedKg * 10); // Example: 10 points per kg of CO2 saved

    try {
        await runTransaction(db, async (transaction) => {
            // 1. Get the current user's profile to read their current total_points
            const userDoc = await transaction.get(userDocRef);
            if (!userDoc.exists()) {
                throw new Error("User document does not exist!");
            }
            const newTotalPoints = (userDoc.data().total_points || 0) + pointsAwarded;

            // 2. Create the new impact activity log entry
            transaction.set(doc(impactLogColRef), { // Use doc() to create a ref with a new auto-ID
                user_id: uid,
                activity_type: activityType,
                metric_value: metricValue,
                co2_saved_kg: co2SavedKg,
                points_awarded: pointsAwarded,
                logged_at: Timestamp.now()
            });

            // 3. Update the user's total_points in their profile
            transaction.update(userDocRef, { total_points: newTotalPoints });
        });
        console.log('Transaction successfully committed: Impact logged and points updated.');
    } catch (error) {
        console.error("Transaction failed: ", error);
        throw error;
    }
}

/**
 * Fetches personalized learning resources based on a user's weakest skill areas.
 * @param {string[]} weaknessTags - An array of tags corresponding to the user's weak areas (e.g., ['WaterMgt', 'Energy']).
 * @returns {Promise<object[]|Error>} A promise that resolves with an array of resource documents or rejects on failure.
 */
async function getPersonalizedResources(weaknessTags) {
    // Ensure we have tags to query for
    if (!weaknessTags || weaknessTags.length === 0) {
        console.log("No weakness tags provided, returning empty array.");
        return [];
    }

    const resourcesColRef = collection(db, 'green_resources');
    // Create a query to find resources where the 'tags' array contains any of the weakness tags.
    const q = query(resourcesColRef, where('tags', 'array-contains-any', weaknessTags));

    try {
        const querySnapshot = await getDocs(q);
        const resources = [];
        querySnapshot.forEach((doc) => {
            resources.push({ id: doc.id, ...doc.data() });
        });
        console.log(`Found ${resources.length} personalized resources.`);
        return resources;
    } catch (error) {
        console.error("Error fetching personalized resources:", error);
        throw error;
    }
}

// Export the database functions for use in other modules
export { 
    createUserProfile, 
    saveQuizResult, 
    logImpactActivity, 
    getPersonalizedResources 
};
