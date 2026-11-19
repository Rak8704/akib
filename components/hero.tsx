'use client'

import { useEffect, useState } from 'react'
import { Mail, Linkedin, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DEFAULT_DATA, getPortfolioData } from '@/lib/portfolio-data'

export default function Hero() {
  const [data, setData] = useState({
    name: DEFAULT_DATA.personal.name,
    title: DEFAULT_DATA.personal.title,
    bio: DEFAULT_DATA.personal.bio,
    email: DEFAULT_DATA.contact.email,
    phone: DEFAULT_DATA.contact.phone,
    github: DEFAULT_DATA.contact.github,
    linkedin: DEFAULT_DATA.contact.linkedin
  })

  useEffect(() => {
    const portfolioData = getPortfolioData()
    setData({
      name: portfolioData.personal.name,
      title: portfolioData.personal.title,
      bio: portfolioData.personal.bio,
      email: portfolioData.contact.email,
      phone: portfolioData.contact.phone,
      github: portfolioData.contact.github,
      linkedin: portfolioData.contact.linkedin
    })
  }, [])

  return (
    <section className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-[1fr_1fr] gap-8 md:gap-12 items-center">
          {/* Left column */}
          <div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 text-balance">
              {data.name}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4 text-balance">
              {data.title}
            </p>
            <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed">
              {data.bio}
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-4 flex-wrap">
              <a href="#contact">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Get In Touch
                </Button>
              </a>
              <a href={`mailto:${data.email}`}>
                <Button size="lg" variant="outline">
                  Email Me
                </Button>
              </a>
            </div>

            {/* Social links */}
            <div className="flex gap-4 mt-8">
              {data.github && (
                <a
                  href={data.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                >
                  <Github size={20} />
                </a>
              )}
              {data.linkedin && (
                <a
                  href={data.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                >
                  <Linkedin size={20} />
                </a>
              )}
              {data.phone && (
                <a
                  href={`tel:${data.phone}`}
                  className="p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                >
                  <Mail size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Right column - decorative */}
          <div className="hidden md:block relative h-80">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent rounded-2xl"></div>
            <div className="absolute top-10 right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-accent/5 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
