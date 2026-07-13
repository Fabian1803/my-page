import React, { useState, useRef } from 'react';
import { BsCloudUpload, BsImage, BsX } from 'react-icons/bs';

interface InputImageCloudProps {
  label: string;
  value?: File | null;
  onChange: (file: File | null) => void;
  placeholder?: string;
  required?: boolean;
  onClick?: () => void;
}

export default function InputImageCloud({ label, onChange, placeholder = "Haz clic para subir una imagen", required = false, onClick }: InputImageCloudProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>(''); 
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      onChange(null);
      setImagePreview(null);
      setFileName('');
    }
  };

  const handleInputClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
    setImagePreview(null);
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="relative mt-2 w-full" onClick={onClick}>
      <label className="absolute -top-2 left-3 bg-white z-10 px-1 text-xs font-medium text-gray-500">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <div
        className={`relative flex items-center justify-between rounded border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-800 outline-none focus-within:border-blue-600 ${
          imagePreview ? 'cursor-default' : 'cursor-pointer hover:border-gray-400'
        }`}
        onClick={imagePreview ? undefined : handleInputClick}
      >
        <div className="flex items-center gap-3">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-35 h-20 rounded-sm object-cover border border-gray-200"
            />
          ) : (
            <div className="w-35 h-20 rounded-sm bg-gray-100 flex items-center justify-center border border-gray-200 text-gray-400">
              <BsImage size={16} />
            </div>
          )}
          
          <span className={imagePreview ? 'text-gray-800 font-medium truncate' : 'text-gray-400'}>
            {imagePreview ? fileName : placeholder}
          </span>
        </div>

        {imagePreview ? (
          <div className="flex gap-2 items-center">
            <button
              type="button"
              onClick={handleInputClick}
              className="text-md text-gray-400 hover:text-[#1a6fd8] cursor-pointer"
            >
              Cambiar
            </button>
            <button
              type="button"
              onClick={handleRemoveImage}
              className="flex items-center cursor-pointer text-gray-400 hover:text-gray-600"
            >
              <BsX size={20} />
            </button>
          </div>
        ) : (
          <div className="flex items-center text-gray-400 hover:text-gray-600">
            <BsCloudUpload size={18} />
          </div>
        )}
      </div>
    </div>
  );
}