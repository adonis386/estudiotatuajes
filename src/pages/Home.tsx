import Hero from '../components/Hero'
import Gallery from '../components/Gallery'
import QuoteCalculator from '../components/QuoteCalculator'

const Home = () => {
  return (
    <>
      <Hero />
      <main>
        <Gallery />
        <QuoteCalculator />
      </main>
    </>
  )
}

export default Home
