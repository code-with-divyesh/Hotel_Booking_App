import React, { useState } from "react";
import "./Filters.css";

/**
 * Filters component
 *
 * Props:
 * - onChange: function(filters) called when filters change
 * - initial: optional initial filter state
 */
const defaultState = {
  popular: {
    singleBed: false,
    doubleBed: false,
    luxuryRoom: false,
    familySuite: false,
  },
  priceRange: {
    p0_500: false,
    p500_1000: false,
    p1000_2000: false,
    p2000_3000: false,
  },
  sortBy: "", // "low", "high", "newest"
};

export default function Filters({ onChange = () => {}, initial = {} }) {
  const [open, setOpen] = useState(window.innerWidth >= 1024); // expanded on large screens
  const [filters, setFilters] = useState({ ...defaultState, ...initial });

  const update = (section, key, value) => {
    setFilters((prev) => {
      const next = {
        ...prev,
        [section]: {
          ...prev[section],
          [key]: value,
        },
      };
      onChange(next);
      return next;
    });
  };

  const updateSort = (value) => {
    setFilters((prev) => {
      const next = { ...prev, sortBy: value };
      onChange(next);
      return next;
    });
  };

  const clearAll = () => {
    setFilters(defaultState);
    onChange(defaultState);
  };

  return (
    <aside className="filters-card" aria-label="Room filters">
      <div className="filters-header">
        <p className="filters-title">FILTERS</p>

        <div className="filters-actions">
          <button
            className="filters-toggle lg-hide"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="filters-panel"
            type="button"
          >
            {open ? "HIDE" : "SHOW"}
          </button>

          <button
            className="filters-clear lg-show"
            onClick={clearAll}
            type="button"
            aria-label="Clear filters"
          >
            CLEAR
          </button>
        </div>
      </div>

      <div
        id="filters-panel"
        className={`filters-panel ${open ? "is-open" : "is-collapsed"}`}
      >
        {/* Popular filters */}
        <div className="filters-section">
          <p className="section-title">Popular filters</p>

          <label className="control">
            <input
              type="checkbox"
              checked={filters.popular.singleBed}
              onChange={(e) =>
                update("popular", "singleBed", e.target.checked)
              }
            />
            <span className="control-label">Single Bed</span>
          </label>

          <label className="control">
            <input
              type="checkbox"
              checked={filters.popular.doubleBed}
              onChange={(e) =>
                update("popular", "doubleBed", e.target.checked)
              }
            />
            <span className="control-label">Double Bed</span>
          </label>

          <label className="control">
            <input
              type="checkbox"
              checked={filters.popular.luxuryRoom}
              onChange={(e) =>
                update("popular", "luxuryRoom", e.target.checked)
              }
            />
            <span className="control-label">Luxury Room</span>
          </label>

          <label className="control">
            <input
              type="checkbox"
              checked={filters.popular.familySuite}
              onChange={(e) =>
                update("popular", "familySuite", e.target.checked)
              }
            />
            <span className="control-label">Family Suite</span>
          </label>
        </div>

        {/* Price Range */}
        <div className="filters-section">
          <p className="section-title">Price Range</p>

          <label className="control">
            <input
              type="checkbox"
              checked={filters.priceRange.p0_500}
              onChange={(e) =>
                update("priceRange", "p0_500", e.target.checked)
              }
            />
            <span className="control-label">$ 0 to 500</span>
          </label>

          <label className="control">
            <input
              type="checkbox"
              checked={filters.priceRange.p500_1000}
              onChange={(e) =>
                update("priceRange", "p500_1000", e.target.checked)
              }
            />
            <span className="control-label">$ 500 to 1000</span>
          </label>

          <label className="control">
            <input
              type="checkbox"
              checked={filters.priceRange.p1000_2000}
              onChange={(e) =>
                update("priceRange", "p1000_2000", e.target.checked)
              }
            />
            <span className="control-label">$ 1000 to 2000</span>
          </label>

          <label className="control">
            <input
              type="checkbox"
              checked={filters.priceRange.p2000_3000}
              onChange={(e) =>
                update("priceRange", "p2000_3000", e.target.checked)
              }
            />
            <span className="control-label">$ 2000 to 3000</span>
          </label>
        </div>

        {/* Sort By */}
        <div className="filters-section">
          <p className="section-title">Sort By</p>

          <label className="control">
            <input
              type="radio"
              name="sortOption"
              checked={filters.sortBy === "low"}
              onChange={() => updateSort("low")}
            />
            <span className="control-label">Price Low to High</span>
          </label>

          <label className="control">
            <input
              type="radio"
              name="sortOption"
              checked={filters.sortBy === "high"}
              onChange={() => updateSort("high")}
            />
            <span className="control-label">Price High to Low</span>
          </label>

          <label className="control">
            <input
              type="radio"
              name="sortOption"
              checked={filters.sortBy === "newest"}
              onChange={() => updateSort("newest")}
            />
            <span className="control-label">Newest First</span>
          </label>
        </div>

        {/* Mobile clear button */}
        <div className="filters-bottom">
          <button className="clear-mobile" onClick={clearAll} type="button">
            Clear filters
          </button>
        </div>
      </div>
    </aside>
  );
}
