// Loader.jsx
import React from "react";
import "./Loader.css";

const Loader = ({ count = 15, className = "" }) => {
    const items = Array.from({ length: count }, (_, i) => i);

    return (
        <div className="flex items-center justify-center h-screen w-full bg-transparent">
            <aside className={`container-loader ${className}`}>
                {items.map((i) => (
                    <div
                        key={i}
                        className="aro"
                        style={{ ["--s"]: i }}
                    />
                ))}
            </aside>
        </div>
    );
};

export default Loader;
