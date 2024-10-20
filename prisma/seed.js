const prisma = require("../prisma");
const { faker } = require("@faker-js/faker");

const seed = async () => {
  const employees = [];
  for (let i = 0; i < 10; i++) {
    employees.push({ name: faker.internet.displayName() });
  }
  await prisma.employee.createMany({ data: employees });
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
