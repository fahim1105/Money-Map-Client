import React from "react";
import './OverviewLoader.css'

const OverviewLoader = () => {
    const loadingItems = Array.from({ length: 9 }); // 9 "Loading" texts

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="loader flex flex-col items-center space-y-2">
                {loadingItems.map((_, index) => (
                    <div key={index} className="text animate-pulse text-lg font-medium">
                        <span>Loading</span>
                    </div>
                ))}
                <div className="w-24 h-1 bg-gray-300 rounded-full mt-4 animate-pulse"></div>
            </div>
        </div>
    );
};

export default OverviewLoader;
