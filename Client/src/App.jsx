import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebaseConfig";
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

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
        });
      } else {
        setUser(null);
      }
    });

    // Cleanup on unmount
    return () => unsubscribe();
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<RootLayout user={user} />}>
        <Route path="/" element={<Home />} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/organizer/dashboard"
          element={<EventOrganizerDashboard user={user} />}
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
  return <RouterProvider router={router} />;
}

export default App;
