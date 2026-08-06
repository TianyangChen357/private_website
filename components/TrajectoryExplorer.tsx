"use client";

import type { KeyboardEvent } from "react";
import { useState } from "react";

const stages = [
  {
    id: "measure",
    index: "01",
    label: "Measure",
    period: "Surveying & Mapping",
    title: "Acquire the world.",
    copy: "My path began with the physical act of measurement: establishing control, observing coordinates, and understanding how instruments and error shape spatial information.",
    evidence: ["GPS & GNSS", "Total Station", "Field surveying", "Coordinate systems"],
  },
  {
    id: "model",
    index: "02",
    label: "Model",
    period: "Geographic Information Science",
    title: "Represent relationships.",
    copy: "GIS transformed coordinates into relationships. Spatial statistics, neighborhoods, scale, and autocorrelation became ways to model geographic processes rather than merely display them.",
    evidence: ["GIScience", "Spatial statistics", "Autocorrelation", "Network analysis"],
  },
  {
    id: "learn",
    index: "03",
    label: "Learn",
    period: "GeoAI & Scalable Computing",
    title: "Learn spatial structure.",
    copy: "My doctoral work asks how spatial structure can enter machine learning explicitly—from 3D point-cloud representations to spatial surrogate models and GPU-scale computation.",
    evidence: ["3D GeoAI", "LiDAR", "SA-Encoder", "HPC / GPU"],
  },
  {
    id: "reason",
    index: "04",
    label: "Reason",
    period: "Emerging Research Agenda",
    title: "Reason across representations.",
    copy: "The next question is how foundation models can connect language, maps, networks, and 3D scenes—forming grounded spatial explanations instead of pattern recognition alone.",
    evidence: ["Foundation models", "Multimodal GIS", "3D reasoning", "Spatial agents"],
  },
] as const;

function StageGraphic({ stage }: { stage: (typeof stages)[number]["id"] }) {
  if (stage === "measure") {
    return (
      <svg viewBox="0 0 740 510" role="img" aria-label="Animated surveying instrument measuring control points">
        <g className="trajectory-ground"><path d="M55 409C176 383 254 423 350 393S557 352 690 392"/><path d="M55 428H690"/></g>
        <g className="survey-rays"><path d="M351 218L104 370"/><path d="M351 218L612 347"/><path d="M351 218L491 296"/></g>
        <g className="survey-instrument"><path d="M351 236L292 409M351 236L410 409M351 236V409"/><rect x="311" y="183" width="82" height="56" rx="6"/><circle cx="351" cy="211" r="19"/><path d="M393 194H449V220H393"/><path d="M329 176L344 154H373L384 183"/></g>
        <g className="control-points"><circle cx="104" cy="370" r="8"/><circle cx="612" cy="347" r="8"/><circle cx="491" cy="296" r="7"/><path d="M104 378V409M612 355V396M491 303V376"/></g>
        <g className="scan-arc"><path d="M132 355A272 272 0 0 1 583 334"/></g>
        <g className="trajectory-annotations"><text x="72" y="343">CONTROL 01</text><text x="579" y="324">CONTROL 02</text><text x="325" y="469">FIELD → COORDINATES</text></g>
      </svg>
    );
  }
  if (stage === "model") {
    return (
      <svg viewBox="0 0 740 510" role="img" aria-label="Animated GIS layers forming a spatial relationship model">
        <g className="model-stack">
          <path d="M133 347L355 243 607 346 382 456Z"/><path d="M133 291L355 187 607 290 382 400Z"/><path d="M133 235L355 131 607 234 382 344Z"/>
        </g>
        <g className="model-grid"><path d="M187 211L435 313M241 186L489 287M295 161L543 263M349 136L597 238M178 256L400 152M232 280L454 176M286 303L508 200M340 327L562 224"/></g>
        <g className="model-network"><path d="M201 294L287 257 370 300 465 246 548 288M287 257L326 213 465 246M370 300L429 334 548 288"/><circle cx="201" cy="294" r="7"/><circle cx="287" cy="257" r="7"/><circle cx="370" cy="300" r="8"/><circle cx="465" cy="246" r="7"/><circle cx="548" cy="288" r="7"/><circle cx="326" cy="213" r="6"/><circle cx="429" cy="334" r="6"/></g>
        <g className="trajectory-annotations"><text x="112" y="119">LAYER 03 / CONTEXT</text><text x="112" y="176">LAYER 02 / RELATIONSHIPS</text><text x="112" y="233">LAYER 01 / OBSERVATIONS</text><text x="288" y="480">COORDINATES → RELATIONSHIPS</text></g>
      </svg>
    );
  }
  if (stage === "learn") {
    const cloud = Array.from({ length: 72 }, (_, index) => {
      const row = Math.floor(index / 18);
      const column = index % 18;
      return <circle key={index} cx={85 + column * 17 + row * 7} cy={142 + row * 42 + Math.sin(column * 1.2) * 9} r={index % 6 === 0 ? 3.4 : 2.2}/>;
    });
    return (
      <svg viewBox="0 0 740 510" role="img" aria-label="Animated point cloud flowing through a spatial encoder into semantic classes">
        <g className="learn-cloud">{cloud}</g>
        <g className="learn-flow"><path d="M416 240H465"/><path d="M450 226L465 240 450 254"/></g>
        <g className="learn-encoder"><path d="M479 146L568 116 619 149V329L530 361 479 328Z"/><path d="M479 146L530 180 619 149M530 180V361"/><path d="M499 189L548 205M499 224L548 240M499 259L548 275M499 294L548 310"/></g>
        <g className="learn-output"><rect x="643" y="163" width="18" height="151"/><rect x="665" y="195" width="18" height="119"/><rect x="687" y="137" width="18" height="177"/></g>
        <g className="trajectory-annotations"><text x="85" y="354">3D OBSERVATIONS</text><text x="483" y="392">SPATIAL ENCODER</text><text x="622" y="354">REPRESENTATION</text><text x="261" y="461">RELATIONSHIPS → REPRESENTATIONS</text></g>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 740 510" role="img" aria-label="Animated spatial reasoning system connecting language, maps, networks, and a 3D scene">
      <defs><radialGradient id="reason-glow"><stop offset="0" stopColor="#25c9ad" stopOpacity=".32"/><stop offset="1" stopColor="#25c9ad" stopOpacity="0"/></radialGradient></defs>
      <circle className="reason-halo" cx="370" cy="254" r="156" fill="url(#reason-glow)"/>
      <g className="reason-links"><path d="M370 254L163 143M370 254L580 145M370 254L171 363M370 254L573 365"/></g>
      <g className="reason-core"><circle cx="370" cy="254" r="68"/><circle cx="370" cy="254" r="45"/><path d="M344 253H397M356 235L337 253 356 271M385 235L404 253 385 271"/></g>
      <g className="reason-card language-card"><rect x="78" y="88" width="172" height="108" rx="8"/><path d="M101 116H205M101 137H218M101 158H181"/><text x="100" y="181">LANGUAGE</text></g>
      <g className="reason-card map-card"><rect x="493" y="86" width="172" height="113" rx="8"/><path d="M514 170C542 125 572 172 596 123S632 122 646 106"/><circle cx="544" cy="147" r="5"/><circle cx="606" cy="129" r="5"/><text x="514" y="185">MAP</text></g>
      <g className="reason-card network-card"><rect x="83" y="310" width="176" height="111" rx="8"/><path d="M109 371L149 338 187 382 231 344M149 338L187 382"/><circle cx="109" cy="371" r="5"/><circle cx="149" cy="338" r="5"/><circle cx="187" cy="382" r="5"/><circle cx="231" cy="344" r="5"/><text x="104" y="405">NETWORK</text></g>
      <g className="reason-card scene-card"><rect x="485" y="309" width="181" height="112" rx="8"/><path d="M513 380L568 348 633 378 578 409ZM568 348V326L624 351V374"/><text x="507" y="405">3D SCENE</text></g>
      <g className="trajectory-annotations"><text x="259" y="476">REPRESENTATIONS → REASONING</text></g>
    </svg>
  );
}

export default function TrajectoryExplorer() {
  const [active, setActive] = useState(0);

  const stage = stages[active];
  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const next = event.key === "ArrowRight"
      ? (active + 1) % stages.length
      : (active - 1 + stages.length) % stages.length;
    setActive(next);
    document.getElementById(`trajectory-tab-${next}`)?.focus();
  };

  return (
    <div className="trajectory-explorer">
      <div className="trajectory-stage-tabs" role="tablist" aria-label="Research trajectory stages">
        {stages.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`trajectory-tab-${index}`}
            aria-controls="trajectory-stage-panel"
            aria-selected={index === active}
            tabIndex={index === active ? 0 : -1}
            className={index === active ? "is-active" : ""}
            onClick={() => setActive(index)}
            onKeyDown={onTabKeyDown}
          >
            <span>{item.index}</span>
            <strong>{item.label}</strong>
            <i aria-hidden="true" />
          </button>
        ))}
      </div>

      <div className="trajectory-stage" id="trajectory-stage-panel" role="tabpanel" aria-labelledby={`trajectory-tab-${active}`} key={stage.id}>
        <div className="trajectory-stage-copy">
          <p className="mono-kicker">{stage.period}</p>
          <h2>{stage.title}</h2>
          <p>{stage.copy}</p>
          <ul>
            {stage.evidence.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div className={`trajectory-stage-visual visual-${stage.id}`}>
          <div className="visual-coordinates"><span>STAGE / {stage.index}</span><span>SELECT A STAGE TO EXPLORE</span></div>
          <StageGraphic stage={stage.id} />
        </div>
      </div>
    </div>
  );
}
