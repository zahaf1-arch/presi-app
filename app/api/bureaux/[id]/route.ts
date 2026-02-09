import { NextResponse } from "next/server"
import { getBureauById } from "@/lib/services/geographic.service"
import { prisma } from "@/lib/prisma"
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    const bureauId = Number(id)
    if (isNaN(bureauId)) {
      return NextResponse.json({ error: "ID invalide" }, { status: 400 })
    }

    const bureau = await getBureauById(bureauId)
    return NextResponse.json(bureau)
  } catch (error) {
    console.error("Erreur bureau:", error)
    return NextResponse.json(
      { error: "Erreur récupération bureau" },
      { status: 500 }
    )
  }
}



// ===== PUT — Mise à jour votants / inscrits =====
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params   // ⬅️ même logique que GET !
    const bureauId = Number(id)

    if (isNaN(bureauId)) {
      return NextResponse.json({ error: "ID invalide" }, { status: 400 })
    }

    // Données envoyées depuis ton front (ResultsPage.tsx)
    const { nombreVotants, nombreInscrits } = await req.json()

    // Mise à jour dans la base
    const bureau = await prisma.bureau.update({
      where: { id: bureauId },
      data: {
        nombreVotants: Number(nombreVotants) ?? undefined,
        
      }
    })

    return NextResponse.json({ success: true, bureau })

  } catch (error) {
    console.error("PUT /bureaux/[id] ERROR:", error)
    return NextResponse.json({ error: "Erreur mise à jour" }, { status: 500 })
  }
}
