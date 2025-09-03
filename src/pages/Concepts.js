import React, { useState, useEffect, useRef } from 'react';
import { Eye, Clock, Star, ArrowRight, Filter, ChevronDown } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SearchBar from '../components/SearchBar';
import NavigationModal from '../components/NavigationModal';
import MobileNavigation from '../components/MobileNavigation';

const Concepts = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const conceptCategories = [
    { id: 'all', label: 'All Concepts' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'engineering', label: 'Engineering' },
    { id: 'design', label: 'Design' },
    { id: 'sustainability', label: 'Sustainability' }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
      image: '/assets/Newbuilding.jpeg',
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
      image: '/assets/Green Architecture.jpeg',
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
      image: '/assets/GROUNDWORK IN PROGRESS.jpeg',
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
      image: '/assets/UrbanPlanning.jpeg',
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

  const [selectedConcept, setSelectedConcept] = useState(null);
  const [showConceptModal, setShowConceptModal] = useState(false);

  const handleSearch = (searchTerm) => {
    console.log('Searching concepts for:', searchTerm);
    // In real app, this would filter concepts
    if (searchTerm.toLowerCase().includes('ai')) {
      setActiveFilter('design');
    }
  };

  const handleConceptClick = (concept) => {
    setSelectedConcept(concept);
    setShowConceptModal(true);
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
        {/* Filter Bar with Dropdown */}
        <div className="bg-white rounded-lg border border-gray-200 mb-4 p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Filter by Category:</span>
            </div>
            
            {/* Dropdown Menu */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors min-w-[160px] justify-between"
              >
                <span>{conceptCategories.find(cat => cat.id === activeFilter)?.label || 'All Concepts'}</span>
                <ChevronDown 
                  size={16} 
                  className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {conceptCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setActiveFilter(category.id);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors first:rounded-t-lg last:rounded-b-lg ${
                        activeFilter === category.id
                          ? 'bg-[#AC5757] text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
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
                <button
                  onClick={() => handleConceptClick(filteredConcepts[0])}
                  className="inline-flex items-center gap-2 bg-[#AC5757] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#8A4A4A] transition-colors w-fit"
                >
                  Explore Concept
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Concepts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConcepts.slice(1).map((concept) => (
            <div
              key={concept.id}
              onClick={() => handleConceptClick(concept)}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-200 group cursor-pointer"
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
                <h3 className="font-judson text-3xl font-bold text-gray-900 mb-2 group-hover:text-[#AC5757] transition-colors">
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
                <div className="flex items-center gap-1 mt-3 mb-4">
                  {concept.topics.slice(0, 2).map((topic, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                      {topic}
                    </span>
                  ))}
                  {concept.topics.length > 2 && (
                    <span className="text-gray-500 text-xs">+{concept.topics.length - 2}</span>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleConceptClick(concept);
                  }}
                  className="inline-flex items-center gap-2 bg-[#AC5757] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#8A4A4A] transition-colors w-fit"
                >
                  Explore Concept
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button 
            onClick={() => alert('Loading more concepts...\n\nThis would fetch additional concepts from the database.')}
            className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Load More Concepts
          </button>
        </div>
      </div>

      {/* Concept Detail Modal */}
      {showConceptModal && selectedConcept && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">{selectedConcept.title}</h2>
                <button 
                  onClick={() => setShowConceptModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="aspect-video mb-6 rounded-lg overflow-hidden">
                <img 
                  src={selectedConcept.image} 
                  alt={selectedConcept.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(selectedConcept.difficulty)}`}>
                  {selectedConcept.difficulty}
                </span>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock size={16} />
                  {selectedConcept.duration}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Eye size={16} />
                  {selectedConcept.views.toLocaleString()} views
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Star size={16} fill="currentColor" className="text-yellow-500" />
                  {selectedConcept.rating}
                </div>
              </div>
              
              <p className="text-gray-600 text-lg mb-6">{selectedConcept.subtitle}</p>
              
              <div className="space-y-4 mb-6">
                <h3 className="font-semibold text-gray-900">What you'll learn:</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Fundamental principles and core concepts</li>
                  <li>Real-world applications and case studies</li>
                  <li>Interactive exercises and assessments</li>
                  <li>Industry best practices and standards</li>
                </ul>
              </div>
              
              <div className="flex items-center gap-2 mb-6">
                {selectedConcept.topics.map((topic, idx) => (
                  <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm">
                    {topic}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    setShowConceptModal(false);
                    alert(`Starting ${selectedConcept.title} learning module...\n\nThis would launch an interactive learning experience with videos, quizzes, and hands-on exercises.`);
                  }}
                  className="flex-1 bg-[#AC5757] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#8A4A4A] transition-colors"
                >
                  Start Learning
                </button>
                <button 
                  onClick={() => {
                    alert('Added to watchlist!\n\nYou can access this later from your profile.');
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Save for Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <NavigationModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <MobileNavigation />
    </div>
  );
};

export default Concepts;