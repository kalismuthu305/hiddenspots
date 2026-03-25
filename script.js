// ===================================
// APP STATE & CONFIGURATION
// ===================================
const appState = {
    places: [],
    filteredPlaces: [],
    userLocation: null,
    currentCategory: 'all',
    currentRadius: 10,
    currentUser: null,
    favorites: [],
    userReviews: [],
    map: null,
    markers: [],
    currentMarker: null,
    lastVisible: null, // For pagination
    isLoading: false,
    selectedRating: 0,
    currentPlaceId: null,
    carouselIndex: 0,
    carouselImages: [],
    weatherData: null
};

// ===================================
// SAMPLE DATA (Fallback when Firebase is not configured)
// ===================================
const samplePlaces = [
    {
        id: 'sample1',
        name: "Secret Garden Café",
        category: "food",
        mood: "peaceful",
        description: "A hidden café tucked away in an old garden with vintage furniture and homemade pastries. Perfect for quiet reading or intimate conversations. The owner grows herbs and flowers right in the garden.",
        address: "42 Blossom Lane, Downtown",
        bestTime: "Morning, Afternoon",
        cost: "$$ - Moderate",
        rating: 4.8,
        reviewCount: 127,
        crowdLevel: "low",
        latitude: 13.0827,
        longitude: 80.2707,
        images: [
            "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600",
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600"
        ],
        userId: 'system',
        userName: 'HiddenGems Team',
        status: 'active',
        createdAt: new Date()
    },
    {
        id: 'sample2',
        name: "Riverside Trail",
        category: "nature",
        mood: "adventurous",
        description: "A scenic walking trail along the river that most locals don't know about. Offers stunning views and connects to hidden waterfalls. Great for morning jogs or sunset walks.",
        address: "River Road, East Side",
        bestTime: "Sunrise, Sunset",
        cost: "Free",
        rating: 4.6,
        reviewCount: 89,
        crowdLevel: "medium",
        latitude: 13.0527,
        longitude: 80.2507,
        images: [
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600",
            "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600"
        ],
        userId: 'system',
        userName: 'HiddenGems Team',
        status: 'active',
        createdAt: new Date()
    },
    {
        id: 'sample3',
        name: "Old Library Archives",
        category: "history",
        mood: "spiritual",
        description: "A lesser-known section of the public library housing rare manuscripts and historical documents. The atmosphere is serene and scholarly, perfect for history buffs.",
        address: "123 Heritage Street",
        bestTime: "Weekdays, Morning",
        cost: "Free",
        rating: 4.9,
        reviewCount: 203,
        crowdLevel: "low",
        latitude: 13.0627,
        longitude: 80.2807,
        images: [
            "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600",
            "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600"
        ],
        userId: 'system',
        userName: 'HiddenGems Team',
        status: 'active',
        createdAt: new Date()
    },
    {
        id: 'sample4',
        name: "Rooftop Sunset Point",
        category: "views",
        mood: "romantic",
        description: "An unmarked rooftop access that provides breathtaking panoramic views of the city. Locals come here for the most spectacular sunsets away from tourist crowds.",
        address: "Top of 88 Market Street",
        bestTime: "Sunset, Evening",
        cost: "Free",
        rating: 4.7,
        reviewCount: 156,
        crowdLevel: "high",
        latitude: 13.0727,
        longitude: 80.2607,
        images: [
            "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600",
            "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600"
        ],
        userId: 'system',
        userName: 'HiddenGems Team',
        status: 'active',
        createdAt: new Date()
    },
    {
        id: 'sample5',
        name: "Underground Art Gallery",
        category: "culture",
        mood: "photogenic",
        description: "A converted basement showcasing local artists' works in an intimate setting. Rotating exhibitions feature emerging talents and experimental pieces.",
        address: "Basement, 45 Art District Ave",
        bestTime: "Weekends, Afternoon",
        cost: "$5 Suggested Donation",
        rating: 4.5,
        reviewCount: 78,
        crowdLevel: "low",
        latitude: 13.0927,
        longitude: 80.2907,
        images: [
            "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=600",
            "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600"
        ],
        userId: 'system',
        userName: 'HiddenGems Team',
        status: 'active',
        createdAt: new Date()
    },
    {
        id: 'sample6',
        name: "Hidden Waterfall",
        category: "nature",
        mood: "peaceful",
        description: "A secluded waterfall accessible via a short, unmarked trail. The sound of cascading water creates a natural meditation spot. Best visited after rainfall.",
        address: "End of Pine Trail Road",
        bestTime: "Morning, After Rain",
        cost: "Free",
        rating: 4.8,
        reviewCount: 92,
        crowdLevel: "low",
        latitude: 13.1027,
        longitude: 80.2407,
        images: [
            "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=600",
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600"
        ],
        userId: 'system',
        userName: 'HiddenGems Team',
        status: 'active',
        createdAt: new Date()
    }
];

// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

async function initializeApp() {
    console.log('Initializing HiddenGems App...');
    
    // Initialize UI components
    initializeNavigation();
    initializeSearch();
    initializeFilters();
    initializeForms();
    initializeModals();
    initializeProfile();
    
    // Initialize Map
    initializeMap();
    
    // Load initial data
    await loadPlaces(true);
    
    // Initialize weather
    initializeWeather();
    
    // Check authentication state
    checkAuthState();
    
    // Update stats
    updateStats();
    
    console.log('HiddenGems App initialized successfully!');
}

// ===================================
// NAVIGATION
// ===================================
function initializeNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    //profile page navigation
    // script.js
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("profileNavBtn");
  if (btn) {
    btn.addEventListener("click", function () {
      window.location.href = "profile.html";
    });
  }
});
    
    // Close menu when clicking on a link
    navMenu?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuBtn?.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    });
    
    // Profile navigation
    document.getElementById('profileNavBtn')?.addEventListener('click', (e) => {
        e.preventDefault();
        if (appState.currentUser) {
            showProfile();
        } else {
            showToast('Please login to view your profile', 'info');
            openAuthModal();
        }
    });
}

// ===================================
// AUTHENTICATION
// ===================================
function checkAuthState() {
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            appState.currentUser = user;
            await loadUserData(user.uid);
            updateUIForLoggedInUser();
        } else {
            appState.currentUser = null;
            updateUIForLoggedOutUser();
        }
    });
}

async function loadUserData(uid) {
    try {
        const userDoc = await db.collection(COLLECTIONS.USERS).doc(uid).get();
        if (userDoc.exists) {
            appState.currentUser = { ...appState.currentUser, ...userDoc.data(), uid };
        }
        
        // Load user favorites
        await loadUserFavorites(uid);
        
        // Load user reviews
        await loadUserReviews(uid);
    } catch (error) {
        console.error('Error loading user data:', error);
    }
}

async function loadUserFavorites(uid) {
    try {
        const snapshot = await db.collection(COLLECTIONS.FAVORITES)
            .where('userId', '==', uid)
            .get();
        
        appState.favorites = snapshot.docs.map(doc => doc.data().placeId);
    } catch (error) {
        console.error('Error loading favorites:', error);
    }
}

async function loadUserReviews(uid) {
    try {
        const snapshot = await db.collection(COLLECTIONS.REVIEWS)
            .where('userId', '==', uid)
            .get();
        
        appState.userReviews = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error loading reviews:', error);
    }
}

function updateUIForLoggedInUser() {
    const authBtn = document.getElementById('authBtn');
    const profileSection = document.getElementById('profile');
    
    if (authBtn) {
        authBtn.textContent = 'Logout';
        authBtn.removeEventListener('click', openAuthModal);
        authBtn.addEventListener('click', handleLogout);
    }
    
    // Update profile section
    if (appState.currentUser) {
        document.getElementById('profileName').textContent = appState.currentUser.name || appState.currentUser.email;
        document.getElementById('profileEmail').textContent = appState.currentUser.email;
        document.getElementById('profileAvatar').src = appState.currentUser.profileImage || 'https://via.placeholder.com/150';
        
        // Update profile stats
        document.getElementById('userFavoritesCount').textContent = appState.favorites.length;
        document.getElementById('userReviewsCount').textContent = appState.userReviews.length;
    }
}

function updateUIForLoggedOutUser() {
    const authBtn = document.getElementById('authBtn');
    
    if (authBtn) {
        authBtn.textContent = 'Login';
        authBtn.removeEventListener('click', handleLogout);
        authBtn.addEventListener('click', openAuthModal);
    }
}

async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const btn = e.target.querySelector('.submit-btn');
    
    showButtonLoader(btn, true);
    
    try {
        await auth.signInWithEmailAndPassword(email, password);
        closeAuthModal();
        showToast('Welcome back!', 'success');
    } catch (error) {
        console.error('Login error:', error);
        showToast(getFirebaseErrorMessage(error.code), 'error');
    } finally {
        showButtonLoader(btn, false);
    }
}

async function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const btn = e.target.querySelector('.submit-btn');
    
    if (password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }
    
    if (password.length < 6) {
        showToast('Password must be at least 6 characters', 'error');
        return;
    }
    
    showButtonLoader(btn, true);
    
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        
        // Create user profile in Firestore
        await db.collection(COLLECTIONS.USERS).doc(userCredential.user.uid).set({
            name,
            email,
            profileImage: null,
            bio: '',
            createdAt: getTimestamp(),
            updatedAt: getTimestamp()
        });
        
        closeAuthModal();
        showToast('Welcome to HiddenGems!', 'success');
    } catch (error) {
        console.error('Registration error:', error);
        showToast(getFirebaseErrorMessage(error.code), 'error');
    } finally {
        showButtonLoader(btn, false);
    }
}

async function handleGoogleSignIn() {
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await auth.signInWithPopup(provider);
        
        // Check if user profile exists, if not create one
        const userDoc = await db.collection(COLLECTIONS.USERS).doc(result.user.uid).get();
        
        if (!userDoc.exists) {
            await db.collection(COLLECTIONS.USERS).doc(result.user.uid).set({
                name: result.user.displayName || 'Explorer',
                email: result.user.email,
                profileImage: result.user.photoURL,
                bio: '',
                createdAt: getTimestamp(),
                updatedAt: getTimestamp()
            });
        }
        
        closeAuthModal();
        showToast('Welcome to HiddenGems!', 'success');
    } catch (error) {
        console.error('Google sign-in error:', error);
        showToast(getFirebaseErrorMessage(error.code), 'error');
    }
}

async function handleLogout() {
    try {
        await auth.signOut();
        appState.currentUser = null;
        appState.favorites = [];
        appState.userReviews = [];
        showToast('Logged out successfully', 'success');
        hideProfile();
    } catch (error) {
        console.error('Logout error:', error);
        showToast('Error logging out', 'error');
    }
}

function getFirebaseErrorMessage(code) {
    const messages = {
        'auth/email-already-in-use': 'This email is already registered',
        'auth/invalid-email': 'Invalid email address',
        'auth/weak-password': 'Password is too weak',
        'auth/user-not-found': 'No account found with this email',
        'auth/wrong-password': 'Incorrect password',
        'auth/too-many-requests': 'Too many attempts. Please try again later',
        'auth/popup-closed-by-user': 'Sign-in popup was closed'
    };
    return messages[code] || 'An error occurred. Please try again.';
}

// ===================================
// SEARCH FUNCTIONALITY
// ===================================
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const locationBtn = document.getElementById('useLocation');
    const radiusSlider = document.getElementById('radiusSlider');
    const radiusValue = document.getElementById('radiusValue');
    
    // Search on button click
    searchBtn?.addEventListener('click', () => performSearch(searchInput.value));
    
    // Search on Enter key
    searchInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch(searchInput.value);
    });
    
    // Get user location
    locationBtn?.addEventListener('click', getUserLocation);
    
    // Radius slider
    radiusSlider?.addEventListener('input', (e) => {
        appState.currentRadius = parseInt(e.target.value);
        radiusValue.textContent = appState.currentRadius;
        
        if (appState.userLocation) {
            filterPlacesByRadius();
        }
    });
}

function performSearch(query) {
    query = query.toLowerCase().trim();
    
    if (!query) {
        loadPlaces(true);
        return;
    }
    
    const filteredPlaces = appState.places.filter(place => {
        return (
            place.name.toLowerCase().includes(query) ||
            place.description.toLowerCase().includes(query) ||
            place.category.toLowerCase().includes(query) ||
            place.mood?.toLowerCase().includes(query) ||
            place.address.toLowerCase().includes(query)
        );
    });
    
    displayPlaces(filteredPlaces);
    showToast(`Found ${filteredPlaces.length} place${filteredPlaces.length !== 1 ? 's' : ''}`, 'info');
}

function getUserLocation() {
    if (!navigator.geolocation) {
        showToast('Geolocation is not supported by your browser', 'error');
        return;
    }
    
    showToast('Getting your location...', 'info');
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            appState.userLocation = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
            
            // Update map view
            if (appState.map) {
                appState.map.setView([appState.userLocation.latitude, appState.userLocation.longitude], 14);
                
                // Add user marker
                if (appState.currentMarker) {
                    appState.map.removeLayer(appState.currentMarker);
                }
                
                const userIcon = L.divIcon({
                    className: 'user-marker',
                    html: '<div class="user-marker-inner">📍</div>',
                    iconSize: [30, 30]
                });
                
                appState.currentMarker = L.marker(
                    [appState.userLocation.latitude, appState.userLocation.longitude],
                    { icon: userIcon }
                ).addTo(appState.map).bindPopup('You are here');
            }
            
            showToast('Location found!', 'success');
            filterPlacesByRadius();
        },
        (error) => {
            console.error('Geolocation error:', error);
            showToast('Unable to get your location. Please enable location services.', 'error');
        }
    );
}

function filterPlacesByRadius() {
    if (!appState.userLocation) return;
    
    const filteredPlaces = appState.places.filter(place => {
        const distance = calculateDistance(
            appState.userLocation.latitude,
            appState.userLocation.longitude,
            place.latitude,
            place.longitude
        );
        return distance <= appState.currentRadius;
    });
    
    displayPlaces(filteredPlaces);
    updateMapMarkers(filteredPlaces);
    showToast(`Found ${filteredPlaces.length} places within ${appState.currentRadius}km`, 'info');
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    // Haversine formula
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// ===================================
// CATEGORY FILTERS
// ===================================
function initializeFilters() {
    const filterToggle = document.getElementById('filterToggle');
    const filterSection = document.getElementById('filterSection');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const mapRadiusSelect = document.getElementById('mapRadiusSelect');
    
    // Toggle filter visibility
    filterToggle?.addEventListener('click', () => {
        filterSection?.classList.toggle('hidden');
    });
    
    // Category filter buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const category = button.dataset.category;
            appState.currentCategory = category;
            filterByCategory(category);
        });
    });
    
    // Map radius select
    mapRadiusSelect?.addEventListener('change', (e) => {
        appState.currentRadius = parseInt(e.target.value);
        if (appState.userLocation) {
            filterPlacesByRadius();
        }
    });
}

function filterByCategory(category) {
    if (category === 'all') {
        displayPlaces(appState.places);
        updateMapMarkers(appState.places);
    } else {
        const filteredPlaces = appState.places.filter(place => place.category === category);
        displayPlaces(filteredPlaces);
        updateMapMarkers(filteredPlaces);
    }
}

// ===================================
// PLACES LOADING & DISPLAY
// ===================================
async function loadPlaces(initialLoad = false) {
    if (appState.isLoading) return;
    
    appState.isLoading = true;
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) loadMoreBtn.disabled = true;
    
    try {
        let query = db.collection(COLLECTIONS.PLACES)
            .where('status', '==', 'active')
            .orderBy('createdAt', 'desc')
            .limit(6);
        
        if (appState.lastVisible && !initialLoad) {
            query = query.startAfter(appState.lastVisible);
        }
        
        const snapshot = await query.get();
        
        if (initialLoad) {
            appState.places = [];
        }
        
        const newPlaces = [];
        snapshot.forEach(doc => {
            const place = { id: doc.id, ...doc.data() };
            newPlaces.push(place);
            appState.places.push(place);
        });
        
        if (newPlaces.length > 0) {
            appState.lastVisible = snapshot.docs[snapshot.docs.length - 1];
            displayPlaces(appState.places);
            updateMapMarkers(appState.places);
        }
        
        // Hide load more button if no more places
        if (snapshot.empty || newPlaces.length < 6) {
            if (loadMoreBtn) loadMoreBtn.style.display = 'none';
        }
        
    } catch (error) {
        console.error('Error loading places:', error);
        
        // Use sample data as fallback
        if (initialLoad && appState.places.length === 0) {
            appState.places = samplePlaces;
            displayPlaces(appState.places);
            updateMapMarkers(appState.places);
        }
    } finally {
        appState.isLoading = false;
        if (loadMoreBtn) loadMoreBtn.disabled = false;
    }
}

function displayPlaces(places) {
    const placesGrid = document.getElementById('placesGrid');
    if (!placesGrid) return;
    
    if (places.length === 0) {
        placesGrid.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">🔍</div>
                <h3>No places found</h3>
                <p>Try adjusting your search or filters</p>
            </div>
        `;
        return;
    }
    
    placesGrid.innerHTML = places.map(place => createPlaceCard(place)).join('');
    
    // Add click events
    placesGrid.querySelectorAll('.place-card').forEach(card => {
        card.addEventListener('click', () => {
            const placeId = card.dataset.id;
            openPlaceDetail(placeId);
        });
    });
}

function createPlaceCard(place) {
    const crowdClass = place.crowdLevel === 'high' ? 'high' : 
                       place.crowdLevel === 'medium' ? 'medium' : '';
    const categoryEmoji = getCategoryEmoji(place.category);
    const crowdLevelText = (place.crowdLevel || 'low').charAt(0).toUpperCase() + 
                           (place.crowdLevel || 'low').slice(1) + ' Crowd';
    const isFavorite = appState.favorites.includes(place.id);
    
    return `
        <div class="place-card" data-id="${place.id}">
            <div class="place-image">
                <img src="${place.images?.[0] || 'https://via.placeholder.com/400x300'}" alt="${place.name}" loading="lazy">
                <span class="place-category-badge">${categoryEmoji} ${capitalizeFirst(place.category)}</span>
                <span class="place-rating-badge">★ ${(place.rating || 0).toFixed(1)}</span>
                ${isFavorite ? '<span class="favorite-indicator">❤️</span>' : ''}
            </div>
            <div class="place-content">
                <h3 class="place-title">${place.name}</h3>
                <p class="place-description">${place.description}</p>
                <div class="place-meta">
                    <span class="place-meta-item">📍 ${place.address}</span>
                    <span class="place-meta-item">💰 ${place.cost || 'Free'}</span>
                </div>
                <div class="place-footer">
                    <span class="place-mood">💭 ${capitalizeFirst(place.mood || 'peaceful')}</span>
                    <div class="place-crowd">
                        <div class="crowd-indicator ${crowdClass}"></div>
                        <span>${crowdLevelText}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getCategoryEmoji(category) {
    const emojis = {
        nature: '🌿',
        food: '🍽️',
        history: '🏛️',
        adventure: '🧗',
        quiet: '😌',
        culture: '🎭',
        views: '🌄'
    };
    return emojis[category] || '📍';
}

function capitalizeFirst(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ===================================
// MAP INTEGRATION
// ===================================
function initializeMap() {
    const mapContainer = document.getElementById('mapContainer');
    if (!mapContainer) return;
    
    // Default location (Chennai, India)
    const defaultLocation = [13.0827, 80.2707];
    
    // Initialize map
    appState.map = L.map('mapContainer').setView(defaultLocation, 12);
    
    // Define tile layers
    const streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    });
    
    const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '© Esri',
        maxZoom: 19
    });
    
    const terrainLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenTopoMap',
        maxZoom: 17
    });
    
    // Add default layer
    streetLayer.addTo(appState.map);
    
    let currentLayer = streetLayer;
    
    // Layer control buttons
    document.getElementById('streetViewBtn')?.addEventListener('click', () => {
        appState.map.removeLayer(currentLayer);
        currentLayer = streetLayer;
        currentLayer.addTo(appState.map);
        updateMapButtons('streetViewBtn');
    });
    
    document.getElementById('satelliteViewBtn')?.addEventListener('click', () => {
        appState.map.removeLayer(currentLayer);
        currentLayer = satelliteLayer;
        currentLayer.addTo(appState.map);
        updateMapButtons('satelliteViewBtn');
    });
    
    document.getElementById('terrainViewBtn')?.addEventListener('click', () => {
        appState.map.removeLayer(currentLayer);
        currentLayer = terrainLayer;
        currentLayer.addTo(appState.map);
        updateMapButtons('terrainViewBtn');
    });
    
    document.getElementById('resetMapBtn')?.addEventListener('click', () => {
        appState.map.setView(defaultLocation, 12);
    });
    
    document.getElementById('myLocationBtn')?.addEventListener('click', getUserLocation);
    
    // Try to get user location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                appState.userLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                appState.map.setView([appState.userLocation.latitude, appState.userLocation.longitude], 14);
            },
            () => {
                console.log('Could not get user location');
            }
        );
    }
}

function updateMapButtons(activeBtnId) {
    document.querySelectorAll('.map-control-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(activeBtnId)?.classList.add('active');
}

function updateMapMarkers(places) {
    if (!appState.map) return;
    
    // Clear existing markers
    appState.markers.forEach(marker => appState.map.removeLayer(marker));
    appState.markers = [];
    
    // Add new markers
    places.forEach(place => {
        if (!place.latitude || !place.longitude) return;
        
        const categoryColors = {
            nature: '#22c55e',
            food: '#f97316',
            history: '#8b5cf6',
            adventure: '#ef4444',
            quiet: '#06b6d4',
            culture: '#ec4899',
            views: '#f59e0b'
        };
        
        const color = categoryColors[place.category] || '#6366f1';
        
        const icon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="background: ${color}; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });
        
        const marker = L.marker([place.latitude, place.longitude], { icon })
            .addTo(appState.map)
            .bindPopup(`
                <div style="min-width: 200px;">
                    <img src="${place.images?.[0] || 'https://via.placeholder.com/200'}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;">
                    <h4 style="margin: 0 0 5px; font-weight: 600;">${place.name}</h4>
                    <p style="margin: 0; font-size: 12px; opacity: 0.7;">★ ${(place.rating || 0).toFixed(1)} • ${place.reviewCount || 0} reviews</p>
                    <button onclick="openPlaceDetail('${place.id}')" style="margin-top: 8px; padding: 5px 15px; background: #6366f1; color: white; border: none; border-radius: 5px; cursor: pointer; width: 100%;">View Details</button>
                </div>
            `, { maxWidth: 250 });
        
        appState.markers.push(marker);
    });
}

// ===================================
// FORMS
// ===================================
function initializeForms() {
    const suggestForm = document.getElementById('suggestForm');
    const autoFillLocation = document.getElementById('autoFillLocation');
    const imageInput = document.getElementById('placeImages');
    const imageUploadPlaceholder = document.getElementById('imageUploadPlaceholder');
    const avatarInput = document.getElementById('avatarInput');
    
    // Suggest place form
    suggestForm?.addEventListener('submit', handleSuggestPlace);
    
    // Auto-fill location
    autoFillLocation?.addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    document.getElementById('latitude').value = position.coords.latitude.toFixed(6);
                    document.getElementById('longitude').value = position.coords.longitude.toFixed(6);
                    showToast('Location filled!', 'success');
                    
                    // Reverse geocode to get address
                    reverseGeocode(position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    showToast('Could not get location', 'error');
                }
            );
        }
    });
    
    // Image upload
    imageUploadPlaceholder?.addEventListener('click', () => imageInput?.click());
    
    imageInput?.addEventListener('change', handleImageUpload);
    
    // Avatar upload
    avatarInput?.addEventListener('change', handleAvatarUpload);
}

async function handleSuggestPlace(e) {
    e.preventDefault();
    
    if (!appState.currentUser) {
        showToast('Please login to suggest a place', 'error');
        openAuthModal();
        return;
    }
    
    const btn = document.getElementById('submitPlaceBtn');
    showButtonLoader(btn, true);
    
    try {
        const placeData = {
            name: document.getElementById('placeName').value,
            category: document.getElementById('placeCategory').value,
            mood: document.getElementById('placeMood').value || 'peaceful',
            description: document.getElementById('placeDescription').value,
            address: document.getElementById('placeAddress').value,
            latitude: parseFloat(document.getElementById('latitude').value),
            longitude: parseFloat(document.getElementById('longitude').value),
            bestTime: document.getElementById('bestTime').value || 'Anytime',
            cost: document.getElementById('entryCost').value || 'Free',
            crowdLevel: 'low',
            images: [],
            userId: appState.currentUser.uid,
            userName: appState.currentUser.name || appState.currentUser.email,
            rating: 0,
            reviewCount: 0,
            status: 'active',
            createdAt: getTimestamp(),
            updatedAt: getTimestamp()
        };
        
        // Upload images if any
        const imageFiles = document.getElementById('placeImages')?.files;
        if (imageFiles && imageFiles.length > 0) {
            const uploadPromises = [];
            for (let i = 0; i < Math.min(imageFiles.length, 5); i++) {
                uploadPromises.push(uploadImage(imageFiles[i], 'places'));
            }
            placeData.images = await Promise.all(uploadPromises);
        } else {
            // Use default image
            placeData.images = ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600'];
        }
        
        // Save to Firestore
        await db.collection(COLLECTIONS.PLACES).add(placeData);
        
        // Reset form
        document.getElementById('suggestForm').reset();
        document.getElementById('uploadedImages').innerHTML = '';
        
        // Reload places
        await loadPlaces(true);
        
        showToast('Place submitted successfully!', 'success');
        
        // Scroll to places section
        document.getElementById('places')?.scrollIntoView({ behavior: 'smooth' });
        
    } catch (error) {
        console.error('Error submitting place:', error);
        showToast('Error submitting place. Please try again.', 'error');
    } finally {
        showButtonLoader(btn, false);
    }
}

async function handleImageUpload(e) {
    const files = e.target.files;
    const uploadedImages = document.getElementById('uploadedImages');
    if (!uploadedImages) return;
    
    uploadedImages.innerHTML = '';
    
    for (let i = 0; i < Math.min(files.length, 5); i++) {
        const file = files[i];
        const reader = new FileReader();
        
        reader.onload = (event) => {
            const imageDiv = document.createElement('div');
            imageDiv.className = 'uploaded-image';
            imageDiv.innerHTML = `
                <img src="${event.target.result}" alt="Preview">
                <button type="button" class="remove-image" data-index="${i}">×</button>
            `;
            uploadedImages.appendChild(imageDiv);
        };
        
        reader.readAsDataURL(file);
    }
}

async function handleAvatarUpload(e) {
    const file = e.target.files[0];
    if (!file || !appState.currentUser) return;
    
    try {
        showToast('Uploading avatar...', 'info');
        
        const url = await uploadImage(file, 'avatars');
        
        // Update user profile
        await db.collection(COLLECTIONS.USERS).doc(appState.currentUser.uid).update({
            profileImage: url,
            updatedAt: getTimestamp()
        });
        
        // Update UI
        document.getElementById('profileAvatar').src = url;
        appState.currentUser.profileImage = url;
        
        showToast('Avatar updated!', 'success');
    } catch (error) {
        console.error('Error uploading avatar:', error);
        showToast('Error uploading avatar', 'error');
    }
}

async function uploadImage(file, folder) {
    const fileName = `${folder}/${Date.now()}_${file.name}`;
    const storageRef = storage.ref(fileName);
    
    const uploadTask = await storageRef.put(file);
    return await uploadTask.ref.getDownloadURL();
}

async function reverseGeocode(lat, lng) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
        const data = await response.json();
        
        if (data.display_name) {
            document.getElementById('placeAddress').value = data.display_name;
        }
    } catch (error) {
        console.error('Reverse geocoding error:', error);
    }
}

// ===================================
// MODALS
// ===================================
function initializeModals() {
    // Auth modal
    document.getElementById('closeAuthModal')?.addEventListener('click', closeAuthModal);
    
    // Auth tabs
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const tabType = tab.dataset.tab;
            if (tabType === 'login') {
                document.getElementById('loginForm')?.classList.remove('hidden');
                document.getElementById('registerForm')?.classList.add('hidden');
            } else {
                document.getElementById('loginForm')?.classList.add('hidden');
                document.getElementById('registerForm')?.classList.remove('hidden');
            }
        });
    });
    
    // Login/Register forms
    document.getElementById('loginForm')?.addEventListener('submit', handleLogin);
    document.getElementById('registerForm')?.addEventListener('submit', handleRegister);
    
    // Google Sign In
    document.getElementById('googleSignInBtn')?.addEventListener('click', handleGoogleSignIn);
    
    // Place detail modal
    document.getElementById('closePlaceDetailModal')?.addEventListener('click', closePlaceDetailModal);
    
    // Close modal on backdrop click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
    
    // Star rating
    initializeStarRating();
    
    // Carousel
    initializeCarousel();
}

function openAuthModal() {
    document.getElementById('authModal')?.classList.add('active');
}

function closeAuthModal() {
    document.getElementById('authModal')?.classList.remove('active');
}

// ===================================
// PLACE DETAIL
// ===================================
async function openPlaceDetail(placeId) {
    appState.currentPlaceId = placeId;
    const place = appState.places.find(p => p.id === placeId);
    
    if (!place) {
        // Try to fetch from Firestore
        try {
            const doc = await db.collection(COLLECTIONS.PLACES).doc(placeId).get();
            if (doc.exists) {
                place = { id: doc.id, ...doc.data() };
                appState.places.push(place);
            }
        } catch (error) {
            console.error('Error fetching place:', error);
            showToast('Place not found', 'error');
            return;
        }
    }
    
    if (!place) {
        showToast('Place not found', 'error');
        return;
    }
    
    // Update modal content
    document.getElementById('placeDetailName').textContent = place.name;
    document.getElementById('placeDetailCategory').textContent = `${getCategoryEmoji(place.category)} ${capitalizeFirst(place.category)}`;
    document.getElementById('placeDetailMood').textContent = capitalizeFirst(place.mood || 'peaceful');
    document.getElementById('placeDetailDescription').textContent = place.description;
    document.getElementById('placeDetailAddress').textContent = place.address;
    document.getElementById('placeDetailBestTime').textContent = place.bestTime || 'Anytime';
    document.getElementById('placeDetailCost').textContent = place.cost || 'Free';
    document.getElementById('placeDetailCrowd').textContent = `${capitalizeFirst(place.crowdLevel || 'low')} Crowd`;
    document.getElementById('placeDetailRatingScore').textContent = (place.rating || 0).toFixed(1);
    document.getElementById('placeDetailRatingCount').textContent = `(${place.reviewCount || 0} reviews)`;
    document.getElementById('placeSubmittedBy').textContent = place.userName || 'Anonymous';
    
    // Update rating stars
    updateRatingStars(place.rating || 0);
    
    // Update images carousel
    appState.carouselImages = place.images || ['https://via.placeholder.com/800x400'];
    appState.carouselIndex = 0;
    updateCarousel();
    
    // Setup action buttons
    setupPlaceActions(place);
    
    // Load reviews
    await loadReviews(placeId);
    
    // Initialize preview map
    setTimeout(() => {
        if (place.latitude && place.longitude) {
            const previewMap = L.map('placeMapPreview').setView([place.latitude, place.longitude], 15);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap'
            }).addTo(previewMap);
            L.marker([place.latitude, place.longitude]).addTo(previewMap);
        }
    }, 100);
    
    // Show modal
    document.getElementById('placeDetailModal')?.classList.add('active');
}

function closePlaceDetailModal() {
    document.getElementById('placeDetailModal')?.classList.remove('active');
    appState.currentPlaceId = null;
    
    // Destroy preview map
    const previewMap = document.getElementById('placeMapPreview');
    if (previewMap && previewMap._leaflet_id) {
        previewMap._leaflet_id = null;
        previewMap.innerHTML = '';
    }
}

function updateRatingStars(rating) {
    const starsContainer = document.getElementById('placeDetailRatingStars');
    if (!starsContainer) return;
    
    starsContainer.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.className = `star ${i <= Math.round(rating) ? 'filled' : ''}`;
        star.textContent = '★';
        starsContainer.appendChild(star);
    }
}

function setupPlaceActions(place) {
    const favoriteBtn = document.getElementById('favoriteBtn');
    const shareBtn = document.getElementById('shareBtn');
    const directionsBtn = document.getElementById('directionsBtn');
    
    // Favorite button
    const isFavorite = appState.favorites.includes(place.id);
    updateFavoriteButton(favoriteBtn, isFavorite);
    
    favoriteBtn?.addEventListener('click', () => toggleFavorite(place.id));
    
    // Share button
    shareBtn?.addEventListener('click', () => sharePlace(place));
    
    // Directions button
    directionsBtn?.addEventListener('click', () => openDirections(place));
}

function updateFavoriteButton(btn, isFavorite) {
    if (!btn) return;
    btn.innerHTML = isFavorite ? 
        '<span class="btn-icon">❤️</span> Saved' : 
        '<span class="btn-icon">🤍</span> Save';
    btn.classList.toggle('active', isFavorite);
}

async function toggleFavorite(placeId) {
    if (!appState.currentUser) {
        showToast('Please login to save favorites', 'info');
        openAuthModal();
        return;
    }
    
    try {
        const favoriteRef = db.collection(COLLECTIONS.FAVORITES)
            .where('userId', '==', appState.currentUser.uid)
            .where('placeId', '==', placeId);
        
        const snapshot = await favoriteRef.get();
        
        if (snapshot.empty) {
            // Add to favorites
            await db.collection(COLLECTIONS.FAVORITES).add({
                userId: appState.currentUser.uid,
                placeId: placeId,
                createdAt: getTimestamp()
            });
            
            appState.favorites.push(placeId);
            showToast('Added to favorites!', 'success');
        } else {
            // Remove from favorites
            snapshot.docs[0].ref.delete();
            appState.favorites = appState.favorites.filter(id => id !== placeId);
            showToast('Removed from favorites', 'info');
        }
        
        // Update button
        const favoriteBtn = document.getElementById('favoriteBtn');
        updateFavoriteButton(favoriteBtn, appState.favorites.includes(placeId));
        
        // Update profile stats
        document.getElementById('userFavoritesCount').textContent = appState.favorites.length;
        
    } catch (error) {
        console.error('Error toggling favorite:', error);
        showToast('Error updating favorite', 'error');
    }
}

function sharePlace(place) {
    if (navigator.share) {
        navigator.share({
            title: place.name,
            text: place.description,
            url: window.location.href
        });
    } else {
        const shareText = `Check out ${place.name} on HiddenGems!\n${place.description}`;
        navigator.clipboard.writeText(shareText).then(() => {
            showToast('Copied to clipboard!', 'success');
        });
    }
}

function openDirections(place) {
    if (place.latitude && place.longitude) {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`;
        window.open(url, '_blank');
    } else {
        const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.address)}`;
        window.open(url, '_blank');
    }
}

// ===================================
// CAROUSEL
// ===================================
function initializeCarousel() {
    document.getElementById('carouselPrev')?.addEventListener('click', () => {
        if (appState.carouselIndex > 0) {
            appState.carouselIndex--;
            updateCarousel();
        }
    });
    
    document.getElementById('carouselNext')?.addEventListener('click', () => {
        if (appState.carouselIndex < appState.carouselImages.length - 1) {
            appState.carouselIndex++;
            updateCarousel();
        }
    });
}

function updateCarousel() {
    const carouselImages = document.getElementById('carouselImages');
    const carouselDots = document.getElementById('carouselDots');
    
    if (!carouselImages) return;
    
    // Update images
    carouselImages.innerHTML = appState.carouselImages.map(img => 
        `<img src="${img}" alt="Place image">`
    ).join('');
    
    carouselImages.style.transform = `translateX(-${appState.carouselIndex * 100}%)`;
    
    // Update dots
    if (carouselDots) {
        carouselDots.innerHTML = appState.carouselImages.map((_, i) => 
            `<div class="carousel-dot ${i === appState.carouselIndex ? 'active' : ''}" data-index="${i}"></div>`
        ).join('');
        
        carouselDots.querySelectorAll('.carousel-dot').forEach(dot => {
            dot.addEventListener('click', () => {
                appState.carouselIndex = parseInt(dot.dataset.index);
                updateCarousel();
            });
        });
    }
}

// ===================================
// REVIEWS
// ===================================
function initializeStarRating() {
    const stars = document.querySelectorAll('#starRatingInput span');
    const selectedRating = document.getElementById('selectedRating');
    
    stars.forEach(star => {
        star.addEventListener('click', () => {
            appState.selectedRating = parseInt(star.dataset.rating);
            updateStarRating();
        });
        
        star.addEventListener('mouseenter', () => {
            const rating = parseInt(star.dataset.rating);
            highlightStars(rating);
        });
    });
    
    document.getElementById('starRatingInput')?.addEventListener('mouseleave', updateStarRating);
    
    // Submit review
    document.getElementById('submitReviewBtn')?.addEventListener('click', submitReview);
}

function updateStarRating() {
    highlightStars(appState.selectedRating);
    document.getElementById('selectedRating').textContent = `${appState.selectedRating}/5`;
}

function highlightStars(rating) {
    document.querySelectorAll('#starRatingInput span').forEach(star => {
        const starRating = parseInt(star.dataset.rating);
        star.classList.toggle('active', starRating <= rating);
    });
}

async function loadReviews(placeId) {
    const reviewsList = document.getElementById('reviewsList');
    if (!reviewsList) return;
    
    try {
        const snapshot = await db.collection(COLLECTIONS.REVIEWS)
            .where('placeId', '==', placeId)
            .orderBy('createdAt', 'desc')
            .limit(5)
            .get();
        
        if (snapshot.empty) {
            reviewsList.innerHTML = `
                <div class="no-reviews">
                    <p>No reviews yet. Be the first to review!</p>
                </div>
            `;
            return;
        }
        
        reviewsList.innerHTML = snapshot.docs.map(doc => {
            const review = doc.data();
            return `
                <div class="review-card">
                    <div class="review-header">
                        <span class="review-author">${review.userName || 'Anonymous'}</span>
                        <span class="review-date">${formatRelativeTime(review.createdAt)}</span>
                    </div>
                    <div class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
                    <p class="review-text">${review.comment}</p>
                </div>
            `;
        }).join('');
        
    } catch (error) {
        console.error('Error loading reviews:', error);
        reviewsList.innerHTML = '<p>Error loading reviews</p>';
    }
}

async function submitReview() {
    if (!appState.currentUser) {
        showToast('Please login to submit a review', 'info');
        openAuthModal();
        return;
    }
    
    const comment = document.getElementById('reviewInput').value.trim();
    
    if (!comment) {
        showToast('Please write a review', 'error');
        return;
    }
    
    if (appState.selectedRating === 0) {
        showToast('Please select a rating', 'error');
        return;
    }
    
    try {
        const reviewData = {
            placeId: appState.currentPlaceId,
            userId: appState.currentUser.uid,
            userName: appState.currentUser.name || appState.currentUser.email,
            userImage: appState.currentUser.profileImage,
            rating: appState.selectedRating,
            comment: comment,
            createdAt: getTimestamp()
        };
        
        await db.collection(COLLECTIONS.REVIEWS).add(reviewData);
        
        // Update place rating
        await updatePlaceRating(appState.currentPlaceId);
        
        // Reload reviews
        await loadReviews(appState.currentPlaceId);
        
        // Reset form
        document.getElementById('reviewInput').value = '';
        appState.selectedRating = 0;
        updateStarRating();
        
        showToast('Review submitted!', 'success');
        
    } catch (error) {
        console.error('Error submitting review:', error);
        showToast('Error submitting review', 'error');
    }
}

async function updatePlaceRating(placeId) {
    try {
        const reviewsSnapshot = await db.collection(COLLECTIONS.REVIEWS)
            .where('placeId', '==', placeId)
            .get();
        
        if (reviewsSnapshot.empty) return;
        
        let totalRating = 0;
        reviewsSnapshot.forEach(doc => {
            totalRating += doc.data().rating;
        });
        
        const avgRating = totalRating / reviewsSnapshot.size;
        
        await db.collection(COLLECTIONS.PLACES).doc(placeId).update({
            rating: avgRating,
            reviewCount: reviewsSnapshot.size,
            updatedAt: getTimestamp()
        });
        
        // Update local state
        const placeIndex = appState.places.findIndex(p => p.id === placeId);
        if (placeIndex !== -1) {
            appState.places[placeIndex].rating = avgRating;
            appState.places[placeIndex].reviewCount = reviewsSnapshot.size;
        }
        
    } catch (error) {
        console.error('Error updating place rating:', error);
    }
}

// ===================================
// WEATHER
// ===================================
async function initializeWeather() {
    // Try to get user's location for weather
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                await fetchWeather(position.coords.latitude, position.coords.longitude);
            },
            () => {
                // Use default location (Chennai)
                fetchWeather(13.0827, 80.2707);
            }
        );
    } else {
        fetchWeather(13.0827, 80.2707);
    }
}

async function fetchWeather(lat, lng) {
    const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your API key
    
    try {
        // If no API key, show simulated weather
        if (API_KEY === 'YOUR_OPENWEATHERMAP_API_KEY') {
            showSimulatedWeather();
            return;
        }
        
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${API_KEY}`
        );
        
        if (!response.ok) throw new Error('Weather API error');
        
        const data = await response.json();
        updateWeatherUI(data);
        
    } catch (error) {
        console.error('Weather error:', error);
        showSimulatedWeather();
    }
}

function showSimulatedWeather() {
    const conditions = [
        { temp: 28, desc: 'Warm', icon: '🌤️', suggestion: 'Nature trails, waterfalls' },
        { temp: 22, desc: 'Pleasant', icon: '⛅', suggestion: 'Walking, outdoor cafes' },
        { temp: 32, desc: 'Hot', icon: '☀️', suggestion: 'Indoor attractions, shaded spots' }
    ];
    
    const random = conditions[Math.floor(Math.random() * conditions.length)];
    
    document.getElementById('weatherIcon').textContent = random.icon;
    document.getElementById('weatherTemp').textContent = `${random.temp}°C`;
    document.getElementById('weatherDesc').textContent = random.desc;
    document.getElementById('weatherRecommendation').textContent = random.suggestion;
}

function updateWeatherUI(data) {
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    const icon = getWeatherIcon(data.weather[0].icon);
    const suggestion = getWeatherSuggestion(temp, data.weather[0].main);
    
    document.getElementById('weatherIcon').textContent = icon;
    document.getElementById('weatherTemp').textContent = `${temp}°C`;
    document.getElementById('weatherDesc').textContent = desc.charAt(0).toUpperCase() + desc.slice(1);
    document.getElementById('weatherRecommendation').textContent = suggestion;
}

function getWeatherIcon(code) {
    const icons = {
        '01d': '☀️', '01n': '🌙',
        '02d': '⛅', '02n': '☁️',
        '03d': '☁️', '03n': '☁️',
        '04d': '☁️', '04n': '☁️',
        '09d': '🌧️', '09n': '🌧️',
        '10d': '🌦️', '10n': '🌧️',
        '11d': '⛈️', '11n': '⛈️',
        '13d': '❄️', '13n': '❄️',
        '50d': '🌫️', '50n': '🌫️'
    };
    return icons[code] || '🌤️';
}

function getWeatherSuggestion(temp, condition) {
    if (condition === 'Rain' || condition === 'Thunderstorm') {
        return 'Indoor attractions, cozy cafes';
    } else if (temp > 30) {
        return 'Shaded nature spots, water activities';
    } else if (temp < 15) {
        return 'Indoor activities, warm cafes';
    } else {
        return 'Perfect for all outdoor activities';
    }
}

// ===================================
// PROFILE
// ===================================
function initializeProfile() {
    const tabs = document.querySelectorAll('.profile-tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const tabId = tab.dataset.tab;
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.add('hidden');
            });
            document.getElementById(tabId)?.classList.remove('hidden');
        });
    });
    
    // Logout button
    document.getElementById('logoutBtn')?.addEventListener('click', handleLogout);
}

function showProfile() {
    document.getElementById('profile')?.classList.remove('hidden');
    loadUserProfile();
    document.getElementById('profile')?.scrollIntoView({ behavior: 'smooth' });
}

function hideProfile() {
    document.getElementById('profile')?.classList.add('hidden');
}

async function loadUserProfile() {
    if (!appState.currentUser) return;
    
    // Load user's places
    await loadUserPlaces();
    
    // Load user's photos
    await loadUserPhotos();
    
    // Load favorites
    await loadFavoritePlaces();
    
    // Load user reviews
    displayUserReviews();
}

async function loadUserPlaces() {
    const grid = document.getElementById('userPlacesGrid');
    if (!grid || !appState.currentUser) return;
    
    try {
        const snapshot = await db.collection(COLLECTIONS.PLACES)
            .where('userId', '==', appState.currentUser.uid)
            .orderBy('createdAt', 'desc')
            .get();
        
        const places = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        if (places.length === 0) {
            grid.innerHTML = '<p class="no-results">No places added yet</p>';
            return;
        }
        
        grid.innerHTML = places.map(place => createPlaceCard(place)).join('');
        document.getElementById('userPlacesCount').textContent = places.length;
        
    } catch (error) {
        console.error('Error loading user places:', error);
        grid.innerHTML = '<p class="no-results">Error loading places</p>';
    }
}

async function loadUserPhotos() {
    const grid = document.getElementById('userPhotosGrid');
    if (!grid || !appState.currentUser) return;
    
    // Get photos from user's places
    const photos = [];
    appState.places
        .filter(p => p.userId === appState.currentUser.uid)
        .forEach(place => {
            if (place.images) {
                place.images.forEach(img => photos.push({ url: img, placeId: place.id, placeName: place.name }));
            }
        });
    
    if (photos.length === 0) {
        grid.innerHTML = '<p class="no-results">No photos yet</p>';
        return;
    }
    
    grid.innerHTML = photos.map(photo => `
        <div class="photo-item" onclick="openPlaceDetail('${photo.placeId}')">
            <img src="${photo.url}" alt="${photo.placeName}">
        </div>
    `).join('');
}

async function loadFavoritePlaces() {
    const grid = document.getElementById('favoritesGrid');
    if (!grid) return;
    
    const favoritePlaces = appState.places.filter(p => appState.favorites.includes(p.id));
    
    if (favoritePlaces.length === 0) {
        grid.innerHTML = '<p class="no-results">No favorites yet</p>';
        return;
    }
    
    grid.innerHTML = favoritePlaces.map(place => createPlaceCard(place)).join('');
}

function displayUserReviews() {
    const list = document.getElementById('userReviewsList');
    if (!list) return;
    
    if (appState.userReviews.length === 0) {
        list.innerHTML = '<p class="no-results">No reviews yet</p>';
        return;
    }
    
    list.innerHTML = appState.userReviews.map(review => `
        <div class="review-card">
            <div class="review-header">
                <span class="review-author">Your review</span>
                <span class="review-date">${formatRelativeTime(review.createdAt)}</span>
            </div>
            <div class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
            <p class="review-text">${review.comment}</p>
        </div>
    `).join('');
}

// ===================================
// STATS
// ===================================
async function updateStats() {
    try {
        // Get places count
        const placesSnapshot = await db.collection(COLLECTIONS.PLACES)
            .where('status', '==', 'active')
            .get();
        
        animateNumber('totalPlaces', placesSnapshot.size);
        
        // Get users count
        const usersSnapshot = await db.collection(COLLECTIONS.USERS).get();
        animateNumber('happyExplorers', usersSnapshot.size);
        
        // Get reviews count
        const reviewsSnapshot = await db.collection(COLLECTIONS.REVIEWS).get();
        animateNumber('totalReviews', reviewsSnapshot.size);
        
        // Categories count (fixed)
        animateNumber('categories', 7);
        
    } catch (error) {
        console.error('Error updating stats:', error);
        // Use fallback values
        animateNumber('totalPlaces', appState.places.length || 6);
        animateNumber('happyExplorers', 500);
        animateNumber('totalReviews', 150);
        animateNumber('categories', 7);
    }
}

function animateNumber(elementId, target) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const duration = 2000;
    const start = parseInt(element.textContent) || 0;
    const increment = (target - start) / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ===================================
// UTILITY FUNCTIONS
// ===================================
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'toastSlideIn 0.3s ease-out reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function showButtonLoader(btn, show) {
    if (!btn) return;
    
    const text = btn.querySelector('.btn-text');
    const loader = btn.querySelector('.btn-loader');
    
    if (show) {
        btn.disabled = true;
        text?.classList.add('hidden');
        loader?.classList.remove('hidden');
    } else {
        btn.disabled = false;
        text?.classList.remove('hidden');
        loader?.classList.add('hidden');
    }
}

// Make openPlaceDetail globally available for map popup
window.openPlaceDetail = openPlaceDetail;

// ===================================
// LOAD MORE FUNCTIONALITY
// ===================================
document.getElementById('loadMoreBtn')?.addEventListener('click', async () => {
    await loadPlaces(false);
});

console.log('HiddenGems script loaded!');







/////
async function getCoordinatesFromAddress(address) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data && data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lng: parseFloat(data[0].lon)
            };
        } else {
            return null;
        }
    } catch (error) {
        console.error("Geocoding error:", error);
        return null;
    }
}