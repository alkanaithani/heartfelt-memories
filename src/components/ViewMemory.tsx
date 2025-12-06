import { motion } from 'framer-motion';
import { Memory } from '@/types/memory';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Heart, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ViewMemoryProps {
  memory: Memory;
  onBack: () => void;
  onDelete: (id: string) => void;
}

export const ViewMemory = ({ memory, onBack, onDelete }: ViewMemoryProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen p-4 pb-24"
    >
      <div className="max-w-lg mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-destructive hover:text-destructive"
            onClick={() => onDelete(memory.id)}
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        </div>

        <div className="text-center space-y-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
          >
            <Heart className="w-12 h-12 text-primary mx-auto fill-primary/20" />
          </motion.div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            {memory.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            Created {formatDistanceToNow(new Date(memory.createdAt), { addSuffix: true })}
          </p>
        </div>

        <div className="space-y-4">
          {memory.content.map((content, index) => (
            <motion.div
              key={content.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="glass-card overflow-hidden p-0 border-0">
                {content.type === 'image' && (
                  <img
                    src={content.data}
                    alt=""
                    className="w-full rounded-lg"
                  />
                )}
                
                {content.type === 'video' && (
                  <video
                    src={content.data}
                    controls
                    className="w-full rounded-lg"
                  />
                )}
                
                {content.type === 'audio' && (
                  <div className="p-6 bg-gradient-to-br from-primary/10 to-accent/10">
                    <audio
                      src={content.data}
                      controls
                      className="w-full"
                    />
                  </div>
                )}
                
                {content.type === 'text' && (
                  <div className="p-6">
                    <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                      {content.data}
                    </p>
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center pt-4">
          <p className="text-sm text-muted-foreground italic">
            "This memory is part of who you are"
          </p>
        </div>
      </div>
    </motion.div>
  );
};
