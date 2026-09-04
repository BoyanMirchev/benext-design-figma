import { listCourses } from "@/app/admin/actions/courses"
import { CoursesView } from "@/app/admin/_components/courses-view"

export default async function CoursesPage() {
  const courses = await listCourses()
  return <CoursesView courses={courses} />
}
