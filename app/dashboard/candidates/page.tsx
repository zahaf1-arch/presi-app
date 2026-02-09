"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useLanguage } from "@/lib/i18n"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

import { Users, Plus, Edit2, Trash2, Image as ImageIcon, Palette } from "lucide-react"

interface Candidate {
  id: number
  nom_fr: string
  nom_ar: string
  couleur: string
  photo?: string | null
  logo?: string | null
  actif: boolean | null
}

export default function CandidatesPage() {
  const [user, setUser] = useState<any>(null)
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [loading, setLoading] = useState(true)

  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    nom_fr: "",
    nom_ar: "",
    couleur: "#3b82f6",
    photo: "",
    logo: "",
  })

  const router = useRouter()
  const { t, language } = useLanguage()
  const isRTL = language === "ar"

  // Helper pour construire l'URL de l'image
  const getImageUrl = (path?: string | null) => {
    if (!path) return null
    // si déjà un chemin absolu ou commence par /uploads, on le garde
    if (path.startsWith("/")) return path
    return `/uploads/${path}`
  }

  // 🔐 Auth + chargement
  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }

    const parsed = JSON.parse(userData)

    if (!parsed.role || parsed.role.toLowerCase() !== "admin") {
      router.push("/dashboard")
      return
    }

    setUser(parsed)
    loadCandidates()
  }, [])

  // Charger les candidats
  const loadCandidates = async () => {
    try {
      const res = await fetch("/api/candidates", { credentials: "include" })
      if (!res.ok) {
        console.error("Erreur API candidats", await res.text())
        setCandidates([])
        return
      }
      const data = await res.json()
      setCandidates(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error("Erreur chargement candidats:", e)
      setCandidates([])
    } finally {
      setLoading(false)
    }
  }

  // Enregistrer (create / update)
  const handleSave = async () => {
    if (!formData.nom_fr || !formData.nom_ar) {
      alert("Nom FR et Nom AR sont obligatoires")
      return
    }

    const method = editingId ? "PUT" : "POST"

    const payload = {
      nom_fr: formData.nom_fr,
      nom_ar: formData.nom_ar,
      couleur: formData.couleur,
      photo: formData.photo || null,
      logo: formData.logo || null,
      ...(editingId ? { id: editingId } : {}),
    }

    const res = await fetch("/api/candidates", {
      method,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      console.error("Erreur save candidat", await res.text())
      alert("Erreur lors de l'enregistrement")
      return
    }

    setFormOpen(false)
    setEditingId(null)
    setFormData({ nom_fr: "", nom_ar: "", couleur: "#3b82f6", photo: "", logo: "" })
    loadCandidates()
  }

  // Suppression (soft delete)
  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer ce candidat ?")) return

    const res = await fetch("/api/candidates", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ id }),
    })

    if (!res.ok) {
      console.error("Erreur suppression", await res.text())
      alert("Erreur lors de la suppression")
      return
    }

    loadCandidates()
  }

  // Édition
  const handleEdit = (c: Candidate) => {
    setEditingId(c.id)
    setFormData({
      nom_fr: c.nom_fr,
      nom_ar: c.nom_ar,
      couleur: c.couleur,
      photo: c.photo || "",
      logo: c.logo || "",
    })
    setFormOpen(true)
  }

  if (!user) return null

  return (
    <DashboardLayout user={user}>
      <div dir={isRTL ? "rtl" : "ltr"} className="space-y-10">
        {/* HERO similaire aux autres pages */}
        <section className="relative rounded-3xl overflow-hidden text-white shadow-[0_10px_40px_-12px_rgba(0,0,0,0.25)] border border-white/10 bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-500">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_40%)]" />
          <div className="relative p-8 md:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm backdrop-blur">
                <Users className="h-4 w-4" /> {t("candidates.title") || "Candidats"}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                {t("candidates.management") || "Gestion des candidats"}
              </h1>
              <p className="text-white/85 max-w-2xl leading-relaxed">
                {t("candidates.subtitle") ||
                  "Ajoutez, modifiez ou supprimez les candidats de l’élection."}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                onClick={() => {
                  setEditingId(null)
                  setFormData({
                    nom_fr: "",
                    nom_ar: "",
                    couleur: "#3b82f6",
                    photo: "",
                    logo: "",
                  })
                  setFormOpen(true)
                }}
                className="bg-white text-blue-700 hover:bg-slate-100"
              >
                <Plus className="w-4 h-4 mr-2" />
                {t("common.add") || "Ajouter un candidat"}
              </Button>
            </div>
          </div>
        </section>

        {/* FORMULAIRE (inline, même thème que le reste) */}
        {formOpen && (
          <Card className="border border-slate-200 shadow-md bg-white">
            <CardHeader>
              <CardTitle>
                {editingId
                  ? t("common.edit") + " " + t("candidates.title")
                  : t("common.add") + " " + t("candidates.title")}
              </CardTitle>
              <CardDescription>
                {t("candidates.form.desc") ||
                  "Renseignez les informations principales du candidat."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Nom (FR)
                  </label>
                  <Input
                    value={formData.nom_fr}
                    onChange={(e) =>
                      setFormData({ ...formData, nom_fr: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Nom (AR)
                  </label>
                  <Input
                    value={formData.nom_ar}
                    onChange={(e) =>
                      setFormData({ ...formData, nom_ar: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    Logo (chemin)
                  </label>
                  <Input
                    placeholder="/uploads/logo.png ou logo.png"
                    value={formData.logo}
                    onChange={(e) =>
                      setFormData({ ...formData, logo: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    Photo (chemin)
                  </label>
                  <Input
                    placeholder="/uploads/photo.png ou photo.png"
                    value={formData.photo}
                    onChange={(e) =>
                      setFormData({ ...formData, photo: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <Palette className="w-4 h-4" />
                      Couleur
                    </label>
                    <div className="flex items-center gap-2 mt-1">
                      <input
                        type="color"
                        value={formData.couleur}
                        onChange={(e) =>
                          setFormData({ ...formData, couleur: e.target.value })
                        }
                        className="w-10 h-10 rounded border cursor-pointer"
                      />
                      <span className="text-sm text-slate-600">
                        {formData.couleur}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button onClick={handleSave} className="bg-blue-600 text-white">
                  {t("common.save") || "Enregistrer"}
                </Button>
                <Button
                  variant="outline"
                  className="border-slate-300"
                  onClick={() => {
                    setFormOpen(false)
                    setEditingId(null)
                  }}
                >
                  {t("common.cancel") || "Annuler"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* LISTE DES CANDIDATS */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p className="text-sm text-slate-500">
              {t("common.loading") || "Chargement..."}
            </p>
          ) : candidates.length === 0 ? (
            <p className="text-sm text-slate-500">
              {t("candidates.empty") || "Aucun candidat pour le moment."}
            </p>
          ) : (
            candidates.map((c) => {
              const logoUrl = getImageUrl(c.logo || undefined)
              const photoUrl = getImageUrl(c.photo || undefined)

              return (
                <Card
                  key={c.id}
                  className="border border-slate-200 shadow-sm bg-white hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="flex flex-row justify-between items-center">
                    <div className="flex items-center gap-3">
                      {logoUrl ? (
                        <img
                          src={logoUrl}
                          alt={c.nom_fr}
                          className="w-12 h-12 rounded-full border object-cover"
                        />
                      ) : (
                        <div
                          className="w-12 h-12 rounded-full border"
                          style={{ backgroundColor: c.couleur }}
                        />
                      )}
                      <div>
                        <CardTitle className="text-base">
                          {language === "ar" ? c.nom_ar : c.nom_fr}
                        </CardTitle>
                        <CardDescription dir="rtl" className="text-xs">
                          {language === "ar" ? c.nom_fr : c.nom_ar}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge
                      className={
                        c.actif ?? true
                          ? "bg-green-100 text-green-700 border-green-200"
                          : "bg-gray-100 text-gray-500 border-gray-200"
                      }
                    >
                      {(c.actif ?? true)
                        ? t("active") || "Actif"
                        : t("inactive") || "Inactif"}
                    </Badge>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    {photoUrl && (
                      <div className="w-full">
                        <img
                          src={photoUrl}
                          alt={c.nom_fr}
                          className="w-full h-32 object-cover rounded-md border"
                        />
                      </div>
                    )}

                    <div className="flex gap-2 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(c)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-300 text-red-600 hover:bg-red-50"
                        onClick={() => handleDelete(c.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </section>
      </div>
    </DashboardLayout>
  )
}
