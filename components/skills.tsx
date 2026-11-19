'use client'

import { useEffect, useState } from 'react'
import { getPortfolioData } from '@/lib/portfolio-data'

interface SkillCategory {
  category: string
  skills: string[]
}

export default function Skills() {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([])

  useEffect(() => {
    const data = getPortfolioData()
    setSkillCategories(data.skills)
  }, [])

  return (
    <section id="skills" className="border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-[300px_1fr] gap-12 md:gap-16">
          {/* Left sidebar */}
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">Skills</h2>
            <div className="w-16 h-1 bg-accent rounded"></div>
          </div>

          {/* Main content */}
          <div className="space-y-12">
            {skillCategories.map((category) => (
              <div key={category.category}>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 rounded-lg bg-secondary text-muted-foreground border border-border hover:border-accent transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* Soft Skills */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Soft Skills
              </h3>
              <div className="flex flex-wrap gap-3">
                {['Communication', 'Teamwork', 'Problem-solving', 'Leadership'].map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-lg bg-secondary text-muted-foreground border border-border hover:border-accent transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
