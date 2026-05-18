import { notFound } from 'next/navigation'
import { SocialContentEditor } from '@/components/dashboard/social-content-editor'
import { getArticleById, getSocialByNewsId } from '@/lib/mock-data'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const article = getArticleById(Number(id))
  return {
    title: article ? `Social: ${article.title} | CarNews Thailand` : 'Article Not Found',
  }
}

export default async function SocialEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  // TODO: Fetch article and social contents from Supabase
  // TODO: Add auth guard
  const article = getArticleById(Number(id))
  const socialContents = getSocialByNewsId(Number(id))

  if (!article) {
    notFound()
  }

  return (
    <div className="p-4 pb-24 lg:p-6 lg:pb-6">
      <SocialContentEditor article={article} socialContents={socialContents} />
    </div>
  )
}
