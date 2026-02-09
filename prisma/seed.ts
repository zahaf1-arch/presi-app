import { PrismaClient, UserRole } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const passwordHash = await bcrypt.hash("admin123", 10)

  const admin = await prisma.user.upsert({
    where: { email: "admin@election.mr" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@election.mr",
      password: passwordHash,
      role: UserRole.ADMIN,
      mustChangePassword: false,
    },
  })

  console.log("✅ Admin créé :", admin.email)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
