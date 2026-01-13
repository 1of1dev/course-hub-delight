import { useParams, Link } from 'react-router-dom';
import { useCourses } from '@/context/CourseContext';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Clock, Users, Star, BookOpen, Award, CheckCircle2, 
  ArrowLeft, Play, User 
} from 'lucide-react';
import { toast } from 'sonner';

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getCourse, isEnrolled, getEnrollment, enrollInCourse, unenrollFromCourse } = useCourses();
  const { user } = useAuth();

  const course = getCourse(id || '');
  const enrolled = isEnrolled(id || '');
  const enrollment = getEnrollment(id || '');

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Course not found</h1>
          <Button asChild>
            <Link to="/courses">Back to Courses</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleEnroll = () => {
    enrollInCourse(course.id);
    toast.success(`Successfully enrolled in "${course.title}"!`);
  };

  const handleUnenroll = () => {
    unenrollFromCourse(course.id);
    toast.success(`You have unenrolled from "${course.title}"`);
  };

  const levelColors = {
    Beginner: 'bg-success/10 text-success border-success/20',
    Intermediate: 'bg-accent/10 text-accent border-accent/20',
    Advanced: 'bg-primary/10 text-primary border-primary/20',
  };

  const modules = [
    'Introduction and Setup',
    'Core Fundamentals',
    'Intermediate Concepts',
    'Advanced Techniques',
    'Real-World Projects',
    'Best Practices',
    'Performance Optimization',
    'Testing Strategies',
    'Deployment Guide',
    'Final Assessment',
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <div className="gradient-hero text-primary-foreground">
        <div className="container py-12">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-sm opacity-80 hover:opacity-100 mb-6 transition-opacity"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Link>

          <div className="grid lg:grid-cols-3 gap-8 animate-fade-in">
            <div className="lg:col-span-2">
              <Badge variant="outline" className="border-white/30 text-white/90 mb-4">
                {course.category}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
                {course.title}
              </h1>
              <p className="text-lg opacity-90 mb-6">{course.description}</p>

              <div className="flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {course.instructor}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {course.duration}
                </span>
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {course.enrolledCount.toLocaleString()} enrolled
                </span>
                <span className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  {course.rating} rating
                </span>
              </div>
            </div>

            {/* Enrollment Card */}
            <Card className="lg:relative lg:-mb-20 shadow-xl animate-scale-in">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardContent className="p-6">
                <Badge variant="outline" className={levelColors[course.level]}>
                  {course.level}
                </Badge>

                {enrolled && enrollment && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Your Progress</span>
                      <span className="font-medium">{enrollment.progress}%</span>
                    </div>
                    <Progress value={enrollment.progress} className="h-2" />
                  </div>
                )}

                <div className="mt-6 space-y-3">
                  {enrolled ? (
                    <>
                      <Button className="w-full" size="lg">
                        <Play className="h-4 w-4" />
                        Continue Learning
                      </Button>
                      {user?.role === 'user' && (
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={handleUnenroll}
                        >
                          Unenroll
                        </Button>
                      )}
                    </>
                  ) : (
                    <Button className="w-full" size="lg" onClick={handleEnroll}>
                      Enroll Now — Free
                    </Button>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span>{course.modules} comprehensive modules</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{course.duration} of content</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <span>Certificate on completion</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="container py-12 lg:py-16">
        <div className="lg:w-2/3">
          {/* What You'll Learn */}
          <section className="mb-12 animate-fade-in">
            <h2 className="text-2xl font-display font-bold mb-6">What You'll Learn</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'Build real-world projects from scratch',
                'Master industry best practices',
                'Understand core concepts deeply',
                'Develop problem-solving skills',
                'Write clean, maintainable code',
                'Deploy and scale applications',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Course Content */}
          <section className="animate-fade-in">
            <h2 className="text-2xl font-display font-bold mb-6">Course Content</h2>
            <Card className="shadow-card">
              <CardContent className="p-0">
                {modules.slice(0, course.modules).map((module, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-4 ${
                      i !== course.modules - 1 ? 'border-b' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center">
                        {i + 1}
                      </span>
                      <span className="font-medium">{module}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {Math.floor(Math.random() * 30 + 15)} min
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
};

export default CourseDetail;
