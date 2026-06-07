import React, { useState } from "react";

const LOGO_IMAGES = {
  light: "/healthlogix-logo-light.png", // Mark version designed for white/light backgrounds.
  dark: "/healthlogix-logo-dark.png", // Mark version designed for dark backgrounds.
};

function BrandMark({ className = "" }) {
  return (
    <svg viewBox="0 0 150 90" aria-hidden="true" className={className}>
      <defs>
        <filter id="hla-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#020617" floodOpacity="0.35" />
        </filter>
      </defs>
      <g filter="url(#hla-shadow)">
        <path d="M8 12h20v25h32V12h20v66H60V52H28v26H8V12Z" fill="currentColor" />
        <path d="M82 12h22L85 58h31v20H55l9-20h18V12Z" fill="currentColor" />
        <path d="M111 12h20l15 66h-22l-4-19H98l-8 19H68l29-66h14Zm5 31-4-18-8 18h12Z" fill="#32b45f" />
      </g>
    </svg>
  );
}

function BrandText({ variant = "light", compact = false }) {
  const isDark = variant === "dark";

  return (
    <div className="leading-tight">
      <div className={`${compact ? "text-sm" : "text-lg"} font-black tracking-wide ${isDark ? "text-white" : "text-slate-950"}`}>
        HEALTH LOGIX
      </div>
      <div className={`${compact ? "text-xs" : "text-base"} font-black tracking-wide text-emerald-600`}>
        ASSURANCE LIMITED
      </div>
      <div className={`${compact ? "text-[8px]" : "text-[10px]"} font-semibold tracking-tight ${isDark ? "text-slate-300" : "text-slate-700"}`}>
        Assuring Quality, Enhancing Life
      </div>
    </div>
  );
}

function getLogoImageSrc(variant, imageSrc) {
  if (typeof imageSrc === "string") return imageSrc;
  if (imageSrc && typeof imageSrc === "object") return imageSrc[variant] || imageSrc.light || imageSrc.dark;
  return LOGO_IMAGES[variant] || LOGO_IMAGES.light;
}

export default function BrandLogo({ variant = "light", compact = false, className = "", imageSrc }) {
  const selectedImageSrc = getLogoImageSrc(variant, imageSrc);
  const [failedImageSrc, setFailedImageSrc] = useState(null);
  const shouldUseFallback = !selectedImageSrc || failedImageSrc === selectedImageSrc;
  const isDark = variant === "dark";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {!shouldUseFallback ? (
        <img
          src={selectedImageSrc}
          alt="Health Logix Assurance mark"
          className={`${compact ? "h-10" : "h-14"} w-auto object-contain shrink-0`}
          onError={() => setFailedImageSrc(selectedImageSrc)}
        />
      ) : (
        <BrandMark className={`${compact ? "w-14" : "w-20"} ${isDark ? "text-white" : "text-teal-950"} shrink-0`} />
      )}
      <BrandText variant={variant} compact={compact} />
    </div>
  );
}
