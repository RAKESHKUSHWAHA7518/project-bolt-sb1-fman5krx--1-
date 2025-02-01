// import React, { useState } from 'react';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { storage, auth } from '../firebase';
// import { Upload, X } from 'lucide-react';

// interface FileUploadProps {
//   onSuccess?: () => void;
// }

// export default function FileUpload({ onSuccess }: FileUploadProps) {
//   const [file, setFile] = useState<File | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState('');
//   const [name, setName] = useState('');
//   const [category, setCategory] = useState('');

//   const handleUpload = async () => {
//     if (!file || !auth.currentUser || !name.trim() || !category.trim()) return;

//     setUploading(true);
//     setError('');

//     try {
//       const timestamp = Date.now();
//       const fileName = `${timestamp}_${file.name}`;
//       const storageRef = ref(storage, `uploads/${auth.currentUser.uid}/${category}/${fileName}`);
      
//       // Upload the file with metadata
//       const metadata = {
//         customMetadata: {
//           name: name.trim(),
//           category: category.trim(),
//           originalName: file.name,
//           uploadedBy: auth.currentUser.email || 'unknown',
//           uploadDate: new Date().toISOString(),
//         },
//       };

//       const snapshot = await uploadBytes(storageRef, file, metadata);
//       const downloadURL = await getDownloadURL(snapshot.ref);
      
//       console.log('File uploaded successfully:', downloadURL);
//       setFile(null);
//       setName('');
//       setCategory('');
//       if (onSuccess) {
//         onSuccess();
//       }
//     } catch (error: any) {
//       console.error('Upload error:', error);
//       setError(error.message || 'Failed to upload file. Please try again.');
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0];
//     if (selectedFile) {
//       // Check file size (limit to 5MB)
//       if (selectedFile.size > 5 * 1024 * 1024) {
//         setError('File size must be less than 5MB');
//         return;
//       }
//       setFile(selectedFile);
//       // Set default name from file name without extension
//       setName(selectedFile.name.replace(/\.[^/.]+$/, ''));
//       setError('');
//     }
//   };

//   return (
//     <div className="space-y-4">
//       {error && (
//         <div className="bg-red-50 text-red-500 p-3 rounded text-sm">
//           {error}
//         </div>
//       )}

//       <div className="flex items-center justify-center w-full">
//         <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
//           <div className="flex flex-col items-center justify-center pt-5 pb-6">
//             <Upload className="w-8 h-8 mb-3 text-gray-400" />
//             <p className="mb-2 text-sm text-gray-500">
//               <span className="font-semibold">Click to upload</span> or drag and drop
//             </p>
//             <p className="text-xs text-gray-500">PDF, DOC, DOCX, or images (max 5MB)</p>
//           </div>
//           <input
//             type="file"
//             className="hidden"
//             onChange={handleFileChange}
//             accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
//           />
//         </label>
//       </div>
      
//       {file && (
//         <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
//           <span className="text-sm text-gray-600 truncate max-w-[80%]">{file.name}</span>
//           <button
//             onClick={() => {
//               setFile(null);
//               setName('');
//             }}
//             className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-gray-200"
//           >
//             <X size={16} />
//           </button>
//         </div>
//       )}

//       <div className="space-y-2">
//         <div>
//           <label htmlFor="fileName" className="block text-sm font-medium text-gray-700 mb-1">
//             Document Name
//           </label>
//           <input
//             id="fileName"
//             type="text"
//             placeholder="Enter document name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />
//         </div>
//         <div>
//           <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
//             Category
//           </label>
//           <select
//             id="category"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           >
//             <option value="">Select a category</option>
//             <option value="lebensdokumente">Lebensdokumente</option>
//             <option value="korrespondenzen">Korrespondenzen</option>
//             <option value="berufliche-dokumente">Berufliche Dokumente</option>
//             <option value="werke">Werke</option>
//             <option value="sammlungen">Sammlungen</option>
//           </select>
//         </div>
//       </div>

//       <button
//         onClick={handleUpload}
//         disabled={!file || uploading || !name.trim() || !category}
//         className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center gap-2 ${
//           (!file || uploading || !name.trim() || !category) && 'opacity-50 cursor-not-allowed'
//         }`}
//       >
//         <Upload size={20} />
//         {uploading ? 'Uploading...' : 'Upload Document'}
//       </button>
//     </div>
//   );
// }
// interface FormData {
//   id?: string;
//   name: string;
//   email: string;
//   message: string;
//   imageUrl?: string;
//   createdAt: Date;
// }


// import React, { useState, useEffect } from 'react';
// import { 
//   collection, 
//   addDoc, 
//   getDocs, 
//   updateDoc, 
//   deleteDoc, 
//   doc, 
//   query, 
//   orderBy, 
//   Timestamp 
// } from 'firebase/firestore';
// import { 
//   ref, 
//   uploadBytes, 
//   getDownloadURL, 
//   deleteObject 
// } from 'firebase/storage';
// import { db, storage } from '../firebase';

// export default function FileUpload() {
//   const [formData, setFormData] = useState<FormData>({
//     name: '',
//     email: '',
//     message: '',
//     createdAt: new Date(),
//   });

   
  
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string>('');
//   const [submissions, setSubmissions] = useState<FormData[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [editingId, setEditingId] = useState<string | null>(null);

//   // Handle image file selection
//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       // Validate file size (e.g., max 5MB)
//       if (file.size > 5 * 1024 * 1024) {
//         setError('Image size must be less than 5MB');
//         return;
//       }

//       // Validate file type
//       if (!file.type.startsWith('image/')) {
//         setError('File must be an image');
//         return;
//       }

//       setImageFile(file);
//       // Create preview URL
//       const previewUrl = URL.createObjectURL(file);
//       setImagePreview(previewUrl);
//     }
//   };

//   // Upload image to Firebase Storage
//   const uploadImage = async (file: File): Promise<string> => {
//     const timestamp = Date.now();
//     const storageRef = ref(storage, `images/${timestamp}_${file.name}`);
//     await uploadBytes(storageRef, file);
//     return getDownloadURL(storageRef);
//   };

//   // Create - Add new form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       let imageUrl = '';
//       if (imageFile) {
//         imageUrl = await uploadImage(imageFile);
//       }

//       const docRef = await addDoc(collection(db, 'submissions'), {
//         ...formData,
//         imageUrl,
//         createdAt: Timestamp.fromDate(new Date())
//       });
      
//       console.log('Document written with ID: ', docRef.id);
//       setFormData({
//         name: '',
//         email: '',
//         message: '',
//         createdAt: new Date()
//       });
//       setImageFile(null);
//       setImagePreview('');
      
//       // Refresh the list
//       fetchSubmissions();
//     } catch (err: any) {
//       console.log(err);
      
//       setError('Error adding document: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete image from Storage
//   const deleteImage = async (imageUrl: string) => {
//     try {
//       const imageRef = ref(storage, imageUrl);
//       await deleteObject(imageRef);
//     } catch (error) {
//       console.error('Error deleting image:', error);
//     }
//   };

//   // Read - Fetch all submissions
//   const fetchSubmissions = async () => {
//     setLoading(true);
//     try {
//       const q = query(collection(db, 'submissions'), orderBy('createdAt', 'desc'));
//       const querySnapshot = await getDocs(q);
//       const submissionData: FormData[] = [];
      
//       querySnapshot.forEach((doc) => {
//         const data = doc.data();
//         submissionData.push({
//           id: doc.id,
//           name: data.name,
//           email: data.email,
//           message: data.message,
//           imageUrl: data.imageUrl,
//           createdAt: data.createdAt.toDate()
//         });
//       });
//       console.log(submissionData);
      
//       setSubmissions(submissionData);
//     } catch (err: any) {
//       setError('Error fetching submissions: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Update - Edit existing submission
//   const handleUpdate = async (id: string) => {
//     setLoading(true);
//     setError('');

//     try {
//       let imageUrl = formData.imageUrl;
      
//       // If there's a new image file, upload it and delete the old one
//       if (imageFile) {
//         if (formData.imageUrl) {
//           await deleteImage(formData.imageUrl);
//         }
//         imageUrl = await uploadImage(imageFile);
//       }

//       const docRef = doc(db, 'submissions', id);
//       await updateDoc(docRef, {
//         ...formData,
//         imageUrl,
//         updatedAt: Timestamp.fromDate(new Date())
//       });
      
//       setEditingId(null);
//       setImageFile(null);
//       setImagePreview('');
//       fetchSubmissions();
//     } catch (err: any) {
//       setError('Error updating document: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete - Remove submission and associated image
//   const handleDelete = async (id: string, imageUrl?: string) => {
//     if (!window.confirm('Are you sure you want to delete this submission?')) return;
    
//     setLoading(true);
//     setError('');

//     try {
//       if (imageUrl) {
//         await deleteImage(imageUrl);
//       }
//       await deleteDoc(doc(db, 'submissions', id));
//       fetchSubmissions();
//     } catch (err: any) {
//       setError('Error deleting document: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Load submissions on component mount
//   useEffect(() => {
//     fetchSubmissions();
//   }, []);

//   return (
//     <div className="max-w-4xl mx-auto p-4 overflow-y-auto scroll">
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           {error}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4 mb-8">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Name</label>
//           <input
//             type="text"
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">Email</label>
//           <input
//             type="email"
//             value={formData.email}
//             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">Message</label>
//           <textarea
//             value={formData.message}
//             onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//             rows={4}
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">Image</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             className="mt-1 block w-full"
//           />
//           {imagePreview && (
//             <div className="mt-2">
//               <img
//                 src={imagePreview}
//                 alt="Preview"
//                 className="max-w-xs rounded"
//               />
//               <button
//                 type="button"
//                 onClick={() => {
//                   setImageFile(null);
//                   setImagePreview('');
//                 }}
//                 className="mt-2 text-red-600 hover:text-red-800"
//               >
//                 Remove Image
//               </button>
//             </div>
//           )}
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
//         >
//           {loading ? 'Submitting...' : 'Submit'}
//         </button>
//       </form>

//       {/* <div className="space-y-4">
//         <h2 className="text-xl font-bold">Submissions</h2>
//         {submissions.map((submission) => (
//           <div key={submission.id} className="border rounded p-4">
//             {editingId === submission.id ? (
//               <div className="space-y-4">
//                 <input
//                   type="text"
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   className="block w-full border-gray-300 rounded-md"
//                 />
//                 <input
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   className="block w-full border-gray-300 rounded-md"
//                 />
//                 <textarea
//                   value={formData.message}
//                   onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//                   className="block w-full border-gray-300 rounded-md"
//                 />
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   className="block w-full"
//                 />
//                 {(imagePreview || formData.imageUrl) && (
//                   <div className="mt-2">
//                     <img
//                       src={imagePreview || formData.imageUrl}
//                       alt="Preview"
//                       className="max-w-xs rounded"
//                     />
//                   </div>
//                 )}
//                 <div className="space-x-2">
//                   <button
//                     onClick={() => handleUpdate(submission.id!)}
//                     className="bg-green-600 text-white px-3 py-1 rounded"
//                   >
//                     Save
//                   </button>
//                   <button
//                     onClick={() => {
//                       setEditingId(null);
//                       setImageFile(null);
//                       setImagePreview('');
//                     }}
//                     className="bg-gray-600 text-white px-3 py-1 rounded"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <>
//                 <h3 className="font-bold">{submission.name}</h3>
//                 <p className="text-gray-600">{submission.email}</p>
//                 <p className="mt-2">{submission.message}</p>
//                 {submission.imageUrl && (
//                   <img
//                     src={submission.imageUrl}
//                     alt="Submission"
//                     className="mt-2 max-w-xs rounded"
//                   />
//                 )}
//                 <p className="text-sm text-gray-500 mt-2">
//                   Submitted: {submission.createdAt.toLocaleDateString()}
//                 </p>
//                 <div className="mt-2 space-x-2">
//                   <button
//                     onClick={() => {
//                       setEditingId(submission.id!);
//                       setFormData(submission);
//                       setImagePreview('');
//                     }}
//                     className="text-blue-600 hover:text-blue-800"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(submission.id!, submission.imageUrl)}
//                     className="text-red-600 hover:text-red-800"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         ))}
//       </div> */}
//     </div>
//   );
// }


// types.ts
interface HistoricalDocument {
  id?: string;
  title: string;
  date: string;
  imageUrl?: string;
  description: string;
  section: string;
  tags: string[];
  createdAt: Date;
}

// HistoricalDocumentForm.tsx
import React, { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  Timestamp 
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { db, storage } from '../firebase';
import { X } from 'lucide-react';

export default function FileUpload() {
  const [formData, setFormData] = useState<HistoricalDocument>({
    title: '',
    date: '',
    description: '',
    section: 'korrespondenzen',
    tags: [],
    createdAt: new Date(),
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [documents, setDocuments] = useState<HistoricalDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState('');

  const sections = [
    { value: 'lebensdokumente', label: 'Lebensdokumente' },
    { value: 'korrespondenzen', label: 'Korrespondenzen' },
    { value: 'berufliche-dokumente', label: 'Berufliche Dokumente' },
    { value: 'werke', label: 'Werke' },
    { value: 'sammlungen', label: 'Sammlungen' }
  ];

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData({
          ...formData,
          tags: [...formData.tags, tagInput.trim()]
        });
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        setError('File must be an image');
        return;
      }

      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const timestamp = Date.now();
    const storageRef = ref(storage, `historical-documents/${timestamp}_${file.name}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let imageUrl = '';
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const docRef = await addDoc(collection(db, 'submissions'), {
        ...formData,
        imageUrl,
        createdAt: Timestamp.fromDate(new Date())
      });
      
      setFormData({
        title: '',
        date: '',
        description: '',
        section: 'korrespondenzen',
        tags: [],
        createdAt: new Date()
      });
      setImageFile(null);
      setImagePreview('');
      
      fetchDocuments();
    } catch (err: any) {
      setError('Error adding document: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'submissions'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const documentData: HistoricalDocument[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        documentData.push({
          id: doc.id,
          title: data.title,
          date: data.date,
          imageUrl: data.imageUrl,
          description: data.description,
          section: data.section,
          tags: data.tags,
          createdAt: data.createdAt.toDate()
        });
      });
      
      setDocuments(documentData);
    } catch (err: any) {
      setError('Error fetching documents: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="text"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            placeholder="e.g., 1914"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={4}
             
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Section</label>
          <select
            value={formData.section}
            onChange={(e) => setFormData({ ...formData, section: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {sections.map(section => (
              <option key={section.value} value={section.value}>
                {section.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tags</label>
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder="Type tag and press Enter"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.tags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-indigo-100 text-indigo-700"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 text-indigo-500 hover:text-indigo-700"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full"
          />
          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-w-xs rounded"
              />
              <button
                type="button"
                onClick={() => {
                  setImageFile(null);
                  setImagePreview('');
                }}
                className="mt-2 text-red-600 hover:text-red-800"
              >
                Remove Image
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {/* <div className="space-y-4">
        <h2 className="text-xl font-bold">Historical Documents</h2>
        {documents?.map((doc) => (
          <div key={doc.id} className="border rounded p-4">
            <h3 className="font-bold">{doc.title}</h3>
            <p className="text-gray-600">{doc.date}</p>
            <p className="mt-2">{doc.description}</p>
            <p className="text-sm text-gray-500">Section: {doc.section}</p>
            {doc?.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {doc?.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {doc?.imageUrl && (
              <img
                src={doc.imageUrl}
                alt={doc.title}
                className="mt-2 max-w-xs rounded"
              />
            )}
          </div>
        ))}
      </div> */}
    </div>
  );
}