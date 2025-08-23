export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: Omit<User, 'passwordHash'>;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  courseId: string;
  createdAt: Date;
  course?: Course;
}

export interface Progress {
  id: string;
  userId: string;
  lessonId: string;
  status: ProgressStatus;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
  lesson?: Lesson;
}

export enum ProgressStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

export interface UpdateProgressRequest {
  status: ProgressStatus;
}

export interface JwtPayload {
  userId: string;
  email: string;
}

export interface AuthenticatedRequest {
  user?: JwtPayload;
  headers: any;
  params: any;
  body: any;
}
