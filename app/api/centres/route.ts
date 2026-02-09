import { NextResponse } from "next/server"
import { getAllCentres } from "@/lib/services/geographic.service"

export async function GET() {
  try {
    const centre = await getAllCentres()
    return NextResponse.json(centre)
  } catch (error) {
    console.error("Erreur centre:", error)
    return NextResponse.json({ error: "Erreur récupération centre" }, { status: 500 })
  }
}
