"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertCircle, Lock } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

export default function ChangePasswordPage() {
  const router = useRouter()
  const { t } = useLanguage()

  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNew, setConfirmNew] = useState("")

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)

  // ------------------------------------------------------
  //  Vérifier si l'utilisateur doit changer son mot de passe
  // ------------------------------------------------------
  useEffect(() => {
    const u = localStorage.getItem("user")
    if (!u) return router.push("/login")

    const parsed = JSON.parse(u)
    setUser(parsed)

    if (!parsed.mustChangePassword) {
      router.push("/dashboard")
    }
  }, [router])

  if (!user) return null

  // ------------------------------------------------------
  //  HANDLE SUBMIT
  // ------------------------------------------------------
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setError("")

    if (newPassword.length < 6) {
      setError(t("password.tooShort"))
      return
    }

    if (newPassword !== confirmNew) {
      setError(t("password.matchError"))
      return
    }

    try {
      setLoading(true)

      const response = await fetch(`/api/auth/change-password/${user.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          oldPassword,
          newPassword
        }),
      })

      if (!response.ok) {
        const r = await response.json()
        throw new Error(r.error)
      }

      // Mise à jour des infos user
      user.mustChangePassword = false
      localStorage.setItem("user", JSON.stringify(user))

      // 🔐 Déconnexion complète
     localStorage.removeItem("token")
     localStorage.removeItem("user")

// 🔁 Redirection obligatoire vers login
     router.replace("/login")

    } catch (err: any) {
      setError(err.message || t("password.error"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6">

        <div className="text-center space-y-2">
          <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
            <Lock className="w-7 h-7 text-primary" />
          </div>

          <h1 className="text-2xl font-bold">{t("password.changeTitle")}</h1>
          <p className="text-sm text-muted">{t("password.changeDescription")}</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-300 rounded-lg p-3 flex gap-2 text-sm text-red-600">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Ancien mot de passe */}
          <div>
            <label className="text-sm font-semibold">{t("form.oldPassword")}</label>
            <Input
              type="password"
              className="mt-1"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>

          {/* Nouveau mot de passe */}
          <div>
            <label className="text-sm font-semibold">{t("form.newPassword")}</label>
            <Input
              type="password"
              className="mt-1"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirmation */}
          <div>
            <label className="text-sm font-semibold">{t("form.confirmPassword")}</label>
            <Input
              type="password"
              className="mt-1"
              value={confirmNew}
              onChange={(e) => setConfirmNew(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? t("common.loading") : t("password.submit")}
          </Button>
        </form>
      </div>
    </div>
  )
}
