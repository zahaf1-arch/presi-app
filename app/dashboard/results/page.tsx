"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useLanguage } from "@/lib/i18n"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AlertCircle, Save } from "lucide-react"

type Bureau = {
  id: number
  nom_fr: string
  nom_ar?: string
  nombreInscrits?: number | null
  nombreVotants?: number | null
}

type Centre = { id: number; nom_fr: string; nom_ar?: string }
type Commune = { id: number; nom_fr: string; nom_ar?: string }
type Moughataa = { id: number; nom_fr: string; nom_ar?: string }
type Wilaya = { id: number; nom_fr: string; nom_ar?: string }

type Candidat = {
  id: number
  nom_fr: string
  nom_ar: string
  logo?: string | null
  couleur?: string | null
}

interface User {
  id: number
  name: string
  role: string          // "admin" | "operator" | "guest"
  wilayaId?: number | null
}

export default function ResultsPage() {
  const router = useRouter()
  const { t, language } = useLanguage()

  const [user, setUser] = useState<User | null>(null)

  const [wilayas, setWilayas] = useState<Wilaya[]>([])
  const [moughataas, setMoughataas] = useState<Moughataa[]>([])
  const [communes, setCommunes] = useState<Commune[]>([])
  const [centres, setCentres] = useState<Centre[]>([])
  const [bureaux, setBureaux] = useState<Bureau[]>([])

  const [selectedWilaya, setSelectedWilaya] = useState<number | null>(null)
  const [selectedMoughataa, setSelectedMoughataa] = useState<number | null>(null)
  const [selectedCommune, setSelectedCommune] = useState<number | null>(null)
  const [selectedCentre, setSelectedCentre] = useState<number | null>(null)
  const [selectedBureau, setSelectedBureau] = useState<number | null>(null)

  const [candidats, setCandidats] = useState<Candidat[]>([])
  const [voixParCandidat, setVoixParCandidat] = useState<Record<number, number>>({})
  const [voixNuls, setVoixNuls] = useState(0)
  const [voixRejetes, setVoixRejetes] = useState(0)
  const [inscrits, setInscrits] = useState<number>(0)
  const [votants, setVotants] = useState<number>(0)

  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  const isOperator = (role?: string) => role?.toLowerCase() === "operator"
  const isGuest = (role?: string) => role?.toLowerCase() === "guest"

  // ---------- LOAD USER + DATA ----------
  useEffect(() => {
    const u = localStorage.getItem("user")
    if (!u) {
      router.push("/login")
      return
    }

    const parsed: User = JSON.parse(u)
    setUser(parsed)

    if (isGuest(parsed.role)) {
      setLoading(false)
      return
    }

    const loadData = async () => {
      try {
        // --- OPERATOR : wilaya fixe depuis /api/users/wilaya (JWT cookie)
        if (isOperator(parsed.role)) {
          const res = await fetch("/api/users/wilaya", {
            credentials: "include",
          })

          if (!res.ok) {
            console.error("Error get wilaya operator", await res.json())
            setLoading(false)
            return
          }

          const w = await res.json()
          setWilayas([w])
          setSelectedWilaya(w.id)
          setMoughataas(w.moughataas ?? [])

 
        } else {
          // --- ADMIN : toutes les wilayas
          const res = await fetch("/api/wilayas")
          const data = await res.json()
          setWilayas(data)
        }

        // --- CANDIDATS triés par id
        const resC = await fetch("/api/candidates")
        const dataC = await resC.json()
        const list = Array.isArray(dataC) ? dataC : dataC.candidats ?? []
        list.sort((a: Candidat, b: Candidat) => a.id - b.id)
        setCandidats(list)
      } catch (err) {
        console.error("ResultsPage loadData error:", err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [router])

  // ---------- HELPERS ----------
  const fetchData = async (url: string) => {
    const res = await fetch(url)
    return res.json()
  }

  const nameByLang = (item: any) =>
    language === "ar" ? item.nom_ar || item.nom_fr : item.nom_fr

  const rtlIfAr =
    language === "ar" ? { dir: "rtl" as const, className: "text-right" } : {}

  // ---------- SELECT HANDLERS ----------
  const handleWilayaChange = async (id: number) => {
    setSelectedWilaya(id)
    setSelectedMoughataa(null)
    setSelectedCommune(null)
    setSelectedCentre(null)
    setSelectedBureau(null)
    setCommunes([])
    setCentres([])
    setBureaux([])

    const data = await fetchData(`/api/wilayas/${id}/moughataas`)
    setMoughataas(data)
  }

  const handleMoughataaChange = async (id: number) => {
    setSelectedMoughataa(id)
    setSelectedCommune(null)
    setSelectedCentre(null)
    setSelectedBureau(null)
    setCentres([])
    setBureaux([])

    const data = await fetchData(`/api/moughataas/${id}/communes`)
    setCommunes(data)
  }

  const handleCommuneChange = async (id: number) => {
    setSelectedCommune(id)
    setSelectedCentre(null)
    setSelectedBureau(null)
    setBureaux([])

    const data = await fetchData(`/api/communes/${id}/centres`)
    setCentres(data)
  }

  const handleCentreChange = async (id: number) => {
    setSelectedCentre(id)
    setSelectedBureau(null)

    // 👉 bureax NON dépouillés uniquement (backend)
    const data = await fetchData(`/api/centres/${id}/bureaux`)
    setBureaux(data)
  }

  const handleBureauChange = async (id: number) => {
    setSelectedBureau(id)

    const data = await fetchData(`/api/bureaux/${id}`)
    setInscrits(data.nombreInscrits ?? 0)
    setVotants(data.nombreVotants ?? 0)
  }

  // ---------- SAVE ----------
  const handleSave = async () => {
    if (!selectedBureau) {
      alert(t("results.selectBureau", "Sélectionnez un bureau"))
      return
    }

    // 🔒 Sécurité opérateur : seulement SA wilaya
    if (isOperator(user?.role) && selectedWilaya !== user?.wilayaId) {
      alert(
        t(
          "results.wilayaRestriction",
          "Vous ne pouvez saisir que pour votre wilaya"
        )
      )
      return
    }

    setSaving(true)

    const payload = Object.entries(voixParCandidat).map(
      ([candidatId, nombreVoix]) => ({
        electionTypeId: 1,
        bureauId: selectedBureau,
        voixNuls: Math.max(0, voixNuls),
        voixRejetes: Math.max(0, voixRejetes),
        candidatId: Number(candidatId),
        nombreVoix: Math.max(0, Number(nombreVoix) || 0),

      })
    )

    try {
      // Mettre à jour les votants du bureau
      await fetch(`/api/bureaux/${selectedBureau}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ nombreVotants: votants }),
      })

      // Sauvegarde résultats en batch
      const res = await fetch("/api/resultats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        alert(t("results.saveError", "Erreur lors de la sauvegarde ❌"))
        return
      }

      alert(t("results.saved", "Résultats enregistrés ✅"))

      // Reset + retirer ce bureau (non proposé la prochaine fois)
      setVoixNuls(0)
      setVoixRejetes(0)
      setVoixParCandidat({})
      setBureaux(prev => prev.filter(b => b.id !== selectedBureau))
      setSelectedBureau(null)
    } catch (error) {
      console.error(error)
      alert(t("results.networkError", "Erreur réseau ❌"))
    } finally {
      setSaving(false)
    }
  }

  // ---------- RENDER ----------
  if (!user) return null

  if (isGuest(user.role)) {
    return (
      <DashboardLayout user={user}>
        <div className="max-w-3xl mx-auto mt-10">
          <Card className="border-0 bg-amber-50">
            <CardHeader className="flex flex-row items-center gap-3">
              <AlertCircle className="w-6 h-6 text-amber-600" />
              <div>
                <CardTitle>{t("results.noAccess")}</CardTitle>
                <CardDescription>{t("results.guestNoAccess")}</CardDescription>
              </div>
            </CardHeader>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout user={user}>
      <div className="max-w-5xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("results.formTitle")}</CardTitle>
            <CardDescription>{t("results.formSubtitle")}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* WILAYA - MOUGHATAA - COMMUNE - CENTRE - BUREAU */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* WILAYA */}
              <Select
                value={selectedWilaya?.toString() || undefined}
                onValueChange={v => handleWilayaChange(Number(v))}
                disabled={isOperator(user.role) || loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("wilaya")} />
                </SelectTrigger>
                <SelectContent>
                  {wilayas.map(w => (
                    <SelectItem key={w.id} value={String(w.id)}>
                      <span {...rtlIfAr}>{nameByLang(w)}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* MOUGHATAA */}
              <Select
                value={selectedMoughataa?.toString() || undefined}
                onValueChange={v => handleMoughataaChange(Number(v))}
                disabled={!moughataas.length}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("moughataa")} />
                </SelectTrigger>
                <SelectContent>
                  {moughataas.map(m => (
                    <SelectItem key={m.id} value={String(m.id)}>
                      <span {...rtlIfAr}>{nameByLang(m)}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* COMMUNE */}
              <Select
                value={selectedCommune !== null ? String(selectedCommune) : undefined}

                onValueChange={v => handleCommuneChange(Number(v))}
                disabled={!communes.length}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("commune")} />
                </SelectTrigger>
                <SelectContent>
                  {communes.map(c => (
                    <SelectItem key={c.id} value={String(c.id)}>
                      <span {...rtlIfAr}>{nameByLang(c)}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* CENTRE */}
              <Select
                value={selectedCentre?.toString() || undefined}
                onValueChange={v => handleCentreChange(Number(v))}
                disabled={!centres.length}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("centre")} />
                </SelectTrigger>
                <SelectContent>
                  {centres.map(c => (
                    <SelectItem key={c.id} value={String(c.id)}>
                      <span {...rtlIfAr}>{nameByLang(c)}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* BUREAU */}
              <Select
                value={selectedBureau?.toString() || undefined}
                onValueChange={v => handleBureauChange(Number(v))}
                disabled={!bureaux.length}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("bureau")} />
                </SelectTrigger>
                <SelectContent>
                  {bureaux.map(b => (
                    <SelectItem key={b.id} value={String(b.id)}>
                      <span {...rtlIfAr}>{nameByLang(b)}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* INFOS BUREAU */}
            {selectedBureau && (
              <>
                <div className="bg-slate-50 p-3 border rounded">
                  <strong>{t("total.voters")}:</strong> {inscrits}
                </div>

                <div>
                  <label>{t("results.votersCount")}</label>
                  <Input
                    type="number"
                    value={votants}
                    onChange={e =>
                      setVotants(Math.max(0, Number(e.target.value) || 0))
                    }
                  />
                </div>

                {inscrits > 0 && (
                  <p className="text-xs mt-1">
                    {t("participation.rate")}:{" "}
                    <strong>{((votants / inscrits) * 100).toFixed(1)}%</strong>
                  </p>
                )}
              </>
            )}
                {/* VOTES NULS / REJETÉS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-3 mt-4 border rounded">
                  <div>
                    <label>{t("neutral.votes")}</label>
                    <Input
                      type="number"
                      value={voixNuls}
                      onChange={e =>
                        setVoixNuls(Math.max(0, Number(e.target.value) || 0))
                      }
                    />
                  </div>
                  <div>
                    <label>{t("rejected.votes")}</label>
                    <Input
                      type="number"
                      value={voixRejetes}
                      onChange={e =>
                        setVoixRejetes(
                          Math.max(0, Number(e.target.value) || 0)
                        )
                      }
                    />
                  </div>
                </div>
            {/* CANDIDATS */}
            {selectedBureau && (
              <>
                {candidats.map(c => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between gap-4 border p-2 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {c.logo && (
                        <img
                          src={c.logo}
                          alt={c.nom_fr}
                          className="w-10 h-10 rounded-full object-cover border shadow-sm"
                        />
                      )}
                      <div>
                        <p className="font-semibold">
                          {language === "ar" ? c.nom_ar : c.nom_fr}
                        </p>
                        <p className="text-xs text-gray-500" dir="rtl">
                          {c.nom_ar}
                        </p>
                      </div>
                    </div>

                    <Input
                      type="number"
                      className="w-28"
                      placeholder={t("common.vote")}
                      value={voixParCandidat[c.id] ?? ""}
                      onChange={e =>
                        setVoixParCandidat({
                          ...voixParCandidat,
                          [c.id]: Math.max(
                            0,
                            Number(e.target.value) || 0
                          ),
                        })
                      }
                    />
                  </div>
                ))}



                <Button onClick={handleSave} disabled={saving} className="mt-4">
                  <Save className="w-4 h-4 mr-2" />
                  {saving
                    ? t("results.saving", "Enregistrement...")
                    : t("common.save")}
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
