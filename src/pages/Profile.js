import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, LogOut, User, Edit2, Camera, Shield, HelpCircle, ChevronRight, X, Upload, Palette, Save } from 'lucide-react';
import { checkAuth, logout } from '../auth/config';
import NavigationModal from '../components/NavigationModal';

const Profile = () => {
  const navigate = useNavigate();
  // Check for signup user first, then demo user as fallback
  const signupUser = JSON.parse(localStorage.getItem('user') || 'null');
  const demoUser = checkAuth();
  const user = signupUser || demoUser;
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    profilePicture: null
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const fileInputRef = useRef(null);

  const menuItems = [
    { icon: Shield, label: 'Privacy & Security', action: 'privacy' },
    { icon: HelpCircle, label: 'Help & Support', action: 'help' },
    { icon: LogOut, label: 'Log out', action: 'logout', isLogout: true },
  ];

  const handleLogout = () => {
    // Clear authentication
    logout();
    // Clear signup user data
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    // Clear onboarding completion so user goes through questions again
    localStorage.removeItem('onboardingComplete');
    // Redirect to login
    window.location.href = '/login';
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
        setShowCropModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedImageData) => {
    setShowCropModal(false);
    setEditForm(prev => ({
      ...prev,
      profilePicture: croppedImageData
    }));
  };

  const handleSaveChanges = () => {
    // Update user data in localStorage
    const updatedUser = {
      ...user,
      name: editForm.name,
      email: editForm.email,
      profilePicture: editForm.profilePicture
    };
    
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    // Close popup and refresh the page to show changes
    setShowEditPopup(false);
    window.location.reload();
  };

  const handleEditFormChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMenuAction = (action) => {
    switch (action) {
      case 'privacy':
        // Navigate to Privacy & Security page
        navigate('/app/privacy-security');
        break;
      case 'help':
        // Navigate to Help & Support page
        navigate('/app/help-support');
        break;
      case 'logout':
        handleLogout();
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#AC5757] sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 h-24">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu size={29} className="text-white" />
          </button>
          <h1 className="font-oswald font-medium text-white text-[38px]">PROFILE</h1>
          <button onClick={handleLogout} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <LogOut size={20} className="text-white" />
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Profile Header */}
        <section className="mb-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg relative">
            {/* Edit Icon - Top Right Corner */}
            <button 
              onClick={() => setShowEditPopup(true)}
              className="absolute top-4 right-4 w-10 h-10 bg-[#AC5757] rounded-full flex items-center justify-center hover:bg-[#8A4A4A] transition-colors shadow-lg"
            >
              <Edit2 size={18} className="text-white" />
            </button>
            
            <div className="flex items-center gap-6">
              {/* Profile Picture */}
              <div className="relative">
                <div className="w-24 h-24 bg-[#AC5757] rounded-full flex items-center justify-center overflow-hidden">
                  {user?.profilePicture ? (
                    <img 
                      src={user.profilePicture} 
                      alt="Profile" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <User size={32} className="text-white" />
                  )}
                </div>
                <button 
                  onClick={() => setShowEditPopup(true)}
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#AC5757] rounded-full flex items-center justify-center hover:bg-[#8A4A4A] transition-colors"
                >
                  <Camera size={16} className="text-white" />
                </button>
              </div>
              
              {/* Profile Info */}
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {user?.name || 'Demo User'}
                </h2>
                <p className="text-gray-600 text-lg mb-4">{user?.email || 'demo@axora.com'}</p>
                <div className="flex items-center gap-4">
                  <span className="bg-[#AC5757]/10 text-[#AC5757] px-3 py-1 rounded-full text-sm font-semibold">
                    {user?.role || 'Learner'}
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Profile Settings */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h3>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {menuItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleMenuAction(item.action)}
                  className={`w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors ${
                    idx !== menuItems.length - 1 ? 'border-b border-gray-200' : ''
                  } ${item.isLogout ? 'text-red-600 hover:text-red-700' : 'text-gray-900'}`}
                >
                  <div className="flex items-center gap-4">
                    <Icon size={20} className={item.isLogout ? 'text-red-600' : 'text-gray-600'} />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <ChevronRight size={18} className="text-gray-400" />
                </button>
              );
            })}
          </div>
        </section>

        {/* Account Information */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Account Information</h3>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <div className="text-lg text-gray-900">{user?.name || 'Demo User'}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="text-lg text-gray-900">{user?.email || 'demo@axora.com'}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                <div className="text-lg text-gray-900">{user?.role || 'Learner'}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                <div className="text-lg text-gray-900">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long' 
                  }) : 'Demo Account'}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Navigation Modal */}
      <NavigationModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Edit Profile Popup */}
      {showEditPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Edit Profile</h3>
              <button 
                onClick={() => setShowEditPopup(false)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X size={18} className="text-gray-600" />
              </button>
            </div>

            {/* Profile Picture Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Profile Picture</label>
              <div className="flex justify-center mb-4">
                <div className="w-32 h-32 bg-[#AC5757] rounded-full flex items-center justify-center overflow-hidden">
                  {editForm.profilePicture ? (
                    <img 
                      src={editForm.profilePicture} 
                      alt="Profile Preview" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : user?.profilePicture ? (
                    <img 
                      src={user.profilePicture} 
                      alt="Current Profile" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <User size={48} className="text-white" />
                  )}
                </div>
              </div>

              {/* Upload Options */}
              <div className="grid grid-cols-2 gap-4">
                {/* Upload from Device */}
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-[#AC5757] hover:bg-[#AC5757]/5 transition-all"
                >
                  <div className="w-12 h-12 bg-[#AC5757]/10 rounded-xl flex items-center justify-center">
                    <Upload size={24} className="text-[#AC5757]" />
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900 text-sm">Upload from Device</div>
                    <div className="text-xs text-gray-600">Choose a photo</div>
                  </div>
                </button>

                {/* Create Avatar Option */}
                <button className="flex flex-col items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-[#AC5757] hover:bg-[#AC5757]/5 transition-all">
                  <div className="w-12 h-12 bg-[#AC5757]/10 rounded-xl flex items-center justify-center">
                    <Palette size={24} className="text-[#AC5757]" />
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900 text-sm">Create Avatar</div>
                    <div className="text-xs text-gray-600">Design custom</div>
                  </div>
                </button>
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {/* Name and Email Fields */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => handleEditFormChange('name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AC5757] focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => handleEditFormChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AC5757] focus:border-transparent transition-all"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button 
                onClick={() => setShowEditPopup(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveChanges}
                className="flex-1 px-4 py-3 bg-[#AC5757] text-white rounded-lg hover:bg-[#8A4A4A] transition-colors flex items-center justify-center gap-2"
              >
                <Save size={16} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Crop Modal */}
      {showCropModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Crop Profile Picture</h3>
              <button 
                onClick={() => setShowCropModal(false)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X size={18} className="text-gray-600" />
              </button>
            </div>
            
            <div className="mb-4">
              <img 
                src={previewImage} 
                alt="Crop Preview" 
                className="w-full max-h-96 object-contain rounded-lg border border-gray-200"
                style={{ cursor: 'crosshair' }}
              />
            </div>
            
            <div className="text-sm text-gray-600 mb-4 text-center">
              Click and drag to select the area you want to crop for your profile picture.
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setShowCropModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleCropComplete(previewImage)}
                className="flex-1 px-4 py-3 bg-[#AC5757] text-white rounded-lg hover:bg-[#8A4A4A] transition-colors"
              >
                Use This Image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;