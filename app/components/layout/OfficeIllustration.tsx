export default function OfficeIllustration() {
  return (
    <svg
      viewBox="0 0 320 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-auto w-full max-w-sm text-[#052e16]"
    >
      <line
        x1="10"
        y1="210"
        x2="310"
        y2="210"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="2"
      />

      {/* Building 1 */}
      <rect
        x="30"
        y="90"
        width="70"
        height="120"
        rx="4"
        stroke="currentColor"
        strokeOpacity="0.6"
        strokeWidth="2"
      />
      <line
        x1="30"
        y1="110"
        x2="100"
        y2="110"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="1.5"
      />
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2].map((col) => (
          <rect
            key={`b1-${row}-${col}`}
            x={42 + col * 18}
            y={120 + row * 20}
            width="10"
            height="10"
            rx="1.5"
            stroke="currentColor"
            strokeOpacity="0.5"
            strokeWidth="1.2"
          />
        ))
      )}

      {/* Building 2 (center, tallest) */}
      <rect
        x="120"
        y="50"
        width="80"
        height="160"
        rx="4"
        stroke="currentColor"
        strokeOpacity="0.8"
        strokeWidth="2.2"
      />
      <line
        x1="120"
        y1="72"
        x2="200"
        y2="72"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="1.5"
      />
      {[0, 1, 2, 3, 4].map((row) =>
        [0, 1, 2, 3].map((col) => (
          <rect
            key={`b2-${row}-${col}`}
            x={131 + col * 16}
            y={84 + row * 20}
            width="9"
            height="9"
            rx="1.5"
            stroke="currentColor"
            strokeOpacity="0.55"
            strokeWidth="1.2"
          />
        ))
      )}
      <rect
        x="152"
        y="176"
        width="36"
        height="34"
        stroke="currentColor"
        strokeOpacity="0.6"
        strokeWidth="1.5"
      />

      {/* Building 3 */}
      <rect
        x="220"
        y="120"
        width="65"
        height="90"
        rx="4"
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="2"
      />
      <line
        x1="220"
        y1="140"
        x2="285"
        y2="140"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="1.5"
      />
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => (
          <rect
            key={`b3-${row}-${col}`}
            x={230 + col * 17}
            y={150 + row * 18}
            width="9"
            height="9"
            rx="1.5"
            stroke="currentColor"
            strokeOpacity="0.45"
            strokeWidth="1.2"
          />
        ))
      )}

      {/* Small plant accent */}
      <circle
        cx="16"
        cy="196"
        r="8"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="1.5"
      />
      <line
        x1="16"
        y1="204"
        x2="16"
        y2="210"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="1.5"
      />

      {/* Abstract sun/circle accent */}
      <circle
        cx="272"
        cy="40"
        r="14"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="2"
      />
    </svg>
  );
}
