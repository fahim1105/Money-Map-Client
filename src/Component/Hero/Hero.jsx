import React from "react";
import Banner from "./Banner/Banner";
import StaticSections from "./StaticSections/StaticSections";
import Overview from "./Overview/Overview";

const Hero = () => {
    return (
        <main className="w-full overflow-hidden">
            <Banner />
            <section >
                <StaticSections />
            </section>
            <Overview></Overview>
        </main>
    );
};

export default Hero;
