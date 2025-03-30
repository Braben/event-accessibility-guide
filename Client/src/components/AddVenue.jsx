import React from "react";
import { useState } from "react";
import {
  Dialog,
  Button,
  Input,
  Checkbox,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Xmark } from "iconoir-react";

const AddVenue = () => {
  const [venueName, setVenueName] = useState("");
  const [venueCapacity, setVenueCapacity] = useState(0);
  const [venueAddress, setVenueAddress] = useState("");
  const [venueImage, setVenueImage] = useState(null);
  const [venueDescription, setVenueDescription] = useState("");
  const [accessibilityFeatures, setAccessibilityFeatures] = useState([]);
  const accessibilityOptions = [
    "Balanced sound",
    "Earing aids",
    "Sign language translators",
    "Braille itinerary",
    "Wheel chair access",
    "Elevator",
    "Automatic doors",
    "Lighting considerations",
    "Close parking",
    "Large prints",
    "Service Animal Accommodation",
    "Sensory-Friendly Environment",
  ];

  const handleAccessibilityChange = (option) => {
    setAccessibilityFeatures(
      (prev) =>
        prev.includes(option)
          ? prev.filter((item) => item !== option) // Remove if already selected
          : [...prev, option] // Add if not selected
    );
  };
  return (
    <div>
      <Dialog size="md">
        <Dialog.Trigger className="w-48 bg-black p-3 font-bold" as={Button}>
          {" "}
          <span className="mr-2 ">+</span> Add Venue
        </Dialog.Trigger>
        <Dialog.Overlay>
          <Dialog.Content>
            <Dialog.DismissTrigger
              as={IconButton}
              size="sm"
              variant="ghost"
              color="secondary"
              className="absolute right-2 top-2"
              isCircular
            >
              <Xmark className="h-5 w-5" />
            </Dialog.DismissTrigger>
            <Typography type="h6" className="mb-1">
              + Add New Venue
            </Typography>
            <Typography className="text-foreground">
              Add a new venue with Accessibility information
            </Typography>
            <form action="#" className="mt-3">
              <div className="mb-4 mt-2 space-y-1.5">
                <div className="flex justify-between gap-4">
                  {/* Left Input Field */}
                  <div className="w-1/2">
                    <Typography
                      as="label"
                      htmlFor="text1"
                      type="small"
                      color="default"
                      className="font-semibold"
                    >
                      Venue Name
                    </Typography>
                    <Input
                      id="text1"
                      type="text"
                      value={venueName}
                      placeholder="eg: national theater"
                      className="w-full"
                      onChange={(e) => setVenueName(e.target.value)}
                    />
                  </div>

                  {/* Right Input Field */}
                  <div className="w-1/2">
                    <Typography
                      as="label"
                      htmlFor="text2"
                      type="small"
                      color="default"
                      className="font-semibold"
                    >
                      Capacity
                    </Typography>
                    <Input
                      id="text2"
                      type="number"
                      value={venueCapacity}
                      placeholder="eg: 300"
                      className="w-full"
                      onChange={(e) => setVenueCapacity(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="mb-4 space-y-1.5">
                <Typography
                  as="label"
                  htmlFor="text3"
                  type="small"
                  color="default"
                  className="font-semibold"
                >
                  Address
                </Typography>
                <Input
                  id="text3"
                  type="text"
                  value={venueAddress}
                  onChange={(e) => setVenueAddress(e.target.value)}
                  placeholder="eg: 123 main st, Accra, Ghana "
                />
              </div>

              <div className="mb-4 space-y-1.5">
                <Typography
                  as="label"
                  htmlFor="file"
                  type="small"
                  color="default"
                  className="font-semibold"
                >
                  Add Venue Image
                </Typography>
                <input
                  id="file"
                  type="file"
                  className="file-input file-input-primary w-full"
                  required
                  accept="image/jpeg, image/jpg"
                  onChange={(e) => setVenueImage(e.target.files[0])}
                />
              </div>

              <div className="mb-4 space-y-1.5">
                <Typography
                  as="label"
                  htmlFor="text3"
                  type="small"
                  color="default"
                  className="font-semibold"
                >
                  Description
                </Typography>
                <Input
                  id="text3"
                  type="text"
                  value={venueDescription}
                  onChange={(e) => setVenueDescription(e.target.value)}
                  placeholder="typing... "
                />
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-semibold">
                  Accessibility Features
                </h4>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {accessibilityOptions.map((feature) => (
                    <label
                      key={feature}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={accessibilityFeatures.includes(feature)}
                        onChange={() => handleAccessibilityChange(feature)}
                      />
                      <span>{feature}</span>
                    </label>
                  ))}
                </div>
              </div>
            </form>
            <div className="mb-1 flex items-center mt-3 justify-end gap-2">
              <Dialog.DismissTrigger as={Button} variant="ghost" color="error">
                Cancel
              </Dialog.DismissTrigger>
              <Button type="submit">Add Event</Button>
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog>
    </div>
  );
};

export default AddVenue;
