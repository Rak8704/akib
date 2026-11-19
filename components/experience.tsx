'use client'

import { useEffect, useState } from 'react'
import { getPortfolioData } from '@/lib/portfolio-data'

interface ExperienceItem {
  company: string
  position: string
  duration: string
  responsibilities: string[]
}

export default function Experience() {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([])

  useEffect(() => {
    const data = getPortfolioData()
    setExperiences(data.experience)
  }, [])

  return (
    <section id="experience" className="border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-[300px_1fr] gap-12 md:gap-16">
          {/* Left sidebar */}
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">Experience</h2>
            <div className="w-16 h-1 bg-accent rounded"></div>
          </div>

          {/* Main content */}
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="border-l-2 border-accent pl-6 pb-8">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {exp.position}
                    </h3>
                    <p className="text-muted-foreground">{exp.company}</p>
                  </div>
                  <span className="text-sm text-muted-foreground whitespace-nowrap">
                    {exp.duration}
                  </span>
                </div>

                {exp.responsibilities.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <h4 className="text-sm font-semibold text-foreground">Key Responsibilities:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {exp.responsibilities.map((resp, respIdx) => (
                        <li key={respIdx} className="flex gap-3">
                          <span className="text-accent">•</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
