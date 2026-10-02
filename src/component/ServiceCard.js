import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';

function ServiceCard(props) {
  const handleSelect = () => {
    if (props.onSelect) {
      props.onSelect(props.name);
    }
  };

  return (
    <Card
      className={`pawmate-service-card h-100 w-100 ${props.isSelected ? 'selected-card' : ''}`}
      onClick={handleSelect}
      style={{ cursor: 'pointer' }}
    >
      <div className="service-card-image-wrap position-relative">
        <Card.Img
          variant="top"
          src={props.image}
          alt={props.name}
          className="service-card-img"
        />
        {props.badge && (
          <Badge className="service-card-badge position-absolute top-0 start-0 m-3">
            {props.badge}
          </Badge>
        )}
        <div className="service-floating-icon">
          <span>{props.icon || '🐾'}</span>
        </div>
      </div>

      <Card.Body className="service-card-body p-4 pt-4 d-flex flex-column justify-content-between">
        <div>
          <Card.Title as="h3" className="service-card-title mb-1 text-wrap" style={{ wordBreak: 'normal', overflowWrap: 'break-word', whiteSpace: 'normal' }}>
            {props.name}
          </Card.Title>
          <Card.Text className="service-card-desc mb-3" style={{ wordBreak: 'normal', overflowWrap: 'break-word' }}>
            {props.description}
          </Card.Text>
        </div>

        <div className="service-card-footer pt-3 border-top d-flex align-items-center justify-content-between">
          <div>
            <div className="service-location-text">
              📍 {props.location}
            </div>
            <div className="service-price-text">
              <span className="price-val">{props.price}</span>
              <span className="price-unit">/session</span>
            </div>
          </div>

          <Button
            type="button"
            className="service-action-btn p-0"
            aria-label={`Select ${props.name}`}
            onClick={(e) => {
              e.stopPropagation();
              handleSelect();
            }}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ServiceCard;
