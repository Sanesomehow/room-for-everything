import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "@/store";

export function Homepage() {
  const { isAuthenticated } = useAuthStore();
  let buttonLink: '/login' | '/room' | '/signup' = '/login';
  const features = [
    {
      title: "Curate Everything",
      description: "Save links, texts, images, and social media posts in one beautiful space",
      icon: "🎯"
    },
    {
      title: "Visual Organization", 
      description: "Masonry layout that adapts to your content, making everything look stunning",
      icon: "🎨"
    },
    {
      title: "Smart Filtering",
      description: "Find exactly what you need with intelligent content categorization",
      icon: "🔍"
    },
    {
      title: "Social Integration",
      description: "Import from Instagram, Twitter, YouTube, LinkedIn and more platforms",
      icon: "🌐"
    }
  ];

  useEffect(() => {
    if(isAuthenticated) {
      buttonLink = '/room'
    }
  }, [isAuthenticated, buttonLink]);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse delay-750"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-secondary rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 font-bitter">
            Your Digital
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
              Universe
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed font-raleway">
            Collect, organize, and showcase everything that matters to you in one beautiful, 
            cosmic space that adapts to your content.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">            
            <Link to={buttonLink}>
              <button className="px-8 py-4 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-105 font-raleway">
                Create Your Space
              </button>
            </Link>
          </div>

          {/* <div className="relative">
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 max-w-md mx-auto transform hover:scale-105 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10">
              <div className="text-4xl mb-4">{features[currentFeature].icon}</div>
              <h3 className="text-xl font-bold text-foreground mb-3 font-bitter">
                {features[currentFeature].title}
              </h3>
              <p className="text-muted-foreground font-raleway">
                {features[currentFeature].description}
              </p> */}
              
              {/* <div className="flex justify-center mt-6 space-x-2"> */}
                {/* {features.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentFeature ? 'bg-primary scale-125' : 'bg-muted'
                    }`}
                  />
                ))} */}
              {/* </div>
            </div>
          </div> */}
        </div> 

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-bitter">
              Everything You Need
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-raleway">
              Powerful features designed to make content curation effortless and beautiful
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:bg-card/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-primary/10"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 font-bitter">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground font-raleway">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-r from-card/20 to-secondary/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-bitter">
            Try Before You Commit
          </h2>
          <p className="text-xl text-muted-foreground mb-12 font-raleway">
            Experience the magic with our demo account - no registration required
          </p>
          
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 font-bitter">
                  ✨ Demo Account Includes:
                </h3>
                <ul className="space-y-2 text-muted-foreground font-raleway">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> Save up to 10 items
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> Create 1 custom space
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> All filtering features
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> Social media imports
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 font-bitter">
                  🚀 Full Account Benefits:
                </h3>
                <ul className="space-y-2 text-muted-foreground font-raleway">
                  <li className="flex items-center gap-2">
                    <span className="text-accent">✓</span> Unlimited items
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-accent">✓</span> Unlimited spaces
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-accent">✓</span> Collaboration features
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-accent">✓</span> Advanced customization
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-bitter">
            Ready to Build Your
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Digital Universe?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 font-raleway">
            Join thousands of creators who've found their perfect space for everything that matters
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to={buttonLink}>
              <button className="group relative px-10 py-5 bg-gradient-to-r from-accent via-accent to-accent text-primary-foreground font-bold rounded-full shadow-xl hover:shadow-2xl hover:shadow-primary/30 transform hover:scale-110 transition-all duration-500 text-lg font-raleway">
                <span className="relative z-10">Create Your Universe</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}