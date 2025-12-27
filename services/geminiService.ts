
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

export async function analyzeCropImage(base64Image: string): Promise<AnalysisResult> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `
    As an expert agricultural scientist, analyze this crop image for any diseases, pests, or nutritional deficiencies. 
    Provide the response in Bengali (Bangla). 
    Return the result in a JSON format with the following keys:
    - problemName: (The name of the disease or pest in Bangla)
    - description: (A detailed but concise description of the symptoms and causes in Bangla)
    - solution: (A clear, step-by-step numbered list of remedies, treatments, or actions to take in Bangla. Ensure each step is on a new line.)
    - urgency: (One of: 'Low', 'Medium', 'High')
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: 'image/jpeg',
                data: base64Image,
              },
            },
          ],
        },
      ],
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            problemName: { type: Type.STRING },
            description: { type: Type.STRING },
            solution: { type: Type.STRING },
            urgency: { type: Type.STRING },
          },
          required: ['problemName', 'description', 'solution', 'urgency'],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    const result = JSON.parse(text);
    return result as AnalysisResult;
  } catch (error) {
    console.error("AI Analysis Error:", error);
    throw new Error("Failed to analyze image. Please try again.");
  }
}
