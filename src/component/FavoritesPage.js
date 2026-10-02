import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import PawMateCard from './PawMateCard';

function FavoritesPage(props) {
  const favoriteNames = props.favorites || [];
  const favoriteMates = (props.pawMates || []).filter((mate) =>
    favoriteNames.includes(mate.name)
  );

  return (
    <div className="pawmate-page-container py-5">
      <Container>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 reveal-on-scroll">
          <div>
            <div className="pawmate-eyebrow mb-1">SAVED CAREGIVERS</div>
            <h1 className="pawmate-page-title mb-1">My Favorite PawMates</h1>
            <p className="text-muted mb-0 small">Quickly access and book your preferred pet sitters and dog walkers.</p>
          </div>
          <Button
            variant="outline-success"
            className="mt-3 mt-md-0 rounded-pill px-4"
            onClick={() => props.onNavigate && props.onNavigate('services')}
          >
            Explore More Services →
          </Button>
        </div>

        {favoriteMates.length > 0 ? (
          <Row className="g-4 reveal-on-scroll">
            {favoriteMates.map((mate, index) => (
              <PawMateCard
                key={index}
                name={mate.name}
                rating={mate.rating}
                location={mate.location}
                experience={mate.experience}
                service={mate.service}
                price={mate.price}
                tags={mate.tags}
                image={mate.image}
                isFavorite={true}
                onToggleFavorite={props.onToggleFavorite}
                onBook={() => {
                  if (props.onOpenBooking) {
                    props.onOpenBooking(mate);
                  }
                }}
              />
            ))}
          </Row>
        ) : (
          <div className="text-center py-5 bg-white rounded-4 border shadow-sm my-4 reveal-on-scroll p-4">
            <div className="fs-1 mb-3">🤍</div>
            <h2 className="h5 fw-bold mb-2">No PawMates saved yet.</h2>
            <p className="text-muted small max-w-700 mx-auto mb-4">
              Tap the heart icon on any caregiver's profile across the marketplace to save them here for fast recurring bookings.
            </p>
            <Button
              variant="success"
              className="pawmate-btn-primary px-4 py-2 rounded-pill fw-bold shadow-sm"
              style={{ backgroundColor: '#1a4331', borderColor: '#1a4331' }}
              onClick={() => props.onNavigate && props.onNavigate('services')}
            >
              Explore Services
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
}

export default FavoritesPage;
