import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CookieJar } from '@/components/CookieJar';
import { MemoryCard } from '@/components/MemoryCard';
import { Memory, UserProfile } from '@/types/memory';
import { Plus, Heart } from 'lucide-react';

interface HomeScreenProps {
  profile: UserProfile;
  memories: Memory[];
  onCreateMemory: () => void;
  onViewMemory: (memory: Memory) => void;
}

export const HomeScreen = ({ profile, memories, onCreateMemory, onViewMemory }: HomeScreenProps) => {
  const [showJar, setShowJar] = useState(true);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-4 pb-24"
    >
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-6"
        >
          <p className="text-muted-foreground font-medium">
            {greeting()},
          </p>
          <h1 className="text-2xl font-display font-bold text-foreground">
            {profile.name}
          </h1>
        </motion.div>

        {/* Cookie Jar */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <CookieJar size="md" isAnimating={memories.length > 0} />
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <Heart className="w-4 h-4 text-primary fill-primary" />
          <span className="text-sm text-muted-foreground">
            {memories.length} {memories.length === 1 ? 'memory' : 'memories'} saved
          </span>
        </motion.div>

        {/* Create button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Button
            onClick={onCreateMemory}
            variant="warm"
            size="lg"
            className="w-full"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Memory
          </Button>
        </motion.div>

        {/* Memories grid */}
        {memories.length > 0 ? (
          <div className="space-y-4">
            <h2 className="font-display font-bold text-foreground">
              Your Memories
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {memories.map((memory, index) => (
                <MemoryCard
                  key={memory.id}
                  memory={memory}
                  index={index}
                  onClick={() => onViewMemory(memory)}
                />
              ))}
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center py-8"
          >
            <p className="text-muted-foreground">
              Your jar is empty. Start by creating your first memory!
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
