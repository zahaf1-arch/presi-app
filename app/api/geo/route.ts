import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const lang = searchParams.get("lang") || "fr"
    const isArabic = lang === "ar"

    const wilayas = await prisma.wilaya.findMany({
      include: {
        moughataas: {
          include: {
            communes: {
              include: {
                centres: {
                  include: {
                    bureaux: {
                      include: {
                        resultats: {
                          include: {
                            candidat: true,
                            electionType: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      orderBy: { nom_fr: "asc" },
    })

    const wilayasWithStats = wilayas.map((w) => {
      const moughataas = Array.isArray(w.moughataas) ? w.moughataas : []

      const mappedMoughataas = moughataas.map((m) => {
        const communes = Array.isArray(m.communes) ? m.communes : []

        const mappedCommunes = communes.map((c) => {
          const centres = Array.isArray(c.centres) ? c.centres : []

          const mappedCentres = centres.map((ctr) => {
            const bureaux = Array.isArray(ctr.bureaux) ? ctr.bureaux : []

            const mappedBureaux = bureaux.map((b) => {
              const resultats = Array.isArray(b.resultats) ? b.resultats : []

              const totalInscrits = b.nombreInscrits ?? 0
              const totalVotants = b.nombreVotants ?? 0

              return {
                id: b.id,
                nom: isArabic ? b.nom_ar : b.nom_fr,
                totalInscrits,
                totalVotants,
                tauxParticipation:
                  totalInscrits > 0
                    ? Math.round((totalVotants / totalInscrits) * 10000) / 100
                    : 0,

                resultats: resultats.map((r) => ({
                  id: r.id,
                  candidatId: r.candidatId,
                  candidatNom: isArabic ? r.candidat.nom_ar : r.candidat.nom_fr,
                  candidatCouleur: r.candidat.couleur,
                  candidatLogo: r.candidat.logo,
                  nombreVoix: r.nombreVoix ?? 0,
                  voixNuls: r.voixNuls ?? 0,
                  voixRejetes: r.voixRejetes ?? 0,
                  electionType: isArabic
                    ? r.electionType.nom_ar
                    : r.electionType.nom_fr,
                })),
              }
            })

            const totalInscrits = mappedBureaux.reduce((s, x) => s + x.totalInscrits, 0)
            const totalVotants = mappedBureaux.reduce((s, x) => s + x.totalVotants, 0)

            return {
              id: ctr.id,
              nom: isArabic ? ctr.nom_ar : ctr.nom_fr,
              bureaux: mappedBureaux,
              totalInscrits,
              totalVotants,
              tauxParticipation:
                totalInscrits > 0
                  ? Math.round((totalVotants / totalInscrits) * 10000) / 100
                  : 0,
            }
          })

          const totalInscrits = mappedCentres.reduce((s, x) => s + x.totalInscrits, 0)
          const totalVotants = mappedCentres.reduce((s, x) => s + x.totalVotants, 0)

          return {
            id: c.id,
            nom: isArabic ? c.nom_ar : c.nom_fr,
            centres: mappedCentres,
            totalInscrits,
            totalVotants,
            tauxParticipation:
              totalInscrits > 0
                ? Math.round((totalVotants / totalInscrits) * 10000) / 100
                : 0,
          }
        })

        const totalInscrits = mappedCommunes.reduce((s, x) => s + x.totalInscrits, 0)
        const totalVotants = mappedCommunes.reduce((s, x) => s + x.totalVotants, 0)

        return {
          id: m.id,
          nom: isArabic ? m.nom_ar : m.nom_fr,
          communes: mappedCommunes,
          totalInscrits,
          totalVotants,
          tauxParticipation:
            totalInscrits > 0
              ? Math.round((totalVotants / totalInscrits) * 10000) / 100
              : 0,
        }
      })

      const totalInscrits = mappedMoughataas.reduce((s, x) => s + x.totalInscrits, 0)
      const totalVotants = mappedMoughataas.reduce((s, x) => s + x.totalVotants, 0)

      return {
        id: w.id,
        nom: isArabic ? w.nom_ar : w.nom_fr,
        moughataas: mappedMoughataas,
        totalInscrits,
        totalVotants,
        tauxParticipation:
          totalInscrits > 0
            ? Math.round((totalVotants / totalInscrits) * 10000) / 100
            : 0,
      }
    })

    return NextResponse.json(wilayasWithStats)
  } catch (error) {
    console.error("Erreur chargement géographie:", error)
    return NextResponse.json(
      { error: "Erreur de chargement des données" },
      { status: 500 }
    )
  }
}
