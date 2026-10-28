import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import Lenis from "lenis";
import gsap from "gsap";
import { Sparkles } from "lucide-react";

export function SpaceEffects() {
  const reduced = useReducedMotion();
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const x = useSpring(cursorX, { stiffness: 450, damping: 30 });
  const y = useSpring(cursorY, { stiffness: 450, damping: 30 });
  const [hovered, setHovered] = useState(false);
  const [fine, setFine] = useState(false);
  const stars = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setFine(window.matchMedia("(pointer: fine)").matches);
    const move = (event: PointerEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      setHovered(
        Boolean((event.target as Element).closest("a, button, input, textarea, .tilt-card")),
      );
    };
    window.addEventListener("pointermove", move);
    if (reduced) return () => window.removeEventListener("pointermove", move);
    const lenis = new Lenis({ duration: 1.25, smoothWheel: true, anchors: true });
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    const tween = gsap.to(stars.current, {
      y: -80,
      rotation: 3,
      duration: 40,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
      lenis.destroy();
      tween.kill();
    };
  }, [cursorX, cursorY, reduced]);
  return (
    <>
      <div className="space-dust" ref={stars} aria-hidden="true">
        {Array.from({ length: 70 }, (_, i) => (
          <i
            key={i}
            className={`dust dust-${i % 10}`}
            style={{ left: `${(i * 37.31) % 100}%`, top: `${(i * 19.77) % 100}%` }}
          />
        ))}
      </div>
      {fine && !reduced && (
        <motion.div
          className="ai-cursor"
          style={{ x, y }}
          animate={{ scale: hovered ? 2.2 : 1 }}
          aria-hidden="true"
        >
          <span />
        </motion.div>
      )}
    </>
  );
}

export function BootSequence() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) {
      setVisible(false);
      return;
    }
    const interval = window.setInterval(() => setProgress((p) => Math.min(100, p + 10)), 65);
    const timeout = window.setTimeout(() => setVisible(false), 950);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [reduced]);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="boot-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div animate={{ rotate: 180 }} transition={{ duration: 2, ease: "easeInOut" }}>
            <Sparkles size={42} strokeWidth={1} />
          </motion.div>
          <span className="mono">HM / SYSTEM INITIALIZATION</span>
          <strong>
            {progress.toString().padStart(3, "0")}
            <small>%</small>
          </strong>
          <div className="boot-track">
            <motion.div animate={{ width: `${progress}%` }} />
          </div>
          <span className="mono">
            {progress < 40
              ? "RUNNING DIAGNOSTICS"
              : progress < 80
                ? "ACTIVATING PARTICLE FIELD"
                : "ALL SYSTEMS ONLINE"}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
