import React from "react";
import { BookOpen, Video, Calculator } from 'lucide-react';
import "./Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-wrapper">

      {/* HERO - Fullscreen tile */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">The Spine Atlas</h1>
          <p className="hero-subtitle">Master Operative Spine Surgery</p>
          <Link to="/about" className="hero-button">Learn More</Link>
        </div>
      </section>

      {/* CARDS - Fullscreen tile */}
      <section className="card-section">
        <div className="overview">
          <Link to="/seminal-papers" className="card">
            <BookOpen className="card-icon" />
            <h2>Seminal Papers</h2>
            <p>Read the classics that shaped spine surgery and continue to guide modern technique.</p>
          </Link>
          <Link to="/video-library" className="card">
            <Video className="card-icon" />
            <h2>Surgical Videos</h2>
            <p>Watch curated, high-yield operations annotated and optimized for learning.</p>
          </Link>
          <Link to="/interactive-tools" className="card">
            <Calculator className="card-icon" />
            <h2>Interactive Tools</h2>
            <p>Score fractures, simulate outcomes, and plan surgeries with ease.</p>
          </Link>
        </div>
      </section>

      {/* SPOTLIGHT - Fullscreen tile */}
      <section className="spotlight">
  <h2 className="spotlight-title">Why The Spine Atlas?</h2>
  <div className="spotlight-grid">
    <div className="spotlight-item">
      <strong>By surgeons:</strong> Everything is designed with operative relevance in mind.
    </div>
    <div className="spotlight-item">
      <strong>Case-based:</strong> Real-world examples anchor every tool and video.
    </div>
    <div className="spotlight-item">
      <strong>Multi-level learning:</strong> Students, residents, and attendings all benefit.
    </div>
    <div className="spotlight-item">
      <strong>One hub:</strong> No more Googling. Everything you need is here.
    </div>
  </div>
</section>

    </div>
  );
}