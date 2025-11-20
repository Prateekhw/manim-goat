import React, { useEffect, useRef, useState } from 'react';
import { Hexagon, ArrowDownRight, Code2, Copy, Check, Terminal } from 'lucide-react';

const App = () => {
  return (
    <div className="min-h-screen bg-[#FDFCF8] text-stone-800 font-sans selection:bg-sky-100 selection:text-sky-600 overflow-x-hidden">
      <Styles />
      <BackgroundBlobs />
      <Navigation />
      <Hero />
      <Portfolio />
      <CodeSection />
      <Contact />
      <Footer />
    </div>
  );
};

// --- Styles & Animations ---
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
    
    body { font-family: 'Inter', sans-serif; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }
    
    .glass {
      background: rgba(255, 255, 255, 0.65);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.5);
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.03);}
    
    .glass-dark {
      background: rgba(20, 20, 20, 0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    }

    .glass-card {
      background: rgba(255, 255, 255, 0.4);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.6);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .glass-card:hover {
      background: rgba(255, 255, 255, 0.7);
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
      border-color: rgba(255, 255, 255, 0.9);
    }

    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(5deg); }
    }
    
    .animate-float { animation: float 10s ease-in-out infinite; }
    .animate-float-delayed { animation: float 12s ease-in-out infinite reverse; }

    /* Syntax Highlighting */
    .code-keyword { color: #c678dd; }
    .code-func { color: #61afef; }
    .code-string { color: #98c379; }
    .code-num { color: #d19a66; }
    .code-comment { color: #5c6370; font-style: italic; }
  `}</style>
);

// --- Background Components ---
const BackgroundBlobs = () => (
  <>
    <div className="fixed top-0 left-0 w-96 h-96 bg-rose-200 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 animate-float -z-10 opacity-30 pointer-events-none" />
    <div className="fixed bottom-0 right-0 w-[30rem] h-[30rem] bg-blue-200 rounded-full blur-[80px] translate-x-1/3 translate-y-1/3 animate-float-delayed -z-10 opacity-30 pointer-events-none" />
    <div className="fixed top-1/2 left-1/2 w-64 h-64 bg-amber-100 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 opacity-20 -z-10 pointer-events-none" />
  </>
);

// --- Navigation ---
const Navigation = () => (
  <nav className="fixed top-0 w-full z-50 px-6 py-4">
    <div className="max-w-6xl mx-auto">
      <div className="glass rounded-full px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Hexagon className="w-6 h-6 text-stone-700 stroke-[1.5]" />
          <span className="font-semibold tracking-tight">Lumina</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <a href="#work" className="hover:text-stone-900 transition-colors">Work</a>
          <a href="#process" className="hover:text-stone-900 transition-colors">Process</a>
          <a href="#about" className="hover:text-stone-900 transition-colors">About</a>
        </div>
        <a href="#contact" className="bg-stone-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-stone-700 transition-all shadow-lg shadow-stone-200">
          Let's Talk
        </a>
      </div>
    </div>
  </nav>
);

// --- Hero Section with Canvas ---
const Hero = () => {
  const canvasRef = useRef(null);
  const frameCounterRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext && canvas.getContext('2d');
    if (!ctx) return;

    let animationId = null;
    let timeParam = 0;
    let frameCount = 0;
    const points = [];

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        // Set backing pixel size for crispness
        const w = Math.max(300, parent.clientWidth);
        const h = Math.max(200, parent.clientHeight);
        canvas.width = w * 2;
        canvas.height = h * 2;
        // Reset any existing transforms before scaling (avoid cumulative scale)
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(2, 2);
        // Also set CSS size so layout stays consistent
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const animate = () => {
      const width = canvas.width / 2;
      const height = canvas.height / 2;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(centerX, 0); ctx.lineTo(centerX, height);
      ctx.moveTo(0, centerY); ctx.lineTo(width, centerY);
      ctx.stroke();

      // Lissajous Logic
      const scale = Math.min(width, height) * 0.35;
      const x = centerX + scale * Math.sin(3 * timeParam);
      const y = centerY + scale * Math.sin(4 * timeParam);

      points.push({ x, y });

      // Keep points array bounded to avoid memory growth
      if (points.length > 1600) points.shift();

      // Draw Path
      ctx.beginPath();
      ctx.strokeStyle = '#38BDF8';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (points.length > 1) {
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
      }
      ctx.stroke();

      // Draw Pen Tip
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#FDE047';
      ctx.shadowColor = '#FDE047';
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.shadowBlur = 0;

      timeParam += 0.005;
      if (timeParam > Math.PI * 2) {
        timeParam = 0;
        points.length = 0;
      }

      frameCount++;
      if (frameCount % 5 === 0 && frameCounterRef.current) {
        frameCounterRef.current.innerText = String(frameCount);
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <header className="min-h-screen flex items-center justify-center pt-20 px-4 relative">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <div className="space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/60 backdrop-blur-sm text-xs font-medium text-stone-500">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden />
            <span>Available for commissions</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] text-stone-900">
            Math <span className="font-serif italic text-stone-500 font-light">in</span> <br />
            Motion.
          </h1>
          
          <p className="text-lg text-stone-600 max-w-md leading-relaxed">
            I craft precise, beautiful mathematical animations using Python & Manim. Transforming abstract concepts into intuitive visual experiences.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#work" className="group flex items-center gap-2 bg-white/10 hover:bg-white border border-white shadow-sm px-6 py-3 rounded-2xl transition-all">
              <span>View Projects</span>
              <ArrowDownRight className="w-4 h-4 text-stone-500 group-hover:text-stone-900 transition-colors" />
            </a>
            <div className="flex items-center gap-3 px-4 text-sm text-stone-500">
              <Code2 className="w-4 h-4" />
              <span>Python Powered</span>
            </div>
          </div>
        </div>

        <div className="relative h-[400px] lg:h-[500px] w-full ">
          <div className="glass-dark rounded-3xl p-4 w-full h-full shadow-2xl flex flex-col relative overflow-hidden transform hover:rotate-0 transition-transform duration-700">
            <div className="flex items-center gap-2 mb-4 px-2 opacity-60">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <div className="ml-auto text-[10px] font-mono text-gray-400">scene.py — Preview</div>
            </div>

            <div className="flex-1 bg-black/40 rounded-xl border border-white/5 relative overflow-hidden flex items-center justify-center">
              <canvas ref={canvasRef} className="w-full h-full" aria-label="lissajous preview canvas" />
              <div className="absolute bottom-4 left-4 font-mono text-xs text-white/30">
                Rendering: <span ref={frameCounterRef}>0</span> frames
              </div>
            </div>
          </div>
          <div className="absolute -z-10 top-10 -right-10 w-40 h-40 bg-gradient-to-br from-cyan-300 to-blue-500 rounded-full blur-3xl opacity-30" />
        </div>
      </div>
    </header>
  );
};

// --- Portfolio Section ---
const Portfolio = () => {
  return (
    <section id="work" className="py-32 px-4">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-stone-800">Selected Works</h2>
            <p className="text-stone-500">Exploring concepts through code.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <PortfolioCard 
            title="Visualizing Calculus" 
            desc="Intuitive explanations of integrals and derivatives using Riemann sums."
            tags={["manim", "numpy"]}
          >
            <svg viewBox="0 0 100 100" className="w-32 h-32 stroke-white fill-none stroke-[0.5] opacity-80 group-hover:scale-110 transition-transform duration-500" aria-hidden>
              <path d="M10,90 Q30,10 50,50 T90,10" />
              <path d="M10,90 H90" strokeOpacity="0.3" />
              <path d="M10,90 V10" strokeOpacity="0.3" />
              <path d="M10,90 Q30,10 50,50 L50,90 Z" fill="white" fillOpacity="0.1" stroke="none" />
            </svg>
          </PortfolioCard>

          <PortfolioCard 
            title="Vector Transformations" 
            desc="Linear maps, eigenvalues, and changing basis vectors dynamically."
            tags={["linear-algebra"]}
          >
            <svg viewBox="0 0 100 100" className="w-32 h-32 stroke-cyan-400 fill-none stroke-[1] group-hover:rotate-12 transition-transform duration-500" aria-hidden>
              <line x1="50" y1="50" x2="80" y2="20" />
              <line x1="80" y1="20" x2="75" y2="25" />
              <line x1="80" y1="20" x2="75" y2="18" />
              <line x1="50" y1="50" x2="20" y2="30" stroke="white" strokeOpacity="0.5" />
              <circle cx="50" cy="50" r="2" fill="white" />
            </svg>
          </PortfolioCard>

          <PortfolioCard 
            title="Fourier Series" 
            desc="Decomposing complex wave functions into simple rotating circles."
            tags={["physics"]}
          >
            <svg viewBox="0 0 100 100" className="w-32 h-32 stroke-rose-300 fill-none stroke-[0.5] group-hover:scale-110 transition-transform duration-500" aria-hidden>
              <circle cx="50" cy="50" r="30" strokeOpacity="0.5" />
              <circle cx="75" cy="50" r="10" strokeOpacity="0.8" />
              <path d="M85,50 Q95,40 95,60" strokeDasharray="2,2" />
            </svg>
          </PortfolioCard>
        </div>
      </div>
    </section>
  );
};

const PortfolioCard = ({ children, title, desc, tags }) => (
  <div className="glass-card rounded-3xl p-2 group cursor-pointer">
    <div className="bg-stone-900 rounded-2xl h-56 w-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      {children}
      <div className="absolute top-3 right-3 bg-white/10 backdrop-blur-md px-2 py-1 rounded text-[10px] text-white font-mono">
        MP4
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-stone-500 line-clamp-2">{desc}</p>
      <div className="mt-4 flex gap-2">
        {tags.map(tag => (
          <span key={tag} className="px-2 py-1 bg-stone-100 rounded text-[10px] text-stone-600 font-mono">{tag}</span>
        ))}
      </div>
    </div>
  </div>
);

// --- Code Showcase Section ---
const CodeSection = () => {
  const [copied, setCopied] = useState(false);
  const codeString = `class SmoothCurve(Scene):
    def construct(self):
        axes = Axes(x_range=[-3, 3], y_range=[-3, 3])
        
        # Create a Lissajous curve
        curve = ParametricFunction(
            lambda t: np.array([
                np.sin(3 * t),
                np.sin(4 * t),
                0
            ]),
            t_range=[0, TAU],
            color=BLUE
        )
        
        self.play(Create(axes), run_time=1)
        self.play(Create(curve), run_time=3)
        self.wait()`;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(codeString);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      } else {
        // Fallback
        const ta = document.createElement('textarea');
        ta.value = codeString;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      }
    } catch (e) {
      console.error('Copy failed', e);
    }
  };

  return (
    <section id="process" className="py-20 px-4 bg-white/30 backdrop-blur-sm border-y border-white/40">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1">
          <div className="glass-dark rounded-xl shadow-2xl overflow-hidden font-mono text-sm leading-relaxed">
            <div className="bg-white/5 px-4 py-3 border-b border-white/10 flex justify-between items-center">
              <span className="text-stone-500 text-xs flex items-center gap-2">
                <Terminal size={12} /> parametric_curve.py
              </span>
              <button onClick={handleCopy} className="text-stone-500 hover:text-white transition-colors" aria-label="Copy code">
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
            <div className="p-6 text-gray-300 overflow-x-auto">
              <pre>
                <code className="whitespace-pre">{codeString}</code>
              </pre>
            </div>
          </div>
        </div>
        
        <div className="order-1 lg:order-2 space-y-6">
          <h2 className="text-3xl font-bold text-stone-800">Code as Canvas</h2>
          <p className="text-stone-600 leading-relaxed">
            Manim (Mathematical Animation Engine) allows for programmatic control over every pixel. 
            Unlike traditional motion graphics, the visuals are generated through logic, ensuring mathematical 
            accuracy and perfect reproducibility.
          </p>
          <ul className="space-y-4">
            {[
              'Scalable Vector Graphics',
              'LaTeX Equation Support',
              'Smooth, custom interpolation'
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-stone-700">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  i === 0 ? 'bg-blue-100 text-blue-600' : 
                  i === 1 ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'
                }`}>
                  <Check size={12} />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

// --- Contact & Footer ---
const Contact = () => (
  <section id="contact" className="py-32 px-4 relative overflow-hidden">
    <div className="max-w-2xl mx-auto text-center relative z-10">
      <h2 className="text-4xl md:text-5xl font-bold mb-6 text-stone-800">Ready to visualize?</h2>
      <p className="text-stone-600 mb-10">
        Looking for custom educational animations or technical visualizations? 
        Let's bring your equations to life.
      </p>
      <a href="mailto:hello@example.com" className="inline-flex items-center justify-center bg-stone-900 text-white px-8 py-4 rounded-full font-medium hover:bg-stone-800 hover:scale-105 transition-all shadow-xl shadow-stone-300">
        Start a Project
      </a>
    </div>
    <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
  </section>
);

const Footer = () => (
  <footer className="py-8 text-center text-stone-500 text-sm font-medium">
    <p>&copy; {new Date().getFullYear()} Lumina Portfolio. Built with Math & React.</p>
  </footer>
);

export default App;
