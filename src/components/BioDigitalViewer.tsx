"use client";

import { useEffect, useRef } from "react";

interface BioDigitalViewerProps {
    modelId?: string;
    className?: string;
}

export const BioDigitalViewer = ({
    modelId = "6wQu",
    className = ""
}: BioDigitalViewerProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const dk = "8b1cf942e91610706d71f408837d5a861b7bf2ef";

    // BioDigital Human Viewer URL - Optimized for a seamless look
    // Using standard documentation keys: 'background' for color matching
    const viewerUrl = `https://human.biodigital.com/viewer/?id=${modelId}&dk=${dk}&ui-all=false&ui-info=false&ui-search=false&ui-reset=false&ui-menu=false&ui-tools=false&ui-fullscreen=false&ui-help=false&ui-nav=false&ui-audio=false&ui-media-controls=none&ui-loader=circle&ui-context-menu=false&initial.none=true&background=244,247,250&load-rotate=2&disable-scroll=true`;

    return (
        <div
            className={`relative w-full h-[600px] overflow-hidden ${className}`}
            style={{
                maskImage: 'radial-gradient(circle at center, black 40%, transparent 85%)',
                WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 85%)'
            }}
        >
            <iframe
                src={viewerUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                className="pointer-events-auto"
                title="BioDigital Human Viewer"
            />
        </div>
    );
};
