import React from 'react';
import { Section } from '../App';

interface NavbarProps {
  section: Section;
  selectedTags: string[];
  onTagClick: (tag: string) => void;
}

export default function Navbar({ section, selectedTags, onTagClick }: NavbarProps) {
  return (
    <div className="fixed top-0 left-64 right-0 bg-white border-b z-10">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
        <div className="flex flex-wrap gap-2 max-h-[120px] overflow-y-auto">
          {section.tags.map((tag, index) => (
            <span
              key={index}
              className={`${tag.color} font-medium px-2 py-1 rounded-sm cursor-pointer hover:opacity-80 ${
                selectedTags.includes(tag.text) ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => onTagClick(tag.text)}
            >
              {tag.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}