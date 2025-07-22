import React from "react";
import HomeBanner from "../../../components/app/home/HomeBanner";
import StatisticPartners from "../../../components/app/home/StatisticPartners";
import EduZoneBenefits from "../../../components/app/home/EduZoneBenefits";
import AboutUs from "../../../components/app/about/AboutUs";
import CourseRecommendations from "../../../components/app/courses/CourseRecommendations";
import CoursesFeedBack from "../../../components/app/courses/CoursesFeedBack";
import AskedQuestions from "../frequently-asked-questions/AskedQuestions";
import ReadHomeBlogs from "../../../components/app/blogs/ReadHomeBlogs";
import ContactUs from "../../../components/app/contact/ContactUs";
import { AppFooter } from "../../../components/app/footer/Footer";
import TermsAndConditions from "../terms-and-conditions/TermsAndConditions";
import PrivacyPolicy from "../privacy-policy/PrivacyPolicy";
import TrustedBySection from "../../../components/app/about/TrusterBy";

const Home = () => {
  return (
    <>
      {/* Home Banner */}
      <HomeBanner />

      {/* Statisctics Partners */}
      <StatisticPartners />

      {/* Benefits of Joining EDUZONE E-Learning */}
      <EduZoneBenefits />

      {/* About Us */}
      <AboutUs />

      {/* Recommended Courses For You */}
      <CourseRecommendations />

      {/* What they say about our courses */}
      <CoursesFeedBack />

      {/* Frequently asked questions */}
      <AskedQuestions />

      {/* Trusted By */}
      <TrustedBySection />

      {/* Blogs */}
      <ReadHomeBlogs />

      {/* Contact Us */}
      <ContactUs />

      {/* Terms and Conditions */}
      <TermsAndConditions />

      {/* Privacy Policy */}
      <PrivacyPolicy />

      {/* Footer */}
      <AppFooter />
    </>
  );
};

export default Home;
