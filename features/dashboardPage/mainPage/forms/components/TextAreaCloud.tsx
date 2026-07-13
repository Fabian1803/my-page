import React from 'react';
import { BsQuestionCircle } from 'react-icons/bs';

interface TextAreaCloudProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  onClick?: () => void;
}

export default function TextAreaCloud({ label, value, onChange, placeholder, required = false, rows = 4, onClick }: TextAreaCloudProps) {
  return (
    <div className="relative mt-2 w-full" onClick={onClick}>
      <label className="absolute -top-2 left-3 bg-white z-10 px-1 text-xs font-medium text-gray-500">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative flex">
        <textarea
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-600 pr-10 resize-y"
        />
        <div className="absolute right-3 top-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer">
          <BsQuestionCircle size={18} />
        </div>
      </div>
    </div>
  );
}