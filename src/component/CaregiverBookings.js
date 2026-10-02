import React, { useState } from 'react';
import { Container, Card, Badge, Button } from 'react-bootstrap';
import CancelBookingModal from './CancelBookingModal';

function CaregiverBookings(props) {
  const [activeTab, setActiveTab] = useState('ALL');
  const [cancellingOrderId, setCancellingOrderId] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const tabs = ['ALL', 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'];
  const allOrders = props.orders || [];

  const filteredOrders = allOrders.filter((order) => {
    if (activeTab === 'ALL') return true;
    const s = (order.status || '').toUpperCase();
    if (activeTab === 'PENDING') return s === 'PENDING' || s === 'UPCOMING';
    return s === activeTab;
  });

  const getStatusBadge = (status) => {
    const s = (status || '').toLowerCase();
    switch (s) {
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
      case 'upcoming':
      default:
        return <Badge bg="warning" text="dark" className="px-2 py-1 rounded-pill">{status || 'Pending Approval'}</Badge>;
    }
  };

  const handleOpenCancel = (orderId) => {
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
        <div className="mb-4">
          <div className="pawmate-eyebrow mb-1">SCHEDULE & REQUESTS</div>
          <h1 className="pawmate-page-title mb-1">PawMate Booking Management</h1>
          <p className="text-muted small mb-0">Accept incoming pet care requests, confirm session slots, and mark completed jobs.</p>
        </div>

        {/* Filter Tabs */}
        <div className="orders-nav-tabs d-flex gap-4 border-bottom mb-4">
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

        {/* Bookings List */}
        {filteredOrders.length > 0 ? (
          <div className="d-flex flex-column gap-3">
            {filteredOrders.map((order, idx) => (
              <Card key={order.id || idx} className="p-4 rounded-4 border shadow-sm pawmate-order-card bg-white">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                  <div>
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <h3 className="h6 fw-bold mb-0 text-dark">{order.service}</h3>
                      {getStatusBadge(order.status)}
                    </div>
                    <p className="small text-muted mb-1">
                      Pet: <strong>{order.pet}</strong> &nbsp;•&nbsp; Client: <strong>{order.clientName || 'Pet Parent'}</strong>
                    </p>
                    <p className="small text-secondary mb-1">
                      🗓️ {order.date} at {order.time}
                    </p>
                    {order.notes && (
                      <p className="small text-muted fst-italic mb-0">
                        Instructions: "{order.notes}"
                      </p>
                    )}
                  </div>

                  <div className="d-flex align-items-center justify-content-between justify-content-md-end gap-3 pt-2 pt-md-0 border-top border-md-0">
                    <div className="text-md-end me-2">
                      <span className="small text-muted d-block">Payout</span>
                      <strong className="text-forest fs-5">{order.price}</strong>
                    </div>

                    {(order.status === 'Pending' || order.status === 'Upcoming') && (
                      <div className="d-flex gap-2">
                        <Button
                          size="sm"
                          className="rounded-pill px-3 pawmate-btn-primary shadow-sm"
                          style={{ backgroundColor: '#1a4331', borderColor: '#1a4331' }}
                          onClick={() => props.onUpdateOrderStatus && props.onUpdateOrderStatus(order.id, 'Confirmed')}
                        >
                          Accept Booking
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="rounded-pill px-3"
                          onClick={() => handleOpenCancel(order.id)}
                        >
                          Decline
                        </Button>
                      </div>
                    )}

                    {order.status === 'Confirmed' && (
                      <div className="d-flex gap-2">
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="rounded-pill px-3"
                          onClick={() => handleOpenCancel(order.id)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="outline-success"
                          size="sm"
                          className="rounded-pill px-3"
                          onClick={() => props.onUpdateOrderStatus && props.onUpdateOrderStatus(order.id, 'Completed')}
                        >
                          Mark Completed ✓
                        </Button>
                      </div>
                    )}

                    {order.status === 'Completed' && (
                      <span className="small text-forest fw-bold">
                        ✓ Payout Processed
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-4 border p-5 text-center shadow-sm my-4">
            <div className="empty-clipboard-icon mb-3" style={{ fontSize: '3rem' }}>
              📋
            </div>
            <h3 className="h5 fw-bold mb-2">No Bookings Found</h3>
            <p className="text-muted small max-w-700 mx-auto mb-0">
              No booking records match the "{activeTab}" filter.
            </p>
          </div>
        )}
      </Container>

      {/* Cancel Booking Modal */}
      <CancelBookingModal
        show={showCancelModal}
        onHide={() => setShowCancelModal(false)}
        orderId={cancellingOrderId}
        isPawMate={true}
        onConfirmCancel={handleConfirmCancel}
      />
    </div>
  );
}

export default CaregiverBookings;
