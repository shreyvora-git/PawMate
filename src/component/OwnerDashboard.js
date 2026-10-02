import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';

function OwnerDashboard(props) {
  const registeredPets = props.pets || [];
  const allOrders = props.orders || [];
  const upcomingOrders = allOrders.filter(
    (o) => o.status === 'Pending' || o.status === 'Confirmed'
  );

  const currentUser = props.currentUser || {
    name: 'Pet Owner',
    email: 'owner@pawmate.com'
  };

  const recommendedMates = (props.pawMates && props.pawMates.length > 0)
    ? props.pawMates.slice(0, 2)
    : [];

  const planTitles = {
    basic: 'Basic Care Plan (₹999/mo)',
    active: 'Active Care Plan (₹1999/mo)',
    complete: 'Complete Care Plan (₹3499/mo)'
  };

  return (
    <div className="pawmate-page-container py-5">
      <Container>
        {/* Dynamic User Greeting Banner */}
        <Card className="p-4 p-md-4 rounded-4 border shadow-sm mb-4 bg-white reveal-on-scroll">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div className="d-flex align-items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=150&auto=format&fit=crop&q=80"
                alt={currentUser.name}
                className="rounded-circle object-fit-cover shadow-sm border border-2 border-forest"
                width="64"
                height="64"
              />
              <div>
                <h1 className="h4 fw-bold mb-1 text-dark">Hello, {currentUser.name}!</h1>
                <p className="small text-muted mb-0">
                  {currentUser.email} • Pet Parent Account
                </p>
              </div>
            </div>

            <Button
              className="px-4 py-2 rounded-pill fw-bold text-uppercase shadow-sm align-self-start align-self-md-center pawmate-btn-primary"
              style={{ backgroundColor: '#1a4331', borderColor: '#1a4331', fontSize: '0.85rem' }}
              onClick={() => props.onNavigate && props.onNavigate('services')}
            >
              FIND A PAWMATE 🐾
            </Button>
          </div>
        </Card>

        <Row className="g-4">
          {/* Main Left Column */}
          <Col xs={12} lg={8}>
            {/* Registered Pets Widget */}
            <div className="mb-4 reveal-on-scroll">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="h6 fw-bold mb-0 d-flex align-items-center gap-2 text-dark">
                  <span>🐾</span> Registered Pets ({registeredPets.length})
                </h2>
                <button
                  type="button"
                  className="btn btn-link p-0 text-forest text-decoration-none small fw-bold"
                  onClick={() => props.onNavigate && props.onNavigate('pets')}
                >
                  Manage Pets →
                </button>
              </div>

              {registeredPets.length > 0 ? (
                <Row className="g-3">
                  {registeredPets.map((pet, idx) => (
                    <Col xs={12} sm={6} key={pet.id || idx}>
                      <Card className="p-3 rounded-4 border shadow-sm h-100 bg-white">
                        <div className="d-flex align-items-center gap-3">
                          <div
                            className="rounded-circle d-flex align-items-center justify-content-center bg-forest-subtle"
                            style={{ width: '48px', height: '48px', minWidth: '48px', fontSize: '1.4rem' }}
                          >
                            {pet.species === 'Cat' ? '🐱' : '🐶'}
                          </div>
                          <div>
                            <h3 className="h6 fw-bold mb-0 text-dark">{pet.name}</h3>
                            <p className="small text-muted mb-0">{pet.species} • {pet.breed}</p>
                            <Badge bg="light" text="dark" className="border mt-1">{pet.age}</Badge>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                /* Clean Empty State for New User */
                <Card className="p-4 text-center rounded-4 border shadow-sm bg-white">
                  <div className="fs-2 mb-2">🐾</div>
                  <h3 className="h6 fw-bold mb-1">No pets added yet.</h3>
                  <p className="small text-muted mb-3">Add your dog, cat, or furry friend to start booking custom care sessions.</p>
                  <Button
                    className="pawmate-btn-primary rounded-pill px-4 py-2 small fw-bold align-self-center shadow-sm"
                    style={{ backgroundColor: '#1a4331', borderColor: '#1a4331' }}
                    onClick={() => props.onNavigate && props.onNavigate('pets')}
                  >
                    + Add Your First Pet
                  </Button>
                </Card>
              )}
            </div>

            {/* Upcoming Bookings Widget */}
            <div className="mb-4 reveal-on-scroll">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="h6 fw-bold mb-0 d-flex align-items-center gap-2 text-dark">
                  <span>📅</span> Upcoming Bookings ({upcomingOrders.length})
                </h2>
                <button
                  type="button"
                  className="btn btn-link p-0 text-forest text-decoration-none small fw-bold"
                  onClick={() => props.onNavigate && props.onNavigate('orders')}
                >
                  View All Orders →
                </button>
              </div>

              {upcomingOrders.length > 0 ? (
                <div className="d-flex flex-column gap-2">
                  {upcomingOrders.map((order, idx) => (
                    <Card key={idx} className="p-3 rounded-4 border shadow-sm bg-white">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <div className="d-flex align-items-center gap-2">
                            <strong>{order.service}</strong>
                            <Badge
                              className="rounded-pill"
                              style={{
                                backgroundColor: order.status === 'Confirmed' ? '#d6ebd9' : '#fff3cd',
                                color: order.status === 'Confirmed' ? '#1a4331' : '#856404'
                              }}
                            >
                              {order.status}
                            </Badge>
                          </div>
                          <span className="small text-muted d-block">
                            PawMate: {order.caregiver} &nbsp;•&nbsp; For: {order.pet}
                          </span>
                          <span className="small text-secondary">
                            🗓️ {order.date} at {order.time}
                          </span>
                        </div>
                        <strong className="text-forest">{order.price}</strong>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                /* Clean Empty State for New User */
                <Card className="p-4 text-center rounded-4 border shadow-sm bg-white">
                  <div className="fs-2 mb-2">📋</div>
                  <h3 className="h6 fw-bold mb-1">You don't have any bookings yet.</h3>
                  <p className="small text-muted mb-3">Browse our certified pet care services and book your first session.</p>
                  <Button
                    className="pawmate-btn-primary rounded-pill px-4 py-2 small fw-bold align-self-center shadow-sm"
                    style={{ backgroundColor: '#1a4331', borderColor: '#1a4331' }}
                    onClick={() => props.onNavigate && props.onNavigate('services')}
                  >
                    Explore Services
                  </Button>
                </Card>
              )}
            </div>

            {/* Recommended PawMates Widget */}
            {recommendedMates.length > 0 && (
              <div className="reveal-on-scroll">
                <h2 className="h6 fw-bold mb-3 d-flex align-items-center gap-2 text-dark">
                  <span>⭐</span> Recommended PawMates
                </h2>
                <Row className="g-3">
                  {recommendedMates.map((mate, idx) => (
                    <Col xs={12} sm={6} key={idx}>
                      <Card className="p-3 rounded-4 border shadow-sm bg-white">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center gap-3">
                            <img
                              src={mate.image}
                              alt={mate.name}
                              className="rounded-circle object-fit-cover border border-2 border-forest"
                              width="46"
                              height="46"
                            />
                            <div>
                              <h3 className="h6 fw-bold mb-0 text-dark">{mate.name}</h3>
                              <span className="small text-muted">⭐ {mate.rating} ({mate.jobs || '140+ jobs'})</span>
                            </div>
                          </div>
                          <Button
                            variant="light"
                            className="rounded-circle p-0 d-flex align-items-center justify-content-center border"
                            style={{ width: '34px', height: '34px' }}
                            onClick={() => {
                              if (props.onOpenBooking) {
                                props.onOpenBooking(mate);
                              }
                            }}
                          >
                            →
                          </Button>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            )}
          </Col>

          {/* Right Sidebar Column */}
          <Col xs={12} lg={4}>
            {/* Active Care Plan Widget */}
            <Card className="p-4 rounded-4 border shadow-sm bg-white mb-4 reveal-on-scroll">
              <h2 className="h6 fw-bold mb-3 d-flex align-items-center gap-2 text-dark">
                <span>📈</span> Active Care Plan
              </h2>

              {props.activePlan ? (
                <div>
                  <Badge
                    className="mb-2 rounded-pill px-2 py-1"
                    style={{ backgroundColor: '#d6ebd9', color: '#1a4331', border: '1px solid #b7ddbd' }}
                  >
                    ACTIVE SUBSCRIPTION
                  </Badge>
                  <h3 className="h6 fw-bold mb-1 text-dark">{planTitles[props.activePlan] || 'Active Routine Plan'}</h3>
                  <p className="small text-muted mb-3">Recurring weekly care slots active. Rollover unused sessions anytime.</p>
                  <Button
                    variant="light"
                    className="w-100 py-2 rounded-pill small fw-bold border text-forest"
                    onClick={() => props.onNavigate && props.onNavigate('plans')}
                  >
                    Change Subscription
                  </Button>
                </div>
              ) : (
                <div>
                  <p className="small text-muted mb-4">You are not subscribed to any monthly care plan.</p>
                  <Button
                    variant="light"
                    className="w-100 py-2 rounded-pill small fw-bold border text-forest"
                    style={{ backgroundColor: '#fcfbf7' }}
                    onClick={() => props.onNavigate && props.onNavigate('plans')}
                  >
                    View Care Subscriptions
                  </Button>
                </div>
              )}
            </Card>

            {/* Notifications Widget */}
            <Card className="p-4 rounded-4 border shadow-sm bg-white reveal-on-scroll">
              <h2 className="h6 fw-bold mb-3 d-flex align-items-center gap-2 text-dark">
                <span>🔔</span> Notifications
              </h2>
              <p className="small text-muted fst-italic mb-0">No recent alerts.</p>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default OwnerDashboard;
