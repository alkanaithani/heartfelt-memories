import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CookieJar } from '@/components/CookieJar';
import { UserProfile } from '@/types/memory';
import { Heart } from 'lucide-react';

interface SetupScreenProps {
  onComplete: (profile: UserProfile) => void;
}

export const SetupScreen = ({ onComplete }: SetupScreenProps) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onComplete({
        name: name.trim(),
        setupComplete: true
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-center p-6"
    >
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", delay: 0.2 }}
        className="mb-8"
      >
        <CookieJar size="lg" isAnimating />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-center space-y-4 max-w-sm"
      >
        <h1 className="text-3xl font-display font-bold text-foreground">
          Welcome to <span className="text-primary">Cookie Jar</span>
        </h1>
        <p className="text-muted-foreground">
          A safe place to store your precious memories for when you need them most
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        onSubmit={handleSubmit}
        className="mt-8 w-full max-w-sm space-y-4"
      >
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            What should we call you?
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="text-center text-lg bg-card border-2 border-border/50 focus:border-primary/50"
            autoFocus
          />
        </div>

        <Button
          type="submit"
          variant="warm"
          size="lg"
          className="w-full"
          disabled={!name.trim()}
        >
          <Heart className="w-5 h-5 mr-2" />
          Get Started
        </Button>
      </motion.form>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-xs text-muted-foreground text-center"
      >
        Your data is stored locally on your device
      </motion.p>
    </motion.div>
  );
};
