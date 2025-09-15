import React from 'react';

/*
 Props:
  - score (0..100)
  - title
  - size
*/
export default function RadialScore({ score = 0, title = 'Health', size = 120 }) {
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 75 ? '#16a34a' : score >= 50 ? '#f59e0b' : '#ef4444';

  return (
    <div style={{ width: size, textAlign: 'center' }}>
      <svg width={size} height={size}>
        <g transform={`translate(${size/2},${size/2})`}>
          <circle r={radius} fill="none" stroke="#f1f5f9" strokeWidth="12" />
          <circle
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90)"
          />
          <text x="0" y="-6" textAnchor="middle" fontSize="16" fontWeight="700">{score}</text>
          <text x="0" y="14" textAnchor="middle" fontSize="11" fill="#666">{title}</text>
        </g>
      </svg>
    </div>
  );
}
