import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import WritingCard from '../components/WritingCard';
import WritingDetail from '../components/WritingDetail';
import { Link } from 'react-router-dom';

function Home() {
  const [writings, setWritings] = useState([]);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWritings = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/writings`, {
          params: { type, search },
        });
        setWritings(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching writings');
        setLoading(false);
      }
    };
    fetchWritings();
  }, [type, search]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {console.log('Home component rendered')}
<Link to="/admin" onClick={() => console.log('Button clicked')}>
<button
  className="absolute top-6 right-8 px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-gold-400 shadow-lg text-white font-semibold hover:from-gold-400 hover:to-purple-600 transition-all duration-300 border-2 border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400"
  style={{ position: 'relative', zIndex: 10 }}
  onClick={(e) => {
    e.stopPropagation();
    console.log('Button clicked');
  }}
>
  Admin
</button>
</Link>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-6">
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Hero Section */}
                <div className="text-center mb-12 py-12">
                  <div className="mb-6">
                    <h1 className="font-nastaleeq text-5xl md:text-7xl font-bold bg-gradient-to-r from-gold-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent mb-4 animate-fade-in">
                      کرسال عزاداری
                    </h1>
                  </div>
                  
                  {/* Decorative Islamic pattern */}
                  <div className="flex justify-center items-center mb-8">
                    <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent"></div>
                    <div className="mx-4 w-3 h-3 bg-gold-400 rotate-45"></div>
                    <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent"></div>
                  </div>
                </div>

                {/* Search and Filter Section */}
                <div className="mb-12">
                  <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
                    <div className="flex flex-col lg:flex-row gap-6 items-center">
                      {/* Search Input */}
                      <div className="relative flex-1 w-full">
                        <input
                          type="text"
                          placeholder="Search by title..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          className="w-full p-4 pl-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all duration-300 hover:bg-white/25"
                        />
                        <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                      </div>

                      {/* Type Filter */}
                      <div className="relative">
                        <select
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                          className="appearance-none bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl px-6 py-4 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all duration-300 hover:bg-white/25 cursor-pointer"
                        >
                          <option value="" className="bg-slate-800 text-white">All Types</option>
                          <option value="noha" className="bg-slate-800 text-white">Noha</option>
                          <option value="kaseeda" className="bg-slate-800 text-white">Kaseeda</option>
                          <option value="bain" className="bg-slate-800 text-white">Bain</option>
                          <option value="band" className="bg-slate-800 text-white">Band</option>
                        </select>
                        <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Loading State */}
                {loading && (
                  <div className="flex flex-col items-center justify-center py-20">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-gold-400/30 border-t-gold-400 rounded-full animate-spin"></div>
                      <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-purple-400 rounded-full animate-spin animate-reverse animation-delay-150"></div>
                    </div>
                    <p className="text-white/80 mt-6 text-lg">Loading sacred writings...</p>
                  </div>
                )}

                {/* Error State */}
                {error && (
                  <div className="backdrop-blur-lg bg-red-500/20 border border-red-400/30 rounded-2xl p-6 mb-8">
                    <div className="flex items-center">
                      <svg className="w-6 h-6 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <p className="text-red-200 font-medium">{error}</p>
                    </div>
                  </div>
                )}

                {/* Writings Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {writings.map((writing, index) => (
                    <div
                      key={writing._id}
                      className="transform transition-all duration-500 hover:scale-105 animate-fade-in-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <WritingCard writing={writing} />
                    </div>
                  ))}
                </div>

                {/* Empty State */}
                {!loading && writings.length === 0 && !error && (
                  <div className="text-center py-20">
                    <div className="mb-6">
                      <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-3">No writings found</h3>
                    <p className="text-gray-400 text-lg">Try adjusting your search or filter criteria</p>
                  </div>
                )}
              </>
            }
          />
          <Route path="/writing/:id" element={<WritingDetail />} />
        </Routes>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animation-delay-150 {
          animation-delay: 150ms;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-reverse {
          animation-direction: reverse;
        }
        
        .bg-gold-400 {
          background-color: #fbbf24;
        }
        
        .text-gold-400 {
          color: #fbbf24;
        }
        
        .ring-gold-400 {
          --tw-ring-color: #fbbf24;
        }
        
        .border-gold-400 {
          border-color: #fbbf24;
        }
        
        .from-gold-400 {
          --tw-gradient-from: #fbbf24;
        }
        
        .via-gold-400 {
          --tw-gradient-via: #fbbf24;
        }
        
        .to-gold-400 {
          --tw-gradient-to: #fbbf24;
        }
      `}</style>
    </div>
  );
}

export default Home;