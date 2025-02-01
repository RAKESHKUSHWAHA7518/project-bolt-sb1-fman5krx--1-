import React, { useState } from 'react';
import { ChevronDown, ChevronRight, FolderOpen, BookOpen, Briefcase, Library, Upload, X, LogIn, LogOut } from 'lucide-react';
import FileUpload from './FileUpload';
import Auth from './Auth';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import DataDisplay from './DataDisplay';

interface MenuItem {
  id: string;
  title: string;
  icon: JSX.Element;
  subItems?: { id: string; title: string }[];
}

interface SidebarProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(['korrespondenzen']);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showDocModal,setShowDocModal] = useState<boolean>(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const menuItems: MenuItem[] = [
    { 
      id: 'lebensdokumente', 
      title: '1. Lebensdokumente', 
      icon: <FolderOpen size={18} /> 
    },
    { 
      id: 'korrespondenzen', 
      title: '2. Korrespondenzen', 
      icon: <BookOpen size={18} />,
      subItems: [
        { id: 'korrespondenzen-privat', title: '2.1. Korrespondenzen privat' },
        { id: 'korrespondenzen-beruflich', title: '2.2. Korrespondenzen beruflich und als Person des öffentlichen Lebens' }
      ]
    },
    { 
      id: 'berufliche-dokumente', 
      title: '3. Berufliche Dokumente', 
      icon: <Briefcase size={18} />,
      subItems: [
        { id: 'dokumente-druckerei', title: 'Druckerei' },
        { id: 'dokumente-zeitung', title: 'Zeitung' }
      ]
    },
    { 
      id: 'werke', 
      title: '4. Werke', 
      icon: <Library size={18} />,
      subItems: [
        { id: 'werke-publiziert', title: 'Publizierte Werke' },
        { id: 'werke-unpubliziert', title: 'Unpublizierte Werke' }
      ]
    },
    { 
      id: 'sammlungen', 
      title: '5. Sammlungen', 
      icon: <FolderOpen size={18} /> 
    }
  ];

  const toggleExpand = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <>
      <div className="w-64 bg-[#1a1f2c] text-white h-screen fixed left-0 top-0 overflow-y-auto flex flex-col">
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-xl font-bold">Edmund Schiefeling</h1>
          </div>
          
          {/* Auth Section */}
          <div className="mb-6">
            {auth.currentUser ? (
              <div className="space-y-2">
                <p className="text-sm text-gray-400">
                  Signed in as:
                  <br />
                  <span className="text-white">{auth.currentUser.email}</span>
                </p>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                <LogIn size={18} />
                <span>Sign In</span>
              </button>
            )}
          </div>

          <nav className="flex-1">
            {menuItems.map((item) => (
              <div key={item.id} className="mb-1">
                <div
                  className={`flex items-center justify-between py-2 px-3 rounded cursor-pointer ${
                    activeSection === item.id ? 'bg-gray-700' : 'hover:bg-gray-700'
                  }`}
                  onClick={() => {
                    onSectionChange(item.id);
                    if (item.subItems) {
                      toggleExpand(item.id);
                    }
                  }}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span className="text-sm">{item.title}</span>
                  </div>
                  {item.subItems && (
                    expandedItems.includes(item.id) 
                      ? <ChevronDown size={16} />
                      : <ChevronRight size={16} />
                  )}
                </div>
                
                {/* Sub-items */}
                {item.subItems && expandedItems.includes(item.id) && (
                  <div className="ml-8 mt-1">
                    {item.subItems.map((subItem) => (
                      <div
                        key={subItem.id}
                        className={`flex items-center py-2 px-3 text-sm rounded cursor-pointer ${
                          activeSection === subItem.id ? 'bg-gray-700' : 'hover:bg-gray-700'
                        }`}
                        onClick={() => onSectionChange(subItem.id)}
                      >
                        {subItem.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Upload Button */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={() => setShowUploadModal(true)}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            <Upload size={18} />
            <span>Upload Document</span>
          </button>
        </div>
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={() => setShowDocModal(true)}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            {/* <Upload size={18} /> */}
            <span> Show Document</span>
          </button>
        </div>

      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Sign In</h2>
              <button
                onClick={() => setShowAuthModal(false)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <Auth onSuccess={() => setShowAuthModal(false)} />
            </div>
          </div>
        </div>
      )}

      {showDocModal &&(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        <DataDisplay setShowDocModal={setShowDocModal}/>
        </div></div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Upload Document</h2>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              {auth.currentUser ? (
                <FileUpload onSuccess={() => setShowUploadModal(false)} />
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-600 mb-4">Please sign in to upload documents</p>
                  <button
                    onClick={() => {
                      setShowUploadModal(false);
                      setShowAuthModal(true);
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline inline-flex items-center gap-2"
                  >
                    <LogIn size={18} />
                    Sign In
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}