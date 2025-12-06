import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { SetupScreen } from '@/components/SetupScreen';
import { HomeScreen } from '@/components/HomeScreen';
import { CreateMemory } from '@/components/CreateMemory';
import { ViewMemory } from '@/components/ViewMemory';
import { Memory, UserProfile } from '@/types/memory';
import { toast } from 'sonner';

type Screen = 'home' | 'create' | 'view';

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [profile, setProfile] = useLocalStorage<UserProfile | null>('cookiejar-profile', null);
  const [memories, setMemories] = useLocalStorage<Memory[]>('cookiejar-memories', []);
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  // Handle action from intense-event redirect
  useEffect(() => {
    const action = searchParams.get('action');
    if (action === 'create' && profile) {
      setCurrentScreen('create');
      setSearchParams({});
    } else if (action === 'access' && profile) {
      setCurrentScreen('home');
      setSearchParams({});
      if (memories.length === 0) {
        toast.info('No memories yet. Create your first one!');
      }
    }
  }, [searchParams, profile]);

  const handleSetupComplete = (newProfile: UserProfile) => {
    setProfile(newProfile);
    toast.success(`Welcome, ${newProfile.name}!`);
  };

  const handleSaveMemory = (memory: Memory) => {
    setMemories(prev => [memory, ...prev]);
    setCurrentScreen('home');
    toast.success('Memory saved to your jar!');
  };

  const handleViewMemory = (memory: Memory) => {
    setSelectedMemory(memory);
    setCurrentScreen('view');
  };

  const handleDeleteMemory = (id: string) => {
    setMemories(prev => prev.filter(m => m.id !== id));
    setCurrentScreen('home');
    setSelectedMemory(null);
    toast.success('Memory removed');
  };

  if (!profile) {
    return <SetupScreen onComplete={handleSetupComplete} />;
  }

  return (
    <AnimatePresence mode="wait">
      {currentScreen === 'home' && (
        <HomeScreen
          key="home"
          profile={profile}
          memories={memories}
          onCreateMemory={() => setCurrentScreen('create')}
          onViewMemory={handleViewMemory}
        />
      )}

      {currentScreen === 'create' && (
        <CreateMemory
          key="create"
          onSave={handleSaveMemory}
          onCancel={() => setCurrentScreen('home')}
        />
      )}

      {currentScreen === 'view' && selectedMemory && (
        <ViewMemory
          key="view"
          memory={selectedMemory}
          onBack={() => {
            setCurrentScreen('home');
            setSelectedMemory(null);
          }}
          onDelete={handleDeleteMemory}
        />
      )}
    </AnimatePresence>
  );
};

export default Index;
