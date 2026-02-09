import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import jwt from "jsonwebtoken"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)

    if (decoded.role?.toLowerCase() !== "operator")
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })

    // 🔥 TOUJOURS relire depuis la DB
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { wilayaId: true },
    })

    if (!user?.wilayaId) {
      console.log("Operator without wilaya:", decoded.id)
      return NextResponse.json(
        { error: "Operator has no wilaya assigned" },
        { status: 400 }
      )
    }

    const wilaya = await prisma.wilaya.findUnique({
      where: { id: user.wilayaId },
      include: {
        moughataas: {
          include: {
            communes: {
              include: {
                centres: {
                  include: { bureaux: true },
                },
              },
            },
          },
        },
      },
    })

    return NextResponse.json(wilaya)
  } catch (e) {
    console.error("GET /api/users/wilaya error:", e)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
