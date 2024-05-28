import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Pages/HomePage/Home"
import Auth from "./Pages/AuthPage/Auth"
import PageLayout from "./Layouts/PageLayout"
import PrivateRoute from "./PrivateRoute"
import { AuthProvider } from "./contexts/AuthContext"

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <PageLayout>
          <Routes>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </PageLayout>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
