import { notFound } from 'next/navigation'
import { ArticleEditForm } from '@/components/dashboard/article-edit-form'
import { getArticleById } from '@/lib/mock-data'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const article = getArticleById(Number(id))
  return {
    title: article ? `Edit: ${article.title} | CarNews Thailand` : 'Article Not Found',
  }
}

export default async function ArticleEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  // TODO: Fetch article from Supabase
  // TODO: Add auth guard
  const article = getArticleById(Number(id))

  if (!article) {
    notFound()
  }

  return (
    <div className="p-4 pb-24 md:p-6 md:pb-6">
      <ArticleEditForm article={article} />
    </div>
  )
}
