import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge, Button, Modal, Form } from 'react-bootstrap';

function CaregiverEarnings(props) {
  // Dynamic completed bookings
  const completedOrders = (props.orders || []).filter((o) => o.status === 'Completed');

  // Baseline demo earnings + completed orders
  const baseEarnings = 18450;
  const completedAdditions = completedOrders.reduce((acc, curr) => {
    const num = parseInt((curr.price || '0').replace(/[^0-9]/g, ''), 10);
    return acc + (isNaN(num) ? 0 : num);
  }, 0);

  const [availableEarnings, setAvailableEarnings] = useState(baseEarnings + completedAdditions);
  const [totalEarned] = useState(baseEarnings + completedAdditions);

  // Bank Accounts State (supports multiple accounts)
  const [bankAccounts, setBankAccounts] = useState([
    {
      id: 1,
      bankName: 'HDFC Bank',
      accountHolder: 'Shrey Vora',
      accountNumber: '50100492814521',
      ifscCode: 'HDFC0001234'
    }
  ]);

  // Selected Account for Payout
  const [selectedBankId, setSelectedBankId] = useState(1);

  // Modals State
  const [showAddBankModal, setShowAddBankModal] = useState(false);
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Add Bank Account Form State
  const [newHolderName, setNewHolderName] = useState('');
  const [newBankName, setNewBankName] = useState('HDFC Bank');
  const [newAccountNumber, setNewAccountNumber] = useState('');
  const [newIfsc, setNewIfsc] = useState('');
  const [bankFormError, setBankFormError] = useState('');

  // Payout Records State
  const [payoutRecords, setPayoutRecords] = useState([
    {
      id: 101,
      date: '20 Aug 2026',
      amount: '₹6,200',
      bankDisplay: 'HDFC Bank •••• 4521',
      status: 'Completed'
    },
    {
      id: 102,
      date: '12 Aug 2026',
      amount: '₹4,500',
      bankDisplay: 'HDFC Bank •••• 4521',
      status: 'Completed'
    }
  ]);

  // Handle Adding a Bank Account
  const handleAddBankAccountSubmit = (e) => {
    e.preventDefault();
    setBankFormError('');

    if (!newHolderName.trim()) {
      setBankFormError('Please enter the account holder name.');
      return;
    }
    if (!newAccountNumber.trim() || newAccountNumber.trim().length < 8) {
      setBankFormError('Please enter a valid bank account number (at least 8 digits).');
      return;
    }
    if (!newIfsc.trim()) {
      setBankFormError('Please enter the bank IFSC code.');
      return;
    }

    const newAcc = {
      id: Date.now(),
      bankName: newBankName,
      accountHolder: newHolderName.trim(),
      accountNumber: newAccountNumber.trim(),
      ifscCode: newIfsc.trim().toUpperCase()
    };

    setBankAccounts((prev) => [...prev, newAcc]);
    setSelectedBankId(newAcc.id);

    // Reset Form
    setNewHolderName('');
    setNewAccountNumber('');
    setNewIfsc('');
    setShowAddBankModal(false);

    // If opening from Payout flow, reopen payout modal
    setShowPayoutModal(true);
  };

  // Handle Removing a Bank Account
  const handleRemoveBankAccount = (accountId, e) => {
    if (e) e.stopPropagation();
    const updated = bankAccounts.filter((acc) => acc.id !== accountId);
    setBankAccounts(updated);
    if (selectedBankId === accountId && updated.length > 0) {
      setSelectedBankId(updated[0].id);
    }
  };

  // Handle Payout Confirmation
  const handleConfirmPayout = () => {
    const chosenAcc = bankAccounts.find((a) => a.id === selectedBankId) || bankAccounts[0];
    if (!chosenAcc || availableEarnings <= 0) return;

    const payoutAmountFormatted = `₹${availableEarnings.toLocaleString()}`;
    const newRecord = {
      id: Date.now(),
      date: 'Just Now',
      amount: payoutAmountFormatted,
      bankDisplay: `${chosenAcc.bankName} •••• ${chosenAcc.accountNumber.slice(-4)}`,
      status: 'Processing'
    };

    setPayoutRecords((prev) => [newRecord, ...prev]);
    setAvailableEarnings(0);
    setShowPayoutModal(false);
    setShowSuccessModal(true);
  };

  const selectedAccountObj = bankAccounts.find((a) => a.id === selectedBankId) || bankAccounts[0];

  return (
    <div className="pawmate-page-container py-5">
      <Container>
        {/* Header Strip */}
        <div className="mb-4">
          <div className="pawmate-eyebrow mb-1">FINANCIAL SUMMARY</div>
          <h1 className="pawmate-page-title mb-1">PawMate Earnings & Bank Payouts</h1>
          <p className="text-muted small mb-0">
            Manage your verified payout bank accounts, track available balance, and request instant earnings withdrawal.
          </p>
        </div>

        {/* Financial Highlights Strip */}
        <Row className="g-4 mb-4">
          <Col xs={12} md={4}>
            <Card className="p-4 rounded-4 border shadow-sm bg-white h-100 d-flex flex-column justify-content-between">
              <div>
                <span className="small text-muted d-block mb-1">Available for Withdrawal</span>
                <h2 className="h3 fw-bold text-forest mb-2">₹{availableEarnings.toLocaleString()}.00</h2>
                <p className="small text-muted mb-3">Direct IMPS / NEFT transfer to your verified account.</p>
              </div>
              <Button
                size="sm"
                className="pawmate-btn-primary rounded-pill px-4 py-2 fw-bold shadow-sm"
                style={{ backgroundColor: '#1a4331', borderColor: '#1a4331' }}
                onClick={() => setShowPayoutModal(true)}
                disabled={availableEarnings === 0}
              >
                Request Payout
              </Button>
            </Card>
          </Col>

          <Col xs={12} md={4}>
            <Card className="p-4 rounded-4 border shadow-sm bg-white h-100">
              <span className="small text-muted d-block mb-1">Total Lifetime Earned</span>
              <h2 className="h3 fw-bold text-dark mb-2">₹{totalEarned.toLocaleString()}.00</h2>
              <span className="small text-muted d-block mb-2">✓ Verified caregiver payout records</span>
              <Badge bg="success" className="px-2 py-1 small rounded-pill">
                100% Guaranteed Payout Rate
              </Badge>
            </Card>
          </Col>

          <Col xs={12} md={4}>
            <Card className="p-4 rounded-4 border shadow-sm bg-white h-100">
              <span className="small text-muted d-block mb-1">Settlement Cycle</span>
              <h2 className="h4 fw-bold text-dark mb-1">Within 48 Hours</h2>
              <p className="small text-muted mb-0">
                Transfers are processed on all business days directly to your linked bank account.
              </p>
            </Card>
          </Col>
        </Row>

        {/* Bank Accounts Management Section */}
        <Card className="p-4 rounded-4 border shadow-sm bg-white mb-4">
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-3 pb-2 border-bottom">
            <div>
              <h2 className="h5 fw-bold mb-1 text-dark d-flex align-items-center gap-2">
                <span>🏦</span> Linked Payout Bank Accounts
              </h2>
              <p className="text-muted small mb-0">
                Add and manage your personal savings or current bank accounts for receiving client earnings.
              </p>
            </div>
            <Button
              variant="outline-success"
              size="sm"
              className="rounded-pill px-3 py-1.5 fw-bold d-inline-flex align-items-center gap-1 shadow-xs"
              onClick={() => setShowAddBankModal(true)}
            >
              <span>+ Add Bank Account</span>
            </Button>
          </div>

          {bankAccounts.length > 0 ? (
            <Row className="g-3">
              {bankAccounts.map((acc) => (
                <Col xs={12} md={6} key={acc.id}>
                  <div className="p-3 bg-light rounded-4 border d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: '42px', height: '42px', backgroundColor: '#d6ebd9', color: '#1a4331', fontSize: '1.2rem' }}
                      >
                        🏛️
                      </div>
                      <div>
                        <strong className="d-block text-dark">{acc.bankName}</strong>
                        <span className="small text-muted d-block">
                          A/c ending •••• {acc.accountNumber.slice(-4)} &nbsp;|&nbsp; {acc.accountHolder}
                        </span>
                        <span className="small text-secondary font-monospace" style={{ fontSize: '0.75rem' }}>
                          IFSC: {acc.ifscCode}
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="rounded-pill px-2.5 py-1 small"
                      style={{ fontSize: '0.75rem' }}
                      onClick={(e) => handleRemoveBankAccount(acc.id, e)}
                      title="Remove Account"
                    >
                      Remove
                    </Button>
                  </div>
                </Col>
              ))}
            </Row>
          ) : (
            <div className="text-center py-4 bg-light rounded-4 border p-3">
              <span className="fs-3 d-block mb-1">🏦</span>
              <h3 className="h6 fw-bold mb-1">No bank accounts added yet</h3>
              <p className="small text-muted mb-3">
                Link your bank account to enable direct payouts of your pet care earnings.
              </p>
              <Button
                className="pawmate-btn-primary rounded-pill px-4 py-1.5 small fw-bold"
                style={{ backgroundColor: '#1a4331', borderColor: '#1a4331' }}
                onClick={() => setShowAddBankModal(true)}
              >
                + Add Bank Account
              </Button>
            </div>
          )}
        </Card>

        {/* Payout History Table */}
        <Card className="p-4 rounded-4 border shadow-sm bg-white">
          <h2 className="h6 fw-bold mb-3 text-dark d-flex align-items-center gap-2">
            <span>📋</span> Transfer & Payout History
          </h2>
          {payoutRecords.length > 0 ? (
            <div className="d-flex flex-column gap-2">
              {payoutRecords.map((p) => (
                <div key={p.id} className="p-3 bg-light rounded-3 d-flex justify-content-between align-items-center">
                  <div>
                    <strong className="text-dark">Direct Bank Transfer</strong>
                    <span className="small text-muted d-block">
                      {p.date} • Sent to {p.bankDisplay}
                    </span>
                  </div>
                  <div className="text-end">
                    <strong className="text-forest d-block">{p.amount}</strong>
                    <Badge
                      className="rounded-pill px-2 py-1"
                      style={
                        p.status === 'Completed'
                          ? { backgroundColor: '#d6ebd9', color: '#1a4331', border: '1px solid #b7ddbd' }
                          : { backgroundColor: '#fef3c7', color: '#92400e', border: '1px solid #fde68a' }
                      }
                    >
                      {p.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="fs-2 mb-2">💰</div>
              <h3 className="h6 fw-bold mb-1">No Payout Transfers Yet</h3>
              <p className="small text-muted mb-0">
                Completed bookings and requested payouts will automatically appear here.
              </p>
            </div>
          )}
        </Card>

        {/* Modal 1: Request Payout Modal */}
        <Modal show={showPayoutModal} onHide={() => setShowPayoutModal(false)} centered>
          <Modal.Header closeButton className="border-0 pb-0">
            <Modal.Title className="h5 fw-bold text-dark d-flex align-items-center gap-2">
              <span>💰</span> Request Earnings Payout
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="py-3">
            {bankAccounts.length > 0 ? (
              <>
                <div className="p-3 rounded-3 mb-3" style={{ backgroundColor: '#fcfbf7', border: '1px solid #e8e5de' }}>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="small text-muted">Available Earnings:</span>
                    <strong className="h5 fw-bold text-forest mb-0">₹{availableEarnings.toLocaleString()}.00</strong>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="small text-muted">Processing Fee:</span>
                    <span className="small text-success fw-bold">₹0 (Free Transfer)</span>
                  </div>
                </div>

                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold text-dark">Select Bank Account</Form.Label>
                  <Form.Select
                    value={selectedBankId}
                    onChange={(e) => setSelectedBankId(Number(e.target.value))}
                    className="py-2"
                  >
                    {bankAccounts.map((acc) => (
                      <option key={acc.id} value={acc.id}>
                        {acc.bankName} •••• {acc.accountNumber.slice(-4)} ({acc.accountHolder})
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {selectedAccountObj && (
                  <div className="p-3 bg-light rounded-3 border mb-3 small text-muted">
                    <div>Selected Account: <strong>{selectedAccountObj.bankName} •••• {selectedAccountObj.accountNumber.slice(-4)}</strong></div>
                    <div>Account Holder: <strong>{selectedAccountObj.accountHolder}</strong></div>
                    <div>IFSC: <strong>{selectedAccountObj.ifscCode}</strong></div>
                  </div>
                )}

                <div className="small text-muted">
                  🔒 Funds will be credited to your verified bank account via IMPS/NEFT within 48 hours.
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <span className="fs-1 d-block mb-2">⚠️</span>
                <h3 className="h6 fw-bold mb-1 text-dark">No bank accounts added.</h3>
                <p className="small text-muted mb-3">
                  Please link a bank account first to receive your payout.
                </p>
                <Button
                  className="pawmate-btn-primary rounded-pill px-4 py-2 fw-bold"
                  style={{ backgroundColor: '#1a4331', borderColor: '#1a4331' }}
                  onClick={() => {
                    setShowPayoutModal(false);
                    setShowAddBankModal(true);
                  }}
                >
                  + Add Bank Account
                </Button>
              </div>
            )}
          </Modal.Body>
          {bankAccounts.length > 0 && (
            <Modal.Footer className="border-0 pt-0">
              <Button variant="light" onClick={() => setShowPayoutModal(false)} className="border">
                Cancel
              </Button>
              <Button
                className="pawmate-btn-primary px-4 py-2 fw-bold rounded-pill shadow-sm"
                style={{ backgroundColor: '#1a4331', borderColor: '#1a4331' }}
                onClick={handleConfirmPayout}
                disabled={availableEarnings <= 0}
              >
                Confirm Payout
              </Button>
            </Modal.Footer>
          )}
        </Modal>

        {/* Modal 2: Add Bank Account Modal */}
        <Modal show={showAddBankModal} onHide={() => setShowAddBankModal(false)} centered>
          <Modal.Header closeButton className="border-0 pb-0">
            <Modal.Title className="h5 fw-bold text-forest d-flex align-items-center gap-2">
              <span>🏛️</span> Link New Bank Account
            </Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleAddBankAccountSubmit}>
            <Modal.Body className="py-3">
              {bankFormError && (
                <div className="alert alert-danger py-2 small mb-3">
                  {bankFormError}
                </div>
              )}

              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold">Account Holder Name *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Shrey Vora or Rahul Sharma"
                  value={newHolderName}
                  onChange={(e) => setNewHolderName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold">Bank Name *</Form.Label>
                <Form.Select
                  value={newBankName}
                  onChange={(e) => setNewBankName(e.target.value)}
                >
                  <option value="HDFC Bank">HDFC Bank</option>
                  <option value="ICICI Bank">ICICI Bank</option>
                  <option value="State Bank of India">State Bank of India</option>
                  <option value="Axis Bank">Axis Bank</option>
                  <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                  <option value="Punjab National Bank">Punjab National Bank</option>
                  <option value="Bank of Baroda">Bank of Baroda</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold">Account Number *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter full bank account number"
                  value={newAccountNumber}
                  onChange={(e) => setNewAccountNumber(e.target.value)}
                  required
                />
                <Form.Text className="text-muted small">
                  For your security, only the last 4 digits (•••• XXXX) will be shown in the interface.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label className="small fw-bold">Bank IFSC Code *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. HDFC0001234"
                  value={newIfsc}
                  onChange={(e) => setNewIfsc(e.target.value.toUpperCase())}
                  required
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer className="border-0 pt-0">
              <Button variant="light" onClick={() => setShowAddBankModal(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="pawmate-btn-primary fw-bold px-4 rounded-pill"
                style={{ backgroundColor: '#1a4331', borderColor: '#1a4331' }}
              >
                Save Bank Account
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        {/* Modal 3: Payout Request Successful Modal */}
        <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
          <Modal.Body className="py-5 text-center px-4">
            <div
              className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3 shadow-sm"
              style={{ width: '64px', height: '64px', backgroundColor: '#d6ebd9', color: '#1a4331', fontSize: '2rem' }}
            >
              ✓
            </div>
            <h2 className="h4 fw-bold text-forest mb-2">Payout Request Successful</h2>
            <p className="text-muted small mb-2">
              Your payout request has been submitted.
            </p>
            <p className="text-dark fw-semibold small mb-4">
              You will receive your earnings within 48 hours.
            </p>
            <Button
              className="pawmate-btn-primary px-5 py-2 fw-bold rounded-pill shadow-sm"
              style={{ backgroundColor: '#1a4331', borderColor: '#1a4331' }}
              onClick={() => setShowSuccessModal(false)}
            >
              Done
            </Button>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}

export default CaregiverEarnings;
