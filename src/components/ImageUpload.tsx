
import React, { useState, useCallback, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  name: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ name }) => {
  const { register, setValue, watch } = useFormContext();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
  const uploadedImage = watch(name);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const processFile = (file: File) => {
    // Check if file is an image
    if (!file.type.match('image.*')) {
      alert('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setValue(name, e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="customization-option">
      <label className="customization-label">Design Image</label>
      
      <div
        className={cn(
          "drag-drop-area",
          isDragging && "dragover"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        {uploadedImage ? (
          <div className="w-full flex flex-col items-center">
            <img 
              src={uploadedImage} 
              alt="Uploaded design" 
              className="h-24 object-contain mb-2" 
            />
            <span className="text-sm">Click or drag to replace image</span>
          </div>
        ) : (
          <>
            <svg className="w-8 h-8 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="mb-1 text-sm font-medium">Drop an image here</p>
            <p className="text-xs text-gray-500">or click to upload</p>
          </>
        )}
      </div>
      
      <input
        type="file"
        className="hidden"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileSelect}
        {...register(name)}
      />
      
      <input 
        type="hidden" 
        {...register(name)} 
      />
    </div>
  );
};

export default ImageUpload;
