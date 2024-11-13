import React, { useState, useEffect } from 'react';
import { useParams, useNavigate,Link, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useLanguage } from '../../../contexts/LanguageContext.js';
import { Calendar, Clock, ArrowLeft, Tag, MessageSquare, Snow, Snowflake, Sun } from 'lucide-react';
import SnowWrapper from '../../../components/SnowEffect.js';

const ReviewContentPage = () => {
  const { isEnglish } = useLanguage();
  const navigate = useNavigate();
  const { number } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const [showSnow, setShowSnow] = useState(true);

  const GITHUB_USER = 'Horidong';
  const GITHUB_REPO = 'MyArticle';

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/issues/${number}`
        );
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [number, isEnglish]);

  const handleGoBack = () => {
        navigate(`/blog/review`);
  };
  // Filter out utility labels
  const filterLabels = (labels) => {
    return labels.filter(label => 
      label.name.toLowerCase() !== 'bilingual' && 
      label.name.toLowerCase() !== 'published' && 
      label.name.toLowerCase() !== 'english' && 
      label.name.toLowerCase() !== 'korean'
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  const parseContent = (post) => {
    const parts = post.body.split('---');
    const titles = post.title.split('/').map(t => t.trim());
    
    return {
      title: isEnglish ? titles[0] : titles[1] || titles[0],
      content: isEnglish ? parts[0].trim() : parts[1].trim()
    };
  };

  const { title, content } = parseContent(posts);
  return (
    
    <div className="min-h-screen bg-sky-100 py-12">
      <SnowWrapper isEnabled={showSnow}>
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <button 
          onClick={handleGoBack}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
        >
          <ArrowLeft size={20} className="mr-2" />
          {isEnglish ? "Back to Articles" : "목록으로 돌아가기"}
        </button>

        {/* Article Container */}
        <posts className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {title}
            </h1>

            {/* Metadata */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center">
                <Calendar size={16} className="mr-1" />
                {new Date(posts.created_at).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                {`${Math.ceil(content.split(' ').length / 200)} min read`}
              </div>
              <div className="flex items-center">
                <MessageSquare size={16} className="mr-1" />
                {posts.comments} comments
              </div>
            </div>

            {/* Labels */}
            <div className="flex flex-wrap gap-2 mb-8">
              {filterLabels(posts.labels).map((label) => (
                <span 
                  key={label.id}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {label.name}
                </span>
              ))}
            </div>

            {/* Content */}
            <div className="prose prose-blue max-w-none">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>

            {/* Comments Section */}
            <div className="mt-12 pt-8 border-t">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {isEnglish ? "Comments" : "댓글"}
              </h2>
              <a 
                href={posts.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                {isEnglish 
                  ? "View or add comments on GitHub →" 
                  : "GitHub에서 댓글 보기/작성하기 →"}
              </a>
            </div>
          </div>
        </posts>
      </div>
      </SnowWrapper>
    </div>
  );
};

export default ReviewContentPage;