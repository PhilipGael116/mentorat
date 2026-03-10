import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import { SignIn } from "./components/Auth"
import AuthLayout from "./layouts/Authlayout"
import SignUp from "./components/Auth/signup-mentor/Signup"
import RegistrationWizzard from "./components/Auth/signup-mentor/RegistrationWizzard"
import SignUpMentee from "./components/Auth/signup-mentee/SignUpMentee"
import MentorLayout from "./layouts/MentorLayout"
import DashBoard from "./pages/Mentor/DashBoard"

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
        <Route element={<MentorLayout />}>
          <Route path="/mentor" element={<DashBoard />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App