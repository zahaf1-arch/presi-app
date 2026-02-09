import { NextResponse } from "next/server"
import { getCentresByCommune } from "@/lib/services/geographic.service"

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

    const centres = await getCentresByCommune(communeId)
    return NextResponse.json(centres)
  } catch (error) {
    console.error("Erreur centres:", error)
    return NextResponse.json(
      { error: "Erreur récupération centres" },
      { status: 500 }
    )
  }
}
