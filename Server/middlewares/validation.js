const { z } = require("zod");

//Venue Validation Schema
const venueSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().optional(),
  contactInformation: z.string().optional(),
  description: z.string().optional(),
  photos: z.array(z.string()).optional(),
  accessibilityFeatures: z.array(z.string()).optional(),
  routeDirection: z.string().optional(),
  venueCapacity:  z.number().optional(),
});

// Review Validation Schema
const reviewSchema = z.object({
  venueId: z.string().min(1, "Venue ID is required"),
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
  comments: z.string().optional(),
});

const userSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  role: z.enum(["admin", "user"]).default("user"),
});

const accessibilityFeatures = z.object({
  category: z.string().min(1, 'Category is required').max(500, 'Category too long'),
description: z.string().min(1, 'Description is required').max(1000, 'Description too long'),
availabiltyStatus: z.boolean(),
})

module.exports = { venueSchema, reviewSchema, userSchema, accessibilityFeatures };
