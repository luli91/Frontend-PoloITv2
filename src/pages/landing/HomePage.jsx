import Banner from "../home/Banner.jsx";
import Categories from "../home/Categories.jsx";
import Testimonial from "../home/Testimonials.jsx";
import AboutUs from "../home/AboutUs.jsx"
import FAQ from "../home/FAQ.jsx"
import CallToAction from "../home/CallToAction.jsx";
import DonationMap from "../home/DonationMap.jsx";

const HomePage = () => {
    return (
        <div className="max-w-7xl mx-auto px-4">
            <Banner />
            <AboutUs />
            <Categories />
            <Testimonial />
            <FAQ />
            <CallToAction />
            <DonationMap />
        </div>
    );
};

export default HomePage;