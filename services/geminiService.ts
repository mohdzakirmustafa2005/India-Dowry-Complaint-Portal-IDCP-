import { GoogleGenAI, Type } from "@google/genai";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY is missing. AI features will be disabled.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const refineComplaintText = async (roughText: string): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "AI Service Unavailable: " + roughText;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are a legal aid assistant helping a victim of dowry harassment in India. 
      The user has provided a rough description of their situation. 
      Rewrite this into a clear, formal complaint suitable for a First Information Report (FIR). 
      Keep it factual, highlight specific incidents of dowry demand and harassment, and maintain the original intent. 
      Do not invent facts, just clarify the language.
      
      User Input: "${roughText}"`,
    });

    return response.text || roughText;
  } catch (error) {
    console.error("Gemini Error:", error);
    return roughText;
  }
};

export const analyzeSeverity = async (description: string): Promise<{ score: number; reasoning: string }> => {
  const ai = getAiClient();
  if (!ai) return { score: 5, reasoning: "AI unavailable" };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze the following complaint description for severity of immediate danger.
      Return a JSON object with a 'score' from 1 to 10 (10 being immediate life threat) and a short 'reasoning'.
      
      Complaint: "${description}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            reasoning: { type: Type.STRING }
          }
        }
      }
    });

    const json = JSON.parse(response.text || "{}");
    return { score: json.score || 5, reasoning: json.reasoning || "Analysis complete." };
  } catch (error) {
    return { score: 5, reasoning: "Manual review required." };
  }
};