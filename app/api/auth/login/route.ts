import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    const user = await prisma.user.findUnique({
      where: { email },
      include: { wilaya: true },
    })

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

     const token = jwt.sign(
  {
    id: user.id,
    role: user.role,
    wilayaId: user.wilayaId,
    mustChangePassword:
      user.role !== "ADMIN" && user.mustChangePassword,
  },
  process.env.JWT_SECRET!,
  { expiresIn: "30m" }
)

    const res = NextResponse.json({ 
      token,
      user 
    })

    res.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production", // 🔥 IMPORTANT
      path: "/",
      maxAge: 600,
    })

    return res
  } catch (e) {

  console.error("LOGIN ERROR 👉", e)
  return NextResponse.json({ error: "Server error" }, { status: 500 })
}
}
