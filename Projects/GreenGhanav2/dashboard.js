// =================================================================================
// MODULE 6: DYNAMIC DASHBOARD & RECOMMENDATION LOGIC (dashboard.js)
// =================================================================================
// This script powers the user dashboard. It fetches all necessary user data,
// including their profile, latest quiz results, and then uses this data to
// generate personalized recommendations for learning resources.

import { auth, db } from './firebase-config.js';
import { getPersonalizedResources } from './database.js';
import { doc, getDoc, collection, query, where, orderBy, limit, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

/**
 * Fetches the current user's profile data from Firestore.
 * @param {string} uid - The user's unique ID.
 * @returns {Promise<object|null>} User data object or null if not found.
 */
async function fetchUserProfile(uid) {
    const userDocRef = doc(db, 'users', uid);
    try {
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
            return docSnap.data();
        }
        console.warn("User profile not found.");
        return null;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        throw error;
    }
}

/**
 * Fetches the user's most recent quiz result.
 * @param {string} uid - The user's unique ID.
 * @returns {Promise<object|null>} The latest quiz result object or null.
 */
async function fetchLatestQuizResult(uid) {
    const q = query(
        collection(db, 'quiz_results'),
        where("user_id", "==", uid),
        orderBy("taken_at", "desc"),
        limit(1)
    );
    try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            return querySnapshot.docs[0].data();
        }
        return null; // No quiz results found
    } catch (error) {
        console.error("Error fetching latest quiz result:", error);
        throw error;
    }
}

/**
 * Determines the user's weakest skill areas from a quiz result breakdown.
 * @param {object} resultBreakdown - The result_breakdown map from the quiz result.
 * @returns {string[]} An array of the two weakest skill tags.
 */
function determineWeakestAreas(resultBreakdown) {
    if (!resultBreakdown || Object.keys(resultBreakdown).length === 0) {
        return [];
    }
    // Sort the categories by score, ascending
    const sortedAreas = Object.entries(resultBreakdown).sort(([, a], [, b]) => a - b);
    // Return the tags of the two lowest-scoring areas
    return sortedAreas.slice(0, 2).map(item => item[0]);
}

/**
 * The main function to load all dashboard data and render it to the page.
 */
async function loadDashboard() {
    const user = auth.currentUser;
    if (!user) {
        console.log("Dashboard cannot be loaded; user not authenticated.");
        // The checkAuthAndRedirect should handle the redirect.
        return;
    }

    try {
        // Fetch user profile and latest quiz result in parallel
        const [userProfile, latestQuiz] = await Promise.all([
            fetchUserProfile(user.uid),
            fetchLatestQuizResult(user.uid)
        ]);

        // --- Render Gamification Card ---
        if (userProfile) {
            document.getElementById('display-name').textContent = userProfile.display_name || 'User';
            document.getElementById('total-points').textContent = userProfile.total_points || 0;
            // Example: Progress to the next level every 1000 points
            const progress = ((userProfile.total_points % 1000) / 1000) * 100;
            document.getElementById('progress-bar').style.width = `${progress}%`;
        }

        // --- Determine Weaknesses and Fetch Recommendations ---
        if (latestQuiz && latestQuiz.result_breakdown) {
            const weaknessTags = determineWeakestAreas(latestQuiz.result_breakdown);
            console.log("User's weakest areas:", weaknessTags);

            if (weaknessTags.length > 0) {
                const resources = await getPersonalizedResources(weaknessTags);
                renderRecommendations(resources);
            } else {
                 document.getElementById('recommendation-panel').innerHTML = '<p class="text-gray-500">Complete the skills assessment to get personalized recommendations!</p>';
            }
        } else {
            document.getElementById('recommendation-panel').innerHTML = '<p class="text-gray-500">No quiz results found. Take the assessment to get started!</p>';
        }

    } catch (error) {
        console.error("Failed to load dashboard data:", error);
        // Display an error on the dashboard UI
        document.getElementById('dashboard-content').innerHTML = '<p class="text-red-500">Could not load dashboard. Please try again later.</p>';
    }
}

/**
 * Renders the recommendation cards to the UI.
 * @param {object[]} resources - An array of resource documents from Firestore.
 */
function renderRecommendations(resources) {
    const panel = document.getElementById('recommendation-panel');
    panel.innerHTML = ''; // Clear previous content

    if (!resources || resources.length === 0) {
        panel.innerHTML = '<p class="text-gray-500">We couldn\'t find specific resources for your weaker areas, but keep exploring!</p>';
        return;
    }

    // Display up to 3 recommended resources
    resources.slice(0, 3).forEach(resource => {
        const card = `
            <a href="${resource.url}" target="_blank" class="block bg-green-50 p-4 rounded-lg border border-green-200 hover:shadow-md hover:border-green-400 transition-all">
                <h4 class="font-bold text-green-800">${resource.title}</h4>
                <p class="text-sm text-gray-600 mt-1">${resource.description}</p>
                <div class="mt-2">
                    ${resource.tags.map(tag => `<span class="inline-block bg-gray-200 rounded-full px-2 py-0.5 text-xs font-semibold text-gray-700 mr-2">#${tag}</span>`).join('')}
                </div>
            </a>
        `;
        panel.innerHTML += card;
    });
}

export { loadDashboard };
