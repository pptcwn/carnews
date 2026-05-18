import { notFound } from 'next/navigation'
import { ImageManager } from '@/components/dashboard/image-manager'
import { getArticleById, getImagesByNewsId } from '@/lib/mock-data'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const article = getArticleById(Number(id))
  return {
    title: article ? `Images: ${article.title} | CarNews Thailand` : 'Article Not Found',
  }
}

export default async function ImagesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  // TODO: Fetch article and images from Supabase
  // TODO: Add auth guard
  const article = getArticleById(Number(id))
  const images = getImagesByNewsId(Number(id))

  if (!article) {
    notFound()
  }

  return (
    <div className="p-4 md:p-6">
      <ImageManager article={article} images={images} />
    </div>
  )
}
