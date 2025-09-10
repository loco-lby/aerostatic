'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Film, 
  TrendingUp, 
  Eye, 
  Download, 
  DollarSign,
  Calendar,
  ArrowRight,
  Sparkles,
  Search,
  Filter,
  LogOut,
  Package,
  Rocket,
  Grid,
  List,
  Trash2,
  MoreVertical
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

interface UnifiedStoriesDashboardProps {
  projects: any[]
  analytics: Array<{
    projectId: string
    views: number
    downloads: number
    revenue: number
  }>
  totalStats: {
    totalProjects: number
    totalViews: number
    totalDownloads: number
    totalRevenue: number
    activeProjects: number
    publishedProjects: number
  }
  legacyPackages: any[]
}

export function UnifiedStoriesDashboard({ 
  projects, 
  analytics, 
  totalStats,
  legacyPackages 
}: UnifiedStoriesDashboardProps) {
  const router = useRouter()
  const supabase = createClient()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'active' | 'published' | 'draft'>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isCreating, setIsCreating] = useState(false)
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)
  const [projectsList, setProjectsList] = useState(projects)
  const [newProjectData, setNewProjectData] = useState({
    title: '',
    type: 'aloft_day' as const,
    logline: ''
  })

  const projectTypes = [
    { id: 'aloft_day', label: 'Aloft Day', icon: '🎈', color: 'from-sky-500 to-blue-600' },
    { id: 'documentary_episode', label: 'Documentary', icon: '🎬', color: 'from-purple-500 to-indigo-600' },
    { id: 'commercial_client', label: 'Commercial', icon: '💼', color: 'from-orange-500 to-red-600' },
    { id: 'social_short', label: 'Social Short', icon: '📱', color: 'from-pink-500 to-rose-600' }
  ]

  const filteredProjects = projectsList.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.logline?.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = filterType === 'all' ||
                         (filterType === 'active' && project.current_stage !== 'track') ||
                         (filterType === 'published' && project.client_packages?.length > 0) ||
                         (filterType === 'draft' && project.current_stage === 'plan')
    
    return matchesSearch && matchesFilter
  })

  const createProject = async () => {
    if (!newProjectData.title) return
    
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert({
          title: newProjectData.title,
          type: newProjectData.type,
          logline: newProjectData.logline || `A ${newProjectData.type.replace('_', ' ')} project`,
          audience_promise: 'Engaging content that captures the moment',
          status: 'planning',
          priority: 'medium',
          current_stage: 'plan',
          canvas_state: {},
          workspace_state: {}
        })
        .select()
        .single()
      
      if (error) throw error
      
      router.push(`/tools/aeromedia/admin/project/${data.id}`)
      toast.success('Story created! Opening canvas...')
    } catch (error) {
      console.error('Failed to create project:', error)
      toast.error('Failed to create story')
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/tools/aeromedia')
  }

  const handleDeleteProject = async (projectId: string) => {
    setIsDeletingId(projectId)
    try {
      // Delete all related data in order
      // 1. Delete media library entries
      await supabase
        .from('media_library')
        .delete()
        .eq('project_id', projectId)
      
      // 2. Delete deliverables
      await supabase
        .from('deliverables')
        .delete()
        .eq('project_id', projectId)
      
      // 3. Delete client packages
      await supabase
        .from('client_packages')
        .delete()
        .eq('project_id', projectId)
      
      // 4. Delete beats
      await supabase
        .from('beats')
        .delete()
        .eq('project_id', projectId)
      
      // 5. Delete workspace layouts
      await supabase
        .from('workspace_layouts')
        .delete()
        .eq('project_id', projectId)
      
      // 6. Finally delete the project
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId)
      
      if (error) throw error
      
      // Update local state
      setProjectsList(prev => prev.filter(p => p.id !== projectId))
      setShowDeleteConfirm(null)
      toast.success('Story deleted successfully')
    } catch (error) {
      console.error('Failed to delete project:', error)
      toast.error('Failed to delete story')
    } finally {
      setIsDeletingId(null)
    }
  }

  const getStageProgress = (stage: string) => {
    const stages = ['plan', 'capture', 'build', 'deliver', 'track']
    const index = stages.indexOf(stage)
    return ((index + 1) / stages.length) * 100
  }

  const getStageLabel = (stage: string) => {
    const labels: Record<string, string> = {
      plan: 'Planning',
      capture: 'Capturing',
      build: 'Building',
      deliver: 'Ready',
      track: 'Live'
    }
    return labels[stage] || stage
  }

  const getStageColor = (stage: string) => {
    const colors: Record<string, string> = {
      plan: 'bg-blue-500',
      capture: 'bg-yellow-500',
      build: 'bg-purple-500',
      deliver: 'bg-green-500',
      track: 'bg-emerald-500'
    }
    return colors[stage] || 'bg-gray-500'
  }

  const StoryCard = ({ project }: { project: any }) => {
    const stats = analytics.find(a => a.projectId === project.id)
    const hasPackage = project.client_packages?.length > 0
    const progress = getStageProgress(project.current_stage || 'plan')
    const projectType = projectTypes.find(t => t.id === project.type)
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02, y: -5 }}
        className="bg-gray-900 rounded-xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl transition-all"
        onClick={() => router.push(`/tools/aeromedia/admin/project/${project.id}`)}
      >
        {/* Thumbnail with gradient */}
        <div className={`aspect-video bg-gradient-to-br ${projectType?.color || 'from-gray-800 to-gray-950'} relative`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl opacity-30">{projectType?.icon}</div>
          </div>
          
          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
            <motion.div
              className="h-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          
          {/* Status badge and delete button */}
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <span className={`px-3 py-1 ${getStageColor(project.current_stage)} text-white rounded-full text-xs font-medium shadow-lg`}>
              {getStageLabel(project.current_stage)}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowDeleteConfirm(project.id)
              }}
              className="p-2 bg-black/60 backdrop-blur-sm hover:bg-red-600/80 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
            >
              <Trash2 className="w-4 h-4 text-white" />
            </button>
          </div>
          
          {/* Quick stats overlay */}
          {stats && (stats.views > 0 || stats.downloads > 0) && (
            <div className="absolute bottom-3 left-3 flex items-center gap-3 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1.5">
              {stats.views > 0 && (
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3 text-white/70" />
                  <span className="text-xs text-white/90">{stats.views}</span>
                </div>
              )}
              {stats.downloads > 0 && (
                <div className="flex items-center gap-1">
                  <Download className="w-3 h-3 text-white/70" />
                  <span className="text-xs text-white/90">{stats.downloads}</span>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="font-semibold text-white text-lg group-hover:text-orange-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {projectType?.label} • {new Date(project.updated_at).toLocaleDateString()}
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-orange-400 transition-all transform group-hover:translate-x-1" />
          </div>
          
          {project.logline && (
            <p className="text-sm text-gray-400 line-clamp-2 mb-3">
              {project.logline}
            </p>
          )}
          
          {/* Action buttons */}
          <div className="flex gap-2">
            <motion.button
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium text-white transition-all ${
                hasPackage 
                  ? 'bg-green-600 hover:bg-green-500' 
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.stopPropagation()
                router.push(`/tools/aeromedia/admin/project/${project.id}`)
              }}
            >
              {hasPackage ? 'View & Edit' : 'Continue Story'} →
            </motion.button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 border-b border-gray-800 px-6 py-5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Rocket className="w-8 h-8 text-orange-500" />
                <h1 className="text-3xl font-bold text-white">Aeromedia Stories</h1>
              </div>
              <p className="text-sm text-gray-400">Create, build, and deliver visual stories that soar</p>
            </div>
            
            <div className="flex items-center gap-3">
              <motion.button
                onClick={() => setIsCreating(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-lg text-white font-medium shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-4 h-4" />
                New Story
              </motion.button>
              
              <button
                onClick={handleLogout}
                className="p-2.5 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Filters & Search */}
      <div className="bg-gray-950 border-b border-gray-800 px-6 py-4 sticky top-0 z-30 backdrop-blur-xl bg-gray-950/90">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          {/* Search */}
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 bg-gray-900 text-white rounded-lg text-sm border border-gray-800 focus:border-orange-500 focus:outline-none transition-colors"
            />
          </div>
          
          {/* Filter buttons */}
          <div className="flex items-center gap-2">
            {(['all', 'active', 'published', 'draft'] as const).map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all
                  ${filterType === type
                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                    : 'bg-gray-900 text-gray-400 hover:text-gray-200 border border-gray-800'
                  }
                `}
              >
                {type}
              </button>
            ))}
          </div>
          
          {/* View mode toggle */}
          <div className="flex items-center gap-1 bg-gray-900 rounded-lg p-1 border border-gray-800">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'grid' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'list' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-600/20 to-blue-700/10 border border-blue-500/30 rounded-xl p-4">
            <Film className="w-5 h-5 text-blue-400 mb-2" />
            <p className="text-2xl font-bold text-white">{totalStats.totalProjects}</p>
            <p className="text-xs text-blue-400">Total Stories</p>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-700/10 border border-yellow-500/30 rounded-xl p-4">
            <Sparkles className="w-5 h-5 text-yellow-400 mb-2" />
            <p className="text-2xl font-bold text-white">{totalStats.activeProjects}</p>
            <p className="text-xs text-yellow-400">In Progress</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-600/20 to-green-700/10 border border-green-500/30 rounded-xl p-4">
            <Package className="w-5 h-5 text-green-400 mb-2" />
            <p className="text-2xl font-bold text-white">{totalStats.publishedProjects}</p>
            <p className="text-xs text-green-400">Published</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-600/20 to-purple-700/10 border border-purple-500/30 rounded-xl p-4">
            <Eye className="w-5 h-5 text-purple-400 mb-2" />
            <p className="text-2xl font-bold text-white">{totalStats.totalViews.toLocaleString()}</p>
            <p className="text-xs text-purple-400">Total Views</p>
          </div>
          
          <div className="bg-gradient-to-br from-cyan-600/20 to-cyan-700/10 border border-cyan-500/30 rounded-xl p-4">
            <Download className="w-5 h-5 text-cyan-400 mb-2" />
            <p className="text-2xl font-bold text-white">{totalStats.totalDownloads.toLocaleString()}</p>
            <p className="text-xs text-cyan-400">Downloads</p>
          </div>
          
          <div className="bg-gradient-to-br from-orange-600/20 to-orange-700/10 border border-orange-500/30 rounded-xl p-4">
            <DollarSign className="w-5 h-5 text-orange-400 mb-2" />
            <p className="text-2xl font-bold text-white">${totalStats.totalRevenue.toFixed(0)}</p>
            <p className="text-xs text-orange-400">Revenue</p>
          </div>
        </div>

        {/* Projects Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredProjects.map(project => (
                <StoryCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {filteredProjects.map(project => {
                const stats = analytics.find(a => a.projectId === project.id)
                const projectType = projectTypes.find(t => t.id === project.type)
                
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gray-900 rounded-lg p-4 hover:bg-gray-850 transition-colors cursor-pointer"
                    onClick={() => router.push(`/tools/aeromedia/admin/project/${project.id}`)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl">{projectType?.icon}</div>
                        <div>
                          <h3 className="font-semibold text-white">{project.title}</h3>
                          <p className="text-sm text-gray-400">{project.logline}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-4 text-sm">
                          {stats && (
                            <>
                              <span className="text-gray-400">{stats.views} views</span>
                              <span className="text-gray-400">{stats.downloads} downloads</span>
                            </>
                          )}
                        </div>
                        <span className={`px-3 py-1 ${getStageColor(project.current_stage)} text-white rounded-full text-xs font-medium`}>
                          {getStageLabel(project.current_stage)}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setShowDeleteConfirm(project.id)
                          }}
                          className="p-2 hover:bg-red-600/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
                        </button>
                        <ArrowRight className="w-5 h-5 text-gray-600" />
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <Film className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <p className="text-xl text-gray-400 mb-2">No stories found</p>
            <p className="text-sm text-gray-500 mb-6">Start creating your first visual story</p>
            <button
              onClick={() => setIsCreating(true)}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-lg text-white font-medium shadow-lg hover:shadow-xl transition-all"
            >
              Create Your First Story
            </button>
          </div>
        )}

        {/* Legacy packages notice */}
        {legacyPackages.length > 0 && (
          <div className="mt-12 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <p className="text-sm text-yellow-400">
              You have {legacyPackages.length} legacy packages. These will be migrated to stories soon.
            </p>
          </div>
        )}
      </div>

      {/* Create Story Modal */}
      <AnimatePresence>
        {isCreating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsCreating(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-xl p-6 w-full max-w-lg shadow-2xl border border-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Create New Story</h2>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Story Title</label>
                  <input
                    type="text"
                    value={newProjectData.title}
                    onChange={(e) => setNewProjectData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter your story title..."
                    className="w-full bg-gray-950 text-white px-4 py-3 rounded-lg border border-gray-800 focus:border-orange-500 focus:outline-none transition-colors"
                    autoFocus
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Story Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {projectTypes.map(type => (
                      <button
                        key={type.id}
                        onClick={() => setNewProjectData(prev => ({ ...prev, type: type.id as any }))}
                        className={`
                          p-4 rounded-lg text-sm transition-all border-2
                          ${newProjectData.type === type.id
                            ? 'bg-gradient-to-br ' + type.color + ' text-white border-transparent shadow-lg'
                            : 'bg-gray-800 text-gray-400 hover:text-gray-200 border-gray-700 hover:border-gray-600'
                          }
                        `}
                      >
                        <span className="text-2xl mb-2 block">{type.icon}</span>
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Logline (optional)</label>
                  <textarea
                    value={newProjectData.logline}
                    onChange={(e) => setNewProjectData(prev => ({ ...prev, logline: e.target.value }))}
                    placeholder="One sentence that captures your story..."
                    className="w-full bg-gray-950 text-white px-4 py-3 rounded-lg resize-none border border-gray-800 focus:border-orange-500 focus:outline-none transition-colors"
                    rows={2}
                  />
                </div>
                
                <div className="flex gap-3 pt-3">
                  <button
                    onClick={() => setIsCreating(false)}
                    className="flex-1 px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-400 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={createProject}
                    disabled={!newProjectData.title}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-700 disabled:to-gray-700 disabled:text-gray-500 rounded-lg text-white font-medium transition-all shadow-lg hover:shadow-xl"
                  >
                    Open Canvas →
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => !isDeletingId && setShowDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-xl p-6 w-full max-w-md shadow-2xl border border-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-red-500/20 rounded-lg">
                  <Trash2 className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Delete Story</h2>
                  <p className="text-sm text-gray-400">This action cannot be undone</p>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-300 mb-3">
                  Are you sure you want to delete <span className="font-semibold text-white">
                    {projectsList.find(p => p.id === showDeleteConfirm)?.title}
                  </span>?
                </p>
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                  <p className="text-sm text-red-400">This will permanently delete:</p>
                  <ul className="text-sm text-red-400/80 mt-2 space-y-1">
                    <li>• All beats and timeline data</li>
                    <li>• All deliverables and packages</li>
                    <li>• All media references</li>
                    <li>• All analytics data</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  disabled={isDeletingId === showDeleteConfirm}
                  className="flex-1 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-800 disabled:opacity-50 rounded-lg text-gray-400 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteProject(showDeleteConfirm)}
                  disabled={isDeletingId === showDeleteConfirm}
                  className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-red-600 disabled:opacity-50 rounded-lg text-white font-medium transition-all flex items-center justify-center gap-2"
                >
                  {isDeletingId === showDeleteConfirm ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Deleting...
                    </>
                  ) : (
                    <>Delete Story</>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}