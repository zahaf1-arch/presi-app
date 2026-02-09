import { prisma } from "@/lib/prisma"

export async function getAllWilayas() {
  return prisma.wilaya.findMany({
    include: {
      _count: {
        select: {
          moughataas: true,
        },
      },
    },
    orderBy: {
      nom_fr: "asc",
    },
  })
}

export async function getWilayaById(id: number) {
  return prisma.wilaya.findUnique({
    where: { id },
    include: {
      moughataas: {
        include: {
          _count: {
            select: {
              communes: true,
            },
          },
        },
      },
    },
  })
}

export async function getMoughataasByWilaya(wilayaId: number) {
  return prisma.moughataa.findMany({
    where: { wilayaId },
    include: {
      _count: {
        select: {
          communes: true,
        },
      },
    },
    orderBy: {
      nom_fr: "asc",
    },
  })
}
export async function getAllMoughataas() {
  return prisma.moughataa.findMany({
    include: {
      wilaya: true,
      _count: {
        select: {
          communes: true,
        },
      },
    },
    orderBy: {
      nom_fr: "asc",
    },
  })
}
export async function getMoughataaById(id: number) {
  return prisma.moughataa.findUnique({
    where: { id },
    include: {
      communes: {
        include: {
          _count: {
            select: { centres: true },
          },
        },
      },
      wilaya: true,
    },
  })
}
export async function getCommunesByMoughataa(moughataaId: number) {
  return prisma.commune.findMany({
    where: { moughataaId },
    include: {
      _count: {
        select: {
          centres: true,
        },
      },
    },
    orderBy: {
      nom_fr: "asc",
    },
  })
}
export async function getAllCommunes() {
  return prisma.commune.findMany({
    include: {
      moughataa: {
        include: { wilaya: true },
      },
      _count: {
        select: { centres: true },
      },
    },
    orderBy: {
      nom_fr: "asc",
    },
  })
}
export async function getCommuneById(id: number) {
  return prisma.commune.findUnique({
    where: { id },
    include: {
      centres: {
        include: {
          _count: {
            select: { bureaux: true },
          },
        },
      },
      moughataa: {
        include: { wilaya: true },
      },
    },
  })
}
export async function getAllCentres() {
  return prisma.centre.findMany({
    include: {
      commune: {
        include: {
          moughataa: {
            include: { wilaya: true },
          },
        },
      },
      _count: {
        select: { bureaux: true },
      },
    },
    orderBy: {
      nom_fr: "asc",
    },
  })
}
export async function getCentreById(id: number) {
  return prisma.centre.findUnique({
    where: { id },
    include: {
      bureaux: true,
      commune: {
        include: {
          moughataa: {
            include: { wilaya: true },
          },
        },
      },
    },
  })
}

export async function getCentresByCommune(communeId: number) {
  return prisma.centre.findMany({
    where: { communeId },
    include: {
      _count: {
        select: {
          bureaux: true,
        },
      },
    },
    orderBy: {
      nom_fr: "asc",
    },
  })
}


export async function getBureauxByCentre(centreId: number) {
  return prisma.bureau.findMany({
    where: { centreId },
    include: {
      resultats: {
        select: { id: true } // on n’a besoin que de savoir s’il existe un résultat
      },
    },
    orderBy: { nom_fr: "asc" },
  })
}
export async function getAllBureaux() {
  return prisma.bureau.findMany({
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
    orderBy: {
      nom_fr: "asc",
    },
  })
}
export async function getBureauById(id: number) {
  return prisma.bureau.findUnique({
    where: { id },
    select: {
      id: true,
      nom_fr: true,
      nombreInscrits: true,
      nombreVotants: true,
      centre: {
        include: {
          commune: {
            include: {
              moughataa: {
                include: { wilaya: true },
              },
            },
          },
        },
      },
    },
  })
}
