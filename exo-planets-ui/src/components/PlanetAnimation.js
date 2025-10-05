import React from "react";

// Realistic yet friendly solar system animation
// - Big glowing Sun (almost fills screen)
// - Cute smiley face on the Sun
// - Planet with a mini face orbiting horizontally in front (transit)
// - Planet casts a small shadow/attenuation when crossing the Sun
// - Starry twinkling background

export default function SolarOrbitCuteTransit() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background with stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 100 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white opacity-80"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animation: `twinkle ${2 + Math.random() * 4}s ease-in-out ${Math.random() * 4}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Main animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1200 700"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Sol con una cara sonriente y un planeta orbitando con carita frente a él"
        >
          <defs>
            {/* Sun gradient */}
            <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff9c4" />
              <stop offset="50%" stopColor="#ffe066" />
              <stop offset="85%" stopColor="#ffb300" />
              <stop offset="100%" stopColor="#ff9100" />
            </radialGradient>

            {/* Planet gradient */}
            <radialGradient id="planetGradient" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#555" />
              <stop offset="100%" stopColor="#111" />
            </radialGradient>

            {/* Orbit path */}
            <path
              id="orbitPath"
              d="M 100 350 a 500 260 0 1 0 1000 0 a 500 260 0 1 0 -1000 0"
              fill="none"
              stroke="rgb(203, 203, 203)"
              strokeWidth="6"
            />

            {/* Glow for the Sun */}
            <filter id="sunGlow">
              <feGaussianBlur stdDeviation="35" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Shadow filter for planet transit */}
            <filter id="planetShadow">
              <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="black" floodOpacity="0.5" />
            </filter>
          </defs>

          {/* Big Sun */}
          <g transform="translate(600,350)">
            <circle r="280" fill="url(#sunGradient)" filter="url(#sunGlow)" />

            {/* Cute face */}
            <circle cx="-60" cy="-40" r="20" fill="#3a2a00" />
            <circle cx="60" cy="-40" r="20" fill="#3a2a00" />
            <path
              d="M -80 50 Q 0 120 80 50"
              stroke="#3a2a00"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* Orbit visible */}
          <use href="#orbitPath" />

          {/* Planet moving across the Sun with face */}
          <g filter="url(#planetShadow)">
            <circle r="45" fill="url(#planetGradient)">
              <animateMotion dur="10s" repeatCount="indefinite">
                <mpath href="#orbitPath" />
              </animateMotion>
            </circle>

            {/* Face on planet */}
            <g>
              <circle cx="-12" cy="-10" r="4" fill="#000000">
                <animateMotion dur="10s" repeatCount="indefinite">
                  <mpath href="#orbitPath" />
                </animateMotion>
              </circle>
              <circle cx="12" cy="-10" r="4" fill="#000000">
                <animateMotion dur="10s" repeatCount="indefinite">
                  <mpath href="#orbitPath" />
                </animateMotion>
              </circle>
              <path
                d="M -14 6 Q 0 14 14 6"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              >
                <animateMotion dur="10s" repeatCount="indefinite">
                  <mpath href="#orbitPath" />
                </animateMotion>
              </path>
            </g>
          </g>
        </svg>
      </div>

      <style>{`
        @keyframes twinkle {
          from { opacity: 0.4; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}