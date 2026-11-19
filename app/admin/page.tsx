'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle, LogOut } from 'lucide-react'
import AdminPersonal from '@/components/admin/admin-personal'
import AdminSkills from '@/components/admin/admin-skills'
import AdminProjects from '@/components/admin/admin-projects'
import AdminExperience from '@/components/admin/admin-experience'
import AdminContact from '@/components/admin/admin-contact'

type Tab = 'personal' | 'skills' | 'projects' | 'experience' | 'contact'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [activeTab, setActiveTab] = useState<Tab>('personal')
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    // Check if user is already authenticated in this session
    const isAuth = sessionStorage.getItem('adminAuth') === 'true'
    setIsAuthenticated(isAuth)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple password check - change this to your desired password
    if (password === 'rakib1230') {
      setIsAuthenticated(true)
      sessionStorage.setItem('adminAuth', 'true')
      setPassword('')
    } else {
      alert('Invalid password')
      setPassword('')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('adminAuth')
    setPassword('')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Admin Panel</h1>
              <p className="text-muted-foreground">Enter password to access portfolio management</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="mt-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? 'Hide' : 'Show'} password
                </button>
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Login
              </Button>
            </form>

            <div className="bg-secondary border border-border rounded p-4 flex gap-3">
              <AlertCircle size={20} className="text-muted-foreground flex-shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">
                Default password: <span className="font-mono bg-background px-2 py-1 rounded">admin123</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Portfolio Admin</h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="sticky top-24 space-y-2 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible">
              {[
                { id: 'personal' as Tab, label: 'Personal Info' },
                { id: 'skills' as Tab, label: 'Skills' },
                { id: 'projects' as Tab, label: 'Projects' },
                { id: 'experience' as Tab, label: 'Experience' },
                { id: 'contact' as Tab, label: 'Contact' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap lg:whitespace-normal ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'personal' && <AdminPersonal />}
            {activeTab === 'skills' && <AdminSkills />}
            {activeTab === 'projects' && <AdminProjects />}
            {activeTab === 'experience' && <AdminExperience />}
            {activeTab === 'contact' && <AdminContact />}
          </div>
        </div>
      </div>
    </div>
  )
}
