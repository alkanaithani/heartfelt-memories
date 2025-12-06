import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Memory, MemoryContent } from '@/types/memory';
import { Image, Mic, Video, FileText, X, Plus, Check, Square } from 'lucide-react';
import { toast } from 'sonner';

interface CreateMemoryProps {
  onSave: (memory: Memory) => void;
  onCancel: () => void;
}

export const CreateMemory = ({ onSave, onCancel }: CreateMemoryProps) => {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState<MemoryContent[]>([]);
  const [textInput, setTextInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const generateId = () => Math.random().toString(36).substring(2, 15);

  const addTextContent = () => {
    if (!textInput.trim()) return;
    
    setContents(prev => [...prev, {
      id: generateId(),
      type: 'text',
      data: textInput.trim()
    }]);
    setTextInput('');
    toast.success('Text added to memory');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setContents(prev => [...prev, {
        id: generateId(),
        type,
        data: e.target?.result as string
      }]);
      toast.success(`${type === 'image' ? 'Photo' : 'Video'} added to memory`);
    };
    reader.readAsDataURL(file);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onload = (e) => {
          setContents(prev => [...prev, {
            id: generateId(),
            type: 'audio',
            data: e.target?.result as string
          }]);
          toast.success('Voice recording added to memory');
        };
        reader.readAsDataURL(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (error) {
      toast.error('Unable to access microphone');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setMediaRecorder(null);
      setIsRecording(false);
    }
  };

  const removeContent = (id: string) => {
    setContents(prev => prev.filter(c => c.id !== id));
  };

  const handleSave = () => {
    if (!title.trim()) {
      toast.error('Please add a title for your memory');
      return;
    }
    if (contents.length === 0) {
      toast.error('Please add at least one item to your memory');
      return;
    }

    const memory: Memory = {
      id: generateId(),
      title: title.trim(),
      createdAt: new Date().toISOString(),
      content: contents
    };

    onSave(memory);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen p-4 pb-24"
    >
      <div className="max-w-lg mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold text-foreground">
            Create Memory
          </h1>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <Input
          placeholder="Give your memory a title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-lg font-medium bg-card border-2 border-border/50 focus:border-primary/50"
        />

        {/* Content type buttons */}
        <div className="grid grid-cols-4 gap-3">
          <Button
            variant="soft"
            className="flex flex-col gap-1 h-auto py-4"
            onClick={() => fileInputRef.current?.click()}
          >
            <Image className="w-6 h-6" />
            <span className="text-xs">Photo</span>
          </Button>
          
          <Button
            variant="soft"
            className="flex flex-col gap-1 h-auto py-4"
            onClick={() => videoInputRef.current?.click()}
          >
            <Video className="w-6 h-6" />
            <span className="text-xs">Video</span>
          </Button>
          
          <Button
            variant={isRecording ? "destructive" : "soft"}
            className="flex flex-col gap-1 h-auto py-4"
            onClick={isRecording ? stopRecording : startRecording}
          >
            {isRecording ? <Square className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            <span className="text-xs">{isRecording ? 'Stop' : 'Voice'}</span>
          </Button>
          
          <Button
            variant="soft"
            className="flex flex-col gap-1 h-auto py-4"
            onClick={() => document.getElementById('text-area')?.focus()}
          >
            <FileText className="w-6 h-6" />
            <span className="text-xs">Text</span>
          </Button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileUpload(e, 'image')}
        />
        <input
          ref={videoInputRef}
          type="file"
          accept="video/*"
          className="hidden"
          onChange={(e) => handleFileUpload(e, 'video')}
        />

        {/* Text input */}
        <div className="space-y-2">
          <Textarea
            id="text-area"
            placeholder="Write something meaningful..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className="min-h-[100px] bg-card border-2 border-border/50 focus:border-primary/50"
          />
          {textInput && (
            <Button onClick={addTextContent} variant="soft" size="sm">
              <Plus className="w-4 h-4 mr-1" /> Add Text
            </Button>
          )}
        </div>

        {/* Content preview */}
        <AnimatePresence>
          {contents.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3"
            >
              <h3 className="font-display font-semibold text-foreground">
                Memory Contents ({contents.length})
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {contents.map((content) => (
                  <motion.div
                    key={content.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <Card className="relative overflow-hidden group">
                      {content.type === 'image' && (
                        <img src={content.data} alt="" className="w-full h-24 object-cover" />
                      )}
                      {content.type === 'video' && (
                        <video src={content.data} className="w-full h-24 object-cover" />
                      )}
                      {content.type === 'audio' && (
                        <div className="w-full h-24 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                          <Mic className="w-8 h-8 text-primary" />
                        </div>
                      )}
                      {content.type === 'text' && (
                        <div className="w-full h-24 p-3 bg-card overflow-hidden">
                          <p className="text-sm text-muted-foreground line-clamp-3">
                            {content.data}
                          </p>
                        </div>
                      )}
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeContent(content.id)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Save button */}
        <Button
          onClick={handleSave}
          variant="warm"
          size="lg"
          className="w-full"
          disabled={!title.trim() || contents.length === 0}
        >
          <Check className="w-5 h-5 mr-2" />
          Save Memory
        </Button>
      </div>
    </motion.div>
  );
};
