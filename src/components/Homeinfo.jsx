import { Link } from "react-router-dom";
import { arrow } from "../assets/icons";

const HomeInfo = ({ currentStage }) => {
  if (currentStage === 1)
    return (
      <h1 className='sm:text-lg text-center neo-brutalism-blue py-2 px-4 text-white mx-5'>
        Hi, I'm
        <span className='font-semibold mx-2 text-white'>Anish</span>
        👋
        <br />
         A Compute Science Student
      </h1>
    );

  if (currentStage === 2) {
    return (
      <div className='info-box'>
        <p className='font-normal text-center'>
        Curious about who I am ? 🤔 <br /> Discover more about my journey and passions!
        </p>
        <Link to='/about' className='neo-brutalism-white  neo-btn'>
        About Me
          <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
        </Link>
      </div>
    );
  }

  if (currentStage === 3) {
    return (
      <div className='info-box'>
        <p className='font-normal sm:text-base text-center'>
        See the latest updates and innovations.✌️ <br /> Explore my projects.
        </p>
        <Link to='/projects' className='neo-brutalism-white neo-btn'>
          My Projects
          <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
        </Link>
      </div>
    );
  }

  if (currentStage === 4) {
    return (
      <div className='info-box'>
      <p className='font-medium sm:text-base text-center'>
      Wanna know more about a project? 🤗<br /> Let's chat and dive into the details!
      </p>
      <a 
        href="mailto:abimoko13@gmail.com" // Update with your actual email address
        className='neo-brutalism-white neo-btn'
      >
        Let's talk
        <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
      </a>
    </div>
    );
  }

  return null;
};

export default HomeInfo;




