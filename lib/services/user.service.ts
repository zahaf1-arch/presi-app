import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import type { User, UserRole } from "@/lib/auth"
import { rolePermissions } from "@/lib/auth"

export async function findUserByEmail(email: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      wilaya: true,
    },
  })

  if (!user) return null

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role.toLowerCase() as UserRole,
    wilayaId: user.wilayaId?? undefined,
    wilayas: user.wilaya
      ? {
          id: user.wilaya.id,
          nom_fr: user.wilaya.nom_fr,
          nom_ar: user.wilaya.nom_ar,
        }
      : undefined,
    avatar: user.avatar?? undefined,
    permissions: rolePermissions[user.role.toLowerCase() as UserRole],
  }
}

export async function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword)
}

export async function createUser(userData: {
  name: string
  email: string
  password: string
  role: UserRole
  wilayaId?: number
}): Promise<User> {
  if (userData.role === "operator" && !userData.wilayaId) {
    throw new Error("Un opérateur doit être assigné à une wilaya")
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10)

  const user = await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      role: userData.role.toUpperCase() as any,
      wilayaId: userData.wilayaId ?? null,
    },
    include: {
      wilaya: true,
    },
  })

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role.toLowerCase() as UserRole,
    wilayaId: user.wilayaId?? undefined,
    wilayas: user.wilaya
      ? {
          id: user.wilaya.id,
          nom_fr: user.wilaya.nom_fr,
          nom_ar: user.wilaya.nom_ar,
        }
      : undefined,
    avatar: user.avatar?? undefined,
    permissions: rolePermissions[user.role.toLowerCase() as UserRole],
  }
}


export async function getAllUsers(): Promise<User[]> {
  const users = await prisma.user.findMany({
    include: {
      wilaya: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role.toLowerCase() as UserRole,
    wilayaId: user.wilayaId?? undefined,
    wilayas: user.wilaya
      ? {
          id: user.wilaya.id,
          nom_fr: user.wilaya.nom_fr,
          nom_ar: user.wilaya.nom_ar,
        }
      : undefined,
    avatar: user.avatar?? undefined,
    permissions: rolePermissions[user.role.toLowerCase() as UserRole],
  }))
}

export async function getUserWithPassword(email: string) {
  return prisma.user.findUnique({
    where: { email },
    include: {
      wilaya: true,
    },
  })
}
