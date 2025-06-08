import React from "react";
import "./Home.css";

export default function Home() {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">The Spine Atlas</h1>
        <p className="hero-subtitle">Master operative spine surgery</p>
        <button className="hero-button">Explore the Library</button>
      </div>

      {/* Overview Section */}
      <div className="overview">
        <div className="card">
          <h2>Seminal Papers</h2>
          <p>Read the classics that shaped spine surgery and continue to guide modern technique.</p>
        </div>
        <div className="card">
          <h2>Surgical Videos</h2>
          <p>Watch curated, high-yield operations annotated and optimized for learning.</p>
        </div>
        <div className="card">
          <h2>Interactive Tools</h2>
          <p>Score fractures, simulate outcomes, and plan surgeries with ease.</p>
        </div>
      </div>

      {/* Spotlight Section */}
      <div className="spotlight">
        <h2>Why The Spine Atlas?</h2>
        <p>
          Built by spine surgeons. Backed by real-world cases. Designed to educate students, train residents, and
          support attendings with the highest-yield materials in one place.
        </p>
      </div>

      {/* Footer */}
      <div className="footer">
        &copy; {new Date().getFullYear()} The Spine Atlas. All rights reserved.
      </div>
    </div>
  );
}