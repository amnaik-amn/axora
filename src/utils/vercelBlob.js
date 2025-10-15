// Utility functions for interacting with Vercel Blob storage

const API_BASE_URL = '/api';

export const VercelBlobAPI = {
  // Store user signup data
  async storeSignup(userData, userType = 'student') {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userData,
          userType
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error storing signup data:', error);
      throw error;
    }
  },

  // Store user login data
  async storeLogin(email, userType = 'student', loginMethod = 'demo') {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          userType,
          loginMethod
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error storing login data:', error);
      throw error;
    }
  },

  // Store onboarding completion data
  async storeOnboardingCompletion(userId, email, userType, onboardingData) {
    try {
      const response = await fetch(`${API_BASE_URL}/onboarding/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          email,
          userType,
          onboardingData
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error storing onboarding completion data:', error);
      throw error;
    }
  }
};

export default VercelBlobAPI;
