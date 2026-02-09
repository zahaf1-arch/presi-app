import XLSX from "xlsx"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
function formatCodeWilaya(code: any) {
  return String(code).padStart(2, "0")
}
function normalizeName(value: any) {
  return String(value)
    .trim()
    .replace(/\s+/g, " ")
}

async function main() {
  const workbook = XLSX.readFile("data/resultats.xlsx")
  const sheet = workbook.Sheets[workbook.SheetNames[0]]
  const rows: any[] = XLSX.utils.sheet_to_json(sheet)

  for (const row of rows) {
    // 1️⃣ Bureau (déjà existant)
    const bureau = await prisma.bureau.findFirst({
  where: {
    nom_fr: normalizeName(row.bureau),
    centre: {
      commune: {
        moughataa: {
          wilaya: {
            code: formatCodeWilaya(row.codeWilaya),
          },
        },
      },
    },
  },
})


    if (!bureau) {
  console.warn("❌ Bureau introuvable :", {
    bureauExcel: row.bureau,
    bureauNormalise: normalizeName(row.bureau),
    codeWilayaDB: formatCodeWilaya(row.codeWilaya),
  })
  continue
}

    // 2️⃣ Candidat

  const candidatNom = normalizeName(row.Candidat)

let candidat = await prisma.candidat.findFirst({
  where: {
    nom_fr: candidatNom,
  },
})

if (!candidat) {
  candidat = await prisma.candidat.create({
    data: {
      nom_fr: candidatNom,
      nom_ar: normalizeName(row.CandidatAr),
      couleur: "#000000",
    },
  })
}


    // 3️⃣ Type d’élection
    let electionType = await prisma.electionType.findFirst({
  where: {
    nom_fr: row.Type,
  },
})

if (!electionType) {
  electionType = await prisma.electionType.create({
    data: {
      nom_fr: row.Type,
      nom_ar: row.TypeAr,
    },
  })
}


    // 4️⃣ Résultat
    await prisma.resultat.upsert({
      where: {
        unique_result: {
          electionTypeId: electionType.id,
          bureauId: bureau.id,
          candidatId: candidat.id,
        },
      },
      update: {
        nombreVoix: row.nb_vote,
        voixNuls: row.nb_votant_null,
        voixRejetes: row.nb_votant_neutre,
      },
      create: {
        electionTypeId: electionType.id,
        bureauId: bureau.id,
        candidatId: candidat.id,
        nombreVoix: row.nb_vote,
        voixNuls: row.nb_votant_null,
        voixRejetes: row.nb_votant_neutre,
      },
    })

    // 5️⃣ Mise à jour du bureau
    await prisma.bureau.update({
      where: { id: bureau.id },
      data: {
        
        nombreVotants: row.nb_bulletin,
      },
    })
  }

  console.log("✅ Import des résultats terminé")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
