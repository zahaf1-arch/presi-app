import { NextResponse } from "next/server"
import { getMoughataasByWilaya } from "@/lib/services/geographic.service"

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  // 🔥 IMPORTANT : Turbopack => params est une Promise !
  const { id } = await context.params

  const wilayaId = Number(id)
  if (isNaN(wilayaId)) {
    return NextResponse.json({ error: "ID de wilaya invalide" }, { status: 400 })
  }

  try {
    const moughataas = await getMoughataasByWilaya(wilayaId)
    return NextResponse.json(moughataas)
  } catch (e) {
    console.error("Erreur API moughataas :", e)
    return NextResponse.json(
      { error: "Erreur lors de la récupération des moughataas" },
      { status: 500 }
    )
  }
}
