const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const searchVenues = async (req, res) => {
  try {
    const { query } = req.query; // Single query field for all searches

    if (!query) {
      return res.status(400).json({ message: "Please provide a search query." });
    }

    // Split query into individual words
    const words = query.split(" ").map((word) => ({
      OR: [
        { name: { contains: word, mode: "insensitive" } },
        { description: { contains: word, mode: "insensitive" } },
        { address: { contains: word, mode: "insensitive" } },
        { accessibilityFeatures: { some: { category: { contains: word, mode: "insensitive" } } } },
      ],
    }));

    const filters = { AND: words }
    if (location) filters.address = { contains: location, mode: "insensitive" }
    if (accessibility) {
      filters.accessibilityFeatures = { some: { category: accessibility } };
    }

    const venues = await prisma.venue.findMany({
      where: filters,
      include: { accessibilityFeatures: true, reviews: true }
    });

    if (venues.length === 0) {
      return res.status(404).json({ message: "No venues found matching your search" });
    }

    res.status(200).json(venues);
  } catch (error) {
    console.error("Error searching venues:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { searchVenues };
