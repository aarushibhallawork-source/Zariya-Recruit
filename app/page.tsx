import "./landing.css";

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
  return (
    <main className="canvas">
      {/* Hero background */}
      <div className="heroPhoto">
        <img src="/assets/hero-bg.png" alt="" />
      </div>
      <div className="topScrim" />

      {/* Nav */}
      <header className="nav">
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
      </header>

      {/* Hero copy */}
      <div className="eyebrow">
        <span className="dot" />
        <span>AI-Powered Hiring · Built for Modern HR Teams</span>
      </div>

      <div className="hero">
        <div className="heroHeadline">
          <h1>Hey dear HR,</h1>
          <h1>
            let us conduct your <em className="italic">interviews</em>
          </h1>
        </div>
        <p className="heroSub">
          {"You're tired of sitting through a thousand candidate interviews only to find those few gems. "}
          <br />
          We help you find them. Much faster.
        </p>
      </div>

      {/* Brought to you by the best */}
      <div className="sectionHead bestHead">
        <h2>Brought to you by the best</h2>
        <p>Hire Better · Screen Faster · Stop Wasting Time</p>
      </div>

      <section className="showcase">
        <div className="badgeRow">
          <div className="badgeCard">
            <div className="inner">
              <p className="label">Built at</p>
              <img className="isbLogo" src="/assets/isb-logo.svg" alt="ISB" />
            </div>
          </div>

          <div className="badgeCard">
            <div className="inner">
              <p className="label">Backed by</p>
              <img
                className="iiitLogo"
                src="/assets/iiit-logo.svg"
                alt="Ministry of Electronics and Information Technology"
              />
            </div>
          </div>

          <div className="badgeCard">
            <div className="inner">
              <p className="label">Makers of</p>
              <div className="makersLockup">
                <img className="mark" src="/assets/logo-star.svg" alt="" />
                <p className="text">Interviews by Zariya AI</p>
              </div>
            </div>
          </div>
        </div>

        <div className="productShot">
          <div className="clip">
            <img src="/assets/dashboard.png" alt="Zariya Recruit screening evaluation" />
          </div>
        </div>
      </section>

      {/* Built for hiring that doesn't scale */}
      <section className="problems">
        <div className="sectionHead">
          <h2>Built for hiring that doesn&apos;t scale</h2>
          <p>
            Hiring realities that break traditional processes and why Zariya AI was built to solve
            them
          </p>
        </div>

        <div className="problemCards">
          {PROBLEMS.map((problem) => (
            <article className="problemCard" key={problem.title}>
              <div className="iconBox">
                <img src={problem.icon} alt="" />
              </div>
              <h3>{problem.title}</h3>
              <p>{problem.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Grid rules — painted last, as in Figma */}
      <div className="rule ruleH ruleH1" />
      <div className="rule ruleH ruleH2" />
      <div className="rule ruleH ruleH3" />
      <div className="rule ruleV ruleV1" />
      <div className="rule ruleV ruleV2" />
    </main>
  );
}
