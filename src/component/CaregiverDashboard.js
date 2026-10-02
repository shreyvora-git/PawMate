import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';

function CaregiverDashboard(props) {
  const allOrders = props.orders || [];
  const pendingRequests = allOrders.filter((o) => o.status === 'Pending' || o.status === 'Upcoming');
  const confirmedJobs = allOrders.filter((o) => o.status === 'Confirmed');
  const completedJobs = allOrders.filter((o) => o.status === 'Completed');

  const currentUser = props.currentUser || {
    name: 'PawMate Pro',
    email: 'caregiver@pawmate.com',
    location: 'Mumbai, Maharashtra',
    bio: 'Verified PawMate Professional • CPR & First Aid Certified'
  };

  const caregiverServices = props.caregiverServices || [];

  // Dynamic earnings calculation
  const totalEarningsVal = completedJobs.reduce((acc, curr) => {
    const num = parseInt((curr.price || '0').replace(/[^0-9]/g, ''), 10);
    return acc + (isNaN(num) ? 0 : num);
  }, 0);

  return (
    <div className="pawmate-page-container py-5">
      <Container>
        {/* PawMate Welcome Banner */}
        <Card className="p-4 rounded-4 border shadow-sm mb-4 bg-white">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div className="d-flex align-items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80"
                alt={currentUser.name}
                className="rounded-circle object-fit-cover shadow-sm border border-2 border-forest"
                width="64"
                height="64"
              />
              <div>
                <div className="d-flex align-items-center gap-2">
                  <h1 className="h4 fw-bold mb-0 text-dark">Welcome back, {currentUser.name}!</h1>
                  <Badge
                    className="px-2 py-1 small fw-bold"
                    style={{ backgroundColor: '#d6ebd9', color: '#1a4331', border: '1px solid #b7ddbd' }}
                  >
                    PAWMATE PRO
                  </Badge>
                </div>
                <p className="small text-muted mb-0">
                  {currentUser.location} • {currentUser.bio}
                </p>
              </div>
            </div>

            <div className="d-flex gap-2">
              <Button
                className="pawmate-btn-primary rounded-pill px-3 py-2 small fw-bold shadow-sm"
                style={{ backgroundColor: '#1a4331', borderColor: '#1a4331' }}
                onClick={() => props.onNavigate && props.onNavigate('my-services')}
              >
                + Add Service
              </Button>
              <Button
                variant="outline-dark"
                className="rounded-pill px-3 py-2 small fw-bold"
                onClick={() => props.onNavigate && props.onNavigate('bookings')}
              >
                Manage Bookings
              </Button>
            </div>
          </div>
        </Card>

        {/* Analytics & Metrics Strip */}
        <Row className="g-3 mb-4">
          <Col xs={6} lg={3}>
            <Card className="p-3 rounded-4 border shadow-sm bg-white text-center h-100">
              <span className="small text-muted d-block mb-1">Total Earnings</span>
              <h2 className="h4 fw-bold text-forest mb-0">₹{totalEarningsVal.toLocaleString()}</h2>
              <span className="small text-muted">{completedJobs.length} sessions completed</span>
            </Card>
          </Col>
          <Col xs={6} lg={3}>
            <Card className="p-3 rounded-4 border shadow-sm bg-white text-center h-100">
              <span className="small text-muted d-block mb-1">Active Clients</span>
              <h2 className="h4 fw-bold text-dark mb-0">{confirmedJobs.length + pendingRequests.length} Pets</h2>
              <span className="small text-muted">In {currentUser.location}</span>
            </Card>
          </Col>
          <Col xs={6} lg={3}>
            <Card className="p-3 rounded-4 border shadow-sm bg-white text-center h-100">
              <span className="small text-muted d-block mb-1">Completed Jobs</span>
              <h2 className="h4 fw-bold text-dark mb-0">{completedJobs.length}</h2>
              <span className="small text-muted">{completedJobs.length > 0 ? '100% On-time' : 'Ready for bookings'}</span>
            </Card>
          </Col>
          <Col xs={6} lg={3}>
            <Card className="p-3 rounded-4 border shadow-sm bg-white text-center h-100">
              <span className="small text-muted d-block mb-1">PawMate Rating</span>
              <h2 className="h4 fw-bold text-warning mb-0">5.0 ★</h2>
              <span className="small text-muted">Verified Caregiver</span>
            </Card>
          </Col>
        </Row>

        <Row className="g-4">
          {/* Main Column */}
          <Col xs={12} lg={8}>
            {/* Pending Requests with Accept/Reject */}
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="h6 fw-bold mb-0 d-flex align-items-center gap-2">
                  <span>📩</span> New Booking Requests ({pendingRequests.length})
                </h3>
                <button
                  type="button"
                  className="btn btn-link p-0 text-forest text-decoration-none small fw-bold"
                  onClick={() => props.onNavigate && props.onNavigate('bookings')}
                >
                  View All Requests →
                </button>
              </div>

              {pendingRequests.length > 0 ? (
                <div className="d-flex flex-column gap-3">
                  {pendingRequests.map((req, idx) => (
                    <Card key={idx} className="p-3 rounded-4 border shadow-sm bg-white">
                      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
                        <div>
                          <div className="d-flex align-items-center gap-2">
                            <strong>{req.service}</strong>
                            <Badge bg="warning" text="dark" className="rounded-pill">Pending Approval</Badge>
                          </div>
                          <span className="small text-muted d-block">
                            For: <strong>{req.pet}</strong> (Parent: {req.clientName || 'Pet Parent'}) &nbsp;•&nbsp; 🗓️ {req.date} at {req.time}
                          </span>
                          {req.notes && (
                            <span className="small text-secondary fst-italic">
                              Notes: "{req.notes}"
                            </span>
                          )}
                        </div>

                        <div className="d-flex align-items-center gap-2">
                          <strong className="text-forest me-2">{req.price}</strong>
                          <Button
                            size="sm"
                            className="rounded-pill px-3 pawmate-btn-primary shadow-sm"
                            style={{ backgroundColor: '#1a4331', borderColor: '#1a4331' }}
                            onClick={() => props.onUpdateOrderStatus && props.onUpdateOrderStatus(req.id, 'Confirmed')}
                          >
                            Accept
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="rounded-pill px-3"
                            onClick={() => props.onUpdateOrderStatus && props.onUpdateOrderStatus(req.id, 'Cancelled')}
                          >
                            Decline
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-4 text-center rounded-4 border shadow-sm bg-white">
                  <p className="text-muted small mb-0">No new pending requests right now.</p>
                </Card>
              )}
            </div>

            {/* Confirmed / Upcoming Jobs */}
            <div>
              <h3 className="h6 fw-bold mb-3 d-flex align-items-center gap-2">
                <span>🗓️</span> Confirmed Upcoming Schedule ({confirmedJobs.length})
              </h3>
              {confirmedJobs.length > 0 ? (
                <div className="d-flex flex-column gap-2">
                  {confirmedJobs.map((job, idx) => (
                    <Card key={idx} className="p-3 rounded-4 border shadow-sm bg-white">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>{job.service} for {job.pet}</strong> (Client: {job.clientName || 'Pet Parent'})
                          <div className="small text-muted">🗓️ {job.date} at {job.time}</div>
                        </div>
                        <Button
                          variant="outline-success"
                          size="sm"
                          className="rounded-pill px-3"
                          onClick={() => props.onUpdateOrderStatus && props.onUpdateOrderStatus(job.id, 'Completed')}
                        >
                          Complete Session ✓
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-4 text-center rounded-4 border shadow-sm bg-white">
                  <p className="text-muted small mb-0">No confirmed jobs scheduled for today.</p>
                </Card>
              )}
            </div>
          </Col>

          {/* Right Sidebar */}
          <Col xs={12} lg={4}>
            {/* Quick Service Management */}
            <Card className="p-4 rounded-4 border shadow-sm bg-white mb-4">
              <h3 className="h6 fw-bold mb-3 d-flex align-items-center gap-2">
                <span>💼</span> Offered Services ({caregiverServices.length})
              </h3>
              {caregiverServices.length > 0 ? (
                <ul className="list-unstyled d-flex flex-column gap-2 small text-muted mb-3">
                  {caregiverServices.map((svc) => (
                    <li key={svc.id} className="d-flex justify-content-between">
                      <span>{svc.name}</span>
                      <strong className="text-forest">{svc.price}</strong>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="small text-muted mb-3">No services added to your portfolio yet.</p>
              )}
              <Button
                variant="light"
                className="w-100 py-2 rounded-pill small fw-bold border text-forest"
                onClick={() => props.onNavigate && props.onNavigate('my-services')}
              >
                Manage My Services
              </Button>
            </Card>

            {/* PawMate Alerts */}
            <Card className="p-4 rounded-4 border shadow-sm bg-white">
              <h3 className="h6 fw-bold mb-3 d-flex align-items-center gap-2">
                <span>🔔</span> Notifications & Tips
              </h3>
              <div className="small text-muted d-flex flex-column gap-2">
                <div>✓ <strong>Profile Active:</strong> Your PawMate account is ready to receive bookings in {currentUser.location}.</div>
                <div>💡 <strong>Tip:</strong> Keep GPS active during walking sessions for top parent ratings.</div>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CaregiverDashboard;
