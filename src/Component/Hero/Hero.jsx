import React, { use, useEffect } from "react";
import Banner from "./Banner/Banner";
import StaticSections from "./StaticSections/StaticSections";
import Overview from "./Overview/Overview";
import { AuthContext } from "../../Provider/AuthContext/AuthContext";
import OurCollaboration from "./OurCollaboration/OurCollaboration";
import Stories from "./Stories/Stories";
import Extra from "./Extra/Extra";
import Features from "./Features/Features";
import Categories from "./Categories/Categories";
// import Blogs from "./Blogs/Blogs";
import FAQ from "./FAQ/FAQ";
import { Element, scroller } from "react-scroll";
import { useLocation } from "react-router";

const Hero = () => {
    const { user } = use(AuthContext)
    const { hash } = useLocation();
    useEffect(() => {
        if (hash === "#faq") {
            scroller.scrollTo("faq", {
                duration: 800,
                delay: 0,
                smooth: "easeInOutQuart",
                offset: -100, // Adjust this for your Navbar height
            });
        }
    }, [hash]);
    return (
        <main className="w-full overflow-hidden">
            <Banner />
            {
                user &&
                <Overview></Overview>
            }

            <Features></Features>
            <Categories></Categories>
            <StaticSections />
            {/* <Blogs></Blogs> */}
            <Stories></Stories>
            <Element name="faq" id="faq">
                <FAQ />
            </Element>
            <Extra></Extra>
            <OurCollaboration></OurCollaboration>
        </main>
    );
};

export default Hero;
