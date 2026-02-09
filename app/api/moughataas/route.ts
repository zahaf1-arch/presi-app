import { NextResponse } from "next/server"
import { getAllMoughataas } from "@/lib/services/geographic.service"

export async function GET() {
  try {
    const moughataas = await getAllMoughataas()
    return NextResponse.json(moughataas)
  } catch (error) {
    console.error("Erreur moughataa:", error)
    return NextResponse.json({ error: "Erreur récupération moughataa" }, { status: 500 })
  }
}
