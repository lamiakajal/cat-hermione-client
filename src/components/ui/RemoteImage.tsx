"use client";

import React, { useState } from "react";
import { FALLBACK_IMAGE } from "@/lib/events";

interface RemoteImageProps {
  src?: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

// Event images are user-supplied URLs from any host, so next/image's domain
// allow-list can't be used here. A plain <img> with a fallback never crashes.
export const RemoteImage: React.FC<RemoteImageProps> = ({
  src,
  alt,
  className = "",
  priority = false,
}) => {
  const [failed, setFailed] = useState(false);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={failed || !src ? FALLBACK_IMAGE : src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
};

export default RemoteImage;
