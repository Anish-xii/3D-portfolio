import React, { useState, useEffect } from 'react';

const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.github.com/users/Anish-xii/repos')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setRepos(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section className='max-container'>
      <h1 className='head-text'>
        Welcome to My{" "}
        <span className='blue-gradient_text font-semibold drop-shadow'>
          Projects
        </span>{" "}
        Showcase 🚀
      </h1>

      <div className='mt-5 flex flex-col gap-3 text-slate-500'>
        <p>
          Here you can explore some of the projects I’ve worked on. Each project demonstrates my skills and passion for coding. Feel free to explore and learn more about my work!
        </p>
      </div>

      <div className='py-10 flex flex-col'>
        <div className='grid-container'>
          {repos.map(repo => (
            <RepoDetail key={repo.id} repo={repo} />
          ))}
        </div>
      </div>

      <div className='py-10 flex flex-col'>
        <h3 className='subhead-text'>Thank You!</h3>
        <div className='mt-5 flex flex-col gap-3 text-slate-500'>
          <p>
            Thank you for taking the time to review my projects. Your interest is greatly appreciated. If you have any questions or feedback, feel free to reach out!
          </p>
        </div>
      </div>
    </section>
  );
}

const RepoDetail = ({ repo }) => {
  const creationDate = new Date(repo.created_at).toLocaleDateString();

  return (
    <div className="repo-box">
      <h2 className="repo-title">{repo.name.length > 25 ? `${repo.name.substring(0, 25)}...` : repo.name}</h2>
      <p className="text-sm text-gray-600 mb-2">Posted on: {creationDate}</p>
      <a 
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="read-more-button"
      >
        Learn More
      </a>
    </div>
  );
}

export default Projects;
