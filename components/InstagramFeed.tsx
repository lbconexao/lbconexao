
import React from 'react';

interface InstagramFeedProps {
  handle: string;
  division: 'saude' | 'dev' | 'store';
}

const InstagramFeed: React.FC<InstagramFeedProps> = ({ handle, division }) => {
  const accentColor = division === 'saude' ? 'bg-health' : division === 'store' ? 'bg-store' : 'bg-primary';

  // Mock posts
  const posts = [
    { id: 1, likes: '1.2k', comments: '45' },
    { id: 2, likes: '850', comments: '12' },
    { id: 3, likes: '2.1k', comments: '89' },
    { id: 4, likes: '940', comments: '34' },
    { id: 5, likes: '1.5k', comments: '56' },
    { id: 6, likes: '720', comments: '21' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className={`size-16 rounded-full p-1 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600`}>
              <div className="w-full h-full rounded-full bg-white p-0.5">
                <div className={`w-full h-full rounded-full ${accentColor} flex items-center justify-center text-white`}>
                  <span className="material-symbols-outlined text-2xl">
                    {division === 'saude' ? 'medical_services' : division === 'dev' ? 'code' : 'shopping_bag'}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 leading-tight">@{handle}</h2>
              <p className="text-slate-500 text-sm">Acompanhe nossas atualizações diárias</p>
            </div>
          </div>
          <a
            href={`https://instagram.com/${handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`h-10 px-6 ${accentColor} text-white text-sm font-bold rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity`}
          >
            Seguir no Instagram
          </a>
          <a
            href="https://wa.me/5595981204347"
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 px-6 bg-green-500 text-white text-sm font-bold rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            WhatsApp
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-4">
          {posts.map((post) => (
            <div key={post.id} className="relative aspect-square bg-slate-100 group cursor-pointer overflow-hidden rounded-lg">
              <img
                src={`https://picsum.photos/seed/${division}${post.id}/600/600`}
                alt="Instagram Post"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white font-bold">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined fill-1">favorite</span>
                  {post.likes}
                </div>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined fill-1">chat_bubble</span>
                  {post.comments}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
