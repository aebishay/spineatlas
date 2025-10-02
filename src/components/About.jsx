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
          <strong>The Spine Atlas</strong> is a comprehensive educational platform developed by spine surgeons to advance surgical education and clinical practice.
          Our mission is to provide accessible, evidence-based resources that elevate the standard of spine surgery training worldwide.
        </p>
      </section>

      <section className="about-section">
        <h3>What We Offer</h3>
        <ul>
          <li>Expertly curated operative video library with comprehensive step-by-step surgical guidance</li>
          <li>Critical analysis and annotation of seminal and contemporary spine surgery literature</li>
          <li>Systematically organized surgical approaches categorized by anatomical region and pathology</li>
          <li>Detailed visual instruction for complex spinal deformity correction and advanced techniques</li>
          <li>Collaborative platform highlighting contributions from premier spine surgery institutions</li>
        </ul>
      </section>

      <section className="about-section">
        <h3>Why It Matters</h3>
        <p>As spine surgery continues to advance rapidly, educational resources must evolve to meet the demands of contemporary practice.
        The Spine Atlas addresses existing gaps in surgical education by providing a streamlined, evidence-based platform that integrates
        essential knowledge and technical instruction in an accessible, user-centered format.</p>
      </section>

      <section className="about-section">
        <h3>Who It's For</h3>
        <p>The Spine Atlas serves surgeons at all levels of training and practice—from residents establishing foundational knowledge,
        to fellows advancing technical proficiency, to attending surgeons seeking continuing education and innovative approaches.
        Our platform delivers authoritative, peer-reviewed content to support informed clinical decision-making and surgical excellence.</p>
      </section>

      <section className="about-section">
        <h3>Our Vision</h3>
        <p>We are committed to establishing The Spine Atlas as the premier global resource for spine surgery education.
        By fostering collaboration among leading institutions and promoting knowledge exchange across international borders,
        we aim to advance surgical training standards and ultimately improve patient outcomes through enhanced practitioner expertise.</p>
      </section>
    </div>
  );
}

export default About;