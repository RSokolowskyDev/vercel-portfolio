'use client';
import { useEffect, useRef } from 'react';

const SKILLS_DATA = [
  {
    id: 'center',
    label: 'Full Stack\nAI Engineer',
    color: '#f8fafc',
    textColor: '#0a0a0a',
    emoji: '🧑‍💻',
    skills: [
      { name: 'Databases', emoji: '🗄️', color: '#f87171', dx: 0,    dy: -132 },
      { name: 'Tools',     emoji: '🛠️', color: '#34d399', textColor: '#0a0a0a', dx: 114,  dy: -66 },
      { name: 'Cloud',     emoji: '☁️', color: '#FF9900', textColor: '#0a0a0a', dx: 114,  dy: 66 },
      { name: 'Frontend',  emoji: '🎨', color: '#61DAFB', dx: 0,    dy: 132 },
      { name: 'Backend',   emoji: '⚙️', color: '#a855f7', dx: -114, dy: 66 },
      { name: 'AI / ML',   emoji: '🤖', color: '#f472b6', dx: -114, dy: -66 },
    ]
  },
  {
    id: 'cloud', label: 'Cloud &\nDevOps', color: '#FF9900', emoji: '☁️',
    skills: [
      { name: 'AWS Lambda',   emoji: 'λ'  },
      { name: 'AWS EC2',      emoji: '⚙️' },
      { name: 'AWS S3',       emoji: '🪣' },
      { name: 'AWS API GW',   emoji: '🔀' },
      { name: 'AWS Bedrock',  emoji: '🪨' },
      { name: 'AWS DynamoDB', emoji: '🗄️' },
    ]
  },
  {
    id: 'frontend', label: 'Web &\nFrontend', color: '#61DAFB', emoji: '🎨',
    skills: [
      { name: 'React',        emoji: '⚛️' },
      { name: 'HTML5',        emoji: '🌐' },
      { name: 'CSS',          emoji: '🎨' },
      { name: 'JavaScript',   emoji: '⚡' },
      { name: 'GitHub Pages', emoji: '📄' },
      { name: 'Web Hosting',  emoji: '🚀' },
    ]
  },
  {
    id: 'backend', label: 'Backend\n& APIs', color: '#a855f7', emoji: '⚙️',
    skills: [
      { name: 'Python',          emoji: '🐍' },
      { name: 'FastAPI',         emoji: '🚀' },
      { name: 'Node.js',         emoji: '💚' },
      { name: 'REST API Design', emoji: '🔗' },
      { name: 'Webhooks',        emoji: '🪝' },
      { name: 'Render',          emoji: '🖥️' },
    ]
  },
  {
    id: 'ai', label: 'AI & ML', color: '#f472b6', emoji: '🤖',
    skills: [
      { name: 'CrewAI',             emoji: '🤖' },
      { name: 'Groq',               emoji: '⚡' },
      { name: 'HuggingFace',        emoji: '🤗' },
      { name: 'Prompt Engineering', emoji: '✍️' },
      { name: 'AI Orchestration',   emoji: '🧠' },
      { name: 'LM Studio',          emoji: '🖥️' },
    ]
  },
  {
    id: 'databases', label: 'Databases', color: '#f87171', emoji: '🗄️',
    skills: [
      { name: 'SQL',               emoji: '📊' },
      { name: 'Firebase',          emoji: '🔥' },
      { name: 'JSON Modeling',     emoji: '📋' },
      { name: 'CRUD Operations',   emoji: '🔄' },
      { name: 'Query Optimization',emoji: '🔍' },
      { name: 'HTTP / REST Calls', emoji: '📡' },
    ]
  },
  {
    id: 'tools', label: 'Tools &\nInfrastructure', color: '#34d399', emoji: '🛠️',
    skills: [
      { name: 'Git / GitHub', emoji: '🌿' },
      { name: 'VS Code',      emoji: '💻' },
      { name: 'Claude Code',  emoji: '🤖' },
      { name: 'Tableau',      emoji: '📊' },
      { name: 'Docker',       emoji: '🐳' },
      { name: 'Postman',      emoji: '📮' },
    ]
  },
];

const skillImages = {
  'AWS Lambda':    '/images/skills/AWS_Lambda.png',
  'AWS EC2':       '/images/skills/AWS_EC2.png',
  'AWS S3':        '/images/skills/AWS_S3.png',
  'AWS DynamoDB':  '/images/skills/AWS_DynamoDB.png',
  'HTML5':         '/images/skills/HTML.png',
  'CSS':           '/images/skills/CSS.png',
  'GitHub Pages':  '/images/skills/Github.png',
  'Python':        '/images/skills/Python.png',
  'FastAPI':       '/images/skills/FAST_api.png',
  'Node.js':       '/images/skills/Node.js.png',
  'Render':        '/images/skills/Render.png',
  'CrewAI':        '/images/skills/CrewAI.png',
  'Groq':          '/images/skills/Groq.png',
  'HuggingFace':   '/images/skills/HuggingFace.png',
  'AI Orchestration': '/images/skills/AI_Orchestration.png',
  'Git / GitHub':  '/images/skills/Github.png',
  'VS Code':       '/images/skills/VSCode.png',
  'Claude Code':   '/images/skills/Claude.png',
};

export default function SkillsCanvas() {
  const canvasRef = useRef(null);
  const labelColorRef = useRef(document.documentElement.classList.contains('dark') ? '#fff' : '#0a0a0a');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new MutationObserver(() => {
      labelColorRef.current = document.documentElement.classList.contains('dark') ? '#fff' : '#0a0a0a';
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const w = rect.width, h = rect.height;
    const centerX = w * 0.5, centerY = h * 0.5;

    let isDragging = false, offset = {x:0, y:0}, targetOffset = {x:0, y:0};
    let lastMouse = {x:0, y:0}, time = 0;
    const SPACING = 80, UNIVERSE_RADIUS = 350;

    const bubbles = [];
    const hubOutlines = [];
    let snappedBubble = null;
    const imageCache = {};
    let animId;

    function loadImage(src) {
      if (!imageCache[src]) {
        const img = new Image();
        img.src = src;
        imageCache[src] = img;
      }
      return imageCache[src];
    }
    const uniqueImages = [...new Set(Object.values(skillImages))];
    uniqueImages.forEach(src => loadImage(src));

    function createHexCluster(baseX, baseY, color, hubName, hubEmoji, skills, clusterId) {
      const axial = [{q:0,r:0},{q:1,r:0},{q:1,r:-1},{q:0,r:-1},{q:-1,r:0},{q:-1,r:1},{q:0,r:1}];
      const clusterBubbles = [];
      axial.forEach((coord, i) => {
        const isHubNode = i === 0;
        let skillName, skillEmoji, nodeColor, nodeTextColor;
        let skill = null;

        if (isHubNode) {
          skillName = hubName;
          skillEmoji = hubEmoji;
          nodeColor = color;
          nodeTextColor = '#0a0a0a';
        } else {
          skill = skills[i-1] || {};
          skillName = skill.name || '';
          skillEmoji = skill.emoji || '';
          nodeColor = skill.color || color;
          nodeTextColor = skill.textColor || '#ffffff';
        }

        const defaultX = SPACING * (Math.sqrt(3) * coord.q + (Math.sqrt(3)/2) * coord.r);
        const defaultY = SPACING * (1.5 * coord.r);
        const x = !isHubNode && Number.isFinite(skill?.dx) ? skill.dx : defaultX;
        const y = !isHubNode && Number.isFinite(skill?.dy) ? skill.dy : defaultY;

        const bubble = {
          name: skillName, emoji: skillEmoji,
          x: baseX + x, y: baseY + y,
          color: nodeColor, textColor: nodeTextColor,
          clusterId, baseRadius: 45, isHub: isHubNode,
          phase: Math.random() * Math.PI * 2
        };
        bubbles.push(bubble);
        clusterBubbles.push(bubble);
      });
      return clusterBubbles;
    }

    const centerCluster = createHexCluster(0, 0, SKILLS_DATA[0].color, SKILLS_DATA[0].label.replace('\n', ' '), SKILLS_DATA[0].emoji, SKILLS_DATA[0].skills, SKILLS_DATA[0].id);
    hubOutlines.push({x:0, y:0, color:'#8ea4c8', nodes:centerCluster.filter(b => !b.isHub)});
    snappedBubble = centerCluster[0];

    let angle = 30;
    for (let i = 1; i < SKILLS_DATA.length; i++) {
      const data = SKILLS_DATA[i];
      const x = Math.cos(angle * Math.PI / 180) * UNIVERSE_RADIUS;
      const y = Math.sin(angle * Math.PI / 180) * UNIVERSE_RADIUS;
      const cluster = createHexCluster(x, y, data.color, data.label.replace('\n', ' '), data.emoji, data.skills, data.id);
      hubOutlines.push({x, y, color:data.color, nodes:cluster.filter(b => !b.isHub)});
      angle += 60;
    }

    function onMouseDown(e) {
      isDragging = true;
      lastMouse = {x: e.clientX, y: e.clientY};
    }
    function onMouseUp() {
      isDragging = false;
      let closest = bubbles[0], minDist = Infinity;
      bubbles.forEach(b => {
        const d = Math.sqrt((b.x + offset.x)**2 + (b.y + offset.y)**2);
        if (d < minDist) { minDist = d; closest = b; }
      });
      snappedBubble = closest;
      targetOffset = {x: -closest.x, y: -closest.y};
    }
    function onMouseMove(e) {
      if (isDragging) {
        offset.x += e.clientX - lastMouse.x;
        offset.y += e.clientY - lastMouse.y;
        lastMouse = {x: e.clientX, y: e.clientY};
        targetOffset = {...offset};
      }
    }

    function projectPoint(worldX, worldY) {
      const relX = worldX + offset.x, relY = worldY + offset.y;
      const centerDist = Math.sqrt(relX**2 + relY**2);
      const scale = Math.max(0.04, 1 - centerDist / 420);
      const pull = 0.25 * (1 - scale);
      return { x: centerX + relX * (1 - pull), y: centerY + relY * (1 - pull), scale };
    }

    function shouldShowBubbleLabel(bubble) {
      if (!bubble.name || !snappedBubble) return false;
      const snappedClusterId = snappedBubble.clusterId;
      if (snappedClusterId === 'center') return bubble.clusterId === 'center';
      return bubble === snappedBubble || (bubble.clusterId === snappedClusterId && bubble.isHub);
    }

    function drawBubbleLabel(bubble, drawX, drawY, radius, scale) {
      ctx.fillStyle = labelColorRef.current;
      ctx.globalAlpha = Math.min(1, 0.55 + scale);
      ctx.font = `bold ${Math.max(8, 10 * scale + 4)}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(bubble.name, drawX, drawY + radius + (12 * scale));
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      time += 0.02;

      if (!isDragging) {
        offset.x += (targetOffset.x - offset.x) * 0.22;
        offset.y += (targetOffset.y - offset.y) * 0.22;
      }

      hubOutlines.forEach(outline => {
        const projectedCenter = projectPoint(outline.x, outline.y);
        const points = outline.nodes
          .map(node => projectPoint(node.x, node.y))
          .sort((a, b) => Math.atan2(a.y - projectedCenter.y, a.x - projectedCenter.x) - Math.atan2(b.y - projectedCenter.y, b.x - projectedCenter.x));
        if (points.length < 3 || projectedCenter.scale < 0.08) return;

        ctx.save();
        ctx.globalAlpha = 0.2 * Math.min(1, projectedCenter.scale + 0.35);
        ctx.strokeStyle = outline.color;
        ctx.lineWidth = Math.max(1, 1.15 * projectedCenter.scale);
        ctx.setLineDash([14 * projectedCenter.scale, 18 * projectedCenter.scale]);
        ctx.beginPath();
        points.forEach((point, i) => {
          const prev = points[(i - 1 + points.length) % points.length];
          const next = points[(i + 1) % points.length];
          const tension = 0.28;
          const cp1x = point.x + (next.x - prev.x) * tension;
          const cp1y = point.y + (next.y - prev.y) * tension;
          const afterNext = points[(i + 2) % points.length];
          const cp2x = next.x - (afterNext.x - point.x) * tension;
          const cp2y = next.y - (afterNext.y - point.y) * tension;
          if (i === 0) ctx.moveTo(point.x, point.y);
          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, next.x, next.y);
        });
        ctx.closePath();
        ctx.stroke();

        if (outline.x === 0 && outline.y === 0) {
          ctx.globalAlpha = 0.2;
          ctx.setLineDash([10 * projectedCenter.scale, 14 * projectedCenter.scale]);
          points.forEach(point => {
            ctx.beginPath();
            ctx.moveTo(projectedCenter.x, projectedCenter.y);
            ctx.lineTo(point.x, point.y);
            ctx.stroke();
          });
        }
        ctx.restore();
      });

      bubbles.forEach(b => {
        const projected = projectPoint(b.x, b.y);
        const scale = projected.scale;
        const drawX = projected.x, drawY = projected.y;
        const breathing = Math.sin(time + b.phase) * 3 * scale;
        const r = b.baseRadius * scale + breathing;

        ctx.globalAlpha = Math.min(1, scale + 0.3);
        ctx.beginPath();
        ctx.arc(drawX, drawY, r, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.fill();

        const img = skillImages[b.name] ? imageCache[skillImages[b.name]] : null;
        if (img && img.complete) {
          const imgSize = r * 1.5;
          ctx.globalAlpha = Math.min(1, scale + 0.3);
          ctx.drawImage(img, drawX - imgSize / 2, drawY - imgSize / 2, imgSize, imgSize);
        } else if (b.emoji) {
          ctx.fillStyle = b.textColor;
          ctx.globalAlpha = Math.min(1, scale + 0.3);
          ctx.font = `bold ${Math.max(20, 32 * scale)}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(b.emoji, drawX, drawY);
        }

        if (shouldShowBubbleLabel(b)) {
          drawBubbleLabel(b, drawX, drawY, r, scale);
        }
      });

      animId = requestAnimationFrame(draw);
    }

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'block', width: '100%', height: '600px', cursor: 'grab', borderRadius: '12px' }}
    />
  );
}
