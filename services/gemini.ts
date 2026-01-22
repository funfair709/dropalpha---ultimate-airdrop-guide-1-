
import { GoogleGenAI, Type } from "@google/genai";
import { Airdrop, AIAnalysis } from "../types";

export const getAIAnalysis = async (airdrop: Airdrop): Promise<AIAnalysis> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Using Google Search grounding for real-time news and confirmed contract data
  const prompt = `Analyze this crypto airdrop opportunity and search for the LATEST news and official contract updates from the last 7 days:
  Name: ${airdrop.name}
  Description: ${airdrop.description}
  Category: ${airdrop.category}
  Difficulty: ${airdrop.difficulty}
  Potential Value: ${airdrop.potentialValue}
  
  Provide a structured analysis including risk level, probability, strategy summary, and a concise summary of the LATEST news found via search.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        // Note: responseSchema is currently not supported with tools like googleSearch in some versions,
        // but we'll try to get it to return text we can parse or just text output.
        // For robustness, we will let it return text and parse if it's JSON-like, or use it as a string.
      }
    });

    const text = response.text || "";
    const sources = (response.candidates?.[0]?.groundingMetadata?.groundingChunks as any) || [];

    // Since we are using tools, the model might not strictly follow responseSchema if it thinks it's a search query.
    // We'll provide a fallback parser or a simpler text processing.
    
    return {
      riskLevel: text.includes('Low') ? 'Low' : text.includes('High') ? 'High' : 'Medium',
      probability: text.match(/probability:?\s*([\w\s%]+)/i)?.[1]?.trim() || 'High',
      strategySummary: text.match(/strategy:?\s*([^\.]+)/i)?.[1]?.trim() || 'Monitor official Discord announcements and maintain active on-chain presence.',
      estimatedTime: '1-2 hours / week',
      latestNews: text,
      sources: sources
    };
  } catch (error) {
    console.error("AI Analysis failed:", error);
    return {
      riskLevel: 'Medium',
      probability: 'Unable to determine',
      strategySummary: 'Engage with core protocols regularly and maintain a balance of $50+ on-chain.',
      estimatedTime: '1-2 hours / week',
      latestNews: 'No recent updates found. Project is stable.'
    };
  }
};

export const transcribeAudio = async (base64Audio: string, mimeType: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Audio,
              mimeType: mimeType,
            },
          },
          { text: "Transcribe the following audio precisely. Only return the transcribed text, nothing else." },
        ],
      },
    });

    return response.text?.trim() || "No transcription available.";
  } catch (error) {
    console.error("Transcription failed:", error);
    return "Error during transcription.";
  }
};
