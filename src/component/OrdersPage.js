import React, { useState } from 'react';
import { Container, Card, Badge, Button } from 'react-bootstrap';
import CancelBookingModal from './CancelBookingModal';

function OrdersPage(props) {
  const [activeTab, setActiveTab] = useState('ALL');
  const [cancellingOrderId, setCancellingOrderId] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const tabs = ['ALL', 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'];
  const allOrders = props.orders || [];

  const filteredOrders = allOrders.filter((order) => {
    if (activeTab === 'ALL') return true;
    return order.status.toUpperCase() === activeTab;
  });

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return (
          <Badge
            className="px-2 py-1 rounded-pill"
            style={{ backgroundColor: '#d6ebd9', color: '#1a4331', border: '1px solid #b7ddbd' }}
          >
            Confirmed
          </Badge>
        );
      case 'completed':
        return (
          <Badge
            className="px-2 py-1 rounded-pill"
            style={{ backgroundColor: '#1a4331', color: '#ffffff' }}
          >
            Completed
          </Badge>
        );
      case 'cancelled':
        return <Badge bg="danger" className="px-2 py-1 rounded-pill">Cancelled</Badge>;
      case 'pending':
      default:
        return <Badge bg="warning" text="dark" className="px-2 py-1 rounded-pill">Pending</Badge>;
    }
  };

  const handleOpenCancelModal = (orderId) => {
    setCancellingOrderId(orderId);
    setShowCancelModal(true);
  };

  const handleConfirmCancel = (orderId, reason) => {
    if (props.onUpdateOrderStatus) {
      props.onUpdateOrderStatus(orderId, 'Cancelled', reason);
    }
  };

  return (
    <div className="pawmate-page-container py-5">
      <Container>
        {/* Header */}
        <div className="mb-4 reveal-on-scroll">
          <h1 className="h3 fw-bold mb-1 d-flex align-items-center gap-2 text-dark">
            <span>📋</span> My Booking Orders
          </h1>
          <p className="text-muted small mb-0">
            Review, message PawMates, and submit feedback for completed pet sessions.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="orders-nav-tabs d-flex gap-4 border-bottom mb-4 reveal-on-scroll">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`order-tab-btn ${activeTab === tab ? 'active-tab' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Area */}
        {filteredOrders.length > 0 ? (
          <div className="d-flex flex-column gap-3 reveal-on-scroll">
            {filteredOrders.map((order, idx) => (
              <Card key={order.id || idx} className="p-4 rounded-4 border shadow-sm pawmate-order-card bg-white">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={order.caregiverImage || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80'}
                      alt={order.caregiver}
                      className="rounded-circle object-fit-cover shadow-sm border border-2 border-forest"
                      width="54"
                      height="54"
                    />
                    <div>
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <h2 className="h6 fw-bold mb-0 text-dark">{order.service}</h2>
                        {getStatusBadge(order.status)}
                      </div>
                      <p className="small text-muted mb-0">
                        PawMate: <strong>{order.caregiver}</strong> &nbsp;•&nbsp; For: <strong>{order.pet}</strong>
                      </p>
                      <p className="small text-secondary mb-0">
                        🗓️ {order.date} at {order.time}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-between justify-content-md-end gap-3 pt-2 pt-md-0 border-top border-md-0">
                    <div className="text-md-end">
                      <span className="small text-muted d-block">Amount</span>
                      <strong className="text-forest fs-5">{order.price}</strong>
                    </div>

                    {order.status === 'Pending' && (
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="rounded-pill px-3"
                        onClick={() => handleOpenCancelModal(order.id)}
                      >
                        Cancel
                      </Button>
                    )}

                    {order.status === 'Confirmed' && (
                      <div className="d-flex gap-2">
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="rounded-pill px-3"
                          onClick={() => handleOpenCancelModal(order.id)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="outline-success"
                          size="sm"
                          className="rounded-pill px-3"
                          onClick={() => props.onUpdateOrderStatus && props.onUpdateOrderStatus(order.id, 'Completed')}
                        >
                          Mark Completed
                        </Button>
                      </div>
                    )}

                    {order.status === 'Completed' && (
                      <Button
                        size="sm"
                        className="pawmate-btn-primary rounded-pill px-3 shadow-sm"
                        style={{ backgroundColor: '#1a4331', borderColor: '#1a4331' }}
                        onClick={() => props.onNavigate && props.onNavigate('services')}
                      >
                        Rebook
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-4 border p-5 text-center shadow-sm my-4 reveal-on-scroll">
            <div className="empty-clipboard-icon mb-3" style={{ fontSize: '3rem' }}>
              📋
            </div>
            <h2 className="h5 fw-bold mb-2">You don't have any bookings yet.</h2>
            <p className="text-muted small max-w-700 mx-auto mb-4">
              Browse our verified pet services and book your first session with a certified local PawMate.
            </p>
            <Button
              className="px-4 py-2 rounded-pill fw-bold shadow-sm pawmate-btn-primary"
              style={{ backgroundColor: '#1a4331', borderColor: '#1a4331', color: '#ffffff' }}
              onClick={() => props.onNavigate && props.onNavigate('services')}
            >
              Explore Services
            </Button>
          </div>
        )}
      </Container>

      {/* Cancel Booking Confirmation Modal */}
      <CancelBookingModal
        show={showCancelModal}
        onHide={() => setShowCancelModal(false)}
        orderId={cancellingOrderId}
        isPawMate={false}
        onConfirmCancel={handleConfirmCancel}
      />
    </div>
  );
}

export default OrdersPage;
