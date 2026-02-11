"use client";

import { useEffect, useRef, useState } from "react";

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

    // Detect theme for the iframe background color
    // Light: 244,247,250 | Dark: 11,15,26
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains('dark'));
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        setIsDark(document.documentElement.classList.contains('dark'));
        return () => observer.disconnect();
    }, []);

    const bgColor = isDark ? "11,15,26" : "244,247,250";
    const viewerUrl = `https://human.biodigital.com/viewer/?id=${modelId}&dk=${dk}&ui-all=false&ui-info=false&ui-search=false&ui-reset=false&ui-menu=false&ui-tools=false&ui-fullscreen=false&ui-help=false&ui-nav=false&ui-audio=false&ui-media-controls=none&ui-loader=circle&ui-context-menu=false&initial.none=true&background=${bgColor}&load-rotate=2&disable-scroll=true`;

    return (
        <div
            className={`relative w-full h-[600px] overflow-hidden ${className}`}
            style={{
                maskImage: 'radial-gradient(circle at center, black 40%, transparent 90%)',
                WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 90%)'
            }}
        >
            <iframe
                key={isDark ? 'dark' : 'light'} // Force reload on theme change for clean color switch
                src={viewerUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                className="pointer-events-auto mix-blend-multiply dark:mix-blend-screen transition-opacity"
                title="BioDigital Human Viewer"
            />
        </div>
    );
};
