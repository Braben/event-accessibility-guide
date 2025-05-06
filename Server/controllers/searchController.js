const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const searchVenues = async (req, res) => {
  try {
    const { query, location, accessibility } = req.query; 
    console.log("Received query params:", req.query);

    if (!query && !location) {
      return res.status(400).json({ message: "Please provide a search query." });
    }
    let filters = [];

    // Split query into individual words
    if (query) {
      console.log("Search query words:", query.split(" "));
      const words = query.split(" ").map((word) => ({
        OR: [
          { name: { contains: word, mode: "insensitive" } },
          { description: { contains: word, mode: "insensitive" } },
          { address: { contains: word, mode: "insensitive" } },
          { accessibilityFeatures: { some: { category: { contains: word, mode: "insensitive" } } } },
          { events: { some: { title: { contains: word, mode: "insensitive" } } } },
        ],
      }));
      filters.push({ AND: words });
    }

    if (location) {
      console.log("Filtering by location:", location);
      filters.push({ address: { contains: location, mode: "insensitive" } });
    }

    if (accessibility) {
      const accessArray = Array.isArray(accessibility)
        ? accessibility
        : accessibility.split(",");
      console.log("Parsed accessibility array:", accessArray);
      filters.push({ accessibilityFeatures: { some: { OR: accessArray.map((item) => ({category: { contains: item.trim(), mode: "insensitive" },})), } } });
    }
    console.log("Final filters being sent to Prisma:", JSON.stringify(filters, null, 2));
    const venues = await prisma.venue.findMany({
      where: { AND: filters},
      include: { accessibilityFeatures: true, reviews: true, events:true, }
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
