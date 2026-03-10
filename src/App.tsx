import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import { SignIn } from "./components/Auth"
import AuthLayout from "./layouts/Authlayout"


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
        </Route>
      </Routes>
    </div>
  )
}

export default App