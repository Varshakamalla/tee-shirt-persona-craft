
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import ImageUpload from './ImageUpload';
import SizeForm from './SizeForm';
import TextCustomization from './TextCustomization';
import ThemeSwitcher from './ThemeSwitcher';

// Default t-shirt image
const DEFAULT_TSHIRT_IMAGE = 'https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?auto=format&fit=crop&q=80&w=1000'; 
// Default design image to be printed
const DEFAULT_DESIGN = 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&q=80&w=300';

interface FormValues {
  height: number;
  weight: number;
  build: string;
  designImage: string;
  customText: string;
  textColor: string;
  tshirtColor: string;
}

const TShirtCustomizer: React.FC = () => {
  const methods = useForm<FormValues>({
    defaultValues: {
      height: 180,
      weight: 80,
      build: 'athletic',
      designImage: DEFAULT_DESIGN,
      customText: '',
      textColor: '#000000',
      tshirtColor: 'white'
    },
  });

  const { watch, handleSubmit } = methods;
  const formValues = watch();
  const { designImage, customText, textColor, tshirtColor } = formValues;

  const onSubmit = (data: FormValues) => {
    console.log('Form submitted:', data);
    // In a real application, this would send data to backend or proceed to checkout
    alert('Design submitted! Check console for details.');
  };

  // Available t-shirt colors
  const tshirtColors = [
    { name: 'White', value: 'white' },
    { name: 'Black', value: 'black' },
    { name: 'Navy', value: 'navy' },
    { name: 'Red', value: 'red' },
    { name: 'Green', value: 'green' },
  ];

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen p-4 md:p-6 flex flex-col">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">T-Shirt Customizer</h1>
        
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Preview Section */}
          <div className="md:col-span-2 customizer-container rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            <div className="preview-container" style={{ backgroundColor: tshirtColor === 'white' ? '#f8f8f8' : '' }}>
              <div className="t-shirt-overlay">
                <img 
                  src={DEFAULT_TSHIRT_IMAGE} 
                  alt="T-shirt preview" 
                  className="image-preview" 
                  style={{ 
                    filter: tshirtColor !== 'white' ? `hue-rotate(${
                      tshirtColor === 'black' ? '0deg' : 
                      tshirtColor === 'navy' ? '240deg' : 
                      tshirtColor === 'red' ? '0deg' : 
                      tshirtColor === 'green' ? '120deg' : '0deg'
                    }) saturate(${
                      tshirtColor === 'black' ? '0%' : 
                      tshirtColor === 'navy' ? '100%' : 
                      tshirtColor === 'red' ? '200%' : 
                      tshirtColor === 'green' ? '150%' : '100%'
                    }) brightness(${
                      tshirtColor === 'black' ? '50%' : 
                      tshirtColor === 'navy' ? '70%' : 
                      tshirtColor === 'red' ? '80%' : 
                      tshirtColor === 'green' ? '80%' : '100%'
                    })` : 'none'
                  }}
                />
                
                {/* Design image overlay */}
                {designImage && (
                  <div className="absolute top-[25%] left-1/2 transform -translate-x-1/2 w-[28%]">
                    <img 
                      src={designImage} 
                      alt="Custom design" 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                )}
                
                {/* Custom text overlay */}
                {customText && (
                  <div 
                    className="text-preview"
                    style={{ color: textColor }}
                  >
                    {customText.split('\n').slice(0, 3).map((line, i) => (
                      <div key={i} className="font-bold">{line}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Customization Controls */}
          <div className="customizer-container rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Customize Your T-shirt</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                {/* Size form component */}
                <SizeForm />
                
                {/* Image upload component */}
                <ImageUpload name="designImage" />
                
                {/* Text customization component */}
                <TextCustomization />
                
                {/* T-shirt color options */}
                <div className="customization-option">
                  <label className="customization-label">T-shirt Color</label>
                  <div className="color-options">
                    {tshirtColors.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        className={`color-option ${formValues.tshirtColor === color.value ? 'selected' : ''}`}
                        style={{ 
                          backgroundColor: color.value === 'navy' ? '#000080' : color.value,
                          borderColor: color.value === 'white' ? '#ddd' : color.value
                        }}
                        onClick={() => methods.setValue('tshirtColor', color.value)}
                        title={color.name}
                        aria-label={`Select ${color.name} color`}
                      />
                    ))}
                  </div>
                </div>
                
                <button 
                  type="submit"
                  className="action-button w-full"
                >
                  Save Design
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <ThemeSwitcher />
      </div>
    </FormProvider>
  );
};

export default TShirtCustomizer;
