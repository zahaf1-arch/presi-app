import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import jwt from "jsonwebtoken"

// GET ➤ liste candidats actifs
export async function GET() {
  try {
    const candidates = await prisma.candidat.findMany({
      where: { actif: true },
      orderBy: { id: "asc" },
    })
    return NextResponse.json(candidates)
  } catch (error) {
    console.error("GET candidats error:", error)
    return NextResponse.json({ error: "Failed to fetch candidates" }, { status: 500 })
  }
}

// POST ➤ créer candidat (ADMIN ONLY)
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)
    if (!decoded.role || decoded.role.toLowerCase() !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { nom_fr, nom_ar, couleur, photo, logo } = await request.json()

    const created = await prisma.candidat.create({
      data: {
        nom_fr,
        nom_ar,
        couleur,
        photo,   // peut être null ou "/uploads/xxx.png"
        logo,
        actif: true,
      },
    })

    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    console.error("POST candidat error:", error)
    return NextResponse.json({ error: "Failed to create" }, { status: 500 })
  }
}

// PUT ➤ modifier candidat (ADMIN ONLY)
export async function PUT(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)
    if (!decoded.role || decoded.role.toLowerCase() !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { id, nom_fr, nom_ar, couleur, photo, logo } = await request.json()

    const updated = await prisma.candidat.update({
      where: { id },
      data: {
        nom_fr,
        nom_ar,
        couleur,
        photo,
        logo,
      },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error("PUT candidat error:", error)
    return NextResponse.json({ error: "Failed to update" }, { status: 500 })
  }
}

// DELETE ➤ désactiver candidat (soft delete)
export async function DELETE(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)
    if (!decoded.role || decoded.role.toLowerCase() !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { id } = await request.json()

    await prisma.candidat.update({
      where: { id },
      data: { actif: false },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("DELETE candidat error:", error)
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 })
  }
}
