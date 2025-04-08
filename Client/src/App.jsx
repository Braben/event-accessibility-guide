import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Venue from "./pages/Venue";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RootLayout from "./layout/RootLayout";
import Venuedetails1 from "./pages/Venuedetails1";
import Venuedetails2 from "./pages/Venuedetails2";
import Venuedetails3 from "./pages/Venuedetails3";
import Venuedetails4 from "./pages/Venuedetails4";
import Profile from './pages/Profile';
import { NotificationProvider } from './context/NotificationContext';
import EventOrganizerDashboard from "./pages/EventOrganizerDashboard";
 

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/venue" element={<Venue />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/venuedetails1" element={<Venuedetails1 />} />
        <Route path="/venuedetails2" element={<Venuedetails2 />} />
        <Route path="/venuedetails3" element={<Venuedetails3 />} />
        <Route path="/venuedetails4" element={<Venuedetails4 />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/organizer/dashboard" element={<EventOrganizerDashboard />} />
        <Route path="/organizer/accessibility" element={<div>Accessibility Page</div>} />
        <Route path="/organizer/venue" element={<div>Venue Page</div>} />
        <Route path="/organizer/settings" element={<div>Settings Page</div>} />
      </Route>
    )
  );

  return (
    
      <NotificationProvider>
        <RouterProvider router={router} />
      </NotificationProvider>
  
  );
}

export default App;
