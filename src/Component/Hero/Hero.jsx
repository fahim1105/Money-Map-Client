import React from "react";
import Banner from "./Banner/Banner";
import StaticSections from "./StaticSections/StaticSections";

const Hero = () => {
    return (
        <main className="w-full overflow-hidden">
            <Banner />
            <section className="mt-16 md:mt-24">
                <StaticSections />
            </section>
        </main>
    );
};

export default Hero;
