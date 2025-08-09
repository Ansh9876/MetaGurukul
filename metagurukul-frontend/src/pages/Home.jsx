import React from "react";
import Hero from "../components/Hero";
import TrendingCourses from "../components/TrendingCourses";
import WhyChoose from "../components/WhychooseUs";
import Layout from "../layouts/layout";

const Home = () => {
    return (
        <div>
            <Layout>
            <Hero />
            <TrendingCourses />
            <WhyChoose />
            </Layout>
        </div>
    )
};

export default Home;