import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import jwt from "jsonwebtoken"

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // 🔥 PROMISE
) {
  try {
    // ✅ IMPORTANT
    const { id } = await context.params
    const userId = Number(id)

    if (isNaN(userId)) {
      return NextResponse.json({ error: "Invalid user id" }, { status: 400 })
    }

    const token = request.cookies.get("token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)

    if (decoded.role?.toLowerCase() !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // 🔒 Sécurité : empêcher l’admin de se supprimer
    if (decoded.id === userId) {
      return NextResponse.json(
        { error: "You cannot delete your own account" },
        { status: 400 }
      )
    }

    await prisma.user.delete({
      where: { id: userId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("DELETE /api/users/[id] error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
