import React from 'react';
import './Loader.css'

const Loader = () => {
    return (
        <div className="flex items-center justify-center h-screen w-screen bg-primary/20">
            <div className="relative">
                <div className="nebula"></div>
                <div className="grid-plane"></div>

                <div className="stars-container">
                    <div className="star-layer"></div>
                    <div className="star-layer"></div>
                    <div className="star-layer"></div>
                </div>

                <div className="loader-container">
                    <div className="hologram-platform"></div>

                    <div className="platform-rings">
                        <div className="platform-ring"></div>
                        <div className="platform-ring"></div>
                        <div className="platform-ring"></div>
                    </div>

                    <div className="projection-beams">
                        <div className="beam"></div>
                        <div className="beam"></div>
                        <div className="beam"></div>
                        <div className="beam"></div>
                    </div>

                    <div className="holo-container">
                        <div className="holo-sphere">
                            <div className="holo-ring"></div>
                            <div className="holo-ring"></div>
                            <div className="holo-ring"></div>
                            <div className="holo-ring"></div>
                            <div className="holo-ring"></div>

                            <div className="holo-particles">
                                {Array.from({ length: 12 }).map((_, i) => (
                                    <div key={i} className="holo-particle"></div>
                                ))}
                            </div>
                        </div>

                        <div className="glitch-effect"></div>
                        <div className="lightning"></div>
                    </div>

                    <div className="code-lines">
                        <div className="code-line">
                            01001001 01001110 01001001 01010100 01001001 01000001 01001100 01001001
                            01011010 01001001 01001110 01000111
                        </div>
                        <div className="code-line">
                            function initHolographicMatrix() &#123; connectNodes(); renderQuantumState(); &#125;
                        </div>
                        <div className="code-line">
                            01010011 01011001 01010011 01010100 01000101 01001101 00100000 01001100
                            01001111 01000001 01000100 01001001 01001110 01000111
                        </div>
                        <div className="code-line">
                            class QuantumProcessor &#123; constructor() &#123; this.entanglement = new Map(); &#125; &#125;
                        </div>
                        <div className="code-line">
                            01010010 01000101 01001110 01000100 01000101 01010010 01001001 01001110
                            01000111 00100000 01001000 01001111 01001100 01001111
                        </div>
                        <div className="code-line">
                            const matrix = [1.2, 0.8, 3.1, 2.7, 5.9, 4.3, 7.2, 9.0];
                        </div>
                        <div className="code-line">
                            01010000 01010010 01001111 01000011 01000101 01010011 01010011 01001001
                            01001110 01000111 00100000 01000100 01000001 01010100 01000001
                        </div>
                        <div className="code-line">
                            async function loadHolographicData() &#123; await fetch('/api/quantum'); &#125;
                        </div>
                    </div>

                    <div className="holo-numbers">
                        {[
                            { top: "40%", left: "30%", delay: "0.5s", value: "0xFF" },
                            { top: "50%", left: "60%", delay: "1.5s", value: "0x0A" },
                            { top: "60%", left: "40%", delay: "2.5s", value: "0xB4" },
                            { top: "30%", left: "50%", delay: "3.5s", value: "0x3D" },
                            { top: "70%", left: "20%", delay: "4.5s", value: "0xC2" },
                            { top: "20%", left: "70%", delay: "5.5s", value: "0x19" },
                        ].map((num, i) => (
                            <div
                                key={i}
                                className="number"
                                style={{ top: num.top, left: num.left, animationDelay: num.delay }}
                            >
                                {num.value}
                            </div>
                        ))}
                    </div>

                    <div className="radial-indicators">
                        <div className="radial-indicator"></div>
                        <div className="radial-indicator"></div>
                        <div className="radial-indicator"></div>
                        <div className="radial-indicator"></div>
                    </div>

                    <div className="corner-decorations">
                        <div className="corner"></div>
                        <div className="corner"></div>
                        <div className="corner"></div>
                        <div className="corner"></div>
                    </div>

                    <div className="loading-text">SYSTEM IITIALIZATION</div>
                    <div className="progress-container">
                        <div className="progress-bar"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
