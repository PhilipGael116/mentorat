import { Route, Routes } from "react-router-dom"
import { useEffect } from "react"
import { useAuthStore } from "./store"
import api from "./utils/api"
import Home from "./pages/Home"
import { SignIn } from "./components/Auth"
import AuthLayout from "./layouts/Authlayout"
import SignUp from "./components/Auth/signup-mentor/Signup"
import RegistrationWizzard from "./components/Auth/signup-mentor/RegistrationWizzard"
import SignUpMentee from "./components/Auth/signup-mentee/SignUpMentee"
import MentorLayout from "./layouts/MentorLayout"
import MenteeLayout from "./layouts/MenteeLayout"
import { Students, DashBoard, Reviews } from "./pages/Mentor"
import ProtectedRoute from "./utils/ProtectedRoute"
import { MenteeDashBoard, Mentors, MentorDetails, MyReviews } from "./pages/Mentee"
import NotFound from "./pages/NotFound"

const App = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      // Only fetch if we have a token but NO user in memory (fresh refresh)
      if (token && !user) {
        try {
          // Ask the backend for the CURRENT user
          const response = await api.get("/auth/me");
          
          if (response.data.user) {
            setUser(response.data.user);
          }
        } catch (error) {
          console.error("Auto-login failed:", error);
          // If the token is invalid or expired, clear it
          localStorage.removeItem("token");
          setUser(null);
        }
      }
    };

    fetchUser();
  }, [setUser, user]);

  return (
    <div className="bg-primary min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} index />

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/register-mentor" element={<SignUp />} />
          <Route path="/mentor-wizard" element={<RegistrationWizzard />} />
          <Route path="/register-mentee" element={<SignUpMentee />} />
        </Route>

        {/* Mentor Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MentorLayout />}>
            <Route path="/mentor">
              <Route index element={<DashBoard />} />
              <Route path="students" element={<Students />} />
              <Route path="reviews" element={<Reviews />} />
            </Route>
          </Route>
        </Route>

        {/* Mentee Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MenteeLayout />}>
            <Route path="/mentee">
              <Route index element={<MenteeDashBoard />} />
              <Route path="mentors" element={<Mentors />} />
              <Route path="mentors/:id" element={<MentorDetails />} />
              <Route path="reviews" element={<MyReviews />} />
            </Route>
          </Route>
        </Route>

        {/* Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App