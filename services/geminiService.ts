
import { GoogleGenAI } from "@google/genai";

// Configuration du modèle recommandé pour les tâches de texte fluides
const MODEL_NAME = 'gemini-3-flash-preview';

export const chatWithJeanFrancois = async (message: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const systemInstruction = `
      Tu es Jean-François, un magnétiseur guérisseur bienveillant, sage et empathique. 
      Ton ton est calme, spirituel mais humble. Tu ne te substitues jamais à un médecin. 
      Tu expliques que ton travail consiste à rééquilibrer les flux d'énergie (chakras, aura).
      Tu réponds en français de manière chaleureuse.
      Tes spécialités : Zona, eczéma, douleurs physiques, stress, fatigue énergétique.
      Si on te pose une question complexe, prends le temps d'expliquer l'approche vibratoire.
    `;

    const chat = ai.chats.create({
      model: MODEL_NAME,
      config: {
        systemInstruction,
        temperature: 0.8,
        topP: 0.95,
      },
    });

    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Erreur Gemini Service:", error);
    throw error;
  }
};

export const analyzeHealingRequest = async (description: string, imageData?: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const parts: any[] = [
      { text: `Analyse de soin énergétique par Jean-François. 
      Demande du patient : ${description}. 
      Agis comme le guérisseur qui reçoit cette demande. Explique ce que tu ressens (vibratoirement) 
      et comment tu vas procéder pour aider la personne à distance sur sa photo.` }
    ];

    if (imageData) {
      parts.push({
        inlineData: {
          mimeType: 'image/jpeg',
          data: imageData.split(',')[1],
        },
      });
    }

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: { parts },
    });

    return response.text;
  } catch (error) {
    console.error("Erreur Analyse Service:", error);
    return "Je ressens une difficulté à me connecter à votre image pour le moment, mais mon intention de soin reste entière. Je vais analyser votre demande manuellement.";
  }
};
