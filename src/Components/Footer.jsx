import React from 'react';
import { SiGithub, SiInstagram, SiLinkedin } from "react-icons/si";

const Footer = () => {
  return (
    <footer id='contact' className="bg-black text-white border-t border-gray-700 py-12 mt-16">
      <div className="max-w-4xl mx-auto px-6">

        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-semibold text-white mb-2">Sameer</h3>
            <p className="text-gray-400 text-sm">Frontend Developer</p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <p className="text-gray-300 text-sm mb-4 text-center md:text-right">
              Let's work together
            </p>
            <a
              href="mailto:arcanevoyger25@gmail.com?subject=Contact%20from%20Portfolio"
              className="inline-flex items-center px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-md hover:bg-gray-700 transition-colors border border-gray-600"
              style={{ textDecoration: 'none' }}
            >
              Get in touch
            </a>
            
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-700">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a
              href="https://github.com/the-samarium"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-md"
              aria-label="GitHub"
            >
              <SiGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/sameer-chavan-93004b2b5?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-md"
              aria-label="LinkedIn"
            >
              <SiLinkedin size={20} />
            </a>
            <a
              href="https://www.instagram.com/the_samarium?igsh=NHF4N21obTdsM3J6"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-md"
              aria-label="Instagram"
            >
              <SiInstagram size={20} />
            </a>
          </div>

          <p className="text-gray-400 text-xs">
            &copy; {new Date().getFullYear()} Sameer.
          </p>
        </div>
        <div className='flex justify-center items-center'>
        <p className="text-slate-900 opacity-35  text-xs">JMM</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
