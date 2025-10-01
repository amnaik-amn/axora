import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Heart, Share2, Download, Plus } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import NavigationModal from '../components/NavigationModal';
import MobileNavigation from '../components/MobileNavigation';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data for projects (matching Pinup.js)
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

  useEffect(() => {
    const projectData = projects.find(p => p.id === parseInt(projectId));
    if (projectData) {
      setProject(projectData);
    }
    setLoading(false);
  }, [projectId]);

  const handleBack = () => {
    navigate('/app/pinup');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Published': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      case 'Review': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#AC5757] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <p className="text-gray-600 mb-6">The project you're looking for doesn't exist.</p>
          <button
            onClick={handleBack}
            className="bg-[#AC5757] text-white px-6 py-3 rounded-lg hover:bg-[#8A4A4A] transition-colors"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <PageHeader 
        title="PROJECT DETAIL"
        onMenuClick={() => setIsMenuOpen(true)}
        showHomeIcon={true}
        hideMessageIcon={false}
        hideNotificationIcon={false}
        showSearch={false}
      />

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Projects
        </button>

        {/* Project Header */}
        <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Project Image */}
            <div className="lg:w-1/2">
              <div className="aspect-video rounded-xl overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Project Info */}
            <div className="lg:w-1/2">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(project.status)}`}>
                  {project.status === 'Published' ? 'Graded' : project.status}
                </span>
                <span className="text-sm text-gray-500">
                  Submitted: {new Date(project.date).toLocaleDateString()}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">{project.title}</h1>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  {project.author}
                </div>
                <div className="flex items-center gap-2">
                  <Heart size={16} fill="currentColor" className="text-red-500" />
                  {project.likes} likes
                </div>
              </div>

              <p className="text-gray-700 text-lg mb-6">{project.description}</p>

              <div className="flex items-center gap-2 mb-6">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => alert('Project liked!')}
                  className="flex-1 bg-[#AC5757] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#8A4A4A] transition-colors flex items-center justify-center gap-2"
                >
                  <Heart size={16} />
                  Like Project
                </button>
                <button 
                  onClick={() => alert('Project shared!')}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <Share2 size={16} />
                  Share
                </button>
                <button 
                  onClick={() => alert('Downloading project...')}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <Download size={16} />
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Project Details Sections */}
        <div className="space-y-8">

          {/* Presentation Section */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Presentation</h2>
              <button className="text-[#AC5757] hover:text-[#8A4A4A] font-medium flex items-center gap-2">
                <Plus size={16} />
                Add Presentation
              </button>
            </div>
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-6 min-w-max">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex-shrink-0 w-80 h-48 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors cursor-pointer group">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-gray-300 transition-colors">
                        <Plus size={24} className="text-gray-400" />
                      </div>
                      <p className="text-gray-500 text-sm">Add Presentation {item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sketches Section */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Sketches</h2>
              <button className="text-[#AC5757] hover:text-[#8A4A4A] font-medium flex items-center gap-2">
                <Plus size={16} />
                Add Sketch
              </button>
            </div>
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-6 min-w-max">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex-shrink-0 w-80 h-48 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors cursor-pointer group">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-gray-300 transition-colors">
                        <Plus size={24} className="text-gray-400" />
                      </div>
                      <p className="text-gray-500 text-sm">Add Sketch {item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Models Section */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Models</h2>
              <button className="text-[#AC5757] hover:text-[#8A4A4A] font-medium flex items-center gap-2">
                <Plus size={16} />
                Add Model
              </button>
            </div>
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-6 min-w-max">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex-shrink-0 w-80 h-48 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors cursor-pointer group">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-gray-300 transition-colors">
                        <Plus size={24} className="text-gray-400" />
                      </div>
                      <p className="text-gray-500 text-sm">Sketch-Up Model {item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <NavigationModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <MobileNavigation />
    </div>
  );
};

export default ProjectDetail;
