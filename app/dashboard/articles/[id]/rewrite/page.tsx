import { notFound } from 'next/navigation'
import { RewriteEditor } from '@/components/dashboard/rewrite-editor'
import { getArticleById, getRewriteByNewsId } from '@/lib/mock-data'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const article = getArticleById(Number(id))
  return {
    title: article ? `Rewrite: ${article.title} | CarNews Thailand` : 'Article Not Found',
  }
}

export default async function RewritePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  // TODO: Fetch article and rewrite from Supabase
  // TODO: Add auth guard
  const article = getArticleById(Number(id))
  const rewrite = getRewriteByNewsId(Number(id))

  if (!article) {
    notFound()
  }

  return (
    <div className="p-4 pb-24 xl:p-6 xl:pb-6">
      <RewriteEditor article={article} existingRewrite={rewrite} />
    </div>
  )
}
