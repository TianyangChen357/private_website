"use client";

import type { ReactNode } from "react";
import { FocusVisual, PaperVisual } from "@/components/ResearchVisuals";
import SpatialGlobe from "@/components/SpatialGlobe";
import TrajectoryExplorer from "@/components/TrajectoryExplorer";

export type ViewKey = "home" | "research" | "work" | "trajectory" | "publications" | "teaching";

const views: { key: ViewKey; label: string; path: string; index: string }[] = [
  { key: "home", label: "Home", path: "/", index: "00" },
  { key: "research", label: "Research", path: "/research", index: "01" },
  { key: "work", label: "Work", path: "/work", index: "02" },
  { key: "trajectory", label: "Trajectory", path: "/trajectory", index: "03" },
  { key: "publications", label: "Publications", path: "/publications", index: "04" },
  { key: "teaching", label: "Teaching", path: "/teaching", index: "05" },
];

const themes = [
  {
    index: "01",
    kind: "grounded" as const,
    title: "Spatially Grounded GeoAI",
    copy: "I design learning methods that represent spatial dependence, neighborhood order, and geographic context explicitly—not treating location as another generic feature.",
    tags: ["Spatial autocorrelation", "Representation learning", "GeoAI"],
  },
  {
    index: "02",
    kind: "three-dimensional" as const,
    title: "3D Geospatial Intelligence",
    copy: "I study how machines perceive complex geographic objects through LiDAR, point clouds, geometric context, and semantic 3D representations.",
    tags: ["LiDAR", "Point clouds", "Object understanding"],
  },
  {
    index: "03",
    kind: "scalable" as const,
    title: "Scalable Spatial Systems",
    copy: "I translate methods into reproducible systems—from GPU and HPC workflows to interactive Web GIS and mobile spatial tools.",
    tags: ["HPC / CyberGIS", "Web GIS", "Spatial decision systems"],
  },
];

const works = [
  {
    title: "TerraWatch",
    type: "Independent geospatial product",
    status: "In development",
    copy: "A bilingual spatial-intelligence platform that brings disaster and environmental event layers into one fast, stable, explorable map.",
    tech: ["React", "MapLibre", "PMTiles", "Spatial data services"],
    href: "https://github.com/TianyangChen357/TERRAWATCH",
    visual: "earth",
    metric: "BILINGUAL / NEAR-REAL-TIME",
  },
  {
    title: "DeepPipe",
    type: "NCDOT-sponsored research",
    status: "GeoAI + Mobile GIS",
    copy: "Machine-learning and spatial-network workflows for predicting undocumented stormwater-pipe connections, extended into a QField field tool.",
    tech: ["GeoAI", "Graph learning", "QField", "API"],
    href: undefined,
    visual: "network",
    metric: "0.8455 / BASELINE ACCURACY",
  },
  {
    title: "Geo-FRIT",
    type: "NCDOT-sponsored research",
    status: "Statewide decision system",
    copy: "A freight risk and resilience framework evaluating route exposure across floods, landslides, and wildfire hazards at statewide scale.",
    tech: ["Network analytics", "HPC", "Hazard modeling"],
    href: undefined,
    visual: "routing",
    metric: "1.5M SEGMENTS / 400 CORES",
  },
];

const papers = [
  {
    year: "2026",
    venue: "Remote Sensing 18(14)",
    kind: "surrogate" as const,
    title: "Revisiting Deep Learning-Based Semantic Segmentation on Large-Scale Hydraulic-Structure LiDAR Point Clouds: A Spatial Surrogate Modeling Perspective",
    authors: "T. Chen, W. Tang, S.-E. Chen, C. Allan & N. S. Shanmugam",
    contribution: "Reframes semantic segmentation through a spatial-surrogate perspective and evaluates how spatial post-processing changes 3D prediction performance.",
    href: "https://doi.org/10.3390/rs18142413",
  },
  {
    year: "2025",
    venue: "Remote Sensing 17(17)",
    kind: "encoder" as const,
    title: "SA-Encoder: A Learnt Spatial Autocorrelation Representation to Inform 3D Geospatial Object Detection",
    authors: "T. Chen, W. Tang, S.-E. Chen & C. Allan",
    contribution: "Introduces a learnable encoder that transforms lag-ordered pairwise differences into contextual spatial embeddings for 3D learning.",
    href: "https://doi.org/10.3390/rs17173124",
  },
  {
    year: "2024",
    venue: "Annals of the AAG 114(10)",
    kind: "autocorrelation" as const,
    title: "Explicit Incorporation of Spatial Autocorrelation in 3D Deep Learning for Geospatial Object Detection",
    authors: "T. Chen, W. Tang, C. Allan & S.-E. Chen",
    contribution: "Builds a framework for explicitly carrying spatial dependence into deep learning for complex 3D geographic objects.",
    href: "https://doi.org/10.1080/24694452.2024.2380898",
  },
  {
    year: "2025",
    venue: "International Journal of GIS 39(1)",
    kind: "routing" as const,
    title: "GPU-Accelerated Parallel All-Pair Shortest Path Routing Within Stochastic Road Networks",
    authors: "W. Tang, T. Chen & M. P. Armstrong",
    contribution: "Develops GPU-parallel routing for computationally intensive all-pair analysis across stochastic road networks.",
    href: "https://doi.org/10.1080/13658816.2024.2394651",
  },
];

type InternalLinkProps = {
  view: ViewKey;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
  current?: boolean;
};

function InternalLink({ view, className, children, ariaLabel, current }: InternalLinkProps) {
  const destination = views.find((item) => item.key === view)?.path ?? "/";
  return <a href={destination} className={className} aria-label={ariaLabel} aria-current={current ? "page" : undefined}>{children}</a>;
}

function SiteHeader({ active }: { active: ViewKey }) {
  return (
    <header className="global-header">
      <InternalLink view="home" className="global-brand" ariaLabel="Tianyang Chen, home">
        <span className="brand-mark">TC</span>
        <span><strong>Tianyang Chen</strong><small>GIS Scientist</small></span>
      </InternalLink>
      <nav className="route-nav" aria-label="Primary navigation">
        {views.map((item) => (
          <InternalLink key={item.key} view={item.key} current={active === item.key} className={active === item.key ? "is-active" : undefined}>
            <span>{item.index}</span>{item.label}
            {active === item.key && <i className="sr-only">Current page</i>}
          </InternalLink>
        ))}
      </nav>
      <a className="header-contact" href="mailto:tchen19@charlotte.edu">Contact <span aria-hidden="true">↗</span></a>
    </header>
  );
}

function AcademicLinks({ light = false }: { light?: boolean }) {
  return (
    <div className={`academic-links${light ? " is-light" : ""}`} aria-label="Academic profiles">
      <a href="https://scholar.google.com/citations?hl=en&user=rOdfx2IAAAAJ" target="_blank" rel="noreferrer">Google Scholar <span>↗</span></a>
      <a href="https://orcid.org/0000-0002-6714-3159" target="_blank" rel="noreferrer">ORCID <span>↗</span></a>
      <a href="https://github.com/TianyangChen357" target="_blank" rel="noreferrer">GitHub <span>↗</span></a>
    </div>
  );
}

function PageFooter({ light = false }: { light?: boolean }) {
  return (
    <footer className={`page-footer${light ? " is-light" : ""}`}>
      <div><strong>Tianyang Chen, Ph.D.</strong><span>GIS Scientist · UNC Charlotte</span></div>
      <AcademicLinks light={light} />
      <a href="mailto:tchen19@charlotte.edu">tchen19@charlotte.edu ↗</a>
    </footer>
  );
}

function PageTitle({ index, label, title, accent, copy }: { index: string; label: string; title: string; accent: string; copy: string }) {
  return (
    <div className="page-title">
      <div className="page-title-meta"><span>{index} / {label}</span><span>TIANYANG CHEN · GIS SCIENTIST</span></div>
      <div className="page-title-grid">
        <h1>{title}<br /><em>{accent}</em></h1>
        <p>{copy}</p>
      </div>
    </div>
  );
}

function HomeView() {
  return (
    <main id="main-content" className="home-view">
      <section className="home-hero">
        <div className="home-copy">
          <p className="eyebrow"><span /> Tianyang Chen, Ph.D.</p>
          <h1>Building spatial<br /><em>intelligence.</em></h1>
          <p className="home-role">GIS Scientist</p>
          <p className="home-deck">From measuring the world to reasoning about it—through GIScience, GeoAI, 3D spatial data, scalable computing, and interactive systems.</p>
          <figure className="profile-card">
            <a className="profile-photo" href="https://scholar.google.com/citations?hl=en&user=rOdfx2IAAAAJ" target="_blank" rel="noreferrer" aria-label="Open Tianyang Chen's Google Scholar profile">
              <img src="/tianyang-chen-profile.png" alt="Tianyang Chen" width="300" height="450" />
            </a>
            <figcaption>
              <span>Academic profile</span>
              <strong>Tianyang Chen, Ph.D.</strong>
              <small>Postdoctoral Fellow · UNC Charlotte</small>
            </figcaption>
          </figure>
          <div className="home-actions">
            <InternalLink view="research" className="button button-primary">Explore research <span aria-hidden="true">↗</span></InternalLink>
            <a className="button button-secondary" href="/Tianyang_Chen_CV.docx" download>Download CV <span aria-hidden="true">↓</span></a>
          </div>
          <AcademicLinks />
        </div>
        <div className="home-world" aria-label="Interactive orthographic world view">
          <div className="world-meta world-meta-top"><span>WGS 84 · ORTHOGRAPHIC VIEW</span><span>35.2271° N / 80.8431° W</span></div>
          <SpatialGlobe />
          <div className="world-meta world-meta-bottom"><span>DRAG OR USE ARROW KEYS TO ROTATE</span><span>GEOGRAPHY AS A LIVING INTERFACE</span></div>
        </div>
        <div className="home-directory" aria-label="Explore the site">
          {views.slice(1, 5).map((item) => (
            <InternalLink view={item.key} key={item.key}>
              <span>{item.index}</span><strong>{item.label}</strong><i aria-hidden="true">↗</i>
            </InternalLink>
          ))}
        </div>
      </section>
    </main>
  );
}

function ResearchView() {
  return (
    <main id="main-content" className="subpage research-view">
      <div className="content-shell">
        <PageTitle
          index="01"
          label="Research Focus"
          title="How I study"
          accent="space."
          copy="My research connects geographic theory and computation to understand where things are, how they relate, and why those relationships matter."
        />
        <section className="focus-list" aria-label="Research focus areas">
          {themes.map((theme) => (
            <article className="focus-row" key={theme.title}>
              <div className="focus-row-copy">
                <span>{theme.index}</span>
                <h2>{theme.title}</h2>
                <p>{theme.copy}</p>
                <ul>{theme.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              </div>
              <div className="focus-row-visual"><FocusVisual kind={theme.kind} /></div>
            </article>
          ))}
        </section>
      </div>

      <section className="research-evidence">
        <div className="research-evidence-image">
          <img src="/sa-encoder-predictions.webp" alt="3D point-cloud prediction scenes from the SA-Encoder study" />
          <div className="evidence-image-label"><span>REAL PREDICTION OUTPUTS</span><span>3D POINT-CLOUD SEMANTIC SEGMENTATION</span></div>
        </div>
        <div className="research-evidence-copy">
          <p className="mono-kicker">FEATURED RESEARCH / SA-ENCODER</p>
          <h2>Spatial context changes what machines can see.</h2>
          <p>A learned spatial-autocorrelation representation carries ordered neighborhood differences into a 3D model, grounding predictions in geographic relationships.</p>
          <div className="metric-grid">
            <div><strong>70.9%</strong><span>OVERALL ACCURACY</span></div>
            <div><strong>9.46×</strong><span>10-GPU SPEEDUP</span></div>
            <div><strong>+3.5 pp</strong><span>PILLAR / SPATIAL REFINEMENT</span></div>
          </div>
          <a className="text-link" href="https://doi.org/10.3390/rs17173124" target="_blank" rel="noreferrer">Read the paper <span>↗</span></a>
          <p className="figure-credit">Prediction results from Chen et al. (2025), <em>Remote Sensing</em> 17, 3124. Cropped for layout. CC BY 4.0.</p>
        </div>
      </section>
      <PageFooter />
    </main>
  );
}

function WorkVisual({ kind }: { kind: string }) {
  if (kind === "earth") {
    return (
      <svg viewBox="0 0 620 370" role="img" aria-label="TerraWatch map interface concept">
        <g className="work-map-land"><path d="M52 72l85-26 91 12 56 44 83 6 39 49-24 44-75 7-43 55-96-8-34-58-78-30zM426 64l72 8 43 42 47 22 14 75-44 56-80-12-31-50-42-23-29-58z"/></g>
        <g className="work-map-flow"><path d="M85 116C184 204 278 108 370 178S499 277 570 166"/></g>
        <g className="work-map-events"><circle cx="125" cy="126" r="6"/><circle cx="223" cy="92" r="4"/><circle cx="313" cy="195" r="7"/><circle cx="446" cy="133" r="5"/><circle cx="523" cy="218" r="7"/></g>
        <g className="work-map-ui"><rect x="24" y="24" width="572" height="322" rx="8"/><rect x="43" y="42" width="109" height="14" rx="3"/><rect x="455" y="43" width="121" height="64" rx="4"/><path d="M470 59H558M470 73H545M470 87H565"/></g>
      </svg>
    );
  }
  if (kind === "network") {
    return (
      <svg viewBox="0 0 620 370" role="img" aria-label="DeepPipe connection prediction network">
        <g className="pipe-candidates"><path d="M70 93L179 145 273 76 378 132 540 80M179 145L121 284 278 292 378 132 518 272M273 76L278 292M378 132L518 272"/></g>
        <g className="pipe-predictions"><path d="M70 93L179 145 273 76 378 132M179 145L121 284M278 292L378 132 518 272"/></g>
        <g className="pipe-visual-nodes"><circle cx="70" cy="93" r="12"/><circle cx="179" cy="145" r="12"/><circle cx="273" cy="76" r="12"/><circle cx="378" cy="132" r="12"/><circle cx="540" cy="80" r="12"/><circle cx="121" cy="284" r="12"/><circle cx="278" cy="292" r="12"/><circle cx="518" cy="272" r="12"/></g>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 620 370" role="img" aria-label="Geo-FRIT freight routing network">
      <g className="freight-network"><path d="M28 292C101 246 108 126 196 146S306 248 368 190 466 68 596 83M40 216c107 20 135 125 247 95s141-209 303-121M115 52c44 101 164 57 216 131s34 131 155 152"/></g>
      <path className="freight-route" d="M40 216c107 20 135 125 247 95s141-209 303-121"/>
      <g className="freight-points"><circle cx="40" cy="216" r="9"/><circle cx="590" cy="190" r="9"/></g>
    </svg>
  );
}

function WorkView() {
  return (
    <main id="main-content" className="subpage dark-page work-view">
      <div className="content-shell">
        <PageTitle
          index="02"
          label="Selected Work"
          title="Research made"
          accent="usable."
          copy="I translate geospatial methods into systems people can explore—from public-facing maps to field workflows and statewide decision tools."
        />
        <section className="project-list" aria-label="Selected projects">
          {works.map((work, index) => (
            <article className="project-row" key={work.title}>
              <div className="project-visual">
                <div className="project-visual-meta"><span>0{index + 1} / SYSTEM VIEW</span><span>{work.metric}</span></div>
                <WorkVisual kind={work.visual} />
              </div>
              <div className="project-copy">
                <div className="project-label"><span>{work.type}</span><span>{work.status}</span></div>
                <h2>{work.title}</h2>
                <p>{work.copy}</p>
                <ul>{work.tech.map((item) => <li key={item}>{item}</li>)}</ul>
                {work.href && <a className="text-link" href={work.href} target="_blank" rel="noreferrer">View repository <span>↗</span></a>}
              </div>
            </article>
          ))}
        </section>
      </div>
      <PageFooter light />
    </main>
  );
}

function TrajectoryView() {
  return (
    <main id="main-content" className="subpage dark-page trajectory-view">
      <div className="content-shell">
        <PageTitle
          index="03"
          label="Research Trajectory"
          title="From measurement to"
          accent="spatial reasoning."
          copy="The same question has followed my work across instruments, GIS, GeoAI, and emerging foundation models: how do we turn observations into spatial understanding?"
        />
        <TrajectoryExplorer />
      </div>
      <PageFooter light />
    </main>
  );
}

function PublicationsView() {
  return (
    <main id="main-content" className="subpage publications-view">
      <div className="content-shell">
        <PageTitle
          index="04"
          label="Selected Publications"
          title="Ideas, methods,"
          accent="evidence."
          copy="Selected contributions across spatially informed learning, 3D geographic objects, and scalable spatial computation."
        />
        <section className="identity-band" aria-label="Academic identity">
          <div><span>ACADEMIC IDENTITY</span><strong>Profiles &amp; complete record</strong></div>
          <AcademicLinks />
          <a className="button button-primary" href="/Tianyang_Chen_CV.docx" download>Download CV <span>↓</span></a>
        </section>
        <section className="paper-list" aria-label="Selected publications">
          {papers.map((paper, index) => (
            <article className="paper-row" key={paper.title}>
              <div className="paper-index"><span>0{index + 1}</span><strong>{paper.year}</strong><small>{paper.venue}</small></div>
              <div className="paper-visual"><PaperVisual kind={paper.kind} /><span>CONCEPTUAL SUMMARY / NOT TO SCALE</span></div>
              <div className="paper-copy">
                <h2>{paper.title}</h2>
                <p className="paper-authors">{paper.authors}</p>
                <p>{paper.contribution}</p>
                <a className="text-link" href={paper.href} target="_blank" rel="noreferrer">Paper / DOI <span>↗</span></a>
              </div>
            </article>
          ))}
        </section>
        <section className="architecture-figure">
          <div className="architecture-copy"><span>MODEL DETAIL</span><h2>Inside the SA-Encoder.</h2><p>Lag-ordered pairwise differences are passed through shared-weight layers to learn a contextual spatial embedding.</p></div>
          <img src="/sa-encoder-architecture.webp" alt="Architecture of the spatial-autocorrelation encoder from the SA-Encoder paper" />
          <p>Figure 3 from Chen et al. (2025), <em>Remote Sensing</em> 17, 3124. CC BY 4.0.</p>
        </section>
      </div>
      <PageFooter />
    </main>
  );
}

function TeachingView() {
  return (
    <main id="main-content" className="subpage teaching-view">
      <div className="content-shell">
        <PageTitle
          index="05"
          label="Teaching & Mentoring"
          title="Learn by doing."
          accent="Grow toward independence."
          copy="I design clear paths into complex material, anchor learning in real spatial problems, and gradually transfer judgment to students."
        />
        <section className="teaching-principles" aria-label="Teaching principles">
          <article><span>01</span><div className="principle-orbit orbit-access" aria-hidden="true"><i/><i/><i/></div><h2>Access</h2><p>Make complex concepts visible. Use transparent expectations, concrete demonstrations, and multiple ways into the material.</p></article>
          <article><span>02</span><div className="principle-orbit orbit-application" aria-hidden="true"><i/><i/><i/></div><h2>Application</h2><p>Teach through real spatial problems, living datasets, maps, and systems that let theory become observable.</p></article>
          <article><span>03</span><div className="principle-orbit orbit-independence" aria-hidden="true"><i/><i/><i/></div><h2>Increasing Independence</h2><p>Move from demonstration to guided practice to independent framing, comparison, judgment, and explanation.</p></article>
        </section>
        <section className="mentoring-panel">
          <div className="mentoring-statement"><span>MENTORING PHILOSOPHY</span><h2>Mentoring is the deliberate transfer of judgment—not a sequence of assigned tasks.</h2></div>
          <div className="mentoring-metrics"><div><strong>4</strong><span>UNDERGRADUATE<br/>RESEARCHERS</span></div><div><strong>3</strong><span>MASTER&apos;S<br/>RESEARCHERS</span></div><div><strong>4</strong><span>DOCTORAL<br/>RESEARCHERS</span></div></div>
        </section>
        <section className="teaching-experience">
          <div><span>INSTRUCTION</span><strong>Instructor of Record · Web GIS</strong></div>
          <div><span>CLASSROOM</span><strong>Invited Lecturer · 2024–2025</strong></div>
          <div><span>FIELD</span><strong>FAA Part 107 Remote Pilot</strong></div>
        </section>
      </div>
      <PageFooter />
    </main>
  );
}

export default function PortfolioExperience({ initialView }: { initialView: ViewKey }) {
  const renderView = () => {
    if (initialView === "research") return <ResearchView />;
    if (initialView === "work") return <WorkView />;
    if (initialView === "trajectory") return <TrajectoryView />;
    if (initialView === "publications") return <PublicationsView />;
    if (initialView === "teaching") return <TeachingView />;
    return <HomeView />;
  };

  return (
    <div className={`site-frame view-${initialView}`}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader active={initialView} />
      <div className="page-transition" key={initialView}>{renderView()}</div>
    </div>
  );
}
