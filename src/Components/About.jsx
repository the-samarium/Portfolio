import React from 'react'
import { motion } from "motion/react"
// import PopUp from './PopUp'

const About = () => {
    return (
        <>
            <div className='w-full h-auto p-3 sm:p-5 text-white bg-black'>
                <div className="w-full flex justify-start mb-3">
                    <h2 className="text-xl sm:text-2xl font-bold">About Me</h2>
                </div>
                <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-4 mt-3 p-2 sm:p-3'>
                    <div className='w-full h-auto lg:border-r lg:border-gray-700 lg:pr-5'>
                        <p className="text-sm sm:text-base leading-relaxed">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id, voluptate. Ratione, magnam similique debitis, ex sint accusantium porro veritatis praesentium asperiores earum cupiditate? Ullam voluptas voluptatum rerum unde? Sint incidunt voluptates, cupiditate voluptatibus esse deserunt? Delectus enim placeat inventore! Tempora dolores alias sequi saepe. Nobis quasi temporibus rem eligendi rerum!
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