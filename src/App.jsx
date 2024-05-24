import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Pages/HomePage/Home"
import Auth from "./Pages/AuthPage/Auth"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
