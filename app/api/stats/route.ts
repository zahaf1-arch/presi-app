import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import type { Candidat, Resultat } from "@prisma/client"

type CandidatWithResults = Candidat & {
  resultats: Resultat[]
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const wilayaId = searchParams.get("wilayaId")
    const moughataaId = searchParams.get("moughataaId")
    const communeId = searchParams.get("communeId")
    const centreId = searchParams.get("centreId")
    const bureauId = searchParams.get("bureauId")

    // Construire le filtre dynamique
    let whereBureau: any = {}
    if (bureauId) whereBureau.id = Number(bureauId)
    else if (centreId) whereBureau.centreId = Number(centreId)
    else if (communeId)
      whereBureau.centre = { communeId: Number(communeId) }
    else if (moughataaId)
      whereBureau.centre = { commune: { moughataaId: Number(moughataaId) } }
    else if (wilayaId)
      whereBureau.centre = { commune: { moughataa: { wilayaId: Number(wilayaId) } } }

    // Récupération des bureaux filtrés avec tous leurs résultats
    const bureaux = await prisma.bureau.findMany({
      where: whereBureau,
      include: {
        resultats: { include: { candidat: true } },
      },
    })

    // --- Cas sans filtres : statistiques globales ---
    if (bureaux.length === 0 && !wilayaId && !moughataaId && !communeId && !centreId && !bureauId) {
      const [
        totalWilayas,
        totalBureaux,
        totalCandidats,
        totalInscritsAgg,
        totalVotantsAgg,
        totalVoixAgg,
      ] = await Promise.all([
        prisma.wilaya.count(),
        prisma.bureau.count(),
        prisma.candidat.count({ where: { actif: true } }),
        prisma.bureau.aggregate({ _sum: { nombreInscrits: true } }),
        prisma.bureau.aggregate({ _sum: { nombreVotants: true } }),
        prisma.resultat.aggregate({ _sum: { nombreVoix: true } }),
      ])

      const bureauxDepouilles = await prisma.bureau.count({
        where: { resultats: { some: {} } },
      })

      const totalInscrits = totalInscritsAgg._sum.nombreInscrits || 0
      const totalVotants = totalVotantsAgg._sum.nombreVotants || 0
      const totalVoix = totalVoixAgg._sum.nombreVoix || 0

      const participationRate = totalInscrits
        ? (totalVotants / totalInscrits) * 100
        : 0

      const pourcentageDepouilles =
        totalBureaux > 0 ? (bureauxDepouilles / totalBureaux) * 100 : 0

      // Résultats par candidat
      const candidatsResults = await prisma.candidat.findMany({
        where: { actif: true },
        include: { resultats: true },
      })

      const candidatsWithVotes = (candidatsResults as CandidatWithResults[])
        .map((candidat) => {
          const totalVoixCandidat = candidat.resultats.reduce(
            (sum, r) => sum + (r.nombreVoix || 0),
            0
          )
          return {
            id: candidat.id,
            nom_fr: candidat.nom_fr,
            nom_ar: candidat.nom_ar,
            photo: candidat.photo,
            logo: candidat.logo,
            couleur: candidat.couleur,
            totalVoix: totalVoixCandidat,
          }
        })
        .sort((a, b) => b.totalVoix - a.totalVoix)

      const totalVoixGlobal = candidatsWithVotes.reduce(
        (sum, c) => sum + c.totalVoix,
        0
      )

      const candidatsWithPercentages = candidatsWithVotes.map((c) => ({
        ...c,
        pourcentage: totalVoixGlobal
          ? (c.totalVoix / totalVoixGlobal) * 100
          : 0,
      }))

      // ✅ Calcul des votes nuls/rejetés : un seul résultat par bureau
      const bureauxAvecResultat = await prisma.bureau.findMany({
        include: { resultats: true },
      })

      let totalNuls = 0
      let totalRejetes = 0

      for (const b of bureauxAvecResultat) {
        if (b.resultats.length > 0) {
          totalNuls += b.resultats[0].voixNuls || 0
          totalRejetes += b.resultats[0].voixRejetes || 0
        }
      }

      return NextResponse.json({
        globalStats: {
          totalWilayas,
          totalBureaux,
          totalCandidats,
          totalInscrits,
          totalVotants,
          totalVoix,
          totalNuls,
          totalRejetes,
          bureauxDepouilles,
          pourcentageDepouilles: Math.round(pourcentageDepouilles * 100) / 100,
          participationRate: Math.round(participationRate * 100) / 100,
        },
        candidatsResults: candidatsWithPercentages,
      })
    }

    // --- Cas filtré ---
    let totalInscrits = 0
    let totalVotants = 0
    let totalNuls = 0
    let totalRejetes = 0
    let totalBureaux = bureaux.length
    let bureauxDepouilles = 0
    const candidatsMap: Record<number, any> = {}

    for (const bureau of bureaux) {
      totalInscrits += bureau.nombreInscrits || 0
      totalVotants += bureau.nombreVotants || 0
      if (bureau.resultats.length > 0) bureauxDepouilles++

      // ✅ Nuls/Rejetés : prendre seulement le premier résultat du bureau
      if (bureau.resultats.length > 0) {
        totalNuls += bureau.resultats[0].voixNuls || 0
        totalRejetes += bureau.resultats[0].voixRejetes || 0
      }

      // Résultats des candidats
      for (const r of bureau.resultats) {
        if (!candidatsMap[r.candidat.id]) {
          candidatsMap[r.candidat.id] = {
            id: r.candidat.id,
            nom_fr: r.candidat.nom_fr,
            nom_ar: r.candidat.nom_ar,
            photo: r.candidat.photo,
            logo: r.candidat.logo,
            couleur: r.candidat.couleur,
            totalVoix: 0,
          }
        }
        candidatsMap[r.candidat.id].totalVoix += r.nombreVoix || 0
      }
    }

    const totalVoix = Object.values(candidatsMap).reduce(
      (sum, c: any) => sum + c.totalVoix,
      0
    )

    const candidatsResults = Object.values(candidatsMap).map((c: any) => ({
      ...c,
      pourcentage: totalVoix > 0 ? (c.totalVoix / totalVoix) * 100 : 0,
    }))

    const totalCandidats = await prisma.candidat.count({ where: { actif: true } })

    const globalStats = {
      totalBureaux,
      bureauxDepouilles,
      pourcentageDepouilles:
        totalBureaux > 0
          ? Math.round((bureauxDepouilles / totalBureaux) * 100)
          : 0,
      totalInscrits,
      totalVotants,
      totalVoix,
      totalNuls,
      totalRejetes,
      participationRate:
        totalInscrits > 0
          ? Math.round((totalVotants / totalInscrits) * 100)
          : 0,
      totalCandidats,
    }

    return NextResponse.json({ globalStats, candidatsResults })
  } catch (error) {
    console.error("Erreur lors du calcul des statistiques:", error)
    return NextResponse.json(
      { error: "Erreur lors du calcul des statistiques" },
      { status: 500 }
    )
  }
}
