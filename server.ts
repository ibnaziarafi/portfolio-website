import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { initialVillageProfile, villageProperties } from './src/data/villageData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory village visitor stats & guestbook entries for real interactivity
  let visitorCount = 142;
  const guestbook: Array<{ id: string; name: string; message: string; timestamp: string }> = [
    {
      id: 'gb-1',
      name: 'Sarah Chen (Lead Engineer)',
      message: 'The Route Planner at the Village Merchant is impressive! Comparing Dijkstra, Min-Heap, and A* with PyVRP and OR-Tools is top-notch.',
      timestamp: '2 hours ago'
    },
    {
      id: 'gb-2',
      name: 'Marcus Brody',
      message: 'Loved testing the 2048 game at the Watch Cottage and reading about the ML move-learning roadmap. Great village layout!',
      timestamp: 'Yesterday'
    }
  ];

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', runtime: 'Node.js + Express', timestamp: new Date().toISOString() });
  });

  // GET /api/profile - portfolio info & village stats
  app.get('/api/profile', (req, res) => {
    visitorCount += 1;
    res.json({
      ...initialVillageProfile,
      stats: {
        ...initialVillageProfile.stats,
        villageVisitors: visitorCount,
      }
    });
  });

  // GET /api/properties - list of village properties & buildings
  app.get('/api/properties', (req, res) => {
    const { category } = req.query;
    if (category && typeof category === 'string' && category !== 'all') {
      const filtered = villageProperties.filter((p) => p.category === category);
      return res.json({ properties: filtered });
    }
    res.json({ properties: villageProperties });
  });

  // GET /api/properties/:id - specific property details
  app.get('/api/properties/:id', (req, res) => {
    const property = villageProperties.find((p) => p.id === req.params.id);
    if (!property) {
      return res.status(404).json({ error: 'Property not found in village' });
    }
    res.json({ property });
  });

  // GET /api/guestbook - read village guestbook
  app.get('/api/guestbook', (req, res) => {
    res.json({ entries: guestbook, total: guestbook.length });
  });

  // POST /api/guestbook - add a signature to the village guestbook
  app.post('/api/guestbook', (req, res) => {
    const { name, message } = req.body;
    if (!name || !message) {
      return res.status(400).json({ error: 'Name and message are required' });
    }
    const newEntry = {
      id: `gb-${Date.now()}`,
      name: String(name).slice(0, 50),
      message: String(message).slice(0, 200),
      timestamp: 'Just now'
    };
    guestbook.unshift(newEntry);
    res.status(201).json({ success: true, entry: newEntry });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Village Server] Express running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
