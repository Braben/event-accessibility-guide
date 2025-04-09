const { PrismaClient } = require("@prisma/client");
const { venueSchema } = require("../middlewares/validation");

const prisma = new PrismaClient();

// GET all venues
const getAllVenues = async (req, res) => {
  try {
    const venues = await prisma.venue.findMany({
      include: { accessibilityFeatures: true, reviews: true },
    });
    res.status(200).json(venues);
  } catch (error) {
    console.error("Error fetching venues:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET a single venue by id
const getAVenue = async (req, res) => {
  try {
    const venue = await prisma.venue.findUnique({
      where: { id: req.params.id },
      include: { accessibilityFeatures: true, reviews: true },
    });
    if (!venue) return res.status(404).json({ error: "Venue not found" });
    res.status(200).json(venue);
  } catch (error) {
    console.error("Error fetching venue:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// CREATE a new venue
const createVenue = async (req, res) => {
  console.log("Received data:", req.body);
  const result = venueSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.format() });
  }

  try {
    const {
      userId,
      name,
      address,
      contactInformation,
      description,
      photos,
      routeDirection,
      accessibilityFeatures,
      venueCapacity,
    } = req.body;
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res
        .status(400)
        .json({ error: "User not found. Provide a valid userId." });
    }
    const features = await prisma.accessibilityFeature.findMany({
      where: {
        category: { in: accessibilityFeatures },
      },
    });
    const Ids = features.map((feature) => ({ id: feature.id }));
    const newVenue = await prisma.venue.create({
      data: {
        userId,
        name,
        address,
        contactInformation,
        description,
        photos: photos || [],
        accessibilityFeatures: {
          connect:Ids
        },
        venueCapacity,
        routeDirection,
      },
      include: {
        accessibilityFeatures: true, 
      },
    });
    res.status(201).json(newVenue);
    console.log(newVenue)
  } catch (error) {
    console.error("Error creating new venue:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// UPDATE a venue
const updateVenue = async (req, res) => {
  const result = venueSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.format() });
  }
  const { accessibilityFeatures, ...restOfBody } = req.body;
  try {
    let updateData = { ...restOfBody };
    if (accessibilityFeatures && Array.isArray(accessibilityFeatures)) {
      const features = await prisma.accessibilityFeature.findMany({
        where: {
          category: { in: accessibilityFeatures }, 
        },
      });

      updateData.accessibilityFeatures = {
        connect: features.map((feature) => ({ id: feature.id })), // Connect by the feature ID
      };
    }
    const updatedVenue = await prisma.venue.update({
      where: { id: req.params.id },
      data: updateData,
    });
    res.status(200).json(updatedVenue);
  } catch (error) {
    console.error("Error updating venue:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//DELETE a venue
const deleteVenue = async (req, res) => {
  const venueId = req.params.id;
  try {
    const venue = await prisma.venue.findUnique({
      where: { id: venueId },
      include: { accessibilityFeatures: true }, 
    });
    await prisma.venue.delete({ where: {
      id: venueId,
    
      } });
    res.status(200).json({ message: "Venue deleted successfully" });
  } catch (error) {
    console.error("Error deleting venue:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {
  createVenue,
  getAllVenues,
  getAVenue,
  updateVenue,
  deleteVenue,
};
