import React from "react";
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      &copy; {new Date().getFullYear()} The Spine Atlas. All rights reserved.
    </footer>
  );
}