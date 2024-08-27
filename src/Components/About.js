import React from "react";
import styles from "./About.module.css";

function About() {
  return (
    <div className={styles.aboutContainer}>
      {/* Hero Section */}
      <section
        className={styles.heroSection}
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/denise-jans-mxhWy1td-BE-unsplash.jpg)`,
        }}
      >
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>About Our Project</h1>
          <p className={styles.heroSubtitle}>
            Bringing you the best movie streaming experience.
          </p>
        </div>
      </section>

      {/* Project Overview */}
      <section className={styles.overviewSection}>
        <h2 className={styles.sectionTitle}>Our Mission</h2>
        <p className={styles.sectionContent}>
          This app is committed to providing an exceptional movie streaming platform
          that allows users to explore, discover, and enjoy a vast collection of
          films and TV shows. The goal is to make entertainment accessible,
          personalized, and seamless for everyone.
        </p>
      </section>

      {/* Team Section */}
      <section className={styles.teamSection}>
        <h2 className={styles.sectionTitle}>Meet the Team</h2>
        <div className={styles.teamGrid}>
          <div className={styles.teamMember}>
            <img
              src={`${process.env.PUBLIC_URL}/images/eric.png`}
              alt="Eric Vara"
              className={styles.teamImage}
            />
            <h3 className={styles.teamName}>Eric Vara</h3>
            <p className={styles.teamRole}>Lead Developer</p>
          </div>
          <div className={styles.teamMember}>
            <img
              src={`${process.env.PUBLIC_URL}/images/brittnay.png`}
              alt="Brittany Sanchez"
              className={styles.teamImage}
            />
            <h3 className={styles.teamName}>Brittany Rivera</h3>
            <p className={styles.teamRole}>UI/UX Designer</p>
          </div>
          <div className={styles.teamMember}>
            <img
              src={`${process.env.PUBLIC_URL}/images/judy.png`}
              alt="Judy Trevino"
              className={styles.teamImage}
            />
            <h3 className={styles.teamName}>Judy Trevino</h3>
            <p className={styles.teamRole}>Marketing Specialist</p>
          </div>
        </div>
      </section>
      <section className={styles.callToActionSection}>
        <h2 className={styles.sectionTitle}>Join Us Today</h2>
        <p className={styles.sectionContent}>
          Become a part of our community and start exploring the world of movies
          like never before. Your next favorite movie is just a click away!
        </p>
        <button className={styles.ctaButton}>Get Started</button>
      </section>
    </div>
  );
}

export default About;
