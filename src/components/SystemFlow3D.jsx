import { useEffect, useMemo, useRef, useState } from "react";

const vertexShader = `
attribute vec3 aPosition;
attribute vec3 aColor;
uniform vec2 uRotation;
uniform vec4 uFit;
uniform float uPointSize;
varying vec3 vColor;
void main() {
  float cy = cos(uRotation.x);
  float sy = sin(uRotation.x);
  float cx = cos(uRotation.y);
  float sx = sin(uRotation.y);
  vec3 p = aPosition;
  p = vec3(cy * p.x + sy * p.z, p.y, -sy * p.x + cy * p.z);
  p = vec3(p.x, cx * p.y - sx * p.z, sx * p.y + cx * p.z);
  float depth = 5.3 - p.z * 0.34;
  float perspective = 2.25 / depth;
  float screenX = p.x * perspective * 0.70;
  float screenY = p.y * perspective * 0.9;
  gl_Position = vec4(screenX * uFit.x + uFit.z, screenY * uFit.y + uFit.w, 0.0, 1.0);
  gl_PointSize = uPointSize * perspective;
  vColor = aColor;
}`;

const fragmentShader = `
precision mediump float;
uniform float uAlpha;
uniform float uCircle;
varying vec3 vColor;
void main() {
  if (uCircle > 0.5 && distance(gl_PointCoord, vec2(0.5)) > 0.5) discard;
  gl_FragColor = vec4(vColor, uAlpha);
}`;

const requestColor = [0.28, 0.83, 0.96];
const responseColor = [1, 0.63, 0.32];

function nodeColor(node) {
  if (node.modes?.includes("fullScope") && !node.modes.includes("implementation")) return [0.96, 0.61, 0.32];
  if (/database|postgres|mongo|sqlite|storage/i.test(node.kind)) return [0.72, 0.62, 0.88];
  if (/api|service|provider|firebase|rabbit|socket|worker|scheduler|notification/i.test(node.kind)) return [0.42, 0.69, 0.79];
  return [0.82, 0.76, 0.65];
}

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const error = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(error || "Unable to compile system map shader");
  }
  return shader;
}

function projectNode(node, rotation) {
  const [yaw, pitch] = rotation;
  const cy = Math.cos(yaw), sy = Math.sin(yaw);
  const cx = Math.cos(pitch), sx = Math.sin(pitch);
  const x = cy * node.x + sy * node.z;
  const z1 = -sy * node.x + cy * node.z;
  const y = cx * node.y - sx * z1;
  const z = sx * node.y + cx * z1;
  const k = 2.25 / (5.3 - z * 0.34);
  return { x: x * k * 0.70, y: y * k * 0.9 };
}

export default function SystemFlow3D({ map, title }) {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const rotationRef = useRef([-0.14, -0.06]);
  const dragRef = useRef(null);
  const [rotation, setRotation] = useState([-0.14, -0.06]);
  const [size, setSize] = useState({ width: 1, height: 1 });
  const [webglReady, setWebglReady] = useState(false);
  const [activeMode, setActiveMode] = useState(map.modes?.[0]?.id || "all");
  const [expanded, setExpanded] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const fitRef = useRef([1, 1, 0, 0]);

  const visibleNodesRaw = useMemo(() => map.nodes.filter((node) => !node.modes || node.modes.includes(activeMode) || activeMode === "fullScope" && node.modes.includes("implementation")), [map, activeMode]);
  const visibleNodes = useMemo(() => {
    const xValues = visibleNodesRaw.map((node) => node.x);
    const minX = Math.min(...xValues), maxX = Math.max(...xValues);
    return visibleNodesRaw.map((node) => ({ ...node, x: maxX === minX ? 0 : -3.2 + ((node.x - minX) / (maxX - minX)) * 6.4 }));
  }, [visibleNodesRaw]);
  const visibleEdges = useMemo(() => map.edges.filter((edge) => !edge.mode || edge.mode === activeMode || activeMode === "fullScope" && edge.mode === "implementation"), [map, activeMode]);
  const nodeById = useMemo(() => new Map(visibleNodes.map((node) => [node.id, node])), [visibleNodes]);

  useEffect(() => {
    setActiveMode(map.modes?.[0]?.id || "all");
    setExpanded(false);
    const initial = [-0.14, -0.06];
    rotationRef.current = initial;
    setRotation(initial);
  }, [map]);

  useEffect(() => {
    if (!expanded) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onFullscreenChange = () => setExpanded(document.fullscreenElement === sectionRef.current);
    const onKeyDown = (event) => { if (event.key === "Escape" && document.fullscreenElement !== sectionRef.current) setExpanded(false); };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [expanded]);

  async function toggleExpanded() {
    if (expanded) {
      if (document.fullscreenElement === sectionRef.current) await document.exitFullscreen();
      else setExpanded(false);
      return;
    }
    try {
      await sectionRef.current?.requestFullscreen();
      setExpanded(true);
    } catch {
      setExpanded(true);
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const resize = new ResizeObserver(([entry]) => {
      setSize({ width: Math.max(1, entry.contentRect.width), height: Math.max(1, entry.contentRect.height) });
    });
    resize.observe(canvas);
    return () => resize.disconnect();
  }, [expanded]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const gl = canvas.getContext("webgl", { alpha: true, antialias: true });
    if (!gl) {
      setWebglReady(false);
      return undefined;
    }
    let program;
    let frame;
    const buffers = [];
    try {
      const vs = compileShader(gl, gl.VERTEX_SHADER, vertexShader);
      const fs = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
      program = gl.createProgram();
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) || "Unable to link system map shader");

      const positionLocation = gl.getAttribLocation(program, "aPosition");
      const colorLocation = gl.getAttribLocation(program, "aColor");
      const rotationLocation = gl.getUniformLocation(program, "uRotation");
      const fitLocation = gl.getUniformLocation(program, "uFit");
      const pointSizeLocation = gl.getUniformLocation(program, "uPointSize");
      const alphaLocation = gl.getUniformLocation(program, "uAlpha");
      const circleLocation = gl.getUniformLocation(program, "uCircle");
      const createBuffer = (data, usage = gl.STATIC_DRAW) => {
        const buffer = gl.createBuffer();
        buffers.push(buffer);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, data, usage);
        return buffer;
      };
      const segments = visibleEdges.flatMap((edge) => {
        const from = nodeById.get(edge.from), to = nodeById.get(edge.to);
        return from && to ? [from, to] : [];
      });
      const edgePositions = new Float32Array(segments.flatMap((node) => [node.x, node.y, node.z]));
      const edgeColors = new Float32Array(segments.flatMap(() => [0.36, 0.5, 0.59]));
      const nodePositions = new Float32Array(visibleNodes.flatMap((node) => [node.x, node.y, node.z]));
      const nodeColors = new Float32Array(visibleNodes.flatMap((node) => nodeColor(node)));
      const edgePositionBuffer = createBuffer(edgePositions);
      const edgeColorBuffer = createBuffer(edgeColors);
      const nodePositionBuffer = createBuffer(nodePositions);
      const nodeColorBuffer = createBuffer(nodeColors);
      const packetBuffer = createBuffer(new Float32Array(visibleEdges.length * 2 * 3), gl.DYNAMIC_DRAW);
      const packetPositions = new Float32Array(visibleEdges.length * 2 * 3);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.clearColor(0.055, 0.09, 0.13, 0.98);
      const shouldAnimate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const draw = (time) => {
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        const width = Math.max(1, Math.round(canvas.clientWidth * pixelRatio));
        const height = Math.max(1, Math.round(canvas.clientHeight * pixelRatio));
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
        }
        gl.viewport(0, 0, width, height);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.useProgram(program);
        gl.uniform2fv(rotationLocation, rotationRef.current);
        gl.uniform4fv(fitLocation, fitRef.current);
        gl.enableVertexAttribArray(positionLocation);
        gl.enableVertexAttribArray(colorLocation);
        gl.uniform1f(circleLocation, 0);
        gl.uniform1f(alphaLocation, 0.7);
        gl.uniform1f(pointSizeLocation, 1);
        gl.bindBuffer(gl.ARRAY_BUFFER, edgePositionBuffer);
        gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, edgeColorBuffer);
        gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.LINES, 0, segments.length);

        const speed = shouldAnimate ? time * 0.000075 : 0;
        visibleEdges.forEach((edge, index) => {
          const from = nodeById.get(edge.from), to = nodeById.get(edge.to);
          if (!from || !to) return;
          const requestT = (speed + index / Math.max(visibleEdges.length, 1)) % 1;
          const responseT = 1 - requestT;
          const requestOffset = index * 3;
          const responseOffset = (visibleEdges.length + index) * 3;
          packetPositions.set([from.x + (to.x - from.x) * requestT, from.y + (to.y - from.y) * requestT, from.z + (to.z - from.z) * requestT], requestOffset);
          packetPositions.set(edge.response === false ? [99, 99, 99] : [from.x + (to.x - from.x) * responseT, from.y + (to.y - from.y) * responseT, from.z + (to.z - from.z) * responseT], responseOffset);
        });
        gl.uniform1f(circleLocation, 1);
        gl.uniform1f(alphaLocation, 1);
        gl.uniform1f(pointSizeLocation, 13);
        gl.bindBuffer(gl.ARRAY_BUFFER, packetBuffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, packetPositions);
        gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
        gl.disableVertexAttribArray(colorLocation);
        gl.vertexAttrib3f(colorLocation, ...requestColor);
        gl.drawArrays(gl.POINTS, 0, visibleEdges.length);
        gl.vertexAttrib3f(colorLocation, ...responseColor);
        gl.drawArrays(gl.POINTS, visibleEdges.length, visibleEdges.length);
        gl.enableVertexAttribArray(colorLocation);

        gl.uniform1f(pointSizeLocation, 26);
        gl.uniform1f(alphaLocation, 0.15);
        gl.bindBuffer(gl.ARRAY_BUFFER, nodePositionBuffer);
        gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, nodeColorBuffer);
        gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.POINTS, 0, visibleNodes.length);
        gl.uniform1f(pointSizeLocation, 14);
        gl.uniform1f(alphaLocation, 1);
        gl.drawArrays(gl.POINTS, 0, visibleNodes.length);
        if (shouldAnimate) frame = requestAnimationFrame(draw);
      };
      setWebglReady(true);
      frame = requestAnimationFrame(draw);
    } catch {
      setWebglReady(false);
    }
    return () => {
      cancelAnimationFrame(frame);
      buffers.forEach((buffer) => gl.deleteBuffer(buffer));
      if (program) gl.deleteProgram(program);
    };
  }, [visibleNodes, visibleEdges, nodeById]);

  const fit = useMemo(() => {
    const projected = visibleNodes.map((node) => projectNode(node, rotation));
    const xs = projected.map((point) => point.x), ys = projected.map((point) => point.y);
    const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
    const scaleX = Math.min(1, 1.56 / Math.max(maxX - minX, 0.001));
    const scaleY = Math.min(1, 1.54 / Math.max(maxY - minY, 0.001));
    return [scaleX, scaleY, -((minX + maxX) / 2) * scaleX, -((minY + maxY) / 2) * scaleY];
  }, [visibleNodes, rotation]);
  fitRef.current = fit;
  const positions = useMemo(() => Object.fromEntries(visibleNodes.map((node) => {
    const point = projectNode(node, rotation);
    return [node.id, { left: (0.5 + point.x * fit[0] / 2 + fit[2] / 2) * size.width, top: (0.5 - point.y * fit[1] / 2 - fit[3] / 2) * size.height }];
  })), [visibleNodes, rotation, fit, size]);

  function rotateBy(dx, dy) {
    const next = [rotationRef.current[0] + dx, Math.max(-0.9, Math.min(0.9, rotationRef.current[1] + dy))];
    rotationRef.current = next;
    setRotation(next);
  }

  const handlePointerDown = (event) => {
    dragRef.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const handlePointerMove = (event) => {
    if (!dragRef.current) return;
    const dx = event.clientX - dragRef.current.x;
    const dy = event.clientY - dragRef.current.y;
    dragRef.current = { x: event.clientX, y: event.clientY };
    rotateBy(dx * 0.008, dy * 0.008);
  };
  const handlePointerUp = () => { dragRef.current = null; };

  return (
    <section ref={sectionRef} className={`system-map-section${expanded ? " is-expanded" : ""}${map.modes ? " has-modes" : ""}`} aria-label={`${title} system data flow`}>
      <header className="system-map-heading">
        <div>
          <p className="eyebrow">Interactive system map</p>
          <h2>Components that exchange data</h2>
        </div>
        <div className="flow-map-legend" aria-label="Request and response colors">
          <span><i className="flow-ball request-ball" />Request →</span>
          <span><i className="flow-ball response-ball" />Response ←</span>
          <button className="flow-expand-button" type="button" onClick={toggleExpanded} aria-label={expanded ? "Close full-screen system map" : "Expand system map to full screen"}>{expanded ? "Close map ×" : "Expand map ⛶"}</button>
        </div>
      </header>
      {map.modes && <div className="system-map-modes" role="tablist" aria-label="System map scope">
        {map.modes.map((mode) => <button key={mode.id} type="button" role="tab" aria-selected={activeMode === mode.id} className={activeMode === mode.id ? "active" : ""} onClick={() => setActiveMode(mode.id)}>{mode.label}</button>)}
      </div>}
      <div className={`flow-3d-graph ${webglReady ? "webgl-ready" : "webgl-fallback"}`}>
        <canvas ref={canvasRef} aria-label={`3D system graph for ${title}. Cyan particles are requests; orange particles are responses. Drag to rotate or use arrow keys.`} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerUp} onKeyDown={(event) => {
          const steps = { ArrowLeft: [-0.12, 0], ArrowRight: [0.12, 0], ArrowUp: [0, -0.12], ArrowDown: [0, 0.12] };
          if (steps[event.key]) { event.preventDefault(); rotateBy(...steps[event.key]); }
        }} tabIndex={0} />
        <div className="flow-3d-vignette" aria-hidden="true" />
        {visibleNodes.map((node) => {
          const point = positions[node.id] || { left: 0, top: 0 };
          const visible = point.left > -20 && point.left < size.width + 20 && point.top > -12 && point.top < size.height + 12;
          const horizontalPad = size.width < 760 ? 92 : 96;
          const labelLeft = Math.max(horizontalPad, Math.min(size.width - horizontalPad, point.left));
          const labelTop = Math.max(32, Math.min(size.height - 32, point.top));
          const incoming = visibleEdges.filter((edge) => edge.to === node.id);
          const outgoing = visibleEdges.filter((edge) => edge.from === node.id);
          return <button key={node.id} type="button" className={`flow-node-label${activeTooltip === node.id ? " tooltip-open" : ""}`} style={{ left: labelLeft, top: labelTop, opacity: visible ? 1 : 0 }} aria-label={`${node.label}: ${node.kind}. Focus for component details.`} onPointerEnter={() => setActiveTooltip(node.id)} onPointerLeave={() => setActiveTooltip(null)} onFocus={() => setActiveTooltip(node.id)} onBlur={() => setActiveTooltip(null)}>
            <span className={`flow-node-dot ${node.modes?.includes("fullScope") && !node.modes.includes("implementation") ? "scope-node-dot" : ""}`} /><span><strong>{node.label}</strong><small>{node.kind}</small></span>
            <span className="flow-node-tooltip" role="tooltip"><strong>{node.label}</strong><span>{node.description || node.kind}</span>{incoming.length > 0 && <span><b>Receives</b> {incoming.map((edge) => `${nodeById.get(edge.from)?.label}: ${edge.label}`).join(" · ")}</span>}{outgoing.length > 0 && <span><b>Sends</b> {outgoing.map((edge) => `${nodeById.get(edge.to)?.label}: ${edge.label}`).join(" · ")}</span>}</span>
          </button>;
        })}
        <p className="flow-3d-instruction">Drag to rotate · arrow keys also work</p>
        <ul className="flow-map-accessible" aria-label="Connected system components">
          {visibleEdges.map((edge) => <li key={`${edge.from}-${edge.to}-${edge.label}`}>{nodeById.get(edge.from)?.label} sends {edge.response === false ? "an event to" : "a request to"} {nodeById.get(edge.to)?.label}{edge.response === false ? "." : `; response returns to ${nodeById.get(edge.from)?.label}.`} Flow: {edge.label}.</li>)}
        </ul>
      </div>
    </section>
  );
}
