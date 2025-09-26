interface AwarenessMetrics {
  curiosityScore: number      // 0-25: How strong is the hook?
  emotionalScore: number      // 0-25: Emotional payoff potential
  shareworthyScore: number    // 0-25: How likely to be shared?
  appealScore: number         // 0-25: Broad audience appeal
}

interface ConversionMetrics {
  problemClarity: number      // 0-20: How clear is the problem?
  solutionClarity: number     // 0-20: How clear is the solution?
  tacticalValue: number       // 0-20: How actionable and non-obvious?
  audienceFit: number         // 0-20: How well targeted?
  nicheShareworthy: number    // 0-20: Shareworthy within niche?
}

interface GScoreResult {
  score: number               // 0-100 overall score
  breakdown: AwarenessMetrics | ConversionMetrics
  nextSteps: string[]         // Actionable improvements
  strengths: string[]         // What's working well
}

export function calculateGScore(
  gameType: 'awareness' | 'conversion',
  data: {
    hook?: string
    title?: string
    description?: string
    checklist?: any
    actualMetrics?: {
      views?: number
      engagement?: number
      shares?: number
      conversions?: number
    }
  }
): GScoreResult {
  if (gameType === 'awareness') {
    return calculateAwarenessScore(data)
  } else {
    return calculateConversionScore(data)
  }
}

function calculateAwarenessScore(data: any): GScoreResult {
  // Base scoring from content analysis
  let curiosityScore = 15  // Default medium score
  let emotionalScore = 15
  let shareworthyScore = 15
  let appealScore = 15

  // Analyze hook strength
  if (data.hook) {
    const hook = data.hook.toLowerCase()

    // Curiosity triggers
    if (hook.includes('secret') || hook.includes('nobody') || hook.includes('truth')) {
      curiosityScore += 5
    }
    if (hook.includes('?') || hook.includes('how') || hook.includes('why')) {
      curiosityScore += 3
    }
    if (hook.length < 50) {
      curiosityScore += 2  // Punchy hooks work better
    }

    // Emotional triggers
    if (hook.includes('changed my life') || hook.includes('never the same')) {
      emotionalScore += 5
    }
    if (hook.includes('shocked') || hook.includes('amazed') || hook.includes('mind')) {
      emotionalScore += 3
    }

    // Shareworthy elements
    if (hook.includes('everyone') || hook.includes('need to') || hook.includes('must')) {
      shareworthyScore += 4
    }
    if (hook.includes('hack') || hook.includes('trick') || hook.includes('method')) {
      shareworthyScore += 3
    }

    // Broad appeal
    const universalTopics = ['money', 'health', 'relationship', 'happiness', 'success', 'productivity']
    if (universalTopics.some(topic => hook.includes(topic))) {
      appealScore += 5
    }
  }

  // Incorporate checklist scores if available
  if (data.checklist) {
    if (data.checklist.shareworthy_score) {
      shareworthyScore = Math.min(25, shareworthyScore + (data.checklist.shareworthy_score * 2))
    }
    if (data.checklist.curiosity_hook) {
      curiosityScore = Math.min(25, curiosityScore + 5)
    }
    if (data.checklist.emotional_payoff) {
      emotionalScore = Math.min(25, emotionalScore + 5)
    }
  }

  // Adjust based on actual performance if available
  if (data.actualMetrics) {
    const { views = 0, engagement = 0, shares = 0 } = data.actualMetrics

    if (views > 10000) appealScore = Math.min(25, appealScore + 5)
    if (engagement > 0.05) emotionalScore = Math.min(25, emotionalScore + 3)
    if (shares > 100) shareworthyScore = 25
  }

  // Cap all scores at their maximums
  curiosityScore = Math.min(25, curiosityScore)
  emotionalScore = Math.min(25, emotionalScore)
  shareworthyScore = Math.min(25, shareworthyScore)
  appealScore = Math.min(25, appealScore)

  const totalScore = curiosityScore + emotionalScore + shareworthyScore + appealScore

  // Generate next steps based on weakest areas
  const nextSteps: string[] = []
  const strengths: string[] = []

  if (curiosityScore < 15) {
    nextSteps.push('Add a stronger curiosity gap or unexpected angle to your hook')
  } else if (curiosityScore > 20) {
    strengths.push('Strong curiosity hook that stops scrolling')
  }

  if (emotionalScore < 15) {
    nextSteps.push('Include an emotional payoff or transformation story')
  } else if (emotionalScore > 20) {
    strengths.push('Great emotional resonance and payoff')
  }

  if (shareworthyScore < 15) {
    nextSteps.push('Add a twist, revelation, or "aha moment" to make it shareworthy')
  } else if (shareworthyScore > 20) {
    strengths.push('Highly shareworthy content')
  }

  if (appealScore < 15) {
    nextSteps.push('Broaden the appeal by connecting to universal desires or fears')
  } else if (appealScore > 20) {
    strengths.push('Broad audience appeal')
  }

  if (nextSteps.length === 0) {
    nextSteps.push('Test different thumbnail text and posting times for optimization')
  }

  return {
    score: totalScore,
    breakdown: {
      curiosityScore,
      emotionalScore,
      shareworthyScore,
      appealScore
    },
    nextSteps,
    strengths
  }
}

function calculateConversionScore(data: any): GScoreResult {
  // Base scoring
  let problemClarity = 12
  let solutionClarity = 12
  let tacticalValue = 12
  let audienceFit = 12
  let nicheShareworthy = 12

  // Analyze content for conversion signals
  if (data.hook) {
    const hook = data.hook.toLowerCase()

    // Problem clarity
    if (hook.includes('struggle') || hook.includes('problem') || hook.includes('mistake')) {
      problemClarity += 4
    }
    if (hook.includes('stop') || hook.includes("don't") || hook.includes('avoid')) {
      problemClarity += 3
    }

    // Solution clarity
    if (hook.includes('instead') || hook.includes('solution') || hook.includes('fix')) {
      solutionClarity += 4
    }
    if (hook.includes('step') || hook.includes('framework') || hook.includes('system')) {
      solutionClarity += 3
    }

    // Tactical value
    if (hook.includes('exactly') || hook.includes('specific') || hook.includes('actual')) {
      tacticalValue += 3
    }
    if (/\d+/.test(hook)) {  // Contains numbers (specificity)
      tacticalValue += 2
    }

    // Niche targeting
    const nicheTerms = ['founders', 'creators', 'developers', 'marketers', 'designers']
    if (nicheTerms.some(term => hook.includes(term))) {
      audienceFit += 4
      nicheShareworthy += 3
    }
  }

  // Incorporate checklist data
  if (data.checklist) {
    if (data.checklist.problem_statement) {
      problemClarity = Math.min(20, problemClarity + 3)
    }
    if (data.checklist.solution_statement) {
      solutionClarity = Math.min(20, solutionClarity + 3)
    }
    if (data.checklist.tactical_value) {
      tacticalValue = Math.min(20, tacticalValue + 3)
    }
  }

  // Adjust based on actual performance
  if (data.actualMetrics) {
    const { conversions = 0, engagement = 0 } = data.actualMetrics

    if (conversions > 50) {
      solutionClarity = 20
      tacticalValue = Math.min(20, tacticalValue + 3)
    }
    if (engagement > 0.08) {
      audienceFit = Math.min(20, audienceFit + 3)
      nicheShareworthy = Math.min(20, nicheShareworthy + 3)
    }
  }

  // Cap scores
  problemClarity = Math.min(20, problemClarity)
  solutionClarity = Math.min(20, solutionClarity)
  tacticalValue = Math.min(20, tacticalValue)
  audienceFit = Math.min(20, audienceFit)
  nicheShareworthy = Math.min(20, nicheShareworthy)

  const totalScore = problemClarity + solutionClarity + tacticalValue + audienceFit + nicheShareworthy

  // Generate feedback
  const nextSteps: string[] = []
  const strengths: string[] = []

  if (problemClarity < 12) {
    nextSteps.push('Name the specific problem more clearly in your hook')
  } else if (problemClarity > 16) {
    strengths.push('Crystal clear problem identification')
  }

  if (solutionClarity < 12) {
    nextSteps.push('Make your solution more concrete and actionable')
  } else if (solutionClarity > 16) {
    strengths.push('Clear, compelling solution')
  }

  if (tacticalValue < 12) {
    nextSteps.push('Add specific steps, numbers, or non-obvious insights')
  } else if (tacticalValue > 16) {
    strengths.push('High tactical value with actionable advice')
  }

  if (audienceFit < 12) {
    nextSteps.push('Use language and examples that resonate with your target audience')
  } else if (audienceFit > 16) {
    strengths.push('Perfect audience targeting')
  }

  if (nicheShareworthy < 12) {
    nextSteps.push('Add insider knowledge or counterintuitive insights for your niche')
  } else if (nicheShareworthy > 16) {
    strengths.push('Highly shareable within target community')
  }

  if (nextSteps.length === 0) {
    nextSteps.push('A/B test different CTAs to maximize conversions')
  }

  return {
    score: totalScore,
    breakdown: {
      problemClarity,
      solutionClarity,
      tacticalValue,
      audienceFit,
      nicheShareworthy
    },
    nextSteps,
    strengths
  }
}

export function getScoreColor(score: number): string {
  if (score >= 85) return 'text-green-600 dark:text-green-400'
  if (score >= 70) return 'text-blue-600 dark:text-blue-400'
  if (score >= 55) return 'text-yellow-600 dark:text-yellow-400'
  return 'text-red-600 dark:text-red-400'
}

export function getScoreEmoji(score: number): string {
  if (score >= 85) return '🔥'
  if (score >= 70) return '💪'
  if (score >= 55) return '📈'
  return '💡'
}

export function getScoreLabel(score: number): string {
  if (score >= 85) return 'Ready to Win'
  if (score >= 70) return 'Strong Potential'
  if (score >= 55) return 'Needs Polish'
  return 'Keep Improving'
}