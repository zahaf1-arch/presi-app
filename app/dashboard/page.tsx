"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useLanguage } from "@/lib/i18n"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
  ArrowRight,
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
import clsx from "clsx"
import { CandidateHighlight } from "@/components/CandidateHighlight"

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
  photo: string 
  logo: string | null
  couleur: string | null
  totalVoix: number
  pourcentage: number
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [globalStats, setGlobalStats] = useState<GlobalStats | null>(null)
  const [candidats, setCandidats] = useState<CandidatDash[]>([])
  const [loading, setLoading] = useState(true)

  const router = useRouter()
  const { t, language } = useLanguage()
  const isRTL = language === "ar"

  // Récupération user + stats
  useEffect(() => {
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")

    if (!token || !userData) {
      router.push("/login")
      return
    }

    const parsedUser: User = JSON.parse(userData)
    setUser(parsedUser)
    
    // Récupérer les stats globales
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/stats")
        const data = await res.json()
        setGlobalStats(data.globalStats)
        setCandidats(
  (data.candidatsResults || []).sort(
    (a: CandidatDash, b: CandidatDash) => b.totalVoix - a.totalVoix
  )
)

      } catch (e) {
        console.error("Erreur lors de la récupération des stats:", e)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [router])

  if (!user) return null

  // -------------------------
  // STATS CARDS
  // -------------------------

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
      description: `${globalStats?.bureauxDepouilles ?? 0} ${t("bureauStats.deplouilles") || "dépouillés"} (${globalStats?.pourcentageDepouilles ?? 0}%)`,
      icon: MapPin,
    },
    {
      title: t("total.candidates") || "Candidats",
      value: globalStats?.totalCandidats ?? 0,
      description: t("candidates.registered") || "Candidats enregistrés",
      icon: Vote,
    },
    {
      title: t("participation.rate") || "Taux de participation",
      value: `${globalStats?.participationRate ?? 0}%`,
      description: t("current.rate") || "Actuel",
      icon: TrendingUp,
    },
  ]

  // -------------------------
  // QUICK ACTIONS
  // -------------------------

    // -------------------------
  // QUICK ACTIONS
  // -------------------------

  const quickActions = [
    ...(user.role === "ADMIN"
      ? [
          {
            title: t("geographic.management"),
            desc: t("administrative.hierarchy"),
            href: "/dashboard/locations",
            icon: MapPin,
          },
          {
            title: t("candidates.management"),
            desc: t("presidential.candidates"),
            href: "/dashboard/candidates",
            icon: Users,
          },
          {
            title: t("electoral.results"),
            desc: t("results.management"),
            href: "/dashboard/results",
            icon: BarChart3,
          },
          {
            title: t("reports.statistics"),
            desc: t("electoral.data.analysis"),
            href: "/dashboard/reports",
            icon: TrendingUp,
          },
        ]
      : []),

    ...(user.role === "OPERATOR"
      ? [
          {
            title: t("electoral.results"),
            desc:
              "📍 " +
              (user.wilaya
                ? language === "ar"
                  ? user.wilaya.nom_ar
                  : user.wilaya.nom_fr
                : ""),
            href: "/dashboard/results",
            icon: BarChart3,
          },
        ]
      : []),
  ]


  const getRank = (i: number) =>
    i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}`

  return (
    <DashboardLayout user={user}>
      <div
        dir={isRTL ? "rtl" : "ltr"}
        className="space-y-10"
      >
        {/* HERO / INTRO */}
        <section className="relative rounded-3xl overflow-hidden text-white shadow-[0_10px_40px_-12px_rgba(0,0,0,0.25)] border border-white/10 bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-500">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_40%)]" />
          <div className="relative p-8 md:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm backdrop-blur">
                <Vote className="h-4 w-4" /> {t("app.title")}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                {t("dashboard.welcome")}, {user.name}
              </h1>
              <p className="text-white/85 max-w-2xl leading-relaxed">
                {t("dashboard.subtitle")} - {t(`roles.${user.role.toLowerCase()}`)}

              </p>
            </div>

            <div className="flex gap-6">
              <div className="text-center">
                <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center">
                  <Calendar className="h-6 w-6" />
                </div>
                <p className="mt-2 text-sm">
                  {/* Date fixe ou issue de la DB si tu veux */}
                  {t("election.date") || "Date de l’élection"} : {new Date().toLocaleDateString(language === "ar" ? "ar" : "fr")}
                </p>
              </div>
              <div className="text-center">
                <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center">
                  <Building className="h-6 w-6" />
                </div>
                <p className="mt-2 text-sm">
                  {t("nav.table")}
                </p>
              </div>
            </div>
          </div>
        </section>
                 {/* Candidate Highlight */}
        {candidats.length > 0 && <CandidateHighlight candidats={candidats} />}
        {/* STATS */}
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
                  <div className="text-3xl font-bold tracking-tight">{s.value}</div>
                  <CardDescription className="mt-1 text-gray-600">
                    {s.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </section>

        {/* QUICK ACTIONS */}
        {quickActions.length > 0 && (
  <section>
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-2xl font-semibold">
        {t("quick.actions") || "Actions rapides"}
      </h3>
      <Activity className="text-gray-400" />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {quickActions.map((a, i) => {
        const Icon = a.icon
        return (
          <Link key={i} href={a.href}>
            <Card
              className={clsx(
                "relative overflow-hidden border-0 cursor-pointer",
                "bg-white/80 backdrop-blur",
                "shadow-md hover:shadow-2xl transition-transform hover:-translate-y-0.5"
              )}
            >
              {/* Bandeau dégradé */}
              <div
                className={clsx(
                  "absolute inset-x-0 top-0 h-1 bg-gradient-to-r",
                  "from-blue-500 via-amber-500 to-yellow-500"
                )}
              />

              <CardHeader className="pb-3 flex items-center justify-between">
                <div className="h-11 w-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Icon className="h-5 w-5" />
                </div>
                <ArrowRight className="text-gray-400" />
              </CardHeader>

              <CardContent className="pt-0">
                <CardTitle className="text-base">{a.title}</CardTitle>
                <CardDescription className="text-sm">{a.desc}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  </section>
)}


        {/* RÉSULTATS & GRAPHIQUES */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* CLASSEMENT DES CANDIDATS */}
          <Card className="lg:col-span-2 border-0 shadow-xl bg-white/90 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Vote className="h-5 w-5 text-blue-600" />
                {t("results.by.candidate") || "Résultats par candidat"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {candidats.length === 0 ? (
                <p className="text-sm text-gray-500">
                  {loading
                    ? t("common.loading")
                    : t("results.noData") || "Aucun résultat disponible pour l’instant."}
                </p>
              ) : (
                <ul className="space-y-3">
                  {candidats.map((c, i) => (
                    <li
                      key={c.id}
                      className="flex items-center justify-between rounded-xl border bg-white/80 p-3 hover:bg-white"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl w-8 text-center">{getRank(i)}</span>
                        {c.logo && (
                          <img
                            src={c.logo}
                            alt={c.nom_fr}
                            className="w-10 h-10 rounded-full border object-cover"
                          />
                        )}
                        <div>
                          <p className="font-semibold leading-tight">{c.nom_fr}</p>
                          <p className="text-sm text-gray-500" dir="rtl">
                            {c.nom_ar}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end min-w-40">
                        <Badge variant="outline">
                          {c.totalVoix.toLocaleString()} {t("vote") || "voix"}
                        </Badge>
                        <div className="w-28 bg-gray-200 h-2 rounded-full mt-2 overflow-hidden">
                          <div
                            className="h-2"
                            style={{
                              width: `${c.pourcentage.toFixed(1)}%`,
                              backgroundColor: c.couleur || "#3b82f6",
                            }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 mt-1">
                          {c.pourcentage.toFixed(2)}%
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* GRAPHIQUES */}
          <div className="lg:col-span-3 space-y-6">
            {/* Bar chart */}
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur">
              <CardHeader>
                <CardTitle>{t("results.by.candidate") || "Résultats par candidat"}</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={260}>
                  <RBarChart
                    data={candidats.map((c) => ({
                      nom: c.nom_fr,
                      totalVoix: c.totalVoix,
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="nom" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="totalVoix">
                      {candidats.map((c, i) => (
                        <Cell key={i} fill={c.couleur || "#6366F1"} />
                      ))}
                    </Bar>
                  </RBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Pie chart */}
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur">
              <CardHeader>
                <CardTitle>{t("votes.distribution") || "Répartition des voix"}</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie
                      data={candidats.map((c) => ({
                        name: language === "ar" ? c.nom_ar : c.nom_fr,
                        value: parseFloat(c.pourcentage.toFixed(1)),
                      }))}
                      dataKey="value"
                      outerRadius={90}
                      label={({ value }) => `${value}%`}
                    >
                      {candidats.map((c, i) => (
                        <Cell key={i} fill={c.couleur || "#6366F1"} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </DashboardLayout>
  )
}
