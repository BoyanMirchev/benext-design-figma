import { notFound } from "next/navigation"
import { getCourse, listLessons } from "@/app/admin/actions/courses"
import { LessonsView } from "@/app/admin/_components/lessons-view"

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const courseId = Number(id)
  if (Number.isNaN(courseId)) notFound()

  const course = await getCourse(courseId)
  if (!course) notFound()

  const lessons = await listLessons(courseId)

  return (
    <LessonsView
      course={{ id: course.id, title: course.title, status: course.status }}
      lessons={lessons}
    />
  )
}
