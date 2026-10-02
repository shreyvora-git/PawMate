import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

function PawMateCard(props) {
  const [internalFavorite, setInternalFavorite] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const isFav = props.isFavorite !== undefined ? props.isFavorite : internalFavorite;

  const toggleFavorite = (e) => {
    e.stopPropagation();
    if (props.onToggleFavorite) {
      props.onToggleFavorite(props.name);
    } else {
      setInternalFavorite(!internalFavorite);
    }
  };

  const handleBooking = (e) => {
    e.stopPropagation();
    if (props.onBook) {
      props.onBook();
    } else {
      setIsBooked(!isBooked);
    }
  };

  return (
    <Card className="pawmate-profile-card h-100 w-100 position-relative shadow-sm">
      <Button
        type="button"
        className={`pawmate-favorite-btn position-absolute top-0 start-0 m-3 ${isFav ? 'favorited heart-pop' : ''}`}
        onClick={toggleFavorite}
        aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFav ? '❤️' : '🤍'}
      </Button>

      <div className="profile-rating-badge position-absolute top-0 end-0 m-3 d-flex align-items-center gap-1 shadow-sm">
        <span className="star-icon">⭐</span>
        <span className="rating-num">{props.rating}</span>
      </div>

      <div className="profile-img-wrapper">
        <Card.Img
          variant="top"
          src={props.image}
          alt={props.name}
          className="profile-img"
        />
      </div>

      <Card.Body className="profile-card-body p-4 d-flex flex-column justify-content-between">
        <div>
          <Card.Title as="h3" className="profile-name mb-1">{props.name}</Card.Title>
          <p className="profile-subtitle mb-2">
            {props.service} • {props.experience}
          </p>
          <p className="profile-location mb-3">
            📍 {props.location}
          </p>

          <div className="d-flex flex-wrap gap-1 mb-3">
            {props.tags && props.tags.map((tag, idx) => (
              <span key={idx} className="profile-spec-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="profile-card-footer pt-3 border-top d-flex align-items-center justify-content-between">
          <div>
            <span className="profile-price-from">From</span>
            <div className="profile-price-val">{props.price}</div>
          </div>

          <Button
            type="button"
            className={`btn ${isBooked ? 'btn-success' : 'pawmate-book-btn'}`}
            onClick={handleBooking}
          >
            {isBooked ? '✓ Requested' : 'Book'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default PawMateCard;
