import React from 'react'
import { motion } from "motion/react"
// import PopUp from './PopUp'

const About = () => {
    return (
        <>
            <div id='about' className='w-full h-auto p-3 sm:p-5 text-white bg-black'>
                <div className="w-full flex justify-start mb-3">
                    <h2 className="text-xl sm:text-2xl font-bold">About Me</h2>
                </div>
                <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-4 mt-3 p-2 sm:p-3'>
                    <div className='w-full h-auto lg:border-r lg:border-gray-700 lg:pr-5'>
                        <p className="text-sm sm:text-base  font-light leading-relaxed">
                            I'm a Third Year Electronics and Telecommunication undergraduate student at Vishwakarma Institute of Information Technology, maintaining a strong academic record with a current GPA of 8.7. My passion lies at the intersection of hardware and software technologies, with a particular interest in the semiconductor industry and its cutting-edge developments. I'm also deeply fascinated by software engineering, currently expanding my knowledge in backend development to build a comprehensive skill set that bridges both domains. My academic excellence reflects my dedication to learning and my ability to excel in complex technical environments.
                        </p>
                    </div>
                    <div className="sec w-full h-auto flex justify-center items-center p-2 sm:p-5">
                        <img
                            src="/Assets/image.png"
                            className='max-w-full max-h-60 sm:max-h-80 object-contain border border-gray-600 p-2 sm:p-3 rounded-lg bg-white'
                            alt="me"
                        />
                    </div>
                </div>

            </div>
            
        </>
    )
}

export default About