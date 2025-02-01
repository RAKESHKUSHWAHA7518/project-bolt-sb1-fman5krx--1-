// DataDisplay.tsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { db } from '../firebase';

interface Document {
  id: string;
  title: string;
  date: string;
  imageUrl?: string;
  description: string;
  section: string;
  tags: string[];
  createdAt: Date;
}
interface DocModalProps {
    // showDocModal: boolean;
    setShowDocModal: boolean ;
  }

export default function DataDisplay({setShowDocModal}:DocModalProps) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSection, setSelectedSection] = useState('all');

  const sections = [
    { value: 'all', label: 'All Sections' },
    { value: 'lebensdokumente', label: 'Lebensdokumente' },
    { value: 'korrespondenzen', label: 'Korrespondenzen' },
    { value: 'berufliche-dokumente', label: 'Berufliche Dokumente' },
    { value: 'werke', label: 'Werke' },
    { value: 'sammlungen', label: 'Sammlungen' }
  ];

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      let q;
      if (selectedSection === 'all') {
        q = query(
          collection(db, 'submissions'),
          orderBy('createdAt', 'desc')
        );
      } else {
        q = query(
          collection(db, 'historical-documents'),
          where('section', '==', selectedSection),
          orderBy('createdAt', 'desc')
        );
      }

      const querySnapshot = await getDocs(q);
      const fetchedDocs: Document[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedDocs.push({
          id: doc.id,
          title: data.title,
          date: data.date,
          imageUrl: data.imageUrl,
          description: data.description,
          section: data.section,
          tags: data.tags || [],
          createdAt: data.createdAt.toDate()
        });
      });

      setDocuments(fetchedDocs);
    } catch (err: any) {
      setError('Error fetching documents: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [selectedSection]); // Refetch when section filter changes

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  const handleX= ()=>{
    setShowDocModal(false);
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
        <button onClick={ handleX}>X</button>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Section
        </label>
        <select
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          {sections.map(section => (
            <option key={section.value} value={section.value}>
              {section.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((doc) => (
          <div 
            key={doc.id} 
            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            {doc.imageUrl && (
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={doc.imageUrl}
                  alt={doc.title}
                  className="object-cover w-full h-48"
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {doc.title}
              </h3>
              <div className="text-sm text-gray-500 mb-2">
                {doc.date}
              </div>
              <p className="text-gray-700 mb-3 line-clamp-3">
                {doc.description}
              </p>
              <div className="text-sm text-gray-600 mb-2">
                Section: {sections.find(s => s.value === doc.section)?.label || doc.section}
              </div>
              {doc.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {doc.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="text-xs text-gray-500 mt-2">
                Added: {doc.createdAt.toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {documents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No documents found {selectedSection !== 'all' && 'in this section'}.
          </p>
        </div>
      )}
    </div>
  );
}