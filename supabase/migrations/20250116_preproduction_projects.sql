-- Pre-Production Projects Schema
-- Admin-only tool for planning, capturing, and converting stories into deliverables

-- Project types enum
CREATE TYPE project_type AS ENUM (
  'aloft_day',           -- Commercial operation, date-based
  'documentary_episode', -- Terra Scintilla / Life Outside the Box
  'commercial_client',   -- Commercial/Client piece
  'social_short'        -- Social reel/short (fast turn)
);

-- Project priority enum
CREATE TYPE project_priority AS ENUM ('low', 'medium', 'high', 'urgent');

-- Project status enum
CREATE TYPE project_status AS ENUM (
  'planning',    -- Initial planning phase
  'outlining',   -- Building beat structure
  'shooting',    -- Active capture
  'ingesting',   -- Processing raw footage
  'editing',     -- In edit
  'finalizing',  -- Final cut and polish
  'completed',   -- Ready for package creation
  'archived'     -- Archived project
);

-- Beat type enum (for templates)
CREATE TYPE beat_type AS ENUM (
  'hook',            -- Opening hook
  'context',         -- Context/setup
  'inciting_event',  -- Story catalyst
  'plot_point',      -- Major turn
  'pinch',           -- Tension moment
  'midpoint',        -- Midpoint shift
  'climax',          -- Story climax
  'resolution',      -- Resolution
  'button',          -- Closing moment
  'montage',         -- Montage sequence
  'interview',       -- Interview segment
  'b_roll',          -- B-roll sequence
  'transition',      -- Transition beat
  'custom'           -- Custom beat
);

-- Beat effect enum
CREATE TYPE beat_effect AS ENUM (
  'hook',     -- Grab attention
  'turn',     -- Story turn
  'reveal',   -- Information reveal
  'payoff',   -- Setup payoff
  'montage',  -- Montage effect
  'breath'    -- Breathing room
);

-- Beat status enum
CREATE TYPE beat_status AS ENUM (
  'idea',      -- Just an idea
  'outlined',  -- Fully outlined
  'shot',      -- Footage captured
  'ingested',  -- Media ingested
  'edited',    -- Edit complete
  'locked'     -- Final/locked
);

-- Retention tactic enum (can have multiple)
CREATE TYPE retention_tactic AS ENUM (
  'pattern_interrupt',
  'curiosity_gap',
  'misdirection',
  'open_loop',
  'stakes_escalation',
  'humor',
  'novelty_shot',
  'speed_change'
);

-- Emotional tone enum
CREATE TYPE emotional_tone AS ENUM (
  'calm',
  'awe',
  'tension',
  'triumph',
  'humor',
  'mystery',
  'nostalgia',
  'excitement'
);

-- Projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  type project_type NOT NULL,
  status project_status DEFAULT 'planning',
  priority project_priority DEFAULT 'medium',
  
  -- Story essentials
  logline TEXT NOT NULL, -- One-sentence promise
  audience_promise TEXT NOT NULL, -- What viewer gets
  theme TEXT, -- e.g., resilience, wonder
  primary_cta TEXT, -- subscribe, book, merch
  
  -- Planning fields
  date DATE,
  location TEXT,
  owner_id UUID REFERENCES auth.users(id),
  
  -- Distribution targets (stored as JSON array)
  distribution_targets JSONB DEFAULT '[]'::jsonb, -- ["youtube_long", "instagram_reel", "tiktok", "newsletter"]
  
  -- Deliverables list (stored as JSON array)
  deliverables JSONB DEFAULT '[]'::jsonb, -- [{"type": "hero_edit", "duration": "8min"}, {"type": "reel", "count": 3}]
  
  -- Success metrics
  success_metrics JSONB DEFAULT '{}'::jsonb, -- {"retention_target": 50, "shares_target": 100}
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  archived_at TIMESTAMPTZ,
  
  -- Collaborators (array of user IDs)
  collaborators UUID[] DEFAULT ARRAY[]::UUID[],
  
  -- Tags for organization
  tags TEXT[] DEFAULT ARRAY[]::TEXT[]
);

-- Beats table (ordered story units)
CREATE TABLE beats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  
  -- Core fields
  title TEXT NOT NULL,
  beat_type beat_type DEFAULT 'custom',
  effect beat_effect,
  narrative_purpose TEXT, -- Why this beat exists
  status beat_status DEFAULT 'idea',
  position INTEGER NOT NULL, -- Order in project
  estimated_runtime INTEGER, -- Seconds
  dependencies TEXT[], -- Other beat IDs this depends on
  
  -- Content fields
  script_vo TEXT, -- Script/VO in markdown
  onscreen_copy TEXT, -- Lower thirds, captions
  interview_prompts TEXT[], -- Questions to ask
  
  -- Retention tactics (multiple allowed)
  retention_tactics retention_tactic[] DEFAULT ARRAY[]::retention_tactic[],
  
  -- Production notes
  emotional_tone emotional_tone,
  music_cue TEXT, -- Mood description
  sound_ideas TEXT, -- SFX, ambience notes
  transition_idea TEXT, -- Cut type, effects
  
  -- Packaging fields
  thumbnail_concepts TEXT[], -- 2-3 concepts
  title_candidates TEXT[], -- 2-3 options
  seo_keywords TEXT[], -- Keywords/hashtags
  
  -- Assignment
  assigned_to UUID REFERENCES auth.users(id),
  due_date DATE,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Media attachments to beats
CREATE TABLE beat_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  beat_id UUID NOT NULL REFERENCES beats(id) ON DELETE CASCADE,
  
  -- Reference to existing media or new upload
  media_item_id UUID REFERENCES media_items(id) ON DELETE CASCADE,
  file_url TEXT, -- For external/proxy media
  
  -- Actionable notes
  purpose TEXT, -- What this clip proves/evokes
  timecode_start TEXT, -- Best start timecode
  timecode_end TEXT, -- Best end timecode
  people TEXT[], -- Faces/names in clip
  location TEXT,
  rights_notes TEXT, -- Rights/sensitivity
  confidence INTEGER CHECK (confidence >= 1 AND confidence <= 5), -- 1-5 rating
  transcript_snippet TEXT,
  keywords TEXT[],
  
  -- Quick flags
  is_select BOOLEAN DEFAULT false,
  needs_b_roll BOOLEAN DEFAULT false,
  needs_vo BOOLEAN DEFAULT false,
  for_thumbnail BOOLEAN DEFAULT false,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Beat templates
CREATE TABLE beat_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  project_type project_type NOT NULL,
  description TEXT,
  
  -- Template beats stored as JSON
  beats JSONB NOT NULL, -- Array of beat definitions
  
  -- Metadata
  is_default BOOLEAN DEFAULT false, -- Default for project type
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Capture checklists
CREATE TABLE capture_checklists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  
  -- Checklist items stored as JSON
  items JSONB NOT NULL, -- [{item, category, beat_id, completed, notes}]
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Project milestones
CREATE TABLE project_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  
  title TEXT NOT NULL,
  due_date DATE,
  completed_at TIMESTAMPTZ,
  notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_projects_type ON projects(type);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_owner ON projects(owner_id);
CREATE INDEX idx_projects_date ON projects(date);
CREATE INDEX idx_beats_project ON beats(project_id);
CREATE INDEX idx_beats_position ON beats(project_id, position);
CREATE INDEX idx_beats_status ON beats(status);
CREATE INDEX idx_beat_media_beat ON beat_media(beat_id);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE beats ENABLE ROW LEVEL SECURITY;
ALTER TABLE beat_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE beat_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE capture_checklists ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_milestones ENABLE ROW LEVEL SECURITY;

-- RLS Policies (admin only for now)
CREATE POLICY "Admin full access to projects" ON projects
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.email IN (
        'cielo@aerostatic.io',
        'jasper@aerostatic.io'
      )
    )
  );

CREATE POLICY "Admin full access to beats" ON beats
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.email IN (
        'cielo@aerostatic.io',
        'jasper@aerostatic.io'
      )
    )
  );

CREATE POLICY "Admin full access to beat_media" ON beat_media
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.email IN (
        'cielo@aerostatic.io',
        'jasper@aerostatic.io'
      )
    )
  );

CREATE POLICY "Admin full access to beat_templates" ON beat_templates
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.email IN (
        'cielo@aerostatic.io',
        'jasper@aerostatic.io'
      )
    )
  );

CREATE POLICY "Admin full access to capture_checklists" ON capture_checklists
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.email IN (
        'cielo@aerostatic.io',
        'jasper@aerostatic.io'
      )
    )
  );

CREATE POLICY "Admin full access to project_milestones" ON project_milestones
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.email IN (
        'cielo@aerostatic.io',
        'jasper@aerostatic.io'
      )
    )
  );

-- Insert default beat templates
INSERT INTO beat_templates (name, project_type, is_default, beats) VALUES
-- Aloft Day template
('Aloft Day Operations', 'aloft_day', true, '[
  {
    "title": "Cold Open/Hook", 
    "beat_type": "hook",
    "effect": "hook",
    "narrative_purpose": "Spectacle or question that earns the next 30s",
    "retention_tactics": ["pattern_interrupt", "curiosity_gap"],
    "estimated_runtime": 15
  },
  {
    "title": "Crew/Prep",
    "beat_type": "context",
    "narrative_purpose": "Stakes: weather, timing, preparation",
    "retention_tactics": ["stakes_escalation"],
    "estimated_runtime": 45
  },
  {
    "title": "Launch",
    "beat_type": "inciting_event",
    "effect": "reveal",
    "narrative_purpose": "Awe + first reveal",
    "emotional_tone": "awe",
    "estimated_runtime": 60
  },
  {
    "title": "Flight Moments",
    "beat_type": "montage",
    "effect": "montage",
    "narrative_purpose": "Pattern interrupts every 30-45s; show novelty angles",
    "retention_tactics": ["novelty_shot", "pattern_interrupt"],
    "estimated_runtime": 180
  },
  {
    "title": "Landing",
    "beat_type": "climax",
    "effect": "payoff",
    "narrative_purpose": "Surprise, payoff",
    "emotional_tone": "triumph",
    "estimated_runtime": 45
  },
  {
    "title": "Passenger Reactions",
    "beat_type": "resolution",
    "narrative_purpose": "Social proof; 1-2 great lines",
    "emotional_tone": "excitement",
    "estimated_runtime": 30
  },
  {
    "title": "Delivery Plan/CTA",
    "beat_type": "button",
    "narrative_purpose": "How they get media; subtle offer",
    "estimated_runtime": 15
  }
]'::jsonb),

-- Documentary 3-Act template
('Documentary 3-Act Structure', 'documentary_episode', true, '[
  {
    "title": "Hook",
    "beat_type": "hook",
    "effect": "hook",
    "narrative_purpose": "Immediate engagement",
    "retention_tactics": ["curiosity_gap", "pattern_interrupt"],
    "estimated_runtime": 15
  },
  {
    "title": "Inciting Event",
    "beat_type": "inciting_event",
    "narrative_purpose": "The catalyst that starts the story",
    "estimated_runtime": 30
  },
  {
    "title": "First Plot Point",
    "beat_type": "plot_point",
    "effect": "turn",
    "narrative_purpose": "No going back moment",
    "retention_tactics": ["stakes_escalation"],
    "estimated_runtime": 20
  },
  {
    "title": "Promise of Premise",
    "beat_type": "context",
    "narrative_purpose": "Deliver on what the story promised",
    "estimated_runtime": 120
  },
  {
    "title": "Pinch 1",
    "beat_type": "pinch",
    "effect": "turn",
    "narrative_purpose": "First major obstacle",
    "emotional_tone": "tension",
    "retention_tactics": ["stakes_escalation"],
    "estimated_runtime": 30
  },
  {
    "title": "Midpoint Shift",
    "beat_type": "midpoint",
    "effect": "reveal",
    "narrative_purpose": "New info flips stakes",
    "retention_tactics": ["misdirection", "open_loop"],
    "estimated_runtime": 45
  },
  {
    "title": "Pinch 2",
    "beat_type": "pinch",
    "effect": "turn",
    "narrative_purpose": "Second major obstacle",
    "emotional_tone": "tension",
    "retention_tactics": ["stakes_escalation"],
    "estimated_runtime": 30
  },
  {
    "title": "All is Lost",
    "beat_type": "plot_point",
    "narrative_purpose": "Lowest point (if relevant)",
    "emotional_tone": "tension",
    "estimated_runtime": 20
  },
  {
    "title": "Climax",
    "beat_type": "climax",
    "effect": "payoff",
    "narrative_purpose": "Story peak",
    "emotional_tone": "triumph",
    "estimated_runtime": 60
  },
  {
    "title": "Resolution",
    "beat_type": "resolution",
    "narrative_purpose": "Wrap up loose ends",
    "emotional_tone": "calm",
    "estimated_runtime": 45
  },
  {
    "title": "Button",
    "beat_type": "button",
    "effect": "breath",
    "narrative_purpose": "After-taste line",
    "estimated_runtime": 10
  }
]'::jsonb),

-- Social Short template
('Social Short/Reel', 'social_short', true, '[
  {
    "title": "Pattern Interrupt Hook",
    "beat_type": "hook",
    "effect": "hook",
    "narrative_purpose": "0-3s immediate grab",
    "retention_tactics": ["pattern_interrupt"],
    "estimated_runtime": 3
  },
  {
    "title": "Context Line",
    "beat_type": "context",
    "narrative_purpose": "Set up in one line",
    "estimated_runtime": 5
  },
  {
    "title": "Demonstration/Proof",
    "beat_type": "custom",
    "narrative_purpose": "One crystal clear idea",
    "retention_tactics": ["novelty_shot"],
    "estimated_runtime": 15
  },
  {
    "title": "Turn or Reveal",
    "beat_type": "plot_point",
    "effect": "reveal",
    "narrative_purpose": "Unexpected element",
    "retention_tactics": ["misdirection"],
    "estimated_runtime": 5
  },
  {
    "title": "Punchline/Payoff/CTA",
    "beat_type": "button",
    "effect": "payoff",
    "narrative_purpose": "Clear ending with action",
    "estimated_runtime": 2
  }
]'::jsonb);

-- Function to create default checklists
CREATE OR REPLACE FUNCTION generate_capture_checklist(p_project_id UUID)
RETURNS UUID AS $$
DECLARE
  v_project_type project_type;
  v_checklist_id UUID;
  v_items JSONB;
BEGIN
  -- Get project type
  SELECT type INTO v_project_type FROM projects WHERE id = p_project_id;
  
  -- Generate checklist based on type
  CASE v_project_type
    WHEN 'aloft_day' THEN
      v_items := '[
        {"item": "Crew arrival and prep", "category": "Pre-flight", "completed": false},
        {"item": "Weather check documentation", "category": "Pre-flight", "completed": false},
        {"item": "Passenger arrival reactions", "category": "Pre-flight", "completed": false},
        {"item": "Safety briefing", "category": "Pre-flight", "completed": false},
        {"item": "Basket loading", "category": "Pre-flight", "completed": false},
        {"item": "Inflation wide shot", "category": "Launch", "completed": false},
        {"item": "Inflation medium shot", "category": "Launch", "completed": false},
        {"item": "Burner flame details", "category": "Launch", "completed": false},
        {"item": "Fabric ripple slow-mo", "category": "Launch", "completed": false},
        {"item": "Launch master wide", "category": "Launch", "completed": false},
        {"item": "Passenger face closeups", "category": "Flight", "completed": false},
        {"item": "Pilot at work", "category": "Flight", "completed": false},
        {"item": "360 landscape pan", "category": "Flight", "completed": false},
        {"item": "Shadow on ground", "category": "Flight", "completed": false},
        {"item": "Other balloons in air", "category": "Flight", "completed": false},
        {"item": "Landing approach", "category": "Landing", "completed": false},
        {"item": "Touch down moment", "category": "Landing", "completed": false},
        {"item": "Post-flight reactions", "category": "Landing", "completed": false},
        {"item": "Champagne ceremony", "category": "Landing", "completed": false},
        {"item": "Product/brand insert", "category": "B-roll", "completed": false}
      ]'::jsonb;
      
    WHEN 'documentary_episode' THEN
      v_items := '[
        {"item": "Establishing wide of location", "category": "Establishing", "completed": false},
        {"item": "Subject arrival/entrance", "category": "Establishing", "completed": false},
        {"item": "Environment details", "category": "Establishing", "completed": false},
        {"item": "Interview setup A-cam", "category": "Interview", "completed": false},
        {"item": "Interview setup B-cam", "category": "Interview", "completed": false},
        {"item": "Core story questions", "category": "Interview", "completed": false},
        {"item": "Emotional moment questions", "category": "Interview", "completed": false},
        {"item": "Subject doing action", "category": "B-roll", "completed": false},
        {"item": "Hands/detail shots", "category": "B-roll", "completed": false},
        {"item": "Reaction shots", "category": "B-roll", "completed": false},
        {"item": "Cutaway safety shots", "category": "B-roll", "completed": false},
        {"item": "Room tone 30s", "category": "Audio", "completed": false},
        {"item": "Ambient sound", "category": "Audio", "completed": false}
      ]'::jsonb;
      
    ELSE
      v_items := '[]'::jsonb;
  END CASE;
  
  -- Insert checklist
  INSERT INTO capture_checklists (project_id, items)
  VALUES (p_project_id, v_items)
  RETURNING id INTO v_checklist_id;
  
  RETURN v_checklist_id;
END;
$$ LANGUAGE plpgsql;

-- Function to reorder beats
CREATE OR REPLACE FUNCTION reorder_beats(
  p_project_id UUID,
  p_beat_id UUID,
  p_new_position INTEGER
)
RETURNS VOID AS $$
DECLARE
  v_old_position INTEGER;
BEGIN
  -- Get current position
  SELECT position INTO v_old_position
  FROM beats
  WHERE id = p_beat_id AND project_id = p_project_id;
  
  IF v_old_position IS NULL THEN
    RAISE EXCEPTION 'Beat not found';
  END IF;
  
  -- Reorder other beats
  IF p_new_position < v_old_position THEN
    -- Moving up
    UPDATE beats
    SET position = position + 1
    WHERE project_id = p_project_id
      AND position >= p_new_position
      AND position < v_old_position;
  ELSIF p_new_position > v_old_position THEN
    -- Moving down
    UPDATE beats
    SET position = position - 1
    WHERE project_id = p_project_id
      AND position > v_old_position
      AND position <= p_new_position;
  END IF;
  
  -- Update beat position
  UPDATE beats
  SET position = p_new_position,
      updated_at = NOW()
  WHERE id = p_beat_id;
END;
$$ LANGUAGE plpgsql;

-- Function to create package from project
CREATE OR REPLACE FUNCTION create_package_from_project(
  p_project_id UUID,
  p_beat_ids UUID[],
  p_access_code TEXT,
  p_flight_date DATE,
  p_passenger_names TEXT[]
)
RETURNS UUID AS $$
DECLARE
  v_package_id UUID;
  v_beat RECORD;
  v_media RECORD;
BEGIN
  -- Create the media package
  INSERT INTO media_packages (
    access_code,
    flight_date,
    passenger_names,
    expires_at,
    is_active
  )
  VALUES (
    p_access_code,
    p_flight_date,
    p_passenger_names,
    NOW() + INTERVAL '30 days',
    true
  )
  RETURNING id INTO v_package_id;
  
  -- Copy media from selected beats to the package
  FOR v_media IN
    SELECT DISTINCT bm.media_item_id
    FROM beat_media bm
    WHERE bm.beat_id = ANY(p_beat_ids)
      AND bm.media_item_id IS NOT NULL
      AND bm.is_select = true
  LOOP
    -- Link existing media to new package
    UPDATE media_items
    SET package_id = v_package_id
    WHERE id = v_media.media_item_id;
  END LOOP;
  
  RETURN v_package_id;
END;
$$ LANGUAGE plpgsql;