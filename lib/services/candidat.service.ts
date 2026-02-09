import { prisma } from "@/lib/prisma"

export async function getAllCandidats() {
  return prisma.candidat.findMany({
    orderBy: {
      nom_fr: "asc",
    },
  })
}

export async function getCandidatById(id: number) {
  return prisma.candidat.findUnique({
    where: { id },
  })
}

export async function createCandidat(data: {
  nom_fr: string
  nom_ar: string
  couleur: string
  logo?: string
  actif?: boolean
}) {
  return prisma.candidat.create({
    data,
  })
}

export async function updateCandidat(
  id: number,
  data: {
    nom_fr?: string
    nom_ar?: string
    couleur?: string
    logo?: string
    actif?: boolean
  },
) {
  return prisma.candidat.update({
    where: { id },
    data,
  })
}

export async function deleteCandidat(id: number) {
  return prisma.candidat.delete({
    where: { id },
  })
}
