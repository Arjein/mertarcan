import { DataService } from '@/services/dataService';
import Image from 'next/image';
import Link from 'next/link';

export default function BlogPage() {
  const articles = DataService.getArticles();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Blog
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Insights and tutorials on AI, machine learning, and technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article 
              key={article.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {article.category}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {article.readTime} min read
                  </span>
                </div>
                <h2 className="text-xl font-bold mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <Link href={article.link} target="_blank" rel="noopener noreferrer">
                    {article.title}
                  </Link>
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {article.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        src={article.authorImage}
                        alt={article.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium">{article.author}</span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {article.date}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
} 