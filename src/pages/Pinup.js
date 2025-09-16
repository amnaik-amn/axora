import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  Grid, 
  List, 
  Upload, 
  Edit, 
  Trash2, 
  Heart, 
  Share2, 
  Download,
  ChevronDown,
  Calendar,
  User
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SearchBar from '../components/SearchBar';
import NavigationModal from '../components/NavigationModal';
import MobileNavigation from '../components/MobileNavigation';

const Pinup = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectModal, setShowProjectModal] = useState(false);

  // Mock data for projects
  const projects = [
    {
      id: 1,
      title: 'Modern Residential Complex',
      category: 'Residential',
      author: 'Sarah Chen',
      date: '2024-01-15',
      likes: 24,
      image: '/assets/Modern Communications Systems.png',
      description: 'A contemporary residential development featuring sustainable design principles and community-focused amenities.',
      tags: ['Modern', 'Sustainable', 'Community'],
      status: 'Published'
    },
    {
      id: 2,
      title: 'Urban Plaza Design',
      category: 'Urban Planning',
      author: 'Marcus Rodriguez',
      date: '2024-01-12',
      likes: 18,
      image: '/assets/UrbanPlanning.jpeg',
      description: 'Revitalization of downtown plaza with integrated green spaces and pedestrian-friendly design.',
      tags: ['Urban', 'Green Space', 'Pedestrian'],
      status: 'Draft'
    },
    {
      id: 3,
      title: 'Sustainable Office Tower',
      category: 'Commercial',
      author: 'Elena Kowalski',
      date: '2024-01-10',
      likes: 32,
      image: '/assets/Green Architecture.jpeg',
      description: 'LEED-certified office building with innovative energy systems and biophilic design elements.',
      tags: ['LEED', 'Energy', 'Biophilic'],
      status: 'Published'
    },
    {
      id: 4,
      title: 'Cultural Center Concept',
      category: 'Cultural',
      author: 'Ahmed Hassan',
      date: '2024-01-08',
      likes: 15,
      image: '/assets/INTERNATIONAL PROJECTS.png',
      description: 'Multi-purpose cultural center celebrating local heritage through contemporary architecture.',
      tags: ['Cultural', 'Heritage', 'Contemporary'],
      status: 'Review'
    },
    {
      id: 5,
      title: 'Smart City Infrastructure',
      category: 'Infrastructure',
      author: 'Lisa Park',
      date: '2024-01-05',
      likes: 28,
      image: '/assets/AI GENERATED DESIGN .png',
      description: 'AI-integrated urban infrastructure system for next-generation smart cities.',
      tags: ['AI', 'Smart City', 'Infrastructure'],
      status: 'Published'
    },
    {
      id: 6,
      title: 'Coastal Resort Design',
      category: 'Hospitality',
      author: 'David Thompson',
      date: '2024-01-03',
      likes: 21,
      image: '/assets/Newbuilding.jpeg',
      description: 'Luxury coastal resort with climate-responsive design and panoramic ocean views.',
      tags: ['Luxury', 'Coastal', 'Climate-Responsive'],
      status: 'Draft'
    },
    {
      id: 7,
      title: 'Mixed-Use Development',
      category: 'Commercial',
      author: 'Jennifer Liu',
      date: '2024-01-01',
      likes: 19,
      image: '/assets/Structural analysis.jpeg',
      description: 'Innovative mixed-use complex combining retail, office, and residential spaces with sustainable design.',
      tags: ['Mixed-Use', 'Retail', 'Office'],
      status: 'Published'
    },
    {
      id: 8,
      title: 'Public Library Renovation',
      category: 'Cultural',
      author: 'Michael Brown',
      date: '2023-12-28',
      likes: 26,
      image: '/assets/GROUNDWORK IN PROGRESS.jpeg',
      description: 'Modern renovation of historic public library preserving architectural heritage while adding contemporary features.',
      tags: ['Renovation', 'Historic', 'Library'],
      status: 'Review'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects', count: projects.length },
    { id: 'Residential', label: 'Residential', count: projects.filter(p => p.category === 'Residential').length },
    { id: 'Commercial', label: 'Commercial', count: projects.filter(p => p.category === 'Commercial').length },
    { id: 'Urban Planning', label: 'Urban Planning', count: projects.filter(p => p.category === 'Urban Planning').length },
    { id: 'Cultural', label: 'Cultural', count: projects.filter(p => p.category === 'Cultural').length },
    { id: 'Infrastructure', label: 'Infrastructure', count: projects.filter(p => p.category === 'Infrastructure').length },
    { id: 'Hospitality', label: 'Hospitality', count: projects.filter(p => p.category === 'Hospitality').length }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = activeFilter === 'all' || project.category === activeFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setShowProjectModal(true);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Published': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      case 'Review': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <PageHeader 
        title="PIN UP"
        onMenuClick={() => setIsMenuOpen(true)}
        showHomeIcon={true}
        hideMessageIcon={false}
        hideNotificationIcon={false}
        showSearch={true}
        searchComponent={
          <SearchBar 
            placeholder="Search projects, tags, authors..." 
            onSearch={handleSearch}
          />
        }
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Projects</h1>
            <p className="text-gray-600">Keep a record of your work</p>
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            {/* Category Filter */}
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Filter size={16} />
                {categories.find(cat => cat.id === activeFilter)?.label || 'All Projects'}
                <ChevronDown size={16} />
              </button>
              
              {isFilterOpen && (
                <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setActiveFilter(category.id);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors first:rounded-t-lg last:rounded-b-lg ${
                        activeFilter === category.id
                          ? 'bg-[#AC5757] text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {category.label} ({category.count})
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button 
              onClick={() => alert('Upload new project...\n\nThis would open a project upload modal.')}
              className="inline-flex items-center gap-2 bg-[#AC5757] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#8A4A4A] transition-colors"
            >
              <Plus size={20} />
              New Project
            </button>
          </div>
        </div>


        {/* Projects Horizontal Scrollable Row */}
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-6 min-w-max" style={{ scrollbarWidth: 'thin' }}>
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => handleProjectClick(project)}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-200 group cursor-pointer flex-shrink-0 w-80"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Heart size={14} fill="currentColor" className="text-red-500" />
                      {project.likes}
                    </div>
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-[#AC5757] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <User size={12} />
                      {project.author}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={12} />
                      {new Date(project.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-wrap">
                    {project.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 2 && (
                      <span className="text-gray-500 text-xs">+{project.tags.length - 2}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Course Projects Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Projects</h2>
          
          {/* Course Icons Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Selected Courses */}
            <div 
              onClick={() => navigate('/app/study?tab=courses')}
              className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg hover:border-gray-300 transition-all duration-200 cursor-pointer group"
            >
              <div className="aspect-square bg-gradient-to-br from-[#AC5757]/10 to-[#AC5757]/5 rounded-lg flex items-center justify-center mb-3 group-hover:from-[#AC5757]/20 group-hover:to-[#AC5757]/10 transition-colors">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#AC5757] rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold text-lg">SR</span>
                  </div>
                  <div className="text-xs text-gray-500">3/12 weeks</div>
                </div>
              </div>
              <h3 className="font-semibold text-sm text-gray-900 text-center line-clamp-2 group-hover:text-[#AC5757] transition-colors">
                INTRO TO SPATIAL REASONING
              </h3>
            </div>

            <div 
              onClick={() => navigate('/app/study?tab=courses')}
              className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg hover:border-gray-300 transition-all duration-200 cursor-pointer group"
            >
              <div className="aspect-square bg-gradient-to-br from-[#AC5757]/10 to-[#AC5757]/5 rounded-lg flex items-center justify-center mb-3 group-hover:from-[#AC5757]/20 group-hover:to-[#AC5757]/10 transition-colors">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#AC5757] rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold text-lg">BIM</span>
                  </div>
                  <div className="text-xs text-gray-500">7/14 weeks</div>
                </div>
              </div>
              <h3 className="font-semibold text-sm text-gray-900 text-center line-clamp-2 group-hover:text-[#AC5757] transition-colors">
                BIM APPLI.: GIS MAPPING
              </h3>
            </div>

            <div 
              onClick={() => navigate('/app/study?tab=courses')}
              className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg hover:border-gray-300 transition-all duration-200 cursor-pointer group"
            >
              <div className="aspect-square bg-gradient-to-br from-[#AC5757]/10 to-[#AC5757]/5 rounded-lg flex items-center justify-center mb-3 group-hover:from-[#AC5757]/20 group-hover:to-[#AC5757]/10 transition-colors">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#AC5757] rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold text-lg">SD</span>
                  </div>
                  <div className="text-xs text-gray-500">3/13 weeks</div>
                </div>
              </div>
              <h3 className="font-semibold text-sm text-gray-900 text-center line-clamp-2 group-hover:text-[#AC5757] transition-colors">
                INTRO TO SUSTAINABILITY & DESIGN
              </h3>
            </div>

            {/* AI Assigned Courses */}
            <div 
              onClick={() => navigate('/app/study?tab=courses')}
              className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg hover:border-gray-300 transition-all duration-200 cursor-pointer group"
            >
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center mb-3 group-hover:from-blue-200 group-hover:to-blue-100 transition-colors">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold text-lg">WC</span>
                  </div>
                  <div className="text-xs text-gray-500">4/16 weeks</div>
                </div>
              </div>
              <h3 className="font-semibold text-sm text-gray-900 text-center line-clamp-2 group-hover:text-blue-600 transition-colors">
                WHAT HAPPENS AFTER CONSTRUCTION? ENG334
              </h3>
            </div>

            <div 
              onClick={() => navigate('/app/study?tab=courses')}
              className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg hover:border-gray-300 transition-all duration-200 cursor-pointer group"
            >
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center mb-3 group-hover:from-blue-200 group-hover:to-blue-100 transition-colors">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold text-lg">ST</span>
                  </div>
                  <div className="text-xs text-gray-500">15/18 weeks</div>
                </div>
              </div>
              <h3 className="font-semibold text-sm text-gray-900 text-center line-clamp-2 group-hover:text-blue-600 transition-colors">
                STRUCTURES I-III
              </h3>
            </div>

            <div 
              onClick={() => navigate('/app/study?tab=courses')}
              className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg hover:border-gray-300 transition-all duration-200 cursor-pointer group"
            >
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center mb-3 group-hover:from-blue-200 group-hover:to-blue-100 transition-colors">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold text-lg">GE</span>
                  </div>
                  <div className="text-xs text-gray-500">3/15 weeks</div>
                </div>
              </div>
              <h3 className="font-semibold text-sm text-gray-900 text-center line-clamp-2 group-hover:text-blue-600 transition-colors">
                FOUNDATIONS OF GEOTECHNICAL ENGINEE-
              </h3>
            </div>
          </div>
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button 
            onClick={() => alert('Loading more projects...\n\nThis would fetch additional projects from the database.')}
            className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Load More Projects
          </button>
        </div>
      </div>

      {/* Project Detail Modal */}
      {showProjectModal && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">{selectedProject.title}</h2>
                <button 
                  onClick={() => setShowProjectModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="aspect-video mb-6 rounded-lg overflow-hidden">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(selectedProject.status)}`}>
                  {selectedProject.status}
                </span>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <User size={16} />
                  {selectedProject.author}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar size={16} />
                  {new Date(selectedProject.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Heart size={16} fill="currentColor" className="text-red-500" />
                  {selectedProject.likes} likes
                </div>
              </div>
              
              <p className="text-gray-600 text-lg mb-6">{selectedProject.description}</p>
              
              <div className="flex items-center gap-2 mb-6">
                {selectedProject.tags.map((tag, idx) => (
                  <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    setShowProjectModal(false);
                    alert(`Opening ${selectedProject.title} in full view...\n\nThis would launch the project in a detailed viewer with additional images, 3D models, and project documentation.`);
                  }}
                  className="flex-1 bg-[#AC5757] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#8A4A4A] transition-colors"
                >
                  View Full Project
                </button>
                <button 
                  onClick={() => alert('Project liked!')}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <Heart size={16} />
                  Like
                </button>
                <button 
                  onClick={() => alert('Project shared!')}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <Share2 size={16} />
                  Share
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

export default Pinup;
