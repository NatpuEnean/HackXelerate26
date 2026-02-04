import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";

import Button from "./Button";

const navItems = ["Home", "Gallery", "Agenda", "FAQ", "Contact"];

const NavBar = () => {
  // Audio states
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [showMusicPrompt, setShowMusicPrompt] = useState(true);

  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Load saved preference
  useEffect(() => {
    const savedPreference = localStorage.getItem("musicPreference");
    if (savedPreference) {
      const shouldPlay = savedPreference === "on";
      setIsAudioPlaying(shouldPlay);
      setIsIndicatorActive(shouldPlay);
      setShowMusicPrompt(false);
    }
  }, []);

  // Play / pause audio
  useEffect(() => {
    if (!audioElementRef.current) return;

    if (isAudioPlaying) {
      audioElementRef.current.play().catch(() => {});
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  // Navbar scroll behavior
  useEffect(() => {
    if (!navContainerRef.current) return;

    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  // GSAP animation
  useEffect(() => {
    if (!navContainerRef.current) return;

    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  // Handlers
  const handleMusicOn = () => {
    localStorage.setItem("musicPreference", "on");
    setIsAudioPlaying(true);
    setIsIndicatorActive(true);
    setShowMusicPrompt(false);
  };

  const handleMusicOff = () => {
    localStorage.setItem("musicPreference", "off");
    setIsAudioPlaying(false);
    setIsIndicatorActive(false);
    setShowMusicPrompt(false);
  };

  const toggleAudioIndicator = () => {
    const newState = !isAudioPlaying;
    localStorage.setItem("musicPreference", newState ? "on" : "off");
    setIsAudioPlaying(newState);
    setIsIndicatorActive(newState);
  };

  return (
    <>
      {/* Music Permission Popup */}
      {showMusicPrompt && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70">
          <div className="bg-white rounded-xl p-6 text-center space-y-4 w-80">
            <h2 className="text-xl font-bold">Background Music</h2>
            <p>Do you want to turn on the music?</p>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleMusicOn}
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
              >
                ON
              </button>

              <button
                onClick={handleMusicOff}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                OFF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <div
        ref={navContainerRef}
        className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
      >
        <header className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="flex size-full items-center justify-between p-4">
            {/* Logo and Register Button */}
            <div className="flex items-center gap-7">
              <img
                src="/img/logo.png"
                alt="logo"
                className="w-10 h-auto rounded-2xl"
              />

              <a href="https://unstop.com/o/gF5SJXC?utm_medium=Share&utm_source=logged_out_user&utm_campaign=Online_coding_challenge">
                <Button
                  id="reg-btn"
                  title="Register Now"
                  rightIcon={<TiLocationArrow />}
                  containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
                />
              </a>
            </div>

            {/* Nav Links + Audio Button */}
            <div className="flex h-full items-center">
              <div className="hidden md:block">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={`#${item.toLowerCase()}`}
                    className="nav-hover-btn"
                  >
                    {item}
                  </a>
                ))}
              </div>

              {/* Audio Toggle Button */}
              <button
                onClick={toggleAudioIndicator}
                className="ml-10 flex items-center space-x-0.5"
              >
                <audio
                  ref={audioElementRef}
                  className="hidden"
                  src="/audio/loop.mp3"
                  loop
                />

                {[1, 2, 3, 4].map((bar) => (
                  <div
                    key={bar}
                    className={clsx("indicator-line", {
                      active: isIndicatorActive,
                    })}
                    style={{ animationDelay: `${bar * 0.1}s` }}
                  />
                ))}
              </button>
            </div>
          </nav>
        </header>
      </div>
    </>
  );
};

export default NavBar;
