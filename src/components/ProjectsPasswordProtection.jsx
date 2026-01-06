import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const PASSWORD = '2025'
const STORAGE_KEY = 'projects_authenticated'
const EMAIL = 'alirezaiman@yahoo.com'
const EMAIL_SUBJECT = 'Project Access'

export default function ProjectsPasswordProtection({ onAuthenticated }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if already authenticated in this session
    const authStatus = sessionStorage.getItem(STORAGE_KEY)
    if (authStatus === 'true') {
      setIsAuthenticated(true)
      onAuthenticated()
    }
  }, [onAuthenticated])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (password === PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, 'true')
      setIsAuthenticated(true)
      onAuthenticated()
    } else {
      setError('Incorrect password. Please try again.')
      setPassword('')
    }
  }

  if (isAuthenticated) {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] bg-black flex items-center justify-center p-6"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-lg p-8 sm:p-12 max-w-md w-full shadow-2xl"
        >
          <h2 className="text-2xl sm:text-3xl font-medium mb-2 text-black">
            Projects Access
          </h2>
          <p className="text-gray-600 mb-6">
            Please enter the password to view the projects.
          </p>
          
          <p className="text-sm text-gray-500 mb-6">
            Don't have the password?{' '}
            <a
              href={`mailto:${EMAIL}?subject=${encodeURIComponent(EMAIL_SUBJECT)}`}
              className="text-black underline hover:opacity-70 transition-opacity"
            >
              Request it here
            </a>
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError('')
                }}
                placeholder="Enter password"
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black placeholder-gray-400"
                autoFocus
              />
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-600 text-sm mt-2"
                >
                  {error}
                </motion.p>
              )}
            </div>
            
            <button
              type="submit"
              className="w-full bg-black text-white py-3 px-6 rounded-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Enter
            </button>
          </form>
          
          <div className="mt-4 text-center">
            <Link
              to="/"
              className="text-sm text-gray-600 hover:text-black transition-colors underline"
            >
              Back to Homepage
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

