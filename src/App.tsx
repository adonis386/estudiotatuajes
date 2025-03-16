import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import Header from './components/Header'
import Footer from './components/Footer'
import Loading from './components/Loading'
import Home from './pages/Home'
import Login from './pages/Login'
import Admin from './pages/Admin'

function App() {
  const { loading } = useAuth()

  if (loading) {
    return <Loading />
  }

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
