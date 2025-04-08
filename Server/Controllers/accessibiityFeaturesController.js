const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Create a new accessibility feature
const createFeature = async (req, res) => {
  const { category, description, availabilityStatus, venueId } = req.body;
  try {
    const feature = await prisma.accessibilityFeature.create({
      data: {
        category,
        description,
        availabilityStatus,
        venueId,
      },
    });
    res.status(201).json(feature);
  } catch (error) {
    res.status(500).json({ error: 'Error creating feature' });
  }
};

// Get all accessibility features
const getAllFeatures = async (req, res) => {
  try {
    const features = await prisma.accessibilityFeature.findMany({
      include: { venue: true },
    });
    res.status(200).json(features);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch features' });
  }
};

// Get a single feature by ID
const getFeatureById = async (req, res) => {
  const { id } = req.params;
  try {
    const feature = await prisma.accessibilityFeature.findUnique({
      where: { id },
      include: { venue: true },
    });
    if (!feature) return res.status(404).json({ error: 'Feature not found' });
    res.status(200).json(feature);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch feature' });
  }
};

// Update a feature
const updateFeature = async (req, res) => {
  const { id } = req.params;
  const { category, description, availabilityStatus, venueId } = req.body;

  try {
    const updatedFeature = await prisma.accessibilityFeature.update({
      where: { id },
      data: {
        category,
        description,
        availabilityStatus,
        venueId,
      },
    });
    res.status(200).json(updatedFeature);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update feature' });
  }
};

// Delete a feature
const deleteFeature = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.accessibilityFeature.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete feature' });
  }
};

module.exports = { createFeature, getAllFeatures, getFeatureById, updateFeature, deleteFeature }
