
import { CourseCard } from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCourses } from "@/sanity/lib/courses/getCourses";
import {
  BookOpen,
  Code2,
  GraduationCap,
  Users,
  ArrowRight,
} from "lucide-react";
const features = [
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Comprehensive Curriculum",
    description:
      "Expertly crafted courses covering the latest technologies and industry practices.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Expert Instructors",
    description:
      "Learn from industry professionals with years of real-world experience.",
  },
  {
    icon: <Code2 className="h-6 w-6" />,
    title: "Hands-on Projects",
    description: "Build real-world applications and expand your portfolio.",
  },
  {
    icon: <GraduationCap className="h-6 w-6" />,
    title: "Career Support",
    description: "Get guidance and support to help you advance in your career.",
  },
];


export default async function Home() {
  const courses = await getCourses()
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              Transform Your Future with Expert-Led Learning
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-3xl mx-auto">
              Access world-class education and unlock your potential with our
              professional development courses.
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
              >
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/20 hover:bg-secondary transition-all duration-300"
              >
                Browse Courses
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose Our Platform
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Featured Courses
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <CourseCard key={course._id} course={course} href={`/courses/${course.slug}`} />
          ))}
        </div>
      </div>
    </section>
    </main>
  );
}
