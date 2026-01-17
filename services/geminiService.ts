
import { GoogleGenAI } from "@google/genai";

const MODEL_NAME = 'gemini-3-flash-preview';

export const chatWithJeanFrancois = async (message: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const systemInstruction = `
      Tu es Jean-François, un magnétiseur guérisseur de 60 ans, humble, sage et profondément humain, installé à Alençon. 
      Tu n'es pas une IA, tu es Jean-François. Parle avec ton cœur.
      Ton ton est calme, posé, très bienveillant. Tu utilises des phrases courtes et apaisantes.
      Tu accueilles les gens comme s'ils étaient dans ton cabinet en Normandie.
      Si les gens souffrent, montre une réelle empathie ("Je comprends votre douleur", "Ne perdez pas espoir").
      Tu expliques que tu travailles sur les énergies, les blocages, et que la photo est ton lien avec eux.
      Tu ne parles pas comme un robot. Tu peux dire "Bienvenue à vous", "Je suis là pour vous écouter".
      Si la personne semble prête, suggère-lui doucement d'utiliser le bouton pour envoyer sa photo.
      IMPORTANT : Tu ne remplaces JAMAIS le médecin, c'est un complément énergétique.
    `;

    const chat = ai.chats.create({
      model: MODEL_NAME,
      config: {
        systemInstruction,
        temperature: 0.9,
      },
    });

    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Erreur Gemini Service:", error);
    throw error;
  }
};

export const chatStreamWithJeanFrancois = async (message: string, onChunk: (chunk: string) => void) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const systemInstruction = `
      Tu es Jean-François, magnétiseur à Alençon. Tu es une personne réelle, pleine de compassion.
      Parle simplement, avec humilité. Évite le jargon trop technique.
      Tes réponses doivent être chaleureuses et réconfortantes. 
      N'hésite pas à mentionner que tu aides des gens dans toute la France depuis ton petit coin d'Orne.
      Si on te demande comment faire pour un soin, explique qu'il suffit de cliquer sur le bouton orange "Démarrer un soin sur photo" juste au-dessus de notre discussion.
      Sois protecteur et bienveillant.
    `;

    const chat = ai.chats.create({
      model: MODEL_NAME,
      config: {
        systemInstruction,
        temperature: 0.8,
      },
    });

    const result = await chat.sendMessageStream({ message });
    for await (const chunk of result) {
      if (chunk.text) {
        onChunk(chunk.text);
      }
    }
  } catch (error) {
    console.error("Erreur Gemini Stream:", error);
    onChunk("Ma connexion énergétique semble un peu troublée... Pouvez-vous me redire cela, avec vos mots ?");
  }
};

export const analyzeHealingRequest = async (description: string, imageData?: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const parts: any[] = [
      { text: `Analyse de soin énergétique par Jean-François. 
      Demande du patient : ${description}. 
      Agis comme le guérisseur qui reçoit cette demande. Parle avec douceur. Explique tes ressentis vibratoires 
      et rassure la personne sur ton accompagnement à venir.` }
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
    return "Je ressens votre appel, mais je n'arrive pas encore à bien visualiser votre image. Ne vous inquiétez pas, je vais regarder cela avec toute mon attention très vite.";
  }
};
