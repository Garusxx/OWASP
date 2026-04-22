import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from "./pages/Home"
import Owasp from "./pages/Owasp"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/owasp" element={<Owasp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App