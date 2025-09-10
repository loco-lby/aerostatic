import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface ProjectSuggestion {
  title: string
  type: 'aloft_day' | 'documentary_episode' | 'commercial_client' | 'social_short'
  logline: string
  audience_promise: string
  theme?: string
  primary_cta?: string
  distribution_targets: string[]
  deliverables: { type: string; duration?: string }[]
  tags: string[]
  beats?: any[]
}

export async function suggestProjectFromScript(script: string): Promise<ProjectSuggestion> {
  const systemPrompt = `You are a pre-production assistant for a video production company specializing in hot air balloon content. 
  Analyze the provided script/description and suggest comprehensive project details.
  
  Project types:
  - aloft_day: Commercial balloon operation footage
  - documentary_episode: Documentary storytelling
  - commercial_client: Client/commercial work
  - social_short: Social media reels/shorts
  
  Focus on:
  1. Clear, compelling logline (one sentence)
  2. Audience promise (what viewer gains)
  3. Theme (resilience, wonder, adventure, etc.)
  4. Appropriate distribution targets
  5. Realistic deliverables with durations
  6. Story beats with retention tactics`

  const userPrompt = `Based on this script/description, suggest a complete project structure:

"${script}"

Return a JSON object with these fields:
- title: Project title
- type: One of [aloft_day, documentary_episode, commercial_client, social_short]
- logline: One compelling sentence
- audience_promise: What the viewer will gain
- theme: Core theme (optional)
- primary_cta: Main call-to-action (optional)
- distribution_targets: Array of targets like ["youtube_long", "instagram_reel"]
- deliverables: Array of {type, duration} like [{type: "hero_edit", duration: "8min"}]
- tags: Relevant tags
- beats: Optional array of initial beats with title, narrative_purpose, and estimated_runtime`

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
      max_tokens: 2000
    })

    const content = response.choices[0]?.message?.content
    if (!content) throw new Error('No response from AI')

    const suggestion = JSON.parse(content) as ProjectSuggestion
    
    // Validate required fields
    if (!suggestion.title || !suggestion.type || !suggestion.logline || !suggestion.audience_promise) {
      throw new Error('AI response missing required fields')
    }

    return suggestion
  } catch (error) {
    console.error('Error getting AI suggestions:', error)
    throw error
  }
}