import { NextResponse } from "next/server"
import { getCentreById } from "@/lib/services/geographic.service"

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    const centreId = Number(id)
    if (isNaN(centreId)) {
      return NextResponse.json({ error: "ID invalide" }, { status: 400 })
    }

    const centre = await getCentreById(centreId)
    return NextResponse.json(centre)
  } catch (error) {
    console.error("Erreur centre:", error)
    return NextResponse.json(
      { error: "Erreur récupération centre" },
      { status: 500 }
    )
  }
}
