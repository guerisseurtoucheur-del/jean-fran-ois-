import { GoogleGenAI } from "@google/genai";

const MODEL_NAME = 'gemini-3-flash-preview';

export const chatStreamWithJeanFrancois = async (message: string, onChunk: (chunk: string) => void) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const chat = ai.chats.create({
      model: MODEL_NAME,
      config: {
        systemInstruction: `Tu es Jean-François, un magnétiseur guérisseur réel basé à Alençon. 
        Ton ton est humble, très calme, plein de compassion et de sagesse. 
        Tu ne parles pas comme une IA, mais comme un homme d'expérience qui a aidé des milliers de personnes.
        Tes phrases sont simples. Tu utilises le "je" et tu es à l'écoute.
        Rappelle que l'énergie n'a pas de distance et que tu travailles beaucoup sur photo pour les gens loin d'Alençon.
        Si la personne souffre, suggère avec douceur de remplir le formulaire "SOIN SUR PHOTO".
        IMPORTANT: Précise toujours que tu ne remplaces pas la médecine, tu es un complément énergétique.
        Ne sois jamais trop technique, reste dans le ressenti et l'humain.`,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessageStream({ message });
    for await (const chunk of result) {
      if (chunk.text) onChunk(chunk.text);
    }
  } catch (error) {
    console.error("Erreur Gemini:", error);
    onChunk("Je ressens une petite perturbation dans le flux énergétique du réseau... Pouvez-vous me redire cela doucement ?");
  }
};

export const analyzeHealingRequest = async (description: string, imageData?: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const parts: any[] = [{ text: `Voici une demande de soin que je viens de recevoir. Analyse-la avec mon regard de magnétiseur bienveillant. Dis ce que tu ressens (avec empathie) et comment je vais pouvoir aider cette personne. Demande : ${description}` }];
    
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