'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLanguage } from '@/lib/i18n'
import { DashboardLayout } from '@/components/dashboard-layout'
import { Plus, Trash2, Edit2 } from 'lucide-react'

interface Election {
  id: number
  nom_fr: string
  nom_ar: string
  dateElection: string
  actif: boolean
}

export default function ElectionsPage() {
  const [user, setUser] = useState<any>(null)
  const [elections, setElections] = useState<Election[]>([])
  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    nom_fr: '',
    nom_ar: '',
    dateElection: '',
  })
  const router = useRouter()
  const { t, language } = useLanguage()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (!token || !userData) {
      router.push('/login')
      return
    }

    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== 'admin') {
      router.push('/dashboard')
      return
    }

    setUser(parsedUser)
    loadElections()
  }, [router])

  const loadElections = async () => {
    // Demo data
    setElections([
      {
        id: 1,
        nom_fr: 'Élection 2025',
        nom_ar: 'الانتخابات 2025',
        dateElection: '2025-06-15',
        actif: true,
      },
    ])
  }

  const handleSave = async () => {
    if (!formData.nom_fr || !formData.nom_ar || !formData.dateElection) return

    if (editingId) {
      setElections(
        elections.map(e =>
          e.id === editingId ? { ...e, ...formData } : e
        )
      )
      setEditingId(null)
    } else {
      setElections([
        ...elections,
        {
          id: Date.now(),
          ...formData,
          actif: true,
        },
      ])
    }

    setFormData({ nom_fr: '', nom_ar: '', dateElection: '' })
    setFormOpen(false)
  }

  if (!user) return null

  return (
    <DashboardLayout user={user}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">
              {t('elections.title')}
            </h1>
            <p className="text-slate-400 mt-1">{t('elections.subtitle')}</p>
          </div>
          <Button
            onClick={() => {
              setFormOpen(true)
              setEditingId(null)
              setFormData({ nom_fr: '', nom_ar: '', dateElection: '' })
            }}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t('common.add')}
          </Button>
        </div>

        {formOpen && (
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
            <h2 className="text-lg font-semibold text-white">
              {editingId ? t('common.edit') : t('common.add')} {t('elections.title')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-200 mb-2">
                  {t('form.name')} (FR)
                </label>
                <Input
                  value={formData.nom_fr}
                  onChange={(e) =>
                    setFormData({ ...formData, nom_fr: e.target.value })
                  }
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-200 mb-2">
                  {t('form.name')} (AR)
                </label>
                <Input
                  value={formData.nom_ar}
                  onChange={(e) =>
                    setFormData({ ...formData, nom_ar: e.target.value })
                  }
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm text-slate-200 mb-2">
                  Date de l'élection
                </label>
                <Input
                  type="date"
                  value={formData.dateElection}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dateElection: e.target.value,
                    })
                  }
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {t('common.save')}
              </Button>
              <Button
                onClick={() => {
                  setFormOpen(false)
                  setEditingId(null)
                  setFormData({ nom_fr: '', nom_ar: '', dateElection: '' })
                }}
                variant="outline"
                className="border-slate-600"
              >
                {t('common.cancel')}
              </Button>
            </div>
          </div>
        )}

        <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700 border-b border-slate-600">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                    {language === 'fr' ? 'Nom' : 'الاسم'}
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                    {language === 'fr' ? 'Date' : 'التاريخ'}
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                    {language === 'fr' ? 'Statut' : 'الحالة'}
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-white">
                    {language === 'fr' ? 'Actions' : 'الإجراءات'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {elections.map(election => (
                  <tr
                    key={election.id}
                    className="border-b border-slate-700 hover:bg-slate-700/50"
                  >
                    <td className="px-6 py-4 text-white">
                      {language === 'fr'
                        ? election.nom_fr
                        : election.nom_ar}
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      {new Date(election.dateElection).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-green-900/30 text-green-300 px-3 py-1 rounded-full text-sm">
                        {election.actif ? 'Actif' : 'Inactif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                      <Button size="sm" variant="outline" className="border-slate-600">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-700 text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
