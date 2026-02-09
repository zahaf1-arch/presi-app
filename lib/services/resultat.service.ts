// lib/services/resultat.service.ts
import { prisma } from "@/lib/prisma"
import { UserRole } from "@/lib/auth"

export interface ResultatMapped {
  id: number
  bureau: { id: number; nom_fr: string }
  centre: { id: number; nom_fr: string }
  candidat: { nom_fr: string; nom_ar: string; logo?: string; couleur?: string }
  nombre_voix: number
  voix_nuls: number
  voix_rejetes: number
  wilaya: { id: number; nom_fr: string }
}

export interface SyntheseCandidat {
  candidat: string
  candidat_ar: string
  total_voix: number
  pourcentage: number
  couleur?: string
  logo?: string
}

export async function getResultatsByElection(
  electionTypeId: number,
  user?: { id: number; role: UserRole; wilayaId: number | null } | null
): Promise<{ resultats: ResultatMapped[]; synthese: SyntheseCandidat[] }> {
  const where: any = { electionTypeId }

  // Limitation pour opérateur
  if (user?.role === "operator" && user.wilayaId) {
    where.bureau = {
      centre: {
        commune: {
          moughataa: {
            wilayaId: user.wilayaId,
          },
        },
      },
    }
  }

  const resultats = await prisma.resultat.findMany({
    where,
    include: {
      bureau: {
        include: {
          centre: {
            include: {
              commune: {
                include: {
                  moughataa: { include: { wilaya: true } },
                },
              },
            },
          },
        },
      },
      candidat: true,
    },
  })

  // Mapping front
  const mapped: ResultatMapped[] = resultats.map((r) => ({
  id: r.id,
  bureau: { id: r.bureau.id, nom_fr: r.bureau.nom_fr },
  centre: { id: r.bureau.centre.id, nom_fr: r.bureau.centre.nom_fr },
  candidat: {
    nom_fr: r.candidat.nom_fr,
    nom_ar: r.candidat.nom_ar,
    logo: r.candidat.logo ?? undefined, // <- normalisation
    couleur: r.candidat.couleur ?? undefined, // <- normalisation
  },
  nombre_voix: r.nombreVoix ?? 0,
  voix_nuls: r.voixNuls ?? 0,
  voix_rejetes: r.voixRejetes ?? 0,
  wilaya: {
    id: r.bureau.centre.commune.moughataa.wilaya.id,
    nom_fr: r.bureau.centre.commune.moughataa.wilaya.nom_fr,
  },
}))

  // Synthèse
  const syntheseMap = new Map<number, { nom_fr: string; nom_ar: string; total_voix: number; couleur?: string; logo?: string }>()

  for (const r of resultats) {
    const prev = syntheseMap.get(r.candidatId) || {
      nom_fr: r.candidat.nom_fr,
      nom_ar: r.candidat.nom_ar,
      total_voix: 0,
      couleur: r.candidat.couleur ?? "#3b82f6",
      logo: r.candidat.logo ?? "/placeholder.svg",
    }
    prev.total_voix += r.nombreVoix ?? 0
    syntheseMap.set(r.candidatId, prev)
  }

  const totalGlobal = Array.from(syntheseMap.values()).reduce((sum, c) => sum + c.total_voix, 0)
  const synthese = Array.from(syntheseMap.values()).map((c) => ({
    candidat: c.nom_fr,
    candidat_ar: c.nom_ar,
    total_voix: c.total_voix,
    pourcentage: totalGlobal ? (c.total_voix / totalGlobal) * 100 : 0,
    couleur: c.couleur,
    logo: c.logo,
  }))

  return { resultats: mapped, synthese }
}
export async function getResultatsByWilaya(electionTypeId: number, wilayaId: number) {
  return prisma.resultat.findMany({
    where: {
      electionTypeId,
      bureau: {
        centre: {
          commune: {
            moughataa: {
              wilayaId,
            },
          },
        },
      },
    },
    include: {
      bureau: {
        include: {
          centre: {
            include: {
              commune: {
                include: {
                  moughataa: {
                    include: {
                      wilaya: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
      candidat: true,
      electionType: true,
    },
  })
}

export async function createOrUpdateResultat(data: {
  electionTypeId: number
  bureauId: number
  candidatId: number
  nombreVoix: number
  voixNuls?: number
  voixRejetes?: number
}) {
  return prisma.resultat.upsert({
    where: {
      unique_result: {
        electionTypeId: data.electionTypeId,
        bureauId: data.bureauId,
        candidatId: data.candidatId,
      },
    },
    update: {
      nombreVoix: data.nombreVoix,
      voixNuls: data.voixNuls || 0,
      voixRejetes: data.voixRejetes || 0,
    },
    create: data,
  })
}

export async function getSyntheseByCandidats(electionTypeId: number) {
  const resultats = await prisma.resultat.groupBy({
    by: ["candidatId"],
    where: { electionTypeId },
    _sum: {
      nombreVoix: true,
      voixNuls: true,
      voixRejetes: true,
    },
  })

  const candidats = await prisma.candidat.findMany({
    where: {
      id: {
        in: resultats.map((r) => r.candidatId),
      },
    },
  })

  return resultats.map((resultat) => {
    const candidat = candidats.find((c) => c.id === resultat.candidatId)
    return {
      candidat,
      totalVoix: resultat._sum.nombreVoix || 0,
      voixNuls: resultat._sum.voixNuls || 0,
      voixRejetes: resultat._sum.voixRejetes || 0,
    }
  })
}
