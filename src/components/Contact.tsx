import type { FC } from 'react'
import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'

const Contact: FC = () => {
  return (
    <section id="cotizacion" className="py-20 bg-black/90">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-birthstone text-[#C4A962] mb-8">
              Cotización
            </h2>

            <div className="bg-black/50 p-8 rounded-lg backdrop-blur-md border border-[#C4A962]/20">
              <p className="text-gray-300 source-sans-3-regular mb-8">
                Para solicitar una cotización, contáctame a través de WhatsApp. 
                Describe tu idea y envía referencias visuales si las tienes. 
                Te responderé lo antes posible con un presupuesto personalizado.
              </p>

              <a 
                href="https://wa.link/535p53" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 py-3 px-6 rounded bg-[#C4A962] text-black font-birthstone text-xl hover:bg-[#C4A962]/90 transition-colors"
              >
                <FaWhatsapp className="text-2xl" />
                Solicitar Cotización
              </a>

              <div className="mt-8 text-sm text-gray-400 source-sans-3-regular">
                * El precio final puede variar según el tamaño, complejidad y tiempo requerido.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
