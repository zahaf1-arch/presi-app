"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useLanguage } from "@/lib/i18n"
import { motion } from "framer-motion"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import {
  ChevronDown,
  ChevronUp,
  MapPin,
  Building2,
  Activity,
  Dot,
 Landmark,
 Layers, 
 Grid3X3,
} from "lucide-react"

// --------------------------
// TYPES
// --------------------------
type BureauGeo = {
  id: number
  nom: string
  totalInscrits?: number
  totalVotants?: number
  tauxParticipation?: number
}

type CentreGeo = {
  id: number
  nom: string
  bureaux: BureauGeo[]
  totalInscrits?: number
  totalVotants?: number
  tauxParticipation?: number
}

type CommuneGeo = {
  id: number
  nom: string
  centres: CentreGeo[]
  totalInscrits?: number
  totalVotants?: number
  tauxParticipation?: number
}

type MoughataaGeo = {
  id: number
  nom: string
  communes: CommuneGeo[]
  totalInscrits?: number
  totalVotants?: number
  tauxParticipation?: number
}

type WilayaGeo = {
  id: number
  nom: string
  moughataas: MoughataaGeo[]
  totalInscrits?: number
  totalVotants?: number
  tauxParticipation?: number
}

export default function LocationsPage() {
  // --------------------------
  // STATES
  // --------------------------
  const [user, setUser] = useState<any>(null)
  const [wilayas, setWilayas] = useState<WilayaGeo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [expandedWilayas, setExpandedWilayas] = useState<Set<number>>(new Set())
  const [expandedMoughataas, setExpandedMoughataas] = useState<Set<number>>(new Set())
  const [expandedCommunes, setExpandedCommunes] = useState<Set<number>>(new Set())
  const [expandedCentres, setExpandedCentres] = useState<Set<number>>(new Set())
  
  const router = useRouter()
  const { t, language } = useLanguage()
  const isRTL = language === "ar"

  // --------------------------
  // AUTH - ADMIN ONLY
  // --------------------------
  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) return router.push("/login")

    const parsed = JSON.parse(userData)
   // if (parsed.role.toLowerCase() !== "admin" || "operator") return router.push("/dashboard")

    setUser(parsed)
  }, [])

  // --------------------------
  // LOAD GEO DATA
  // --------------------------
  useEffect(() => {
    const loadGeo = async () => {
      try {
        setLoading(true)
        const lang = language === "ar" ? "ar" : "fr"
        const res = await fetch(`/api/geo?lang=${lang}`)
        const json = await res.json()
        setWilayas(Array.isArray(json) ? json : [])
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }

    if (user) loadGeo()
  }, [user, language])
  
  // --------------------------
  // TOGGLE HANDLERS
  // --------------------------
  const toggle = (setFn: any, id: number) => {
    setFn((prev: Set<number>) => {
      const copy = new Set(prev)
      copy.has(id) ? copy.delete(id) : copy.add(id)
      return copy
    })
  }

  const toggleWilaya = (id: number) => toggle(setExpandedWilayas, id)
  const toggleMoughataa = (id: number) => toggle(setExpandedMoughataas, id)
  const toggleCommune = (id: number) => toggle(setExpandedCommunes, id)
  const toggleCentre = (id: number) => toggle(setExpandedCentres, id)

  if (!user) return null
   // --------------------------
// GLOBAL COUNTS
// --------------------------
const totalMoughataas = wilayas.reduce((sum, w) => sum + w.moughataas.length, 0)

const totalCommunes = wilayas.reduce(
  (sum, w) =>
    sum +
    w.moughataas.reduce((s, m) => s + m.communes.length, 0),
  0
)

const totalCentres = wilayas.reduce(
  (sum, w) =>
    sum +
    w.moughataas.reduce(
      (s, m) => s + m.communes.reduce((cSum, c) => cSum + c.centres.length, 0),
      0
    ),
  0
)

const totalBureaux = wilayas.reduce(
  (sum, w) =>
    sum +
    w.moughataas.reduce(
      (s, m) =>
        s +
        m.communes.reduce(
          (cSum, c) => cSum + c.centres.reduce((ctrSum, ctr) => ctrSum + ctr.bureaux.length, 0),
          0
        ),
      0
    ),
  0
)

  return (
    <DashboardLayout user={user}>
      <div dir={isRTL ? "rtl" : "ltr"} className="space-y-10">
        
        {/* --------------------------------------------- */}
        {/* HERO SECTION */}
        {/* --------------------------------------------- */}
        <section className="relative rounded-3xl overflow-hidden text-white shadow-xl border border-white/10 bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-500">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_40%)]" />

          <div className="relative p-8 md:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm backdrop-blur">
                <MapPin className="h-4 w-4" />
                {t("locations.title")}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold">
                {t("geographic.management") || "Gestion de la hiérarchie géographique"}
              </h1>

              <p className="text-white/85 max-w-2xl">
                {t("locations.subtitle")}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center">
                  <Building2 className="h-6 w-6" />
                </div>
                <div className="text-sm">
                  <p className="font-semibold">{t("total.wilayas") || "Wilayas"}</p>
                  <p className="font-semibold">{wilayas.length} </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center">
                  <Activity className="h-6 w-6" />
                </div>
                <p className="text-sm">
                  {t("locations.hint")}
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* --------------------------------------------- */}
{/* STAT CARDS - VERSION PREMIUM ANIMÉE */}
{/* --------------------------------------------- */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">

  {/* Wilaya */}
  <motion.div
    initial={{ opacity: 0, y: 25 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-blue-500/40">
      <CardContent className="p-5 flex items-center gap-4">
        <div className="h-12 w-12 rounded-xl bg-blue-600/10 flex items-center justify-center">
          <MapPin className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <p className="text-3xl font-bold text-slate-900">{wilayas.length}</p>
          <p className="text-sm text-slate-500">{t("wilaya")}</p>
        </div>
      </CardContent>
    </Card>
  </motion.div>

  {/* Moughataas */}
  <motion.div
    initial={{ opacity: 0, y: 25 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-indigo-500/40">
      <CardContent className="p-5 flex items-center gap-4">
        <div className="h-12 w-12 rounded-xl bg-indigo-600/10 flex items-center justify-center">
          <Building2 className="h-6 w-6 text-indigo-600" />
        </div>
        <div>
          <p className="text-3xl font-bold text-slate-900">{totalMoughataas}</p>
          <p className="text-sm text-slate-500">{t("moughataa")}</p>
        </div>
      </CardContent>
    </Card>
  </motion.div>

  {/* Communes */}
  <motion.div
    initial={{ opacity: 0, y: 25 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-green-500/40">
      <CardContent className="p-5 flex items-center gap-4">
        <div className="h-12 w-12 rounded-xl bg-green-600/10 flex items-center justify-center">
          <Layers className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <p className="text-3xl font-bold text-slate-900">{totalCommunes}</p>
          <p className="text-sm text-slate-500">{t("commune")}</p>
        </div>
      </CardContent>
    </Card>
  </motion.div>

  {/* Centres */}
  <motion.div
    initial={{ opacity: 0, y: 25 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
  >
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-orange-500/40">
      <CardContent className="p-5 flex items-center gap-4">
        <div className="h-12 w-12 rounded-xl bg-orange-600/10 flex items-center justify-center">
          <Landmark className="h-6 w-6 text-orange-600" />
        </div>
        <div>
          <p className="text-3xl font-bold text-slate-900">{totalCentres}</p>
          <p className="text-sm text-slate-500">{t("centre")}</p>
        </div>
      </CardContent>
    </Card>
  </motion.div>

  {/* Bureaux */}
  <motion.div
    initial={{ opacity: 0, y: 25 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-red-500/40">
      <CardContent className="p-5 flex items-center gap-4">
        <div className="h-12 w-12 rounded-xl bg-red-600/10 flex items-center justify-center">
          <Grid3X3 className="h-6 w-6 text-red-600" />
        </div>
        <div>
          <p className="text-3xl font-bold text-slate-900">{totalBureaux}</p>
          <p className="text-sm text-slate-500">{t("bureau")}</p>
        </div>
      </CardContent>
    </Card>
  </motion.div>

</div>

        {/* --------------------------------------------- */}
        {/* MAIN CARD */}
        {/* --------------------------------------------- */}
        <Card className="bg-white border border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>{t("locations.structure")}</CardTitle>
            <CardDescription>
              {t("locations.detail")}  
            </CardDescription>
          </CardHeader>

          <CardContent>

            {loading && <p>{t("common.loading")}</p>}
            {error && <p className="text-red-600">{error}</p>}

            {!loading && !error && (
              <div className="space-y-3">

                {wilayas.map((w) => (
                  <div key={w.id} className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50">

                    {/* --------------------------- */}
                    {/* WILAYA */}
                    {/* --------------------------- */}
                    <button
                      onClick={() => toggleWilaya(w.id)}
                      className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-100 transition text-left"
                    >
                      <div className="flex items-center gap-3">
                        {expandedWilayas.has(w.id)
                          ? <ChevronUp className="w-5 h-5 text-slate-500" />
                          : <ChevronDown className="w-5 h-5 text-slate-500" />}

                        <span className="font-semibold text-slate-900">{w.nom}</span>

                        <Badge variant="outline">{w.moughataas.length} {t("moughataas")}</Badge>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span>{t("total.voters")} : {w.totalInscrits}</span>
                        <span>{t("total.votants")} : {w.totalVotants}</span>
                        <span>{t("participation.rate")} : {(w.tauxParticipation ?? 0).toFixed(1)}%</span>
                      </div>
                    </button>

                    {/* WILAYA BODY */}
                    {expandedWilayas.has(w.id) && (
                      <div className="bg-white border-t border-slate-200 divide-y">

                        {w.moughataas.map((m) => (
                          <div key={m.id}>

                            {/* --------------------------- */}
                            {/* MOUGHATAA */}
                            {/* --------------------------- */}
                            <button
                              onClick={() => toggleMoughataa(m.id)}
                              className="w-full px-6 py-3 flex items-center justify-between hover:bg-slate-50 transition text-left"
                            >
                              <div className="flex items-center gap-2">
                                {expandedMoughataas.has(m.id)
                                  ? <ChevronUp className="w-4 h-4 text-slate-500" />
                                  : <ChevronDown className="w-4 h-4 text-slate-500" />}
                                <span className="font-medium">{m.nom}</span>

                                <Badge variant="outline">{m.communes.length} {t("communes")}</Badge>
                              </div>

                              <div className="flex gap-4 text-xs text-slate-500">
                                <span>{t("total.voters")} : {m.totalInscrits}</span>
                                <span>{t("total.votants")} : {m.totalVotants}</span>
                                <span>{t("participation.rate")} : {(m.tauxParticipation ?? 0).toFixed(1)}%</span>
                              </div>
                            </button>

                            {/* --------------------------- */}
                            {/* COMMUNES */}
                            {/* --------------------------- */}
                            {expandedMoughataas.has(m.id) && (
                              <div className="bg-slate-50 border-t border-slate-100 pl-10">

                                {m.communes.map((c) => (
                                  <div key={c.id}>

                                    <button
                                      onClick={() => toggleCommune(c.id)}
                                      className="w-full pr-4 pl-2 py-2 flex items-center justify-between hover:bg-slate-100"
                                    >
                                      <div className="flex items-center gap-2">
                                        {expandedCommunes.has(c.id)
                                          ? <ChevronUp className="w-4 h-4 text-slate-500" />
                                          : <ChevronDown className="w-4 h-4 text-slate-500" />}
                                        <span className="font-medium text-sm">{c.nom}</span>

                                        <Badge variant="outline">{c.centres.length} {t("centres")}</Badge>
                                      </div>

                                      <div className="flex gap-4 text-xs text-slate-500">
                                        <span>{t("total.voters")} : {c.totalInscrits}</span>
                                        <span>{t("total.votants")} : {c.totalVotants}</span>
                                        <span>{t("participation.rate")} : {(c.tauxParticipation ?? 0).toFixed(1)}%</span>
                                      </div>
                                    </button>

                                    {/* --------------------------- */}
                                    {/* CENTRES */}
                                    {/* --------------------------- */}
                                    {expandedCommunes.has(c.id) && (
                                      <div className="border-l border-slate-200 ml-4 pl-4 pb-2 space-y-1">

                                        {c.centres.map((ctr) => (
                                          <div key={ctr.id}>
                                            <button
                                              onClick={() => toggleCentre(ctr.id)}
                                              className="w-full flex items-center justify-between py-1.5 hover:bg-slate-100 rounded-md px-2 text-left"
                                            >
                                              <div className="flex items-center gap-2">
                                                {expandedCentres.has(ctr.id)
                                                  ? <ChevronUp className="w-4 h-4 text-slate-500" />
                                                  : <ChevronDown className="w-4 h-4 text-slate-500" />}

                                                <span className="text-sm text-slate-800">{ctr.nom}</span>
                                                <Badge variant="outline">{ctr.bureaux.length} {t("bureaux")}</Badge>
                                              </div>

                                              <div className="flex gap-4 text-xs text-slate-500">
                                                <span>{t("total.voters")} : {ctr.totalInscrits}</span>
                                                <span>{t("total.votants")} : {ctr.totalVotants}</span>
                                                <span>{t("participation.rate")} : {(ctr.tauxParticipation ?? 0).toFixed(1)}%</span>
                                              </div>
                                            </button>

                                            {/* --------------------------- */}
                                            {/* BUREAUX */}
                                            {/* --------------------------- */}
                                            {expandedCentres.has(ctr.id) && (
                                              <div className="ml-6 mt-1 space-y-1">

                                                {ctr.bureaux.map((b) => (
                                                  <div
                                                    key={b.id}
                                                    className="flex justify-between items-center bg-white px-3 py-1.5 rounded border hover:bg-slate-100"
                                                  >
                                                    <div className="flex items-center gap-2">
                                                      <Dot className="w-4 h-4 text-slate-400" />
                                                      <span className="font-medium text-xs">{b.nom}</span>
                                                    </div>

                                                    <div className="flex gap-4 text-xs text-slate-600">
                                                      <span>{t("total.voters")} : {b.totalInscrits}</span>
                                                      <span>{t("total.votants")} : {b.totalVotants}</span>
                                                      <span>{t("participation.rate")} : {(b.tauxParticipation ?? 0).toFixed(1)}%</span>
                                                    </div>
                                                  </div>
                                                ))}
                                              </div>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
