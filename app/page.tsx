"use client";

import { motion, useReducedMotion } from "motion/react";

import "./landing.css";
import {
  CUE,
  group,
  inView,
  inViewLine,
  item,
  lift,
  lineReveal,
  navDrop,
  photoFade,
  photoZoom,
  riseIn,
  useFontsReady,
  wipeX,
  wipeY,
} from "./anim";

const PROBLEMS = [
  {
    icon: "/assets/icon-volume.svg",
    title: "High Interview Volume",
    body: "You’re screening hundreds across roles. interviews become rushed, inconsistent, and impossible to standardize.",
  },
  {
    icon: "/assets/icon-attrition.svg",
    title: "High Attrition Roles",
    body: "You're always hiring, but never building a stable pipeline. Every candidate must meet the same bar, every time.",
  },
  {
    icon: "/assets/icon-quality.svg",
    title: "High Quality Hiring",
    body: "You need intelligence, not gut feel. You need high intellect interviewing and evaluations by a domain expert.",
  },
];

export default function Home() {
  const reduce = useReducedMotion();
  const fontsReady = useFontsReady();

  // `initial={false}` renders the resting state and skips the animation entirely.
  const intro = reduce
    ? { initial: false as const, animate: "show" }
    : { initial: "hidden", animate: fontsReady ? "show" : "hidden" };

  const onScroll = reduce
    ? { initial: false as const, animate: "show" }
    : { initial: "hidden", whileInView: "show", viewport: inView };

  const onScrollLine = reduce
    ? { initial: false as const, animate: "show" }
    : { initial: "hidden", whileInView: "show", viewport: inViewLine };

  return (
    <main className="canvas">
      {/* Hero background */}
      <motion.div className="heroPhoto" variants={photoFade} {...intro}>
        <motion.img variants={photoZoom} src="/assets/hero-bg.webp" alt="" />
      </motion.div>
      <div className="topScrim" />

      {/* Nav */}
      <motion.header className="nav" variants={navDrop} {...intro}>
        <div className="brand">
          <img className="mark" src="/assets/logo-star.svg" alt="" />
          <p className="wordmark">Zariya Recruit</p>
        </div>

        <nav className="navLinks">
          <a href="#">About us</a>
          <a href="#">FAQs</a>
          <a href="#">Careers</a>
        </nav>

        <div className="navActions">
          <button className="btnGhost" type="button">
            Login
          </button>
          <button className="btnSolid" type="button">
            Request a Demo
            <span className="arrow">
              <img src="/assets/arrow.svg" alt="" />
            </span>
          </button>
        </div>
      </motion.header>

      {/* Hero copy */}
      <motion.div className="eyebrow" variants={riseIn(CUE.eyebrow)} {...intro}>
        <span className="dot" />
        <span>AI-Powered Hiring · Built for Modern HR Teams</span>
      </motion.div>

      <div className="hero">
        <div className="heroHeadline">
          <h1>
            <motion.span variants={lineReveal(CUE.line1)} {...intro}>
              Hey dear HR,
            </motion.span>
          </h1>
          <h1>
            <motion.span variants={lineReveal(CUE.line2)} {...intro}>
              let us conduct your <em className="italic">interviews</em>
            </motion.span>
          </h1>
        </div>
        <motion.p className="heroSub" variants={riseIn(CUE.sub)} {...intro}>
          {"You're tired of sitting through a thousand candidate interviews only to find those few gems. "}
          <br />
          We help you find them. Much faster.
        </motion.p>
      </div>

      {/* Brought to you by the best */}
      <motion.div className="sectionHead bestHead" variants={group()} {...onScroll}>
        <motion.h2 variants={item}>Brought to you by the best</motion.h2>
        <motion.p variants={item}>Hire Better · Screen Faster · Stop Wasting Time</motion.p>
      </motion.div>

      <section className="showcase">
        <motion.div className="badgeRow" variants={group(0.14)} {...onScroll}>
          <motion.div className="badgeCard" variants={item}>
            <div className="inner">
              <p className="label">Built at</p>
              <img className="isbLogo" src="/assets/isb-logo.svg" alt="ISB" />
            </div>
          </motion.div>

          <motion.div className="badgeCard" variants={item}>
            <div className="inner">
              <p className="label">Backed by</p>
              <img
                className="iiitLogo"
                src="/assets/iiit-logo.svg"
                alt="Ministry of Electronics and Information Technology"
              />
            </div>
          </motion.div>

          <motion.div className="badgeCard" variants={item}>
            <div className="inner">
              <p className="label">Makers of</p>
              <div className="makersLockup">
                <img className="mark" src="/assets/logo-star.svg" alt="" />
                <p className="text">Interviews by Zariya AI</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="productShot" variants={lift} {...onScroll}>
          <div className="clip">
            <img src="/assets/dashboard.webp" alt="Zariya Recruit screening evaluation" />
          </div>
        </motion.div>
      </section>

      {/* Built for hiring that doesn't scale */}
      <section className="problems">
        <motion.div className="sectionHead" variants={group()} {...onScroll}>
          <motion.h2 variants={item}>Built for hiring that doesn&apos;t scale</motion.h2>
          <motion.p variants={item}>
            Hiring realities that break traditional processes and why Zariya AI was built to solve
            them
          </motion.p>
        </motion.div>

        <motion.div className="problemCards" variants={group(0.14)} {...onScroll}>
          {PROBLEMS.map((problem) => (
            <motion.article className="problemCard" key={problem.title} variants={item}>
              <div className="iconBox">
                <img src={problem.icon} alt="" />
              </div>
              <h3>{problem.title}</h3>
              <p>{problem.body}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* Grid rules — painted last, as in Figma */}
      <motion.div className="rule ruleH ruleH1" variants={wipeX} {...onScrollLine} />
      <motion.div className="rule ruleH ruleH2" variants={wipeX} {...onScrollLine} />
      <motion.div className="rule ruleH ruleH3" variants={wipeX} {...onScrollLine} />
      <motion.div className="rule ruleV ruleV1" variants={wipeY} {...onScrollLine} />
      <motion.div className="rule ruleV ruleV2" variants={wipeY} {...onScrollLine} />
    </main>
  );
}
