import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import debounce from 'lodash.debounce';
import '../styles/marketplace.css';

// Fetch materials API
const fetchMaterials = async () => {
  const res = await fetch('/api/materials');
  if (!res.ok) throw new Error('Error fetching materials');
  return res.json();
};

export default function MarketplaceMaterial() {
  const { data, isLoading, isError, error } = useQuery(['materials'], fetchMaterials, {
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });

  if (isLoading) return <div className="marketplace material-marketplace">Loading materials...</div>;
  if (isError) return <div className="marketplace error">Error: {error.message}</div>;

  const items = data;
  const columnCount = 3;
  const rowCount = Math.ceil(items.length / columnCount);

  // Debounce item click
  const handleClick = React.useCallback(
    debounce((item) => {
      window.dispatchEvent(new CustomEvent('add-material', { detail: item }));
    }, 200),
    []
  );

  return (
    <section className="marketplace material-marketplace">
      <h2>Material Marketplace</h2>
      <AutoSizer>
        {({ height, width }) => (
          <Grid
            columnCount={columnCount}
            columnWidth={width / columnCount}
            height={height}
            rowCount={rowCount}
            rowHeight={300}
            width={width}
          >
            {({ columnIndex, rowIndex, style }) => {
              const index = rowIndex * columnCount + columnIndex;
              if (index >= items.length) return null;
              const { id, name, description, unitCost, unit, imageUrl } = items[index];
              return (
                <div key={id} style={style} className="item-card" role="button" tabIndex={0} onClick={() => handleClick(items[index])} onKeyPress={() => handleClick(items[index])}>
                  <img src={imageUrl} alt={name} className="item-img" loading="lazy" />
                  <div className="item-info">
                    <h3>{name}</h3>
                    <p>{description}</p>
                    <p>
                      <strong>{unitCost} per {unit}</strong>
                    </p>
                  </div>
                </div>
              );
            }}
          </Grid>
        )}
      </AutoSizer>
    </section>
  );
}

MarketplaceMaterial.propTypes = {
  // no props
};
