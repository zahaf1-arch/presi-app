import { NextResponse, type NextRequest } from "next/server"
import { getAllWilayas } from "@/lib/services/geographic.service"


export async function GET() {
  try {    
    const wilayas = await getAllWilayas()
    return NextResponse.json(wilayas)
  } catch (error) {
    console.error("Error fetching wilayas:", error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération des wilayas" },
      { status: 500 }
    )
  }
}
