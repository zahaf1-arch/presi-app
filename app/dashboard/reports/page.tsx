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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

import {
  Users,
  MapPin,
  Vote,
  TrendingUp,
  BarChart3,
  Activity,
  Calendar,
  Building,
  PieChart as PieChartIcon,
  Download,
} from "lucide-react"

import {
  ResponsiveContainer,
  BarChart as RBarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import clsx from "clsx"

interface User {
  id: number
  name: string
  email: string
  role: "ADMIN" | "OPERATOR" | "GUEST"
  wilaya_id?: number | null
  wilaya?: {
    id: number
    nom_fr: string
    nom_ar: string
    code: string
  } | null
}

interface GlobalStats {
  totalWilayas?: number
  totalBureaux: number
  totalCandidats: number
  totalInscrits: number
  totalVotants: number
  totalVoix: number
  totalNuls: number
  totalRejetes: number
  bureauxDepouilles: number
  pourcentageDepouilles: number
  participationRate: number
}

interface CandidatDash {
  id: number
  nom_fr: string
  nom_ar: string
  logo: string | null
  couleur: string | null
  totalVoix: number
  pourcentage: number
}

interface WilayaGeo {
  id: number
  nom: string
  moughataas: {
    id: number
    nom: string
    communes: {
      id: number
      nom: string
      centres: {
        id: number
        nom: string
        bureaux: {
          id: number
          nom: string
        }[]
      }[]
    }[]
  }[]
}

export default function ReportsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [globalStats, setGlobalStats] = useState<GlobalStats | null>(null)
  const [candidats, setCandidats] = useState<CandidatDash[]>([])
  const [loadingStats, setLoadingStats] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [wilayas, setWilayas] = useState<WilayaGeo[]>([])
  const [moughataas, setMoughataas] = useState<any[]>([])
  const [communes, setCommunes] = useState<any[]>([])
  const [centres, setCentres] = useState<any[]>([])
  const [bureaux, setBureaux] = useState<any[]>([])

  const [selectedWilaya, setSelectedWilaya] = useState<string>("")
  const [selectedMoughataa, setSelectedMoughataa] = useState<string>("")
  const [selectedCommune, setSelectedCommune] = useState<string>("")
  const [selectedCentre, setSelectedCentre] = useState<string>("")
  const [selectedBureau, setSelectedBureau] = useState<string>("")

  const router = useRouter()
  const { t, language } = useLanguage()
  const isRTL = language === "ar"

  // ---------------------------------
  // Récupération user + géographie
  // ---------------------------------
  useEffect(() => {
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")

    if (!token || !userData) {
      router.push("/login")
      return
    }

    const parsedUser: User = JSON.parse(userData)
    setUser(parsedUser)
  }, [router])

  // Charger la hiérarchie géographique
  useEffect(() => {
    const fetchGeo = async () => {
      try {
        const lang = language === "ar" ? "ar" : "fr"
        const res = await fetch(`/api/geo?lang=${lang}`)
        const json = await res.json()
        setWilayas(Array.isArray(json) ? json : [])
      } catch (err) {
        console.error("Erreur chargement géographie:", err)
        setWilayas([])
      }
    }
    fetchGeo()
  }, [language])

  // Sélection wilaya
  useEffect(() => {
    if (!selectedWilaya) {
      setMoughataas([])
      setCommunes([])
      setCentres([])
      setBureaux([])
      return
    }
    const w = wilayas.find(
      (wilaya) => wilaya.id.toString() === selectedWilaya.toString()
    )
    setMoughataas(w?.moughataas || [])
    setCommunes([])
    setCentres([])
    setBureaux([])
    setSelectedMoughataa("")
    setSelectedCommune("")
    setSelectedCentre("")
    setSelectedBureau("")
  }, [selectedWilaya, wilayas])

  // Sélection moughataa
  useEffect(() => {
    if (!selectedMoughataa) {
      setCommunes([])
      setCentres([])
      setBureaux([])
      return
    }
    const m = moughataas.find(
      (item: any) => item.id.toString() === selectedMoughataa.toString()
    )
    setCommunes(m?.communes || [])
    setCentres([])
    setBureaux([])
    setSelectedCommune("")
    setSelectedCentre("")
    setSelectedBureau("")
  }, [selectedMoughataa, moughataas])

  // Sélection commune
  useEffect(() => {
    if (!selectedCommune) {
      setCentres([])
      setBureaux([])
      return
    }
    const c = communes.find(
      (item: any) => item.id.toString() === selectedCommune.toString()
    )
    setCentres(c?.centres || [])
    setBureaux([])
    setSelectedCentre("")
    setSelectedBureau("")
  }, [selectedCommune, communes])

  // Sélection centre
  useEffect(() => {
    if (!selectedCentre) {
      setBureaux([])
      setSelectedBureau("")
      return
    }
    const ctr = centres.find(
      (item: any) => item.id.toString() === selectedCentre.toString()
    )
    setBureaux(ctr?.bureaux || [])
    setSelectedBureau("")
  }, [selectedCentre, centres])

  // ---------------------------------
  // Chargement des stats (DB via /api/stats)
  // ---------------------------------
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoadingStats(true)
        setError(null)

        let url = "/api/stats?"
        if (selectedWilaya) url += `wilayaId=${selectedWilaya}&`
        if (selectedMoughataa) url += `moughataaId=${selectedMoughataa}&`
        if (selectedCommune) url += `communeId=${selectedCommune}&`
        if (selectedCentre) url += `centreId=${selectedCentre}&`
        if (selectedBureau) url += `bureauId=${selectedBureau}&`

        const res = await fetch(url)
        if (!res.ok) throw new Error("Erreur de chargement des statistiques")
        const json = await res.json()

        setGlobalStats(json.globalStats || null)

        if (Array.isArray(json.candidatsResults)) {
          const sorted = [...json.candidatsResults].sort(
            (a: CandidatDash, b: CandidatDash) =>
              (b.totalVoix || 0) - (a.totalVoix || 0)
          )
          setCandidats(sorted)
        } else {
          setCandidats([])
        }
      } catch (err: any) {
        console.error("Erreur stats:", err)
        setError(err.message || "Erreur lors du chargement des statistiques")
      } finally {
        setLoadingStats(false)
      }
    }

    // Ne lance que si user est présent
    if (user) {
      fetchStats()
    }
  }, [
    user,
    selectedWilaya,
    selectedMoughataa,
    selectedCommune,
    selectedCentre,
    selectedBureau,
  ])

  if (!user) return null

  const getRank = (index: number) => {
    const pos = index + 1
    if (pos === 1) return "🥇 1er"
    if (pos === 2) return "🥈 2e"
    if (pos === 3) return "🥉 3e"
    return `${pos}e`
  }

  const statsCards = [
    {
      title: t("total.voters") || "Total inscrits",
      value: globalStats?.totalInscrits ?? 0,
      description: t("registered.voters") || "Électeurs inscrits",
      icon: Users,
    },
    {
      title: t("total.bureaux") || "Bureaux de vote",
      value: globalStats?.totalBureaux ?? 0,
      description: `${globalStats?.bureauxDepouilles ?? 0} ${
        t("bureauStats.deplouilles") || "dépouillés"
      } (${globalStats?.pourcentageDepouilles ?? 0}%)`,
      icon: MapPin,
    },
    {
      title: t("votes.count") || "Total des voix",
      value: globalStats?.totalVoix ?? 0,
      description:`${t("participation.rate") || "Taux de participation"} 
     ${globalStats?.participationRate ?? 0}%`,
      icon: BarChart3,
    },
    {
      title: t("neutral.votes") + " / " + t("rejected.votes") || "Nuls / Rejetés",
      value: `${globalStats?.totalNuls ?? 0} / ${
        globalStats?.totalRejetes ?? 0
      }`,
      description: "",
      icon: PieChartIcon,
    },
  ]

  const sortedCandidats = [...candidats].sort(
    (a, b) => b.totalVoix - a.totalVoix
  )

  const levelLabel = () => {
    if (selectedCentre) return t("centre") || "Centre"
    if (selectedCommune) return t("commune") || "Commune"
    if (selectedMoughataa) return t("moughataa") || "Moughataa"
    if (selectedWilaya) return t("wilaya") || "Wilaya"
    return t("national") || "National"
  }

  return (
    <DashboardLayout user={user}>
      <div
        id="report-content"
        dir={isRTL ? "rtl" : "ltr"}
        className="space-y-10"
      >
        {/* HERO / INTRO - même style que dashboard */}
        <section className="relative rounded-3xl overflow-hidden text-white shadow-[0_10px_40px_-12px_rgba(0,0,0,0.25)] border border-white/10 bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-500">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_40%)]" />
          <div className="relative p-8 md:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm backdrop-blur">
                <BarChart3 className="h-4 w-4" />{" "}
                {t("reports.statistics") || "Rapports & statistiques"}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                {t("reports.title") || "Rapports électoraux"}
              </h1>
              <p className="text-white/85 max-w-2xl leading-relaxed">
                {t("reports.subtitle") ||
                  "Analyse détaillée des résultats et de la participation"}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <div className="text-center">
                <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center mx-auto">
                  <Calendar className="h-6 w-6" />
                </div>
                <p className="mt-2 text-sm">
                  {t("election.date") || "Date de l’élection"} : {new Date().toLocaleDateString(language === "ar" ? "ar" : "fr")}
                </p>
              </div>
              <div className="text-center">
                <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center mx-auto">
                  <Activity className="h-6 w-6" />
                </div>
                <p className="mt-2 text-sm">
                  {t("current.level") || "Niveau"} : {levelLabel()}
                </p>
              </div>
   
            </div>
          </div>
        </section>

        {/* Filtres géographiques */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              {t("filter.results") || "Filtrer les résultats"}
            </CardTitle>
            <CardDescription>
              {t("select.geographic.level") ||
                "Sélectionnez un niveau géographique pour affiner les statistiques"}
            </CardDescription>
          </CardHeader>

          <CardContent dir={isRTL ? "rtl" : "ltr"}>
            <div className="flex flex-wrap gap-4">
              {/* Wilaya */}
              <div className="flex flex-col min-w-[220px]">

                <label className="text-sm text-gray-500 mb-1">
                  {t("wilaya") || "Wilaya"}
                </label>
                <Select
                  value={selectedWilaya}
                  onValueChange={setSelectedWilaya}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={t("select.wilaya") || "Choisir une wilaya"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {wilayas.map((w) => (
                      <SelectItem key={w.id} value={w.id.toString()}>
                        {w.nom}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Moughataa */}
              <div className="flex flex-col min-w-[220px]">

                <label className="text-sm text-gray-500 mb-1">
                  {t("moughataa") || "Moughataa"}
                </label>
                <Select
                  value={selectedMoughataa}
                  onValueChange={setSelectedMoughataa}
                  disabled={!moughataas.length}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        t("select.moughataa") || "Choisir une moughataa"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {moughataas.map((m: any) => (
                      <SelectItem key={m.id} value={m.id.toString()}>
                        {m.nom}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Commune */}
              <div className="flex flex-col min-w-[220px]">

                <label className="text-sm text-gray-500 mb-1">
                  {t("commune") || "Commune"}
                </label>
                <Select
                  value={selectedCommune}
                  onValueChange={setSelectedCommune}
                  disabled={!communes.length}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        t("select.commune") || "Choisir une commune"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {communes.map((c: any) => (
                      <SelectItem key={c.id} value={c.id.toString()}>
                        {c.nom}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Centre */}
              <div className="flex flex-col w-48">
                <label className="text-sm text-gray-500 mb-1">
                  {t("centre") || "Centre"}
                </label>
                <Select
                  value={selectedCentre}
                  onValueChange={setSelectedCentre}
                  disabled={!centres.length}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={t("select.centre") || "Choisir un centre"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {centres.map((ctr: any) => (
                      <SelectItem key={ctr.id} value={ctr.id.toString()}>
                        {ctr.nom}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Bureau */}
              <div className="flex flex-col w-48">
                <label className="text-sm text-gray-500 mb-1">
                  {t("bureau") || "Bureau"}
                </label>
                <Select
                  value={selectedBureau}
                  onValueChange={setSelectedBureau}
                  disabled={!bureaux.length}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={t("select.bureau") || "Choisir un bureau"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {bureaux.map((b: any) => (
                      <SelectItem key={b.id} value={b.id.toString()}>
                        {b.nom}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-md text-sm text-blue-800">
              {t("current.level") || "Niveau actuel"} : {levelLabel()}
            </div>
          </CardContent>
        </Card>

        {/* STATISTIQUES GLOBALES */}
        {loadingStats ? (
          <p className="text-sm text-gray-500">
            {t("common.loading") || "Chargement..."}
          </p>
        ) : error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : globalStats ? (
          <>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsCards.map((s, i) => {
                const Icon = s.icon
                return (
                  <Card
                    key={i}
                    className="group border-0 shadow-lg hover:shadow-xl transition-transform duration-300 hover:-translate-y-0.5 bg-gradient-to-b from-white to-slate-50 ring-1 ring-slate-100"
                  >
                    <CardHeader className="flex justify-between pb-3">
                      <CardTitle className="text-gray-800 text-sm font-medium">
                        {s.title}
                      </CardTitle>
                      <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-blue-600" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold tracking-tight">
                        {s.value}
                      </div>
                      {s.description && (
                        <CardDescription className="mt-1 text-gray-600">
                          {s.description}
                        </CardDescription>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </section>

            {/* RÉSULTATS DES CANDIDATS */}
            <Card className="bg-gradient-to-br from-white to-blue-50 border-2 border-blue-100 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Vote className="text-blue-600" />{" "}
                  {t("presidential.election") || "Élection présidentielle"} 
                  <Badge className="ml-3 bg-green-100 text-green-700 border-green-200">
                    {t("in.progress") || "En cours"}
                  </Badge>
                </CardTitle>
                <CardDescription>
                 {t("election.date", "Date de l’élection") + ": "}
                 {new Date().toLocaleDateString(language === "ar" ? "ar" : "fr")}
               </CardDescription>

              </CardHeader>
              <CardContent>
                {sortedCandidats.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    {t("results.noData") ||
                      "Aucun résultat disponible pour l’instant."}
                  </p>
                ) : (
                  <ul className="mt-6 space-y-3">
                    {sortedCandidats.map((c, index) => (
                      <li
                        key={c.id}
                        className="flex flex-col md:flex-row md:items-center justify-between border p-4 rounded shadow-sm hover:shadow-md bg-white"
                      >
                        <div className="font-bold text-lg w-20 text-center">
                          {getRank(index)}
                        </div>
                        <div className="flex items-center gap-3 flex-1">
                          {c.logo && (
                            <img
                              src={c.logo}
                              alt={c.nom_fr}
                              className="w-12 h-12 rounded-full border object-cover"
                            />
                          )}
                          <div>
                            <p className="font-semibold">{c.nom_fr}</p>
                            <p
                              className="text-muted-foreground text-sm"
                              dir="rtl"
                            >
                              {c.nom_ar}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mt-3 md:mt-0 w-full md:w-auto">
                          <Badge variant="outline">
                            {c.totalVoix.toLocaleString()}{" "}
                            {t("vote") || "voix"}
                          </Badge>
                          <div className="flex flex-col">
                            <Badge
                              style={{
                                backgroundColor: c.couleur || "#3b82f6",
                              }}
                            >
                              {c.pourcentage.toFixed(1)} %
                            </Badge>
                            <div className="w-full bg-gray-200 h-2 rounded-full mt-1 md:w-24">
                              <div
                                className="h-2 rounded-full"
                                style={{
                                  width: `${c.pourcentage}%`,
                                  backgroundColor: c.couleur || "#3b82f6",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>

            {/* GRAPHIQUES */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Bar Chart */}
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur">
                <CardHeader>
                  <CardTitle>
                    {t("results.by.candidate") || "Résultats par candidat"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RBarChart
                      data={sortedCandidats.map((c) => ({
                        nom: c.nom_fr,
                        totalVoix: c.totalVoix,
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="nom" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="totalVoix">
                        {sortedCandidats.map((c, i) => (
                          <Cell
                            key={i}
                            fill={c.couleur || "#3b82f6"}
                          />
                        ))}
                      </Bar>
                    </RBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Pie Chart */}
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur">
                <CardHeader>
                  <CardTitle>
                    {t("votes.distribution") || "Répartition des voix"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={sortedCandidats.map((c) => ({
                          name: language === "ar" ? c.nom_ar : c.nom_fr,
                          value: parseFloat(c.pourcentage.toFixed(1)),
                        }))}
                        dataKey="value"
                        outerRadius={90}
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {sortedCandidats.map((c, i) => (
                          <Cell
                            key={i}
                            fill={c.couleur || "#3b82f6"}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </section>
          </>
        ) : null}
      </div>
    </DashboardLayout>
  )
}
