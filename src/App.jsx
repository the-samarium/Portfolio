import React from 'react'
import { motion } from "motion/react"
import Navbar from './Components/Navbar'
import Complie from './Components/Complie'
import Footer from './Components/Footer'

function App() {
  return (
    <>
      {/* Simple animated gradient background */}
      <motion.div
        className="fixed inset-0 -z-10"
        animate={{
          background: [
            'linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #e9ecef 100%)',
            'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #ffffff 100%)',
            'linear-gradient(135deg, #e9ecef 0%, #ffffff 50%, #f8f9fa 100%)'
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut'
        }}
      />

      <Navbar />
      <main className="mt-16 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] relative z-10">
        <Complie />
      </main>
      <Footer />
    </>
  );
}

export default App;
