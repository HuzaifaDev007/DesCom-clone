import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import gsap from "gsap";

/**
 * EarthHeroUpdated — cinematic homepage hero planet.
 *
 * Fullscreen WebGL Earth arc (DESCOM composition) with cinema lighting,
 * dual cloud layers, atmosphere, soft starfield, ~2.1s intro bloom, then
 * a living idle. See docs/superpowers/specs/2026-10-08-cinematic-earth-hero-design.md
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

const INTRO_DURATION = 2.1;

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
uniform float uIntro;
uniform sampler2D uTex;
uniform float uUseTex;

const float PI = 3.14159265359;

float hash(vec3 p) {
  p = fract(p * 0.3183099 + 0.1);
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float hash2(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
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
  for (int i = 0; i < 5; i++) {
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
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;

  float aspect = uRes.x / uRes.y;
  float radius = clamp(0.91 * aspect, 1.1, 2.6);
  // Intro: planet rises into the framed arc.
  float rise = (1.0 - uIntro) * -0.09;
  vec2 center = vec2(0.0, 0.15 - radius + rise);
  vec2 p = (uv - center) / radius;
  float r2 = dot(p, p);
  float r = sqrt(r2);

  // Key light with subtle breathing drift.
  float lightDrift = sin(uTime * 0.11) * 0.045;
  vec3 L = normalize(vec3(0.16 + lightDrift, 0.48, 0.86));
  float spin = uTime * 0.035;

  float z = sqrt(max(1.0 - r2, 0.0));
  vec3 n = vec3(p, z);
  vec3 q0 = tiltZ(pitchX(n, 0.55), 0.41);
  vec3 q = spinY(q0, spin);

  float ndl = dot(n, L);
  // Softer cinematic terminator.
  float day = smoothstep(-0.28, 0.55, ndl);
  float dusk = smoothstep(-0.05, 0.35, ndl) * (1.0 - smoothstep(0.2, 0.7, ndl));

  vec3 albedo;
  float oceanMask;

  if (uUseTex > 0.5) {
    float tu = atan(q.z, q.x) / (2.0 * PI) + 0.5;
    float tv = asin(clamp(q.y, -1.0, 1.0)) / PI + 0.5;
    vec3 texColor = texture2D(uTex, vec2(tu, tv)).rgb;
    albedo = pow(max(texColor, vec3(0.0)), vec3(1.55));
    oceanMask = smoothstep(-0.02, 0.14, texColor.b - max(texColor.r, texColor.g) * 0.92);
  } else {
    float h = fbm(q * 2.2 + 3.0);
    float land = smoothstep(0.52, 0.545, h);
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

  // Dual cloud layers — dense base + thin wisps, faster than ground.
  vec3 qc = spinY(q0, spin * 1.22);
  float cloudDense = smoothstep(0.55, 0.82, fbm(qc * 2.35 + vec3(7.0, 1.0, 3.0)));
  vec3 qw = spinY(q0, spin * 1.48);
  float cloudWisp = smoothstep(0.62, 0.9, noise(qw * 5.5 + vec3(2.0, uTime * 0.02, 9.0)));
  float cloud = cloudDense * 0.72 + cloudWisp * 0.38;
  cloud = clamp(cloud, 0.0, 1.0);
  cloud *= uUseTex > 0.5 ? 0.58 : 0.88;

  float amb = uUseTex > 0.5 ? 0.055 : 0.028;
  float key = uUseTex > 0.5 ? 1.12 : 1.28;
  // Cool fill in shadow + warm kiss on the lit limb.
  vec3 coolFill = vec3(0.04, 0.07, 0.14) * (1.0 - day);
  vec3 warmRim = vec3(0.55, 0.32, 0.14) * dusk * 0.22 * pow(1.0 - z, 2.0);
  vec3 lit = albedo * (amb + key * day) + coolFill + warmRim;

  vec3 V = vec3(0.0, 0.0, 1.0);
  vec3 H = normalize(L + V);
  float spec = pow(max(dot(n, H), 0.0), 56.0) * oceanMask * (1.0 - cloud) * day;
  lit += vec3(0.55, 0.75, 1.0) * spec * (uUseTex > 0.5 ? 0.55 : 0.75);

  vec3 cloudCol = vec3(0.93, 0.96, 1.0) * (0.05 + 1.12 * day);
  lit = mix(lit, cloudCol, cloud);

  if (uUseTex < 0.5) {
    float cityNoise = smoothstep(0.62, 0.78, fbm(q * 14.0));
    float landMask = smoothstep(0.52, 0.545, fbm(q * 2.2 + 3.0));
    float nightAmt = 1.0 - day;
    lit += vec3(1.0, 0.68, 0.28) * cityNoise * landMask * nightAmt * (1.0 - cloud * 0.85) * 0.55;
  }

  // Atmosphere rim + soft pulse.
  float rimPulse = 1.0 + 0.045 * sin(uTime * 0.7);
  float fres = pow(1.0 - z, 2.6);
  lit += vec3(0.28, 0.55, 1.0) * fres * (0.4 + 1.35 * day) * rimPulse;

  float d = max(r - 1.0, 0.0);
  vec2 dir = p / max(r, 0.0001);
  float side = clamp(dot(dir, normalize(L.xy)) * 0.5 + 0.5, 0.0, 1.0);
  float haloGain = (0.85 + 0.15 * rimPulse) * uIntro;
  vec3 halo = vec3(0.42, 0.68, 1.05) * exp(-d * radius * 16.0) * 0.95 * (0.3 + 0.7 * side) * haloGain;
  // Depth haze near the limb (space fog).
  vec3 haze = vec3(0.12, 0.22, 0.45) * exp(-d * radius * 5.5) * 0.22 * uIntro;

  float px = 1.5 / uRes.y;
  float m = 1.0 - smoothstep(1.0 - px, 1.0 + px, r);
  vec3 planet = mix(halo + haze, lit, m);

  // Soft starfield outside the planet disc.
  vec2 starUv = uv * vec2(88.0, 52.0);
  vec2 starCell = floor(starUv);
  float starId = hash2(starCell);
  float star = step(0.985, starId);
  float twinkle = 0.55 + 0.45 * sin(uTime * (1.2 + starId * 2.5) + starId * 6.28);
  float starDist = length(fract(starUv) - 0.5);
  star *= smoothstep(0.08, 0.0, starDist);
  float vignette = smoothstep(1.15, 0.25, length(uv * vec2(0.7, 1.0)));
  float outside = 1.0 - m;
  vec3 stars = vec3(0.75, 0.82, 1.0) * star * twinkle * 0.35 * vignette * outside * uIntro;

  vec3 col = planet + stars;

  // Bottom fade (video framing) + intro brightness settle.
  col *= mix(0.12, 1.0, smoothstep(-0.5, -0.28, uv.y));
  col *= mix(0.38, 1.0, uIntro);

  // Filmic grade — contrast + teal shadow lift.
  col = col / (1.0 + col * 0.28);
  vec3 shadowed = col + vec3(0.0, 0.012, 0.028) * (1.0 - smoothstep(0.05, 0.45, dot(col, vec3(0.3, 0.6, 0.1))));
  col = mix(col, shadowed, 0.55);
  col = pow(clamp(col, 0.0, 1.0), vec3(0.9));
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

function easeOutCubic(t: number): number {
  const x = Math.min(1, Math.max(0, t));
  return 1 - Math.pow(1 - x, 3);
}

export default function EarthHeroUpdated({
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
    if (!gl) return;

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
    const uIntro = gl.getUniformLocation(program, "uIntro");
    const uTex = gl.getUniformLocation(program, "uTex");
    const uUseTex = gl.getUniformLocation(program, "uUseTex");

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
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.generateMipmap(gl.TEXTURE_2D);
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
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
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
      const now = performance.now();
      if (now - lastDraw < 12) return;
      lastDraw = now;

      const elapsed = (now - start) / 1000;
      const intro = reducedMotion
        ? 1
        : easeOutCubic(elapsed / INTRO_DURATION);
      const t = animate ? elapsed * speed : 0;

      gl.uniform1f(uTime, t);
      gl.uniform1f(uIntro, intro);
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
