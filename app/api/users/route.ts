import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)
    if (decoded.role?.toLowerCase() !== "admin")
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })

    const users = await prisma.user.findMany({
      include: { wilaya: true },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(users)
  } catch (e) {
    console.error("GET /api/users error:", e)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)
    if (decoded.role?.toLowerCase() !== "admin")
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })

    const { name, email, role, wilaya_id } = await request.json()

    const tempPassword = Math.random().toString(36).slice(2, 10).toUpperCase()

const hashed = await bcrypt.hash(tempPassword, 10)

const normalizedRole = role.toUpperCase()

const user = await prisma.user.create({
  data: {
    name,
    email,
    role: normalizedRole,
    password: hashed,
    mustChangePassword: true,
    wilayaId: normalizedRole === "OPERATOR"
      ? Number(wilaya_id)
      : null,
  },
  include: { wilaya: true },
})

return NextResponse.json({
  ...user,
  tempPassword, // ✅ renvoyé UNE SEULE FOIS à l’admin
}, { status: 201 })

  } catch (error: any) {
    console.error("POST /api/users error:", error)

    if (error.code === "P2002") {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 })
    }

    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}
