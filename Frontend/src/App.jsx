// import { QueryClientProvider } from "@tanstack/react-query"
// import { Example } from './pages/Tans.jsx'
// import queryClient from "./queryClient.js"
import GreenHouse from "./pages/GreenHouse.jsx"
import Home from "./pages/Home.jsx"
import Irrigation from "./pages/Irrigation.jsx"
import Login from "./pages/Login.jsx"
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar.jsx'

function App() {
    return (
      <div className='px-4 sm-[5vw] md:px-[7vw] lg:px-[9vw]'>
      {/* <QueryClientProvider client={queryClient}>
        <Example/>
      </QueryClientProvider> */}
      <Navbar />
      <Routes>
        <Route path = "/" element={<Home />} />
        <Route path = "/green" element={< GreenHouse/>} />
        <Route path = "/irrigation" element={<Irrigation/>} />
        <Route path = "/login" element={<Login/>} />
      </Routes>
      </div>
    )
  }

  export default App;