import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // ⛔ FIX : params est un Promise → il faut l’attendre
    const { id } = await context.params;

    const centreId = Number(id);
    if (isNaN(centreId)) {
      return NextResponse.json(
        { error: "Invalid centre id" },
        { status: 400 }
      );
    }

    // 👉 Charger bureaux + résultats (pour filtrer dépouillés)
    const bureaux = await prisma.bureau.findMany({
      where: { centreId },
      include: { resultats: true },
    });

    // 👉 Filtrer bureaux déjà dépouillés
    const bureauxNonDepouilles = bureaux.filter(
      (b) => !b.resultats || b.resultats.length === 0
    );

    return NextResponse.json(bureauxNonDepouilles);
  } catch (error) {
    console.error("API /centres/[id]/bureaux error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
