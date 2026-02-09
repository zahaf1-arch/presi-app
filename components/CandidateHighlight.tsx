"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

interface Candidate {
  id: number
  nom_fr: string
  nom_ar: string
  logo?: string | null 
  photo?: string
  totalVoix: number
  pourcentage: number
}

type CandidateHighlightProps = {
  candidats: Candidate[]
}

export function CandidateHighlight({ candidats }: CandidateHighlightProps) {
  const [index, setIndex] = React.useState(0)
  const [direction, setDirection] = React.useState(0)
  const { t } = useLanguage()
  const selected = candidats[index]

  React.useEffect(() => {
    if (!candidats.length) return
    const interval = setInterval(() => goNext(), 4000)
    return () => clearInterval(interval)
  }, [index, candidats])

  const goNext = () => {
    setDirection(1)
    setIndex((prev) => (prev + 1) % candidats.length)
  }

  const goPrev = () => {
    setDirection(-1)
    setIndex((prev) => (prev - 1 + candidats.length) % candidats.length)
  }

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x < -50) goNext()
    else if (info.offset.x > 50) goPrev()
  }

  const getPhotoUrl = (c: Candidate) => {
    if (!c.photo) return "/candidate1.jpg"
    return c.photo.startsWith("/") ? c.photo : `/uploads/${c.photo}`
  }

  if (!selected) return null

  return (
    <div className="mb-10 relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={selected.id}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.8}
          onDragEnd={handleDragEnd}
          initial={{ opacity: 0, x: direction === 1 ? 120 : -120 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction === 1 ? -120 : 120 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="bg-white/90 backdrop-blur shadow-xl border-0 relative overflow-hidden">

            {/* Boutons précédent/suivant */}
            <button
              onClick={goPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={goNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Contenu principal : 2 colonnes */}
            <CardContent className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-8 py-6 px-25">


              {/* Colonne infos (logo, noms, résultats) */}
              <div className="flex flex-col justify-center space-y-4">
                {selected.logo && (
                  <img
                    src={selected.logo}
                    alt="Logo"
                    className="w-20 h-20 object-contain"
                  />
                )}
                <h2 className="text-2xl font-bold text-gray-800" >{selected.nom_ar}</h2>
                <h2 className="text-2xl font-bold text-gray-800">{selected.nom_fr}</h2>
                  {/* 🔹 Résultats en grand */}
  <p className="text-4xl font-bold text-blue-800">{selected.totalVoix.toLocaleString()} {t("vote")}</p>
  <p className="text-4xl font-bold text-green-600">{selected.pourcentage.toFixed(2)} %</p>

              </div>

              {/* Colonne photo */}
              <div className="flex justify-center">
                <motion.img
                  src={getPhotoUrl(selected)}
                  alt={selected.nom_fr}
                  className="w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] lg:w-[440px] lg:h-[440px] object-cover rounded-2xl shadow-2xl"
                  onError={(e) => { e.currentTarget.src = "/candidate1.jpg" }}
                />
              </div>

            </CardContent>

            {/* Indicateurs */}
            <div className="flex justify-center gap-2 pb-4">
              {candidats.map((_, i) => (
                <span
                  key={i}
                  className={`w-3 h-3 rounded-full transition ${i === index ? "bg-blue-600 scale-110" : "bg-gray-300"}`}
                />
              ))}
            </div>

          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
