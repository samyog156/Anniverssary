import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Heart,
  Sparkles,
  CalendarHeart,
  Lock,
  Music2,
  Gift,
  ArrowDown,
  X,
  Play,
  Pause
} from "lucide-react";
import "./styles.css";

const START_DATE = "2024-08-16"; // Change this to your real anniversary date.
const YOUR_NAME = "Samyog";
const HER_NAME = "Grishma";

const memories = [
  { title: "The beginning", date: "Our first chapter", text: "The day everything quietly became something special.", image: "/photos/memory-1.jpg" },
  { title: "That one perfect day", date: "A favorite memory", text: "A small moment that somehow became one of my favorites.", image: "/photos/memory-2.jpg" },
  { title: "Still choosing you", date: "Today", text: "Two years later, and I would still choose you all over again.", image: "/photos/memory-3.jpg" }
];

const reasons = [
  "Your smile can fix the worst day.",
  "You make ordinary moments feel special.",
  "You believe in me even when I doubt myself.",
  "You are my favorite person to tell everything to.",
  "With you, I can be completely myself.",
  "You make love feel safe, fun, and real."
];

function AnniversaryCounter() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const start = new Date(START_DATE + "T00:00:00");
  let diff = Math.max(0, now - start);

  const days = Math.floor(diff / 86400000);
  diff %= 86400000;
  const hours = Math.floor(diff / 3600000);
  diff %= 3600000;
  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  return (
    <div className="counter">
      <div><strong>{days}</strong><span>days</span></div>
      <div><strong>{String(hours).padStart(2, "0")}</strong><span>hours</span></div>
      <div><strong>{String(minutes).padStart(2, "0")}</strong><span>minutes</span></div>
      <div><strong>{String(seconds).padStart(2, "0")}</strong><span>seconds</span></div>
    </div>
  );
}

function App() {
  const [letterOpen, setLetterOpen] = useState(false);
  const [music, setMusic] = useState(false);
  const [secret, setSecret] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (music) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setMusic(!music);
  };

  return (
    <main>
      <audio ref={audioRef} src="/music/Story.mp3" loop />

      <div className="floating-hearts" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} style={{ "--i": i }}>♥</span>
        ))}
      </div>

      <nav className="nav">
        <div className="logo"><Heart size={18} fill="currentColor" /> Happy Anniversary My Dear</div>
        <button className="music-btn" onClick={toggleMusic}>
          {music ? <Pause size={16} /> : <Music2 size={16} />}
          {music ? "Playing" : "Our song"}
        </button>
      </nav>

      <section className="hero">
        <div className="hero-glow" />
        <div className="eyebrow"><Heart size={15} fill="currentColor" /> 16.08.2024 — forever</div>
        <h1>Two years of<br /><em>us.</em></h1>
        <p className="hero-copy">
          Two years, countless memories, and one person I still want beside me
          for every chapter that comes next.
        </p>
        <div className="hero-actions">
          <a href="#memories" className="primary">Our story <ArrowDown size={17} /></a>
          <button className="ghost" onClick={() => setLetterOpen(true)}>
            <Heart size={17} /> Read my letter
          </button>
        </div>
        <div className="scroll-hint"><span /> scroll to explore</div>
      </section>

      <section className="love-time section">
        <div className="section-label"><CalendarHeart size={16} /> Since the day we met</div>
        <h2>Look how far we've come.</h2>
        <p className="muted">And this is only the beginning.</p>
        <AnniversaryCounter />
      </section>

      <section id="memories" className="section memories">
        <div className="section-label"><Heart size={16} fill="currentColor" /> Little moments, big memories</div>
        <h2>Our favorite chapters</h2>
        <div className="memory-grid">
          {memories.map((memory, i) => (
            <article className="memory" key={memory.title}>
              <div className={`memory-image photo-${i + 1}`}>
                <img
                  src={memory.image}
                  alt={memory.title}
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
                <span>{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="memory-content">
                <small>{memory.date}</small>
                <h3>{memory.title}</h3>
                <p>{memory.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="quote section">
        <span className="quote-mark">“</span>
        <blockquote>
          If I had to live these two years again,
          <em> I'd still choose you.</em>
        </blockquote>
        <div className="signature">— {YOUR_NAME}</div>
      </section>

      <section className="reasons section">
        <div className="section-label"><Sparkles size={16} /> A few of a million</div>
        <h2>Reasons I love you</h2>
        <div className="reason-grid">
          {reasons.map((reason, i) => (
            <div className="reason" key={reason}>
              <span>{i + 1}</span>
              <p>{reason}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="secret-section section">
        <div className="secret-card">
          <Lock size={22} />
          <p className="section-label">just between us</p>
          <h2>There's something<br />waiting for you.</h2>
          <button className="primary" onClick={() => setSecret(true)}>
            <Gift size={17} /> Open your surprise
          </button>
        </div>
      </section>

      <footer>
        <Heart size={18} fill="currentColor" />
        <p>Made with love for {HER_NAME}.</p>
        <small>Happy 2nd anniversary ❤️</small>
      </footer>

      {letterOpen && (
        <div className="modal-backdrop" onClick={() => setLetterOpen(false)}>
          <div className="letter" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setLetterOpen(false)}><X /></button>
            <div className="letter-icon"><Heart fill="currentColor" /></div>
            <small>16 AUGUST 2026</small>
            <h2>My favorite person,</h2>
            <p>
              Happy two years, my love. Thank you for every laugh, every late
              conversation, every little argument we survived, and every moment
              that made us closer.
            </p>
            <p>
              I don't know exactly what the next years will look like, but I
              know who I want beside me while we find out.
            </p>
            <p className="love-sign">I love you. Always. ❤️</p>
            <strong>{YOUR_NAME}</strong>
          </div>
        </div>
      )}

      {secret && (
        <div className="modal-backdrop" onClick={() => setSecret(false)}>
          <div className="surprise" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setSecret(false)}><X /></button>
            <div className="big-heart">❤️</div>
            <p className="section-label">SURPRISE UNLOCKED</p>
            <h2>{HER_NAME}, will you make<br />a million more memories with me?</h2>
            <p className="muted">The best part of our story hasn't happened yet.</p>
            <button className="primary" onClick={() => setSecret(false)}>Always ❤️</button>
          </div>
        </div>
      )}
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);