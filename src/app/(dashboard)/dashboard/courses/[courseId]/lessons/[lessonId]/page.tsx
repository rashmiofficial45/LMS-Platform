import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { getLessonById } from "@/sanity/lib/lesson/getLessonById";
import { LessonCompleteButton } from "@/components/LessonCompleteButton";
import { PortableText } from "next-sanity";
import VideoPlayer from "@/components/VideoPlayer";
import { LoomEmbed } from "@/components/LoomEmbed";

// Define interfaces for PortableText component values
interface BlockValue {
  style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
  listItem?: "bullet" | "number";
  _type: "block";
  _key: string;
}

interface LinkValue {
  href: string;
  _type: "link";
  _key: string;
}

// Define components for PortableText
const portableTextComponents = {
  types: {
    block: ({ children, value }: { children: React.ReactNode; value: BlockValue }) => {
      const { style = 'normal' } = value;
      if (style === 'h1') {
        return <h1 className="text-3xl font-bold mb-4 mt-8">{children}</h1>;
      }
      if (style === 'h2') {
        return <h2 className="text-2xl font-bold mb-3 mt-6">{children}</h2>;
      }
      if (style === 'h3') {
        return <h3 className="text-xl font-semibold mb-2 mt-4">{children}</h3>;
      }
      if (style === 'h4') {
        return <h4 className="text-lg font-semibold mb-2 mt-4">{children}</h4>;
      }
      if (style === 'blockquote') {
        return <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4">{children}</blockquote>;
      }
      if (style === 'normal') {
        return <p className="mb-4 leading-relaxed">{children}</p>;
      }

      // Default fallback
      return <p className="mb-4">{children}</p>;
    },
  },
  marks: {
    link: ({ children, value }: { children: React.ReactNode; value: LinkValue }) => {
      const { href } = value;
      return (
        <a
          href={href}
          className="text-blue-600 hover:text-blue-800 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }: { children: React.ReactNode }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }: { children: React.ReactNode }) => <em className="italic">{children}</em>,
    code: ({ children }: { children: React.ReactNode }) => <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono">{children}</code>,
  },
  list: {
    bullet: ({ children }: { children: React.ReactNode }) => <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>,
    number: ({ children }: { children: React.ReactNode }) => <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>,
  },
  listItem: ({ children }: { children: React.ReactNode }) => <li className="ml-4">{children}</li>,
};

interface LessonPageProps {
  params: Promise<{
    courseId: string;
    lessonId: string;
  }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const user = await currentUser();
  const { courseId, lessonId } = await params;

  const lesson = await getLessonById(lessonId);

  if (!lesson) {
    return redirect(`/dashboard/courses/${courseId}`);
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto pt-12 pb-20 px-4">
          <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>

          {lesson.description && (
            <p className="text-muted-foreground mb-8">{lesson.description}</p>
          )}
          {/* feat: We must integrate with MUX for the video streaming which is paid  */}
          <div className="space-y-8">
            Video Section
            {lesson.videoUrl && <VideoPlayer url={lesson.videoUrl} />}

            {/* Loom Embed Video if loomUrl is provided */}
            {lesson.loomUrl && <LoomEmbed shareUrl={lesson.loomUrl} />}

            {/* Lesson Content */}
            {lesson.content && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Lesson Notes</h2>
                <div className="prose prose-blue dark:prose-invert max-w-none">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  <PortableText value={lesson.content} components={portableTextComponents as any} />
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <LessonCompleteButton lessonId={lesson._id} clerkId={user!.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
