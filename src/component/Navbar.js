import React from 'react';
import { Navbar as BsNavbar, Container, Nav } from 'react-bootstrap';

function Navbar(props) {
  const isOwner = props.userRole === 'owner';

  const handleNav = (page, e) => {
    if (e) e.preventDefault();
    if (props.onNavigate) {
      props.onNavigate(page);
    }
  };

  const handleProfileClick = (e) => {
    if (e) e.preventDefault();
    if (props.onNavigate) {
      props.onNavigate(isOwner ? 'dashboard' : 'profile');
    }
  };

  return (
    <BsNavbar fixed="top" className="pawmate-navbar border-bottom shadow-xs" style={{ backgroundColor: '#fdfcf9', borderBottomColor: '#eeebe2' }}>
      <Container className="d-flex align-items-center justify-content-between py-2">
        {/* Brand Logo with Pure White Paw Icon in Dark Green Box */}
        <BsNavbar.Brand
          href="#home"
          onClick={(e) => handleNav(isOwner ? 'explore' : 'dashboard', e)}
          className="d-flex align-items-center gap-2 text-decoration-none"
        >
          <div
            className="rounded-3 d-flex align-items-center justify-content-center shadow-sm"
            style={{ width: '38px', height: '38px', backgroundColor: '#1a4331', minWidth: '38px' }}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="#ffffff">
              <path d="M12 2C10.9 2 10 2.9 10 4C10 5.1 10.9 6 12 6C13.1 6 14 5.1 14 4C14 2.9 13.1 2 12 2ZM7 6C5.9 6 5 6.9 5 8C5 9.1 5.9 10 7 10C8.1 10 9 9.1 9 8C9 6.9 8.1 6 7 6ZM17 6C15.9 6 15 6.9 15 8C15 9.1 15.9 10 17 10C18.1 10 19 9.1 19 8C19 6.9 18.1 6 17 6ZM12 8C9.5 8 7.3 9.4 6.1 11.5C5.4 12.8 5 14.3 5 16C5 19.3 7.7 22 11 22H13C16.3 22 19 19.3 19 16C19 14.3 18.6 12.8 17.9 11.5C16.7 9.4 14.5 8 12 8Z" />
            </svg>
          </div>
          <span
            className="fw-bold fs-5 text-forest"
            style={{ color: '#1a4331', letterSpacing: '-0.03em', fontWeight: '800' }}
          >
            PawMate
          </span>
        </BsNavbar.Brand>

        {/* Navigation Links */}
        <Nav className="d-none d-lg-flex align-items-center gap-2 pawmate-nav-links">
          {isOwner ? (
            <>
              <button
                type="button"
                className={`nav-pill-btn ${props.currentPage === 'explore' ? 'active-nav-pill' : ''}`}
                onClick={(e) => handleNav('explore', e)}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span>Home</span>
              </button>

              <button
                type="button"
                className={`nav-pill-btn ${props.currentPage === 'services' ? 'active-nav-pill' : ''}`}
                onClick={(e) => handleNav('services', e)}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <span>Services</span>
              </button>

              <button
                type="button"
                className={`nav-pill-btn ${props.currentPage === 'pets' ? 'active-nav-pill' : ''}`}
                onClick={(e) => handleNav('pets', e)}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C10.9 2 10 2.9 10 4C10 5.1 10.9 6 12 6C13.1 6 14 5.1 14 4C14 2.9 13.1 2 12 2ZM7 6C5.9 6 5 6.9 5 8C5 9.1 5.9 10 7 10C8.1 10 9 9.1 9 8C9 6.9 8.1 6 7 6ZM17 6C15.9 6 15 6.9 15 8C15 9.1 15.9 10 17 10C18.1 10 19 9.1 19 8C19 6.9 18.1 6 17 6ZM12 8C9.5 8 7.3 9.4 6.1 11.5C5.4 12.8 5 14.3 5 16C5 19.3 7.7 22 11 22H13C16.3 22 19 19.3 19 16C19 14.3 18.6 12.8 17.9 11.5C16.7 9.4 14.5 8 12 8Z" />
                </svg>
                <span>My Pets</span>
              </button>

              <button
                type="button"
                className={`nav-pill-btn ${props.currentPage === 'favorites' ? 'active-nav-pill' : ''}`}
                onClick={(e) => handleNav('favorites', e)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <span>Favorites</span>
              </button>

              <button
                type="button"
                className={`nav-pill-btn ${props.currentPage === 'orders' ? 'active-nav-pill' : ''}`}
                onClick={(e) => handleNav('orders', e)}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
                <span>Orders</span>
              </button>

              <button
                type="button"
                className={`nav-pill-btn ${props.currentPage === 'plans' ? 'active-nav-pill' : ''}`}
                onClick={(e) => handleNav('plans', e)}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
                <span>Plans</span>
              </button>

              <button
                type="button"
                className={`nav-pill-btn ${props.currentPage === 'dashboard' ? 'active-nav-pill' : ''}`}
                onClick={(e) => handleNav('dashboard', e)}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>Dashboard</span>
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className={`nav-pill-btn ${props.currentPage === 'dashboard' ? 'active-nav-pill' : ''}`}
                onClick={(e) => handleNav('dashboard', e)}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                <span>Dashboard</span>
              </button>

              <button
                type="button"
                className={`nav-pill-btn nav-pill-compact ${props.currentPage === 'my-services' ? 'active-nav-pill' : ''}`}
                onClick={(e) => handleNav('my-services', e)}
                style={{ fontSize: '0.82rem', padding: '0.4rem 0.75rem' }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
                <span>My Services</span>
              </button>

              <button
                type="button"
                className={`nav-pill-btn ${props.currentPage === 'bookings' ? 'active-nav-pill' : ''}`}
                onClick={(e) => handleNav('bookings', e)}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
                <span>Bookings</span>
              </button>

              <button
                type="button"
                className={`nav-pill-btn ${props.currentPage === 'earnings' ? 'active-nav-pill' : ''}`}
                onClick={(e) => handleNav('earnings', e)}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <span>Earnings</span>
              </button>
            </>
          )}
        </Nav>

        {/* User Role Badge in Dark Green + Clickable Avatar + Identifiable Logout Button */}
        <div className="d-flex align-items-center gap-3">
          {/* Dark Green Role Label */}
          <span
            className="px-2.5 py-1 text-uppercase rounded-pill fw-bold"
            style={{
              backgroundColor: '#d6ebd9',
              color: '#1a4331',
              border: '1px solid #b7ddbd',
              fontSize: '0.75rem',
              letterSpacing: '0.04em',
              fontWeight: '700'
            }}
          >
            {isOwner ? 'PET OWNER' : 'PAWMATE'}
          </span>

          {/* Clickable Profile Avatar */}
          <button
            type="button"
            className="p-0 border-0 bg-transparent rounded-circle position-relative"
            onClick={handleProfileClick}
            title={props.currentUser ? `${props.currentUser.name} (${isOwner ? 'Pet Owner' : 'PawMate'})` : (isOwner ? 'View Dashboard' : 'View & Edit PawMate Profile')}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={
                isOwner
                  ? 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=100&auto=format&fit=crop&q=80'
                  : 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80'
              }
              alt={props.currentUser?.name || "Profile"}
              className="rounded-circle object-fit-cover shadow-sm border border-2 border-forest"
              width="36"
              height="36"
            />
          </button>

          {/* Clear & Identifiable Logout Button */}
          {props.onLogout && (
            <button
              type="button"
              className="pawmate-navbar-logout-btn d-flex align-items-center gap-1.5 px-3 py-1.5 rounded-pill shadow-xs"
              onClick={props.onLogout}
              title="Logout from Account"
              style={{
                backgroundColor: '#ffffff',
                color: '#1a4331',
                border: '1px solid #e5e7eb',
                fontSize: '0.8rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <span style={{ fontSize: '0.9rem' }}>⎋</span>
              <span>Logout</span>
            </button>
          )}
        </div>
      </Container>
    </BsNavbar>
  );
}

export default Navbar;
