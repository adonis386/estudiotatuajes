import React from 'react'
import bannerWebp from '../assets/banner-1.webp'

const AboutMe: React.FC = () => {
  return (
    <section id="sobre-mi" className="py-20 bg-black/90">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-birthstone text-[#C4A962] text-center mb-12">
          Sobre Mí
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
            <img
              src={bannerWebp}
              alt="Artista tatuador"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          <div className="space-y-6">
            <h3 className="text-3xl font-birthstone text-[#C4A962]">
              Denis Tatuajes
            </h3>
            <p className="text-white/80 source-sans-3-regular">
              Con más de 5 años de experiencia en el arte del tatuaje, me especializo en crear diseños únicos que reflejan la personalidad y la historia de cada cliente.
            </p>
            <p className="text-white/80 source-sans-3-regular">
              Mi pasión por el arte y la atención al detalle me permite ofrecer trabajos de alta calidad en diversos estilos, desde el realismo hasta diseños asiáticos tradicionales.
            </p>
            <p className="text-white/80 source-sans-3-regular">
              Trabajo con las mejores máquinas y tintas del mercado, siguiendo estrictos protocolos de higiene para garantizar la seguridad y satisfacción de mis clientes.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutMe
