import { Router, Response } from 'express';
import prisma from '../prisma/client.js';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth.js';
import { UpdateProgressRequest, ProgressStatus } from '../types/index.js';

const router = Router();

// Get user's progress for a specific lesson
router.get('/:lessonId', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { lessonId } = req.params;
    const userId = req.user!.userId;

    // Verify lesson exists
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId }
    });

    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    // Get or create progress record
    let progress = await prisma.progress.findUnique({
      where: {
        userId_lessonId: {
          userId,
          lessonId
        }
      },
      include: {
        lesson: {
          include: {
            course: true
          }
        }
      }
    });

    if (!progress) {
      // Create default progress record
      progress = await prisma.progress.create({
        data: {
          userId,
          lessonId,
          status: ProgressStatus.NOT_STARTED
        },
        include: {
          lesson: {
            include: {
              course: true
            }
          }
        }
      });
    }

    res.json(progress);
    return;
  } catch (error) {
    console.error('Error fetching progress:', error);
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
});

// Update user's progress for a specific lesson
router.put('/:lessonId', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { lessonId } = req.params;
    const { status } = req.body as UpdateProgressRequest;
    const userId = req.user!.userId;

    // Validate status
    if (!Object.values(ProgressStatus).includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    // Verify lesson exists
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId }
    });

    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    // Update or create progress record
    const progress = await prisma.progress.upsert({
      where: {
        userId_lessonId: {
          userId,
          lessonId
        }
      },
      update: {
        status
      },
      create: {
        userId,
        lessonId,
        status
      },
      include: {
        lesson: {
          include: {
            course: true
          }
        }
      }
    });

    res.json(progress);
    return;
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
});

// Get all progress for the authenticated user
router.get('/', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.userId;

    const progress = await prisma.progress.findMany({
      where: { userId },
      include: {
        lesson: {
          include: {
            course: true
          }
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });

    res.json(progress);
    return;
  } catch (error) {
    console.error('Error fetching user progress:', error);
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
});

export default router;
