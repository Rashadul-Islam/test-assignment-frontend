import heroImage from "../../assets/hero.svg";

const HeroSection = () => {
  return (
    <div className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="flex flex-col items-center">
          <h1 className="lg:text-5xl md:text-4xl text-2xl font-bold mb-4 md:mb-8 text-center">
            Welcome to My Coding Challenge
          </h1>
          <p className="text-lg md:text-xl text-center mb-6 md:mb-12">
            This is The Demo Homepage
          </p>
          <img className="h-[500px] mb-10" src={heroImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
