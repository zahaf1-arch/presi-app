import { NextResponse } from "next/server"

export async function POST() {
  const response = NextResponse.json({ message: "Logged out" })

  // Supprimer cookies côté serveur
  response.cookies.set("token", "", {
    path: "/",
    expires: new Date(0),
  })

  response.cookies.set("user", "", {
    path: "/",
    expires: new Date(0),
  })

  return response
}
