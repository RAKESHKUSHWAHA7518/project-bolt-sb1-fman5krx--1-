import React, { useState } from 'react';
import { X, Download, ChevronLeft, ChevronRight } from 'lucide-react';

interface Document {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
  description: string;
  section: string;
  tags: string[];
}

const documents: Document[] = [
  {
    id: '1',
    title: 'Edmund Schiefeling, kurze Schilderung der Geschichte von Druckerei',
    date: '1913',
    imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=400&h=300',
    description: 'A brief history of the printing press written by Edmund Schiefeling.',
    section: 'lebensdokumente',
    tags: ['EDMUND SCHIEFELING', 'DRUCKEREI', 'BERGISCHE WACHT']
  },
  {
    id: '2',
    title: 'Geburtsurkunde von Edmund (1882)',
    date: '1882',
    imageUrl: 'https://images.unsplash.com/photo-1590103514966-5e2a11c13e21?auto=format&fit=crop&q=80&w=400&h=300',
    description: 'Birth certificate of Edmund Schiefeling from 1882.',
    section: 'lebensdokumente',
    tags: ['EDMUND SCHIEFELING', 'WILHELM RIPHAHN']
  },
  {
    id: '3',
    title: 'Edmund Schiefeling an den Rheinisch-Westfälischen Zeitungsverleger',
    date: '1914',
    imageUrl: 'https://images.unsplash.com/photo-1568490754441-4c0430948c76?auto=format&fit=crop&q=80&w=400&h=300',
    description: 'Correspondence between Edmund Schiefeling and the Rheinisch-Westfälischen newspaper publisher.',
    section: 'korrespondenzen',
    tags: ['EDMUND SCHIEFELING', 'PRESSEFREIHEIT', 'NACHKRIEFSZEIT']
  }
];

interface DocumentViewerProps {
  sectionId: string;
  selectedTags: string[];
}

export default function DocumentViewer({ sectionId, selectedTags }: DocumentViewerProps) {
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [yearRange, setYearRange] = useState({ start: 1840, end: 2025 });

  const filteredDocs = documents.filter(doc => 
    doc.section === sectionId &&
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    parseInt(doc.date) >= yearRange.start &&
    parseInt(doc.date) <= yearRange.end &&
    (selectedTags.length === 0 || selectedTags.some(tag => doc.tags.includes(tag)))
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      {/* Search and Filter Bar */}
      <div className="mb-8 flex gap-4 items-center">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by title..."
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <span>{yearRange.start}</span>
          <input
            type="range"
            min="1840"
            max="2025"
            value={yearRange.start}
            onChange={(e) => setYearRange(prev => ({ ...prev, start: parseInt(e.target.value) }))}
            className="w-32"
          />
          <input
            type="range"
            min="1840"
            max="2025"
            value={yearRange.end}
            onChange={(e) => setYearRange(prev => ({ ...prev, end: parseInt(e.target.value) }))}
            className="w-32"
          />
          <span>{yearRange.end}</span>
        </div>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredDocs.map(doc => (
          <div
            key={doc.id}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition hover:scale-105"
            onClick={() => setSelectedDoc(doc)}
          >
            <img
              src={doc.imageUrl}
              alt={doc.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-1">{doc.title}</h3>
              <p className="text-sm text-gray-500">{doc.date}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {doc.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`text-xs px-2 py-1 rounded-full ${
                      selectedTags.includes(tag) 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Document Detail Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full mx-4 relative">
            <button
              onClick={() => setSelectedDoc(null)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <ChevronLeft size={24} />
                </button>
                <img
                  src={selectedDoc.imageUrl}
                  alt={selectedDoc.title}
                  className="max-h-[60vh] object-contain"
                />
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <ChevronRight size={24} />
                </button>
              </div>
              <div className="mt-4">
                <h2 className="text-xl font-bold mb-2">{selectedDoc.title}</h2>
                <p className="text-gray-600 mb-4">{selectedDoc.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedDoc.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`text-sm px-3 py-1 rounded-full ${
                        selectedTags.includes(tag)
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t pt-4">
                  <span className="text-sm text-gray-500">Date: {selectedDoc.date}</span>
                  <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                    <Download size={20} />
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}