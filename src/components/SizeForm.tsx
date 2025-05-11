
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils';

const SizeForm: React.FC = () => {
  const { register, formState: { errors } } = useFormContext();
  
  const buildOptions = ['lean', 'regular', 'athletic', 'big'];

  return (
    <div className="space-y-3">
      <div className="customization-option">
        <label htmlFor="height" className="customization-label">Height (cm)</label>
        <input
          id="height"
          type="number"
          className={cn(
            "customization-input",
            errors.height && "border-red-500"
          )}
          min={100}
          max={250}
          {...register("height", {
            required: "Height is required",
            min: {
              value: 100,
              message: "Height must be at least 100cm"
            },
            max: {
              value: 250,
              message: "Height cannot exceed 250cm"
            }
          })}
        />
        {errors.height && (
          <p className="text-red-500 text-xs mt-1">{errors.height.message as string}</p>
        )}
      </div>

      <div className="customization-option">
        <label htmlFor="weight" className="customization-label">Weight (kg)</label>
        <input
          id="weight"
          type="number"
          className={cn(
            "customization-input",
            errors.weight && "border-red-500"
          )}
          min={30}
          max={250}
          {...register("weight", {
            required: "Weight is required",
            min: {
              value: 30,
              message: "Weight must be at least 30kg"
            },
            max: {
              value: 250,
              message: "Weight cannot exceed 250kg"
            }
          })}
        />
        {errors.weight && (
          <p className="text-red-500 text-xs mt-1">{errors.weight.message as string}</p>
        )}
      </div>

      <div className="customization-option">
        <label htmlFor="build" className="customization-label">Build</label>
        <select
          id="build"
          className="customization-input"
          {...register("build", { required: "Build is required" })}
        >
          {buildOptions.map((option) => (
            <option key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>
        {errors.build && (
          <p className="text-red-500 text-xs mt-1">{errors.build.message as string}</p>
        )}
      </div>
    </div>
  );
};

export default SizeForm;
