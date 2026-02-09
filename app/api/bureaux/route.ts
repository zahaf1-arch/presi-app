import { NextResponse } from "next/server"
import { getAllBureaux } from "@/lib/services/geographic.service"

export async function GET() {
  try {
    const bureau = await getAllBureaux()
    return NextResponse.json(bureau)
  } catch (error) {
    console.error("Erreur bureau:", error)
    return NextResponse.json({ error: "Erreur récupération bureau" }, { status: 500 })
  }
}



