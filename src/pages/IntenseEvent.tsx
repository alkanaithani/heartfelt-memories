import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CookieJar } from '@/components/CookieJar';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { UserProfile } from '@/types/memory';
import { Heart, Plus, BookOpen, X } from 'lucide-react';

const IntenseEvent = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [profile] = useLocalStorage<UserProfile | null>('cookiejar-profile', null);
  const [showOptions, setShowOptions] = useState(false);
  
  const heartRate = searchParams.get('heartRate');
  const userName = profile?.name || 'Friend';

  useEffect(() => {
    // Show options after the initial message
    const timer = setTimeout(() => {
      setShowOptions(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleCreateMemory = () => {
    navigate('/?action=create');
  };

  const handleAccessMemory = () => {
    navigate('/?action=access');
  };

  const handleIgnore = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-background via-background to-primary/5">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="mb-8"
      >
        <CookieJar size="md" isAnimating />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-sm text-center space-y-4"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Heart className="w-6 h-6 text-accent fill-accent" />
          </motion.div>
          {heartRate && (
            <span className="text-sm text-muted-foreground">
              {heartRate} BPM
            </span>
          )}
        </div>

        <h1 className="text-2xl font-display font-bold text-foreground">
          Hi {userName},
        </h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-muted-foreground leading-relaxed"
        >
          I've noticed your heart rate changed. Take a deep breath. You have a jar full of beautiful memories waiting for you.
        </motion.p>
      </motion.div>

      <AnimatePresence>
        {showOptions && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-10 w-full max-w-sm space-y-3"
          >
            <Card className="glass-card p-1 border-0">
              <Button
                onClick={handleCreateMemory}
                variant="ghost"
                className="w-full justify-start h-auto py-4 px-4 hover:bg-primary/10"
              >
                <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center mr-4">
                  <Plus className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">Create a new memory</p>
                  <p className="text-sm text-muted-foreground">Capture this moment</p>
                </div>
              </Button>
            </Card>

            <Card className="glass-card p-1 border-0">
              <Button
                onClick={handleAccessMemory}
                variant="ghost"
                className="w-full justify-start h-auto py-4 px-4 hover:bg-accent/10"
              >
                <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center mr-4">
                  <BookOpen className="w-5 h-5 text-accent" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">Access a prior memory</p>
                  <p className="text-sm text-muted-foreground">Find comfort in the past</p>
                </div>
              </Button>
            </Card>

            <Card className="glass-card p-1 border-0">
              <Button
                onClick={handleIgnore}
                variant="ghost"
                className="w-full justify-start h-auto py-4 px-4 hover:bg-muted"
              >
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-4">
                  <X className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">I'm okay</p>
                  <p className="text-sm text-muted-foreground">Dismiss this notification</p>
                </div>
              </Button>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-12 text-xs text-muted-foreground text-center max-w-xs"
      >
        Remember: feelings are temporary. Your memories remind you of the beautiful moments in life.
      </motion.p>
    </div>
  );
};

export default IntenseEvent;
