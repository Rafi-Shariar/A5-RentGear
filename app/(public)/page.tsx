
import HeroCard from "./_components/HeroCard";
import HowItWorksSection from "./_components/HowItWorksSection";
import NewsletterSection from "./_components/NewsLetterSection";
import GearContainer from "./_components/gear/GearContainer";


export default function Home() {
  return (
    <div>
      <HeroCard />
      {/* TODO: Add coursale of categories with images */}

      <GearContainer />
      <HowItWorksSection/>
      <NewsletterSection/>


      {/* TODO: Add Steps Section */}
      {/* TODO: Add Reviews Section*/}
    </div>
  );
}
