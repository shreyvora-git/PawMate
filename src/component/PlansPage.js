import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import PaymentModal from './PaymentModal';
import CancelSubscriptionModal from './CancelSubscriptionModal';
import ChangePlanModal from './ChangePlanModal';

function PlansPage(props) {
  const [selectedPlanForPayment, setSelectedPlanForPayment] = useState(null);
  const [pendingSwitchPlan, setPendingSwitchPlan] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showChangePlanModal, setShowChangePlanModal] = useState(false);

  const plans = [
    {
      id: 'basic',
      name: 'Basic Care',
      tagline: 'Essential monthly routine care for relaxed or senior pets.',
      price: '₹999',
      unit: '/ month',
      features: [
        '8 Dog walks / check-ins',
        '4 Feeding drop-ins',
        '2 Interactive play sessions',
        'Daily digital photo reports'
      ]
    },
    {
      id: 'active',
      name: 'Active Care',
      tagline: 'Our most popular option for high-energy pets needing routine walks and social sessions.',
      price: '₹1999',
      unit: '/ month',
      popular: true,
      features: [
        '16 Dog walks / runs',
        '8 Play sessions / park playdates',
        '4 Overnight sitting sessions',
        'Priority customer support'
      ]
    },
    {
      id: 'complete',
      name: 'Complete Care',
      tagline: 'Comprehensive premium care package covering walks, feeding, sits, and expert spa grooming.',
      price: '₹3499',
      unit: '/ month',
      features: [
        '24 Dog walks / runs',
        '12 Feeding drop-ins',
        '8 Sitting sessions',
        '2 Luxury mobile grooming sessions',
        '24/7 dedicated support line'
      ]
    }
  ];

  const currentActivePlanObj = plans.find((p) => p.id === props.activePlan);

  const handleSubscribeClick = (plan) => {
    // If user already has an active plan and selects a different plan
    if (props.activePlan && props.activePlan !== plan.id) {
      setPendingSwitchPlan(plan);
      setShowChangePlanModal(true);
      return;
    }

    // Otherwise open payment modal directly
    setSelectedPlanForPayment(plan);
    setShowPaymentModal(true);
  };

  const handleConfirmPlanChange = (newPlan) => {
    setShowChangePlanModal(false);
    setSelectedPlanForPayment(newPlan);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (planId) => {
    if (props.onSelectPlan) {
      props.onSelectPlan(planId);
    }
  };

  const handleConfirmCancel = () => {
    if (props.onCancelPlan) {
      props.onCancelPlan();
    } else if (props.onSelectPlan) {
      props.onSelectPlan(null);
    }
  };

  return (
    <div className="pawmate-page-container py-5">
      <Container>
        {/* Header Section */}
        <div className="text-center max-w-700 mx-auto mb-5 reveal-on-scroll">
          <div className="d-inline-block mb-3">
            <span
              className="badge px-3 py-2 rounded-pill fw-bold text-uppercase"
              style={{ backgroundColor: '#ffefe8', color: '#ff5733', letterSpacing: '0.05em' }}
            >
              ✨ SAVE WITH MONTHLY SUBSCRIPTIONS
            </span>
          </div>
          <h1 className="pawmate-page-title mb-3">PawMate Routine Subscription Plans</h1>
          <p className="text-muted small fs-6">
            Subscribe to structured weekly care slots. Save up to 25% compared to single bookings. Manage walks, feeding visits, and agility playdates on a routine track.
          </p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <Row className="g-4 mb-5 justify-content-center reveal-on-scroll">
          {plans.map((plan) => {
            const isSubscribed = props.activePlan === plan.id;
            return (
              <Col xs={12} lg={4} key={plan.id}>
                <Card className={`pawmate-plan-card h-100 p-4 p-md-5 rounded-4 border ${plan.popular ? 'popular-plan-border' : ''} shadow-sm position-relative`}>
                  {plan.popular && (
                    <Badge
                      bg="danger"
                      className="position-absolute top-0 end-0 m-3 px-3 py-1 text-uppercase fw-bold rounded-pill"
                      style={{ backgroundColor: '#ff5733' }}
                    >
                      Most Popular
                    </Badge>
                  )}

                  <Card.Title as="h3" className="h4 fw-bold mb-2">{plan.name}</Card.Title>
                  <p className="small text-muted mb-4" style={{ minHeight: '40px' }}>
                    {plan.tagline}
                  </p>

                  <div className="d-flex align-items-baseline mb-4">
                    <span className="h1 fw-bolder mb-0 text-dark">{plan.price}</span>
                    <span className="text-muted small ms-1">{plan.unit}</span>
                  </div>

                  <ul className="list-unstyled d-flex flex-column gap-3 mb-5 small">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="d-flex align-items-center gap-2 text-secondary">
                        <span className="text-danger fw-bold">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {isSubscribed ? (
                    <div className="d-flex flex-column gap-2 mt-auto">
                      <Button
                        type="button"
                        className="w-100 py-3 rounded-pill fw-bold text-uppercase letter-spacing-1 shadow-sm"
                        style={{
                          backgroundColor: '#1a4331',
                          borderColor: '#1a4331',
                          color: '#ffffff',
                          fontSize: '0.85rem'
                        }}
                        disabled
                      >
                        SUBSCRIBED ✓
                      </Button>
                      <Button
                        type="button"
                        variant="outline-danger"
                        size="sm"
                        className="rounded-pill py-1.5 fw-semibold small"
                        onClick={() => setShowCancelModal(true)}
                      >
                        Cancel Subscription
                      </Button>
                    </div>
                  ) : (
                    <Button
                      type="button"
                      className="w-100 py-3 rounded-pill fw-bold text-uppercase letter-spacing-1 shadow-sm mt-auto"
                      style={{
                        backgroundColor: '#ff5733',
                        borderColor: '#ff5733',
                        color: '#ffffff',
                        fontSize: '0.85rem'
                      }}
                      onClick={() => handleSubscribeClick(plan)}
                    >
                      SUBSCRIBE NOW
                    </Button>
                  )}
                </Card>
              </Col>
            );
          })}
        </Row>

        {/* Benefits Note */}
        <div className="text-center p-4 bg-white rounded-4 border shadow-sm max-w-700 mx-auto reveal-on-scroll">
          <h4 className="h6 fw-bold mb-1">🛡️ All plans include 100% money-back satisfaction guarantee</h4>
          <p className="small text-muted mb-0">
            Pause, rollover unused sessions, or cancel anytime with zero cancellation fees directly from your Dashboard.
          </p>
        </div>
      </Container>

      {/* Payment Checkout Modal */}
      <PaymentModal
        show={showPaymentModal}
        onHide={() => setShowPaymentModal(false)}
        plan={selectedPlanForPayment}
        currentUser={props.currentUser}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Cancel Subscription Confirmation Modal */}
      <CancelSubscriptionModal
        show={showCancelModal}
        onHide={() => setShowCancelModal(false)}
        onConfirmCancel={handleConfirmCancel}
      />

      {/* Warning Modal when switching active plans */}
      <ChangePlanModal
        show={showChangePlanModal}
        onHide={() => setShowChangePlanModal(false)}
        currentPlan={currentActivePlanObj}
        newPlan={pendingSwitchPlan}
        onConfirmChange={handleConfirmPlanChange}
      />
    </div>
  );
}

export default PlansPage;
