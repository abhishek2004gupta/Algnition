// src/utils/geminiService.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyBw3Gnxli7Mn5rgpy9k64Tnnw9l9fW_dZs");

export const summarizeJournals = async (entries) => {
  const prompt = `
You're an empathetic mental health assistant. Read the user's journal entries and generate:
1. A reflective summary of how the week went.
2. Emotional patterns you noticed.
3. Suggestions for emotional well-being.

Journal Entries:
${entries.map((e, i) => `Day ${i + 1}: ${e.text}`).join('\n')}
`;

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};
