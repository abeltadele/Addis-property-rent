import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Building2, MapPin, Users } from 'lucide-react';
import { motion } from 'motion/react';

interface SplashScreenProps {
  onStartExploring: () => void;
}

export function SplashScreen({ onStartExploring }: SplashScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-accent flex flex-col items-center justify-center px-6 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1741991110666-88115e724741?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZGRpcyUyMGFiYWJhJTIwZXRoaW9waWElMjBza3lsaW5lJTIwY2l0eXNjYXBlfGVufDF8fHx8MTc1Njk5MTI1M3ww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Addis Ababa Skyline"
          className="w-full h-full object-cover"
        />
      </div>

      <motion.div 
        className="text-center z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Logo */}
        <motion.div 
          className="mb-8"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-4 mx-auto backdrop-blur-sm">
            <Building2 className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Addis Property Rent</h1>
          <p className="text-lg text-white/90">Find Your Home with Confidence</p>
        </motion.div>

        {/* Features */}
        <motion.div 
          className="grid grid-cols-1 gap-4 mb-12 max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <MapPin className="h-5 w-5 text-white/80" />
            <span className="text-sm">Properties across Addis Ababa</span>
          </div>
          <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <Building2 className="h-5 w-5 text-white/80" />
            <span className="text-sm">Verified listings & agents</span>
          </div>
          <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <Users className="h-5 w-5 text-white/80" />
            <span className="text-sm">Trusted by thousands</span>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button 
            onClick={onStartExploring}
            size="lg"
            className="bg-white text-primary hover:bg-white/90 font-medium px-8 py-3 rounded-xl shadow-lg"
          >
            Start Exploring
          </Button>
        </motion.div>

        <motion.p 
          className="text-xs text-white/70 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Discover your perfect home in Ethiopia's capital
        </motion.p>
      </motion.div>
    </div>
  );
}