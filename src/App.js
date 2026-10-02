import React, { useState, useEffect } from 'react';
import './App.css';
import LoginPage from './component/LoginPage';
import Navbar from './component/Navbar';
import ExplorePage from './component/ExplorePage';
import ServicesPage from './component/ServicesPage';
import MyPetsPage from './component/MyPetsPage';
import FavoritesPage from './component/FavoritesPage';
import OrdersPage from './component/OrdersPage';
import PlansPage from './component/PlansPage';
import OwnerDashboard from './component/OwnerDashboard';

import CaregiverDashboard from './component/CaregiverDashboard';
import CaregiverServices from './component/CaregiverServices';
import CaregiverBookings from './component/CaregiverBookings';
import CaregiverEarnings from './component/CaregiverEarnings';
import CaregiverProfile from './component/CaregiverProfile';

import BookingModal from './component/BookingModal';
import AboutPage from './component/AboutPage';
import HowItWorksPage from './component/HowItWorksPage';
import Footer from './component/Footer';

import { INITIAL_SERVICES, INITIAL_PAWMATES } from './data/mockData';

// Realistic demo bookings for the PawMate provider section
const DEMO_PAWMATE_BOOKINGS = [
  {
    id: 201,
    service: 'Dog Walking',
    caregiver: 'Rahul Sharma',
    caregiverImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
    clientName: 'Aadi Sheth',
    pet: 'Bruno',
    date: '26 Aug 2026',
    time: '10:00 AM',
    price: '₹300',
    status: 'Confirmed',
    notes: 'Morning park walk with hydration check.'
  },
  {
    id: 202,
    service: 'Pet Sitting',
    caregiver: 'Rahul Sharma',
    caregiverImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
    clientName: 'Priya Mehta',
    pet: 'Milo',
    date: '28 Aug 2026',
    time: '2:00 PM',
    price: '₹600',
    status: 'Pending',
    notes: 'Afternoon in-home cat visit and feeding.'
  },
  {
    id: 203,
    service: 'Dog Grooming',
    caregiver: 'Rahul Sharma',
    caregiverImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
    clientName: 'Rohan Shah',
    pet: 'Coco',
    date: '30 Aug 2026',
    time: '11:00 AM',
    price: '₹900',
    status: 'Confirmed',
    notes: 'Bath, brush, and nail trim.'
  }
];

function App() {
  // Global Theme State: 'light' | 'dark'
  const [theme, setTheme] = useState('light');

  // Login State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('owner'); // 'owner' | 'pawmate'
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('explore'); // Role-dependent

  // Marketplace Catalog (initialized directly from mock data with no fetch)
  const [services] = useState(INITIAL_SERVICES);
  const [pawMates] = useState(INITIAL_PAWMATES);

  // Pet Owner session data (starts with 0 pets, 0 orders, 0 favorites)
  const [pets, setPets] = useState([]);
  const [ownerOrders, setOwnerOrders] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [activePlan, setActivePlan] = useState(null);

  // PawMate session data (includes demo bookings for the provider dashboard)
  const [pawmateBookings, setPawmateBookings] = useState(DEMO_PAWMATE_BOOKINGS);
  const [caregiverServices, setCaregiverServices] = useState([]);

  // Booking Modal State
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingTarget, setBookingTarget] = useState(null);

  // Toggle Global Theme (Light <-> Dark)
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Keep document body synchronized with theme
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [theme]);

  // Scroll reveal observer
  useEffect(() => {
    if (!isLoggedIn) return;

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.05,
      rootMargin: '0px 0px -10px 0px'
    });

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [currentPage, userRole, isLoggedIn]);

  // Login Handler: Starts user with clean account
  const handleLogin = (role, userData) => {
    const isPawMate = role === 'pawmate';
    setUserRole(isPawMate ? 'pawmate' : 'owner');
    setCurrentUser(userData);

    // If logging in as owner, start with 0 pets, 0 orders, 0 favorites
    if (!isPawMate) {
      setPets([]);
      setOwnerOrders([]);
      setFavorites([]);
      setActivePlan(null);
    } else {
      // PawMate gets demo bookings for provider management
      setPawmateBookings(DEMO_PAWMATE_BOOKINGS);
      setCaregiverServices([]);
    }

    setCurrentPage(isPawMate ? 'dashboard' : 'explore');
    setIsLoggedIn(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Logout Handler: Clears session cleanly
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setPets([]);
    setOwnerOrders([]);
    setFavorites([]);
    setCaregiverServices([]);
    setPawmateBookings(DEMO_PAWMATE_BOOKINGS);
    setActivePlan(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigation Handler
  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle User Role (Pet Owner <-> PawMate)
  const handleToggleRole = () => {
    if (userRole === 'owner') {
      setUserRole('pawmate');
      setCurrentPage('dashboard');
    } else {
      setUserRole('owner');
      setCurrentPage('explore');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Pet Handlers with functional immutable state updates for instant UI re-render
  const handleAddPet = (newPet) => {
    setPets((prevPets) => [newPet, ...prevPets]);
  };

  const handleEditPet = (updatedPet) => {
    setPets((prevPets) =>
      prevPets.map((p) => (p.id === updatedPet.id ? updatedPet : p))
    );
  };

  const handleDeletePet = (petId) => {
    setPets((prevPets) => prevPets.filter((p) => p.id !== petId));
  };

  const handleToggleFavorite = (caregiverName) => {
    setFavorites((prevFavs) =>
      prevFavs.includes(caregiverName)
        ? prevFavs.filter((name) => name !== caregiverName)
        : [...prevFavs, caregiverName]
    );
  };

  const handleOpenBooking = (target) => {
    setBookingTarget(target);
    setShowBookingModal(true);
  };

  const handleCreateOrder = (orderData) => {
    const newOrder = {
      id: Date.now(),
      ...orderData
    };
    // Add to owner orders
    setOwnerOrders((prevOrders) => [newOrder, ...prevOrders]);
    // Also push to PawMate bookings so caregiver receives the request
    setPawmateBookings((prevBookings) => [newOrder, ...prevBookings]);

    setCurrentPage('orders');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateOwnerOrderStatus = (orderId, newStatus, reason) => {
    setOwnerOrders((prevOrders) =>
      prevOrders.map((ord) =>
        ord.id === orderId ? { ...ord, status: newStatus, cancellationReason: reason } : ord
      )
    );
    // Also sync to PawMate bookings
    setPawmateBookings((prevBookings) =>
      prevBookings.map((b) =>
        b.id === orderId ? { ...b, status: newStatus, cancellationReason: reason } : b
      )
    );
  };

  const handleUpdatePawmateBookingStatus = (bookingId, newStatus, reason) => {
    setPawmateBookings((prevBookings) =>
      prevBookings.map((b) =>
        b.id === bookingId ? { ...b, status: newStatus, cancellationReason: reason } : b
      )
    );
    // Also sync to Owner orders if exists
    setOwnerOrders((prevOrders) =>
      prevOrders.map((ord) =>
        ord.id === bookingId ? { ...ord, status: newStatus, cancellationReason: reason } : ord
      )
    );
  };

  const handleCancelPlan = () => {
    setActivePlan(null);
  };

  // Caregiver Service Handlers (Add, Edit, Delete, Toggle Availability) with immediate UI re-rendering
  const handleAddCaregiverService = (newSvc) => {
    setCaregiverServices((prevServices) => [newSvc, ...prevServices]);
  };

  const handleEditCaregiverService = (updatedSvc) => {
    setCaregiverServices((prevServices) =>
      prevServices.map((svc) => (svc.id === updatedSvc.id ? updatedSvc : svc))
    );
  };

  const handleDeleteCaregiverService = (serviceId) => {
    setCaregiverServices((prevServices) =>
      prevServices.filter((svc) => svc.id !== serviceId)
    );
  };

  const handleToggleServiceAvailability = (serviceId) => {
    setCaregiverServices((prevServices) =>
      prevServices.map((svc) =>
        svc.id === serviceId ? { ...svc, isAvailable: !svc.isAvailable } : svc
      )
    );
  };

  // Page View Resolver
  const renderCurrentView = () => {
    if (userRole === 'owner') {
      switch (currentPage) {
        case 'services':
          return (
            <ServicesPage
              services={services}
              pawMates={pawMates}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onOpenBooking={handleOpenBooking}
              onNavigate={handleNavigate}
            />
          );
        case 'pets':
          return (
            <MyPetsPage
              pets={pets}
              onAddPet={handleAddPet}
              onEditPet={handleEditPet}
              onDeletePet={handleDeletePet}
              onOpenBooking={handleOpenBooking}
              onNavigate={handleNavigate}
            />
          );
        case 'favorites':
          return (
            <FavoritesPage
              favorites={favorites}
              pawMates={pawMates}
              onToggleFavorite={handleToggleFavorite}
              onOpenBooking={handleOpenBooking}
              onNavigate={handleNavigate}
            />
          );
        case 'orders':
          return (
            <OrdersPage
              orders={ownerOrders}
              onUpdateOrderStatus={handleUpdateOwnerOrderStatus}
              onNavigate={handleNavigate}
            />
          );
        case 'plans':
          return (
            <PlansPage
              currentUser={currentUser}
              activePlan={activePlan}
              onSelectPlan={setActivePlan}
              onCancelPlan={handleCancelPlan}
              onNavigate={handleNavigate}
            />
          );
        case 'dashboard':
          return (
            <OwnerDashboard
              currentUser={currentUser}
              pets={pets}
              orders={ownerOrders}
              pawMates={pawMates}
              activePlan={activePlan}
              onOpenBooking={handleOpenBooking}
              onNavigate={handleNavigate}
            />
          );
        case 'about':
          return <AboutPage onNavigate={handleNavigate} />;
        case 'how-it-works':
          return <HowItWorksPage onNavigate={handleNavigate} />;
        case 'explore':
        default:
          return (
            <ExplorePage
              services={services}
              pawMates={pawMates}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onOpenBooking={handleOpenBooking}
              onNavigate={handleNavigate}
            />
          );
      }
    } else {
      // PawMate Mode Views
      switch (currentPage) {
        case 'my-services':
          return (
            <CaregiverServices
              caregiverServices={caregiverServices}
              onAddService={handleAddCaregiverService}
              onEditService={handleEditCaregiverService}
              onDeleteService={handleDeleteCaregiverService}
              onToggleAvailability={handleToggleServiceAvailability}
            />
          );
        case 'bookings':
          return (
            <CaregiverBookings
              orders={pawmateBookings}
              onUpdateOrderStatus={handleUpdatePawmateBookingStatus}
            />
          );
        case 'earnings':
          return <CaregiverEarnings orders={pawmateBookings} />;
        case 'profile':
          return <CaregiverProfile currentUser={currentUser} />;
        case 'dashboard':
        default:
          return (
            <CaregiverDashboard
              currentUser={currentUser}
              orders={pawmateBookings}
              caregiverServices={caregiverServices}
              onUpdateOrderStatus={handleUpdatePawmateBookingStatus}
              onNavigate={handleNavigate}
            />
          );
      }
    }
  };

  // Floating Day / Night Theme Button Component
  const renderFloatingThemeButton = () => (
    <button
      type="button"
      className="pawmate-floating-theme-btn"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      title={theme === 'dark' ? 'Switch to Light Mode (☀️)' : 'Switch to Dark Mode (🌙)'}
    >
      {theme === 'dark' ? (
        /* Clean Apple-Style Sun Icon */
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fef08a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      ) : (
        /* Clean Apple-Style Moon Icon */
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a4331" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      )}
    </button>
  );

  // If not logged in, render LoginPage within themed wrapper + single floating theme button
  if (!isLoggedIn) {
    return (
      <div className={`pawmate-app ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`} data-theme={theme}>
        <LoginPage onLogin={handleLogin} theme={theme} />
        {renderFloatingThemeButton()}
      </div>
    );
  }

  return (
    <div className={`pawmate-app ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`} data-theme={theme}>
      <Navbar
        userRole={userRole}
        currentPage={currentPage}
        currentUser={currentUser}
        theme={theme}
        onToggleTheme={toggleTheme}
        onNavigate={handleNavigate}
        onToggleRole={handleToggleRole}
        onLogout={handleLogout}
      />

      <main className="pawmate-main-content">
        {renderCurrentView()}
      </main>

      {/* Booking Modal */}
      <BookingModal
        show={showBookingModal}
        onHide={() => setShowBookingModal(false)}
        bookingTarget={bookingTarget}
        currentUser={currentUser}
        pets={pets}
        onConfirm={handleCreateOrder}
      />

      <Footer onNavigate={handleNavigate} theme={theme} />

      {/* Single Global Floating Theme Toggle Button */}
      {renderFloatingThemeButton()}
    </div>
  );
}

export default App;
