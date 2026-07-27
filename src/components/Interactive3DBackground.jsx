import React, { useEffect, useRef } from 'react';

export default function Interactive3DBackground({ theme }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse tracking with smooth spring target interpolation
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      radius: 180
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 3D Nodes array
    const nodeCount = Math.floor(Math.min(width, height) / 14);
    const nodes = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 800 + 100, // 3D depth dimension
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        vz: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1.5,
        baseX: 0,
        baseY: 0
      });
    }

    // Render loop
    const render = () => {
      // Smooth interpolation for cursor parallax
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      const isLight = theme === 'light';
      const primaryColor = isLight ? '99, 102, 241' : '99, 102, 241';
      const secondaryColor = isLight ? '168, 85, 247' : '168, 85, 247';
      const cyanColor = isLight ? '6, 182, 212' : '6, 182, 212';

      // 1. Draw 3D Parallax Glowing Background Orbs
      const mx = (mouse.x / width - 0.5) * 80;
      const my = (mouse.y / height - 0.5) * 80;

      const grad1 = ctx.createRadialGradient(
        width * 0.25 + mx,
        height * 0.25 + my,
        10,
        width * 0.25 + mx,
        height * 0.25 + my,
        width * 0.4
      );
      grad1.addColorStop(0, `rgba(${primaryColor}, ${isLight ? 0.08 : 0.15})`);
      grad1.addColorStop(1, 'transparent');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(
        width * 0.75 - mx,
        height * 0.75 - my,
        10,
        width * 0.75 - mx,
        height * 0.75 - my,
        width * 0.4
      );
      grad2.addColorStop(0, `rgba(${secondaryColor}, ${isLight ? 0.06 : 0.12})`);
      grad2.addColorStop(1, 'transparent');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // 2. Update and Draw 3D Particle Mesh Net
      const perspective = 600;

      nodes.forEach((node, i) => {
        // Move in 3D
        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;

        // Wrap around boundaries
        if (node.x < 0) node.x = width;
        if (node.x > width) node.x = 0;
        if (node.y < 0) node.y = height;
        if (node.y > height) node.y = 0;
        if (node.z < 100) node.z = 900;
        if (node.z > 900) node.z = 100;

        // 3D Perspective Projection
        const scale = perspective / (perspective + node.z);
        const projX = (node.x - width / 2) * scale + width / 2;
        const projY = (node.y - height / 2) * scale + height / 2;

        // Mouse interaction (Repulsion / Parallax influence)
        const dx = mouse.x - projX;
        const dy = mouse.y - projY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let finalX = projX;
        let finalY = projY;

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          finalX -= Math.cos(angle) * force * 35;
          finalY -= Math.sin(angle) * force * 35;
        }

        node.projX = finalX;
        node.projY = finalY;
        node.scale = scale;

        // Draw Node Point
        const alpha = Math.min(1, Math.max(0.1, (1 - node.z / 900) * scale * 1.5));
        ctx.beginPath();
        ctx.arc(finalX, finalY, node.radius * scale * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${i % 2 === 0 ? primaryColor : cyanColor}, ${alpha})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = `rgba(${primaryColor}, 0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 3. Connect lines between nearby 3D nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];

          const dx = n1.projX - n2.projX;
          const dy = n1.projY - n2.projY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = 130 * ((n1.scale + n2.scale) / 2);

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.25 * n1.scale;
            ctx.beginPath();
            ctx.moveTo(n1.projX, n1.projY);
            ctx.lineTo(n2.projX, n2.projY);
            ctx.strokeStyle = `rgba(${primaryColor}, ${lineAlpha})`;
            ctx.lineWidth = 1 * n1.scale;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: theme === 'light' ? 0.7 : 0.85
      }}
    />
  );
}
