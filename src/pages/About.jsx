import React from 'react'
import { experiences, skills } from "../constants";

const About = () => {
  return (
    <section className='max-container'>
      <h1 className='head-text'>
        Hey, I'm{" "}
        <span className='blue-gradient_text font-semibold drop-shadow'>
          {" "}
          Anish
        </span>{" "}
        👋
      </h1>

      <div className='mt-5 flex flex-col gap-3 text-slate-500'>
        <p>
        A computer science student at Coventry University. 
        I’m excited to share my projects with you. Feel free to explore and see what I've been working on!
        </p>
      </div>

      <div className='py-10 flex flex-col'>
       <h3 className='subhead-text'>My Skills</h3>
       <div className='mt-16 flex flex-wrap gap-12'>
       {skills.map((skill) => (
            <div className='block-container w-20 h-20' key={skill.name}>
              <div className='btn-back rounded-xl' />
              <div className='btn-front rounded-xl flex justify-center items-center'>
                <img
                  src={skill.imageUrl}
                  alt={skill.name}
                  className='w-1/2 h-1/2 object-contain'
                />
              </div>
            </div>
          ))}
       </div>
      </div>

      <div className='py-10 flex flex-col'>
      <h3 className='subhead-text'>Passions and Hobbies</h3>
      <div className='mt-5 flex flex-col gap-3 text-slate-500'>
        <p>
        I’m passionate about anime for its imaginative stories. 
        I love traveling to experience diverse cultures and broaden my perspectives, photography to capture and share beautiful moments,
          while cycling keeps me active and lets me explore new places.
        </p>
      </div>
      </div>
      
    </section>
  )
}

export default About