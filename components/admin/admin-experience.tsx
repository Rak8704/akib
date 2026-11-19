'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { getPortfolioData, savePortfolioData } from '@/lib/portfolio-data'
import { Check, Plus, Trash2 } from 'lucide-react'

interface Experience {
  company: string
  position: string
  duration: string
  responsibilities: string[]
}

export default function AdminExperience() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const data = getPortfolioData()
    setExperiences(data.experience)
  }, [])

  const updateExperience = (index: number, field: keyof Experience, value: any) => {
    setExperiences(prev => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }

  const updateResponsibility = (expIndex: number, respIndex: number, value: string) => {
    setExperiences(prev => {
      const updated = [...prev]
      updated[expIndex].responsibilities[respIndex] = value
      return updated
    })
  }

  const addResponsibility = (expIndex: number) => {
    setExperiences(prev => {
      const updated = [...prev]
      updated[expIndex].responsibilities.push('')
      return updated
    })
  }

  const removeResponsibility = (expIndex: number, respIndex: number) => {
    setExperiences(prev => {
      const updated = [...prev]
      updated[expIndex].responsibilities.splice(respIndex, 1)
      return updated
    })
  }

  const addExperience = () => {
    setExperiences(prev => [...prev, {
      company: '',
      position: '',
      duration: '',
      responsibilities: ['']
    }])
  }

  const removeExperience = (index: number) => {
    setExperiences(prev => prev.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    const data = getPortfolioData()
    data.experience = experiences
    savePortfolioData(data)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Experience Management</h2>
        <p className="text-muted-foreground">Add and manage your work experience</p>
      </div>

      <div className="space-y-6">
        {experiences.map((exp, expIndex) => (
          <div key={expIndex} className="bg-card border border-border rounded-lg p-6 space-y-4">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-foreground">Experience {expIndex + 1}</h3>
              <Button
                onClick={() => removeExperience(expIndex)}
                variant="outline"
                size="sm"
              >
                <Trash2 size={16} />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Company</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateExperience(expIndex, 'company', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Position</label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => updateExperience(expIndex, 'position', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Duration</label>
              <input
                type="text"
                value={exp.duration}
                onChange={(e) => updateExperience(expIndex, 'duration', e.target.value)}
                placeholder="e.g., 2023 - Present"
                className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Responsibilities</label>
              <div className="space-y-2">
                {exp.responsibilities.map((resp, respIndex) => (
                  <div key={respIndex} className="flex gap-2">
                    <textarea
                      value={resp}
                      onChange={(e) => updateResponsibility(expIndex, respIndex, e.target.value)}
                      placeholder="Enter responsibility"
                      rows={2}
                      className="flex-1 px-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                    />
                    <Button
                      onClick={() => removeResponsibility(expIndex, respIndex)}
                      variant="outline"
                      size="sm"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                ))}
                <Button
                  onClick={() => addResponsibility(expIndex)}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <Plus size={16} className="mr-2" />
                  Add Responsibility
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Button onClick={addExperience} variant="outline" className="flex items-center gap-2">
          <Plus size={16} />
          Add Experience
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
