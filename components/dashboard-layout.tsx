"use client"

import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n"
import {
  LogOut,
  Globe,
  BarChart3,
  Home,
  BarChart2,
  Users,
  PlusCircle,
  MapPin,
  User,
} from "lucide-react"
import { useState } from "react"
import Link from "next/link"

interface DashboardLayoutProps {
  children: React.ReactNode
  user: {
    id: number
    name: string
    role: string
    wilaya_id?: number | null
    wilaya?: {
      id: number
      nom_fr: string
      nom_ar: string
      code: string
    } | null
  }
}


export function DashboardLayout({ children, user }: DashboardLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { t, language, setLanguage } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      router.replace("/login")
    } catch (err) {
      console.error("Logout failed:", err)
    }
  }

  const toggleLanguage = () => {
    const newLang = language === "fr" ? "ar" : "fr"
    setLanguage(newLang)
  }

  const getNavigation = () => {
    const baseNav = [
      { label: t("nav.table"), href: "/dashboard", icon: Home },
      { label: t("nav.reports"), href: "/dashboard/reports", icon: BarChart2 },
      { label: t("nav.locations"), href: "/dashboard/locations", icon: MapPin },
    ]

    if (user.role === "OPERATOR") {
      baseNav.push({
        label: t("nav.results"),
        href: "/dashboard/results",
        icon: PlusCircle,
      },
    
  )
    }

    if (user.role === "ADMIN") {
      baseNav.push(
        { label: t("nav.results"), href: "/dashboard/results", icon: PlusCircle },
        { label: t("nav.candidates"), href: "/dashboard/candidates", icon: Users },
        { label: t("nav.elections"), href: "/dashboard/elections", icon: BarChart3 },
       
        { label: t("nav.users"), href: "/dashboard/users", icon: User },
      )
    }

    return baseNav
  }

  const navigation = getNavigation()

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white/95 border-b shadow-sm sticky top-0 z-50">
        {/* NIVEAU 1 : logo + user + boutons */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo + titre */}
          <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-90 transition">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-blue-700">{t("app.title")}</h2>
              <p className="text-xs text-gray-500">{t(`roles.${user.role.toLowerCase()}`)}</p>
            </div>
          </Link>

          {/* User + langue + logout */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-sm px-3 py-1.5 bg-blue-50 rounded-lg text-blue-700 font-medium">
              <User className="w-4 h-4" />
              <span>{user.name}</span>
              {user.wilaya && (
                <span className="text-xs text-blue-600 font-semibold">
                  ({language === "ar" ? user.wilaya.nom_ar : user.wilaya.nom_fr})
                </span>
              )}
            </div>

            {/* Bouton langue : Français / العربية */}
            {/* Langue (icône seulement + tooltip) */}
<div className="relative group">
  <Button
    variant="ghost"
    size="icon"
    onClick={toggleLanguage}
    className="text-gray-700 hover:bg-gray-100"
  >
    <Globe className="w-5 h-5" />
  </Button>

  {/* Tooltip */}
  <div
    className="absolute -bottom-8 left-1/2 -translate-x-1/2 
               whitespace-nowrap px-2 py-1 rounded-md text-xs 
               bg-black text-white opacity-0 group-hover:opacity-100 
               pointer-events-none transition-opacity"
  >
    {language === "fr" ? t("common.arabic") : t("common.french")}
  </div>
</div>

{/* Déconnexion (icône seulement + tooltip) */}
<div className="relative group">
  <Button
    variant="ghost"
    size="icon"
    onClick={handleLogout}
    className="text-red-500 hover:bg-red-100"
  >
    <LogOut className="w-5 h-5" />
  </Button>

  {/* Tooltip */}
  <div
    className="absolute -bottom-8 left-1/2 -translate-x-1/2 
               whitespace-nowrap px-2 py-1 rounded-md text-xs 
               bg-black text-white opacity-0 group-hover:opacity-100 
               pointer-events-none transition-opacity"
  >
    {t("common.logout")}
  </div>
</div>

          </div>
        </div>

        {/* NIVEAU 2 : barre de navigation style “tabs” (juste en dessous, sans trait entre les deux) */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-11 flex items-stretch gap-6 bg-white/95">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname.startsWith(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-2 text-sm px-1 transition-colors
                  ${isActive ? "text-blue-600 font-semibold" : "text-gray-500 hover:text-blue-600"}
                `}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : ""}`} />
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute left-0 right-0 bottom-0 h-[3px] bg-blue-600 rounded-full" />
                )}
              </Link>
            )
          })}
        </nav>
      </header>

      {/* CONTENU */}
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">{children}</main>
    </div>
  )
}
