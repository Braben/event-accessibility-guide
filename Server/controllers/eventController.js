const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new event
const createEvent = async (req, res) => {
  const { title, venueId, createdBy, description, startDate, endDate, photos } =
    req.body;

  if (!title || !venueId || !createdBy || !description) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newEvent = await prisma.event.create({
      data: {
        title,
        venueId,
        createdBy,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        photos: photos || [],
      },
      include: {
        venue: true,
        user: true,
      },
    });

    res
      .status(201)
      .json({ message: "Event created successfully", data: newEvent });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all or venue-specific events
const getEvents = async (req, res) => {
  const { venueId } = req.params;

  try {
    const events = await prisma.event.findMany({
      where: venueId ? { venueId } : {},
      include: {
        venue: true,
        user: true,
      },
    });

    if (!events || events.length === 0) {
      return res.status(404).json({ message: "No events found" });
    }

    res
      .status(200)
      .json({ message: "Events retrieved successfully", data: events });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update an event
const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, venueId, description, startDate, endDate, photos } = req.body;

  try {
    const updatedEvent = await prisma.event.update({
      where: { id },
      data: {
        title,
        venueId,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        photos: photos || [],
      },
      include: {
        venue: true,
        user: true,
      },
    });

    res
      .status(200)
      .json({ message: "Event updated successfully", data: updatedEvent });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete an event
const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.event.delete({
      where: { id },
    });

    res.status(200).json({ message: "Event deleted successfully", data: null });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
