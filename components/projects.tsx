'use client'

import { useEffect, useState } from 'react'
import { ExternalLink, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getPortfolioData } from '@/lib/portfolio-data'

interface Project {
  name: string
  description: string
  technologies: string[]
  features: string[]
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const data = getPortfolioData()
    setProjects(data.projects)
  }, [])

  return (
    <section id="projects" className="border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-[300px_1fr] gap-12 md:gap-16">
          {/* Left sidebar */}
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">Projects</h2>
            <div className="w-16 h-1 bg-accent rounded"></div>
          </div>

          {/* Main content */}
          <div className="space-y-12">
            {projects.map((project) => (
              <div
                key={project.name}
                className="group border border-border rounded-lg p-6 hover:border-accent transition-colors"
              >
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {project.name}
                </h3>

                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1 rounded-full bg-secondary text-muted-foreground border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-foreground mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex gap-3">
                        <span className="text-accent">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
