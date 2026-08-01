import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, User, Clock, ChevronRight } from 'lucide-react'

const Blog = () => {
    const [searchQuery, setSearchQuery] = useState('')

    const posts = [
        {
            id: 1,
            title: '5 Essential Vaccinations for International Travel',
            excerpt: 'Planning a trip? Here are the must-have vaccinations before you travel abroad to ensure your protection.',
            author: 'Dr. Sarah Chen',
            date: '2026-07-28',
            readTime: '5 min read',
            category: 'Travel Health',
            image: 'https://source.unsplash.com/random/400x300/?health,travel',
        },
        {
            id: 2,
            title: 'Understanding Your Digital Health Card',
            excerpt: 'How MedicoPlus Health Cards work and why every traveler should have one for seamless healthcare access.',
            author: 'MedicoPlus Team',
            date: '2026-07-20',
            readTime: '8 min read',
            category: 'Technology',
            image: 'https://source.unsplash.com/random/400x300/?digital,health',
        },
        {
            id: 3,
            title: 'Managing Chronic Conditions While Traveling',
            excerpt: 'Practical tips for managing diabetes, hypertension, and other chronic conditions when you\'re away from home.',
            author: 'Dr. Michael Rodriguez',
            date: '2026-07-15',
            readTime: '12 min read',
            category: 'Health Tips',
            image: 'https://source.unsplash.com/random/400x300/?chronic,health',
        },
        {
            id: 4,
            title: 'Telemedicine vs In-Person: When to Choose Which',
            excerpt: 'Not sure if your condition warrants an in-person visit or can be handled via telemedicine? Here\'s the breakdown.',
            author: 'Dr. Emily Foster',
            date: '2026-07-10',
            readTime: '6 min read',
            category: 'Telemedicine',
            image: 'https://source.unsplash.com/random/400x300/?telemedicine,doctor',
        },
        {
            id: 5,
            title: 'Preparing for Your First International Health Checkup',
            excerpt: 'What to expect when booking your first appointment as a traveler or expat — a complete guide.',
            author: 'MedicoPlus Team',
            date: '2026-07-05',
            readTime: '10 min read',
            category: 'Travel Health',
            image: 'https://source.unsplash.com/random/400x300/?health,checkup',
        },
        {
            id: 6,
            title: 'Medication Safety: How to Pack Your Pills for Travel',
            excerpt: 'Learn the essential rules for carrying prescription medications across borders safely.',
            author: 'Dr. Lisa Wong',
            date: '2026-06-28',
            readTime: '7 min read',
            category: 'Medications',
            image: 'https://source.unsplash.com/random/400x300/?medication,pills',
        },
    ]

    return (
        <div className="py-12 px-4 sm:px-[6%]">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">
                        <span className="gradient-text">Health Resources</span> Blog
                    </h1>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                        Expert health tips, travel health guides, and healthcare insights from our medical team.
                    </p>
                </div>

                {/* Search */}
                <div className="relative max-w-md mx-auto mb-10">
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-full text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>

                {/* Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts
                        .filter(post =>
                            searchQuery === '' ||
                            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            post.category.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((post) => (
                            <Link
                                to={`/blog/${post.id}`}
                                key={post.id}
                                className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
                            >
                                <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-100 overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-3">
                                        {post.category}
                                    </span>
                                    <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-3 line-clamp-2">
                                        {post.title}
                                    </h2>
                                    <p className="text-sm text-slate-500 mb-4 line-clamp-3 flex-1">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center gap-4 text-xs text-slate-400">
                                        <div className="flex items-center gap-1">
                                            <User className="w-3 h-3" />
                                            <span>{post.author}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            <span>{post.readTime}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-6 pb-4 flex justify-between items-center text-xs text-slate-400 group-hover:text-blue-600 transition-colors">
                                    <span>{post.date}</span>
                                    <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        ))}
                </div>

                {/* Empty State */}
                {posts.filter(post =>
                    searchQuery === '' ||
                    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    post.category.toLowerCase().includes(searchQuery.toLowerCase())
                ).length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-slate-500 text-lg">No articles found matching "{searchQuery}".</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Blog
