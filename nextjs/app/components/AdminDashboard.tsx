"use client"

import { useState, useEffect } from 'react';
import { FaSignOutAlt, FaProjectDiagram, FaEnvelope, FaCode, FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
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

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'projects' | 'contacts' | 'skills'>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [newProject, setNewProject] = useState<Partial<Project>>({
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
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isCreatingSkill, setIsCreatingSkill] = useState(false);
  const [newSkill, setNewSkill] = useState<Partial<Skill>>({
    s: []
  });

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
        } else {
          console.error('Failed to fetch projects');
          setProjects([]);
        }
      } else if (activeTab === 'contacts') {
        const response = await fetch(`${API_URL}/api/admin/contacts`);
        if (response.ok) {
          const data = await response.json();
          setContacts(Array.isArray(data) ? data : []);
        } else {
          console.error('Failed to fetch contacts');
          setContacts([]);
        }
      } else if (activeTab === 'skills') {
        const response = await fetch(`${API_URL}/api/admin/skills`);
        if (response.ok) {
          const data = await response.json();
          setSkills(Array.isArray(data) ? data : []);
        } else {
          console.error('Failed to fetch skills');
          setSkills([]);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Set empty arrays on error
      if (activeTab === 'projects') setProjects([]);
      if (activeTab === 'contacts') setContacts([]);
      if (activeTab === 'skills') setSkills([]);
    } finally {
      setLoading(false);
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

  const handleUpdateProject = async (project: Project) => {
    try {
      const response = await fetch(`${API_URL}/api/admin/projects/${project.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      });
      
      if (response.ok) {
        const data = await response.json();
        setProjects(projects.map(p => p.id === project.id ? data.data[0] : p));
        setEditingProject(null);
        toast.success('Project updated successfully!');
      } else {
        toast.error('Failed to update project');
      }
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error('Failed to update project');
    }
  };

  const handleCreateProject = async () => {
    try {
      const response = await fetch(`${API_URL}/api/admin/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject),
      });
      
      if (response.ok) {
        const data = await response.json();
        setProjects([data.data[0], ...projects]);
        setIsCreatingProject(false);
        setNewProject({
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
        toast.success('Project created successfully!');
      } else {
        toast.error('Failed to create project');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Failed to create project');
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
      } else {
        toast.error('Failed to delete contact');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast.error('Failed to delete contact');
    }
  };

  // Skills CRUD operations
  const handleCreateSkill = async () => {
    try {
      const response = await fetch(`${API_URL}/api/admin/skills`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSkill),
      });
      
      if (response.ok) {
        const data = await response.json();
        setSkills([data.data[0], ...skills]);
        setIsCreatingSkill(false);
        setNewSkill({ s: [] });
        toast.success('Skill row created successfully!');
      } else {
        toast.error('Failed to create skill row');
      }
    } catch (error) {
      console.error('Error creating skill:', error);
      toast.error('Failed to create skill row');
    }
  };

  const handleUpdateSkill = async (skill: Skill) => {
    try {
      const response = await fetch(`${API_URL}/api/admin/skills/${skill.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(skill),
      });
      
      if (response.ok) {
        const data = await response.json();
        setSkills(skills.map(s => s.id === skill.id ? data.data[0] : s));
        setEditingSkill(null);
        toast.success('Skill row updated successfully!');
      } else {
        toast.error('Failed to update skill row');
      }
    } catch (error) {
      console.error('Error updating skill:', error);
      toast.error('Failed to update skill row');
    }
  };

  const handleDeleteSkill = async (id: number) => {
    if (!confirm('Are you sure you want to delete this skill row?')) return;
    
    try {
      const response = await fetch(`${API_URL}/api/admin/skills/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setSkills(skills.filter(s => s.id !== id));
        toast.success('Skill row deleted successfully!');
      } else {
        toast.error('Failed to delete skill row');
      }
    } catch (error) {
      console.error('Error deleting skill:', error);
      toast.error('Failed to delete skill row');
    }
  };

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
          success: {
            iconTheme: {
              primary: '#00BFFF',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
      {/* Header */}
      <header className="bg-[#151030] border-b border-[#00BFFF]/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-gray-400 text-sm">Welcome back, Admin</p>
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

      {/* Tabs */}
      <div className="bg-[#151030] border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors ${
                activeTab === 'projects'
                  ? 'border-[#00BFFF] text-[#00BFFF]'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <FaProjectDiagram />
              Projects
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors ${
                activeTab === 'contacts'
                  ? 'border-[#00BFFF] text-[#00BFFF]'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <FaEnvelope />
              Contacts
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors ${
                activeTab === 'skills'
                  ? 'border-[#00BFFF] text-[#00BFFF]'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <FaCode />
              Skills
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center text-white">Loading...</div>
        ) : (
          <>
            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Manage Projects</h2>
                  <button
                    onClick={() => setIsCreatingProject(true)}
                    className="flex items-center gap-2 bg-[#00BFFF] hover:bg-[#0099CC] text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <FaPlus />
                    Add New Project
                  </button>
                </div>

                {/* Create Project Form */}
                {isCreatingProject && (
                  <div className="bg-[#151030] rounded-lg p-6 mb-6 border border-[#00BFFF]/30">
                    <h3 className="text-xl font-bold text-white mb-4">Create New Project</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Project Title"
                        value={newProject.title}
                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                        className="bg-[#1a1443] text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-[#00BFFF] focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Image URL"
                        value={newProject.image}
                        onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                        className="bg-[#1a1443] text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-[#00BFFF] focus:outline-none"
                      />
                      <textarea
                        placeholder="Description 1"
                        value={newProject.p1}
                        onChange={(e) => setNewProject({ ...newProject, p1: e.target.value })}
                        className="bg-[#1a1443] text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-[#00BFFF] focus:outline-none md:col-span-2"
                        rows={2}
                      />
                      <textarea
                        placeholder="Description 2"
                        value={newProject.p2}
                        onChange={(e) => setNewProject({ ...newProject, p2: e.target.value })}
                        className="bg-[#1a1443] text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-[#00BFFF] focus:outline-none md:col-span-2"
                        rows={2}
                      />
                      <input
                        type="text"
                        placeholder="GitHub URL"
                        value={newProject.github}
                        onChange={(e) => setNewProject({ ...newProject, github: e.target.value })}
                        className="bg-[#1a1443] text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-[#00BFFF] focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Live Demo URL"
                        value={newProject.livedemo}
                        onChange={(e) => setNewProject({ ...newProject, livedemo: e.target.value })}
                        className="bg-[#1a1443] text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-[#00BFFF] focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Technologies (comma separated)"
                        value={newProject.Tech?.join(', ')}
                        onChange={(e) => setNewProject({ ...newProject, Tech: e.target.value.split(',').map(t => t.trim()) })}
                        className="bg-[#1a1443] text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-[#00BFFF] focus:outline-none md:col-span-2"
                      />
                    </div>
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={handleCreateProject}
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <FaSave />
                        Create Project
                      </button>
                      <button
                        onClick={() => setIsCreatingProject(false)}
                        className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <FaTimes />
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Projects List */}
                <div className="grid grid-cols-1 gap-6">
                  {projects.map((project) => (
                    <div key={project.id} className="bg-[#151030] rounded-lg p-6 border border-gray-700">
                      {editingProject?.id === project.id ? (
                        <div className="space-y-4">
                          <input
                            type="text"
                            value={editingProject.title}
                            onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                            className="w-full bg-[#1a1443] text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-[#00BFFF] focus:outline-none"
                          />
                          <textarea
                            value={editingProject.p1}
                            onChange={(e) => setEditingProject({ ...editingProject, p1: e.target.value })}
                            className="w-full bg-[#1a1443] text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-[#00BFFF] focus:outline-none"
                            rows={2}
                          />
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleUpdateProject(editingProject)}
                              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                              <FaSave />
                              Save
                            </button>
                            <button
                              onClick={() => setEditingProject(null)}
                              className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                              <FaTimes />
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                              <p className="text-gray-400 text-sm">{project.p1}</p>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setEditingProject(project)}
                                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handleDeleteProject(project.id)}
                                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                          <div className="flex gap-2 flex-wrap">
                            {project.Tech?.map((tech, idx) => (
                              <span key={idx} className="bg-[#00BFFF]/20 text-[#00BFFF] px-3 py-1 rounded-full text-xs">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contacts Tab */}
            {activeTab === 'contacts' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Contact Messages</h2>
                <div className="grid grid-cols-1 gap-4">
                  {contacts.map((contact) => (
                    <div key={contact.id} className="bg-[#151030] rounded-lg p-6 border border-gray-700">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white">{contact.name}</h3>
                          <p className="text-[#00BFFF] text-sm mb-2">{contact.email}</p>
                          <p className="text-gray-400">{contact.message}</p>
                          <p className="text-gray-500 text-xs mt-2">
                            {new Date(contact.created_at).toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteContact(contact.id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills Tab */}
            {activeTab === 'skills' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Manage Skills</h2>
                  <button
                    onClick={() => setIsCreatingSkill(true)}
                    className="flex items-center gap-2 bg-[#00BFFF] hover:bg-[#0096FF] text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <FaPlus />
                    Add New Skill Row
                  </button>
                </div>

                {/* Create New Skill Form */}
                {isCreatingSkill && (
                  <div className="bg-[#151030] rounded-lg p-6 border border-[#00BFFF]/30 mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">Create New Skill Row (Paste JSON Array)</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-400 mb-2">Skills JSON Array</label>
                        <textarea
                          value={JSON.stringify(newSkill.s || [], null, 2)}
                          onChange={(e) => {
                            try {
                              const parsed = JSON.parse(e.target.value);
                              setNewSkill({ ...newSkill, s: parsed });
                            } catch (err) {
                              // Invalid JSON, just update the raw value
                            }
                          }}
                          className="w-full bg-[#1a1443] text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-[#00BFFF] outline-none font-mono text-sm"
                          placeholder='[{"name": "React", "icon": "/icons/react.svg"}]'
                          rows={6}
                        />
                        <p className="text-gray-500 text-xs mt-2">
                          Example: [&#123;"name": "React", "icon": "/icons/react.svg"&#125;, &#123;"name": "Node.js", "icon": "/icons/nodejs.svg"&#125;]
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={handleCreateSkill}
                          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          <FaSave />
                          Create Skill Row
                        </button>
                        <button
                          onClick={() => {
                            setIsCreatingSkill(false);
                            setNewSkill({ s: [] });
                          }}
                          className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          <FaTimes />
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Skills Grid - Display all skills from all rows */}
                <div className="space-y-6">
                  {skills.map((skillRow) => (
                    <div key={skillRow.id} className="bg-[#151030] rounded-lg p-6 border border-gray-700">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-white mb-2">Skill Row ID: {skillRow.id}</h3>
                          <p className="text-gray-500 text-xs">
                            Created: {new Date(skillRow.created_at).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingSkill(skillRow)}
                            className="bg-[#00BFFF] hover:bg-[#0096FF] text-white p-2 rounded-lg transition-colors"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteSkill(skillRow.id)}
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                      
                      {editingSkill?.id === skillRow.id ? (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-gray-400 mb-2">Skills JSON Array</label>
                            <textarea
                              value={JSON.stringify(editingSkill.s, null, 2)}
                              onChange={(e) => {
                                try {
                                  const parsed = JSON.parse(e.target.value);
                                  setEditingSkill({ ...editingSkill, s: parsed });
                                } catch (err) {
                                  // Invalid JSON
                                }
                              }}
                              className="w-full bg-[#1a1443] text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-[#00BFFF] outline-none font-mono text-sm"
                              rows={8}
                            />
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleUpdateSkill(editingSkill)}
                              className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors"
                            >
                              <FaSave />
                            </button>
                            <button
                              onClick={() => setEditingSkill(null)}
                              className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors"
                            >
                              <FaTimes />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                          {Array.isArray(skillRow.s) && skillRow.s.map((skill, idx) => (
                            <div key={idx} className="bg-[#1a1443] p-3 rounded-lg">
                              <p className="text-white font-medium">{skill.name}</p>
                              {skill.icon && (
                                <p className="text-gray-400 text-xs mt-1 truncate">
                                  {skill.icon}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {skills.length === 0 && !isCreatingSkill && (
                  <div className="bg-[#151030] rounded-lg p-6 border border-gray-700 text-center">
                    <p className="text-gray-400">No skills found. Click "Add New Skill Row" to create one.</p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
