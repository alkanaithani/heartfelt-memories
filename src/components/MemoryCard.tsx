import { motion } from 'framer-motion';
import { Memory } from '@/types/memory';
import { Card } from '@/components/ui/card';
import { Heart, Image, Mic, Video, FileText } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface MemoryCardProps {
  memory: Memory;
  onClick: () => void;
  index: number;
}

export const MemoryCard = ({ memory, onClick, index }: MemoryCardProps) => {
  const getContentIcons = () => {
    const types = [...new Set(memory.content.map(c => c.type))];
    return types.map(type => {
      switch (type) {
        case 'image': return <Image key={type} className="w-4 h-4" />;
        case 'audio': return <Mic key={type} className="w-4 h-4" />;
        case 'video': return <Video key={type} className="w-4 h-4" />;
        case 'text': return <FileText key={type} className="w-4 h-4" />;
        default: return null;
      }
    });
  };

  const getPreviewImage = () => {
    const imageContent = memory.content.find(c => c.type === 'image');
    return imageContent?.data;
  };

  const previewImage = getPreviewImage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Card
        onClick={onClick}
        className="glass-card overflow-hidden cursor-pointer group hover:scale-[1.02] transition-all duration-300 border-0"
      >
        {previewImage ? (
          <div className="h-32 overflow-hidden">
            <img
              src={previewImage}
              alt={memory.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className="h-32 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <Heart className="w-12 h-12 text-primary/40" />
          </div>
        )}
        
        <div className="p-4">
          <h3 className="font-display font-bold text-foreground truncate mb-1">
            {memory.title}
          </h3>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(memory.createdAt), { addSuffix: true })}
            </span>
            
            <div className="flex items-center gap-1.5 text-muted-foreground">
              {getContentIcons()}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
