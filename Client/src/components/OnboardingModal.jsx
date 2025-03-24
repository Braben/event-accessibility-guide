import {
  Dialog,
  Button,
  Typography,
  IconButton,
  timelineBodyTheme,
} from "@material-tailwind/react";
import { TbX } from "react-icons/tb";
import { useState } from "react";
import { SlLocationPin } from "react-icons/sl";
import { GoPeople } from "react-icons/go";
import { BsCalendar4Week } from "react-icons/bs";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosStarOutline,
} from "react-icons/io";
import { GrSettingsOption } from "react-icons/gr";
export default function OnboardingModal() {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState("");
  const [selected, setSelected] = useState("");
  const [selectedPreferences, setSelectedPreferences] = useState([]);

  const totalSteps = 4;
  const progressWidth = `${(step / totalSteps) * 100}%`;

  const nextStep = () => {
    if (step < 5) setStep((prev) => prev + 1);
  };
  const prevStep = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };
  const skipStep = () => {
    if (step < 5) setStep((prev) => prev + 1);
  };

  const handleCheckboxChange = (preference) => {
    setSelectedPreferences((prev) =>
      prev.includes(preference)
        ? prev.filter((item) => item !== preference)
        : [...prev, preference]
    );
  };
  const roles = [
    {
      id: "user",
      title: "I'm looking for Venues",
      description:
        "Find accessible Venues that meet your specific needs and preferences",
      icon: <GoPeople className="text-white size-4" />,
      bgColor: "bg-blue-200",
      iconBg: "bg-blue-700",
      step1Header: "Personalize Your experience",
      step1para:
        "Lets help you find venues that meet your accessibility needs. Well ask few questions to personal your experience",
    },
    {
      id: "organizer",
      title: "I'm an organizer",
      description:
        "List your venues and highlight it's accessibility features for potential visitors",
      icon: <BsCalendar4Week className="text-white size-4" />,
      bgColor: "bg-orange-200",
      iconBg: "bg-orange-400",
      step1Header: "Welcome, Event Organizer!",
      step1para:
        "Lets set up your profile to help you showcase your venue's accessibility features to potential visitors",
    },
  ];
  return (
    <Dialog>
      <Dialog.Trigger className="mt-2 font-bold  w-full" as={Button}>
        Create an Account
      </Dialog.Trigger>
      <Dialog.Overlay>
        <Dialog.Content className="h-[32rem] relative  ">
          <div
            className="absolute top-0 left-0 h-1  bg-blue-700 transition-all duration-300"
            style={{ width: progressWidth }}
          ></div>

          {step === 1 && (
            <div>
              <div className="flex justify-center items-center mt-10">
                <div class="flex justify-center items-center rounded-lg  bg-blue-700  h-12 w-12">
                  <SlLocationPin className="text-white size-6" />
                </div>
              </div>
              <div className="text-center mt-5">
                <h3 className="text-3xl font-bold">Welcome to VenuesHubs</h3>
                <p className="text-sm mx-16 mt-3">
                  Let's personalize your experience. Are you looking for
                  accessible venues or you are an event organizer?
                </p>
              </div>
              <div className="flex justify-center gap-6 mt-6">
                {roles.map((role) => (
                  <div
                    key={role.id}
                    className={`border p-4 rounded-lg cursor-pointer transition-all duration-300 w-60 
            ${
              selected === role.id
                ? `${role.bgColor} border-gray-700 shadow-lg`
                : "bg-gray-200 border-gray-400"
            }`}
                    onClick={() => setSelected(role.id)}
                  >
                    {/* Role Icon Section */}
                    <div className="flex justify-center items-center mt-2 mb-3">
                      <div
                        className={`flex justify-center items-center rounded-lg ${role.iconBg} h-10 w-10`}
                      >
                        {role.icon}
                      </div>
                    </div>

                    {/* Role Title & Description */}
                    <h4 className="text-lg text-center font-semibold mb-2">
                      {role.title}
                    </h4>
                    <p className="text-sm text-center">{role.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 mb-4 mr-3 flex justify-end">
                <Button
                  size="sm"
                  className="bg-orange-400 font-bold border-none hover:bg-blue-700"
                  onClick={nextStep}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="flex flex-col justify-between h-[30rem]">
              <div className="flex justify-center items-center mt-10">
                {roles
                  .filter((role) => role.id === selected)
                  .map((role) => (
                    <div key={role.id} className="flex flex-col items-center">
                      {/* Centered Icon Container */}
                      <div className="flex justify-center">
                        <div
                          className={`flex justify-center items-center rounded-lg ${role.iconBg} h-12 w-12`}
                        >
                          {role.icon}
                        </div>
                      </div>

                      {/* Text Section */}
                      <div className="text-center mt-5">
                        <h3 className="text-xl font-bold">
                          {role.step1Header}
                        </h3>
                        <p className="text-sm mx-16 mt-3">{role.step1para}</p>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Buttons Positioned at the Bottom */}
              {/* Get the selected role outside the map */}
              {roles.some((role) => role.id === selected) && (
                <div className="flex justify-between mb-2">
                  <Button
                    className="font-bold text-blue-700"
                    variant="ghost"
                    onClick={prevStep}
                  >
                    <IoIosArrowBack className="mr-1 stroke-2" />
                    Back
                  </Button>
                  <Button
                    size="sm"
                    className={`${
                      roles.find((role) => role.id === selected)?.iconBg ||
                      "bg-gray-500"
                    } font-bold border-none hover:bg-blue-700`}
                    onClick={nextStep}
                  >
                    Next
                    <IoIosArrowForward className="ml-1 stroke-2" />
                  </Button>
                </div>
              )}
            </div>
          )}
          {step === 3 && (
            <div className="flex flex-col justify-between h-[30rem]">
              <div className="flex justify-center items-center mt-10">
                <div
                  className={`flex justify-center items-center rounded-lg h-12 w-12 ${
                    selected === "user" ? "bg-blue-700" : "bg-orange-400"
                  }`}
                >
                  {selected === "user" ? (
                    <GrSettingsOption className="text-white size-6" />
                  ) : (
                    <BsCalendar4Week className="text-white size-6" />
                  )}
                </div>
              </div>
              <div className="text-center mt-8">
                <h3 className="text-xl font-bold">
                  {selected === "user"
                    ? "Accessibility Preferences"
                    : "Your Venue Type"}
                </h3>
                <p className="text-sm mx-16 mt-3">
                  {selected === "user"
                    ? "Let's personalize your experience. Are you looking for accessible venues or you are an event organizer?"
                    : "Select the type of venues or events you organize or manage"}
                </p>
              </div>

              {/* If User is Selected, Show Accessibility Preferences */}
              {selected === "user" && (
                <div className="flex flex-col gap-4 p-4">
                  <div>
                    <h4 className="font-semibold mb-6">
                      Mobility Accommodations
                    </h4>

                    <div className="grid grid-cols-3 gap-2">
                      {[
                        "No Steps Required",
                        "Ramps Available",
                        "Low Counters",
                        "Accessible Parking",
                        "Wide Doorway",
                        "Handrails",
                      ].map((item) => (
                        <div
                          key={item}
                          className="bg-gray-200 p-1 rounded-md flex items-center"
                        >
                          <input
                            type="checkbox"
                            value={item}
                            onChange={() => handleCheckboxChange(item)}
                            className="appearance-none w-5 h-5 border border-gray-500 rounded-full checked:bg-blue-600 checked:border-transparent focus:outline-none mr-2"
                          />
                          <span className="text-gray-800">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-6">
                      Visual Accommodations
                    </h4>

                    <div className="grid grid-cols-3 gap-2">
                      {[
                        "Braille Signage",
                        "High Contrast",
                        "Large print materials",
                        "Well-lit spaces",
                        "Audio description",
                      ].map((item) => (
                        <div
                          key={item}
                          className="bg-gray-200 p-[2px]  rounded-md flex items-center"
                        >
                          <input
                            type="checkbox"
                            value={item}
                            onChange={() => handleCheckboxChange(item)}
                            className="appearance-none w-5 h-5 border border-gray-500 rounded-full checked:bg-blue-600 checked:border-transparent focus:outline-none mr-2"
                          />
                          <span className="text-gray-800">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-6">
                      Hearing Accommodations
                    </h4>

                    <div className="grid grid-cols-3 gap-2">
                      {[
                        "Hearing loops",
                        "Captioning",
                        "Sign Language staff",
                        "Visual alerts",
                        "Quiet spaces",
                      ].map((item) => (
                        <div
                          key={item}
                          className="bg-gray-200 p-1 rounded-md flex items-center"
                        >
                          <input
                            type="checkbox"
                            value={item}
                            onChange={() => handleCheckboxChange(item)}
                            className="appearance-none w-5 h-5 border border-gray-500 rounded-full checked:bg-blue-600 checked:border-transparent focus:outline-none mr-2"
                          />
                          <span className="text-gray-800">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* If Organizer is Selected, Show Venue Types */}
              {selected === "organizer" && (
                <div className="">
                  <div className="grid grid-cols-3 gap-4 p-4">
                    {[
                      "Conference Center",
                      "Theater Spaces",
                      "Restaurant/Dining",
                      "Museum/Gallery",
                      "Sports Venue",
                      "Educational Facility",
                      "Hotel/Accommodation",
                      "Outdoor Space/Park",
                      "Entertainment Venue",
                      "Community Center",
                      "Religious Facility",
                      "Other",
                    ].map((item) => (
                      <div
                        key={item}
                        className="bg-gray-200 p-1 text-sm rounded-md flex items-center"
                      >
                        <input
                          type="checkbox"
                          value={item}
                          onChange={() => handleCheckboxChange(item)}
                          className="appearance-none w-5 h-5 border border-gray-500 rounded-full checked:bg-blue-600 checked:border-transparent focus:outline-none mr-2"
                        />
                        <span className="text-gray-800">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 className="font-semibold text-center mb-6">
                      Accessibility Features
                    </h4>

                    <div className="grid grid-cols-3 gap-2">
                      {[
                        "Elevator access",
                        "Ramps available",
                        "Accessible restrooms",
                        "Accessible parking",
                        "Braille signage",
                        "Hearing loops",
                        "Sign language staff",
                        "Service animal friendly",
                        "Sensory friendly spaces",
                      ].map((item) => (
                        <div
                          key={item}
                          className="bg-gray-200 p-[2px]  rounded-md flex items-center"
                        >
                          <input
                            type="checkbox"
                            value={item}
                            onChange={() => handleCheckboxChange(item)}
                            className="appearance-none w-5 h-5 border border-gray-500 rounded-full checked:bg-blue-600 checked:border-transparent focus:outline-none mr-2"
                          />
                          <span className="text-gray-800">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Buttons at the Bottom */}
              <div className="flex justify-between p-4">
                <Button
                  className="font-bold text-blue-700"
                  variant="ghost"
                  onClick={prevStep}
                >
                  <IoIosArrowBack className="mr-1 stroke-2" />
                  Back
                </Button>
                <Button
                  size="sm"
                  className="bg-blue-700 font-bold border-none hover:bg-blue-800"
                  onClick={nextStep}
                >
                  Next
                  <IoIosArrowForward className="ml-1 stroke-2" />
                </Button>
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="flex flex-col justify-between h-[30rem]">
              <div className="flex flex-col items-center mt-10">
                {/* Icon Section */}
                <div
                  className={`flex justify-center items-center rounded-lg h-12 w-12 ${
                    selected === "user" ? "bg-blue-700" : "bg-orange-400"
                  }`}
                >
                  <IoIosStarOutline className="text-white size-6" />
                </div>

                {/* Text Section */}
                <div className="text-center mt-4 max-w-lg">
                  <h3 className="text-xl font-bold">Your Experience</h3>
                  <p className="text-sm mt-2">
                    {selected === "user"
                      ? "Tell us about your experience at venues and any accessibility challenges you've faced"
                      : "Tell us  about your venue and any accessibility feedback you've received"}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mt-8 mb-4">
                    {selected === "user"
                      ? "Have You Faced Accessibility Challenges at a Venue Before? "
                      : "Do you conduct accessibility assessments or audits for your venue?"}
                  </h4>

                  <div className="grid grid-cols-1 gap-2">
                    {["Yes", "No"].map((item) => (
                      <div
                        key={item}
                        className="bg-gray-200 p-[2px] w-32 rounded-md flex items-center"
                      >
                        <input
                          type="radio"
                          name="yesNo" // Ensures only one option can be selected
                          value={item}
                          onChange={() => handleCheckboxChange(item)}
                          className="appearance-none w-5 h-5 border border-gray-500 rounded-full checked:bg-blue-600 checked:border-transparent focus:outline-none mr-2"
                        />
                        <span className="text-gray-800">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog>
  );
}
