'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLanguage } from '@/lib/i18n'
import { BarChart3, AlertCircle, Globe, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const { t, language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    const newLang = language === 'fr' ? 'ar' : 'fr'
    setLanguage(newLang)
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setLoading(true)
  setError("")

  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) throw new Error("Login failed")

    const data = await response.json()

    // Sauvegarde
    localStorage.setItem("token", data.token)
    localStorage.setItem("user", JSON.stringify(data.user))

    // 🔥 1️⃣ Vérifier si l’utilisateur doit changer le mot de passe
    if (data.user.mustChangePassword) {
      router.push("/change-password")
      return
    }

    // 🔥 2️⃣ Sinon → accès normal
    router.push("/dashboard")

  } catch (err) {
    setError(t("auth.error"))
  } finally {
    setLoading(false)
  }
}


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-background to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center space-y-4 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-md">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">
              {t('auth.signin')}
            </h1>
            <p className="text-muted">
              {t('app.subtitle')}
            </p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-8 space-y-6 shadow-md animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div className="space-y-2.5">
              <label className="block text-sm font-semibold text-foreground">
                {t('form.email')}
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@election.com"
                className="bg-blue-50 border-border text-foreground placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary/30 rounded-lg h-11"
                required
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2.5">
              <label className="block text-sm font-semibold text-foreground">
                {t('form.password')}
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-blue-50 border-border text-foreground placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary/30 rounded-lg h-11"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-error/30 rounded-lg p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
                <p className="text-sm text-error">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-primary text-white h-11 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all group"
            >
              {loading ? t('common.loading') : t('auth.signin')}
              {!loading && <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />}
            </Button>
          </form>

          {/* Test Credentials */}
          
        </div>

        {/* Language Switcher */}
        <div className="mt-8 flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="text-muted hover:text-primary gap-2"
          >
            <Globe className="w-4 h-4" />
            {language === 'fr' ? 'العربية' : 'Français'}
          </Button>
        </div>
      </div>
    </div>
  )
}
