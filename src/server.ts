import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

let tasks: { id: number; title: string; description: string; category: string }[] = [];
let nextId = 1;

// Simulación de clasificación por IA con detección de prompt injection
const simularClasificacionLLM = (text: string): string => {
  const contenido = text.toLowerCase();
  
  if (contenido.includes("ignore") || contenido.includes("ignora las instrucciones")) {
    return "Security / Prompt Injection Detected";
  }
  if (contenido.includes("bug") || contenido.includes("error") || contenido.includes("fallo")) {
    return "Bugs / QA";
  }
  if (contenido.includes("front") || contenido.includes("css")) {
    return "Frontend";
  }
  if (contenido.includes("db") || contenido.includes("sql") || contenido.includes("api")) {
    return "Backend";
  }
  return "General";
};

// 1. POST: Crear tarea con simulación de latencia de LLM
app.post('/tasks', async (req: Request, res: Response) => {
  const { title, description } = req.body;
  if (!title || !description) return res.status(400).json({ error: 'Faltan campos' });
  
  await new Promise(resolve => setTimeout(resolve, 1200)); // Latencia de IA
  const category = simularClasificacionLLM(description);
  
  const newTask = { id: nextId++, title, description, category };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// 2. GET: Listar tareas
app.get('/tasks', (req: Request, res: Response) => {
  res.json(tasks);
});

// 3. DELETE: Eliminar tarea
app.delete('/tasks/:id', (req: Request, res: Response) => {
  const idParam = req.params.id;
  const id = Array.isArray(idParam) ? Number(idParam[0]) : Number(idParam);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  tasks = tasks.filter(t => t.id !== id);
  res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));