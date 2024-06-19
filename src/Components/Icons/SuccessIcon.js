import React from 'react';

function SuccessIcon({ width, height, borderColor, color, backgroundColor }) {
    return (
        <svg width={width} height={height} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="50" height="50" fill={color} fill-opacity="0.01" />
            <path d="M24 4L29.2533 7.83204L35.7557 7.81966L37.7533 14.0077L43.0211 17.8197L41 24L43.0211 30.1803L37.7533 33.9923L35.7557 40.1803L29.2533 40.168L24 44L18.7467 40.168L12.2443 40.1803L10.2467 33.9923L4.97887 30.1803L7 24L4.97887 17.8197L10.2467 14.0077L12.2443 7.81966L18.7467 7.83204L24 4Z"
                fill={backgroundColor} stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M17 24L22 29L32 19" stroke={borderColor} stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    );
}

export default SuccessIcon;