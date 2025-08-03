import React, { useState } from 'react';
import { motion, useScroll } from "motion/react"
import { Link } from 'react-scroll'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  return (
    <nav className="fixed top-0 left-0 w-full flex flex-col bg-black text-white z-50">

      <div className="flex justify-between items-center border-b border-white px-4 sm:px-8 py-3">
        <span className="text-lg sm:text-xl font-semibold">Sameer Chavan</span>




        <ul className="hidden sm:flex gap-4 sm:gap-6 text-sm sm:justify-center sm:items-center">
          <li><Link to='hero' smooth={true} duration={500} className="hover:text-blue-400 select-none">Home</Link></li>
          <li><Link to='projects' smooth={true} duration={500} className="hover:text-blue-400 select-none">Projects</Link></li>
          <li><Link to='about' smooth={true} duration={500} className="hover:text-blue-400 select-none">About</Link></li>
          <li><Link to='contact' smooth={true} duration={500} className="hover:text-blue-400 select-none">Contact</Link></li>
          <li><a href="/Assets/Sameer_Chavan_CV.pdf" className="text-blue-400 hover:underline block py-2" download="Sameer_Chavan_Resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a></li>
        </ul>


        {/* Mobile Menu Button */}
        <button
          className="sm:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>


      </div>


      <motion.div
        className='w-full h-1 bg-blue-500 shadow-[0_0_20px_rgba(6,182,212,1)]  shadow-blue-600/80 origin-left'
        style={{ scaleX: scrollYProgress }}
      />

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="w-full bg-black border-b border-white sm:hidden">
          <ul className="flex flex-col p-4 gap-3">
            <li><a href="#home" className="hover:underline block py-2">Home</a></li>
            <li><a href="#projects" className="hover:underline block py-2">Projects</a></li>
            <li><a href="#contact" className="hover:underline block py-2">About</a></li>
            <li><a href="#contact" className="hover:underline block py-2">Contact</a></li>
            <li><a href="/Assets/Sameer_Chavan_CV.pdf" className="text-blue-400 hover:underline block py-2" download="Sameer_Chavan_Resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;