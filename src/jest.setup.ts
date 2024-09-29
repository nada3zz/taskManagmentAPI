import prisma from "./utils/prisma";

afterAll(async () => {
  console.log("Cleaning up database...");
  await prisma.task.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.$disconnect();
});
