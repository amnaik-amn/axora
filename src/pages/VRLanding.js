import React, { useState, useEffect } from 'react';
import { ArrowRight, Glasses, Headphones, Home, HelpCircle, Users, Clock, Wifi, MousePointer, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getVideoSources, getDownloadUrl } from '../utils/videoStorage';

const VRLanding = () => {
  const [activeMode, setActiveMode] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [videoSources, setVideoSources] = useState([]);
  const [downloadUrl, setDownloadUrl] = useState('');

  // Initialize video sources on component mount
  useEffect(() => {
    const sources = getVideoSources();
    const dlUrl = getDownloadUrl();
    
    setVideoSources(sources);
    setDownloadUrl(dlUrl);
    
    console.log('📹 Video sources loaded:', sources.length);
    console.log('📥 Download URL:', dlUrl);
  }, []);

  const handleLaunchVR = (mode) => {
    console.log('🎬 Launching VR Walkthrough from assets folder:', mode);
    console.log('📂 Video source: /assets/VR_Walkthrough_Universal.mp4');
    
    setShowVideo(true);
    
    // Scroll to the VR preview area
    const vrPreviewElement = document.querySelector('.vr-preview-area');
    if (vrPreviewElement) {
      console.log('📍 Scrolling to VR preview area');
      vrPreviewElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Start the video from assets folder
    setTimeout(() => {
      const videoElement = document.querySelector('.vr-demo-video');
      if (videoElement) {
        console.log('📹 Found video element, starting playback');
        console.log('📂 Current video src:', videoElement.currentSrc || 'Loading...');
        
        videoElement.currentTime = 0;
        videoElement.load(); // Force reload the video
        
        videoElement.play().then(() => {
          console.log('✅ VR Walkthrough from assets folder playing successfully!');
        }).catch(e => {
          console.log('⚠️ Autoplay prevented - user can click play:', e);
          // Try to play without sound
          videoElement.muted = true;
          videoElement.play().catch(err => console.log('Still prevented:', err));
        });
      } else {
        console.log('❌ Video element not found');
      }
    }, 1000);
  };

  const handleUploadVideo = () => {
    const newShowVideo = !showVideo;
    setShowVideo(newShowVideo);
    
    // If hiding video, pause it
    if (!newShowVideo) {
      const videoElement = document.querySelector('.vr-demo-video');
      if (videoElement) {
        videoElement.pause();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              to="/app"
              className="rounded-xl border border-gray-600 px-4 py-2 text-sm hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <Home size={16} />
              Home
            </Link>
            <span className="font-oswald font-medium text-2xl text-white">AXORA</span>
            <span className="text-gray-400 text-lg font-judson">VR Studio</span>
          </div>
          <nav className="flex items-center gap-3">
            <button 
              onClick={() => alert('VR Help\n\n• Getting started guide\n• Headset setup instructions\n• Troubleshooting tips\n• Controls reference')}
              className="rounded-xl border border-gray-600 px-4 py-2 text-sm hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <HelpCircle size={16} />
              Help
            </button>
            <Link 
              to="/app/support"
              className="rounded-xl border border-gray-600 px-4 py-2 text-sm hover:bg-gray-800 transition-colors"
            >
              Support
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 pt-8 pb-6 grid lg:grid-cols-12 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-8">
          <div className="mb-6">
            <h1 className="font-judson text-4xl md:text-5xl font-bold text-white mb-4">
              Axora VR Studio
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
              Step inside immersive learning. Walk through architectural models, present designs, and receive real‑time critique in a shared virtual space.
            </p>
          </div>

          {/* VR Preview Area */}
          <div className="vr-preview-area relative rounded-2xl overflow-hidden border border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 mb-8">
            <div className="aspect-video w-full">
              {showVideo ? (
                <div className="w-full h-full relative bg-black rounded-lg">
                  <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs z-10">
                    VIDEO PLAYING
                  </div>
                  <video 
                    className="vr-demo-video w-full h-full object-cover rounded-lg"
                    controls
                    autoPlay
                    muted
                    playsInline
                    preload="auto"
                    loop
                    onLoadStart={() => {
                      console.log('🔄 Video loading from assets folder...');
                    }}
                    onLoadedData={() => {
                      console.log('✅ VR Walkthrough loaded and ready to play from assets');
                    }}
                    onCanPlay={() => {
                      console.log('✅ Video can play - ready for playback');
                    }}
                    onPlay={() => {
                      console.log('▶️ VR Walkthrough started playing from assets folder!');
                    }}
                    onError={(e) => {
                      console.error('❌ Video error from assets folder:', e);
                      console.error('❌ Error details:', e.target.error);
                    }}
                  >
                    {videoSources.map((source, index) => (
                      <source 
                        key={index} 
                        src={source.src} 
                        type={source.type}
                      />
                    ))}
                    <p className="text-center p-4 text-white">
                      Your browser does not support the video tag. 
                      <br />
                      <a href={downloadUrl} className="text-[#AC5757] underline mr-2" target="_blank" rel="noopener noreferrer">
                        Play video directly
                      </a>
                      |
                      <a href={downloadUrl} className="text-[#AC5757] underline ml-2" download="Ananya_Naik_VR_Walkthrough.mp4">
                        Download video
                      </a>
                    </p>
                  </video>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_center,rgba(172,87,87,0.15),rgba(0,0,0,0.3))]">
                  <div className="text-center">
                    <div className="mx-auto mb-6 h-20 w-20 rounded-full border-2 border-[#AC5757] grid place-items-center bg-[#AC5757]/10">
                      <Glasses size={32} className="text-[#AC5757]" />
                    </div>
                    <p className="text-gray-200 text-lg font-medium mb-2">VR Demo Preview</p>
                    <p className="text-gray-400 text-sm">Click "Launch Walkthrough" to view the VR demo or "Download" to get the full video</p>
                  </div>
                </div>
              )}
            </div>
            <div className="absolute bottom-0 inset-x-0 bg-gray-900/80 backdrop-blur border-t border-gray-700 px-6 py-4 flex items-center justify-between">
              <div className="text-sm text-gray-300">
                Mode: <span className="font-semibold text-white">{showVideo ? 'Playing' : 'Preview'}</span>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={downloadUrl}
                  download="Ananya_Naik_VR_Walkthrough.mp4"
                  className="px-4 py-2 rounded-lg bg-gray-500 hover:bg-gray-400 text-white text-sm font-semibold transition-colors inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download
                </a>
                <button 
                  onClick={() => handleLaunchVR('VR Walkthrough')}
                  className="px-4 py-2 rounded-lg bg-[#AC5757] hover:bg-[#8A4A4A] text-white text-sm font-semibold transition-colors inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V17M6 10V9a3 3 0 113-3v1m0 0V9a3 3 0 013-3v1" />
                  </svg>
                  {showVideo ? 'Restart Walkthrough' : 'Launch Walkthrough'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Quick Start */}
          <div className="rounded-2xl border border-gray-700 p-6 bg-gray-800/50">
            <h2 className="font-judson text-xl font-semibold text-white mb-4">Quick Start</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-3">
                  <CheckCircle size={16} className="text-green-400" />
                  Headset
                </span>
                <span className="text-green-400 font-medium">Connected</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-3">
                  <CheckCircle size={16} className="text-green-400" />
                  Controllers
                </span>
                <span className="text-green-400 font-medium">Ready</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-gray-600"></div>
                  Room Scale
                </span>
                <button 
                  onClick={() => alert('Room Scale Calibration\n\nThis would guide you through:\n• Setting play area boundaries\n• Height calibration\n• Guardian setup\n• Safety zone configuration')}
                  className="underline text-[#AC5757] hover:text-[#8A4A4A] transition-colors"
                >
                  Calibrate
                </button>
              </li>
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-gray-600"></div>
                  Audio
                </span>
                <button 
                  onClick={() => alert('Audio Test\n\nTesting:\n• Microphone input levels\n• Spatial audio output\n• Voice chat quality\n• 3D positional sound')}
                  className="underline text-[#AC5757] hover:text-[#8A4A4A] transition-colors"
                >
                  Test
                </button>
              </li>
            </ul>
            <button 
              onClick={() => handleLaunchVR('Quick Start Session')}
              className="mt-6 w-full py-3 rounded-xl bg-[#AC5757] hover:bg-[#8A4A4A] font-semibold transition-colors"
            >
              Start Session
            </button>
          </div>

          {/* Upcoming Sessions */}
          <div className="rounded-2xl border border-gray-700 p-6 bg-gray-800/50">
            <h3 className="font-judson text-lg font-semibold text-white mb-4">Upcoming VR Sessions</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center justify-between p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors cursor-pointer">
                <span className="font-medium text-white">Studio Critique – Sec A</span>
                <span className="text-gray-300">Today 2:00 PM</span>
              </li>
              <li className="flex items-center justify-between p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors cursor-pointer">
                <span className="font-medium text-white">Urban Sandbox – Team 3</span>
                <span className="text-gray-300">Thu 11:30 AM</span>
              </li>
              <li className="flex items-center justify-between p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors cursor-pointer">
                <span className="font-medium text-white">Interior Walkthrough</span>
                <span className="text-gray-300">Fri 4:00 PM</span>
              </li>
            </ul>
            <button 
              onClick={() => alert('Schedule VR Session\n\nCreate new sessions:\n• Choose session type\n• Set date and time\n• Invite participants\n• Configure VR environment')}
              className="mt-4 w-full py-3 rounded-xl border border-gray-600 hover:bg-gray-700 transition-colors"
            >
              Schedule Session
            </button>
          </div>
        </aside>
      </section>

      {/* VR Modes */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="font-judson text-2xl font-bold text-white mb-6">Choose Your Mode</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ModeCard 
            title="Architecture Walkthrough" 
            desc="Navigate BIM/3D models at true scale, bookmark viewpoints, and export notes." 
            badge="Solo / Team"
            onLaunch={() => handleLaunchVR('Architecture Walkthrough')}
            onPreview={() => alert('Architecture Walkthrough Preview\n\nFeatures:\n• 1:1 scale model viewing\n• Teleport navigation\n• Measurement tools\n• Note-taking system\n• Export capabilities')}
          />
          <ModeCard 
            title="Studio Critique" 
            desc="Pin‑up boards in VR, laser pointers, voice chat, and timeboxed review rounds." 
            badge="Live"
            onLaunch={() => handleLaunchVR('Studio Critique')}
            onPreview={() => alert('Studio Critique Preview\n\nFeatures:\n• Virtual pin-up boards\n• Multi-user voice chat\n• Laser pointer tools\n• Timed presentation rounds\n• Recording capabilities')}
          />
          <ModeCard 
            title="Urban Sandbox" 
            desc="Place massing blocks, simulate sun paths, and annotate context in mixed reality." 
            badge="Experimental"
            onLaunch={() => handleLaunchVR('Urban Sandbox')}
            onPreview={() => alert('Urban Sandbox Preview\n\nFeatures:\n• 3D massing tools\n• Solar path simulation\n• Environmental analysis\n• Context mapping\n• Real-time collaboration')}
          />
        </div>
      </section>

      {/* Requirements & Troubleshooting */}
      <section className="max-w-7xl mx-auto px-6 pb-12 grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 rounded-2xl border border-gray-700 p-6 bg-gray-800/50">
          <h3 className="font-judson text-lg font-semibold text-white mb-4">System Requirements</h3>
          <ul className="grid sm:grid-cols-2 gap-4 text-sm text-gray-300">
            <li className="flex items-center gap-3">
              <Bullet />
              Supported: Quest 2/3, Vision Pro (beta), SteamVR
            </li>
            <li className="flex items-center gap-3">
              <Bullet />
              Internet ≥ 25 Mbps, latency ≤ 60ms
            </li>
            <li className="flex items-center gap-3">
              <Bullet />
              Recommended: 2m × 2m playspace
            </li>
            <li className="flex items-center gap-3">
              <Bullet />
              Optional: Stylus/pen for annotations
            </li>
          </ul>
        </div>
        <div className="lg:col-span-4 rounded-2xl border border-gray-700 p-6 bg-gray-800/50">
          <h3 className="font-judson text-lg font-semibold text-white mb-4">Troubleshooting</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li>
              <span className="font-semibold text-white">No video?</span> Upload a demo clip above.
            </li>
            <li>
              <span className="font-semibold text-white">Headset not found?</span> Re‑plug USB or restart Link.
            </li>
            <li>
              <span className="font-semibold text-white">Choppy audio?</span> Switch to wired headphones.
            </li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-700 py-8 text-center">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} AXORA. VR Studio is in beta.
        </p>
      </footer>
    </div>
  );
};

function ModeCard({ title, desc, badge, onLaunch, onPreview }) {
  return (
    <div className="group rounded-2xl border border-gray-700 bg-gray-800/50 p-6 hover:border-[#AC5757] hover:bg-gray-800 transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-judson text-lg font-semibold text-white">{title}</h3>
        <span className="text-xs px-3 py-1 rounded-full border border-gray-600 text-gray-300 bg-gray-700">
          {badge}
        </span>
      </div>
      <p className="text-sm text-gray-300 mb-6 leading-relaxed">{desc}</p>
      <div className="flex items-center gap-3">
        <button 
          onClick={onLaunch}
          className="flex-1 px-4 py-2 rounded-lg bg-[#AC5757] hover:bg-[#8A4A4A] text-sm font-semibold transition-colors"
        >
          Launch
        </button>
        <button 
          onClick={onPreview}
          className="px-4 py-2 rounded-lg border border-gray-600 hover:bg-gray-700 text-sm transition-colors"
        >
          Preview
        </button>
      </div>
    </div>
  );
}

function Bullet() {
  return (
    <div className="w-2 h-2 rounded-full bg-[#AC5757]"></div>
  );
}

export default VRLanding;