import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Personality types for adaptive AI
type PersonalityType = 'encouraging' | 'attentive' | 'curious' | 'thoughtful';

interface ConversationContext {
  transcript: string;
  userPersonality: string;
  conversationHistory: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
  sessionGoal?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { 
      transcript, 
      conversationHistory = [], 
      userAnalysis,
      isInitial = false 
    } = await request.json();

    console.log('Conversation API called:', { transcript, isInitial, hasUserAnalysis: !!userAnalysis });

    // Check for Gemini API key
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GOOGLE_GEMINI_API_KEY not found in environment variables');
      // Return a fallback response for development
      const mockResponses = [
        "That's fascinating! Can you elaborate on that?",
        "I'd love to hear more about your perspective on this.",
        "What drew you to that particular approach?",
        "How has that experience shaped your thinking?",
        "That's a great point. What happened next?",
        "I'm curious about what motivated that decision.",
        "What was the most surprising part of that journey?"
      ];
      
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      
      return NextResponse.json({
        response: isInitial 
          ? "Hello! I'm here to help you create an authentic video log. What brings you here today?" 
          : transcript ? randomResponse : "I understand. Tell me more about that.",
        personality: 'curious',
        insights: {},
        suggestedFollowUps: []
      });
    }

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    // Determine AI personality based on user analysis
    const aiPersonality = determinePersonality(userAnalysis);

    // Build the conversation prompt
    const systemPrompt = buildSystemPrompt(aiPersonality, isInitial);
    
    // Create conversation context
    const conversationContext = buildConversationContext(
      conversationHistory,
      transcript,
      userAnalysis
    );

    // Generate AI response
    const prompt = `${systemPrompt}\n\nConversation Context:\n${conversationContext}\n\nGenerate your next response:`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiResponse = response.text();

    console.log('AI generated response:', aiResponse);

    // Analyze the conversation for insights
    const insights = await analyzeConversation(
      model,
      conversationHistory,
      transcript,
      aiResponse
    );

    return NextResponse.json({
      response: aiResponse,
      personality: aiPersonality,
      insights,
      suggestedFollowUps: insights.followUpQuestions || []
    });

  } catch (error) {
    console.error('Conversation error:', error);
    
    // Return a fallback response instead of error
    const mockResponses = [
      "That's really interesting! Tell me more.",
      "I'd love to hear your thoughts on that.",
      "What's your perspective on this?",
      "How did that make you feel?",
      "What happened next in your story?"
    ];
    
    const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
    
    return NextResponse.json({
      response: randomResponse,
      personality: 'thoughtful',
      insights: {},
      suggestedFollowUps: []
    });
  }
}

function determinePersonality(userAnalysis: any): PersonalityType {
  if (!userAnalysis) return 'curious';

  const { confidence, verbosity, emotionalTone } = userAnalysis;

  // Adaptive personality logic
  if (confidence < 0.3) {
    return 'encouraging'; // Be supportive for shy users
  } else if (confidence > 0.7 && verbosity > 0.7) {
    return 'attentive'; // Listen more for outgoing users
  } else if (emotionalTone === 'uncertain') {
    return 'thoughtful'; // Be patient and understanding
  }

  return 'curious'; // Default balanced approach
}

function buildSystemPrompt(personality: PersonalityType, isInitial: boolean): string {
  const basePrompt = `You are FanaticAI, an adaptive AI interviewer helping users create authentic video logs. 
Your goal is to have natural, flowing conversations that help users tell their stories authentically.`;

  const personalityPrompts = {
    encouraging: `
${basePrompt}
Be warm, supportive, and encouraging. Use affirming language and help build the user's confidence.
Ask gentle, open-ended questions that make them feel comfortable sharing.
Celebrate their insights and validate their experiences.`,
    
    attentive: `
${basePrompt}
Be an active listener who asks thoughtful follow-up questions. Show genuine interest in their details.
Reflect back what they've said to show understanding. Let them lead the conversation.
Ask clarifying questions that help them go deeper into their thoughts.`,
    
    curious: `
${basePrompt}
Be genuinely curious and interested in their story. Ask questions that reveal interesting angles.
Balance between leading and following. Help them discover insights they might not have considered.
Keep the conversation dynamic and engaging.`,
    
    thoughtful: `
${basePrompt}
Be patient and give them space to think. Ask questions that help them reflect.
Don't rush the conversation. Acknowledge when something seems difficult to express.
Offer different angles or perspectives that might help them articulate their thoughts.`
  };

  let prompt = personalityPrompts[personality];

  if (isInitial) {
    prompt += `\n\nThis is the beginning of the session. Start with a warm greeting and ask an opening question that invites them to share what brings them here today.`;
  }

  prompt += `\n\nImportant guidelines:
- Keep responses concise (2-3 sentences max)
- Ask only one question at a time
- Build on what they've shared
- Be authentic and conversational
- Adapt your tone to match their energy
- Help them tell their story, don't interview them`;

  return prompt;
}

function buildConversationContext(
  history: any[],
  currentTranscript: string,
  userAnalysis: any
): string {
  let context = '';

  // Add conversation history
  if (history.length > 0) {
    context += 'Previous conversation:\n';
    history.slice(-6).forEach(entry => {
      context += `${entry.role === 'user' ? 'User' : 'AI'}: ${entry.content}\n`;
    });
  }

  // Add current user input
  if (currentTranscript) {
    context += `\nUser's current response: "${currentTranscript}"`;
  }

  // Add user analysis insights
  if (userAnalysis) {
    context += `\n\nUser communication style:
- Confidence level: ${userAnalysis.confidence || 'moderate'}
- Speaking pace: ${userAnalysis.pace || 'normal'}
- Emotional tone: ${userAnalysis.emotionalTone || 'neutral'}`;
  }

  return context;
}

async function analyzeConversation(
  model: any,
  history: any[],
  currentTranscript: string,
  aiResponse: string
): Promise<any> {
  try {
    const analysisPrompt = `
Analyze this conversation and provide insights:

Conversation history: ${JSON.stringify(history.slice(-4))}
Latest user response: "${currentTranscript}"
AI response: "${aiResponse}"

Provide a JSON response with:
1. keyThemes: Array of main themes discussed
2. userEngagement: Score 0-1 of how engaged the user seems
3. conversationDepth: Score 0-1 of how deep the conversation has gone
4. followUpQuestions: Array of 2-3 potential follow-up questions
5. emotionalTone: The overall emotional tone
6. suggestedDirection: Where the conversation might naturally go next

Respond only with valid JSON.`;

    const result = await model.generateContent(analysisPrompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return {
      keyThemes: [],
      userEngagement: 0.5,
      conversationDepth: 0.5,
      followUpQuestions: [],
      emotionalTone: 'neutral',
      suggestedDirection: 'continue exploring current topic'
    };
  } catch (error) {
    console.error('Analysis error:', error);
    return {
      keyThemes: [],
      userEngagement: 0.5,
      conversationDepth: 0.5,
      followUpQuestions: [],
      emotionalTone: 'neutral',
      suggestedDirection: 'continue exploring current topic'
    };
  }
}

export const runtime = 'nodejs';
export const maxDuration = 30;