
import React, { useState } from 'react';
import { ForumPost, User } from '../types';
import { UI_STRINGS } from '../constants';

interface ForumProps {
  currentUser: User;
}

export const Forum: React.FC<ForumProps> = ({ currentUser }) => {
  const [posts, setPosts] = useState<ForumPost[]>([
    {
      id: '1',
      author: 'করিম শেখ',
      title: 'ধানের পাতা হলুদ হয়ে যাচ্ছে',
      content: 'আমার ধানের জমিতে অনেক ধানের পাতার ডগা হলুদ হয়ে শুকিয়ে যাচ্ছে। কেউ কি এর সমাধান জানেন?',
      timestamp: new Date(),
      replies: [
        { id: 'r1', author: 'কৃষিবিদ রুবেল', content: 'সম্ভবত পটাশ সারের অভাব। ৫ শতাংশ জমিতে ১ কেজি করে পটাশ প্রয়োগ করে দেখুন।', timestamp: new Date() }
      ]
    }
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    const newPost: ForumPost = {
      id: Date.now().toString(),
      author: currentUser.name,
      title: newTitle,
      content: newContent,
      timestamp: new Date(),
      replies: []
    };
    setPosts([newPost, ...posts]);
    setNewTitle('');
    setNewContent('');
    setIsCreating(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">{UI_STRINGS.forum}</h3>
        <button 
          onClick={() => setIsCreating(!isCreating)}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-bold shadow-md transition"
        >
          {isCreating ? UI_STRINGS.back : UI_STRINGS.newPost}
        </button>
      </div>

      {isCreating ? (
        <form onSubmit={handleCreatePost} className="bg-white p-6 rounded-2xl shadow-md space-y-4 mb-8">
          <div>
            <label className="block text-gray-700 font-medium mb-1">{UI_STRINGS.postTitle}</label>
            <input 
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-green-500"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="সংক্ষেপে আপনার সমস্যাটি লিখুন"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">{UI_STRINGS.postContent}</label>
            <textarea 
              required
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-green-500"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="বিস্তারিত লিখুন..."
            />
          </div>
          <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-xl font-bold">
            {UI_STRINGS.submit}
          </button>
        </form>
      ) : null}

      <div className="space-y-6 pb-20">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500 py-10">{UI_STRINGS.noPosts}</p>
        ) : (
          posts.map(post => (
            <div key={post.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
                  {post.author[0]}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{post.author}</h4>
                  <p className="text-xs text-gray-400">{post.timestamp.toLocaleDateString('bn-BD')}</p>
                </div>
              </div>
              <h5 className="text-lg font-bold text-green-800 mb-2">{post.title}</h5>
              <p className="text-gray-700 mb-4">{post.content}</p>
              
              <div className="border-t pt-4 space-y-3">
                {post.replies.map(reply => (
                  <div key={reply.id} className="bg-gray-50 p-3 rounded-lg ml-4">
                    <p className="text-sm font-bold text-gray-800">{reply.author}</p>
                    <p className="text-sm text-gray-600">{reply.content}</p>
                  </div>
                ))}
                <button className="text-green-600 text-sm font-bold hover:underline flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                  </svg>
                  {UI_STRINGS.reply}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
