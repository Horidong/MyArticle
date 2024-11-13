import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useLanguage } from '../../contexts/LanguageContext.js';
import { Calendar, Clock, Tag, MessageSquare, Snow, Snowflake, Sun } from 'lucide-react';
import SnowWrapper from '../../components/SnowEffect.js';

const ReviewPage = () => {
  const { isEnglish } = useLanguage();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const [showSnow, setShowSnow] = useState(true);
  
  // Replace with your GitHub username and repo
  const GITHUB_USER = 'Horidong';
  const GITHUB_REPO = 'MyArticle';

  useEffect(() => {
    
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/issues?state=open&labels=published,bilingual`
        );
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, );

  const filterLabels = (labels) => {
    return labels.filter(label => 
      label.name.toLowerCase() !== 'bilingual' && 
      label.name.toLowerCase() !== 'published' && 
      label.name.toLowerCase() !== 'english' && 
      label.name.toLowerCase() !== 'korean'
    );
  };

  const parseContent = (post) => {
    const parts = post.body.split('---');
    if (parts.length < 2) return { title: post.title, content: post.body };

    const englishContent = parts[0].trim();
    const koreanContent = parts[1].trim();

    const titles = post.title.split('/').map(t => t.trim());
    const title = isEnglish ? titles[0] : titles[1] || titles[0];
    const content = isEnglish ? englishContent : koreanContent;

    return { title, content };
  };
  
  return (
    <div className="min-h-screen bg-sky-100 py-12">
      <SnowWrapper isEnabled={showSnow}>
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {isEnglish ? "My Blog About Review Everything" : "리뷰 블로그"}
          </h1>
          <p className="text-gray-600">
            {isEnglish 
              ? "Posting a review about everything I've experienced"
              : "제가 경험하는 모든 것을 리뷰합니다"}
          </p>
        </div>

        {/* Posts List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => {
              const { title, content } = parseContent(post);
              return (
                <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    <Link 
                    to={`/blog/review/${post.number}`}
                    >
                      {title}
                      </Link>
                  </h2>


                  {/* Metadata */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      {new Date(post.created_at).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      {`${Math.ceil(content.split(' ').length / 200)} min read`}
                    </div>
                    <div className="flex items-center">
                      <MessageSquare size={16} className="mr-1" />
                      {post.comments} comments
                    </div>
                  </div>

                  {/* Labels/Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                  {filterLabels(post.labels).map((label) => (
                      <span 
                        key={label.id}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {label.name}
                      </span>
                    ))}
                  </div>

                  {/* Preview */}
                  <div className="prose prose-blue max-w-none">
                    <ReactMarkdown>
                      {content.split('\n').slice(0, 3).join('\n')}
                    </ReactMarkdown>
                  </div>

                  {/* Read More Link */}
                  <div className="mt-4">
                    <Link 
                      href={`/blog/review/${post.number}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {isEnglish ? "Read more →" : "더 보기 →"}
                    </Link>
                  </div>
                </div>
              </article>
               );
            })}
          </div>
        )}
      </div>
      </SnowWrapper>
    </div>
  );
};

export default ReviewPage;