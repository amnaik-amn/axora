import React from 'react';
import { ArrowRight, Glasses, Headphones, MousePointer, Sparkles } from 'lucide-react';

const VRLanding = () => {
  const handleContinueExperience = () => {
    console.log('Continuing VR experience...');
  };

  return (
    <div className="min-h-screen bg-[#AC5757] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-8 text-center max-w-md">
        <div className="w-20 h-20 bg-[#AC5757]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Glasses size={40} className="text-[#AC5757]" />
        </div>

        <h1 className="font-judson text-3xl font-bold text-gray-900 mb-4">
          Experience Learning in VR
        </h1>
        
        <p className="text-gray-600 mb-8">
          Explore architecture in immersive 3D
        </p>

        <button
          onClick={handleContinueExperience}
          className="w-full bg-[#AC5757] text-white py-3 px-6 rounded-xl font-semibold hover:bg-[#8A4A4A] transition-colors flex items-center justify-center gap-2 mb-4"
        >
          Continue Experience
          <ArrowRight size={18} />
        </button>
        
        <button
          onClick={() => window.history.back()}
          className="text-gray-600 hover:text-[#AC5757] transition-colors"
        >
          ← Back
        </button>
      </div>
    </div>
  );
};

export default VRLanding;