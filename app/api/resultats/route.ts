import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'

export async function GET(request: NextRequest) {
  try {
   // const token = request.headers.get('authorization')?.split(' ')[1]
    const token = request.cookies.get("token")?.value
    const { searchParams } = new URL(request.url)
    const electionId = searchParams.get('electionId')

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const resultats = await prisma.resultat.findMany({
      where: {
        electionTypeId: electionId ? parseInt(electionId) : undefined,
      },
      include: {
        bureau: {
          include: {
            centre: {
              include: {
                commune: {
                  include: {
                    moughataa: {
                      include: {
                        wilaya: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        candidat: true,
        electionType: true,
      },
    })

    return NextResponse.json(resultats)
  } catch (error) {
    console.error('Get resultats error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch results' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
   // const token = request.headers.get('authorization')?.split(' ')[1]
    const token = request.cookies.get("token")?.value
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)

    if (decoded.role === "guest")
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })

    const payload = await request.json()   // on reçoit bien un TABLEAU []

    // Enregistre chaque candidat du bureau
    for (const r of payload) {
      await prisma.resultat.upsert({
        where: { unique_result: { electionTypeId: r.electionTypeId, bureauId: r.bureauId, candidatId: r.candidatId }},
        update: { nombreVoix: r.nombreVoix, voixNuls: r.voixNuls, voixRejetes: r.voixRejetes },
        create: r,
      })
    }

    return NextResponse.json({ success: true }, { status: 201 })

  } catch (error) {
    console.error("Create resultats error:", error)
    return NextResponse.json({ error: "Failed to save results" }, { status: 500 })
  }
}
