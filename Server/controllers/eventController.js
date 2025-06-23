const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Create a new event
const createEvent = async (req, res) => {
  const {
    title,
    venueId,
    createdBy, // 👈 this is the correct field name from schema
    description,
    startDate,
    endDate,
    photos,
  } = req.body;

  try {
    const newEvent = await prisma.event.create({
      data: {
        title,
        venueId,
        createdBy, // 👈 required field for User relation
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        photos: photos || [], // safe fallback
      },
      include: {
        venue: true,
        user: true,
      },
    });

    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all events for a venue
const getEvents = async (req, res) => {
  const { venueId } = req.params;
  try {
    const events = await prisma.event.findMany({
      where: { venueId },
      include: {
        venue: true,
        user: true,
      },
    });

    if (events.length === 0) {
      return res
        .status(404)
        .json({ message: "No events found for this venue" });
    }
    res
      .status(200)
      .json({ message: "Events retrieved successfully", data: events });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single event by ID
const getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        venue: true,
        user: true,
      },
      // include: {
      //   venue: true,
      //   user: true,
      // },
    });
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
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
      .json({ message: "updated successfully", data: updatedEvent });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Server error" });
  }
};

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
  getEventById,
  updateEvent,
  deleteEvent,
};
