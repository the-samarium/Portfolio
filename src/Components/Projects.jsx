import React from 'react'
import { FaArrowRight } from 'react-icons/fa';
import { SiGithub } from 'react-icons/si';
import { motion } from 'framer-motion';

const live = ['Paste']
const projectList = [
  {
    title: 'Paste',
    description: 'A note taking app, with "copy-paste" feature. Made using ReactJS and browser storage.',
    link:'https://github.com/the-samarium/Paste-App.git',
    tech: ['ReactJS', 'Tailwind', 'CSS', 'router']
  },
  {
    title: 'Modern Landing Page',
    description: 'Designed a modern landing page using ReactJS and tried a bit GSAP styling.',
    tech: ['ReactJS', 'Tailwind', 'CSS'],
    link:'https://github.com/the-samarium/Brand-Landing-Page-using-React.git',

  },
  {
    title: 'NuroLink',
    description: 'An application, used to improve cognitive ability and memory through games.',
    tech: ['Node.js', 'ejs', 'RESTapi', 'MongoDB', 'Router','GEMINI api'],
    link:'https://github.com/the-samarium/NeuroLink.git',
  },
]

const Projects = () => {
  return (
    <>
      <div id='projects' className='w-full h-auto flex flex-col justify-center items-center p-3 sm:p-5'>
        <div className="w-full flex justify-start mb-3">
          <h2 className="text-xl sm:text-2xl text-black font-bold">Projects</h2>
        </div>
        <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-7 p-5 mt-3'>
          {projectList.map((project, id) => (
            <div key={id} className="w-full h-[400px] bg-black text-white rounded-md overflow-hidden">

              <div className="w-full h-1/2 bg-slate-700 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-slate-700 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <SiGithub size={45} />
                  </div>

                </div>
              </div>


              <div className="w-full h-1/2 p-4 flex flex-col justify-between pb-5">
                <div>
                  <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                  <p className="text-sm text-white leading-relaxed">{project.description}</p>
                </div>
                <div className="flex gap-2 mt-3">
                
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="px-3 py-1 border border-white text-white text-xs rounded hover:bg-white hover:text-black transition-colors">
                    <SiGithub size={20} color='white' />
                  </a>
                </div>
                <div>
                  {project.tech.map((val, id2) => (
                    <span key={id2} className='p-1 bg-white rounded-md text-blue-800 text-[10px] mr-1'>
                      {val}
                    </span>
                  ))}



                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
    </>
  )
}

export default Projects