import { db } from "@/lib/db"
import { settings } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { VideoRoomsView } from "@/app/admin/_components/video-rooms-view"

export const metadata = { title: "Видео стаи | Би Инк" }

export default async function VideoRoomsPage() {
  const rows = await db
    .select()
    .from(settings)
    .where(eq(settings.key, "google_meet_url"))
    .limit(1)

  return <VideoRoomsView initialUrl={rows[0]?.value ?? ""} />
}
