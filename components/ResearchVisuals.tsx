type FocusVisualProps = {
  kind: "grounded" | "three-dimensional" | "scalable";
};

export function FocusVisual({ kind }: FocusVisualProps) {
  if (kind === "grounded") {
    return (
      <svg className="focus-visual-svg" viewBox="0 0 560 330" role="img" aria-label="Spatial observations connected through a learned neighborhood structure">
        <defs>
          <radialGradient id="grounded-core" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#25c9ad" stopOpacity=".5" />
            <stop offset="1" stopColor="#25c9ad" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g className="spatial-rings">
          <circle cx="280" cy="165" r="118" />
          <circle cx="280" cy="165" r="78" />
          <circle cx="280" cy="165" r="39" />
        </g>
        <g className="spatial-links">
          <path d="M116 83L212 118 280 165 357 94 448 139" />
          <path d="M95 216L190 195 280 165 374 219 464 242" />
          <path d="M212 118L190 195M357 94L374 219M280 165L273 56M280 165L287 279" />
        </g>
        <circle className="spatial-halo" cx="280" cy="165" r="72" fill="url(#grounded-core)" />
        <g className="spatial-nodes">
          <circle cx="116" cy="83" r="8" /><circle cx="212" cy="118" r="7" />
          <circle cx="357" cy="94" r="7" /><circle cx="448" cy="139" r="8" />
          <circle cx="95" cy="216" r="6" /><circle cx="190" cy="195" r="7" />
          <circle cx="374" cy="219" r="7" /><circle cx="464" cy="242" r="6" />
          <circle cx="273" cy="56" r="6" /><circle cx="287" cy="279" r="6" />
          <circle className="core-node" cx="280" cy="165" r="12" />
        </g>
        <g className="diagram-labels">
          <text x="55" y="45">OBSERVATIONS</text>
          <text x="303" y="158">LEARNED</text>
          <text x="303" y="173">NEIGHBORHOOD</text>
        </g>
      </svg>
    );
  }

  if (kind === "three-dimensional") {
    const points = Array.from({ length: 68 }, (_, index) => {
      const row = Math.floor(index / 17);
      const column = index % 17;
      const x = 92 + column * 22 + row * 12;
      const y = 97 + row * 41 + Math.sin(column * 1.3 + row) * 11;
      return <circle key={index} cx={x} cy={y} r={index % 5 === 0 ? 3.6 : 2.4} />;
    });
    return (
      <svg className="focus-visual-svg" viewBox="0 0 560 330" role="img" aria-label="A point cloud transformed into semantic three-dimensional classes">
        <g className="volume-planes">
          <path d="M92 231L356 272 470 202 203 164Z" />
          <path d="M92 231L92 97 203 43 203 164Z" />
          <path d="M203 164L203 43 470 80 470 202Z" />
        </g>
        <g className="point-swarm point-swarm-one">{points}</g>
        <g className="semantic-slices">
          <path d="M154 190L373 222" />
          <path d="M203 83L420 112" />
          <path d="M251 175L251 88" />
          <path d="M339 193L339 100" />
        </g>
        <g className="diagram-labels">
          <text x="49" y="283">LiDAR OBSERVATIONS</text>
          <text x="369" y="291">SEMANTIC STRUCTURE</text>
        </g>
      </svg>
    );
  }

  return (
    <svg className="focus-visual-svg" viewBox="0 0 560 330" role="img" aria-label="A geospatial workflow moving from tiled data through parallel computation to an interactive map">
      <g className="compute-tiles">
        <rect x="47" y="91" width="58" height="58" /><rect x="112" y="91" width="58" height="58" />
        <rect x="47" y="156" width="58" height="58" /><rect x="112" y="156" width="58" height="58" />
        <path d="M58 130L94 109M122 132L160 111M56 199L96 173M122 199L159 174" />
      </g>
      <g className="compute-flow">
        <path d="M187 152H238" /><path d="M218 139L238 152 218 165" />
        <path d="M347 152H398" /><path d="M378 139L398 152 378 165" />
      </g>
      <g className="compute-core">
        <rect x="245" y="79" width="95" height="146" rx="10" />
        <rect x="260" y="95" width="28" height="28" /><rect x="297" y="95" width="28" height="28" />
        <rect x="260" y="132" width="28" height="28" /><rect x="297" y="132" width="28" height="28" />
        <rect x="260" y="169" width="28" height="28" /><rect x="297" y="169" width="28" height="28" />
      </g>
      <g className="compute-map">
        <rect x="406" y="76" width="113" height="151" rx="4" />
        <path d="M421 188C445 146 461 186 482 134S504 106 510 92" />
        <circle cx="437" cy="161" r="5" /><circle cx="473" cy="149" r="5" /><circle cx="496" cy="115" r="5" />
      </g>
      <g className="diagram-labels">
        <text x="47" y="252">SPATIAL TILES</text><text x="253" y="252">PARALLEL CORE</text><text x="414" y="252">INTERACTIVE SYSTEM</text>
      </g>
    </svg>
  );
}

type PaperVisualProps = {
  kind: "surrogate" | "encoder" | "autocorrelation" | "routing";
};

export function PaperVisual({ kind }: PaperVisualProps) {
  if (kind === "surrogate") {
    return (
      <svg viewBox="0 0 420 245" role="img" aria-label="Research schematic showing a spatial surrogate refining point-cloud predictions">
        <g className="paper-grid"><path d="M24 45H198V205H24ZM59 45V205M94 45V205M129 45V205M164 45V205M24 77H198M24 109H198M24 141H198M24 173H198" /></g>
        <g className="paper-points"><circle cx="48" cy="92" r="5"/><circle cx="75" cy="124" r="4"/><circle cx="113" cy="73" r="5"/><circle cx="145" cy="151" r="6"/><circle cx="174" cy="112" r="4"/></g>
        <g className="paper-arrow"><path d="M218 125H266"/><path d="M253 113L266 125 253 137"/></g>
        <g className="paper-surface"><path d="M280 175C314 119 342 151 393 71V178C346 207 315 180 280 213Z"/><path d="M280 175C314 119 342 151 393 71"/></g>
      </svg>
    );
  }
  if (kind === "encoder") {
    return (
      <svg viewBox="0 0 420 245" role="img" aria-label="Research schematic showing spatial autocorrelation encoded into a learned representation">
        <g className="paper-neighbors"><circle cx="76" cy="122" r="34"/><circle cx="76" cy="122" r="8"/><circle cx="42" cy="78" r="5"/><circle cx="121" cy="86" r="5"/><circle cx="126" cy="157" r="5"/><circle cx="49" cy="174" r="5"/><path d="M76 122L42 78M76 122L121 86M76 122L126 157M76 122L49 174"/></g>
        <g className="paper-arrow"><path d="M142 122H190"/><path d="M177 110L190 122 177 134"/></g>
        <g className="paper-encoder"><rect x="204" y="58" width="63" height="128" rx="8"/><path d="M219 78H252M219 99H252M219 120H252M219 141H252M219 162H252"/></g>
        <g className="paper-arrow"><path d="M280 122H328"/><path d="M315 110L328 122 315 134"/></g>
        <g className="paper-vector"><rect x="340" y="61" width="14" height="119"/><rect x="358" y="82" width="14" height="98"/><rect x="376" y="47" width="14" height="133"/></g>
      </svg>
    );
  }
  if (kind === "autocorrelation") {
    return (
      <svg viewBox="0 0 420 245" role="img" aria-label="Research schematic showing explicit spatial autocorrelation around a three-dimensional object">
        <g className="paper-rings"><ellipse cx="122" cy="123" rx="88" ry="58"/><ellipse cx="122" cy="123" rx="58" ry="37"/></g>
        <g className="paper-points"><circle cx="55" cy="108" r="5"/><circle cx="81" cy="83" r="5"/><circle cx="116" cy="99" r="6"/><circle cx="145" cy="124" r="5"/><circle cx="180" cy="149" r="5"/><circle cx="95" cy="154" r="5"/></g>
        <g className="paper-arrow"><path d="M222 123H270"/><path d="M257 111L270 123 257 135"/></g>
        <g className="paper-cube"><path d="M298 86L351 58 391 84 338 113ZM298 86V149L338 179V113M338 179L391 149V84"/><path d="M311 95L311 152M326 104V163M350 107V171M366 98V161M380 90V153"/></g>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 420 245" role="img" aria-label="Research schematic showing parallel routing across a stochastic road network">
      <g className="paper-roads"><path d="M30 192C84 154 83 74 143 92S227 187 278 117 341 58 397 71M38 134C92 143 123 200 189 178S265 54 386 135M78 48C112 102 170 62 213 109S265 199 348 192"/></g>
      <path className="paper-route" d="M38 134C92 143 123 200 189 178S265 54 386 135"/>
      <g className="paper-terminals"><circle cx="38" cy="134" r="7"/><circle cx="386" cy="135" r="7"/></g>
    </svg>
  );
}
