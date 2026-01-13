import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Course, Enrollment, mockCourses, mockEnrollments } from '@/data/mockData';

interface CourseContextType {
  courses: Course[];
  enrollments: Enrollment[];
  addCourse: (course: Omit<Course, 'id'>) => void;
  removeCourse: (id: string) => void;
  enrollInCourse: (courseId: string) => void;
  unenrollFromCourse: (courseId: string) => void;
  isEnrolled: (courseId: string) => boolean;
  getEnrollment: (courseId: string) => Enrollment | undefined;
  getCourse: (courseId: string) => Course | undefined;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider = ({ children }: { children: ReactNode }) => {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [enrollments, setEnrollments] = useState<Enrollment[]>(mockEnrollments);

  const addCourse = (courseData: Omit<Course, 'id'>) => {
    const newCourse: Course = {
      ...courseData,
      id: Date.now().toString(),
    };
    setCourses(prev => [...prev, newCourse]);
  };

  const removeCourse = (id: string) => {
    setCourses(prev => prev.filter(c => c.id !== id));
    setEnrollments(prev => prev.filter(e => e.courseId !== id));
  };

  const enrollInCourse = (courseId: string) => {
    if (!enrollments.find(e => e.courseId === courseId)) {
      setEnrollments(prev => [
        ...prev,
        {
          courseId,
          progress: 0,
          enrolledAt: new Date().toISOString().split('T')[0],
        },
      ]);
      setCourses(prev =>
        prev.map(c =>
          c.id === courseId ? { ...c, enrolledCount: c.enrolledCount + 1 } : c
        )
      );
    }
  };

  const unenrollFromCourse = (courseId: string) => {
    setEnrollments(prev => prev.filter(e => e.courseId !== courseId));
    setCourses(prev =>
      prev.map(c =>
        c.id === courseId ? { ...c, enrolledCount: Math.max(0, c.enrolledCount - 1) } : c
      )
    );
  };

  const isEnrolled = (courseId: string) => {
    return enrollments.some(e => e.courseId === courseId);
  };

  const getEnrollment = (courseId: string) => {
    return enrollments.find(e => e.courseId === courseId);
  };

  const getCourse = (courseId: string) => {
    return courses.find(c => c.id === courseId);
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        enrollments,
        addCourse,
        removeCourse,
        enrollInCourse,
        unenrollFromCourse,
        isEnrolled,
        getEnrollment,
        getCourse,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
};
