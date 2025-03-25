import React from "react";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="40" height="40" rx="8" fill="white" />
      <path
        d="M10 10H30V14H10V10Z"
        fill="black"
      />
      <path
        d="M10 18H25V22H10V18Z"
        fill="black"
      />
      <path
        d="M10 26H20V30H10V26Z"
        fill="black"
      />
      <circle
        cx="30"
        cy="28"
        r="5"
        fill="#0066FF"
      />
    </svg>
  );
}
