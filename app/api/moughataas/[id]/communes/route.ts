import { NextResponse } from "next/server"
import { getCommunesByMoughataa } from "@/lib/services/geographic.service"

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    const moughataaId = Number(id)
    if (isNaN(moughataaId)) {
      return NextResponse.json({ error: "ID invalide" }, { status: 400 })
    }

    const communes = await getCommunesByMoughataa(moughataaId)
    return NextResponse.json(communes)
  } catch (error) {
    console.error("Erreur communes:", error)
    return NextResponse.json(
      { error: "Erreur récupération communes" },
      { status: 500 }
    )
  }
}
