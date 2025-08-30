import './App.css';
import { useEffect, useState, useRef } from 'react';
import { useScramble } from 'use-scramble';
import { BulbOffIcon, BulbOnIcon } from './assets/BulbIcon.tsx';
import {
  DiscordIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
} from './assets/SocialIcon.tsx';

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const bulbIconContainerRef = useRef<HTMLDivElement>(null);
  const laserLineRef = useRef<HTMLDivElement>(null);

  const handleBulbClick = () => {
    setIsModalVisible((prevState) => !prevState);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(e.target as Node) &&
      bulbIconContainerRef.current &&
      !bulbIconContainerRef.current.contains(e.target as Node)
    ) {
      closeModal();
    }
  };

  const { ref: scrambleRef, replay: replayScramble } = useScramble({
    text: 'Ganar KF',
    speed: 0.5,
    step: 1,
    tick: 1,
    scramble: 5,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      replayScramble();
    }, 7500);
    return () => clearInterval(interval);
  }, [replayScramble]);

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    const profilePicture = document.querySelector('.profile-picture');
    if (profilePicture) {
      profilePicture.addEventListener('contextmenu', (e) => e.preventDefault());
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick);
      if (profilePicture) {
        profilePicture.removeEventListener('contextmenu', (e) =>
          e.preventDefault()
        );
      }
    };
  }, []);

  useEffect(() => {
    const updateLaserLinePosition = (laserLine: HTMLDivElement) => {
      const randomTop = Math.random() * 100;
      laserLine.style.top = `${randomTop}%`;
    };

    const laserLines = document.querySelectorAll<HTMLDivElement>('.laser-line');
    laserLines.forEach((laserLine) => {
      laserLine.addEventListener('animationiteration', () =>
        updateLaserLinePosition(laserLine)
      );
      updateLaserLinePosition(laserLine);
    });

    return () => {
      laserLines.forEach((laserLine) => {
        laserLine.removeEventListener('animationiteration', () =>
          updateLaserLinePosition(laserLine)
        );
      });
    };
  }, []);

  return (
    <>
      <div className="laser-line" ref={laserLineRef}></div>
      <div className="laser-line" ref={laserLineRef}></div>

      <div
        className="bulb-icon-container"
        onClick={handleBulbClick}
        ref={bulbIconContainerRef}
      >
        <BulbOffIcon width={32} height={32} />
        <BulbOnIcon width={32} height={32} />
      </div>

      <div className={`modal ${isModalVisible ? 'show' : ''}`} ref={modalRef}>
        <div className="modal-content">
          <p>Don’t turn on the light, it'll hurt your eyes.</p>
        </div>
      </div>

      <div className="header-profile">
        <img
          src="https://i.ibb.co.com/KDgmr7s/ganarkf-pp.png"
          alt="Ganar KF"
          className="profile-picture"
        />
        <div className="profile-intro">
          <p className="hi-text">Hi, I'm</p>
          <p className="name" ref={scrambleRef}></p>
          <p className="headline">Software & Systems Engineer</p>
        </div>
      </div>

      <div className="about">
        <p>
          Sup! I'm a Software Engineer, just out here learnin' everything I want. 
          My journey started with a love for taking tons of experiments and ideas, 
          then turning them into neat lines of code.
          Right now, I'm interested for vibin' and playin' on the chain. 
          I'm very obsessed with solving problems and always hungry for new challenges and new things.
        </p>
        <p>
        My free time? I jam on drums and guitar, 
        usually sticking to my genre though people often nudge me to switch it up when I play, haha. 
        I’m also big into AAA games, diving into those epic worlds whenever I get the chance. 
        Hit me up for a coffee break and some chill talks!
        </p>
      </div>

      <div className="social-links">
        <a
          href="https://discord.com/users/324434882992275456"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <DiscordIcon width={48} height={48} />
        </a>
        <a
          href="https://github.com/ganarkf"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <GitHubIcon width={48} height={48} />
        </a>
        <a
          href="https://www.linkedin.com/in/ganarkfz/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <LinkedInIcon width={48} height={48} />
        </a>
        <a
          href="https://www.instagram.com/ganarkf/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <InstagramIcon width={48} height={48} />
        </a>
        <a
          href="mailto:gnrkfz@gmail.com?subject=Inquiry%20About%20[Topic]&body=Hi,%20"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <MailIcon width={48} height={48} />
        </a>
      </div>

      <div className="projects">
        <p className="projects-head">Projects</p>
        <div className="project-cards-container">
          <div className="project-card">
            <a
              href="https://www.linkedin.com/in/ganarkfz/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://i.ibb.co.com/9Thqy8F/linkedin-cover.png"
                className="project-image"
              />
            </a>
            <div className="project-body">
              <h3 className="project-title">Psychological Tests Web</h3>
              <p className="project-description">
                A web-based psychometric app built with Laravel and TailwindCSS
                for Biro Psikologi Poros Semarang. Simple and easy interface for
                client and admin.
              </p>
              <div className="project-footer">
                <p>Web</p>
                <p>2024</p>
              </div>
            </div>
          </div>

          <div className="project-card">
            <a
              href="https://ganarkf.github.io/movie-recommendation/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://i.ibb.co.com/r02YMcF/github-cover.png"
                className="project-image"
              />
            </a>
            <div className="project-body">
              <h3 className="project-title">Movie Recommendation</h3>
              <p className="project-description">
                A simple responsive movie recommendation fullstack web app built
                with React (Vite) and FastAPI, deployed with Google Cloud Run.
              </p>
              <div className="project-footer">
                <p>Web</p>
                <p>2024</p>
              </div>
            </div>
          </div>

          <div className="project-card">
            <a
              href="https://github.com/ganarkf/solana-wallet-checker"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://i.ibb.co.com/r02YMcF/github-cover.png"
                className="project-image"
              />
            </a>
            <div className="project-body">
              <h3 className="project-title">Solana Wallet Checker</h3>
              <p className="project-description">
                Mass scanning of Solana wallets using the GMGN API with Selenium
                and Python.
              </p>
              <div className="project-footer">
                <p>Script</p>
                <p>2024</p>
              </div>
            </div>
          </div>

          <div className="project-card">
            <a
              href="https://github.com/ganarkf/ds-top-traders"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://i.ibb.co.com/r02YMcF/github-cover.png"
                className="project-image"
              />
            </a>
            <div className="project-body">
              <h3 className="project-title">Get DS Top Traders</h3>
              <p className="project-description">
                Get Solana token top traders wallet list from DEXScreener. Built
                with Selenium and Python.
              </p>
              <div className="project-footer">
                <p>Script</p>
                <p>2024</p>
              </div>
            </div>
          </div>

          <div className="project-card">
            <a
              href="https://ganarkf.github.io/login-page-example-react/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://i.ibb.co.com/7J0n6s3M/web-cover.png"
                className="project-image"
              />
            </a>
            <div className="project-body">
              <h3 className="project-title">Login Page Example</h3>
              <p className="project-description">
                Login page example for coal transhipment company. Built with React and Vite.
              </p>
              <div className="project-footer">
                <p>Web</p>
                <p>2025</p>
              </div>
            </div>
          </div>

          <div className="project-card">
            <a
              href="https://ganarkf.github.io/reimbursement-form-example-codeigniter3/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://i.ibb.co.com/7J0n6s3M/web-cover.png"
                className="project-image"
              />
            </a>
            <div className="project-body">
              <h3 className="project-title">Reimbursement Form Example</h3>
              <p className="project-description">
                Reimbursement form page example. Built with CodeIgniter3.
              </p>
              <div className="project-footer">
                <p>Web</p>
                <p>2025</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
