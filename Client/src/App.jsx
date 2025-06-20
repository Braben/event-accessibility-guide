import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Venues from "./pages/Venues";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RootLayout from "./layout/RootLayout";
import EventOrganizerDashboard from "./pages/EventOrganizerDashboard";
import Accessibility from "./pages/Accessibility";
import EventsSection from "./pages/EventsSection";
import EventSection from "./pages/EventSection";
import SettingsSection from "./pages/SettingsSection";
import { NotificationProvider } from "./components/NotificationSystem";
import { Toaster } from "react-hot-toast";
import Venuedetails1 from "./pages/Venuedetails1";
import Venuedetails2 from "./pages/Venuedetails2";
import Venuedetails3 from "./pages/Venuedetails3";
import Venuedetails4 from "./pages/Venuedetails4";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/venues/:id" element={<Venuedetails1 />} />
        <Route path="/venuedetails2" element={<Venuedetails2 />} />
        <Route path="/venuedetails3" element={<Venuedetails3 />} />
        <Route path="/venuedetails4" element={<Venuedetails4 />} />
        <Route
          path="/organizer-dashboard"
          element={<EventOrganizerDashboard />}
        />
        <Route path="/organizer/accessibility" element={<Accessibility />} />
        <Route path="/organizer/events" element={<EventsSection />} />
        <Route path="/organizer/event" element={<EventSection />} />
        <Route path="/organizer/settings" element={<SettingsSection />} />
      </Route>
    )
  );
  return (
    <NotificationProvider>
      <>
        <Toaster position="top-center" reverseOrder={false} />
        <RouterProvider router={router} />
      </>
    </NotificationProvider>
  );
}

export default App;
