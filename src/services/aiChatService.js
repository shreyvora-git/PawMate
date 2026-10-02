/**
 * PawMate AI Chat Service
 * Cleanly separated API service for intelligent pet care assistance and caregiver communication.
 * Uses a free, fast AI inference endpoint with contextual pet care knowledge.
 */

export async function getAIChatResponse(userMessage, conversationHistory = []) {
  try {
    // Context system prompt to ensure specialized, accurate pet care and PawMate responses
    const systemPrompt = "You are PawMate AI, a friendly and certified pet care assistant. Answer questions regarding pet routine care, dog walking tips, pet nutrition, safety, and caregiver coordination concisely and warmly in 2-3 sentences.";

    // Use a reliable free AI endpoint (Pollinations text API) with system prompt context
    const fullPrompt = `${systemPrompt}\n\nUser: ${userMessage}\nPawMate AI:`;
    const encodedPrompt = encodeURIComponent(fullPrompt);
    
    const response = await fetch(`https://text.pollinations.ai/${encodedPrompt}`, {
      method: 'GET',
      headers: {
        'Accept': 'text/plain'
      }
    });

    if (!response.ok) {
      throw new Error(`AI API responded with status ${response.status}`);
    }

    const replyText = await response.text();
    
    if (replyText && replyText.trim().length > 0) {
      return replyText.trim();
    } else {
      throw new Error('Empty response received from AI');
    }
  } catch (error) {
    console.warn('AI API network fallback:', error.message);
    
    // Intelligent contextual fallback in case of network unavailability
    const lower = userMessage.toLowerCase();
    if (lower.includes('food') || lower.includes('feed') || lower.includes('eat') || lower.includes('diet')) {
      return `For healthy nutrition, ensure portion sizes match your pet's weight and activity level. Always keep fresh water accessible and avoid chocolate, grapes, and cooked bones.`;
    } else if (lower.includes('walk') || lower.includes('exercise') || lower.includes('run')) {
      return `Daily active walks of 30-45 minutes are ideal for most breeds. During warmer afternoons, check the pavement heat and keep your dog hydrated.`;
    } else if (lower.includes('med') || lower.includes('sick') || lower.includes('vet') || lower.includes('health')) {
      return `If your pet shows persistent lethargy or unusual symptoms, we recommend consulting a certified veterinarian immediately or using PawMate's 24/7 emergency vet line.`;
    } else {
      return `Thank you for your message! I've noted down your inquiry regarding "${userMessage}". Our PawMate team is dedicated to keeping your pet happy, safe, and active.`;
    }
  }
}
