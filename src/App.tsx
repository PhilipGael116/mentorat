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
import { MenteeDashBoard } from "./pages/Mentee"

const App = () => {
  return (
    <div className="bg-primary min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} index />
      </Routes>

      {/* Auth Routes */}
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/register-mentor" element={<SignUp />} />
          <Route path="/mentor-wizard" element={<RegistrationWizzard />} />
          <Route path="/register-mentee" element={<SignUpMentee />} />
        </Route>
      </Routes>

      {/* Mentor Routes */}
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<MentorLayout />}>
            <Route path="/mentor">
              <Route index element={<DashBoard />} />
              <Route path="students" element={<Students />} />
              <Route path="reviews" element={<Reviews />} />
            </Route>
          </Route>
        </Route>
      </Routes>

      {/* Mentee Routes */}
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<MenteeLayout />}>
            <Route path="/mentee">
              <Route index element={<MenteeDashBoard />} />
              <Route path="mentors" element={<div>Find Mentors</div>} />
              <Route path="reviews" element={<div>My Reviews</div>} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App