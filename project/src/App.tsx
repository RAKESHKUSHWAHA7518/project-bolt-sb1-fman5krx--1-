import React, { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { auth } from './firebase';
import Auth from './components/Auth';
import DocumentViewer from './components/DocumentViewer';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

export type Tag = { text: string; color: string; };

export type Section = {
  id: string;
  title: string;
  tags: Tag[];
};

// All available tags across all sections
const allTags: Tag[] = [
  { text: 'BERGISCHE WACHT', color: 'text-blue-400' },
  { text: 'ENTNAZIFIZIERUNG', color: 'text-pink-500' },
  { text: 'NACHKRIEFSZEIT', color: 'text-red-500' },
  { text: 'ROBERT LEY', color: 'text-yellow-500' },
  { text: 'WILHELM RIPHAHN', color: 'text-blue-500' },
  { text: 'EDMUND SCHIEFELING', color: 'text-purple-600' },
  { text: 'HEIMATPFLEGE', color: 'text-green-600' },
  { text: 'WIEDERAUFBAU', color: 'text-yellow-400' },
  { text: 'DRUCKEREI', color: 'text-orange-400' },
  { text: 'BURGERMEISTER', color: 'text-purple-500' },
  { text: 'PRESSEFREIHEIT', color: 'text-blue-500' },
  { text: 'SAALSCHLACHT', color: 'text-red-600' },
  { text: 'VERHAFTUNG', color: 'text-red-500' },
  { text: 'KONZENTRATIONSLAGER', color: 'text-gray-600' },
  { text: 'ERSTER WELTKRIEG', color: 'text-blue-600' },
  { text: 'FLUCHT', color: 'text-yellow-600' },
  { text: 'NATIONALSOZIALISMUS', color: 'text-red-700' },
  { text: 'OBERBERGISCHER BOTE', color: 'text-blue-500' },
  { text: 'WEIMARER REPUBLIK', color: 'text-yellow-500' },
  { text: 'ZENSUR', color: 'text-gray-500' },
  { text: 'ZWEITER WELTKRIEG', color: 'text-red-600' },
  { text: 'ENGELSKIRCHEN', color: 'text-yellow-400' }
];

const sections: Section[] = [
  {
    id: 'lebensdokumente',
    title: '1. Lebensdokumente',
    tags: allTags
  },
  {
    id: 'korrespondenzen',
    title: '2. Korrespondenzen',
    tags: allTags
  },
  {
    id: 'korrespondenzen-privat',
    title: '2.1. Korrespondenzen privat',
    tags: allTags
  },
  {
    id: 'korrespondenzen-beruflich',
    title: '2.2. Korrespondenzen beruflich',
    tags: allTags
  },
  {
    id: 'berufliche-dokumente',
    title: '3. Berufliche Dokumente',
    tags: allTags
  },
  {
    id: 'werke',
    title: '4. Werke',
    tags: allTags
  },
  {
    id: 'sammlungen',
    title: '5. Sammlungen',
    tags: allTags
  }
];

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeSection, setActiveSection] = useState<Section>(sections[0]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const handleSectionChange = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (section) {
      setActiveSection(section);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar 
        activeSection={activeSection.id} 
        onSectionChange={handleSectionChange}
      />
      <div className="flex-1 ml-64">
        <Navbar 
          section={activeSection} 
          selectedTags={selectedTags}
          onTagClick={(tag) => {
            setSelectedTags(prev => 
              prev.includes(tag) 
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
            );
          }}
        />
        <div className="mt-32 px-8">
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">{activeSection.title}</h2>
            <DocumentViewer 
              sectionId={activeSection.id} 
              selectedTags={selectedTags}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;