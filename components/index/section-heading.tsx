"use client";
import { useRef } from "react";
import gsap from "gsap";
import TextPlugin from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";

export default function SectionHeading({
  titleEn,
  titleJa,
}: {
  titleEn: string;
  titleJa: string;
}) {
  gsap.registerPlugin(TextPlugin);
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(SplitText);
  const scope = useRef(null);

  useGSAP(
    () => {
      const splitLines = SplitText.create(".gsap-lines", {
        type: "lines",
        mask: "lines",
      });
      const tlLines = gsap.timeline({
        scrollTrigger: {
          trigger: ".gsap-lines",
          start: "top bottom",
          end: "+=50%",
          toggleActions: "play none none reverse",
        },
      });
      tlLines.from(splitLines.lines, {
        duration: 0.8,
        y: 100,
        autoAlpha: 0,
        stagger: 0.05,
      });

      const typingTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".gsap-typing",
          start: "top bottom",
          end: "+=50%",
          toggleActions: "play none none reset",
        },
      });
      typingTl.to(".gsap-typing", {
        autoAlpha: 1,
        text: titleJa,
        duration: titleJa.length * 0.1,
      });

      gsap.fromTo(
        ".gsap-typing",
        1,
        {
          "border-right-color": "rgba(255,255,255,0.8)",
        },
        {
          "border-right-color": "rgba(255,255,255,0)",
          repeat: -1,
          ease: "steps(1)",
        },
      );
    },
    { scope: scope }
  );

  return (
    <h2 ref={scope} className="text-4xl lg:text-5xl font-light w-full overflow-y-hidden divide-effect">
      <p className="font-mono text-sm opacity-60 px-1 gsap-lines">{titleEn}</p>
      <span className="gsap-typing overflow-hidden border-r-4"></span>
    </h2>
  );
}
