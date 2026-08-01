
import HeroCard from "./_components/HeroCard";
import HowItWorksSection from "./_components/HowItWorksSection";
import NewsletterSection from "./_components/NewsLetterSection";
import GearContainer from "./_components/gear/GearContainer";


export default function Home() {
  return (
    <div>
      <HeroCard />

      <GearContainer />
      <HowItWorksSection/>
      <NewsletterSection/>

    </div>
  );
}
