const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.gun.deleteMany();
  await prisma.manufacturer.deleteMany();

  console.log('Creating manufacturers...');
  const manufacturerCount = 1000;
  const manufacturers = [];

  for (let i = 0; i < manufacturerCount; i++) {
    const manufacturer = await prisma.manufacturer.create({
      data: {
        name: faker.company.name(),
        description: faker.company.catchPhrase(),
      },
    });
    manufacturers.push(manufacturer);
  }

  console.log('Creating guns...');
  const gunCount = 100000;
  const batchSize = 1000;

  for (let i = 0; i < gunCount; i += batchSize) {
    const batch = [];
    const currentBatchSize = Math.min(batchSize, gunCount - i);

    for (let j = 0; j < currentBatchSize; j++) {
      batch.push({
        name: faker.commerce.productName(),
        caliber: parseFloat(faker.number.float({ min: 0.22, max: 0.50, fractionDigits: 2 }).toFixed(2)),
        weight: parseFloat(faker.number.float({ min: 0.5, max: 10, fractionDigits: 1 }).toFixed(1)),
        actionType: faker.helpers.arrayElement(['Bolt Action', 'Semi-Automatic', 'Lever Action', 'Pump Action', 'Break Action']),
        category: faker.helpers.arrayElement(['Rifle', 'Shotgun', 'Pistol', 'Revolver', 'SMG']),
        effectiveRange: faker.number.int({ min: 50, max: 2000 }),
        manufacturerId: faker.helpers.arrayElement(manufacturers).id,
      });
    }

    await prisma.gun.createMany({
      data: batch,
    });

    console.log(`Created ${i + currentBatchSize} guns...`);
  }

  console.log('Database seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 