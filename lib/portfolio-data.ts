// Default portfolio data structure
export interface PortfolioData {
  personal: {
    name: string
    title: string
    email: string
    phone: string
    location: string
    bio: string
    education: string
  }
  skills: {
    category: string
    skills: string[]
  }[]
  projects: {
    name: string
    description: string
    technologies: string[]
    features: string[]
  }[]
  experience: {
    company: string
    position: string
    duration: string
    responsibilities: string[]
  }[]
  contact: {
    email: string
    phone: string
    location: string
    github: string
    linkedin: string
  }
}

export const DEFAULT_DATA: PortfolioData = {
  personal: {
    name: 'Akib Chowdhury',
    title: 'Full Stack Developer',
    email: 'rakibulis420@gmail.com',
    phone: '+881339710410',
    location: 'Bangladesh',
    bio: 'BSc in Computer Science & Engineering from Daffodil International University. Building web applications with modern technologies and clean code practices.',
    education: 'BSc in Computer Science & Engineering - Daffodil International University'
  },
  skills: [
    {
      category: 'Programming Languages',
      skills: ['C', 'C++', 'Java', 'Python', 'JavaScript', 'PHP']
    },
    {
      category: 'Web Technologies',
      skills: ['HTML', 'CSS', 'React', 'Node.js', 'Express', 'REST API']
    },
    {
      category: 'Databases',
      skills: ['MySQL', 'PostgreSQL', 'MongoDB']
    },
    {
      category: 'Tools & Platforms',
      skills: ['Git', 'Docker', 'Linux', 'VS Code', 'GitHub']
    },
    {
      category: 'Core Concepts',
      skills: ['Data Structures', 'Algorithms', 'OOP', 'System Design']
    }
  ],
  projects: [
    {
      name: 'Blood Donation App',
      description:
        'A digital platform designed to connect blood donors with patients and hospitals in need. The app allows users to register as donors, search for blood by type and location, and receive real-time notifications about urgent donation requests.',
      technologies: ['Java', 'Database', 'Mobile-First'],
      features: [
        'Quick access to blood - Connects patients with nearby donors instantly',
        'Location-based search - Find donors and blood banks based on area',
        'Emergency notifications - Urgent alerts to eligible donors',
        'Easy appointment scheduling - Book donation slots online',
        'Donor record management - Stores donation history and eligibility',
        'Secure data handling - Proper authentication and data protection'
      ]
    },
    {
      name: 'Smart Library App',
      description:
        'A digital platform that helps students and readers easily search, borrow, return, and manage books online. It connects users with a library database and simplifies traditional library processes using technology.',
      technologies: ['Java', 'Database', 'Admin Dashboard'],
      features: [
        'Book search & filter - Search by title, author, or category',
        'Online book reservation - Reserve books in advance',
        'Due date reminders - Notifications before return deadlines',
        'User account management - Track borrowed books and history',
        'Admin dashboard - Manage books, users, and records',
        'QR/Barcode scanning - Quick issue and return system'
      ]
    }
  ],
  experience: [
    {
      company: 'RK Soft',
      position: 'Developer',
      duration: '2023 - Present',
      responsibilities: [
        'Develop and maintain web applications using modern technologies',
        'Collaborate with team members on project requirements',
        'Implement responsive designs and user-friendly interfaces',
        'Debug and optimize application performance'
      ]
    }
  ],
  contact: {
    email: 'rakibulis420@gmail.com',
    phone: '+881339710410',
    location: 'Bangladesh',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com'
  }
}

export function getPortfolioData(): PortfolioData {
  if (typeof window === 'undefined') return DEFAULT_DATA
  
  try {
    const stored = localStorage.getItem('portfolioData')
    if (!stored) return DEFAULT_DATA

    const data = JSON.parse(stored) as PortfolioData
    if (data.personal?.name === 'Rakibul Islam') {
      data.personal.name = 'Akib Chowdhury'
      localStorage.setItem('portfolioData', JSON.stringify(data))
    }
    return data
  } catch (error) {
    console.error('Error reading portfolio data:', error)
    return DEFAULT_DATA
  }
}

export function savePortfolioData(data: PortfolioData): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem('portfolioData', JSON.stringify(data))
  } catch (error) {
    console.error('Error saving portfolio data:', error)
  }
}

export function resetToDefaults(): void {
  if (typeof window === 'undefined') return
  savePortfolioData(DEFAULT_DATA)
}
