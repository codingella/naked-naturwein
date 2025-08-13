// components/PathRevealOnCenter.jsx
import { useEffect, useRef } from "react";
import { useScroll } from "framer-motion";

export default function PathRevealOnCenter({ children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end 80%"], // 0..1 as the group crosses viewport center
  });

  // only touch paths whose visibility changed since last tick
  const prevCountRef = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const paths = Array.from(el.querySelectorAll("path"));
    // normalize & give each a tiny stagger via CSS var if you want
    paths.forEach((p, i) => {
      if (!p.hasAttribute("pathLength")) p.setAttribute("pathLength", "1");
    });

    const unsub = scrollYProgress.on("change", (v) => {
      const clamped = Math.max(0, Math.min(1, v));
      const nextCount = Math.floor(paths.length * clamped);
      const prevCount = prevCountRef.current;
      if (nextCount === prevCount) return;

      if (nextCount > prevCount) {
        // reveal newly included paths
        for (let i = prevCount; i < nextCount; i++) {
          const p = paths[i];
          if (p) p.style.strokeDashoffset = "1";
        }
      } else {
        // hide paths that fell out of range (on scroll up)
        for (let i = nextCount; i < prevCount; i++) {
          const p = paths[i];
          if (p) p.style.strokeDashoffset = "0";
        }
      }
      prevCountRef.current = nextCount;
    });

    return () => unsub();
  }, [scrollYProgress]);

  // must be an SVG <g> so it can wrap your <g className={style.staggerMask}>…</g>
  return <g ref={ref}>{children}</g>;
}
