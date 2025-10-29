
// =================================================================================
// MODULE 5: IMPACT CALCULATOR LOGIC (calculator.js)
// =================================================================================
// This script handles the logic for the Impact Calculator. It takes user input
// from a form, applies conversion factors to estimate CO2 savings, and then
// logs this activity to Firestore using the database service layer.

import { auth } from './firebase-config.js';
import { logImpactActivity } from './database.js';

// --- CO2 SAVINGS CONVERSION FACTORS ---
// These are simplified estimates. In a real-world application, these would be
// based on scientific data and more complex calculations.
const CONVERSION_FACTORS = {
    cycling: 0.2,       // kg of CO2 saved per km cycled instead of driving
    energy_conservation: 0.5, // kg of CO2 saved per hour of conserved energy
    waste_recycled: 1.5, // kg of CO2 saved per kg of mixed recyclables
    tree_planting: 22,  // kg of CO2 absorbed per year by one mature tree
};

/**
 * Calculates the environmental impact based on form data and logs it.
 * @param {object} formData - An object containing the user's submitted activity data.
 * @param {string} formData.activityType - The type of activity (e.g., 'cycling').
 * @param {number} formData.metricValue - The amount of activity (e.g., 15 for 15 km).
 */
async function calculateAndLogImpact(formData) {
    const user = auth.currentUser;
    if (!user) {
        console.error("User is not authenticated. Cannot log impact.");
        alert("You must be logged in to log your impact!");
        return;
    }

    const { activityType, metricValue } = formData;

    // Check if the activity type is valid
    if (!CONVERSION_FACTORS.hasOwnProperty(activityType)) {
        console.error(`Invalid activity type: ${activityType}`);
        alert(`Sorry, we can't calculate the impact for that activity yet.`);
        return;
    }

    // Calculate the CO2 savings
    const co2SavedKg = metricValue * CONVERSION_FACTORS[activityType];

    console.log(`Logging impact for user ${user.uid}:`);
    console.log(`Activity: ${activityType}, Value: ${metricValue}, CO2 Saved: ${co2SavedKg.toFixed(2)}kg`);

    try {
        // Call the database function to log the activity and update points
        await logImpactActivity(user.uid, activityType, metricValue, co2SavedKg);
        console.log("Impact activity successfully logged.");
        // Provide feedback to the user
        alert(`Great job! You've saved an estimated ${co2SavedKg.toFixed(2)} kg of CO2 and earned points!`);
        // Optionally, redirect or update the dashboard
        // window.location.href = '/dashboard.html';
    } catch (error) {
        console.error("Failed to log impact activity:", error);
        alert("There was an error saving your activity. Please try again.");
    }
}

export { calculateAndLogImpact };
