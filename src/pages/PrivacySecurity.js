import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, LogOut, ArrowLeft, Shield, Eye, MessageSquare, Users, Brain, Database, Download, Trash2, Key, Smartphone, AlertTriangle, CheckCircle, Clock, Fingerprint, Settings } from 'lucide-react';
import { checkAuth, logout } from '../auth/config';
import NavigationModal from '../components/NavigationModal';

const PrivacySecurity = () => {
  const navigate = useNavigate();
  // Check for signup user first, then demo user as fallback
  const signupUser = JSON.parse(localStorage.getItem('user') || 'null');
  const demoUser = checkAuth();
  const user = signupUser || demoUser;
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Privacy Settings State
  const [profileVisibility, setProfileVisibility] = useState('connections'); // 'public', 'connections', 'private'
  const [showActivityStatus, setShowActivityStatus] = useState(true);
  const [whoCanMessage, setWhoCanMessage] = useState('connections'); // 'everyone', 'connections'
  const [whoCanViewProjects, setWhoCanViewProjects] = useState('institution'); // 'everyone', 'institution', 'onlyme'
  const [aiPersonalization, setAiPersonalization] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);

  // Security Settings State
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [biometricLogin, setBiometricLogin] = useState(false);
  const [autoLogout, setAutoLogout] = useState('15'); // '10', '15', '30'

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

  const handleBack = () => {
    navigate('/app/profile');
  };

  // Custom Toggle Component for 2 options
  const ToggleSwitch = ({ isOn, onToggle, leftLabel, rightLabel }) => (
    <div className="flex items-center gap-3">
      <span className={`text-sm font-medium ${!isOn ? 'text-white' : 'text-gray-400'}`}>
        {leftLabel}
      </span>
      <button
        onClick={onToggle}
        className={`relative w-12 h-6 rounded-full transition-colors ${
          isOn ? 'bg-white' : 'bg-gray-400'
        }`}
      >
        <div
          className={`absolute top-1 w-4 h-4 bg-gray-600 rounded-full transition-transform ${
            isOn ? 'translate-x-7' : 'translate-x-1'
          }`}
        />
      </button>
      <span className={`text-sm font-medium ${isOn ? 'text-white' : 'text-gray-400'}`}>
        {rightLabel}
      </span>
    </div>
  );

  // Custom Toggle Component for 3 options
  const ThreeOptionToggle = ({ value, onChange, options }) => (
    <div className="flex items-center gap-2">
      {options.map((option, index) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            value === option.value
              ? 'bg-white text-gray-600'
              : 'bg-gray-400 text-white hover:bg-gray-300'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );

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
          <h1 className="font-oswald font-medium text-white text-[38px]">AXORA</h1>
          <button onClick={handleLogout} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <LogOut size={20} className="text-white" />
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Back Button */}
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 text-[#AC5757] hover:text-[#8A4A4A] transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Profile</span>
        </button>

        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Privacy & Security</h2>
          <p className="text-gray-600 text-lg">Manage your privacy settings and account security.</p>
        </div>

        {/* Privacy Section */}
        <section className="mb-12">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-[#AC5757] px-6 py-4">
              <div className="flex items-center gap-3">
                <Eye size={24} className="text-white" />
                <h3 className="text-xl font-bold text-white">Privacy</h3>
              </div>
            </div>
            
            <div className="p-6 space-y-8">
              {/* Profile & Visibility */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Profile & Visibility</h4>
                
                {/* Profile Visibility Toggle */}
                <div className="flex items-center justify-between py-4 border-b border-gray-200">
                  <div>
                    <div className="font-medium text-gray-900">Profile Visibility</div>
                    <div className="text-sm text-gray-600">Control who can see your profile and work</div>
                  </div>
                  <ThreeOptionToggle
                    value={profileVisibility}
                    onChange={setProfileVisibility}
                    options={[
                      { value: 'public', label: 'Public' },
                      { value: 'connections', label: 'Connections Only' },
                      { value: 'private', label: 'Private' }
                    ]}
                  />
                </div>

                {/* Show Activity Status */}
                <div className="flex items-center justify-between py-4 border-b border-gray-200">
                  <div>
                    <div className="font-medium text-gray-900">Show Activity Status</div>
                    <div className="text-sm text-gray-600">Let others see when you're online</div>
                  </div>
                  <ToggleSwitch
                    isOn={showActivityStatus}
                    onToggle={() => setShowActivityStatus(!showActivityStatus)}
                    leftLabel="Hidden"
                    rightLabel="Visible"
                  />
                </div>

                {/* Who Can Message Me */}
                <div className="flex items-center justify-between py-4 border-b border-gray-200">
                  <div>
                    <div className="font-medium text-gray-900">Who Can Message Me</div>
                    <div className="text-sm text-gray-600">Control who can send you direct messages</div>
                  </div>
                  <ToggleSwitch
                    isOn={whoCanMessage === 'everyone'}
                    onToggle={() => setWhoCanMessage(whoCanMessage === 'everyone' ? 'connections' : 'everyone')}
                    leftLabel="Connections Only"
                    rightLabel="Everyone"
                  />
                </div>

                {/* Who Can View My Projects */}
                <div className="flex items-center justify-between py-4">
                  <div>
                    <div className="font-medium text-gray-900">Who Can View My Projects</div>
                    <div className="text-sm text-gray-600">Control visibility of your project portfolio</div>
                  </div>
                  <ThreeOptionToggle
                    value={whoCanViewProjects}
                    onChange={setWhoCanViewProjects}
                    options={[
                      { value: 'everyone', label: 'Everyone' },
                      { value: 'institution', label: 'My Institution' },
                      { value: 'onlyme', label: 'Only Me' }
                    ]}
                  />
                </div>
              </div>

              {/* Data & Personalization */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Data & Personalization</h4>
                
                {/* AI Personalization */}
                <div className="flex items-center justify-between py-4 border-b border-gray-200">
                  <div>
                    <div className="font-medium text-gray-900">AI Personalization</div>
                    <div className="text-sm text-gray-600">Use AI to personalize your learning experience</div>
                  </div>
                  <ToggleSwitch
                    isOn={aiPersonalization}
                    onToggle={() => setAiPersonalization(!aiPersonalization)}
                    leftLabel="Off"
                    rightLabel="On"
                  />
                </div>

                {/* Data Sharing for Research */}
                <div className="flex items-center justify-between py-4">
                  <div>
                    <div className="font-medium text-gray-900">Data Sharing for Research</div>
                    <div className="text-sm text-gray-600">Help improve the platform through anonymous data sharing</div>
                  </div>
                  <ToggleSwitch
                    isOn={dataSharing}
                    onToggle={() => setDataSharing(!dataSharing)}
                    leftLabel="Off"
                    rightLabel="On"
                  />
                </div>
              </div>

              {/* Data Access */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Data Access</h4>
                
                <div className="space-y-4">
                  <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Download size={20} className="text-[#AC5757]" />
                      <div className="text-left">
                        <div className="font-medium text-gray-900">Download My Data</div>
                        <div className="text-sm text-gray-600">Get a copy of all your data</div>
                      </div>
                    </div>
                    <div className="text-[#AC5757]">→</div>
                  </button>

                  <button className="w-full flex items-center justify-between p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Trash2 size={20} className="text-red-600" />
                      <div className="text-left">
                        <div className="font-medium text-red-600">Delete My Account & Data</div>
                        <div className="text-sm text-gray-600">Permanently remove your account</div>
                      </div>
                    </div>
                    <div className="text-red-600">→</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="mb-12">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-[#AC5757] px-6 py-4">
              <div className="flex items-center gap-3">
                <Shield size={24} className="text-white" />
                <h3 className="text-xl font-bold text-white">Security</h3>
              </div>
            </div>
            
            <div className="p-6 space-y-8">
              {/* Login Security */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Login Security</h4>
                
                <div className="space-y-4">
                  <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Key size={20} className="text-[#AC5757]" />
                      <div className="text-left">
                        <div className="font-medium text-gray-900">Change Password</div>
                        <div className="text-sm text-gray-600">Update your account password</div>
                      </div>
                    </div>
                    <div className="text-[#AC5757]">→</div>
                  </button>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Smartphone size={20} className="text-[#AC5757]" />
                      <div>
                        <div className="font-medium text-gray-900">Two-Factor Authentication</div>
                        <div className="text-sm text-gray-600">Add an extra layer of security</div>
                      </div>
                    </div>
                    <ToggleSwitch
                      isOn={twoFactorAuth}
                      onToggle={() => setTwoFactorAuth(!twoFactorAuth)}
                      leftLabel="Off"
                      rightLabel="On"
                    />
                  </div>

                  <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Settings size={20} className="text-[#AC5757]" />
                      <div className="text-left">
                        <div className="font-medium text-gray-900">Active Sessions</div>
                        <div className="text-sm text-gray-600">View and manage logged-in devices</div>
                      </div>
                    </div>
                    <div className="text-[#AC5757]">→</div>
                  </button>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertTriangle size={20} className="text-[#AC5757]" />
                      <div>
                        <div className="font-medium text-gray-900">Login Alerts</div>
                        <div className="text-sm text-gray-600">Get notified of suspicious activity</div>
                      </div>
                    </div>
                    <ToggleSwitch
                      isOn={loginAlerts}
                      onToggle={() => setLoginAlerts(!loginAlerts)}
                      leftLabel="Off"
                      rightLabel="On"
                    />
                  </div>
                </div>
              </div>

              {/* Account Verification */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Account Verification</h4>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle size={20} className="text-green-600" />
                      <div>
                        <div className="font-medium text-gray-900">Email Verified</div>
                        <div className="text-sm text-gray-600">Your email address is verified</div>
                      </div>
                    </div>
                    <span className="text-green-600 text-sm font-medium">Verified</span>
                  </div>

                  <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Smartphone size={20} className="text-[#AC5757]" />
                      <div className="text-left">
                        <div className="font-medium text-gray-900">Verify Phone Number</div>
                        <div className="text-sm text-gray-600">Add phone number for account recovery</div>
                      </div>
                    </div>
                    <div className="text-[#AC5757]">→</div>
                  </button>
                </div>
              </div>

              {/* Device & App Permissions */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Device & App Permissions</h4>
                
                <div className="space-y-4">
                  <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Settings size={20} className="text-[#AC5757]" />
                      <div className="text-left">
                        <div className="font-medium text-gray-900">Manage Connected Devices</div>
                        <div className="text-sm text-gray-600">View and revoke device access</div>
                      </div>
                    </div>
                    <div className="text-[#AC5757]">→</div>
                  </button>

                  <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Shield size={20} className="text-[#AC5757]" />
                      <div className="text-left">
                        <div className="font-medium text-gray-900">Revoke Third-Party Access</div>
                        <div className="text-sm text-gray-600">Manage app integrations and permissions</div>
                      </div>
                    </div>
                    <div className="text-[#AC5757]">→</div>
                  </button>
                </div>
              </div>

              {/* Advanced Protection */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Advanced Protection</h4>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Fingerprint size={20} className="text-[#AC5757]" />
                      <div>
                        <div className="font-medium text-gray-900">Biometric Login</div>
                        <div className="text-sm text-gray-600">Use Face ID or fingerprint for quick access</div>
                      </div>
                    </div>
                    <ToggleSwitch
                      isOn={biometricLogin}
                      onToggle={() => setBiometricLogin(!biometricLogin)}
                      leftLabel="Off"
                      rightLabel="On"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Clock size={20} className="text-[#AC5757]" />
                      <div>
                        <div className="font-medium text-gray-900">Auto-Logout Timer</div>
                        <div className="text-sm text-gray-600">Automatically log out after inactivity</div>
                      </div>
                    </div>
                    <ThreeOptionToggle
                      value={autoLogout}
                      onChange={setAutoLogout}
                      options={[
                        { value: '10', label: '10 min' },
                        { value: '15', label: '15 min' },
                        { value: '30', label: '30 min' }
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Navigation Modal */}
      <NavigationModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
};

export default PrivacySecurity;
