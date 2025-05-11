
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils';

const TextCustomization: React.FC = () => {
  const { register, formState: { errors }, setValue, watch } = useFormContext();
  
  const textColorOptions = [
    { name: 'Black', value: '#000000' },
    { name: 'White', value: '#ffffff' },
    { name: 'Red', value: '#ff0000' },
    { name: 'Blue', value: '#0000ff' },
    { name: 'Green', value: '#008000' }
  ];

  const watchTextColor = watch('textColor');

  return (
    <div className="customization-option">
      <label htmlFor="customText" className="customization-label">Text (max 3 lines)</label>
      <textarea
        id="customText"
        className={cn(
          "customization-input resize-none",
          errors.customText && "border-red-500"
        )}
        rows={3}
        placeholder="Enter text to print on your t-shirt..."
        {...register("customText", {
          maxLength: {
            value: 100,
            message: "Text cannot exceed 100 characters"
          },
          validate: {
            maxLines: (value) => 
              (value?.split('\n').length <= 3) || 
              "Maximum 3 lines of text allowed"
          }
        })}
      />
      {errors.customText && (
        <p className="text-red-500 text-xs mt-1">{errors.customText.message as string}</p>
      )}

      {/* Text color options */}
      <div className="mt-3">
        <label className="customization-label text-sm">Text Color</label>
        <div className="color-options">
          {textColorOptions.map((color) => (
            <button
              key={color.value}
              type="button"
              className={`color-option ${watchTextColor === color.value ? 'selected' : ''}`}
              style={{ 
                backgroundColor: color.value,
                borderColor: color.value === '#ffffff' ? '#ddd' : color.value
              }}
              onClick={() => setValue('textColor', color.value)}
              title={color.name}
              aria-label={`Select ${color.name} color`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextCustomization;
