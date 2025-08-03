import React from 'react'
import { FaReact, FaCss3Alt, FaHtml5, FaJs, FaNodeJs, FaGitAlt, FaGithub } from 'react-icons/fa';
import { SiTailwindcss, SiMongodb, SiExpress, SiRedux, SiFramer } from 'react-icons/si';
import { motion } from 'framer-motion'

const skills = [
    { name: "ReactJS", icon: <FaReact size={50} className="text-white" /> },
    { name: "HTML5", icon: <FaHtml5 size={50} className="text-white" /> },
    { name: "CSS3", icon: <FaCss3Alt size={50} className="text-white" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss size={50} className="text-white" /> },
    { name: "JavaScript", icon: <FaJs size={50} className="text-white" /> },
    { name: "Node.js", icon: <FaNodeJs size={50} className="text-white" /> },
    { name: "Express", icon: <SiExpress size={50} className="text-white" /> },
    { name: "MongoDB", icon: <SiMongodb size={50} className="text-white" /> },
   
    { name: "Git", icon: <FaGitAlt size={50} className="text-white" /> },
    { name: "Github", icon: <FaGithub size={50} className="text-white" /> },
    { name: "Motion", icon: <SiFramer size={50} className="text-white" /> }
];
const logos = [
    { name: "ReactJS", icon: <FaReact size={30} className="text-black" /> },
    { name: "HTML5", icon: <FaHtml5 size={30} className="text-orange-400" /> },
    { name: "CSS3", icon: <FaCss3Alt size={40} className="text-blue-600" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss size={30} className="text-cyan-400" /> },
    { name: "JavaScript", icon: <FaJs size={30} className="text-yellow-400" /> },
    { name: "Node.js", icon: <FaNodeJs size={30} className="text-green-600" /> },
    { name: "Express", icon: <SiExpress size={30} className="text-gray-400" /> },
    { name: "MongoDB", icon: <SiMongodb size={30} className="text-green-700" /> },
    { name: "Redux", icon: <SiRedux size={30} className="text-purple-600" /> },
    { name: "Git", icon: <FaGitAlt size={30} className="text-orange-600" /> },
];

const Skills = () => {

    const scrollingList = [...logos, ...logos, ...logos];

  
    const skillsWithDots = ["Node.js", "MongoDB", "Express"]; //To make dot

    return (
        <div className="w-full p-5 flex flex-col m-3 items-center">
            <div className="w-full flex justify-start mb-3">
                <h2 className="text-2xl font-bold dark:text-white">My Skills</h2>
            </div>

            <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1 pr-5 pl-5 mt-6 ">
                {skills.map((skill, idx) => (
                    <div className="flex justify-center">
                        <div
                            key={idx}
                            className="relative group bg-black border-double border-4 border-white rounded-md shadow flex flex-col items-center justify-center h-32 cursor-pointer transition w-2/3 hover:scale-90"

                        >

                            {skillsWithDots.includes(skill.name) && (
                                <motion.div
                                    initial={{  opacity: 1 }}
                                    animate={{  opacity: 0 }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}

                                    className="absolute top-2 right-2 w-2 h-2 bg-green-500 shadow-[0_0_20px_rgba(6,182,212,1)]  shadow-green-400/60 rounded-full"></motion.div>
                            )}

                            <div className="transition-opacity duration-300 group-hover:opacity-0 flex items-center justify-center h-full">
                                {skill.icon}
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="text-xl font-semibold text-white">{skill.name}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>



            {/* Scrolling */}
            <div className="w-full overflow-hidden mt-8">
                <motion.div
                    className='flex gap-10 w-fit'
                    animate={{ x: ['0%', '-40%'] }}
                    transition={{
                        duration: 30,
                        ease: 'linear',
                        repeat: Infinity,
                    }}
                >
                    {scrollingList.map((skill, index) => (
                        <div key={index} className="flex items-center justify-center flex-shrink-0">
                            {skill.icon}
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Skills;
