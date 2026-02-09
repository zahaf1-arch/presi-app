import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    const token = request.cookies.get("token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)
    if (decoded.role?.toLowerCase() !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // 🔐 MOT DE PASSE FIXE
    const DEFAULT_PASSWORD = "123456789"

    const hashed = await bcrypt.hash(DEFAULT_PASSWORD, 10)

    await prisma.user.update({
      where: { id: Number(id) },
      data: {
        password: hashed,
        mustChangePassword: true, // 🔥 OBLIGATOIRE
      },
    })

    // ⚠️ renvoyé UNE SEULE FOIS à l’admin
    return NextResponse.json({ password: DEFAULT_PASSWORD })
  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
