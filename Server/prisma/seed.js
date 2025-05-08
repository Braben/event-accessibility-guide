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
    // Find feature IDs based on the feature names
    const featureRecords = await Promise.all(
      venue.accessibilityFeatures.map(async (featureName) => {
        const feature = await prisma.accessibilityFeature.findUnique({
          where: { category: featureName },
          select: { id: true },
        });
        return feature ? feature.id : null;
      })
    );

    // Filter out null values in case some features don't exist
    const featureIds = featureRecords.filter((id) => id !== null);

    // Create the venue and connect the accessibility features
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
          connect: featureIds.map((id) => ({ id })),
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
