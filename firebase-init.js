// Firebase configuration - TODO: Replace with your actual Firebase config
var firebaseConfig = {
    apiKey: "AIzaSyCvDhdJStkSvn1MveuKVx_E1RHMlWCNg8E",
    authDomain: "jlpt-web-app.firebaseapp.com",
    projectId: "jlpt-web-app",
    storageBucket: "jlpt-web-app.firebasestorage.app",
    messagingSenderId: "462847813365",
    appId: "1:462847813365:web:cf3eb46ccba1d81a5847bc",
    measurementId: "G-PCYGP0JNCQ"
};

firebase.initializeApp(firebaseConfig);
var analytics = firebase.analytics();

// Helper to log events safely
function logEvent(eventName, params) {
  try {
    analytics.logEvent(eventName, params || {});
  } catch (e) {
    // silently ignore analytics errors
  }
}
