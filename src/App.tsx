import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import { Header } from "./components/Home/Header"

const App = () => {
  return (
    <div className="bg-primary min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} index />
      </Routes>
    </div>
  )
}

export default App