"use client";

export default function DatingPlatformsSection() {
    const platforms = [
        {
            name: "Instagram",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1200px-Instagram_logo_2016.svg.png"
        },
        {
            name: "Facebook",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"
        },
        {
            name: "LinkedIn",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/1200px-LinkedIn_logo_initials.png"
        },
        {
            name: "X",
            logo: "https://abs.twimg.com/favicons/twitter.3.ico"
        },
        {
            name: "YouTube",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/1200px-YouTube_full-color_icon_%282017%29.svg.png"
        },
        {
            name: "Snapchat",
            logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Snapchat_logo.svg/1200px-Snapchat_logo.svg.png"
        },
        {
            name: "Pinterest",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Pinterest-logo.png/1200px-Pinterest-logo.png"
        },
        {
            name: "WhatsApp",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png"
        },
        {
            name: "Discord",
            logo: "https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png"
        },
    ];

    return (
        <div className="py-16 bg-black/50 backdrop-blur-sm border-y border-white/10">
            <div className="container">
                <h3 className="text-center text-2xl font-bold text-white mb-8 tracking-wider">
                    SUCCESSFULLY TESTED AND APPROVED ON
                </h3>

                <div className="relative overflow-hidden">
                    {/* Scrolling container */}
                    <div className="flex animate-scroll space-x-20 items-center">
                        {/* First set of platforms */}
                        {platforms.map((platform, index) => (
                            <div
                                key={`first-${index}`}
                                className="flex-shrink-0 flex items-center hover:opacity-80 transition-opacity duration-300"
                            >
                                {platform.logo.startsWith('http') ? (
                                    <img
                                        src={platform.logo}
                                        alt={platform.name}
                                        className={`h-8 w-auto object-contain ${platform.name === 'TikTok' ? 'brightness-0 invert' : ''}`}
                                    />
                                ) : (
                                    <span className="text-white font-bold text-lg">
                                        {platform.logo}
                                    </span>
                                )}
                            </div>
                        ))}

                        {/* Second set for seamless scrolling */}
                        {platforms.map((platform, index) => (
                            <div
                                key={`second-${index}`}
                                className="flex-shrink-0 flex items-center hover:opacity-80 transition-opacity duration-300"
                            >
                                {platform.logo.startsWith('http') ? (
                                    <img
                                        src={platform.logo}
                                        alt={platform.name}
                                        className={`h-8 w-auto object-contain ${platform.name === 'TikTok' ? 'brightness-0 invert' : ''}`}
                                    />
                                ) : (
                                    <span className="text-white font-bold text-lg">
                                        {platform.logo}
                                    </span>
                                )}
                            </div>
                        ))}

                        {/* Third set for extra smoothness */}
                        {platforms.map((platform, index) => (
                            <div
                                key={`third-${index}`}
                                className="flex-shrink-0 flex items-center hover:opacity-80 transition-opacity duration-300"
                            >
                                {platform.logo.startsWith('http') ? (
                                    <img
                                        src={platform.logo}
                                        alt={platform.name}
                                        className={`h-8 w-auto object-contain ${platform.name === 'TikTok' ? 'brightness-0 invert' : ''}`}
                                    />
                                ) : (
                                    <span className="text-white font-bold text-lg">
                                        {platform.logo}
                                    </span>
                                )}
                            </div>
                        ))}

                        {/* Fourth set for perfect seamless loop */}
                        {platforms.map((platform, index) => (
                            <div
                                key={`fourth-${index}`}
                                className="flex-shrink-0 flex items-center hover:opacity-80 transition-opacity duration-300"
                            >
                                {platform.logo.startsWith('http') ? (
                                    <img
                                        src={platform.logo}
                                        alt={platform.name}
                                        className={`h-8 w-auto object-contain ${platform.name === 'TikTok' ? 'brightness-0 invert' : ''}`}
                                    />
                                ) : (
                                    <span className="text-white font-bold text-lg">
                                        {platform.logo}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
