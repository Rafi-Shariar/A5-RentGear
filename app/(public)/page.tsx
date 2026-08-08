
import CategoryCarousel from "./_components/CategorySection";
import HeroCard from "./_components/HeroCard";
import HowItWorksSection from "./_components/HowItWorksSection";
import Impact from "./_components/Impact";
import NewsletterSection from "./_components/NewsLetterSection";
import WhyChooseUs from "./_components/WhyChooseUs";
import GearContainer from "./_components/gear/GearContainer";


export default function Home() {
  return (
    <div>
      <HeroCard />

     
      <GearContainer />
       <CategoryCarousel/>
      
      <HowItWorksSection/>
      <WhyChooseUs/>
      <Impact/>
      <NewsletterSection/>

    </div>
  );
}
