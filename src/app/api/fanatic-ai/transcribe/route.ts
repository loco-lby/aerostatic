import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio') as File;
    
    if (!audioFile) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      );
    }

    // Check for OpenAI API key
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('OPENAI_API_KEY not found in environment variables');
      return NextResponse.json(
        { error: 'Transcription service not configured' },
        { status: 500 }
      );
    }

    // Convert File to blob for OpenAI API
    const audioBlob = await audioFile.arrayBuffer();
    const audioBuffer = Buffer.from(audioBlob);

    // Create form data for OpenAI Whisper API
    const openAIFormData = new FormData();
    openAIFormData.append('file', new Blob([audioBuffer], { type: audioFile.type }), audioFile.name);
    openAIFormData.append('model', 'whisper-1');
    openAIFormData.append('response_format', 'verbose_json');
    openAIFormData.append('timestamp_granularities[]', 'word');

    // Call OpenAI Whisper API
    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
      body: openAIFormData,
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Whisper API error:', error);
      return NextResponse.json(
        { error: 'Transcription failed' },
        { status: response.status }
      );
    }

    const transcriptionData = await response.json();

    // Return transcription with timestamps
    return NextResponse.json({
      text: transcriptionData.text,
      words: transcriptionData.words || [],
      segments: transcriptionData.segments || [],
      duration: transcriptionData.duration,
    });

  } catch (error) {
    console.error('Transcription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Configuration for larger file uploads
export const runtime = 'nodejs';
export const maxDuration = 60; // 60 seconds timeout for transcription