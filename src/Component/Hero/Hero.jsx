import React, { use } from "react";
import Banner from "./Banner/Banner";
import StaticSections from "./StaticSections/StaticSections";
import Overview from "./Overview/Overview";
import { AuthContext } from "../../Provider/AuthContext/AuthContext";

const Hero = () => {
    const { user } = use(AuthContext)
    return (
        <main className="w-full overflow-hidden">
            <Banner />
            <section >
                <StaticSections />
            </section>
            {
                user &&
                <Overview></Overview>
            }
        </main>
    );
};

export default Hero;
