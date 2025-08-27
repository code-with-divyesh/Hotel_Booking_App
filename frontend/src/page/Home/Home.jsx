import React from "react";
import Hero from "../../Components/Hero/Hero";
import FeaturedDestination from "../../Components/FeaturedDestination/FeaturedDestination";
import ExclusiveOffers from "../../Components/ExclusiveOffers/ExclusiveOffers";
import Testimonials from "../../Components/Testimonials/Testimonials";
import NewsLetter from "../../Components/NewsLetter/NewsLetter";
import Footer from "../../Components/Footer/Footer";

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedDestination />
      <ExclusiveOffers />
      <Testimonials />
      <NewsLetter />
    </>
  );
};

export default Home;
