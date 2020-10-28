import React from 'react';
import SearchBar from './SearchBar';

import './Home.css';

export default function Home() {
  return (
    <div className="home-main-container">
      <div className="home-container">
        <h1>Meals Factory</h1>
        <p>
          <i>Find awesome recipes</i>
        </p>

        <SearchBar />
      </div>
    </div>
  );
}
