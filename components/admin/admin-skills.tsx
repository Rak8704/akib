'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { getPortfolioData, savePortfolioData } from '@/lib/portfolio-data'
import { Check, Plus, Trash2 } from 'lucide-react'

interface SkillCategory {
  category: string
  skills: string[]
}

export default function AdminSkills() {
  const [categories, setCategories] = useState<SkillCategory[]>([])
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const data = getPortfolioData()
    setCategories(data.skills)
  }, [])

  const updateCategory = (index: number, category: string) => {
    setCategories(prev => {
      const updated = [...prev]
      updated[index] = { ...updated[index], category }
      return updated
    })
  }

  const updateSkill = (catIndex: number, skillIndex: number, value: string) => {
    setCategories(prev => {
      const updated = [...prev]
      updated[catIndex].skills[skillIndex] = value
      return updated
    })
  }

  const addSkill = (catIndex: number) => {
    setCategories(prev => {
      const updated = [...prev]
      updated[catIndex].skills.push('')
      return updated
    })
  }

  const removeSkill = (catIndex: number, skillIndex: number) => {
    setCategories(prev => {
      const updated = [...prev]
      updated[catIndex].skills.splice(skillIndex, 1)
      return updated
    })
  }

  const addCategory = () => {
    setCategories(prev => [...prev, { category: '', skills: [''] }])
  }

  const removeCategory = (index: number) => {
    setCategories(prev => prev.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    const data = getPortfolioData()
    data.skills = categories
    savePortfolioData(data)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Skills Management</h2>
        <p className="text-muted-foreground">Organize your skills by category</p>
      </div>

      <div className="space-y-6">
        {categories.map((cat, catIndex) => (
          <div key={catIndex} className="bg-card border border-border rounded-lg p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <label className="block text-sm font-medium text-foreground mb-2">Category Name</label>
                <input
                  type="text"
                  value={cat.category}
                  onChange={(e) => updateCategory(catIndex, e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                />
              </div>
              <Button
                onClick={() => removeCategory(catIndex)}
                variant="outline"
                size="sm"
                className="ml-4"
              >
                <Trash2 size={16} />
              </Button>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-foreground">Skills</label>
              {cat.skills.map((skill, skillIndex) => (
                <div key={skillIndex} className="flex gap-2">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => updateSkill(catIndex, skillIndex, e.target.value)}
                    placeholder="Enter skill"
                    className="flex-1 px-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                  />
                  <Button
                    onClick={() => removeSkill(catIndex, skillIndex)}
                    variant="outline"
                    size="sm"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
              <Button
                onClick={() => addSkill(catIndex)}
                variant="outline"
                size="sm"
                className="w-full"
              >
                <Plus size={16} className="mr-2" />
                Add Skill
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Button onClick={addCategory} variant="outline" className="flex items-center gap-2">
          <Plus size={16} />
          Add Category
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
