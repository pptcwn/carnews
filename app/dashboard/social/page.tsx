import { SocialQueueTable } from '@/components/dashboard/social-queue-table'
import { getSocialQueue } from '@/lib/mock-data'

export const metadata = {
  title: 'Social Content | CarNews Thailand',
  description: 'สร้างและจัดการ Social Content',
}

export default function SocialPage() {
  // TODO: Fetch social queue from Supabase
  // TODO: Add auth guard
  const socialQueue = getSocialQueue()

  return (
    <div className="p-4 md:p-6">
      <SocialQueueTable items={socialQueue} />
    </div>
  )
}
