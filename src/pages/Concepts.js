import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Clock, Star, ArrowRight, Filter } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SearchBar from '../components/SearchBar';
import NavigationModal from '../components/NavigationModal';
import MobileNavigation from '../components/MobileNavigation';

const Concepts = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const conceptCategories = [
    { id: 'all', label: 'All Concepts' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'engineering', label: 'Engineering' },
    { id: 'design', label: 'Design' },
    { id: 'sustainability', label: 'Sustainability' }
  ];

  const concepts = [
    {
      id: 1,
      title: 'AI Generated Design',
      subtitle: 'Explore how artificial intelligence is revolutionizing architectural design',
      category: 'design',
      image: '/assets/AI GENERATED DESIGN .png',
      views: 2340,
      duration: '15 min read',
      difficulty: 'Intermediate',
      rating: 4.8,
      topics: ['AI', 'Design', 'Innovation']
    },
    {
      id: 2,
      title: 'International Projects',
      subtitle: 'Study architectural marvels from around the world',
      category: 'architecture',
      image: '/assets/INTERNATIONAL PROJECTS.png',
      views: 1876,
      duration: '20 min read',
      difficulty: 'Beginner',
      rating: 4.9,
      topics: ['Global', 'Culture', 'History']
    },
    {
      id: 3,
      title: 'New Age Building',
      subtitle: 'Modern construction techniques and materials',
      category: 'engineering',
      image: '/assets/NEW AGE BUILDING.png',
      views: 3210,
      duration: '12 min read',
      difficulty: 'Advanced',
      rating: 4.7,
      topics: ['Construction', 'Materials', 'Technology']
    },
    {
      id: 4,
      title: 'Sustainable Architecture',
      subtitle: 'Green building practices and environmental design',
      category: 'sustainability',
      image: '/assets/VR BACKGROUND.png',
      views: 2890,
      duration: '18 min read',
      difficulty: 'Intermediate',
      rating: 4.9,
      topics: ['Green Building', 'Environment', 'Energy']
    },
    {
      id: 5,
      title: 'Structural Engineering Fundamentals',
      subtitle: 'Core principles of structural design and analysis',
      category: 'engineering',
      image: '/assets/CONNECTING .png',
      views: 4560,
      duration: '25 min read',
      difficulty: 'Advanced',
      rating: 4.8,
      topics: ['Structures', 'Analysis', 'Safety']
    },
    {
      id: 6,
      title: 'Urban Planning Concepts',
      subtitle: 'Design principles for modern city development',
      category: 'architecture',
      image: '/assets/FIND JOB.png',
      views: 1654,
      duration: '22 min read',
      difficulty: 'Intermediate',
      rating: 4.6,
      topics: ['Urban', 'Planning', 'Community']
    }
  ];

  const filteredConcepts = activeFilter === 'all' 
    ? concepts 
    : concepts.filter(concept => concept.category === activeFilter);

  const handleSearch = (searchTerm) => {
    console.log('Searching concepts for:', searchTerm);
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <PageHeader 
        title="CONCEPTS"
        onMenuClick={() => setIsMenuOpen(true)}
        showHomeIcon={true}
        hideMessageIcon={false}
        hideNotificationIcon={false}
        showSearch={true}
        searchComponent={
          <SearchBar 
            placeholder="Search concepts, topics, categories..." 
            onSearch={handleSearch}
          />
        }
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filter Tabs */}
        <div className="bg-white rounded-lg border border-gray-200 mb-4 p-1">
          <div className="flex flex-wrap gap-1">
            {conceptCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  activeFilter === category.id
                    ? 'bg-[#AC5757] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Concept */}
        {filteredConcepts.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 mb-8 overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 aspect-video md:aspect-auto">
                <img 
                  src={filteredConcepts[0].image} 
                  alt={filteredConcepts[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-[#AC5757] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(filteredConcepts[0].difficulty)}`}>
                    {filteredConcepts[0].difficulty}
                  </span>
                </div>
                <h2 className="font-judson text-3xl font-bold text-gray-900 mb-4">
                  {filteredConcepts[0].title}
                </h2>
                <p className="text-gray-600 text-lg mb-6">
                  {filteredConcepts[0].subtitle}
                </p>
                <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    {filteredConcepts[0].duration}
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye size={16} />
                    {filteredConcepts[0].views.toLocaleString()} views
                  </div>
                  <div className="flex items-center gap-2">
                    <Star size={16} fill="currentColor" className="text-yellow-500" />
                    {filteredConcepts[0].rating}
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-6">
                  {filteredConcepts[0].topics.map((topic, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm">
                      {topic}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/app/concepts/${filteredConcepts[0].id}`}
                  className="inline-flex items-center gap-2 bg-[#AC5757] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#8A4A4A] transition-colors w-fit"
                >
                  Explore Concept
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Concepts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConcepts.slice(1).map((concept) => (
            <Link
              key={concept.id}
              to={`/app/concepts/${concept.id}`}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-200 group"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={concept.image} 
                  alt={concept.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(concept.difficulty)}`}>
                    {concept.difficulty}
                  </span>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Star size={14} fill="currentColor" className="text-yellow-500" />
                    {concept.rating}
                  </div>
                </div>
                <h3 className="font-judson text-xl font-bold text-gray-900 mb-2 group-hover:text-[#AC5757] transition-colors">
                  {concept.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {concept.subtitle}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      {concept.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye size={12} />
                      {concept.views.toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-3">
                  {concept.topics.slice(0, 2).map((topic, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                      {topic}
                    </span>
                  ))}
                  {concept.topics.length > 2 && (
                    <span className="text-gray-500 text-xs">+{concept.topics.length - 2}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
            Load More Concepts
          </button>
        </div>
      </div>

      <NavigationModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <MobileNavigation />
    </div>
  );
};

export default Concepts;