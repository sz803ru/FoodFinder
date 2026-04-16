// Pasted + Edited Week 3 index.html file here!
import { useState } from "react";
import "./styles.css";

// --- COMPONENTS & PROPS DEMO ---
// We create a reusable component that takes "props" (title and description)
function ServiceItem({ title, description }) {
  return (
    <div className="service-item">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function App() {
  // --- STATE DEMO ---
  // Replacing document.getElementById and innerText with React State
  const [greetText, setGreetText] = useState("");
  const [revealText, setRevealText] = useState("");

  const handleGreet = () => {
    setGreetText("Hello, welcome to my portfolio!");
  };

  const handleReveal = () => {
    setRevealText("Thinking...");
    setTimeout(() => {
      setRevealText("Surprise! You found the secret message!");
    }, 2000);
  };

  // --- JSX DEMO ---
  return (
    <div className="app-container">
      <nav>
        <ul>
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <header>
        <h1>Welcome to my website!</h1>
      </header>

      <main>
        {/* About Section */}
        <section id="about">
          <h2>About Me</h2>
          <p>Hello! We are the blueprint team! We are Sunny, Sarai, and Mahima!</p>
          
          {/* Replaced Vanilla JS with React onClick and State variable */}
          <button onClick={handleGreet}>Say Hello</button>
          <p>{greetText}</p>
        </section>

        {/* Skills Section */}
        <section id="skills">
          <h2>Skills</h2>
          <div className="skills-container">
            <div className="skill-card">
              <h3>HTML</h3>
              <p>Semantic markup and accessible structure</p>
            </div>
            <div className="skill-card">
              <h3>CSS</h3>
              <p>Flexbox, Grid, and responsive design</p>
            </div>
            <div className="skill-card">
              <h3>JavaScript</h3>
              <p>DOM manipulation and interactivity</p>
            </div>
            <div className="skill-card">
              <h3>React</h3>
              <p>Component-based UI development</p>
            </div>
          </div>
        </section>

        {/* Services Section - using our new component */}
        <section id="services">
          <h2>Services</h2>
          <div className="services-grid">
            <ServiceItem 
              title="Web Development" 
              description="Building responsive and modern websites from scratch." 
            />
            <ServiceItem 
              title="UI/UX Design" 
              description="Crafting intuitive and visually appealing user interfaces." 
            />
            <ServiceItem 
              title="SEO Optimization" 
              description="Improving search engine rankings and site visibility." 
            />
            <ServiceItem 
              title="Maintenance" 
              description="Ongoing support, updates, and bug fixes for your site." 
            />
          </div>
        </section>

        {/* Async / Promises Section */}
        <section>
          <button onClick={handleReveal}>Reveal Message</button>
          <p>{revealText}</p>
        </section>

        {/* Contact Section */}
        <section id="contact">
          <h2>Contact Me</h2>
          {/* Note to students: Forms are tricky in React, we'll learn them later! */}
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="name">Name</label>
            {/* Notice the self-closing tags on inputs! */}
            <input type="text" id="name" name="name" placeholder="Your name" required />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="you@example.com" required />

            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="5" placeholder="Write your message here..." required></textarea>

            <button type="submit">Send Message</button>
          </form>
        </section>
      </main>

      <footer>
        <p>&copy; 2026 Blueprint</p>
      </footer>
    </div>
  );
}

export default App;