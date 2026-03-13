import { Route, Routes } from "react-router-dom"
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