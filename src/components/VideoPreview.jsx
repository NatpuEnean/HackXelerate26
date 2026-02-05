import { gsap } from "gsap";
import { useState, useRef, useEffect } from "react";

export const VideoPreview = ({ children }) => {
  const [isHovering, setIsHovering] = useState(false);

  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  const moveSectionX = useRef(null);
  const moveSectionY = useRef(null);
  const moveContentX = useRef(null);
  const moveContentY = useRef(null);

  useEffect(() => {
    moveSectionX.current = gsap.quickTo(sectionRef.current, "x", {
      duration: 0.3,
      ease: "power2.out",
    });
    moveSectionY.current = gsap.quickTo(sectionRef.current, "y", {
      duration: 0.3,
      ease: "power2.out",
    });

    moveContentX.current = gsap.quickTo(contentRef.current, "x", {
      duration: 0.3,
      ease: "power2.out",
    });
    moveContentY.current = gsap.quickTo(contentRef.current, "y", {
      duration: 0.3,
      ease: "power2.out",
    });
  }, []);

  const handleMouseMove = ({ clientX, clientY, currentTarget }) => {
    if (!isHovering) return;

    const rect = currentTarget.getBoundingClientRect();

    let xOffset = clientX - (rect.left + rect.width / 2);
    let yOffset = clientY - (rect.top + rect.height / 2);

    // normalize + limit movement
    xOffset = gsap.utils.clamp(-30, 30, xOffset / 10);
    yOffset = gsap.utils.clamp(-30, 30, yOffset / 10);

    moveSectionX.current(xOffset);
    moveSectionY.current(yOffset);

    moveContentX.current(-xOffset);
    moveContentY.current(-yOffset);
  };

  useEffect(() => {
    if (!isHovering) {
      gsap.to(sectionRef.current, {
        x: 0,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        duration: 0.4,
        ease: "power2.out",
      });

      gsap.to(contentRef.current, {
        x: 0,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  }, [isHovering]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="absolute z-50 size-full overflow-hidden rounded-lg"
      style={{ perspective: "500px" }}
    >
      <div
        ref={contentRef}
        className="origin-center rounded-lg"
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </div>
    </section>
  );
};

export default VideoPreview;
