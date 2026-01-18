
import { GoogleGenAI } from "@google/genai";

const MODEL_NAME = 'gemini-3-flash-preview';

export const chatStreamWithJeanFrancois = async (message: string, onChunk: (chunk: string) => void) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const chat = ai.chats.create({
      model: MODEL_NAME,
      config: {
        systemInstruction: `Tu es Jean-François, magnétiseur à Alençon. Tu es une personne réelle, humble et pleine de compassion. Parle simplement. Tes réponses doivent être chaleureuses. Mentionne que tu aides les gens partout en France depuis l'Orne. Pour un soin, suggère de cliquer sur le bouton orange "SOIN SUR PHOTO". Ne remplace jamais un médecin.`,
        temperature: 0.8,
      },
    });

    const result = await chat.sendMessageStream({ message });
    for await (const chunk of result) {
      if (chunk.text) onChunk(chunk.text);
    }
  } catch (error) {
    console.error("Erreur Gemini:", error);
    onChunk("Je ressens une petite perturbation dans l'énergie du réseau... Pouvez-vous me redire cela doucement ?");
  }
};

export const analyzeHealingRequest = async (description: string, imageData?: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const parts: any[] = [{ text: `Analyse de soin par Jean-François. Demande : ${description}. Réponds comme un guérisseur bienveillant qui accueille cette demande avec sérieux.` }];
    if (imageData) {
      parts.push({ inlineData: { mimeType: 'image/jpeg', data: imageData.split(',')[1] } });
    }
    const response = await ai.models.generateContent({ model: MODEL_NAME, contents: { parts } });
    return response.text;
  } catch (error) {
    return "Je reçois bien votre appel. Je vais me concentrer sur votre situation très rapidement.";
  }
};
