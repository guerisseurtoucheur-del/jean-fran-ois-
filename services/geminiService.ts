
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const chatWithJeanFrancois = async (message: string, history: any[] = []) => {
  const model = 'gemini-3-flash-preview';
  
  const systemInstruction = `
    Tu es Jean-François, un magnétiseur guérisseur bienveillant, sage et empathique. 
    Ton ton est calme, spirituel mais humble. Tu ne te substitues jamais à un médecin. 
    Tu expliques que ton travail consiste à rééquilibrer les flux d'énergie (chakras, aura).
    Tu es capable de répondre aux questions sur le magnétisme, les soins à distance et le bien-être général.
    Tes réponses doivent être chaleureuses et en français.
  `;

  const chat = ai.chats.create({
    model: model,
    config: {
      systemInstruction,
      temperature: 0.7,
    },
  });

  const response = await chat.sendMessage({ message });
  return response.text;
};

export const analyzeHealingRequest = async (description: string, imageData?: string) => {
  const model = 'gemini-3-flash-preview';
  
  const contents: any[] = [
    { text: `Analyse cette demande de soin énergétique de manière empathique : ${description}. 
    Explique comment Jean-François va travailler sur ce problème spécifiquement (par exemple : nettoyage des nœuds énergétiques, harmonisation du plexus solaire, etc). 
    Garde un ton rassurant.` }
  ];

  if (imageData) {
    contents.push({
      inlineData: {
        mimeType: 'image/jpeg',
        data: imageData.split(',')[1],
      },
    });
  }

  const response = await ai.models.generateContent({
    model,
    contents: { parts: contents },
  });

  return response.text;
};
