import { CourseDetail } from "@/components/course-detail";

const titles: Record<string, string> = {
  bazovo: "Дигитални умения - базово ниво",
  sredno: "Дигитални умения - средно ниво",
  naprednalo: "Дигитални умения - напреднало ниво",
};

const lessons = Array.from({ length: 15 }, (_, i) => ({ id: i + 1, title: "Име на урок" }));

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = titles[slug] ?? "Дигитални умения - базово ниво";
  return <CourseDetail title={title} lessons={lessons} />;
}
