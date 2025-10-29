
// =================================================================================
// MODULE 4: ENHANCED SKILLS ASSESSMENT LOGIC (quiz.js)
// =================================================================================
// This script contains the logic for the skills assessment quiz. It defines the
// quiz questions, processes user submissions, calculates scores, and saves
// the results to Firestore.

import { auth } from './firebase-config.js';
import { saveQuizResult } from './database.js';

// --- QUIZ DATA STRUCTURE ---
// Each question is an object with a `category` tag used for the result breakdown.
const quizQuestions = [
    { question: "How do you typically dispose of plastic bottles?", category: 'WasteRed', options: ["Recycle bin", "General trash", "I don't use them"], correct: 0 },
    { question: "Which of these is the most energy-efficient light bulb?", category: 'Energy', options: ["Incandescent", "Halogen", "LED"], correct: 2 },
    { question: "How long should a running tap be open when brushing your teeth?", category: 'WaterMgt', options: ["The whole time", "Only at the beginning and end", "I turn it off"], correct: 2 },
    { question: "What is the best way to reduce your transportation carbon footprint for short distances?", category: 'Transport', options: ["Driving a car", "Taking a bus", "Cycling or walking"], correct: 2 },
    { question: "Which of these is a key principle of sustainable agriculture?", category: 'ResilientAg', options: ["Monoculture cropping", "Heavy pesticide use", "Crop rotation"], correct: 2 },
    { question: "When you leave a room, what do you do with the lights?", category: 'Energy', options: ["Leave them on", "Turn them off", "Depends on the time of day"], correct: 1 },
    { question: "How do you prefer to dry your clothes?", category: 'Energy', options: ["Electric dryer", "Air drying on a line", "A mix of both"], correct: 1 },
    { question: "What type of shopping bag do you use most often?", category: 'WasteRed', options: ["Single-use plastic bags", "Reusable cloth/jute bags", "Paper bags"], correct: 1 },
    { question: "Which action best conserves water at home?", category: 'WaterMgt', options: ["Taking long showers", "Fixing leaky faucets promptly", "Watering the lawn daily"], correct: 1 },
    { question: "What does 'composting' primarily help with?", category: 'WasteRed', options: ["Generating electricity", "Reducing landfill waste", "Purifying water"], correct: 1 },
];

/**
 * Processes the user's quiz submission.
 * It calculates the total score, breaks it down by category, and saves it to the database.
 * @param {number[]} answers - An array of the user's selected option indices (e.g., [0, 2, 1, ...]).
 */
async function processQuizSubmission(answers) {
    const user = auth.currentUser;
    if (!user) {
        console.error("User is not authenticated. Cannot submit quiz.");
        // Optionally, redirect to login or show a message
        return;
    }

    let correctAnswers = 0;
    const result_breakdown = {
        WasteRed: 0,
        Energy: 0,
        WaterMgt: 0,
        Transport: 0,
        ResilientAg: 0
    };

    // Calculate scores
    answers.forEach((answerIndex, questionIndex) => {
        const question = quizQuestions[questionIndex];
        if (answerIndex === question.correct) {
            correctAnswers++;
            // Add a point to the correct category
            if (result_breakdown.hasOwnProperty(question.category)) {
                result_breakdown[question.category]++;
            }
        }
    });

    const scorePercentage = (correctAnswers / quizQuestions.length) * 100;

    console.log(`Quiz completed. Score: ${scorePercentage.toFixed(2)}%`);
    console.log("Result Breakdown:", result_breakdown);

    // Prepare the data object for Firestore
    const scoreData = {
        percentage: scorePercentage,
        result_breakdown: result_breakdown
    };

    try {
        // Call the database function to save the result
        await saveQuizResult(user.uid, "Green Skills Assessment", scoreData);
        console.log("Quiz results have been successfully saved to the database.");
        // Here, you would typically redirect to a results or dashboard page
        // window.location.href = '/dashboard.html';
    } catch (error) {
        console.error("Failed to save quiz results:", error);
        // Show an error message to the user on the UI
    }
}

// Export the core function and the questions array to be used by the UI
export { quizQuestions, processQuizSubmission };
