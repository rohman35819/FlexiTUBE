import React, { lazy, Suspense } from 'react';
import '../styles/marketplace.css';

const ImageWithPlaceholder = lazy(() => import('./ImageWithPlaceholder'));

export default function MarketplaceMachinery() {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    let isMounted = true;
    async function loadItems() {
      try {
        const response = await fetch('/api/machinery');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        if (isMounted) setItems(data);
      } catch (err) {
        if (isMounted) setError(err.message || 'Failed to load machinery list.');
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadItems();
    return () => { isMounted = false; };
  }, []);

  if (loading) return <div className="marketplace machinery-marketplace">Loading machinery...</div>;
  if (error) return <div className="marketplace error">Error: {error}</div>;

  return (
    <section className="marketplace machinery-marketplace">
      <h2>Machinery Marketplace</h2>
      <div className="items-grid">
        {items.map(({ id, name, description, price, currency, imageUrl }) => (
          <article key={id} className="item-card" tabIndex={0} aria-labelledby={`title-${id}`}>
            <Suspense fallback={<div className="img-placeholder" />}>
              <ImageWithPlaceholder src={imageUrl} alt={name} />
            </Suspense>
            <div className="item-info">
              <h3 id={`title-${id}`}>{name}</h3>
              <p className="item-desc">{description}</p>
              <p className="item-price">Price: <strong>{price} {currency}</strong></p>
              <button
                className="add-cart-btn"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('add-to-cart', { detail: { id, name, price } }));
                }}
                aria-label={`Add ${name} to cart`}
              >
                Add to Cart
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
