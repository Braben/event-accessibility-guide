const { z } = require("zod");

//Venue Validation Schema
const venueSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(2, "Address is required"),
  contactInformation: z.string().min(5, "Contact info is required"),
  description: z.string().optional(),
  photos: z.array(z.string()).optional(),
  accessibilityFeatures: z.array(z.string()).optional(),
  routeDirection: z.string().optional(),
});

module.exports = { venueSchema };