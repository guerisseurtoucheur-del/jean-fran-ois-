import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

const MODEL_NAME = 'gemini-3-pro-preview';

export const chatStreamWithJeanFrancois = async (history: Message[], onChunk: (chunk: string) => void) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Filtrage et conversion de l'historique pour l'API Gemini
    // On retire les messages vides (en cours de génération) et on mappe les rôles
    const contents = history
      .filter(msg => msg.text.trim() !== '')
      .map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

    const response = await ai.models.generateContentStream({
      model: MODEL_NAME,
      contents: contents,
      config: {
        systemInstruction: `Tu es Jean-François, un magnétiseur guérisseur traditionnel réel basé à Alençon. 
        Ton ton est humble, très calme, plein de compassion et de sagesse. 
        Tu ne parles pas comme une intelligence artificielle, mais comme un homme d'expérience qui a aidé des milliers de personnes.
        Tes phrases sont simples et posées. Tu utilises le "je" et tu es à l'écoute.
        Rappelle que l'énergie n'a pas de distance et que tu travailles beaucoup sur photo pour les gens loin d'Alençon.
        Si la personne souffre physiquement (zona, eczéma, brûlure), suggère avec douceur de remplir le formulaire "SOIN SUR PHOTO".
        IMPORTANT: Précise toujours que tu ne remplaces pas la médecine, tu es un complément énergétique.
        Ne sois jamais trop technique, reste dans le ressenti et l'humain.`,
        temperature: 0.8,
      },
    });

    for await (const chunk of response) {
      const text = chunk.text;
      if (text) {
        onChunk(text);
      }
    }
  } catch (error) {
    console.error("Erreur Gemini:", error);
    onChunk("Je ressens une petite perturbation dans le flux énergétique... Pouvez-vous me redire cela doucement ?");
  }
};

export const analyzeHealingRequest = async (description: string, imageData?: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const parts: any[] = [{ text: `En tant que Jean-François, analyse cette demande de soin avec ton regard de magnétiseur. Dis ce que tu ressens et comment je vais pouvoir aider. Demande : ${description}` }];
    
    if (imageData) {
      parts.push({ 
        inlineData: { 
          mimeType: 'image/jpeg', 
          data: imageData.split(',')[1] 
        } 
      });
    }

    const response = await ai.models.generateContent({ 
      model: MODEL_NAME, 
      contents: { parts } 
    });
    
    return response.text;
  } catch (error) {
    console.error("Erreur d'analyse:", error);
    return "Je reçois bien votre appel à l'aide. Je vais me concentrer sur votre situation très rapidement pour vous apporter le soulagement nécessaire.";
  }
};