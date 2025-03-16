import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Gallery from './components/Gallery'
import AboutMe from './components/AboutMe'
import Contact from './components/Contact'
import Login from './pages/Login'
import Admin from './pages/Admin'
import PrivateRoute from './components/PrivateRoute'
import Loading from './components/Loading'

function App() {
  const { loading } = useAuth()

  if (loading) {
    return <Loading />
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <main>
              <Hero />
              <Gallery />
              <AboutMe />
              <Contact />
            </main>
            <Footer />
          </>
        } />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/admin" 
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  )
}

export default App
