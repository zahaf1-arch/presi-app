import { NextResponse } from "next/server"
import { getWilayaById } from "@/lib/services/geographic.service"

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    const wilayaId = Number(id)
    if (isNaN(wilayaId)) {
      return NextResponse.json({ error: "ID invalide" }, { status: 400 })
    }

    const wilaya = await getWilayaById(wilayaId)
    return NextResponse.json(wilaya)
  } catch (error) {
    console.error("Erreur wilaya:", error)
    return NextResponse.json(
      { error: "Erreur récupération wilaya" },
      { status: 500 }
    )
  }
}
