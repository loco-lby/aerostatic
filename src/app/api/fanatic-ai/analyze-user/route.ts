import { NextRequest, NextResponse } from 'next/server';

interface AudioAnalysis {
  confidence: number;
  pace: 'slow' | 'normal' | 'fast';
  verbosity: number;
  emotionalTone: 'confident' | 'nervous' | 'excited' | 'uncertain' | 'neutral';
  volume: number;
  pauseFrequency: number;
}

export async function POST(request: NextRequest) {
  try {
    const { audioMetrics, transcriptLength, duration } = await request.json();

    // Analyze user communication patterns
    const analysis: AudioAnalysis = {
      confidence: calculateConfidence(audioMetrics),
      pace: determineSpeakingPace(transcriptLength, duration),
      verbosity: calculateVerbosity(transcriptLength, duration),
      emotionalTone: determineEmotionalTone(audioMetrics),
      volume: audioMetrics.averageVolume || 0.5,
      pauseFrequency: calculatePauseFrequency(audioMetrics.pauses, duration)
    };

    return NextResponse.json({ analysis });

  } catch (error) {
    console.error('User analysis error:', error);
    return NextResponse.json(
      { error: 'Analysis failed' },
      { status: 500 }
    );
  }
}

function calculateConfidence(metrics: any): number {
  // Analyze various factors to determine confidence
  const factors = {
    volumeConsistency: metrics.volumeVariance ? 1 - metrics.volumeVariance : 0.5,
    speechContinuity: metrics.speechRatio || 0.5,
    clarity: metrics.clarity || 0.5
  };

  return Object.values(factors).reduce((a, b) => a + b, 0) / Object.keys(factors).length;
}

function determineSpeakingPace(words: number, duration: number): 'slow' | 'normal' | 'fast' {
  const wordsPerMinute = (words / duration) * 60;
  
  if (wordsPerMinute < 100) return 'slow';
  if (wordsPerMinute > 160) return 'fast';
  return 'normal';
}

function calculateVerbosity(words: number, duration: number): number {
  const wordsPerMinute = (words / duration) * 60;
  // Normalize to 0-1 scale where 150 wpm is considered normal (0.5)
  return Math.min(wordsPerMinute / 300, 1);
}

function determineEmotionalTone(metrics: any): AudioAnalysis['emotionalTone'] {
  // Simple heuristic based on audio patterns
  if (metrics.volumeVariance > 0.7) return 'excited';
  if (metrics.volumeVariance < 0.3 && metrics.averageVolume < 0.3) return 'nervous';
  if (metrics.speechRatio < 0.5) return 'uncertain';
  if (metrics.averageVolume > 0.7 && metrics.speechRatio > 0.7) return 'confident';
  return 'neutral';
}

function calculatePauseFrequency(pauses: number, duration: number): number {
  if (!pauses || !duration) return 0.5;
  // Normalize pause frequency (pauses per minute)
  return Math.min((pauses / duration) * 60 / 10, 1); // Assuming 10 pauses per minute is high
}