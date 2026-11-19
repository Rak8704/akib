'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { getPortfolioData, savePortfolioData } from '@/lib/portfolio-data'
import { Check, Plus, Trash2 } from 'lucide-react'

interface Project {
  name: string
  description: string
  technologies: string[]
  features: string[]
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const data = getPortfolioData()
    setProjects(data.projects)
  }, [])

  const updateProject = (index: number, field: keyof Project, value: any) => {
    setProjects(prev => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }

  const updateTechnology = (projIndex: number, techIndex: number, value: string) => {
    setProjects(prev => {
      const updated = [...prev]
      updated[projIndex].technologies[techIndex] = value
      return updated
    })
  }

  const addTechnology = (projIndex: number) => {
    setProjects(prev => {
      const updated = [...prev]
      updated[projIndex].technologies.push('')
      return updated
    })
  }

  const removeTechnology = (projIndex: number, techIndex: number) => {
    setProjects(prev => {
      const updated = [...prev]
      updated[projIndex].technologies.splice(techIndex, 1)
      return updated
    })
  }

  const updateFeature = (projIndex: number, featureIndex: number, value: string) => {
    setProjects(prev => {
      const updated = [...prev]
      updated[projIndex].features[featureIndex] = value
      return updated
    })
  }

  const addFeature = (projIndex: number) => {
    setProjects(prev => {
      const updated = [...prev]
      updated[projIndex].features.push('')
      return updated
    })
  }

  const removeFeature = (projIndex: number, featureIndex: number) => {
    setProjects(prev => {
      const updated = [...prev]
      updated[projIndex].features.splice(featureIndex, 1)
      return updated
    })
  }

  const addProject = () => {
    setProjects(prev => [...prev, {
      name: '',
      description: '',
      technologies: [''],
      features: ['']
    }])
  }

  const removeProject = (index: number) => {
    setProjects(prev => prev.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    const data = getPortfolioData()
    data.projects = projects
    savePortfolioData(data)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Projects Management</h2>
        <p className="text-muted-foreground">Add and manage your portfolio projects</p>
      </div>

      <div className="space-y-6">
        {projects.map((project, projIndex) => (
          <div key={projIndex} className="bg-card border border-border rounded-lg p-6 space-y-4">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-foreground">Project {projIndex + 1}</h3>
              <Button
                onClick={() => removeProject(projIndex)}
                variant="outline"
                size="sm"
              >
                <Trash2 size={16} />
              </Button>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Project Name</label>
              <input
                type="text"
                value={project.name}
                onChange={(e) => updateProject(projIndex, 'name', e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Description</label>
              <textarea
                value={project.description}
                onChange={(e) => updateProject(projIndex, 'description', e.target.value)}
                rows={4}
                className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Technologies</label>
              <div className="space-y-2">
                {project.technologies.map((tech, techIndex) => (
                  <div key={techIndex} className="flex gap-2">
                    <input
                      type="text"
                      value={tech}
                      onChange={(e) => updateTechnology(projIndex, techIndex, e.target.value)}
                      placeholder="e.g., React, Node.js"
                      className="flex-1 px-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                    />
                    <Button
                      onClick={() => removeTechnology(projIndex, techIndex)}
                      variant="outline"
                      size="sm"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                ))}
                <Button
                  onClick={() => addTechnology(projIndex)}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <Plus size={16} className="mr-2" />
                  Add Technology
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Key Features</label>
              <div className="space-y-2">
                {project.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex gap-2">
                    <textarea
                      value={feature}
                      onChange={(e) => updateFeature(projIndex, featureIndex, e.target.value)}
                      placeholder="Enter feature description"
                      rows={2}
                      className="flex-1 px-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                    />
                    <Button
                      onClick={() => removeFeature(projIndex, featureIndex)}
                      variant="outline"
                      size="sm"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                ))}
                <Button
                  onClick={() => addFeature(projIndex)}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <Plus size={16} className="mr-2" />
                  Add Feature
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Button onClick={addProject} variant="outline" className="flex items-center gap-2">
          <Plus size={16} />
          Add Project
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <Button onClick={handleSave} className="bg-accent hover:bg-accent/90">
          Save Changes
        </Button>
        {saved && (
          <div className="flex items-center gap-2 text-green-400">
            <Check size={16} />
            <span className="text-sm">Saved successfully</span>
          </div>
        )}
      </div>
    </div>
  )
}
