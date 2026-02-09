"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useLanguage } from "@/lib/i18n"

import {
  Trash2,
  Edit2,
  Shield,
  Copy,
  AlertCircle,
  Users,
  UserPlus,
  UserCog,
  Key,
} from "lucide-react"

import { motion } from "framer-motion"

// ------------------------------------------------------
// TYPES
// ------------------------------------------------------
type UserRole = "ADMIN" | "OPERATOR" | "GUEST"

interface Wilaya {
  id: number
  nom_fr: string
  nom_ar: string
}

interface User {
  id: number
  name: string
  email: string
  role: UserRole
  wilaya_id?: number
  temporary_password?: string
  wilaya?: Wilaya
}

// ------------------------------------------------------
// PAGE
// ------------------------------------------------------
export default function UsersPage() {
  const [user, setUser] = useState<any>(null)
  const [users, setUsers] = useState<User[]>([])
  const [wilayas, setWilayas] = useState<Wilaya[]>([])
  const [loading, setLoading] = useState(true)

  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [copiedPassword, setCopiedPassword] = useState<string | null>(null)

  const [formData, setFormData] = useState<{
    name: string
    email: string
    role: UserRole
    wilaya_id: number
  }>({
    name: "",
    email: "",
    role: "OPERATOR",
    wilaya_id: 1,
  })

  const { t, language } = useLanguage()
  const isRTL = language === "ar"
  const router = useRouter()

  // ------------------------------------------------------
  // AUTH + LOAD USERS + WILAYAS
  // ------------------------------------------------------
  useEffect(() => {
    const u = localStorage.getItem("user")
    if (!u) return router.push("/login")

    const parsed = JSON.parse(u)
    if (parsed.role.toLowerCase() !== "admin") return router.push("/dashboard")

    setUser(parsed)
    loadUsers()
    loadWilayas()
  }, [])

  const loadUsers = async () => {
    const res = await fetch("/api/users", { credentials: "include" })
    const data = await res.json()
    setUsers(data)
  }

  const loadWilayas = async () => {
    const res = await fetch("/api/wilayas")
    const data = await res.json()
    setWilayas(data)
  }

  // ------------------------------------------------------
  // CREATE or UPDATE USER
  // ------------------------------------------------------
  const handleSave = async () => {
    if (!formData.name || !formData.email) return

    const url = editingId ? `/api/users/${editingId}` : `/api/users`
    const method = editingId ? "PUT" : "POST"

    const res = await fetch(url, {
      method,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })

    if (res.ok) {
      loadUsers()
      setFormOpen(false)
      setEditingId(null)
      setFormData({
        name: "",
        email: "",
        role: "OPERATOR",
        wilaya_id: 1,
      })
    }
  }

  // ------------------------------------------------------
  // DELETE USER
  // ------------------------------------------------------
  const deleteUser = async (id: number) => {
    if (!confirm(t("common.confirmDelete"))) return

    const res = await fetch(`/api/users/${id}`, {
      method: "DELETE",
      credentials: "include",
    })

    if (res.ok) loadUsers()
  }

  // ------------------------------------------------------
  // RESET PASSWORD
  // ------------------------------------------------------
  const resetPassword = async (id: number) => {
    const res = await fetch(`/api/users/${id}/reset-password`, {
      method: "POST",
      credentials: "include",
    })

    const data = await res.json()

    if (data.password) {
      alert("Nouveau mot de passe : " + data.password)
      loadUsers()
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedPassword(text)
    setTimeout(() => setCopiedPassword(null), 2000)
  }

  if (!user) return null

  // STATS
  const totalAdmins = users.filter((u) => u.role === "ADMIN").length
  const totalOperators = users.filter((u) => u.role === "OPERATOR").length
  const totalGuests = users.filter((u) => u.role === "GUEST").length

  // ------------------------------------------------------
  // UI
  // ------------------------------------------------------
  return (
    <DashboardLayout user={user}>
      <div dir={isRTL ? "rtl" : "ltr"} className="space-y-10">

        {/* HERO */}
        <section className="relative rounded-3xl overflow-hidden text-white shadow-xl border border-white/10 bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-500">
          <div className="relative p-8 md:p-10 flex items-center justify-between">
            <div className="space-y-3">
              <h1 className="text-4xl font-bold flex items-center gap-2">
                <Users className="w-9 h-9" /> {t("users.title")}
              </h1>
              <p className="text-white/80">{t("users.subtitle")}</p>
            </div>

            <Button
              onClick={() => {
                setFormOpen(true)
                setEditingId(null)
                setFormData({
                  name: "",
                  email: "",
                  role: "OPERATOR",
                  wilaya_id: 1,
                })
              }}
              className="bg-white text-blue-700 hover:bg-slate-200"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              {t("common.add")}
            </Button>
          </div>
        </section>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard icon={<Shield />} label={t("roles.admin")} value={totalAdmins} color="red" />
          <StatCard icon={<UserCog />} label={t("roles.operator")} value={totalOperators} color="blue" />
          <StatCard icon={<Users />} label={t("roles.guest")} value={totalGuests} color="green" />
        </div>

        {/* FORM */}
        {formOpen && (
          <div className="bg-white border rounded-xl p-6 shadow-lg space-y-6">
            <h2 className="text-xl font-semibold">
              {editingId ? t("common.edit") : t("common.add")} {t("users.user")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Name */}
              <InputField
                label={t("form.name")}
                value={formData.name}
                
    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
  setFormData({ ...formData, name: e.target.value })
}
               
              />

              {/* Email */}
              <InputField
                label={t("form.email")}
                value={formData.email}
                
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
  setFormData({ ...formData, email: e.target.value })
}



              />

              {/* Role */}
              <div>
                <label className="block text-sm mb-2">{t("users.role")}</label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value as UserRole })
                  }
                  className="w-full border p-2 rounded"
                >
                  <option value="GUEST">{t("roles.guest")}</option>
                  <option value="OPERATOR">{t("roles.operator")}</option>
                  <option value="ADMIN">{t("roles.admin")}</option>
                </select>
              </div>

              {/* Wilaya (only operator) */}
              {formData.role === "OPERATOR" && (
                <div>
                  <label className="block text-sm mb-2">{t("users.wilaya")}</label>
                  <select
                    value={formData.wilaya_id}
                    onChange={(e) =>
                      setFormData({ ...formData, wilaya_id: Number(e.target.value) })
                    }
                    className="w-full border p-2 rounded"
                  >
                    {wilayas.map((w) => (
                      <option key={w.id} value={w.id}>
                        {language === "fr" ? w.nom_fr : w.nom_ar}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave} className="bg-blue-600 text-white">
                {t("common.save")}
              </Button>

              {editingId && (
                <Button
                  variant="outline"
                  className="border-yellow-600 text-yellow-600"
                  onClick={() => resetPassword(editingId)}
                >
                  <Key className="w-4 h-4 mr-2" />
                  {t("users.resetPassword")}
                </Button>
              )}

              <Button variant="outline" onClick={() => setFormOpen(false)}>
                {t("common.cancel")}
              </Button>
            </div>
          </div>
        )}

        {/* TABLE */}
        <div className="bg-white border rounded-xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <Th>{t("form.name")}</Th>
                <Th>{t("form.email")}</Th>
                <Th>{t("users.role")}</Th>
                <Th>{t("users.wilaya")}</Th>
                <Th>{t("users.tempPassword")}</Th>
                <Th className="text-right">{t("users.actions")}</Th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b hover:bg-slate-50">
                  <Td>{u.name}</Td>
                  <Td className="text-slate-500">{u.email}</Td>

                  <Td>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-blue-600" />
                      {t(`roles.${u.role.toLowerCase()}`)}
                    </div>
                  </Td>

                  <Td>
                    {u.wilaya
                      ? language === "fr"
                        ? u.wilaya.nom_fr
                        : u.wilaya.nom_ar
                      : "-"}
                  </Td>

                  <Td>
                    {u.temporary_password ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(u.temporary_password!)}
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        {copiedPassword === u.temporary_password
                          ? t("common.copied")
                          : t("common.copy")}
                      </Button>
                    ) : (
                      "-"
                    )}
                  </Td>

                  <Td className="flex justify-end gap-2 py-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingId(u.id)
                        setFormData({
                          name: u.name,
                          email: u.email,
                          role: u.role,
                          wilaya_id: u.wilaya_id || 1,
                        })
                        setFormOpen(true)
                      }}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 border-red-600"
                      onClick={() => deleteUser(u.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}

// ------------------------------------------------------
// COMPONENTS
// ------------------------------------------------------
function StatCard({ icon, label, value, color }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border p-6 shadow-md flex items-center gap-4"
    >
      <div className={`h-12 w-12 rounded-xl bg-${color}-100 flex items-center justify-center`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </motion.div>
  )
}

function InputField({ label, value, onChange }: any) {
  return (
    <div>
      <label className="block text-sm mb-2">{label}</label>
      <Input value={value} onChange={onChange} />
    </div>
  )
}

function Th({ children, className = "" }: any) {
  return (
    <th className={`px-6 py-3 text-left text-sm font-semibold ${className}`}>
      {children}
    </th>
  )
}

function Td({ children, className = "" }: any) {
  return (
    <td className={`px-6 py-4 ${className}`}>
      {children}
    </td>
  )
}
