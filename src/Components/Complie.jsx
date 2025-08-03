// This file will be used to compile all the components togerther to display this single component in app
import React from 'react'
import { useEffect } from 'react'
import Hero from './Hero'
import Lenis from 'lenis'
import Skills from './Skills'
import About from './About'
import Projects from './Projects'
import Informal from './Informal'
import Timeline from './Timeline'
const Complie = () => {

  // Initialize Lenis
  const lenis = new Lenis();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className='w-11/12 h-full min-h-screen mt-4 rounded-lg bg-white shadow-lg m-1 border flex flex-col items-center  sm:'>
      <Hero />
      <Skills />
      <About />
      <Projects />
      <Informal />

    </div>
  )
}
<script src="https://unpkg.com/lenis@1.3.8/dist/lenis.min.js"></script>

export default Complie