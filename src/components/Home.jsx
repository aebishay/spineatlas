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
          <p className="hero-subtitle">Advancing Excellence in Operative Spine Surgery</p>
          <Link to="/about" className="hero-button">Learn More</Link>
        </div>
      </section>

      {/* CARDS - Fullscreen tile */}
      <section className="card-section">
        <div className="overview">
          <Link to="/seminal-papers" className="card">
            <BookOpen className="card-icon" />
            <h2>Seminal Papers</h2>
            <p>Access foundational literature that has defined modern spine surgery practice and continues to inform evidence-based decision-making.</p>
          </Link>
          <Link to="/video-library" className="card">
            <Video className="card-icon" />
            <h2>Surgical Videos</h2>
            <p>Explore expertly curated operative videos with detailed annotations designed to enhance surgical education and technique refinement.</p>
          </Link>
          <Link to="/interactive-tools" className="card">
            <Calculator className="card-icon" />
            <h2>Interactive Tools</h2>
            <p>Utilize clinical calculators and classification systems to support diagnostic accuracy and surgical planning.</p>
          </Link>
        </div>
      </section>

      {/* SPOTLIGHT - Fullscreen tile */}
      <section className="spotlight">
  <h2 className="spotlight-title">Why The Spine Atlas?</h2>
  <div className="spotlight-grid">
    <div className="spotlight-item">
      <strong>Surgeon-developed:</strong> Created by spine surgeons to ensure clinical relevance and operative applicability.
    </div>
    <div className="spotlight-item">
      <strong>Evidence-based:</strong> All content is grounded in peer-reviewed literature and real-world clinical experience.
    </div>
    <div className="spotlight-item">
      <strong>Comprehensive education:</strong> Resources tailored for medical students, residents, fellows, and attending surgeons.
    </div>
    <div className="spotlight-item">
      <strong>Centralized platform:</strong> A unified resource consolidating essential spine surgery education in one accessible location.
    </div>
  </div>
</section>

    </div>
  );
}