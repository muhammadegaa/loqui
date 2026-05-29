"use client";

// Performant "premium 2D" animated mesh gradient: layered blurred radial blobs
// drifting slowly. No WebGL, no bundle cost, respects reduced-motion.
export function MeshGradient() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute rounded-full blur-[100px]"
        style={{
          width: 640,
          height: 640,
          top: -240,
          left: -140,
          background: "radial-gradient(circle, rgba(34,211,238,0.5), transparent 65%)",
          animation: "drift1 16s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full blur-[100px]"
        style={{
          width: 580,
          height: 580,
          top: 80,
          right: -180,
          background: "radial-gradient(circle, rgba(59,130,246,0.46), transparent 65%)",
          animation: "drift2 19s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full blur-[100px]"
        style={{
          width: 520,
          height: 520,
          bottom: -220,
          left: "32%",
          background: "radial-gradient(circle, rgba(45,212,191,0.32), transparent 65%)",
          animation: "drift1 22s ease-in-out infinite reverse",
        }}
      />
      <style>{`
        @keyframes drift1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(40px,30px)} }
        @keyframes drift2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-50px,40px)} }
      `}</style>
    </div>
  );
}
