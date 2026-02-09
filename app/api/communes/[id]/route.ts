import { NextResponse } from "next/server"
import { getCommuneById } from "@/lib/services/geographic.service"

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    const communeId = Number(id)
    if (isNaN(communeId)) {
      return NextResponse.json({ error: "ID invalide" }, { status: 400 })
    }

    const commune = await getCommuneById(communeId)
    return NextResponse.json(commune)
  } catch (error) {
    console.error("Erreur commune:", error)
    return NextResponse.json(
      { error: "Erreur récupération commune" },
      { status: 500 }
    )
  }
}
