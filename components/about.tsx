'use client'

import { useEffect, useState } from 'react'
import { getPortfolioData } from '@/lib/portfolio-data'

export default function About() {
  const [data, setData] = useState({
    bio: '',
    education: '',
  })

  useEffect(() => {
    const portfolioData = getPortfolioData()
    setData({
      bio: portfolioData.personal.bio,
      education: portfolioData.personal.education,
    })
  }, [])

  return (
    <section id="about" className="border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-[300px_1fr] gap-12 md:gap-16">
          {/* Left sidebar */}
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">About</h2>
            <div className="w-16 h-1 bg-accent rounded"></div>
          </div>

          {/* Main content */}
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {data.bio}
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Currently, I focus on building responsive web applications using modern technologies 
              like React, Node.js, and various databases. I believe in writing clean, maintainable 
              code and staying updated with industry best practices.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              When I'm not coding, I enjoy exploring new technologies, contributing to open-source 
              projects, and sharing knowledge with the developer community.
            </p>

            <div className="pt-4 space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Education</h3>
                <p className="text-muted-foreground">
                  {data.education}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Languages</h3>
                <div className="flex gap-2 flex-wrap">
                  {['English', 'Bangla', 'Hindi'].map((lang) => (
                    <span
                      key={lang}
                      className="px-3 py-1 rounded-full bg-secondary text-sm text-muted-foreground"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
