import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";

import Button from "./Button";
import VideoPreview from "./VideoPreview";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const totalVideos = 2;

  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const currentVideoRef = useRef(null);
  const nextVideoRef = useRef(null);
  const previewVideoRef = useRef(null);

  const getVideoSrc = (index) =>
    `videos/hero-${((index - 1) % totalVideos) + 1}.mp4`;

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex((prev) => prev + 1);
  };

  /* ---------------- CLICK TRANSITION ---------------- */
  useGSAP(
    () => {
      if (!hasClicked) return;

      const nextVideo = nextVideoRef.current;
      if (!nextVideo) return;

      // Force restart
      nextVideo.currentTime = 0;

      const playVideo = () => {
        nextVideo.play().catch(() => {});
      };

      // Ensure browser allows playback
      if (nextVideo.readyState >= 3) {
        playVideo();
      } else {
        nextVideo.addEventListener("canplay", playVideo, { once: true });
      }

      gsap.to(nextVideo, {
        opacity: 1,
        scale: 1,
        width: "100%",
        height: "100%",
        duration: 1,
        ease: "power1.inOut",
      });

      gsap.from("#current-video", {
        scale: 0,
        duration: 1.2,
        ease: "power1.inOut",
      });
    },
    { dependencies: [currentIndex] }
  );

  /* ---------------- SCROLL CLIP ANIMATION ---------------- */
  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });

    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <div id="home" className="relative h-dvh w-screen overflow-x-hidden">
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg"
      >
        {/* MINI PREVIEW */}
        <div className="absolute-center absolute z-10 size-64 cursor-pointer overflow-hidden rounded-lg">
          <VideoPreview>
            <div
              onClick={handleMiniVdClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 hover:scale-100 hover:opacity-100"
            >
              <video
                ref={previewVideoRef}
                src={getVideoSrc(currentIndex + 1)}
                muted
                loop
                playsInline
                preload="auto"
                id="current-video"
                className="size-64 scale-150 object-cover"
                onLoadedData={handleVideoLoad}
              />
            </div>
          </VideoPreview>
        </div>

        {/* NEXT VIDEO (ANIMATED IN) */}
        <video
          ref={nextVideoRef}
          src={getVideoSrc(currentIndex + 1)}
          muted
          loop
          playsInline
          preload="auto"
          className="absolute-center absolute z-20 size-64 scale-0 opacity-0 object-cover"
          onLoadedData={handleVideoLoad}
        />

        {/* CURRENT BACKGROUND VIDEO */}
        <video
          ref={currentVideoRef}
          src={getVideoSrc(currentIndex)}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 size-full object-cover"
          onLoadedData={handleVideoLoad}
        />

        {/* YEAR */}
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          2<b>0</b>
          <span className="text-[#ab1d1d]">26</span>
        </h1>

        {/* TEXT CONTENT */}
        <div className="absolute inset-0 z-40">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              Hack<b className="text-[#ab1d1d] text-[1.3em]">X</b>elerate
            </h1>

            <p className="mb-5 max-w-64 text-blue-100">
              Unleash your skills <br />
              show the world what you got
            </p>

            <a
              href="https://unstop.com/o/gF5SJXC"
              target="_blank"
              rel="noreferrer"
            >
          <Button
  id="reg-btn"
  title="Register Now"
  leftIcon={<TiLocationArrow />}
  containerClass="bg-[#ab1d1d] flex-center gap-2 px-8 py-4 text-lg text-white"
/>
            </a>
          </div>
        </div>
      </div>

      {/* BACK TEXT */}
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        2026
      </h1>
    </div>
  );
};

export default Hero;
