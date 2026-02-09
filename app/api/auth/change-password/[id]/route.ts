import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const userId = Number(id)

  const token = req.cookies.get("token")?.value
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)

  const isAdmin = decoded.role?.toLowerCase() === "admin"
  const isSelf = decoded.id === userId

  if (!isAdmin && !isSelf) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const { oldPassword, newPassword } = await req.json()

  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  if (!isAdmin) {
    const ok = await bcrypt.compare(oldPassword, user.password)
    if (!ok) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 })
    }
  }

  const hashed = await bcrypt.hash(newPassword, 10)

  await prisma.user.update({
    where: { id: userId },
    data: {
      password: hashed,
      mustChangePassword: false,
    },
  })

  // 🔥 DÉCONNEXION FORCÉE
  const res = NextResponse.json({ success: true })

  res.cookies.set("token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  })

  return res
}
