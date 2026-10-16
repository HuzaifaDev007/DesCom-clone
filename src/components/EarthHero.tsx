import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import gsap from "gsap";

/**
 * EarthHero
 *
 * Recreates the Mars video design (a glowing planet arc rising from the bottom
 * of a pure black frame, lit from the top, fading to darkness, slowly rotating)
 * but with Earth. It is rendered live with a WebGL fragment shader, so it loops
 * forever, stays sharp at any resolution, and needs no video file.
 *
 * Usage as a hero background (the parent needs `position: relative` and a
 * height, e.g. your hero <section>). Your nav, heading and tagline stay in
 * their own elements and simply sit on top (give them a higher z-index):
 *
 *   <section style={{ position: "relative", height: "100vh" }}>
 *     <EarthHero />
 *     <div style={{ position: "relative", zIndex: 1 }}>...nav / DESCOM / tagline...</div>
 *   </section>
 *
 * Optional real Earth map:
 *   <EarthHero textureUrl="/textures/earth-day.jpg" />
 *
 * Props:
 *   speed       Rotation speed multiplier (default 1).
 *   textureUrl  Optional equirectangular Earth map (2:1 JPG/PNG/WebP). When
 *               omitted, a procedural Earth (continents, ice, clouds, city
 *               lights) is generated in the shader.
 *   children    Content layered on top of the planet.
 */

export interface EarthHeroProps {
  /** "background" (default) fills the nearest positioned parent. "block" is a standalone 100vh section. */
  mode?: "background" | "block";
  speed?: number;
  textureUrl?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

const VERTEX_SRC = /* glsl */ `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAGMENT_SRC = /* glsl */ `
precision highp float;

uniform vec2 uRes;
uniform float uTime;
uniform sampler2D uTex;
uniform float uUseTex;

const float PI = 3.14159265359;

float hash(vec3 p) {
  p = fract(p * 0.3183099 + 0.1);
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float noise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash(i + vec3(0.0, 0.0, 0.0)), hash(i + vec3(1.0, 0.0, 0.0)), f.x),
        mix(hash(i + vec3(0.0, 1.0, 0.0)), hash(i + vec3(1.0, 1.0, 0.0)), f.x), f.y),
    mix(mix(hash(i + vec3(0.0, 0.0, 1.0)), hash(i + vec3(1.0, 0.0, 1.0)), f.x),
        mix(hash(i + vec3(0.0, 1.0, 1.0)), hash(i + vec3(1.0, 1.0, 1.0)), f.x), f.y),
    f.z);
}

float fbm(vec3 p) {
  float a = 0.5;
  float s = 0.0;
  // 4 octaves — enough detail without melting fill-rate on a full-bleed hero.
  for (int i = 0; i < 4; i++) {
    s += a * noise(p);
    p = p * 2.03 + vec3(1.7, 9.2, 3.1);
    a *= 0.5;
  }
  return s;
}

vec3 spinY(vec3 v, float a) {
  float c = cos(a);
  float s = sin(a);
  return vec3(c * v.x + s * v.z, v.y, -s * v.x + c * v.z);
}

vec3 pitchX(vec3 v, float a) {
  float c = cos(a);
  float s = sin(a);
  return vec3(v.x, c * v.y - s * v.z, s * v.y + c * v.z);
}

vec3 tiltZ(vec3 v, float t) {
  float c = cos(t);
  float s = sin(t);
  return vec3(c * v.x - s * v.y, s * v.x + c * v.y, v.z);
}

void main() {
  // Screen space, y up, height normalised to 1.
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;

  // Big, flat planet arc like the DESCOM hero: the top of the arc sits about
  // 35% down from the top of the frame and the edges meet the sides lower down.
  float aspect = uRes.x / uRes.y;
  float radius = clamp(0.91 * aspect, 1.1, 2.6);
  vec2 center = vec2(0.0, 0.15 - radius);
  vec2 p = (uv - center) / radius;
  float r2 = dot(p, p);
  float r = sqrt(r2);

  // Mostly front-lit, slightly brighter on the right and top.
  vec3 L = normalize(vec3(0.12, 0.45, 0.88));
  float spin = uTime * 0.035;

  // ---- Planet surface ----
  float z = sqrt(max(1.0 - r2, 0.0));
  vec3 n = vec3(p, z);
  vec3 q0 = tiltZ(pitchX(n, 0.55), 0.41);   // pitch toward camera + axial tilt
  vec3 q = spinY(q0, spin);          // surface rotation

  float ndl = dot(n, L);
  float day = smoothstep(-0.35, 0.45, ndl);

  vec3 albedo;
  float oceanMask;
  float land = 0.0;

  if (uUseTex > 0.5) {
    float u = atan(q.z, q.x) / (2.0 * PI) + 0.5;
    float v = asin(clamp(q.y, -1.0, 1.0)) / PI + 0.5;
    albedo = texture2D(uTex, vec2(u, v)).rgb;
    albedo = pow(albedo, vec3(2.2));
    oceanMask = smoothstep(0.0, 0.08, albedo.b - albedo.r);
  } else {
    float h = fbm(q * 2.2 + 3.0);
    land = smoothstep(0.52, 0.545, h);
    vec3 deep = vec3(0.006, 0.035, 0.12);
    vec3 shallow = vec3(0.03, 0.2, 0.38);
    vec3 ocean = mix(deep, shallow, smoothstep(0.36, 0.52, h));

    float lat = abs(q.y);
    float dryness = smoothstep(0.35, 0.7, fbm(q * 2.5 + 20.0)) * (1.0 - smoothstep(0.0, 0.75, lat));
    vec3 green = vec3(0.06, 0.17, 0.05);
    vec3 sand = vec3(0.45, 0.34, 0.18);
    vec3 ground = mix(green, sand, dryness);
    ground = mix(ground, vec3(0.2, 0.17, 0.14), smoothstep(0.62, 0.78, h));

    float ice = smoothstep(0.86, 0.94, lat + (fbm(q * 5.0) - 0.5) * 0.12);
    ground = mix(ground, vec3(0.8, 0.85, 0.9), ice);
    ocean = mix(ocean, vec3(0.6, 0.7, 0.78), ice);

    albedo = mix(ocean, ground, land);
    oceanMask = (1.0 - land) * (1.0 - ice);
  }

  // Clouds drift slightly faster than the ground.
  vec3 qc = spinY(q0, spin * 1.15);
  float cloudNoise = fbm(qc * 2.4 + vec3(7.0, 1.0, 3.0));
  float cloud = smoothstep(0.56, 0.82, cloudNoise);
  cloud *= 0.85;

  // Lighting
  vec3 lit = albedo * (0.025 + 1.25 * day);
  vec3 V = vec3(0.0, 0.0, 1.0);
  vec3 H = normalize(L + V);
  float spec = pow(max(dot(n, H), 0.0), 70.0) * oceanMask * (1.0 - cloud) * day;
  lit += vec3(0.55, 0.7, 0.9) * spec * 0.7;

  vec3 cloudCol = vec3(0.92, 0.95, 1.0) * (0.03 + 1.15 * day);
  lit = mix(lit, cloudCol, cloud);

  // City lights on the night side (procedural mode only). Reuse land; cheap noise.
  if (uUseTex < 0.5) {
    float cityNoise = smoothstep(0.62, 0.78, noise(q * 14.0));
    float nightAmt = 1.0 - day;
    lit += vec3(1.0, 0.68, 0.28) * cityNoise * land * nightAmt * (1.0 - cloud * 0.85) * 0.55;
  }

  // Blue atmospheric rim, stronger on the lit side.
  float fres = pow(1.0 - z, 3.0);
  lit += vec3(0.3, 0.58, 1.0) * fres * (0.35 + 1.2 * day);

  // ---- Outer atmosphere halo ----
  float d = max(r - 1.0, 0.0);
  vec2 dir = p / max(r, 0.0001);
  float side = clamp(dot(dir, normalize(L.xy)) * 0.5 + 0.5, 0.0, 1.0);
  vec3 halo = vec3(0.45, 0.7, 1.0) * exp(-d * radius * 24.0) * 0.75 * (0.35 + 0.65 * side);

  // Planet / halo blend with a pixel-wide soft edge.
  float px = 1.5 / uRes.y;
  float m = 1.0 - smoothstep(1.0 - px, 1.0 + px, r);
  vec3 col = mix(halo, lit, m);

  // Fade to black toward the bottom of the frame, like the video.
  col *= mix(0.12, 1.0, smoothstep(-0.5, -0.28, uv.y));

  // Gentle tone curve + dither to avoid gradient banding.
  col = col / (1.0 + col * 0.25);
  col = pow(clamp(col, 0.0, 1.0), vec3(0.92));
  col += (hash(vec3(gl_FragCoord.xy, uTime)) - 0.5) / 255.0;

  gl_FragColor = vec4(col, 1.0);
}
`;

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("EarthHero shader error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function EarthHero({
  mode = "background",
  speed = 1,
  textureUrl,
  className,
  style,
  children,
}: EarthHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const contextOptions: WebGLContextAttributes = {
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
      desynchronized: true,
    };
    const gl =
      canvas.getContext("webgl", contextOptions) ||
      canvas.getContext("webgl", { ...contextOptions, desynchronized: false });
    if (!gl) return; // Falls back to the plain black background.

    const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SRC);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("EarthHero link error:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // Full-screen triangle.
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "uRes");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uTex = gl.getUniformLocation(program, "uTex");
    const uUseTex = gl.getUniformLocation(program, "uUseTex");

    // Placeholder 1x1 texture so the sampler is always valid.
    const texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([0, 0, 0, 255])
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.uniform1i(uTex, 0);
    gl.uniform1f(uUseTex, 0);

    let disposed = false;
    if (textureUrl) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        if (disposed) return;
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.uniform1f(uUseTex, 1);
      };
      img.onerror = () =>
        console.warn("EarthHero: could not load texture, using procedural Earth.");
      img.src = textureUrl;
    }

    const reducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const animate = !reducedMotion && speed !== 0;

    let inView = true;
    let pageVisible = document.visibilityState !== "hidden";
    let resizeRaf = 0;

    const resize = () => {
      // Undersample the backing store; CSS scales the canvas up. Caps fill cost
      // far below full devicePixelRatio×viewport (the main FPS killer).
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      const quality = canvas.clientWidth < 768 ? 0.45 : 0.55;
      const scale = dpr * quality;
      const w = Math.max(1, Math.floor(canvas.clientWidth * scale));
      const h = Math.max(1, Math.floor(canvas.clientHeight * scale));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };

    const scheduleResize = () => {
      if (resizeRaf) return;
      resizeRaf = requestAnimationFrame(() => {
        resizeRaf = 0;
        if (!disposed) resize();
      });
    };

    const observer = new ResizeObserver(scheduleResize);
    observer.observe(canvas);
    resize();

    const start = performance.now();
    let lastDraw = -1;

    const draw = () => {
      if (disposed || !inView || !pageVisible) return;
      // Sync with GSAP's ticker (no second rAF loop). Skip duplicate frames.
      const now = performance.now();
      if (now - lastDraw < 12) return;
      lastDraw = now;
      const t = animate ? ((now - start) / 1000) * speed : 0;
      gl.uniform1f(uTime, t);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    draw();

    if (animate) {
      gsap.ticker.add(draw);
    }

    const io =
      typeof IntersectionObserver === "function"
        ? new IntersectionObserver(
            ([entry]) => {
              inView = entry?.isIntersecting ?? true;
              if (inView && pageVisible) draw();
            },
            { root: null, threshold: 0.01 },
          )
        : null;
    io?.observe(canvas);

    const onVisibility = () => {
      pageVisible = document.visibilityState !== "hidden";
      if (pageVisible && inView) draw();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      disposed = true;
      if (animate) gsap.ticker.remove(draw);
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      observer.disconnect();
      io?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [speed, textureUrl]);

  const isBackground = mode === "background";

  return (
    <div
      className={className}
      style={
        isBackground
          ? {
              position: "absolute",
              inset: 0,
              zIndex: 0,
              background: "#000",
              overflow: "hidden",
              pointerEvents: "none",
              ...style,
            }
          : {
              position: "relative",
              width: "100%",
              height: "100vh",
              minHeight: 360,
              background: "#000",
              overflow: "hidden",
              ...style,
            }
      }
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
      {children ? (
        <div style={{ position: "relative", zIndex: 1, height: "100%" }}>
          {children}
        </div>
      ) : null}
    </div>
  );
}
