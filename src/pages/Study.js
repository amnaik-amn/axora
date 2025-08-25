import React, { useState } from 'react';
import { BookOpen, FileText, GraduationCap, Sparkles, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, Tab, Badge, ProgressBar } from '../components/ui';
import { Container } from '../components/layout';
import { getStatusColor } from '../utils/helpers';

const Study = () => {
  const [activeTab, setActiveTab] = useState('resources');

  const tabs = [
    { id: 'resources', label: 'Resources' },
    { id: 'tests', label: 'Tests' },
    { id: 'courses', label: 'Courses' },
  ];

  const resources = [
    { 
      title: 'Introduction to Algorithms',
      type: 'Book',
      progress: 45,
      status: 'continue',
      aiTailored: true
    },
    { 
      title: 'Data Science Fundamentals',
      type: 'PDF',
      progress: 0,
      status: 'assigned',
      aiTailored: false
    },
    { 
      title: 'Machine Learning Handbook',
      type: 'Interactive',
      progress: 78,
      status: 'continue',
      aiTailored: true
    },
    { 
      title: 'Web Development Guide',
      type: 'Video Series',
      progress: 100,
      status: 'completed',
      aiTailored: false
    },
  ];

  const tests = [
    {
      title: 'Midterm: Data Structures',
      attempts: 2,
      bestScore: 85,
      status: 'passed',
      deadline: 'Dec 20, 2024'
    },
    {
      title: 'Quiz: Python Basics',
      attempts: 1,
      bestScore: 92,
      status: 'passed',
      deadline: 'Dec 15, 2024'
    },
    {
      title: 'Final: Algorithms',
      attempts: 0,
      bestScore: null,
      status: 'pending',
      deadline: 'Dec 25, 2024'
    },
  ];

  const courses = [
    {
      title: 'CS101: Introduction to Computer Science',
      professor: 'Dr. Smith',
      assignedBy: 'professor',
      progress: 65
    },
    {
      title: 'Advanced Machine Learning',
      professor: 'AI Recommended',
      assignedBy: 'ai',
      progress: 30
    },
    {
      title: 'Web Development Bootcamp',
      professor: 'Prof. Johnson',
      assignedBy: 'professor',
      progress: 80
    },
  ];


  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-8">
      <Container>
        <h1 className="font-serif text-3xl text-ink font-bold mb-6">Study Hub</h1>

        <Tab.Group activeTab={activeTab} onChange={setActiveTab}>
          <Tab.List className="mb-6">
            {tabs.map(tab => (
              <Tab key={tab.id} value={tab.id}>
                {tab.label}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Content value="resources">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {resources.map((resource, idx) => (
                <Card key={idx} className="hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <BookOpen className="text-brand" size={24} />
                    {resource.aiTailored && (
                      <Badge variant="special" size="sm">
                        <Sparkles size={12} />
                        AI-Tailored
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-semibold text-ink mb-1">{resource.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{resource.type}</p>
                  
                  <div className="space-y-2">
                    <ProgressBar value={resource.progress} />
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600">{resource.progress}% complete</span>
                      <Badge size="sm" className={getStatusColor(resource.status)}>
                        {resource.status}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Tab.Content>

          <Tab.Content value="tests">
            <div className="space-y-4">
              {tests.map((test, idx) => (
                <Card key={idx}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <FileText className="text-brand" size={20} />
                        <h3 className="font-semibold text-ink">{test.title}</h3>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Clock size={16} className="text-gray-400" />
                          <span className="text-gray-600">Due: {test.deadline}</span>
                        </div>
                        <div className="text-gray-600">
                          Attempts: {test.attempts}
                        </div>
                        {test.bestScore && (
                          <div className="text-gray-600">
                            Best Score: {test.bestScore}%
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="ml-4">
                      {test.status === 'passed' ? (
                        <Badge variant="success">
                          <CheckCircle size={16} />
                          Passed
                        </Badge>
                      ) : (
                        <Badge variant="warning">
                          <AlertCircle size={16} />
                          Pending
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Tab.Content>

          <Tab.Content value="courses">
            <div className="grid gap-4 md:grid-cols-2">
              {courses.map((course, idx) => (
                <Card key={idx}>
                  <div className="flex justify-between items-start mb-3">
                    <GraduationCap className="text-brand" size={24} />
                    {course.assignedBy === 'ai' && (
                      <Badge variant="special" size="sm">
                        <Sparkles size={12} />
                        AI-Assigned
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-semibold text-ink mb-1">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{course.professor}</p>
                  
                  <div className="space-y-2">
                    <ProgressBar value={course.progress} />
                    <span className="text-xs text-gray-600">{course.progress}% complete</span>
                  </div>
                </Card>
              ))}
            </div>
          </Tab.Content>
        </Tab.Group>
      </Container>
    </div>
  );
};

export default Study;