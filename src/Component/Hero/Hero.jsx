import React, { use } from "react";
import Banner from "./Banner/Banner";
import StaticSections from "./StaticSections/StaticSections";
import Overview from "./Overview/Overview";
import { AuthContext } from "../../Provider/AuthContext/AuthContext";
import OurCollaboration from "./OurCollaboration/OurCollaboration";
import Stories from "./Stories/Stories";
import Extra from "./Extra/Extra";

const Hero = () => {
    const { user } = use(AuthContext)
    return (
        <main className="w-full overflow-hidden">
            <Banner />
            {
                user &&
                <Overview></Overview>
            }
            <section >
                <StaticSections />
            </section>
            <Stories></Stories>
            <Extra></Extra>
            <OurCollaboration></OurCollaboration>
        </main>
    );
};

export default Hero;
