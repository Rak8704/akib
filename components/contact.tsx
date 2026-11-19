'use client'

import { useEffect, useState } from 'react'
import { Mail, Phone, Linkedin, Github, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getPortfolioData } from '@/lib/portfolio-data'

export default function Contact() {
  const [contactData, setContactData] = useState({
    email: 'rakibulis420@gmail.com',
    phone: '+881339710410',
    location: 'Bangladesh',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com'
  })

  useEffect(() => {
    const data = getPortfolioData()
    setContactData(data.contact)
  }, [])

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: contactData.email,
      href: `mailto:${contactData.email}`
    },
    {
      icon: Phone,
      label: 'Phone',
      value: contactData.phone,
      href: `tel:${contactData.phone}`
    },
    {
      icon: MapPin,
      label: 'Location',
      value: contactData.location,
      href: '#'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'GitHub',
      href: contactData.github
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'LinkedIn',
      href: contactData.linkedin
    }
  ]

  return (
    <section id="contact" className="border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-[300px_1fr] gap-12 md:gap-16">
          {/* Left sidebar */}
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">Contact</h2>
            <div className="w-16 h-1 bg-accent rounded"></div>
          </div>

          {/* Main content */}
          <div className="space-y-8">
            <div>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                I'm always interested in hearing about new opportunities and projects. 
                Feel free to reach out if you'd like to collaborate or just have a chat!
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                {contactMethods.map((method) => {
                  const Icon = method.icon
                  return (
                    <a
                      key={method.label}
                      href={method.href}
                      target={method.href.startsWith('http') ? '_blank' : undefined}
                      rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="group border border-border rounded-lg p-6 hover:border-accent hover:bg-secondary/30 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-secondary group-hover:bg-accent/10 transition-colors">
                          <Icon size={24} className="text-accent" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{method.label}</p>
                          <p className="text-foreground font-medium">{method.value}</p>
                        </div>
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Direct CTA */}
            <div className="bg-secondary/30 border border-border rounded-lg p-8 text-center">
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Let's Work Together
              </h3>
              <p className="text-muted-foreground mb-6">
                Have a project in mind or just want to chat about development? 
                Get in touch - I'd love to hear from you.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <a href={`mailto:${contactData.email}`}>
                  <Button className="bg-primary hover:bg-primary/90">
                    Send Email
                  </Button>
                </a>
                <a href={`tel:${contactData.phone}`}>
                  <Button variant="outline">
                    Call Me
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
