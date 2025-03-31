import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import {
  Dialog,
  Button,
  Input,
  Checkbox,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Xmark } from "iconoir-react";
import { addVenue } from "../Slicers/VenueSlicer";
import { useSelector, useDispatch } from "react-redux";

const AddVenue = () => {
  const [venueName, setVenueName] = useState("");
  const [venueCapacity, setVenueCapacity] = useState(0);
  const [venueAddress, setVenueAddress] = useState("");
  const [venueImage, setVenueImage] = useState(null);
  const [venueDescription, setVenueDescription] = useState("");
  const [accessibilityFeatures, setAccessibilityFeatures] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const venues = useSelector((state) => state.venues.venues);
  useEffect(() => {
    console.log(venues); // Log when state updates
  }, [venues]);

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
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} size="md">
        <Dialog.Trigger
          as={Button}
          className="w-48 bg-black p-3 font-bold"
          onClick={() => setIsOpen(true)} // Open modal
        >
          <span className="mr-2">+</span> Add Venue
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
              Add New Venue
            </Typography>
            <Typography className="text-foreground text-sm">
              Add a new venue with Accessibility information
            </Typography>
            <form
              action="#"
              className="mt-3"
              onSubmit={(e) => {
                e.preventDefault();

                const newVenue = {
                  venueName,
                  venueCapacity,
                  venueAddress,
                  venueDescription,
                  accessibilityFeatures,
                };

                dispatch(addVenue(newVenue)); // Dispatch the action

                // Clear inputs
                setVenueName("");
                setVenueCapacity(0);
                setVenueAddress("");
                setVenueDescription("");
                setAccessibilityFeatures([]);

                setIsOpen(false); // Close the modal
              }}
            >
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
                    <div className=" bg-[#e0dfe4]  border border-slate-400 rounded-lg ">
                      <Input
                        id="text1"
                        type="text"
                        value={venueName}
                        placeholder="eg: national theater"
                        className=" bg-transparent border-none focus:ring-0 focus:outline-none text-black  hover:border-none"
                        onChange={(e) => setVenueName(e.target.value)}
                      />
                    </div>
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

                    <div className=" bg-[#e0dfe4]  border border-slate-300 rounded-lg ">
                      <Input
                        id="text2"
                        type="number"
                        value={venueCapacity}
                        placeholder="eg: 300"
                        className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-black  hover:border-none"
                        onChange={(e) => setVenueCapacity(e.target.value)}
                      />
                    </div>
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
                <div className=" bg-[#e0dfe4]  border border-slate-300 rounded-lg ">
                  <Input
                    id="text3"
                    type="text"
                    value={venueAddress}
                    onChange={(e) => setVenueAddress(e.target.value)}
                    placeholder="98 Giffard Rd, East Cantoments, Accra"
                    className="placeholder:italic placeholder:text-slate-400 bg-transparent border-none focus:ring-0 focus:outline-none text-black  hover:border-none"
                  />
                </div>
              </div>

              {/* <div className="mb-4 space-y-1.5">
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
              </div> */}

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
                <div className="bg-[#e0dfe4] border border-slate-300 rounded-lg p-2">
                  <textarea
                    id="text3"
                    value={venueDescription}
                    onChange={(e) => setVenueDescription(e.target.value)}
                    placeholder="typing.."
                    className="placeholder:italic placeholder:text-slate-400 h-24 w-full bg-transparent border-none focus:ring-0 focus:outline-none text-black resize-none"
                  />
                </div>
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
              <div className="mb-1 flex items-center mt-3 justify-end gap-2">
                <Dialog.DismissTrigger
                  as={Button}
                  variant="ghost"
                  color="error"
                >
                  Cancel
                </Dialog.DismissTrigger>
                <Button type="submit">Add Event</Button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog>
    </div>
  );
};

export default AddVenue;
