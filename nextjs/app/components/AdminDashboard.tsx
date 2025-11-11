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

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000';

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
  s: Array<{
    name: string;
    icon?: string;
  }>;
  created_at: string;
}

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

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-12">
    <FaSpinner className="animate-spin text-4xl text-[#00BFFF]" />
    <span className="ml-3 text-white text-lg">Loading...</span>
  </div>
);

// Empty State Component
const EmptyState = ({ icon: Icon, title, description, actionText, onAction }: {
  icon: any;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}) => (
  <div className="text-center py-12">
    <Icon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
    <h3 className="text-xl font-medium text-white mb-2">{title}</h3>
    <p className="text-gray-400 mb-6">{description}</p>
    {actionText && onAction && (
      <button
        onClick={onAction}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-[#00BFFF] hover:bg-[#0096FF] transition-colors"
      >
        <FaPlus className="mr-2" />
        {actionText}
      </button>
    )}
  </div>
);

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'projects' | 'contacts' | 'skills'>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal states
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [viewingContact, setViewingContact] = useState<Contact | null>(null);
  
  // Form states
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    title: '',
    p1: '',
    p2: '',
    p3: '',
    p4: '',
    Tech: [],
    github: '',
    livedemo: '',
    image: '/assets/default-project.webp'
  });
  
  const [skillsArray, setSkillsArray] = useState<Array<{name: string, icon: string}>>([
    { name: '', icon: '' }
  ]);

  const [skillJsonInput, setSkillJsonInput] = useState('');

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'projects') {
        const response = await fetch(`${API_URL}/api/admin/projects`);
        if (response.ok) {
          const data = await response.json();
          setProjects(Array.isArray(data) ? data : []);
        }
      } else if (activeTab === 'contacts') {
        const response = await fetch(`${API_URL}/api/admin/contacts`);
        if (response.ok) {
          const data = await response.json();
          setContacts(Array.isArray(data) ? data : []);
        }
      } else if (activeTab === 'skills') {
        const response = await fetch(`${API_URL}/api/admin/skills`);
        if (response.ok) {
          const data = await response.json();
          setSkills(Array.isArray(data) ? data : []);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const resetForms = () => {
    setProjectForm({
      title: '',
      p1: '',
      p2: '',
      p3: '',
      p4: '',
      Tech: [],
      github: '',
      livedemo: '',
      image: '/assets/default-project.webp'
    });
    setSkillsArray([{ name: '', icon: '' }]);
    setSkillJsonInput('');
    setEditingProject(null);
    setEditingSkill(null);
    setViewingContact(null);
  };

  const openProjectModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setProjectForm(project);
    } else {
      resetForms();
    }
    setShowProjectModal(true);
  };

  const openSkillModal = (skill?: Skill) => {
    if (skill) {
      setEditingSkill(skill);
      setSkillsArray(skill.s.map(s => ({ name: s.name, icon: s.icon || '' })));
      setSkillJsonInput(JSON.stringify(skill.s, null, 2));
    } else {
      resetForms();
    }
    setShowSkillModal(true);
  };

  const openContactModal = (contact: Contact) => {
    setViewingContact(contact);
    setShowContactModal(true);
  };

  const closeModals = () => {
    setShowProjectModal(false);
    setShowSkillModal(false);
    setShowContactModal(false);
    resetForms();
  };

  // Project CRUD operations
  const handleSaveProject = async () => {
    try {
      const isEditing = editingProject !== null;
      const url = isEditing 
        ? `${API_URL}/api/admin/projects/${editingProject.id}`
        : `${API_URL}/api/admin/projects`;
      
      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectForm),
      });
      
      if (response.ok) {
        const data = await response.json();
        if (isEditing) {
          setProjects(projects.map(p => p.id === editingProject.id ? data.data[0] : p));
          toast.success('Project updated successfully!');
        } else {
          setProjects([data.data[0], ...projects]);
          toast.success('Project created successfully!');
        }
        closeModals();
        fetchData(); // Refresh data
      } else {
        toast.error('Failed to save project');
      }
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('Failed to save project');
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
      const response = await fetch(`${API_URL}/api/admin/projects/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setProjects(projects.filter(p => p.id !== id));
        toast.success('Project deleted successfully!');
      } else {
        toast.error('Failed to delete project');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    }
  };

  const handleDeleteContact = async (id: number) => {
    if (!confirm('Are you sure you want to delete this contact?')) return;
    
    try {
      const response = await fetch(`${API_URL}/api/admin/contacts/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setContacts(contacts.filter(c => c.id !== id));
        toast.success('Contact deleted successfully!');
        closeModals();
      } else {
        toast.error('Failed to delete contact');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast.error('Failed to delete contact');
    }
  };

  // Skills CRUD operations
  const handleSaveSkill = async () => {
    try {
      let skillData;
      
      if (skillJsonInput.trim()) {
        // Use JSON input
        try {
          skillData = { s: JSON.parse(skillJsonInput) };
        } catch (e) {
          toast.error('Invalid JSON format');
          return;
        }
      } else {
        // Use individual skills array
        skillData = { 
          s: skillsArray.filter(skill => skill.name.trim() !== '')
        };
      }

      const isEditing = editingSkill !== null;
      const url = isEditing 
        ? `${API_URL}/api/admin/skills/${editingSkill.id}`
        : `${API_URL}/api/admin/skills`;
      
      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skillData),
      });
      
      if (response.ok) {
        const data = await response.json();
        if (isEditing) {
          setSkills(skills.map(s => s.id === editingSkill.id ? data.data[0] : s));
          toast.success('Skills updated successfully!');
        } else {
          setSkills([data.data[0], ...skills]);
          toast.success('Skills created successfully!');
        }
        closeModals();
        fetchData(); // Refresh data
      } else {
        toast.error('Failed to save skills');
      }
    } catch (error) {
      console.error('Error saving skills:', error);
      toast.error('Failed to save skills');
    }
  };

  const handleDeleteSkill = async (id: number) => {
    if (!confirm('Are you sure you want to delete this skill set?')) return;
    
    try {
      const response = await fetch(`${API_URL}/api/admin/skills/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setSkills(skills.filter(s => s.id !== id));
        toast.success('Skills deleted successfully!');
      } else {
        toast.error('Failed to delete skills');
      }
    } catch (error) {
      console.error('Error deleting skills:', error);
      toast.error('Failed to delete skills');
    }
  };

  const addSkillRow = () => {
    setSkillsArray([...skillsArray, { name: '', icon: '' }]);
  };

  const removeSkillRow = (index: number) => {
    setSkillsArray(skillsArray.filter((_, i) => i !== index));
  };

  const updateSkillRow = (index: number, field: 'name' | 'icon', value: string) => {
    const updated = [...skillsArray];
    updated[index][field] = value;
    setSkillsArray(updated);
  };

  // Filter functions
  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.p1.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.Tech.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050816]">
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#151030',
            color: '#fff',
            border: '1px solid #00BFFF',
          },
        }}
      />

      {/* Header */}
      <header className="bg-[#151030] border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-gray-400 text-sm">Manage your portfolio content</p>
            </div>
            
            <button
              onClick={onLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-[#151030] border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { key: 'projects', label: 'Projects', icon: FaProjectDiagram },
              { key: 'contacts', label: 'Contacts', icon: FaEnvelope },
              { key: 'skills', label: 'Skills', icon: FaCode },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`flex items-center gap-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === key
                    ? 'border-[#00BFFF] text-[#00BFFF]'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Icon />
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#151030] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#00BFFF] focus:outline-none"
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            {activeTab === 'projects' && (
              <button
                onClick={() => openProjectModal()}
                className="flex items-center gap-2 bg-[#00BFFF] hover:bg-[#0096FF] text-white px-4 py-2 rounded-lg transition-colors"
              >
                <FaPlus />
                Add Project
              </button>
            )}
            
            {activeTab === 'skills' && (
              <button
                onClick={() => openSkillModal()}
                className="flex items-center gap-2 bg-[#00BFFF] hover:bg-[#0096FF] text-white px-4 py-2 rounded-lg transition-colors"
              >
                <FaPlus />
                Add Skills
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                {filteredProjects.length === 0 ? (
                  <EmptyState
                    icon={FaProjectDiagram}
                    title="No projects found"
                    description="Start building your portfolio by adding your first project"
                    actionText="Add Project"
                    onAction={() => openProjectModal()}
                  />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                      <div
                        key={project.id}
                        className="bg-[#151030] rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors group"
                      >
                        <div className="aspect-video bg-gray-800 rounded-lg mb-4 overflow-hidden">
                          {project.image ? (
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500">
                              <FaProjectDiagram size={48} />
                            </div>
                          )}
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00BFFF] transition-colors">
                          {project.title}
                        </h3>
                        
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                          {project.p1}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.Tech?.slice(0, 3).map((tech, idx) => (
                            <span
                              key={idx}
                              className="bg-[#00BFFF]/20 text-[#00BFFF] px-2 py-1 rounded-full text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.Tech?.length > 3 && (
                            <span className="text-gray-400 text-xs px-2 py-1">
                              +{project.Tech.length - 3} more
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                            >
                              <FaGithub className="text-white" />
                            </a>
                          )}
                          
                          {project.livedemo && (
                            <a
                              href={project.livedemo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                            >
                              <FaExternalLinkAlt className="text-white" />
                            </a>
                          )}
                          
                          <div className="ml-auto flex gap-2">
                            <button
                              onClick={() => openProjectModal(project)}
                              className="p-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
                            >
                              <FaEdit className="text-white" />
                            </button>
                            
                            <button
                              onClick={() => handleDeleteProject(project.id)}
                              className="p-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                            >
                              <FaTrash className="text-white" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Contacts Tab */}
            {activeTab === 'contacts' && (
              <div className="space-y-6">
                {filteredContacts.length === 0 ? (
                  <EmptyState
                    icon={FaEnvelope}
                    title="No contact messages"
                    description="Contact messages from your portfolio will appear here"
                  />
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredContacts.map((contact) => (
                      <div
                        key={contact.id}
                        className="bg-[#151030] rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors cursor-pointer"
                        onClick={() => openContactModal(contact)}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-bold text-white">{contact.name}</h3>
                            <p className="text-[#00BFFF] text-sm">{contact.email}</p>
                            <p className="text-gray-500 text-xs">
                              {new Date(contact.created_at).toLocaleString()}
                            </p>
                          </div>
                          
                          <div className="flex gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openContactModal(contact);
                              }}
                              className="p-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
                            >
                              <FaEye className="text-white" />
                            </button>
                            
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteContact(contact.id);
                              }}
                              className="p-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                            >
                              <FaTrash className="text-white" />
                            </button>
                          </div>
                        </div>
                        
                        <p className="text-gray-400 text-sm line-clamp-3">
                          {contact.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Skills Tab */}
            {activeTab === 'skills' && (
              <div className="space-y-6">
                {skills.length === 0 ? (
                  <EmptyState
                    icon={FaCode}
                    title="No skills found"
                    description="Add your technical skills to showcase your expertise"
                    actionText="Add Skills"
                    onAction={() => openSkillModal()}
                  />
                ) : (
                  <div className="space-y-6">
                    {skills.map((skillSet) => (
                      <div
                        key={skillSet.id}
                        className="bg-[#151030] rounded-xl p-6 border border-gray-700"
                      >
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <h3 className="text-lg font-bold text-white">
                              Skill Set #{skillSet.id}
                            </h3>
                            <p className="text-gray-500 text-sm">
                              {skillSet.s.length} skills • Created {new Date(skillSet.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          
                          <div className="flex gap-2">
                            <button
                              onClick={() => openSkillModal(skillSet)}
                              className="p-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
                            >
                              <FaEdit className="text-white" />
                            </button>
                            
                            <button
                              onClick={() => handleDeleteSkill(skillSet.id)}
                              className="p-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                            >
                              <FaTrash className="text-white" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                          {skillSet.s.map((skill, idx) => (
                            <div
                              key={idx}
                              className="bg-[#1a1443] p-3 rounded-lg text-center hover:bg-[#221b5e] transition-colors"
                            >
                              {skill.icon && (
                                <div className="w-8 h-8 mx-auto mb-2 bg-gray-700 rounded flex items-center justify-center">
                                  <span className="text-xs">🔧</span>
                                </div>
                              )}
                              <p className="text-white font-medium text-sm">{skill.name}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>

      {/* Project Modal */}
      <Modal
        isOpen={showProjectModal}
        onClose={closeModals}
        title={editingProject ? 'Edit Project' : 'Create New Project'}
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Project Title *
              </label>
              <input
                type="text"
                value={projectForm.title}
                onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                className="w-full px-4 py-2 bg-[#1a1443] border border-gray-600 rounded-lg text-white focus:border-[#00BFFF] focus:outline-none"
                placeholder="Enter project title"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Image URL
              </label>
              <input
                type="text"
                value={projectForm.image}
                onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                className="w-full px-4 py-2 bg-[#1a1443] border border-gray-600 rounded-lg text-white focus:border-[#00BFFF] focus:outline-none"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Description 1 *
            </label>
            <textarea
              value={projectForm.p1}
              onChange={(e) => setProjectForm({ ...projectForm, p1: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 bg-[#1a1443] border border-gray-600 rounded-lg text-white focus:border-[#00BFFF] focus:outline-none"
              placeholder="Brief project description"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Description 2
            </label>
            <textarea
              value={projectForm.p2}
              onChange={(e) => setProjectForm({ ...projectForm, p2: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 bg-[#1a1443] border border-gray-600 rounded-lg text-white focus:border-[#00BFFF] focus:outline-none"
              placeholder="Additional details"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                GitHub URL
              </label>
              <input
                type="text"
                value={projectForm.github}
                onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })}
                className="w-full px-4 py-2 bg-[#1a1443] border border-gray-600 rounded-lg text-white focus:border-[#00BFFF] focus:outline-none"
                placeholder="https://github.com/username/repo"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Live Demo URL
              </label>
              <input
                type="text"
                value={projectForm.livedemo}
                onChange={(e) => setProjectForm({ ...projectForm, livedemo: e.target.value })}
                className="w-full px-4 py-2 bg-[#1a1443] border border-gray-600 rounded-lg text-white focus:border-[#00BFFF] focus:outline-none"
                placeholder="https://yourproject.com"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Technologies
            </label>
            <input
              type="text"
              value={projectForm.Tech?.join(', ')}
              onChange={(e) => setProjectForm({ ...projectForm, Tech: e.target.value.split(',').map(t => t.trim()).filter(t => t) })}
              className="w-full px-4 py-2 bg-[#1a1443] border border-gray-600 rounded-lg text-white focus:border-[#00BFFF] focus:outline-none"
              placeholder="React, Node.js, MongoDB, etc. (comma separated)"
            />
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={closeModals}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProject}
              className="px-4 py-2 bg-[#00BFFF] hover:bg-[#0096FF] text-white rounded-lg transition-colors"
            >
              {editingProject ? 'Update Project' : 'Create Project'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Contact Detail Modal */}
      <Modal
        isOpen={showContactModal}
        onClose={closeModals}
        title="Contact Details"
        size="md"
      >
        {viewingContact && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Name</label>
                <p className="text-white bg-[#1a1443] px-4 py-2 rounded-lg">{viewingContact.name}</p>
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
                <p className="text-[#00BFFF] bg-[#1a1443] px-4 py-2 rounded-lg">{viewingContact.email}</p>
              </div>
            </div>
            
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Date</label>
              <p className="text-gray-400 bg-[#1a1443] px-4 py-2 rounded-lg">
                {new Date(viewingContact.created_at).toLocaleString()}
              </p>
            </div>
            
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Message</label>
              <div className="bg-[#1a1443] px-4 py-4 rounded-lg">
                <p className="text-white whitespace-pre-wrap">{viewingContact.message}</p>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => handleDeleteContact(viewingContact.id)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                Delete Contact
              </button>
              <button
                onClick={closeModals}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Skills Modal */}
      <Modal
        isOpen={showSkillModal}
        onClose={closeModals}
        title={editingSkill ? 'Edit Skills' : 'Create Skills'}
        size="lg"
      >
        <div className="space-y-6">
          <div className="bg-yellow-900/20 border border-yellow-600 rounded-lg p-4">
            <p className="text-yellow-300 text-sm">
              You can either use the individual skill editor below or paste a JSON array in the text area.
            </p>
          </div>
          
          {/* Individual Skills Editor */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-medium text-white">Individual Skills</h4>
              <button
                onClick={addSkillRow}
                className="flex items-center gap-2 px-3 py-1 bg-[#00BFFF] hover:bg-[#0096FF] text-white rounded-lg transition-colors text-sm"
              >
                <FaPlus />
                Add Skill
              </button>
            </div>
            
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {skillsArray.map((skill, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => updateSkillRow(index, 'name', e.target.value)}
                    placeholder="Skill name (e.g., React)"
                    className="flex-1 px-3 py-2 bg-[#1a1443] border border-gray-600 rounded-lg text-white focus:border-[#00BFFF] focus:outline-none"
                  />
                  <input
                    type="text"
                    value={skill.icon}
                    onChange={(e) => updateSkillRow(index, 'icon', e.target.value)}
                    placeholder="Icon URL (optional)"
                    className="flex-1 px-3 py-2 bg-[#1a1443] border border-gray-600 rounded-lg text-white focus:border-[#00BFFF] focus:outline-none"
                  />
                  <button
                    onClick={() => removeSkillRow(index)}
                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border-t border-gray-600 pt-6">
            <h4 className="text-lg font-medium text-white mb-4">Or use JSON Format</h4>
            <textarea
              value={skillJsonInput}
              onChange={(e) => setSkillJsonInput(e.target.value)}
              rows={8}
              className="w-full px-4 py-3 bg-[#1a1443] border border-gray-600 rounded-lg text-white font-mono text-sm focus:border-[#00BFFF] focus:outline-none"
              placeholder={`[
  {"name": "React", "icon": "/icons/react.svg"},
  {"name": "Node.js", "icon": "/icons/nodejs.svg"},
  {"name": "TypeScript", "icon": "/icons/typescript.svg"}
]`}
            />
            <p className="text-gray-400 text-xs mt-2">
              Enter skills as a JSON array. Each skill should have a "name" field and optionally an "icon" field.
            </p>
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={closeModals}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveSkill}
              className="px-4 py-2 bg-[#00BFFF] hover:bg-[#0096FF] text-white rounded-lg transition-colors"
            >
              {editingSkill ? 'Update Skills' : 'Create Skills'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}