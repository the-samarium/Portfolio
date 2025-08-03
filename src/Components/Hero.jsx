import React from 'react'
import { FaInstagram, FaLinkedin,FaGithub } from 'react-icons/fa';
import { motion, useScroll } from "motion/react"


const Hero = () => {
    return (
        <div className='w-full min-h-[400px] pr-6 sm:h-[340px] flex flex-col sm:flex-row gap-4 mt-2 p-4 sm:pr-2'>

            <div className='w-full mt-1 sm:w-3/5 h-full flex flex-col justify-center px-4 sm:px-8'>
                <div className="mb-4">
                    <h1 className="text-3xl sm:text-3xl md:text-4xl font-extrabold text-black mb-2">Hello, I'm Sameer</h1>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className='inline-block overflow-hidden relative'
                        style={{ height: '50px', width: 'auto', minWidth: '320px' }}
                    >
                        <motion.h1
                            animate={{
                                y: ['0%', '-100%', '-100%', '0%'],
                                opacity: [1, 0, 0, 1]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0, // First text starts immediately
                                times: [0, 0.25, 0.75, 1]
                            }}
                            className="text-xl sm:text-2xl md:text-3xl font-bold text-black whitespace-nowrap py-1 absolute top-0 left-0"
                        >
                            Engineering Student
                        </motion.h1>

                        <motion.h1
                            animate={{
                                y: ['100%', '0%', '0%', '100%'],
                                opacity: [0, 1, 1, 0]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.3,
                                times: [0, 0.25, 0.75, 1]
                            }}
                            className="text-xl sm:text-2xl md:text-3xl font-bold text-black whitespace-nowrap  absolute top-0 left-0"
                        >
                            Frontend Dev
                        </motion.h1>
                    </motion.div>



                    <h1 className="text-xl sm:text-2xl md:text-3xl text-black mb-4 font-bold">Based in Pune, India.</h1>

                </div>
                <p className="text-sm sm:text-base text-gray-500 font-light">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur accusamus nam commodi praesentium eligendi laudantium reprehenderit minus, mollitia nihil quas, natus voluptatibus omnis aperiam! Fugit, dolore? Quis tenetur, minima consequuntur veniam natus reprehenderit provident? Eos tenetur iste, totam tempore cupiditate blanditiis vel! Illum voluptate vitae cumque possimus a qui tempore!
                </p>
                <div className='links flex flex-row  items-center p-2 gap-5 mt-5'>
                    <a
                        href="https://www.instagram.com/the_samarium?igsh=NHF4N21obTdsM3J6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link hover:scale-110 transition-transform"
                    >
                        <FaInstagram size={20} />
                    </a>
                    <a
                        href="https://github.com/the-samarium"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-md"
                        aria-label="GitHub"
                    >
                        <FaGithub size={20} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/sameer-chavan-93004b2b5?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link hover:scale-110 transition-transform"
                    >
                        <FaLinkedin size={20} />
                    </a>

                    <button
                        onClick={() => window.location.href = 'mailto:arcanevoyger25@gmail.com'}
                        className="inline-flex items-center px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-md hover:bg-gray-700 transition-colors border border-gray-600"
                    >
                        Get in touch
                    </button>

                </div>
            </div>


            <div className='w-full sm:w-2/5 h-64 sm:h-full border border-gray-500 rounded-lg overflow-hidden flex justify-center items-center mt-4 sm:mt-0'>
                <img src="/Assets/Picture.jpg" alt="picture" className='w-full h-full object-cover' />

            </div>
        </div>
    )
}

export default Hero