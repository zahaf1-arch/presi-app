import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'

export async function GET(request: NextRequest) {
  try {
    const elections = await prisma.electionType.findMany({
      where: { actif: true },
      orderBy: { dateElection: 'desc' },
    })

    return NextResponse.json(elections)
  } catch (error) {
    console.error('Get elections error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch elections' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1]

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key'
    )

    if (decoded.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    const { nom_fr, nom_ar, dateElection } = await request.json()

    const election = await prisma.electionType.create({
      data: {
        nom_fr,
        nom_ar,
        dateElection: new Date(dateElection),
        actif: true,
      },
    })

    return NextResponse.json(election, { status: 201 })
  } catch (error) {
    console.error('Create election error:', error)
    return NextResponse.json(
      { error: 'Failed to create election' },
      { status: 500 }
    )
  }
}
