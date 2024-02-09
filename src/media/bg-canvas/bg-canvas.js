import React, { useEffect, useState, useRef } from 'react';
import './bg-canvas.css';

const ParticleAnimation = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const [canvasSize, setCanvasSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const particleCount = 50;
  const particleSize = 5;
  const particleSpeed = 0.9;
  const linkDistance = 150;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    const handleResize = () => {
      setCanvasSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x <= 0 || particle.x >= canvas.width) {
          particle.vx = -particle.vx;
        }

        if (particle.y <= 0 || particle.y >= canvas.height) {
          particle.vy = -particle.vy;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particleSize, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(74, 24, 136, 0.8)'; // Neon Purple Color
        ctx.shadowBlur = 20; // Add a shadow blur for glow effect
        ctx.shadowColor = 'rgba(207, 83, 249, 0.8)'; // Neon Purple Color
        ctx.fill();
        ctx.closePath();
      });

      ctx.lineWidth = 2;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const distance = Math.sqrt(
            (particles[i].x - particles[j].x) ** 2 +
              (particles[i].y - particles[j].y) ** 2
          );

          if (distance <= linkDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = 'rgba(74, 24, 136, 0.8)'; // Neon Purple Color
            ctx.stroke();
            ctx.closePath();
          }
        }
      }

      requestAnimationFrame(animateParticles);
    };

    const initParticles = () => {
      const newParticles = [];
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * particleSpeed,
          vy: (Math.random() - 0.5) * particleSpeed,
        });
      }
      particlesRef.current = newParticles;
    };

    initParticles();
    animateParticles();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [canvasSize.width, canvasSize.height]);

  const handleMouseMove = (e) => {
    const particles = particlesRef.current;

    particles.forEach((particle) => {
      const distance = Math.sqrt(
        (particle.x - e.clientX) ** 2 + (particle.y - e.clientY) ** 2
      );

      if (distance <= 100) {
        const angle = Math.atan2(particle.y - e.clientY, particle.x - e.clientX);
        particle.vx = Math.cos(angle) * particleSpeed;
        particle.vy = Math.sin(angle) * particleSpeed;
      }
    });
  };

  return (
    <canvas
      ref={canvasRef}
      style={{ zIndex: -1000, position: 'absolute', top: 0, left: 0 }}
      onMouseMove={handleMouseMove}
    />
  );
};

export default ParticleAnimation;