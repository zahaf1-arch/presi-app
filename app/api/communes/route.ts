import { NextResponse } from "next/server"
import { getAllCommunes } from "@/lib/services/geographic.service"

export async function GET() {
  try {
    const communes = await getAllCommunes()
    return NextResponse.json(communes)
  } catch (error) {
    console.error("Erreur commune:", error)
    return NextResponse.json({ error: "Erreur récupération commune" }, { status: 500 })
  }
}
