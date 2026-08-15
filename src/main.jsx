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
  { title: "A moment worth keeping", date: "Chapter one", text: "The day everything quietly became something special.", image: "/photos/memory-1.jpg" },
  { title: "One of my favorites", date: "Chapter two", text: "A small moment that somehow became one of my favorites.", image: "/photos/memory-2.jpg" },
  { title: "Still choosing you", date: "Chapter three", text: "Two years later, and I would still choose you all over again.", image: "/photos/memory-3.jpg" },
  { title: "A memory to keep", date: "Chapter four", text: "One of those moments I never want to forget.", image: "/photos/memory-4.jpg" },
  { title: "Growing closer", date: "Chapter five", text: "Another little moment that brought us closer together.", image: "/photos/memory-5.jpg" },
  { title: "An everyday moment", date: "Chapter six", text: "The ordinary days with you turned out to be the ones I remember most.", image: "/photos/memory-6.jpg" }
];

const reasons = [
  "Your smile can fix the worst day.",
  "You make ordinary moments feel special.",
  "You believe in me even when I doubt myself.",
  "You are my favorite person to tell everything to.",
  "With you, I can be completely myself.",
  "You make love feel safe, fun, and real.",
  "The way you laugh at your own jokes before finishing them.",
  "You remember the little things I forget I even said.",
  "Your hugs feel like coming home.",
  "You make me want to be a better person.",
  "The way you care for the people you love.",
  "You turn stressful days into something bearable, just by being there."
];

const CONFETTI_COLORS = ["#ff6f91", "#ff9db4", "#fff0f3", "#ffd166", "#ff4d6d"];

function Confetti({ active }) {
  if (!active) return null;
  const pieces = Array.from({ length: 60 }).map((_, i) => {
    const left = Math.random() * 100;
    const delay = Math.random() * 0.4;
    const duration = 2.2 + Math.random() * 1.4;
    const size = 6 + Math.random() * 8;
    const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
    const drift = (Math.random() - 0.5) * 200;
    const spin = 360 + Math.random() * 360;
    const shape = i % 3 === 0 ? "50%" : "3px";
    return (
      <span
        key={i}
        className="confetti-piece"
        style={{
          left: `${left}%`,
          width: `${size}px`,
          height: `${size * 0.6}px`,
          background: color,
          borderRadius: shape,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
          "--drift": `${drift}px`,
          "--spin": `${spin}deg`
        }}
      />
    );
  });
  return <div className="confetti-layer" aria-hidden="true">{pieces}</div>;
}

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
  const [confettiActive, setConfettiActive] = useState(false);
  const audioRef = useRef(null);

  const openSurprise = () => {
    setSecret(true);
    setConfettiActive(true);
    setTimeout(() => setConfettiActive(false), 3200);
  };

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
        <h2>Reasons I love you</h2>
        <div className="reason-grid">
          {reasons.map((reason, i) => (
            <div className="reason" key={reason}>
              <span>{i + 1}</span>
              <p>{reason}</p>
            </div>
          ))}
        </div>
        <p className="reasons-more">And <strong>there are millions more</strong> where these came from.</p>
      </section>

      <section className="secret-section section">
        <div className="secret-card">
          <Lock size={22} />
          <p className="section-label">just between us</p>
          <h2>There's something<br />waiting for you.</h2>
          <button className="primary" onClick={openSurprise}>
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
            <h2>My dearest Grishma,</h2>
            <p>
              Two years with you, and somehow, I still get butterflies when I
              think about us.
            </p>
            <p>
              Thank you for every smile, every laugh, every little moment, and
              even every silly fight that brought us closer. You have made my
              ordinary days feel special just by being in them.
            </p>
            <p>
              I don't know what the future holds, but I know one thing—I want
              to keep making memories with you, keep choosing you, and keep
              loving you a little more every day.
            </p>
            <p>Happy 2nd Anniversary, my love. ❤️</p>
            <p className="love-sign">Two years down, forever to go.</p>
            <p className="love-sign">Forever yours,</p>
            <strong>Samyog ❤️</strong>
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
            <p className="muted surprise-extra">
              Every sunrise from here on out, I want you next to me for it —
              through every ordinary Tuesday and every big adventure.
            </p>
            <button className="primary" onClick={() => setSecret(false)}>Always ❤️</button>
          </div>
        </div>
      )}

      <Confetti active={confettiActive} />
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);