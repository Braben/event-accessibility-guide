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
import { Toaster } from "react-hot-toast";

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
        <Route
          path="/organizer/dashboard"
          element={<EventOrganizerDashboard />}
        />
        <Route
          path="/organizer/accessibility"
          element={<div>Accessibility Page</div>}
        />
        <Route path="/organizer/venue" element={<div>Venue Page</div>} />
        <Route path="/organizer/settings" element={<div>Settings Page</div>} />
      </Route>
    )
  );
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router} />;
    </>
  )
}

export default App;
