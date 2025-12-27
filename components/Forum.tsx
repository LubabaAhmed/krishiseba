
import React, { useState, useRef } from 'react';
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
  const [newImage, setNewImage] = useState<string | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost: ForumPost = {
      id: Date.now().toString(),
      author: currentUser.name,
      title: newTitle,
      content: newContent,
      imageUrl: newImage,
      timestamp: new Date(),
      replies: []
    };
    setPosts([newPost, ...posts]);
    setNewTitle('');
    setNewContent('');
    setNewImage(undefined);
    setIsCreating(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">{UI_STRINGS.forum}</h3>
        <button 
          onClick={() => {
            setIsCreating(!isCreating);
            if (isCreating) {
              setNewTitle('');
              setNewContent('');
              setNewImage(undefined);
            }
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-bold shadow-md transition"
        >
          {isCreating ? UI_STRINGS.back : UI_STRINGS.newPost}
        </button>
      </div>

      {isCreating ? (
        <form onSubmit={handleCreatePost} className="bg-white p-6 rounded-2xl shadow-md space-y-4 mb-8 border border-green-50">
          <div>
            <label className="block text-gray-700 font-medium mb-1">{UI_STRINGS.postTitle}</label>
            <input 
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-green-500 transition-all"
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
              className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-green-500 transition-all resize-none"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="বিস্তারিত লিখুন..."
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium mb-1">ছবি যুক্ত করুন (ঐচ্ছিক)</label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="group relative h-40 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center cursor-pointer hover:border-green-400 hover:bg-green-50 transition-all overflow-hidden"
            >
              {newImage ? (
                <>
                  <img src={newImage} alt="Post preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white font-bold">
                    ছবি পরিবর্তন করুন
                  </div>
                </>
              ) : (
                <div className="text-center text-gray-400">
                  <svg className="w-10 h-10 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">একটি ছবি সিলেক্ট করুন</span>
                </div>
              )}
            </div>
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-green-100 transition transform active:scale-95">
            {UI_STRINGS.submit}
          </button>
        </form>
      ) : null}

      <div className="space-y-6 pb-20">
        {posts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
            <svg className="w-16 h-16 text-gray-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-gray-500 font-medium">{UI_STRINGS.noPosts}</p>
          </div>
        ) : (
          posts.map(post => (
            <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold border border-green-200">
                    {post.author[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 leading-tight">{post.author}</h4>
                    <p className="text-xs text-gray-400">{post.timestamp.toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                </div>
                
                <h5 className="text-xl font-bold text-green-800 mb-3">{post.title}</h5>
                <p className="text-gray-700 mb-4 whitespace-pre-wrap leading-relaxed">{post.content}</p>
                
                {post.imageUrl && (
                  <div className="mb-4 rounded-xl overflow-hidden border border-gray-100">
                    <img src={post.imageUrl} alt="Post attachment" className="w-full h-auto max-h-[400px] object-cover" />
                  </div>
                )}
                
                <div className="border-t border-gray-50 pt-4 space-y-3">
                  {post.replies.map(reply => (
                    <div key={reply.id} className="bg-gray-50 p-4 rounded-xl ml-4 border border-gray-100">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="text-sm font-bold text-gray-800">{reply.author}</p>
                        <span className="text-[10px] text-gray-400">•</span>
                        <span className="text-[10px] text-gray-400">{reply.timestamp.toLocaleDateString('bn-BD')}</span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{reply.content}</p>
                    </div>
                  ))}
                  <div className="flex items-center space-x-4">
                    <button className="text-green-600 text-sm font-bold hover:text-green-700 flex items-center transition-colors">
                      <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                      </svg>
                      {UI_STRINGS.reply}
                    </button>
                    <button className="text-gray-400 text-sm font-medium hover:text-gray-600 flex items-center transition-colors">
                      <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      লাইক
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
