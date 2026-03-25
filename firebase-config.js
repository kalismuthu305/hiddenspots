// ===================================
// FIREBASE CONFIGURATION
// ===================================
// IMPORTANT: Replace these values with your actual Firebase project credentials
// Go to Firebase Console > Project Settings > Your Apps > Web App
// Copy the configuration object and paste it here

const firebaseConfig = {
    apiKey: "AIzaSyDKb-6CYkpRLciCXTEdY0hf7FivnR8YOj8",
    authDomain: "hidden-spots-9309c.firebaseapp.com",
    projectId: "hidden-spots-9309c",
    // storageBucket: "hidden-spots-9309c.firebasestorage.app",
    // storageBucket: "hidden-spots-9309c.appspot.com",
    storageBucket: "hidden-spots-9309c.appspot.com",
    messagingSenderId: "649407179171",
    appId: "1:649407179171:web:f1799350da7cc1f75a1216",
    measurementId: "G-YNXHKCB5TN"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Services
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Enable Firestore persistence for offline support
db.enablePersistence()
    .catch((err) => {
        if (err.code === 'failed-precondition') {
            console.log('Multiple tabs open, persistence can only be enabled in one tab at a time.');
        } else if (err.code === 'unimplemented') {
            console.log('The current browser does not support persistence.');
        }
    });

// ===================================
// FIRESTORE COLLECTIONS REFERENCE
// ===================================
const COLLECTIONS = {
    USERS: 'users',
    PLACES: 'places',
    REVIEWS: 'reviews',
    FAVORITES: 'favorites'
};

// ===================================
// HELPER FUNCTIONS FOR FIRESTORE
// ===================================

/**
 * Generate a unique ID
 */
function generateId() {
    return db.collection('_').doc().id;
}

/**
 * Get current timestamp
 */
function getTimestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
}

/**
 * Convert Firestore timestamp to Date
 */
function timestampToDate(timestamp) {
    if (!timestamp) return null;
    if (timestamp.toDate) return timestamp.toDate();
    return new Date(timestamp);
}

/**
 * Format date for display
 */
function formatDate(date) {
    if (!date) return 'Unknown';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}

/**
 * Format relative time
 */
function formatRelativeTime(date) {
    if (!date) return 'Unknown';
    const now = new Date();
    const diff = now - new Date(date);
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 7) return formatDate(date);
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
}

// ===================================
// DATABASE STRUCTURE
// ===================================
/*
Collections:

1. users
   - uid (document ID)
   - name: string
   - email: string
   - profileImage: string (URL)
   - bio: string
   - createdAt: timestamp
   - updatedAt: timestamp

2. places
   - id (document ID, auto-generated)
   - name: string
   - description: string
   - category: string (nature, food, history, adventure, quiet, culture, views)
   - mood: string (peaceful, romantic, adventurous, family-friendly, photogenic, spiritual)
   - address: string
   - latitude: number
   - longitude: number
   - images: array of strings (URLs)
   - bestTime: string
   - cost: string
   - crowdLevel: string (low, medium, high)
   - userId: string (reference to user who added)
   - userName: string
   - rating: number (average)
   - reviewCount: number
   - status: string (active, pending, rejected)
   - createdAt: timestamp
   - updatedAt: timestamp

3. reviews
   - id (document ID, auto-generated)
   - placeId: string
   - userId: string
   - userName: string
   - userImage: string
   - rating: number (1-5)
   - comment: string
   - createdAt: timestamp
   - updatedAt: timestamp

4. favorites
   - id (document ID)
   - userId: string
   - placeId: string
   - createdAt: timestamp
*/

console.log('Firebase initialized successfully!');