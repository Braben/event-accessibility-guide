const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function main() {
  const venues = JSON.parse(fs.readFileSync('./venueData.json', 'utf-8'));
  const accessibilityFeatures = JSON.parse(fs.readFileSync('./accessibilityFeatures.json', 'utf-8'));

  for (const feature of accessibilityFeatures) {
    await prisma.accessibilityFeature.upsert({
      where: { category: feature.category },
      update: {
        description: feature.description,
        availabilityStatus: true,
      },
      create: {
        category: feature.category,
        description: feature.description,
        availabilityStatus: true,
      },
    });
  
    console.log(`Seeded accessibility feature: ${feature.category}`);
  }

  for (const venue of venues) {
    const featureRecords = await Promise.all(
      venue.accessibilityFeatures.map(async (category) => {
        return await prisma.accessibilityFeature.findFirst({
          where: { category },
          select: { id: true },
        });
      })
    );
    const createdVenue = await prisma.venue.create({
      data: {
        name: venue.name,
        address: venue.address,
        contactInformation: venue.contactInformation,
        venueCapacity: venue.venueCapacity,
        description: venue.description,
        photos: venue.photos,
        routeDirection: venue.routeDirection,
        createdAt: new Date(venue.createdAt),
        accessibilityFeatures: {
          connect: featureRecords.map((feature) => ({
            id: feature?.id, 
          })),
        },
      },
    });

    console.log(`Created venue: ${createdVenue.name}`);
  }
}

main()
  .then(() => {
    console.log('Seeding complete.');
    return prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
