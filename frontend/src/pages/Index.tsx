
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import OceanBackground from '@/components/OceanBackground';
import PageTransition from '@/components/PageTransition';
import ImageUpload from '@/components/ImageUpload';
import { cn } from '@/lib/utils';

const configuredApiUrl = import.meta.env.VITE_API_BASE_URL?.trim();
const API_URL = configuredApiUrl
  ? configuredApiUrl.replace(/\/+$/, '')
  : import.meta.env.DEV
    ? 'http://127.0.0.1:5000'
    : '';

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleImageSelected = (file: File | null) => {
    setSelectedFile(file);
    if (file) {
      void handleSubmit(file);
    }
  };

  const handleSubmit = async (fileToAnalyze = selectedFile) => {
    if (!fileToAnalyze) {
      toast({
        title: "No image selected",
        description: "Please upload an image first",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      if (!API_URL) {
        throw new Error(
          'Detection service is not configured. Set VITE_API_BASE_URL to your deployed Flask backend URL and redeploy the frontend.'
        );
      }

      // Create form data to send to the backend
      const formData = new FormData();
      formData.append('image', fileToAnalyze);
      
      // Call Flask backend API
      const response = await fetch(`${API_URL}/api/detect`, {
        method: 'POST',
        body: formData,
      });

      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(
            'Detection endpoint not found. Check that VITE_API_BASE_URL points to your Flask backend, not the frontend website.'
          );
        }
        throw new Error(`Server responded with ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to process image');
      }
      
      // Store results in sessionStorage
      sessionStorage.setItem('detectionResults', JSON.stringify({
        resultImage: data.image,
        gpsCoordinates: data.gps_coordinates,
        detections: data.detections,
        count: data.count,
        averageConfidence: data.average_confidence
      }));
      
      // Navigate to results page
      navigate('/results');
      
    } catch (error) {
      console.error('Error processing image:', error);
      toast({
        title: "Processing failed",
        description: error instanceof Error ? error.message : "There was an error processing your image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <OceanBackground />
      <PageTransition>
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10 space-y-4">
              <div className="animate-fade-down">
                <span className="text-xs uppercase tracking-wider px-3 py-1 rounded-full glass-card text-primary">
                  Underwater Plastic Detection
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold animate-fade-down animate-delay-100">
                <span className="text-gradient">Detect Plastic Waste</span>
                <br /> In Underwater Environments
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-down animate-delay-200">
                Select an underwater image to automatically identify plastic waste
                using our YOLOv8 detection system.
              </p>
            </div>

            <div className={cn(
              "rounded-3xl glass-card p-6 md:p-8",
              "mb-12 border border-border/50 shadow-lg",
              "animate-fade-up animate-delay-300"
            )}>
              <div className="space-y-8">
                <ImageUpload onImageSelected={handleImageSelected} />
                
                <div className="flex justify-center">
                  <Button 
                    onClick={handleSubmit}
                    size="lg"
                    className="glass-button text-primary font-medium px-8 py-6 h-auto"
                    disabled={!selectedFile || isSubmitting}
                  >
                    {isSubmitting ? (
                      "Processing..."
                    ) : (
                      <>
                        Detect Plastic <ArrowRight className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-up animate-delay-400">
              {[
                {
                  title: "Select",
                  description: "Choose an underwater image in a common format like JPEG or PNG."
                },
                {
                  title: "Analyze",
                  description: "Our YOLOv8 model identifies plastic waste in the image with high accuracy."
                },
                {
                  title: "Locate",
                  description: "GPS coordinates are extracted from image metadata when available. Then pointed on Map based on Density."
                }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="glass-card p-6 rounded-xl transition-all duration-300 hover:translate-y-[-5px]"
                  style={{ animationDelay: `${400 + (index * 100)}ms` }}
                >
                  <div className="w-10 h-10 rounded-lg glass-button flex items-center justify-center mb-4">
                    <span className="text-primary font-bold">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageTransition>
    </>
  );
};

export default Index;
