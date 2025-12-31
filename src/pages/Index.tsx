import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-rose flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-rose-soft/30 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-blush/40 rounded-full blur-2xl animate-pulse-soft" />
      
      {/* Main content */}
      <div className="text-center z-10 animate-fade-in">
        {/* Logo/Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center shadow-glow animate-float">
            <Heart className="w-10 h-10 text-primary fill-primary/30" />
          </div>
        </div>
        
        {/* Title */}
        <h1 className="font-display text-5xl md:text-7xl font-semibold text-foreground mb-4 tracking-wide">
          Angel Mind
        </h1>
        
        {/* Subtitle */}
        <p className="font-body text-lg md:text-xl text-muted-foreground mb-12 tracking-wide">
          I'm here for you, Renuu
        </p>
        
        {/* CTA Button */}
        <button
          onClick={() => navigate("/chat")}
          className="group relative px-10 py-4 bg-primary text-primary-foreground font-body font-medium text-lg rounded-full shadow-soft hover:shadow-glow transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <span className="relative z-10">Start Chat</span>
          <div className="absolute inset-0 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </div>
      
      {/* Bottom decoration */}
      <div className="absolute bottom-8 text-muted-foreground/50 font-body text-sm tracking-widest">
        ✨ Made with love ✨
      </div>
    </div>
  );
};

export default Index;
