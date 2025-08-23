import { Router, Request, Response } from 'express';
import prisma from '../prisma/client.js';

const router = Router();

// Get all courses
router.get('/', async (_req: Request, res: Response) => {
  try {
    const courses = await prisma.course.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(courses);
    return;
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
});

// Get lessons for a specific course
router.get('/:id/lessons', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;

    // Verify course exists
    const course = await prisma.course.findUnique({
      where: { id }
    });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Get lessons for the course
    const lessons = await prisma.lesson.findMany({
      where: { courseId: id },
      orderBy: {
        createdAt: 'asc'
      }
    });

    res.json({
      course,
      lessons
    });
    return;
  } catch (error) {
    console.error('Error fetching course lessons:', error);
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
});

export default router;
