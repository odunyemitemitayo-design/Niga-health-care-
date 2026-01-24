
import { GoogleGenAI, Modality } from "https://esm.sh/@google/genai@^1.38.0";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function getHospitalSummary(hospitalName: string, specialties: string[], rating: number) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a medical consultant in Nigeria. Provide a 2-sentence expert summary of ${hospitalName}, known for ${specialties.join(', ')}, with a patient rating of ${rating}/5. Focus on why a patient might choose this facility in the Nigerian healthcare context.`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 150,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Expert insights are currently unavailable.";
  }
}

export async function getVoiceGuidance(text: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Say in a helpful, professional tone: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' }, // Professional and clear
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    return base64Audio || null;
  } catch (error) {
    console.error("Gemini TTS Error:", error);
    return null;
  }
}

export async function getFacilityOverview(hospitalName: string, facilities: string[]) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Describe the clinical capabilities of ${hospitalName} in Nigeria based on these facilities: ${facilities.join(', ')}. Keep it to 3 concise bullet points.`,
      config: {
        temperature: 0.4,
        maxOutputTokens: 200,
      }
    });
    return response.text;
  } catch (error) {
    return null;
  }
}

export async function getEmergencyGuidance(hospitalName: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Quick emergency prep: What are the first 3 things a patient should have ready when heading to ${hospitalName} in an emergency in Nigeria? Format as a short bulleted list.`,
      config: {
        temperature: 0.5,
        maxOutputTokens: 100,
      }
    });
    return response.text;
  } catch (error) {
    return null;
  }
}
