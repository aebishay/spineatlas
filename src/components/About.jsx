import './About.css';
import { useEffect } from 'react';

function About() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
        }
      });
    }, { threshold: 0.1 });

    const sections = document.querySelectorAll('.about-section');
    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-wrapper">
      <section className="about-section intro">
        <h2>About The Spine Atlas</h2>
        <p>
          <strong>The Spine Atlas</strong> is a next-generation educational platform built by spine surgeons, for spine surgeons.
          Our mission is to simplify, organize, and modernize how spine surgery is taught and learned around the world.
        </p>
      </section>

      <section className="about-section">
        <h3>What We Offer</h3>
        <ul>
          <li>A curated library of high-quality operative videos with step-by-step commentary</li>
          <li>Annotated reviews of landmark and emerging spine literature</li>
          <li>Categorized surgical approaches by region and pathology</li>
          <li>Visual summaries of complex deformity corrections and techniques</li>
          <li>A platform to showcase contributions from leading spine centers</li>
        </ul>
      </section>

      <section className="about-section">
        <h3>Why It Matters</h3>
        <p>Spine surgery is rapidly evolving, yet traditional educational resources remain fragmented, outdated, or inaccessible.
        The Spine Atlas addresses this gap by offering an intuitive, visually rich, and open-access platform tailored to the needs
        of modern spine surgeons and trainees.</p>
      </section>

      <section className="about-section">
        <h3>Who It's For</h3>
        <p>Whether you're a resident learning the basics, a fellow refining technique, or an attending surgeon seeking new ideas,
        The Spine Atlas provides trusted, concise resources to help you operate with clarity and confidence.</p>
      </section>

      <section className="about-section">
        <h3>Our Vision</h3>
        <p>We believe surgical education should be efficient, engaging, and global. Our long-term vision is to become the go-to
        digital atlas for spine surgeons worldwide—highlighting contributions from every major center and elevating the standard
        of care through better training.</p>
      </section>
    </div>
  );
}

export default About;