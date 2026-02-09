import { NextResponse } from "next/server"
import { getMoughataaById } from "@/lib/services/geographic.service"

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

    const moughataa = await getMoughataaById(moughataaId)
    return NextResponse.json(moughataa)
  } catch (error) {
    console.error("Erreur moughataa:", error)
    return NextResponse.json(
      { error: "Erreur récupération moughataa" },
      { status: 500 }
    )
  }
}
