"use client"

import { useState, useEffect } from 'react';
import { 
  FaSignOutAlt, 
  FaProjectDiagram, 
  FaEnvelope, 
  FaCode, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaSave, 
  FaTimes, 
  FaEye, 
  FaExternalLinkAlt, 
  FaGithub,
  FaSpinner,
  FaSearch
} from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

interface AdminDashboardProps {
  onLogout: () => void;
}

interface Project {
  id: number;
  title: string;
  p1: string;
  p2: string;
  p3: string;
  p4: string;
  Tech: string[];
  github: string;
  livedemo: string;
  image: string;
  created_at: string;
}

interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

interface Skill {
  id: number;
  name: string;
  icon: string;
}

// Static data - no backend required
const staticProjectsData: Project[] = [
  {
    id: 1,
    created_at: "2025-07-08T10:40:29.654538+00:00",
    title: "Vehicle Rental System",
    p1: "Developed a comprehensive vehicle rental management system in C",
    p2: "Implemented user authentication and booking functionality using file handling",
    p3: "Created efficient data structures and memory management",
    p4: "",
    Tech: ["C", "Data Structures", "File I/O", "Memory Management"],
    github: "https://github.com/Ramjirv32/Vehicle-Rental-System",
    livedemo: "https://github.com/Ramjirv32/Vehicle-Rental-System",
    image: "/assets/grs.webp"
  },
  {
    id: 3,
    created_at: "2023-04-01T00:00:00+00:00",
    title: "Smart Parking System",
    p1: "Led development of a full-stack parking system website",
    p2: "Implemented real-time parking space tracking with IoT",
    p3: "Designed booking and reservation management system",
    p4: "",
    Tech: ["React", "Node.js", "IoT", "PostgreSQL"],
    github: "https://github.com/Ramjirv32/Smart-Parking-System",
    livedemo: "https://parking-orcin-tau.vercel.app/",
    image: "/assets/aadhya.webp"
  },
  {
    id: 4,
    created_at: "2023-09-01T00:00:00+00:00",
    title: "FocusAI Productive Assistant",
    p1: "Trained a custom AI model for behavior classification in collaboration with Navaneethalkrishnan",
    p2: "Captured real-time behavioral data with Node.js and Python backend, stored in MongoDB",
    p3: "Designed interactive dashboards with visual summaries for daily, weekly, and category-wise usage",
    p4: "",
    Tech: ["TSX", "Node.js", "MongoDB", "Machine Learning", "Docker", "FastAPI"],
    github: "#",
    livedemo: "#",
    image: "/personal/focus.webp"
  },
  {
    id: 5,
    created_at: "2023-10-01T00:00:00+00:00",
    title: "NebulX",
    p1: "Building advanced AI features and integrations",
    p2: "Implementing modern UI/UX design principles",
    p3: "Developing scalable backend architecture",
    p4: "",
    Tech: ["React", "AI APIs", "Node.js", "Express", "Tailwind CSS"],
    github: "https://github.com/Ramjirv32/nebulx",
    livedemo: "https://nebulx.vercel.app/",
    image: "/assets/nebulx.webp"
  }
];

const staticSkillsData: Skill[] = [
  { id: 1, name: "JavaScript", icon: "SiJavascript" },
  { id: 2, name: "TypeScript", icon: "SiTypescript" },
  { id: 3, name: "React", icon: "SiReact" },
  { id: 4, name: "Next.js", icon: "SiNextdotjs" },
  { id: 5, name: "Node.js", icon: "SiNodedotjs" },
  { id: 6, name: "Python", icon: "SiPython" },
  { id: 7, name: "Java", icon: "SiJava" },
  { id: 8, name: "C++", icon: "SiCplusplus" },
  { id: 9, name: "C", icon: "SiC" },
  { id: 10, name: "HTML5", icon: "SiHtml5" },
  { id: 11, name: "CSS3", icon: "SiCss3" },
  { id: 12, name: "Tailwind CSS", icon: "SiTailwindcss" },
  { id: 13, name: "Bootstrap", icon: "SiBootstrap" },
  { id: 14, name: "Sass", icon: "SiSass" },
  { id: 15, name: "jQuery", icon: "SiJquery" },
  { id: 16, name: "Vue.js", icon: "SiVuedotjs" },
  { id: 17, name: "Angular", icon: "SiAngular" },
  { id: 18, name: "Express.js", icon: "SiExpress" },
  { id: 19, name: "Django", icon: "SiDjango" },
  { id: 20, name: "Flask", icon: "SiFlask" },
  { id: 21, name: "FastAPI", icon: "SiFastapi" },
  { id: 22, name: "MongoDB", icon: "SiMongodb" },
  { id: 23, name: "PostgreSQL", icon: "SiPostgresql" },
  { id: 24, name: "MySQL", icon: "SiMysql" },
  { id: 25, name: "Redis", icon: "SiRedis" },
  { id: 26, name: "Git", icon: "SiGit" },
  { id: 27, name: "Docker", icon: "SiDocker" },
  { id: 28, name: "Kubernetes", icon: "SiKubernetes" },
  { id: 29, name: "AWS", icon: "SiAmazonaws" },
  { id: 30, name: "Google Cloud", icon: "SiGooglecloud" },
  { id: 31, name: "Firebase", icon: "SiFirebase" },
  { id: 32, name: "Vercel", icon: "SiVercel" },
  { id: 33, name: "Linux", icon: "SiLinux" }
];

// Enhanced Modal Component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-black bg-opacity-75" onClick={onClose}></div>
        
        <div className={`inline-block w-full ${sizeClasses[size]} px-6 py-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-[#151030] border border-gray-600 shadow-xl rounded-2xl`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold leading-6 text-white">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-lg"
            >
              <FaTimes size={20} />
            </button>
          </div>
          
          <div className="max-h-[70vh] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'contacts' | 'skills'>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal states
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Form states
  const [projectForm, setProjectForm] = useState({
    title: '',
    p1: '',
    p2: '',
    p3: '',
    p4: '',
    Tech: [] as string[],
    github: '',
    livedemo: '',
    image: ''
  });
  
  const [skillForm, setSkillForm] = useState({
    name: '',
    icon: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Use static data instead of API calls
      setProjects(staticProjectsData);
      setSkills(staticSkillsData);
      setContacts([]); // No static contacts data provided
      toast.success('Data loaded successfully!');
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  // Project CRUD operations (local state management)
  const handleCreateProject = () => {
    const newProject: Project = {
      id: Math.max(...projects.map(p => p.id), 0) + 1,
      ...projectForm,
      created_at: new Date().toISOString()
    };
    setProjects([...projects, newProject]);
    setProjectForm({
      title: '',
      p1: '',
      p2: '',
      p3: '',
      p4: '',
      Tech: [],
      github: '',
      livedemo: '',
      image: ''
    });
    setIsProjectModalOpen(false);
    toast.success('Project added successfully!');
  };

  const handleUpdateProject = () => {
    if (!selectedItem) return;
    
    const updatedProjects = projects.map(project =>
      project.id === selectedItem.id
        ? { ...project, ...projectForm }
        : project
    );
    setProjects(updatedProjects);
    setIsProjectModalOpen(false);
    setIsEditing(false);
    setSelectedItem(null);
    toast.success('Project updated successfully!');
  };

  const handleDeleteProject = (id: number) => {
    const updatedProjects = projects.filter(project => project.id !== id);
    setProjects(updatedProjects);
    toast.success('Project deleted successfully!');
  };

  // Skill CRUD operations (local state management)
  const handleCreateSkill = () => {
    const newSkill: Skill = {
      id: Math.max(...skills.map(s => s.id), 0) + 1,
      ...skillForm
    };
    setSkills([...skills, newSkill]);
    setSkillForm({ name: '', icon: '' });
    setIsSkillModalOpen(false);
    toast.success('Skill added successfully!');
  };

  const handleUpdateSkill = () => {
    if (!selectedItem) return;
    
    const updatedSkills = skills.map(skill =>
      skill.id === selectedItem.id
        ? { ...skill, ...skillForm }
        : skill
    );
    setSkills(updatedSkills);
    setIsSkillModalOpen(false);
    setIsEditing(false);
    setSelectedItem(null);
    toast.success('Skill updated successfully!');
  };

  const handleDeleteSkill = (id: number) => {
    const updatedSkills = skills.filter(skill => skill.id !== id);
    setSkills(updatedSkills);
    toast.success('Skill deleted successfully!');
  };

  // Modal handlers
  const openProjectModal = (project?: Project) => {
    if (project) {
      setSelectedItem(project);
      setProjectForm({
        title: project.title,
        p1: project.p1,
        p2: project.p2,
        p3: project.p3,
        p4: project.p4,
        Tech: project.Tech,
        github: project.github,
        livedemo: project.livedemo,
        image: project.image
      });
      setIsEditing(true);
    } else {
      setSelectedItem(null);
      setProjectForm({
        title: '',
        p1: '',
        p2: '',
        p3: '',
        p4: '',
        Tech: [],
        github: '',
        livedemo: '',
        image: ''
      });
      setIsEditing(false);
    }
    setIsProjectModalOpen(true);
  };

  const openSkillModal = (skill?: Skill) => {
    if (skill) {
      setSelectedItem(skill);
      setSkillForm({
        name: skill.name,
        icon: skill.icon
      });
      setIsEditing(true);
    } else {
      setSelectedItem(null);
      setSkillForm({ name: '', icon: '' });
      setIsEditing(false);
    }
    setIsSkillModalOpen(true);
  };

  const openViewModal = (item: any) => {
    setSelectedItem(item);
    setIsViewModalOpen(true);
  };

  // Filter functions
  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.Tech.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredSkills = skills.filter(skill =>
    skill.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'projects':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-bold text-white">Projects</h2>
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    className="pl-10 pr-4 py-2 bg-[#1a1a2e] border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <button
                onClick={() => openProjectModal()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
              >
                <FaPlus />
                <span>Add Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div key={project.id} className="bg-[#1a1a2e] border border-gray-600 rounded-lg overflow-hidden hover:border-blue-500 transition-colors">
                  <div className="aspect-video relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/personal/focus.webp';
                      }}
                    />
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <button
                        onClick={() => openViewModal(project)}
                        className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-all"
                      >
                        <FaEye size={14} />
                      </button>
                      <button
                        onClick={() => openProjectModal(project)}
                        className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-all"
                      >
                        <FaEdit size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="p-2 bg-black bg-opacity-50 text-red-400 rounded-full hover:bg-opacity-75 transition-all"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">{project.p1}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.Tech.slice(0, 3).map((tech, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-600 bg-opacity-20 text-blue-400 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                      {project.Tech.length > 3 && (
                        <span className="px-2 py-1 bg-gray-600 bg-opacity-20 text-gray-400 rounded text-xs">
                          +{project.Tech.length - 3} more
                        </span>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      {project.github !== '#' && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <FaGithub size={16} />
                        </a>
                      )}
                      {project.livedemo !== '#' && (
                        <a
                          href={project.livedemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <FaExternalLinkAlt size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'skills':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-bold text-white">Skills</h2>
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search skills..."
                    className="pl-10 pr-4 py-2 bg-[#1a1a2e] border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <button
                onClick={() => openSkillModal()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
              >
                <FaPlus />
                <span>Add Skill</span>
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {filteredSkills.map((skill) => (
                <div key={skill.id} className="bg-[#1a1a2e] border border-gray-600 rounded-lg p-4 hover:border-blue-500 transition-colors group">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 bg-blue-600 bg-opacity-20 rounded-lg flex items-center justify-center">
                      <span className="text-blue-400 text-xl">{skill.icon}</span>
                    </div>
                    <span className="text-white text-sm font-medium text-center">{skill.name}</span>
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => openSkillModal(skill)}
                        className="p-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      >
                        <FaEdit size={12} />
                      </button>
                      <button
                        onClick={() => handleDeleteSkill(skill.id)}
                        className="p-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'contacts':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-bold text-white">Contact Messages</h2>
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    className="pl-10 pr-4 py-2 bg-[#1a1a2e] border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {filteredContacts.length === 0 ? (
              <div className="text-center py-12">
                <FaEnvelope className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-300">No messages</h3>
                <p className="mt-1 text-sm text-gray-500">No contact messages available.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredContacts.map((contact) => (
                  <div key={contact.id} className="bg-[#1a1a2e] border border-gray-600 rounded-lg p-4 hover:border-blue-500 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-lg font-semibold text-white">{contact.name}</h3>
                          <span className="text-sm text-gray-400">{contact.email}</span>
                        </div>
                        <p className="mt-2 text-gray-300 line-clamp-2">{contact.message}</p>
                        <p className="mt-2 text-sm text-gray-500">
                          {new Date(contact.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={() => openViewModal(contact)}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <FaEye size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#1a1a2e',
            color: '#fff',
            border: '1px solid #374151'
          },
        }}
      />
      
      {/* Header */}
      <div className="bg-[#151030] border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <button
              onClick={onLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-[#1a1a2e] border-b border-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('projects')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'projects'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-300 hover:text-white'
              } transition-colors flex items-center space-x-2`}
            >
              <FaProjectDiagram />
              <span>Projects ({projects.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'skills'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-300 hover:text-white'
              } transition-colors flex items-center space-x-2`}
            >
              <FaCode />
              <span>Skills ({skills.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'contacts'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-300 hover:text-white'
              } transition-colors flex items-center space-x-2`}
            >
              <FaEnvelope />
              <span>Messages ({contacts.length})</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <FaSpinner className="animate-spin h-8 w-8 text-blue-500" />
          </div>
        ) : (
          renderTabContent()
        )}
      </div>

      {/* Project Modal */}
      <Modal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        title={isEditing ? 'Edit Project' : 'Add New Project'}
        size="lg"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
            <input
              type="text"
              value={projectForm.title}
              onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
              className="w-full px-3 py-2 bg-[#1a1a2e] border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Project title..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">GitHub URL</label>
              <input
                type="url"
                value={projectForm.github}
                onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })}
                className="w-full px-3 py-2 bg-[#1a1a2e] border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://github.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Live Demo URL</label>
              <input
                type="url"
                value={projectForm.livedemo}
                onChange={(e) => setProjectForm({ ...projectForm, livedemo: e.target.value })}
                className="w-full px-3 py-2 bg-[#1a1a2e] border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
            <input
              type="url"
              value={projectForm.image}
              onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
              className="w-full px-3 py-2 bg-[#1a1a2e] border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="/path/to/image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description 1</label>
            <textarea
              value={projectForm.p1}
              onChange={(e) => setProjectForm({ ...projectForm, p1: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 bg-[#1a1a2e] border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="First description..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description 2</label>
            <textarea
              value={projectForm.p2}
              onChange={(e) => setProjectForm({ ...projectForm, p2: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 bg-[#1a1a2e] border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Second description..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description 3</label>
            <textarea
              value={projectForm.p3}
              onChange={(e) => setProjectForm({ ...projectForm, p3: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 bg-[#1a1a2e] border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Third description..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description 4 (Optional)</label>
            <textarea
              value={projectForm.p4}
              onChange={(e) => setProjectForm({ ...projectForm, p4: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 bg-[#1a1a2e] border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Fourth description (optional)..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Technologies (comma-separated)</label>
            <input
              type="text"
              value={projectForm.Tech.join(', ')}
              onChange={(e) => setProjectForm({ 
                ...projectForm, 
                Tech: e.target.value.split(',').map(tech => tech.trim()).filter(tech => tech !== '')
              })}
              className="w-full px-3 py-2 bg-[#1a1a2e] border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="React, Node.js, MongoDB, etc..."
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-600">
            <button
              onClick={() => setIsProjectModalOpen(false)}
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={isEditing ? handleUpdateProject : handleCreateProject}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              <FaSave />
              <span>{isEditing ? 'Update' : 'Create'}</span>
            </button>
          </div>
        </div>
      </Modal>

      {/* Skill Modal */}
      <Modal
        isOpen={isSkillModalOpen}
        onClose={() => setIsSkillModalOpen(false)}
        title={isEditing ? 'Edit Skill' : 'Add New Skill'}
        size="md"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Skill Name</label>
            <input
              type="text"
              value={skillForm.name}
              onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
              className="w-full px-3 py-2 bg-[#1a1a2e] border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., React, Python, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Icon (Simple Icons)</label>
            <input
              type="text"
              value={skillForm.icon}
              onChange={(e) => setSkillForm({ ...skillForm, icon: e.target.value })}
              className="w-full px-3 py-2 bg-[#1a1a2e] border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., SiReact, SiPython, etc."
            />
            <p className="text-sm text-gray-500 mt-1">
              Use Simple Icons naming convention (Si + PascalCase). Examples: SiReact, SiJavascript, SiPython
            </p>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-600">
            <button
              onClick={() => setIsSkillModalOpen(false)}
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={isEditing ? handleUpdateSkill : handleCreateSkill}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              <FaSave />
              <span>{isEditing ? 'Update' : 'Create'}</span>
            </button>
          </div>
        </div>
      </Modal>

      {/* View Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title={selectedItem?.title || selectedItem?.name || 'View Details'}
        size="lg"
      >
        {selectedItem && (
          <div className="space-y-4">
            {/* Project View */}
            {selectedItem.Tech && (
              <div className="space-y-4">
                <div className="aspect-video relative rounded-lg overflow-hidden">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/personal/focus.webp';
                    }}
                  />
                </div>
                <div className="space-y-3">
                  <p className="text-gray-300">{selectedItem.p1}</p>
                  <p className="text-gray-300">{selectedItem.p2}</p>
                  <p className="text-gray-300">{selectedItem.p3}</p>
                  {selectedItem.p4 && <p className="text-gray-300">{selectedItem.p4}</p>}
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.Tech.map((tech: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 bg-blue-600 bg-opacity-20 text-blue-400 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-4 pt-4">
                  {selectedItem.github !== '#' && (
                    <a
                      href={selectedItem.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <FaGithub />
                      <span>View Code</span>
                    </a>
                  )}
                  {selectedItem.livedemo !== '#' && (
                    <a
                      href={selectedItem.livedemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <FaExternalLinkAlt />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Contact View */}
            {selectedItem.email && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-white font-medium mb-1">Name:</h4>
                    <p className="text-gray-300">{selectedItem.name}</p>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Email:</h4>
                    <p className="text-gray-300">{selectedItem.email}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Message:</h4>
                  <p className="text-gray-300 whitespace-pre-wrap">{selectedItem.message}</p>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Received:</h4>
                  <p className="text-gray-300">{new Date(selectedItem.created_at).toLocaleString()}</p>
                </div>
              </div>
            )}

            {/* Skill View */}
            {selectedItem.icon && !selectedItem.email && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-600 bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-400 text-3xl">{selectedItem.icon}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">{selectedItem.name}</h3>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminDashboard;