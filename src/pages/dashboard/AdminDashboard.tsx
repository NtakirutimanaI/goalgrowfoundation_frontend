import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { 
  LogOut, Plus, Moon, Sun, Bell, Search, Users, Trophy, Award, 
  Settings, ChevronRight, LayoutDashboard, X, Save, Eye, EyeOff,
  ChevronLeft, ChevronRight as ChevronRightIcon, User, Camera, Mail, Phone, MapPin,
  Download, Filter, Calendar, UserPlus, FileSpreadsheet, Link as LinkIcon, Share2, Clipboard, Trash2,
  Globe, Shield, Bell as BellIcon, CreditCard, Lock, Key, CheckCircle, AlertTriangle, Info, MessageSquare,
  Zap, Receipt, Clock, ExternalLink, FileText, Image as ImageIcon, Layout, Type, AlignLeft
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

const CMS_SCHEMA: Record<string, any[]> = {
  home: [
    { section: 'header', key: 'edition', label: 'Edition Label', type: 'text' },
    { section: 'header', key: 'site_name', label: 'Site Name', type: 'text' },
    { section: 'header', key: 'location', label: 'Location Label', type: 'text' },
    { section: 'hero', key: 'badge', label: 'Hero Badge', type: 'text' },
    { section: 'hero', key: 'title_line1', label: 'Hero Line 1', type: 'text' },
    { section: 'hero', key: 'title_line2', label: 'Hero Line 2', type: 'text' },
    { section: 'hero', key: 'title_highlight', label: 'Hero Highlight', type: 'text' },
    { section: 'hero', key: 'slide1', label: 'Hero Slide 1', type: 'image' },
    { section: 'hero', key: 'slide2', label: 'Hero Slide 2', type: 'image' },
    { section: 'hero', key: 'slide3', label: 'Hero Slide 3', type: 'image' },
    { section: 'trending', key: 'title', label: 'Trending Title', type: 'text' },
    { section: 'trending', key: 'subtitle', label: 'Trending Sub', type: 'text' },
    { section: 'trending', key: 'img1', label: 'Trending Img 1', type: 'image' },
    { section: 'trending', key: 'img2', label: 'Trending Img 2', type: 'image' },
    { section: 'trending', key: 'img3', label: 'Trending Img 3', type: 'image' },
    { section: 'welcome', key: 'badge', label: 'Welcome Badge', type: 'text' },
    { section: 'welcome', key: 'title', label: 'Welcome Title', type: 'text' },
    { section: 'welcome', key: 'desc', label: 'Welcome Desc', type: 'textarea' },
    { section: 'stats', key: 's1_label', label: 'Stat 1 Label', type: 'text' },
    { section: 'stats', key: 's1_desc', label: 'Stat 1 Desc', type: 'textarea' },
    { section: 'stats', key: 's2_label', label: 'Stat 2 Label', type: 'text' },
    { section: 'stats', key: 's2_desc', label: 'Stat 2 Desc', type: 'textarea' },
    { section: 'founders', key: 'title', label: 'Founders Title', type: 'text' },
    { section: 'founders', key: 'subtitle', label: 'Founders Sub', type: 'text' },
    { section: 'founders', key: 'quote', label: 'Founders Quote', type: 'textarea' },
    { section: 'profiles', key: 'title', label: 'Profiles Title', type: 'text' },
    { section: 'profiles', key: 'p1_name', label: 'Player 1 Name', type: 'text' },
    { section: 'profiles', key: 'p1_tag', label: 'Player 1 Tag', type: 'text' },
    { section: 'profiles', key: 'p1_role', label: 'Player 1 Role', type: 'text' },
    { section: 'profiles', key: 'p1_img', label: 'Player 1 Img', type: 'image' },
    { section: 'news', key: 'title', label: 'News Title', type: 'text' },
    { section: 'news', key: 'btn', label: 'News Btn', type: 'text' },
    { section: 'news', key: 'item1_title', label: 'News 1 Title', type: 'text' },
    { section: 'news', key: 'item1_tag', label: 'News 1 Tag', type: 'text' },
    { section: 'news', key: 'item1_desc', label: 'News 1 Desc', type: 'textarea' },
    { section: 'news', key: 'item1_img', label: 'News 1 Img', type: 'image' },
    { section: 'voices', key: 'title', label: 'Voices Title', type: 'text' },
    { section: 'voices', key: 't1_name', label: 'Testim 1 Name', type: 'text' },
    { section: 'voices', key: 't1_quote', label: 'Testim 1 Quote', type: 'textarea' },
    { section: 'voices', key: 't1_role', label: 'Testim 1 Role', type: 'text' },
    { section: 'voices', key: 't1_img', label: 'Testim 1 Img', type: 'image' },
    { section: 'events', key: 'title', label: 'Events Title', type: 'text' },
    { section: 'events', key: 'btn', label: 'Events Btn', type: 'text' },
    { section: 'events', key: 'e1_date', label: 'Event 1 Date', type: 'text' },
    { section: 'events', key: 'e1_title', label: 'Event 1 Title', type: 'text' },
    { section: 'events', key: 'e1_loc', label: 'Event 1 Loc', type: 'text' },
    { section: 'events', key: 'e1_tag', label: 'Event 1 Tag', type: 'text' },
    { section: 'impact', key: 'c1_val', label: 'Impact 1 Val', type: 'text' },
    { section: 'impact', key: 'c1_label', label: 'Impact 1 Label', type: 'text' },
    { section: 'impact', key: 'c2_val', label: 'Impact 2 Val', type: 'text' },
    { section: 'impact', key: 'c2_label', label: 'Impact 2 Label', type: 'text' },
    { section: 'impact', key: 'c3_val', label: 'Impact 3 Val', type: 'text' },
    { section: 'impact', key: 'c3_label', label: 'Impact 3 Label', type: 'text' },
    { section: 'drill', key: 'badge', label: 'Drill Badge', type: 'text' },
    { section: 'drill', key: 'title', label: 'Drill Title', type: 'text' },
    { section: 'drill', key: 'subtitle', label: 'Drill Sub', type: 'text' },
    { section: 'drill', key: 'desc', label: 'Drill Desc', type: 'textarea' },
    { section: 'drill', key: 'btn', label: 'Drill Btn', type: 'text' },
    { section: 'drill', key: 'img', label: 'Drill Img', type: 'image' },
    { section: 'pillars', key: 'badge', label: 'Pillars Badge', type: 'text' },
    { section: 'pillars', key: 'title', label: 'Pillars Title', type: 'text' },
    { section: 'pillars', key: 'f1_title', label: 'Feat 1 Title', type: 'text' },
    { section: 'pillars', key: 'f1_desc', label: 'Feat 1 Desc', type: 'textarea' },
    { section: 'subscription', key: 'title', label: 'Sub Title', type: 'text' },
    { section: 'subscription', key: 'desc', label: 'Sub Desc', type: 'textarea' },
    { section: 'subscription', key: 'btn', label: 'Sub Btn', type: 'text' },
  ],
  story: [
    { section: 'header', key: 'title', label: 'Header Title', type: 'text' },
    { section: 'header', key: 'subtitle', label: 'Header Subtitle', type: 'text' },
    { section: 'chapter1', key: 'badge', label: 'C1 Badge', type: 'text' },
    { section: 'chapter1', key: 'title', label: 'C1 Title', type: 'text' },
    { section: 'chapter1', key: 'desc1', label: 'C1 Desc 1', type: 'textarea' },
    { section: 'chapter1', key: 'desc2', label: 'C1 Desc 2', type: 'textarea' },
    { section: 'chapter2', key: 'badge', label: 'C2 Badge', type: 'text' },
    { section: 'chapter2', key: 'title', label: 'C2 Title', type: 'text' },
    { section: 'chapter2', key: 'desc1', label: 'C2 Desc 1', type: 'textarea' },
    { section: 'chapter2', key: 'desc2', label: 'C2 Desc 2', type: 'textarea' },
    { section: 'timeline', key: 'item1_title', label: 'TL 1 Title', type: 'text' },
    { section: 'timeline', key: 'item1_desc', label: 'TL 1 Desc', type: 'textarea' },
    { section: 'philosophy', key: 'pillar1_title', label: 'Pillar 1 Title', type: 'text' },
    { section: 'philosophy', key: 'pillar1_desc', label: 'Pillar 1 Desc', type: 'textarea' },
  ],
  mission: [
    { section: 'header', key: 'title', label: 'Header Title', type: 'text' },
    { section: 'header', key: 'subtitle', label: 'Header Subtitle', type: 'text' },
    { section: 'mission', key: 'title_start', label: 'Mission Start', type: 'text' },
    { section: 'mission', key: 'title_highlight', label: 'Mission Highlight', type: 'text' },
    { section: 'mission', key: 'title_end', label: 'Mission End', type: 'text' },
    { section: 'mission', key: 'desc', label: 'Mission Desc', type: 'textarea' },
    { section: 'pillars', key: 'pillar1_title', label: 'Pillar 1 Title', type: 'text' },
    { section: 'pillars', key: 'pillar1_desc', label: 'Pillar 1 Desc', type: 'textarea' },
    { section: 'pillars', key: 'pillar2_title', label: 'Pillar 2 Title', type: 'text' },
    { section: 'pillars', key: 'pillar2_desc', label: 'Pillar 2 Desc', type: 'textarea' },
    { section: 'vision', key: 'badge', label: 'Vision Badge', type: 'text' },
    { section: 'vision', key: 'title_line1', label: 'Vision Line 1', type: 'text' },
    { section: 'vision', key: 'title_line2', label: 'Vision Line 2', type: 'text' },
    { section: 'vision', key: 'goal1', label: 'Goal 1', type: 'text' },
    { section: 'vision', key: 'goal2', label: 'Goal 2', type: 'text' },
    { section: 'cta', key: 'title', label: 'CTA Title', type: 'text' },
    { section: 'cta', key: 'btn1', label: 'Btn 1', type: 'text' },
  ],
  team: [
    { section: 'header', key: 'title', label: 'Header Title', type: 'text' },
    { section: 'header', key: 'subtitle', label: 'Header Subtitle', type: 'text' },
    { 
      section: 'group1', 
      label: 'Executive Leadership', 
      type: 'collection', 
      itemLabel: 'Member',
      count: 3, 
      prefix: 'm',
      fields: [
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'role', label: 'Role', type: 'text' },
        { key: 'img', label: 'Profile Image', type: 'image' },
        { key: 'bio', label: 'Bio Snippet', type: 'textarea' },
        { key: 'linkedin', label: 'LinkedIn URL', type: 'text' },
        { key: 'twitter', label: 'Twitter URL', type: 'text' },
        { key: 'bio_link', label: 'Full Bio URL', type: 'text' },
      ]
    },
    { 
      section: 'group2', 
      label: 'Technical & Coaching', 
      type: 'collection', 
      itemLabel: 'Staff',
      count: 3, 
      prefix: 'm',
      fields: [
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'role', label: 'Role', type: 'text' },
        { key: 'img', label: 'Profile Image', type: 'image' },
        { key: 'bio', label: 'Bio Snippet', type: 'textarea' },
      ]
    },
  ],
  partners: [
    { section: 'header', key: 'title', label: 'Header Title', type: 'text' },
    { section: 'header', key: 'subtitle', label: 'Header Subtitle', type: 'text' },
    { section: 'tier1', key: 'title', label: 'Tier 1 Title', type: 'text' },
    { section: 'tier1', key: 'p1_name', label: 'P1 Name', type: 'text' },
    { section: 'tier1', key: 'p1_role', label: 'P1 Role', type: 'text' },
  ],
  coaching: [
    { section: 'header', key: 'title', label: 'Header Title', type: 'text' },
    { section: 'header', key: 'subtitle', label: 'Header Subtitle', type: 'text' },
    { section: 'methodology', key: 'badge', label: 'Methodology Badge', type: 'text' },
    { section: 'methodology', key: 'title_line1', label: 'Methodology Line 1', type: 'text' },
    { section: 'methodology', key: 'title_line2', label: 'Methodology Line 2', type: 'text' },
    { section: 'methodology', key: 'desc1', label: 'Desc Block 1', type: 'textarea' },
    { section: 'methodology', key: 'desc2', label: 'Desc Block 2', type: 'textarea' },
    { section: 'methodology', key: 'focus_title', label: 'Focus Title', type: 'text' },
    { section: 'methodology', key: 'focus1', label: 'Focus Area 1', type: 'text' },
    { section: 'methodology', key: 'focus2', label: 'Focus Area 2', type: 'text' },
    { section: 'methodology', key: 'focus3', label: 'Focus Area 3', type: 'text' },
    { section: 'methodology', key: 'image', label: 'Methodology Image', type: 'image' },
    // Simplified Tiers
    { 
      section: 'tiers', 
      label: 'Development Tiers', 
      type: 'collection', 
      itemLabel: 'Tier',
      count: 3, 
      prefix: 't',
      fields: [
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'badge', label: 'Badge', type: 'text' },
        { key: 'desc', label: 'Description', type: 'textarea' },
      ]
    },
    // Simplified Performance
    { 
      section: 'performance', 
      label: 'Performance Tracking', 
      type: 'collection', 
      itemLabel: 'Card',
      count: 3, 
      prefix: 'p',
      fields: [
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'desc', label: 'Description', type: 'textarea' },
      ]
    },
    // CTA
    { section: 'cta', key: 'title', label: 'CTA Title', type: 'text' },
    { section: 'cta', key: 'desc', label: 'CTA Desc', type: 'textarea' },
    { section: 'cta', key: 'btn', label: 'CTA Button Text', type: 'text' },
  ],
  contact: [
    { section: 'header', key: 'title', label: 'Header Title', type: 'text' },
    { section: 'header', key: 'subtitle', label: 'Header Subtitle', type: 'text' },
    { section: 'info', key: 'title', label: 'Info Title', type: 'text' },
    { section: 'info', key: 'desc', label: 'Info Desc', type: 'textarea' },
    { section: 'info', key: 'address_value', label: 'Address', type: 'text' },
    { section: 'info', key: 'email_value', label: 'Email', type: 'text' },
    { section: 'info', key: 'phone_value', label: 'Phone', type: 'text' },
  ]
};

export default function AdminDashboard() {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('cms'); // Default to CMS for now as requested
  const [activeSettingsTab, setActiveSettingsTab] = useState('general');
  const [activeCmsPage, setActiveCmsPage] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Data States
  const [users, setUsers] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [regLinks, setRegLinks] = useState([]);
  const [selectedLinkRegs, setSelectedLinkRegs] = useState([]);
  const [cmsContent, setCmsContent] = useState<any[]>([]);
  const [isSavingCms, setIsSavingCms] = useState(false);
  const [activeCollectionIndices, setActiveCollectionIndices] = useState<Record<string, number>>({});

  // Filter States
  const [roleFilter, setRoleFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [regDateRange, setRegDateRange] = useState({ start: '', end: '' });

  // Pagination States
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Settings / Form States
  const [profileForm, setProfileForm] = useState({ 
    fullName: user?.fullName || '', 
    phone: user?.phone || '', 
    address: user?.address || '', 
    avatarUrl: user?.avatarUrl || '' 
  });
  const [securityForm, setSecurityForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [notifSettings, setNotifSettings] = useState({
    emailAlerts: true,
    pushNotifications: true,
    weeklyReports: false,
    securityAlerts: true
  });

  const [linkForm, setLinkForm] = useState({ title: '', slug: '' });
  const [addUserForm, setAddUserForm] = useState({ fullName: '', email: '', password: '', role: 'user' });
  const [compForm, setCompForm] = useState({ title: '', description: '', date: '', location: '', isPublished: false });

  // Modals States
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isRegsModalOpen, setIsRegsModalOpen] = useState(false);
  const [isCompModalOpen, setIsCompModalOpen] = useState(false);
  
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedLink, setSelectedLink] = useState<any>(null);
  const [selectedComp, setSelectedComp] = useState<any>(null);
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    fetchData();
    setCurrentPage(1);
  }, [activeTab]);

  const fetchData = async () => {
    try {
      if (activeTab === 'users') {
        const res = await api.get('/users');
        setUsers(res.data);
      } else if (activeTab === 'competitions') {
        const res = await api.get('/competitions');
        setCompetitions(res.data);
      } else if (activeTab === 'registrations') {
        const res = await api.get('/registrations/links');
        setRegLinks(res.data);
      } else if (activeTab === 'cms') {
        fetchCmsData();
      }
    } catch (err) {
      toast.error('Failed to load data');
    }
  };

  const fetchCmsData = async () => {
    try {
      const res = await api.get(`/cms/${activeCmsPage}`);
      setCmsContent(res.data);
    } catch (err) {
      toast.error('Failed to load CMS content');
    }
  };

  useEffect(() => {
    if (activeTab === 'cms') {
      setCmsContent([]); // Clear content immediately for visual feedback
      fetchCmsData();
    }
  }, [activeCmsPage]);

  const handleSeed = async () => {
    try {
      const res = await api.post('/cms/seed');
      toast.success(res.data.message || 'Content seeded successfully');
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error('Failed to seed content');
    }
  };

  const handleCmsSave = async (key: string, value: string, section: string, type: string = 'text') => {
    try {
      await api.post('/cms', { page: activeCmsPage, section, key, value, type });
      toast.success('Content updated');
      fetchCmsData();
    } catch (err) {
      toast.error('Failed to update content');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, key: string, section: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const loadingToast = toast.loading('Uploading image...');
    try {
      const res = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const imageUrl = res.data.url;
      await handleCmsSave(key, imageUrl, section, 'image');
      toast.success('Image uploaded and saved!', { id: loadingToast });
    } catch (err) {
      toast.error('Failed to upload image', { id: loadingToast });
    }
  };

  const handleLogout = () => { logout(); navigate('/'); };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      const res = await api.patch(`/users/${user.id}`, profileForm);
      updateUser(res.data);
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error('Failed to update profile');
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (securityForm.newPassword !== securityForm.confirmPassword) return toast.error('Passwords do not match');
    try {
      await api.post('/auth/change-password', { currentPassword: securityForm.currentPassword, newPassword: securityForm.newPassword });
      toast.success('Password changed successfully!');
      setSecurityForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to change password');
    }
  };

  const saveAlertSettings = () => {
    toast.success('Alert preferences saved!');
  };

  const handleCreateLink = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/registrations/links', linkForm);
      toast.success('Registration link created!');
      setLinkForm({ title: '', slug: '' });
      fetchData();
    } catch (err) {
      toast.error('Failed to create link. Slug might be taken.');
    }
  };

  const viewRegistrations = async (link: any) => {
    try {
      const res = await api.get(`/registrations/by-link/${link.id}`);
      setSelectedLinkRegs(res.data);
      setSelectedLink(link);
      setRegDateRange({ start: '', end: '' }); 
      setIsRegsModalOpen(true);
    } catch (err) {
      toast.error('Failed to load registrations');
    }
  };

  const copyLink = (slug: string) => {
    const fullUrl = `${window.location.origin}/register/event/${slug}`;
    navigator.clipboard.writeText(fullUrl);
    toast.success('Link copied to clipboard!');
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/users', addUserForm);
      toast.success('User created successfully!');
      setIsAddUserModalOpen(false);
      setAddUserForm({ fullName: '', email: '', password: '', role: 'user' });
      fetchData();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to create user');
    }
  };

  const handleCreateComp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedComp) {
        await api.patch(`/competitions/${selectedComp.id}`, compForm);
        toast.success('Competition updated!');
      } else {
        await api.post('/competitions', compForm);
        toast.success('Competition created!');
      }
      setIsCompModalOpen(false);
      setSelectedComp(null);
      setCompForm({ title: '', description: '', date: '', location: '', isPublished: false });
      fetchData();
    } catch (err) {
      toast.error('Failed to save competition');
    }
  };

  const deleteItem = async (endpoint: string, id: string) => {
    if (!window.confirm('Are you sure you want to delete this?')) return;
    try {
      await api.delete(`${endpoint}/${id}`);
      toast.success('Deleted successfully');
      fetchData();
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  const saveUserRole = async () => {
    if (!selectedUser) return;
    try {
      await api.patch(`/users/${selectedUser.id}`, { role: newRole });
      toast.success('Role updated');
      setIsRoleModalOpen(false);
      fetchData();
    } catch (err) {
      toast.error('Failed to update role');
    }
  };

  // Filter Logic
  const getFilteredUsers = () => users.filter((u: any) => {
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const createdAt = new Date(u.createdAt).getTime();
    const start = dateRange.start ? new Date(dateRange.start).getTime() : 0;
    const end = dateRange.end ? new Date(dateRange.end).getTime() + 86400000 : Infinity;
    return matchesRole && (createdAt >= start && createdAt <= end);
  });

  const getFilteredRegs = () => selectedLinkRegs.filter((r: any) => {
    const createdAt = new Date(r.createdAt).getTime();
    const start = regDateRange.start ? new Date(regDateRange.start).getTime() : 0;
    const end = regDateRange.end ? new Date(regDateRange.end).getTime() + 86400000 : Infinity;
    return createdAt >= start && createdAt <= end;
  });

  // Exports
  const exportToPDF = () => {
    const doc = new jsPDF();
    const filteredUsers = getFilteredUsers();
    doc.text('GoalGrow Foundation - User Report', 14, 15);
    autoTable(doc, {
      head: [['#', 'Full Name', 'Email', 'Role', 'Joined Date']],
      body: filteredUsers.map((u: any, i: number) => [i + 1, u.fullName || 'N/A', u.email, u.role.toUpperCase(), new Date(u.createdAt).toLocaleDateString()]),
      startY: 25, theme: 'grid'
    });
    doc.save(`GoalGrow_Users_${new Date().toISOString().split('T')[0]}.pdf`);
    toast.success('PDF Downloaded');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(getFilteredUsers().map((u: any, i: number) => ({ '#': i + 1, 'Full Name': u.fullName || 'N/A', 'Email': u.email, 'Role': u.role.toUpperCase(), 'Joined Date': new Date(u.createdAt).toLocaleDateString() })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
    XLSX.writeFile(workbook, `GoalGrow_Users_${new Date().toISOString().split('T')[0]}.xlsx`);
    toast.success('Excel Downloaded');
  };

  const exportRegsToPDF = () => {
    const doc = new jsPDF();
    const data = getFilteredRegs();
    doc.text(`Registrations: ${selectedLink.title}`, 14, 15);
    autoTable(doc, {
      head: [['#', 'Name', 'Email', 'Phone', 'Date']],
      body: data.map((r: any, i: number) => [i + 1, r.fullName, r.email, r.phone || '-', new Date(r.createdAt).toLocaleDateString()]),
      startY: 25, theme: 'grid'
    });
    doc.save(`${selectedLink.slug}_registrations.pdf`);
  };

  const exportRegsToExcel = () => {
    const data = getFilteredRegs().map((r: any, i: number) => ({ '#': i + 1, 'Name': r.fullName, 'Email': r.email, 'Phone': r.phone || '-', 'Date': new Date(r.createdAt).toLocaleDateString() }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Signups');
    XLSX.writeFile(workbook, `${selectedLink.slug}_registrations.xlsx`);
  };

  // Pagination Helper
  const getPaginatedData = (data: any[]) => pageSize === -1 ? data : data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const totalPages = (data: any[]) => pageSize === -1 ? 1 : Math.ceil(data.length / pageSize);

  const renderPagination = (data: any[]) => (
    <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0.75rem', background: isDarkMode ? '#1e293b' : 'white', borderRadius: '10px', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Show</span>
        <select value={pageSize} onChange={(e) => { setPageSize(parseInt(e.target.value)); setCurrentPage(1); }} style={{ padding: '0.2rem', borderRadius: '6px', background: isDarkMode ? '#0f172a' : '#f8fafc', color: isDarkMode ? 'white' : 'black', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`, fontSize: '0.75rem' }}>
          <option value={5}>5</option><option value={10}>10</option><option value={15}>15</option><option value={20}>20</option><option value={-1}>All</option>
        </select>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} style={{ padding: '0.3rem', borderRadius: '6px', border: 'none', cursor: 'pointer', background: isDarkMode ? '#0f172a' : '#f8fafc', color: isDarkMode ? 'white' : 'black' }}><ChevronLeft size={14} /></button>
        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: isDarkMode ? 'white' : 'var(--primary)' }}>Page {currentPage} / {totalPages(data)}</span>
        <button disabled={currentPage === totalPages(data)} onClick={() => setCurrentPage(prev => prev + 1)} style={{ padding: '0.3rem', borderRadius: '6px', border: 'none', cursor: 'pointer', background: isDarkMode ? '#0f172a' : '#f8fafc', color: isDarkMode ? 'white' : 'black' }}><ChevronRightIcon size={14} /></button>
      </div>
    </div>
  );

  const toggleSwitch = (key: keyof typeof notifSettings) => {
    setNotifSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className={`dashboard-container ${isDarkMode ? 'dark-theme' : ''}`} style={{ background: isDarkMode ? '#0f172a' : '#f8fafc', minHeight: '100vh', display: 'flex' }}>
      
      {/* Sidebar */}
      <aside className="sidebar" style={{ width: '180px', background: isDarkMode ? '#1e293b' : 'white', borderRight: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}><LayoutDashboard size={20} /></div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 900, color: isDarkMode ? 'white' : 'var(--primary)', textTransform: 'uppercase', margin: 0 }}>GoalGrow</h2>
          </div>
          <nav>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <li onClick={() => setActiveTab('users')} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.6rem 0.75rem', cursor: 'pointer', borderRadius: '10px', background: activeTab === 'users' ? 'var(--primary)' : 'transparent', color: activeTab === 'users' ? 'white' : (isDarkMode ? '#94a3b8' : '#64748b'), fontWeight: 700, fontSize: '0.85rem' }}><Users size={18} /> Users</li>
              <li onClick={() => setActiveTab('competitions')} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.6rem 0.75rem', cursor: 'pointer', borderRadius: '10px', background: activeTab === 'competitions' ? 'var(--primary)' : 'transparent', color: activeTab === 'competitions' ? 'white' : (isDarkMode ? '#94a3b8' : '#64748b'), fontWeight: 700, fontSize: '0.85rem' }}><Trophy size={18} /> Competitions</li>
              <li onClick={() => setActiveTab('registrations')} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.6rem 0.75rem', cursor: 'pointer', borderRadius: '10px', background: activeTab === 'registrations' ? 'var(--primary)' : 'transparent', color: activeTab === 'registrations' ? 'white' : (isDarkMode ? '#94a3b8' : '#64748b'), fontWeight: 700, fontSize: '0.85rem' }}><LinkIcon size={18} /> Registrations</li>
              <li onClick={() => setActiveTab('cms')} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.6rem 0.75rem', cursor: 'pointer', borderRadius: '10px', background: activeTab === 'cms' ? 'var(--primary)' : 'transparent', color: activeTab === 'cms' ? 'white' : (isDarkMode ? '#94a3b8' : '#64748b'), fontWeight: 700, fontSize: '0.85rem' }}><Layout size={18} /> CMS</li>
              <li onClick={() => setActiveTab('settings')} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.6rem 0.75rem', cursor: 'pointer', borderRadius: '10px', background: activeTab === 'settings' ? 'var(--primary)' : 'transparent', color: activeTab === 'settings' ? 'white' : (isDarkMode ? '#94a3b8' : '#64748b'), fontWeight: 700, fontSize: '0.85rem' }}><Settings size={18} /> Settings</li>
            </ul>
          </nav>
        </div>
        <div style={{ marginTop: 'auto', padding: '1rem', borderTop: `1px solid ${isDarkMode ? '#334155' : '#f1f5f9'}` }}>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem', border: 'none', background: 'rgba(239, 68, 68, 0.05)', color: '#ef4444', fontWeight: 800, cursor: 'pointer', textTransform: 'uppercase', fontSize: '0.7rem', width: '100%', borderRadius: '8px' }}><LogOut size={16} /> Sign Out</button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ height: '60px', background: isDarkMode ? '#1e293b' : 'white', borderBottom: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <Search size={18} style={{ color: '#94a3b8', cursor: 'pointer' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div onClick={() => setIsDarkMode(!isDarkMode)} style={{ color: isDarkMode ? '#fbbf24' : '#64748b', cursor: 'pointer' }}>{isDarkMode ? <Sun size={18} /> : <Moon size={18} />}</div>
            <Bell size={18} style={{ color: '#64748b', cursor: 'pointer' }} />
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', overflow: 'hidden', background: 'var(--primary)' }}>{user?.avatarUrl ? <img src={user.avatarUrl} alt="Admin" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900 }}>A</div>}</div>
          </div>
        </header>

        <div style={{ padding: '1rem 2rem', overflowY: 'auto' }}>
          
          {activeTab === 'users' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}><h1 style={{ fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', color: isDarkMode ? 'white' : 'var(--primary)', margin: 0 }}>Users</h1><p style={{ color: '#64748b', fontSize: '0.75rem', margin: 0 }}>Manage foundation accounts.</p></div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => setIsAddUserModalOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.8rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', textTransform: 'uppercase', fontSize: '0.65rem' }}><UserPlus size={14} /> Add User</button>
                  <button onClick={exportToPDF} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.8rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', textTransform: 'uppercase', fontSize: '0.65rem' }}><Download size={14} /> PDF</button>
                  <button onClick={exportToExcel} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.8rem', background: '#22c55e', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', textTransform: 'uppercase', fontSize: '0.65rem' }}><FileSpreadsheet size={14} /> Excel</button>
                </div>
              </div>
              
              <div style={{ background: isDarkMode ? '#1e293b' : 'white', padding: '0.6rem 1rem', borderRadius: '10px', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`, marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
                  <Filter size={14} style={{ color: '#94a3b8' }} />
                  <select value={roleFilter} onChange={e => { setRoleFilter(e.target.value); setCurrentPage(1); }} style={{ padding: '0.35rem 0.5rem', borderRadius: '8px', background: isDarkMode ? '#0f172a' : '#f8fafc', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`, color: isDarkMode ? 'white' : 'black', fontSize: '0.75rem', flex: 1 }}>
                    <option value="all">All Roles</option><option value="admin">Admins</option><option value="manager">Managers</option><option value="player">Players</option><option value="sponsor">Sponsors</option><option value="user">General</option>
                  </select>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1.2 }}>
                  <Calendar size={14} style={{ color: '#94a3b8' }} />
                  <input type="date" value={dateRange.start} onChange={e => setDateRange({...dateRange, start: e.target.value})} style={{ width: '100%', padding: '0.35rem 0.5rem', borderRadius: '8px', background: isDarkMode ? '#0f172a' : '#f8fafc', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`, color: isDarkMode ? 'white' : 'black', fontSize: '0.75rem' }} />
                  <input type="date" value={dateRange.end} onChange={e => setDateRange({...dateRange, end: e.target.value})} style={{ width: '100%', padding: '0.35rem 0.5rem', borderRadius: '8px', background: isDarkMode ? '#0f172a' : '#f8fafc', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`, color: isDarkMode ? 'white' : 'black', fontSize: '0.75rem' }} />
                </div>
              </div>

              <div style={{ background: isDarkMode ? '#1e293b' : 'white', borderRadius: '12px', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`, overflow: 'hidden' }}>
                <table className="data-table" style={{ border: 'none' }}>
                  <thead style={{ background: isDarkMode ? '#0f172a' : '#f8fafc' }}>
                    <tr><th style={{ width: '40px', padding: '0.5rem' }}>#</th><th style={{ padding: '0.5rem' }}>Full Name</th><th style={{ padding: '0.5rem' }}>Email</th><th style={{ padding: '0.5rem' }}>Role</th><th style={{ padding: '0.5rem' }}>Actions</th></tr>
                  </thead>
                  <tbody>
                    {getPaginatedData(getFilteredUsers()).map((u: any, index: number) => (
                      <tr key={u.id} style={{ borderBottom: `1px solid ${isDarkMode ? '#334155' : '#f1f5f9'}`, color: isDarkMode ? '#cbd5e1' : 'inherit' }}>
                        <td style={{ fontSize: '0.75rem', opacity: 0.7, padding: '0.4rem' }}>{(currentPage - 1) * pageSize + index + 1}</td>
                        <td style={{ fontWeight: 700, padding: '0.4rem', fontSize: '0.85rem' }}>{u.fullName || 'N/A'}</td>
                        <td style={{ padding: '0.4rem', fontSize: '0.8rem' }}>{u.email}</td>
                        <td style={{ padding: '0.4rem' }}><span style={{ padding: '0.15rem 0.5rem', borderRadius: '15px', fontSize: '0.6rem', fontWeight: 800, textTransform: 'uppercase', background: u.role === 'admin' ? '#fee2e2' : '#f1f5f9', color: u.role === 'admin' ? '#991b1b' : '#475569' }}>{u.role}</span></td>
                        <td style={{ padding: '0.4rem' }}><div style={{ display: 'flex', gap: '0.3rem' }}><button onClick={() => {setSelectedUser(u); setIsViewModalOpen(true);}} style={{ padding: '0.25rem 0.5rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.7rem' }}>View</button><button onClick={() => {setSelectedUser(u); setNewRole(u.role); setIsRoleModalOpen(true);}} style={{ padding: '0.25rem 0.5rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.7rem' }}>Role</button><button onClick={() => deleteItem('/users', u.id)} style={{ padding: '0.25rem 0.5rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.7rem' }}>Del</button></div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {renderPagination(getFilteredUsers())}
            </div>
          )}

          {activeTab === 'competitions' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
                  <h1 style={{ fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', color: isDarkMode ? 'white' : 'var(--primary)', margin: 0 }}>Competitions</h1>
                  <p style={{ color: '#64748b', fontSize: '0.75rem', margin: 0 }}>Manage sports events and tournaments.</p>
                </div>
                <button onClick={() => setIsCompModalOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.8rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', textTransform: 'uppercase', fontSize: '0.65rem' }}><Plus size={14} /> New Event</button>
              </div>

              <div style={{ background: isDarkMode ? '#1e293b' : 'white', borderRadius: '12px', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`, overflow: 'hidden' }}>
                <table className="data-table" style={{ border: 'none' }}>
                  <thead style={{ background: isDarkMode ? '#0f172a' : '#f8fafc' }}>
                    <tr>
                      <th style={{ width: '40px', padding: '0.5rem' }}>#</th>
                      <th style={{ padding: '0.5rem' }}>Event Title</th>
                      <th style={{ padding: '0.5rem' }}>Location</th>
                      <th style={{ padding: '0.5rem' }}>Date</th>
                      <th style={{ padding: '0.5rem' }}>Status</th>
                      <th style={{ padding: '0.5rem' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getPaginatedData(competitions).map((comp: any, index: number) => (
                      <tr key={comp.id} style={{ borderBottom: `1px solid ${isDarkMode ? '#334155' : '#f1f5f9'}`, color: isDarkMode ? '#cbd5e1' : 'inherit' }}>
                        <td style={{ fontSize: '0.75rem', opacity: 0.7, padding: '0.4rem' }}>{(currentPage - 1) * pageSize + index + 1}</td>
                        <td style={{ fontWeight: 700, padding: '0.4rem', fontSize: '0.85rem' }}>{comp.title}</td>
                        <td style={{ padding: '0.4rem', fontSize: '0.8rem' }}>{comp.location}</td>
                        <td style={{ padding: '0.4rem', fontSize: '0.8rem' }}>{new Date(comp.date).toLocaleDateString()}</td>
                        <td style={{ padding: '0.4rem' }}>
                          <span style={{ padding: '0.15rem 0.5rem', borderRadius: '15px', fontSize: '0.6rem', fontWeight: 800, textTransform: 'uppercase', background: comp.isPublished ? '#dcfce7' : '#fef9c3', color: comp.isPublished ? '#166534' : '#854d0e' }}>
                            {comp.isPublished ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td style={{ padding: '0.4rem' }}>
                          <div style={{ display: 'flex', gap: '0.3rem' }}>
                            <button onClick={() => { setSelectedComp(comp); setCompForm({ title: comp.title, description: comp.description, date: comp.date, location: comp.location, isPublished: comp.isPublished }); setIsCompModalOpen(true); }} style={{ padding: '0.25rem 0.5rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.7rem' }}>Edit</button>
                            <button onClick={() => deleteItem('/competitions', comp.id)} style={{ padding: '0.25rem 0.5rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.7rem' }}><Trash2 size={12} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {competitions.length === 0 && <tr><td colSpan={6} style={{ padding: '2rem', textAlign: 'center', opacity: 0.5 }}>No competitions found.</td></tr>}
                  </tbody>
                </table>
              </div>
              {renderPagination(competitions)}
            </div>
          )}

          {activeTab === 'registrations' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1rem' }}>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', color: isDarkMode ? 'white' : 'var(--primary)', margin: 0 }}>Registration Links</h1>
                <p style={{ color: '#64748b', fontSize: '0.75rem', margin: 0 }}>Create and manage event sign-up links.</p>
              </div>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ width: '320px', background: isDarkMode ? '#1e293b' : 'white', padding: '1.25rem', borderRadius: '15px', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}` }}>
                  <h3 style={{ marginBottom: '1rem', fontWeight: 900, textTransform: 'uppercase', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Plus size={16} /> New Link</h3>
                  <form onSubmit={handleCreateLink} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Event Title</label>
                      <input type="text" placeholder="e.g. Annual Sports Gala" value={linkForm.title} onChange={e => setLinkForm({...linkForm, title: e.target.value})} style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '10px', border: `1px solid ${isDarkMode ? '#475569' : '#e2e8f0'}`, background: isDarkMode ? '#0f172a' : '#f8fafc', color: isDarkMode ? 'white' : 'black', fontSize: '0.8rem', outline: 'none' }} required />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Unique Slug</label>
                      <input type="text" placeholder="e.g. gala-2026" value={linkForm.slug} onChange={e => setLinkForm({...linkForm, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})} style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '10px', border: `1px solid ${isDarkMode ? '#475569' : '#e2e8f0'}`, background: isDarkMode ? '#0f172a' : '#f8fafc', color: isDarkMode ? 'white' : 'black', fontSize: '0.8rem', outline: 'none' }} required />
                    </div>
                    <button type="submit" className="btn-primary" style={{ padding: '0.6rem', marginTop: '0.5rem', fontSize: '0.75rem', fontWeight: 900 }}>Create Link</button>
                  </form>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ background: isDarkMode ? '#1e293b' : 'white', borderRadius: '12px', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`, overflow: 'hidden' }}>
                    <table className="data-table" style={{ border: 'none' }}>
                      <thead style={{ background: isDarkMode ? '#0f172a' : '#f8fafc' }}>
                        <tr><th style={{ width: '40px', padding: '0.5rem' }}>#</th><th style={{ padding: '0.5rem' }}>Title</th><th style={{ padding: '0.5rem' }}>Sharing Link</th><th style={{ padding: '0.5rem' }}>Actions</th></tr>
                      </thead>
                      <tbody>
                        {getPaginatedData(regLinks).map((link: any, index: number) => (
                          <tr key={link.id} style={{ borderBottom: `1px solid ${isDarkMode ? '#334155' : '#f1f5f9'}`, color: isDarkMode ? '#cbd5e1' : 'inherit' }}>
                            <td style={{ fontSize: '0.75rem', opacity: 0.7, padding: '0.4rem' }}>{(currentPage - 1) * pageSize + index + 1}</td>
                            <td style={{ fontWeight: 700, padding: '0.4rem', fontSize: '0.85rem' }}>{link.title}</td>
                            <td style={{ padding: '0.4rem' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ fontSize: '0.7rem', color: '#64748b' }}>/register/event/{link.slug}</span>
                                <button onClick={() => copyLink(link.slug)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)' }} title="Copy Link"><Clipboard size={14} /></button>
                              </div>
                            </td>
                            <td style={{ padding: '0.4rem' }}>
                              <div style={{ display: 'flex', gap: '0.3rem' }}>
                                <button onClick={() => viewRegistrations(link)} style={{ padding: '0.25rem 0.5rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Users size={12} /> Signups</button>
                                <button onClick={() => deleteItem('/registrations/links', link.id)} style={{ padding: '0.25rem 0.5rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.65rem' }}><Trash2 size={12} /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {renderPagination(regLinks)}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cms' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
                  <h1 style={{ fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', color: isDarkMode ? 'white' : 'var(--primary)', margin: 0 }}>Content Management</h1>
                  <p style={{ color: '#64748b', fontSize: '0.75rem', margin: 0 }}>Manage text and images for all public website pages.</p>
                </div>

              </div>

              <div style={{ display: 'flex', gap: '2rem' }}>
                <aside style={{ width: '180px', maxHeight: '70vh', overflowY: 'auto', paddingRight: '0.5rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    
                    {/* Main Section */}
                    <div>
                      <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.7rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>Main</h4>
                      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                        <li onClick={() => setActiveCmsPage('home')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.6rem', cursor: 'pointer', borderRadius: '8px', background: activeCmsPage === 'home' ? 'var(--primary)' : 'transparent', color: activeCmsPage === 'home' ? 'white' : '#64748b', fontWeight: 700, fontSize: '0.75rem' }}><FileText size={14} /> Home</li>
                      </ul>
                    </div>

                    {/* Club Section */}
                    <div>
                      <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.7rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>The Club</h4>
                      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                        {[
                          { id: 'story', label: 'Our Story' },
                          { id: 'mission', label: 'Mission & Vision' },
                          { id: 'team', label: 'Our Team' },
                          { id: 'partners', label: 'Global Partners' }
                        ].map(page => (
                          <li key={page.id} onClick={() => setActiveCmsPage(page.id)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.6rem', cursor: 'pointer', borderRadius: '8px', background: activeCmsPage === page.id ? 'var(--primary)' : 'transparent', color: activeCmsPage === page.id ? 'white' : '#64748b', fontWeight: 700, fontSize: '0.75rem' }}>
                            <FileText size={14} /> {page.label}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Services Section */}
                    <div>
                      <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.7rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>Programs</h4>
                      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                        {[
                          { id: 'coaching', label: 'Elite Coaching' },
                          { id: 'mentorship', label: 'Mentorship' },
                          { id: 'scholarships', label: 'Scholarships' },
                          { id: 'facilities', label: 'Facilities' }
                        ].map(page => (
                          <li key={page.id} onClick={() => setActiveCmsPage(page.id)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.6rem', cursor: 'pointer', borderRadius: '8px', background: activeCmsPage === page.id ? 'var(--primary)' : 'transparent', color: activeCmsPage === page.id ? 'white' : '#64748b', fontWeight: 700, fontSize: '0.75rem' }}>
                            <FileText size={14} /> {page.label}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Foundation Section */}
                    <div>
                      <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.7rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>Impact</h4>
                      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                        {[
                          { id: 'news', label: 'Latest News' },
                          { id: 'community-projects', label: 'Community Projects' },
                          { id: 'gallery', label: 'Gallery' },
                          { id: 'contact', label: 'Contact Us' }
                        ].map(page => (
                          <li key={page.id} onClick={() => setActiveCmsPage(page.id)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.6rem', cursor: 'pointer', borderRadius: '8px', background: activeCmsPage === page.id ? 'var(--primary)' : 'transparent', color: activeCmsPage === page.id ? 'white' : '#64748b', fontWeight: 700, fontSize: '0.75rem' }}>
                            <FileText size={14} /> {page.label}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}` }}>
                      <button 
                        onClick={handleSeed}
                        style={{ width: '100%', padding: '0.6rem', background: '#f1f5f9', color: '#475569', border: '1px dashed #cbd5e1', borderRadius: '8px', fontSize: '0.65rem', fontWeight: 800, cursor: 'pointer', textTransform: 'uppercase' }}
                      >
                        Seed Default Content
                      </button>
                    </div>
                  </div>
                </aside>

                <div style={{ flex: 1, background: isDarkMode ? '#1e293b' : 'white', borderRadius: '20px', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`, padding: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ margin: 0, fontWeight: 900, textTransform: 'uppercase', fontSize: '0.9rem', color: isDarkMode ? 'white' : 'black', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Layout size={18} color="var(--accent)" /> {activeCmsPage.replace('-', ' ')} Page Content
                    </h3>
                    <button 
                      onClick={() => toast.success('Changes applied to website!')}
                      style={{ padding: '0.5rem 1.25rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 800, fontSize: '0.75rem', cursor: 'pointer' }}
                    >
                      Update Content
                    </button>
                  </div>
                  
                  {/* Dynamic Fields - For demo, showing a generic form based on typical needs */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    
                    {/* Add New Field Helper (for Dev/Admin) */}


                    {/* Render Existing & Schema Fields */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {Array.from(new Set((CMS_SCHEMA[activeCmsPage] || []).map(s => s.section))).map(section => {
                          const sectionSchema = (CMS_SCHEMA[activeCmsPage] || []).find(s => s.section === section);
                          const isCollection = sectionSchema?.type === 'collection';
                          const activeIndex = activeCollectionIndices[section] || 1;
                          
                          return (
                            <div key={section} style={{ background: isDarkMode ? 'rgba(255,255,255,0.02)' : '#f8fafc', borderRadius: '16px', padding: '1.5rem', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`, marginBottom: '1.5rem' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`, paddingBottom: '0.75rem' }}>
                                <h3 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '1px' }}>Section: {sectionSchema?.label || section}</h3>
                                {isCollection && (
                                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                                    {Array.from({ length: sectionSchema.count || 3 }).map((_, i) => (
                                      <button 
                                        key={i}
                                        onClick={() => setActiveCollectionIndices(prev => ({ ...prev, [section]: i + 1 }))}
                                        style={{ 
                                          padding: '0.3rem 0.6rem', 
                                          fontSize: '0.65rem', 
                                          fontWeight: 800, 
                                          borderRadius: '6px', 
                                          border: 'none', 
                                          background: activeIndex === i + 1 ? 'var(--primary)' : (isDarkMode ? '#334155' : '#e2e8f0'), 
                                          color: activeIndex === i + 1 ? 'white' : '#64748b',
                                          cursor: 'pointer' 
                                        }}
                                      >
                                        {sectionSchema.itemLabel || 'Item'} {i + 1}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                              
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                {(isCollection ? sectionSchema.fields : (CMS_SCHEMA[activeCmsPage] || []).filter(s => s.section === section)).map((field: any) => {
                                  const key = isCollection ? `${sectionSchema.prefix || ''}${activeIndex}_${field.key}` : field.key;
                                  const dbContent = cmsContent.find(c => c.section === section && c.key === key);
                                  const type = field.type || 'text';
                                  const label = field.label;
                                  const value = dbContent?.value || '';

                                  return (
                                    <div key={key} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                      <div style={{ width: '120px', fontSize: '0.75rem', fontWeight: 800, color: '#64748b', paddingTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                        {type === 'image' ? <ImageIcon size={12} /> : (type === 'textarea' ? <AlignLeft size={12} /> : <Type size={12} />)}
                                        {label}
                                      </div>
                                      <div style={{ flex: 1, display: 'flex', gap: '0.5rem' }}>
                                        {type === 'textarea' ? (
                                          <textarea 
                                            key={`${activeCmsPage}-${section}-${key}-${activeIndex}`}
                                            defaultValue={value} 
                                            placeholder={`Enter ${label}...`}
                                            onBlur={(e) => {
                                              if (e.target.value !== value) handleCmsSave(key, e.target.value, section, type);
                                            }} 
                                            style={{ flex: 1, padding: '0.6rem', borderRadius: '8px', border: `1px solid ${isDarkMode ? '#475569' : '#cbd5e1'}`, background: isDarkMode ? '#1e293b' : 'white', color: isDarkMode ? 'white' : 'black', fontSize: '0.8rem', minHeight: '80px', resize: 'vertical' }} 
                                          />
                                        ) : type === 'image' ? (
                                          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                              <input 
                                                key={`${activeCmsPage}-${section}-${key}-${activeIndex}`}
                                                type="text" 
                                                defaultValue={value} 
                                                placeholder="Enter Image URL or upload..."
                                                onBlur={(e) => {
                                                  if (e.target.value !== value) handleCmsSave(key, e.target.value, section, type);
                                                }} 
                                                style={{ flex: 1, padding: '0.6rem', borderRadius: '8px', border: `1px solid ${isDarkMode ? '#475569' : '#cbd5e1'}`, background: isDarkMode ? '#1e293b' : 'white', color: isDarkMode ? 'white' : 'black', fontSize: '0.8rem' }} 
                                              />
                                              <label style={{ padding: '0.6rem 1rem', background: 'var(--accent)', color: 'var(--primary)', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 800 }}>
                                                <Camera size={14} /> Upload
                                                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImageUpload(e, key, section)} />
                                              </label>
                                            </div>
                                            {value && <img src={value} alt={key} style={{ height: '100px', width: 'auto', objectFit: 'cover', borderRadius: '8px', border: `1px solid ${isDarkMode ? '#475569' : '#cbd5e1'}` }} />}
                                          </div>
                                        ) : (
                                          <input 
                                            key={`${activeCmsPage}-${section}-${key}-${activeIndex}`}
                                            type="text" 
                                            defaultValue={value} 
                                            placeholder={`Enter ${label}...`}
                                            onBlur={(e) => {
                                              if (e.target.value !== value) handleCmsSave(key, e.target.value, section, type);
                                            }} 
                                            style={{ flex: 1, padding: '0.6rem', borderRadius: '8px', border: `1px solid ${isDarkMode ? '#475569' : '#cbd5e1'}`, background: isDarkMode ? '#1e293b' : 'white', color: isDarkMode ? 'white' : 'black', fontSize: '0.8rem' }} 
                                          />
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      {cmsContent.length === 0 && (!CMS_SCHEMA[activeCmsPage] || CMS_SCHEMA[activeCmsPage].length === 0) && (
                        <p style={{ fontSize: '0.8rem', color: '#64748b', textAlign: 'center', padding: '2rem' }}>No content fields defined for this page yet.</p>
                      )}
                    </div>

                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1.5rem' }}>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', color: isDarkMode ? 'white' : 'var(--primary)', margin: 0 }}>Control Center</h1>
                <p style={{ color: '#64748b', fontSize: '0.75rem', margin: 0 }}>Configure your platform and profile.</p>
              </div>

              <div style={{ display: 'flex', gap: '2rem' }}>
                {/* Internal Settings Tabs */}
                <aside style={{ width: '200px' }}>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <li onClick={() => setActiveSettingsTab('general')} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', cursor: 'pointer', borderRadius: '12px', background: activeSettingsTab === 'general' ? (isDarkMode ? '#334155' : '#f1f5f9') : 'transparent', color: activeSettingsTab === 'general' ? 'var(--primary)' : '#64748b', fontWeight: 700, fontSize: '0.8rem' }}><Globe size={16} /> General</li>
                    <li onClick={() => setActiveSettingsTab('security')} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', cursor: 'pointer', borderRadius: '12px', background: activeSettingsTab === 'security' ? (isDarkMode ? '#334155' : '#f1f5f9') : 'transparent', color: activeSettingsTab === 'security' ? 'var(--primary)' : '#64748b', fontWeight: 700, fontSize: '0.8rem' }}><Shield size={16} /> Security</li>
                    <li onClick={() => setActiveSettingsTab('notifications')} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', cursor: 'pointer', borderRadius: '12px', background: activeSettingsTab === 'notifications' ? (isDarkMode ? '#334155' : '#f1f5f9') : 'transparent', color: activeSettingsTab === 'notifications' ? 'var(--primary)' : '#64748b', fontWeight: 700, fontSize: '0.8rem' }}><BellIcon size={16} /> Alerts</li>
                    <li onClick={() => setActiveSettingsTab('billing')} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', cursor: 'pointer', borderRadius: '12px', background: activeSettingsTab === 'billing' ? (isDarkMode ? '#334155' : '#f1f5f9') : 'transparent', color: activeSettingsTab === 'billing' ? 'var(--primary)' : '#64748b', fontWeight: 700, fontSize: '0.8rem' }}><CreditCard size={16} /> Billing</li>
                  </ul>
                </aside>

                <div style={{ flex: 1, background: isDarkMode ? '#1e293b' : 'white', borderRadius: '20px', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`, padding: '2rem' }}>
                  {activeSettingsTab === 'general' && (
                    <div style={{ maxWidth: '600px' }}>
                      <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ margin: '0 0 0.5rem', fontWeight: 900, textTransform: 'uppercase', fontSize: '0.9rem' }}>Profile Information</h3>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>Update your personal details and public profile image.</p>
                      </div>

                      <form onSubmit={handleUpdateProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                          <div style={{ position: 'relative' }}>
                            <div style={{ width: '100px', height: '100px', borderRadius: '24px', overflow: 'hidden', background: 'var(--primary)' }}>
                              {profileForm.avatarUrl ? <img src={profileForm.avatarUrl} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: '2rem' }}>{user?.fullName?.[0] || 'A'}</div>}
                            </div>
                            <div style={{ position: 'absolute', bottom: '-5px', right: '-5px', background: 'var(--accent)', color: 'var(--primary)', width: '32px', height: '32px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '3px solid white' }}><Camera size={16} /></div>
                          </div>
                          <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Avatar URL</label>
                            <input type="text" value={profileForm.avatarUrl} onChange={e => setProfileForm({...profileForm, avatarUrl: e.target.value})} placeholder="https://image.url/photo.jpg" style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: `1px solid ${isDarkMode ? '#475569' : '#e2e8f0'}`, background: isDarkMode ? '#0f172a' : '#f8fafc', color: isDarkMode ? 'white' : 'black', fontSize: '0.85rem' }} />
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Full Name</label>
                            <div style={{ position: 'relative' }}>
                              <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                              <input type="text" value={profileForm.fullName} onChange={e => setProfileForm({...profileForm, fullName: e.target.value})} style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: '12px', border: `1px solid ${isDarkMode ? '#475569' : '#e2e8f0'}`, background: isDarkMode ? '#0f172a' : '#f8fafc', color: isDarkMode ? 'white' : 'black', fontSize: '0.85rem' }} />
                            </div>
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Contact Number</label>
                            <div style={{ position: 'relative' }}>
                              <Phone size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                              <input type="text" value={profileForm.phone} onChange={e => setProfileForm({...profileForm, phone: e.target.value})} style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: '12px', border: `1px solid ${isDarkMode ? '#475569' : '#e2e8f0'}`, background: isDarkMode ? '#0f172a' : '#f8fafc', color: isDarkMode ? 'white' : 'black', fontSize: '0.85rem' }} />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Physical Address</label>
                          <div style={{ position: 'relative' }}>
                            <MapPin size={16} style={{ position: 'absolute', left: '12px', top: '0.9rem', color: '#94a3b8' }} />
                            <textarea rows={3} value={profileForm.address} onChange={e => setProfileForm({...profileForm, address: e.target.value})} style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: '12px', border: `1px solid ${isDarkMode ? '#475569' : '#e2e8f0'}`, background: isDarkMode ? '#0f172a' : '#f8fafc', color: isDarkMode ? 'white' : 'black', fontSize: '0.85rem', resize: 'none' }} />
                          </div>
                        </div>

                        <button type="submit" className="btn-primary" style={{ padding: '1rem', width: '100%', marginTop: '0.5rem', fontWeight: 900, fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}><Save size={18} /> SAVE CHANGES</button>
                      </form>
                    </div>
                  )}

                  {activeSettingsTab === 'security' && (
                    <div style={{ maxWidth: '600px' }}>
                      <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ margin: '0 0 0.5rem', fontWeight: 900, textTransform: 'uppercase', fontSize: '0.9rem' }}>Security & Privacy</h3>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>Manage your account security and authentication settings.</p>
                      </div>

                      <div style={{ background: isDarkMode ? '#0f172a' : '#f8fafc', padding: '1.5rem', borderRadius: '15px', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`, marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                          <div style={{ width: '40px', height: '40px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Lock size={20} /></div>
                          <div>
                            <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 800 }}>Password Update</h4>
                            <p style={{ margin: 0, fontSize: '0.7rem', color: '#64748b' }}>Last changed: {new Date().toLocaleDateString()}</p>
                          </div>
                        </div>

                        <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Current Password</label>
                            <div style={{ position: 'relative' }}>
                              <Key size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                              <input type="password" value={securityForm.currentPassword} onChange={e => setSecurityForm({...securityForm, currentPassword: e.target.value})} placeholder="••••••••" style={{ width: '100%', padding: '0.7rem 0.7rem 0.7rem 2.5rem', borderRadius: '10px', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`, background: isDarkMode ? '#1e293b' : 'white', color: isDarkMode ? 'white' : 'black', fontSize: '0.8rem' }} required />
                            </div>
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                              <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.4rem' }}>New Password</label>
                              <input type="password" value={securityForm.newPassword} onChange={e => setSecurityForm({...securityForm, newPassword: e.target.value})} placeholder="••••••••" style={{ width: '100%', padding: '0.7rem', borderRadius: '10px', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`, background: isDarkMode ? '#1e293b' : 'white', color: isDarkMode ? 'white' : 'black', fontSize: '0.8rem' }} required />
                            </div>
                            <div>
                              <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Confirm New</label>
                              <input type="password" value={securityForm.confirmPassword} onChange={e => setSecurityForm({...securityForm, confirmPassword: e.target.value})} placeholder="••••••••" style={{ width: '100%', padding: '0.7rem', borderRadius: '10px', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`, background: isDarkMode ? '#1e293b' : 'white', color: isDarkMode ? 'white' : 'black', fontSize: '0.8rem' }} required />
                            </div>
                          </div>
                          <button type="submit" style={{ padding: '0.75rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 900, fontSize: '0.8rem', cursor: 'pointer', marginTop: '0.5rem' }}>UPDATE PASSWORD</button>
                        </form>
                      </div>
                    </div>
                  )}

                  {activeSettingsTab === 'notifications' && (
                    <div style={{ maxWidth: '700px' }}>
                      <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ margin: '0 0 0.5rem', fontWeight: 900, textTransform: 'uppercase', fontSize: '0.9rem' }}>Notification Preferences</h3>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>Configure how and when you want to be alerted about foundation activity.</p>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                          {[
                            { id: 'emailAlerts', title: 'Email Notifications', desc: 'Receive daily summaries and event updates via email.', icon: <Mail size={18} /> },
                            { id: 'pushNotifications', title: 'Desktop Push', desc: 'Get real-time browser alerts for new registrations.', icon: <Globe size={18} /> },
                            { id: 'weeklyReports', title: 'Weekly Analytics', desc: 'A detailed PDF report of all activities every Monday.', icon: <FileSpreadsheet size={18} /> },
                            { id: 'securityAlerts', title: 'Security Alerts', desc: 'Immediate alerts for login attempts and password changes.', icon: <Shield size={18} /> },
                          ].map((item) => (
                            <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: isDarkMode ? '#0f172a' : '#f8fafc', borderRadius: '15px', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}` }}>
                              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <div style={{ color: 'var(--primary)' }}>{item.icon}</div>
                                <div>
                                  <h4 style={{ margin: 0, fontSize: '0.8rem', fontWeight: 800 }}>{item.title}</h4>
                                  <p style={{ margin: 0, fontSize: '0.65rem', color: '#64748b' }}>{item.desc}</p>
                                </div>
                              </div>
                              <div onClick={() => toggleSwitch(item.id as any)} style={{ width: '40px', height: '22px', background: (notifSettings as any)[item.id] ? 'var(--primary)' : '#94a3b8', borderRadius: '20px', padding: '2px', cursor: 'pointer', transition: '0.3s', display: 'flex', justifyContent: (notifSettings as any)[item.id] ? 'flex-end' : 'flex-start' }}>
                                <div style={{ width: '18px', height: '18px', background: 'white', borderRadius: '50%', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
                              </div>
                            </div>
                          ))}
                          <button onClick={saveAlertSettings} style={{ padding: '0.8rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 900, fontSize: '0.8rem', cursor: 'pointer', marginTop: '1rem' }}>SAVE PREFERENCES</button>
                        </div>

                        <div>
                          <h4 style={{ margin: '0 0 1rem', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', color: '#64748b' }}>Recent System Alerts</h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {[
                              { type: 'success', text: 'Weekly report generated successfully', time: '2h ago', icon: <CheckCircle size={14} /> },
                              { type: 'warning', text: 'New login from unknown device', time: '5h ago', icon: <AlertTriangle size={14} /> },
                              { type: 'info', text: 'System backup completed', time: '1d ago', icon: <Info size={14} /> },
                              { type: 'success', text: '50 new registrations for Sports Gala', time: '2d ago', icon: <MessageSquare size={14} /> },
                            ].map((alert, i) => (
                              <div key={i} style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem', borderLeft: `3px solid ${alert.type === 'success' ? '#22c55e' : (alert.type === 'warning' ? '#f59e0b' : '#3b82f6')}`, background: isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', borderRadius: '0 10px 10px 0' }}>
                                <div style={{ color: alert.type === 'success' ? '#22c55e' : (alert.type === 'warning' ? '#f59e0b' : '#3b82f6') }}>{alert.icon}</div>
                                <div style={{ flex: 1 }}>
                                  <p style={{ margin: 0, fontSize: '0.7rem', fontWeight: 700 }}>{alert.text}</p>
                                  <span style={{ fontSize: '0.6rem', color: '#64748b' }}>{alert.time}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSettingsTab === 'billing' && (
                    <div>
                      <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ margin: '0 0 0.5rem', fontWeight: 900, textTransform: 'uppercase', fontSize: '0.9rem' }}>Billing & Subscription</h3>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>Manage your platform plan, payment methods, and view your transaction history.</p>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
                        {/* Plan Card */}
                        <div style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #1e3a8a 100%)', borderRadius: '24px', padding: '2rem', color: 'white', position: 'relative', overflow: 'hidden' }}>
                          <Zap size={120} style={{ position: 'absolute', right: '-20px', bottom: '-20px', opacity: 0.1, transform: 'rotate(-15deg)' }} />
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                            <span style={{ padding: '0.3rem 0.75rem', background: 'rgba(255,255,255,0.2)', borderRadius: '10px', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase' }}>Current Plan</span>
                            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 900 }}>$49<span style={{ fontSize: '0.8rem', opacity: 0.8 }}>/mo</span></h2>
                          </div>
                          <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem', fontWeight: 900 }}>Foundation Pro</h3>
                          <p style={{ margin: '0 0 1.5rem', fontSize: '0.75rem', opacity: 0.8, lineHeight: 1.5 }}>Includes unlimited registration links, advanced analytics, and priority support.</p>
                          <div style={{ display: 'flex', gap: '1rem' }}>
                            <button style={{ flex: 1, padding: '0.75rem', background: 'white', color: 'var(--primary)', border: 'none', borderRadius: '12px', fontWeight: 900, fontSize: '0.8rem', cursor: 'pointer' }}>UPGRADE</button>
                            <button style={{ flex: 1, padding: '0.75rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '12px', fontWeight: 900, fontSize: '0.8rem', cursor: 'pointer' }}>CANCEL</button>
                          </div>
                        </div>

                        {/* Payment Method Card */}
                        <div style={{ background: isDarkMode ? '#0f172a' : '#f8fafc', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`, borderRadius: '24px', padding: '2rem' }}>
                          <h4 style={{ margin: '0 0 1.5rem', fontSize: '0.85rem', fontWeight: 900, textTransform: 'uppercase', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CreditCard size={18} /> Primary Method</h4>
                          <div style={{ background: isDarkMode ? '#1e293b' : 'white', padding: '1.25rem', borderRadius: '16px', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`, display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem' }}>
                            <div style={{ width: '50px', height: '35px', background: '#eb001b', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ display: 'flex', gap: '-5px' }}><div style={{ width: '20px', height: '20px', background: 'rgba(255,255,255,0.5)', borderRadius: '50%' }} /><div style={{ width: '20px', height: '20px', background: 'rgba(255,255,255,0.8)', borderRadius: '50%', marginLeft: '-8px' }} /></div></div>
                            <div style={{ flex: 1 }}>
                              <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 800 }}>Mastercard •••• 4242</p>
                              <p style={{ margin: 0, fontSize: '0.7rem', color: '#64748b' }}>Expires 12/28</p>
                            </div>
                            <button style={{ color: 'var(--primary)', background: 'none', border: 'none', fontWeight: 900, fontSize: '0.7rem', cursor: 'pointer' }}>EDIT</button>
                          </div>
                          <button style={{ width: '100%', padding: '0.8rem', background: 'transparent', border: `1px dashed ${isDarkMode ? '#334155' : '#cbd5e1'}`, color: '#64748b', borderRadius: '12px', fontWeight: 800, fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}><Plus size={16} /> ADD NEW METHOD</button>
                        </div>
                      </div>

                      {/* Billing History */}
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                          <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 900, textTransform: 'uppercase', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Receipt size={18} /> Billing History</h4>
                          <button style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Download size={14} /> DOWNLOAD ALL</button>
                        </div>
                        <div style={{ background: isDarkMode ? '#1e293b' : 'white', borderRadius: '16px', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`, overflow: 'hidden' }}>
                          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                              <tr style={{ background: isDarkMode ? '#0f172a' : '#f8fafc', borderBottom: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}` }}>
                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: 900, color: '#64748b', textTransform: 'uppercase' }}>Invoice ID</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: 900, color: '#64748b', textTransform: 'uppercase' }}>Date</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: 900, color: '#64748b', textTransform: 'uppercase' }}>Amount</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: 900, color: '#64748b', textTransform: 'uppercase' }}>Status</th>
                                <th style={{ padding: '1rem', textAlign: 'right', fontSize: '0.7rem', fontWeight: 900, color: '#64748b', textTransform: 'uppercase' }}>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[
                                { id: 'INV-2026-004', date: 'May 01, 2026', amount: '$49.00', status: 'Paid' },
                                { id: 'INV-2026-003', date: 'Apr 01, 2026', amount: '$49.00', status: 'Paid' },
                                { id: 'INV-2026-002', date: 'Mar 01, 2026', amount: '$49.00', status: 'Paid' },
                              ].map((inv, idx) => (
                                <tr key={inv.id} style={{ borderBottom: idx !== 2 ? `1px solid ${isDarkMode ? '#334155' : '#f1f5f9'}` : 'none' }}>
                                  <td style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: 700 }}>{inv.id}</td>
                                  <td style={{ padding: '1rem', fontSize: '0.8rem', color: '#64748b' }}>{inv.date}</td>
                                  <td style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: 800 }}>{inv.amount}</td>
                                  <td style={{ padding: '1rem' }}><span style={{ padding: '0.2rem 0.6rem', background: '#dcfce7', color: '#166534', borderRadius: '8px', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase' }}>{inv.status}</span></td>
                                  <td style={{ padding: '1rem', textAlign: 'right' }}><button style={{ color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer' }}><ExternalLink size={16} /></button></td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Registrations List Modal */}
      {isRegsModalOpen && selectedLink && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000 }}>
          <div style={{ background: isDarkMode ? '#1e293b' : 'white', width: '900px', maxHeight: '90vh', padding: '1.5rem', borderRadius: '20px', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ margin: 0, textTransform: 'uppercase', fontWeight: 900, fontSize: '1.1rem' }}>{selectedLink.title} - Registrations</h3>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>Showing {getFilteredRegs().length} filtered signups.</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={exportRegsToPDF} style={{ padding: '0.4rem 0.8rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', fontSize: '0.65rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Download size={14} /> PDF</button>
                <button onClick={exportRegsToExcel} style={{ padding: '0.4rem 0.8rem', background: '#22c55e', color: 'white', border: 'none', borderRadius: '8px', fontSize: '0.65rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><FileSpreadsheet size={14} /> EXCEL</button>
                <X style={{ cursor: 'pointer', color: '#64748b', marginLeft: '0.5rem' }} size={24} onClick={() => setIsRegsModalOpen(false)} />
              </div>
            </div>

            {/* Modal Filters */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem', padding: '0.6rem', background: isDarkMode ? '#0f172a' : '#f8fafc', borderRadius: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={14} style={{ color: '#94a3b8' }} />
                <input type="date" value={regDateRange.start} onChange={e => setRegDateRange({...regDateRange, start: e.target.value})} style={{ padding: '0.3rem', borderRadius: '6px', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`, background: isDarkMode ? '#1e293b' : 'white', color: isDarkMode ? 'white' : 'black', fontSize: '0.75rem' }} />
                <span style={{ fontSize: '0.7rem', color: '#64748b' }}>to</span>
                <input type="date" value={regDateRange.end} onChange={e => setRegDateRange({...regDateRange, end: e.target.value})} style={{ padding: '0.3rem', borderRadius: '6px', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`, background: isDarkMode ? '#1e293b' : 'white', color: isDarkMode ? 'white' : 'black', fontSize: '0.75rem' }} />
              </div>
              <button onClick={() => setRegDateRange({start:'', end:''})} style={{ padding: '0.3rem 0.6rem', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '6px', background: 'transparent', fontSize: '0.6rem', fontWeight: 800, cursor: 'pointer' }}>RESET</button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', background: isDarkMode ? '#0f172a' : '#f8fafc', borderRadius: '15px', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}` }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ position: 'sticky', top: 0, background: isDarkMode ? '#1e293b' : '#f1f5f9', zIndex: 10 }}>
                  <tr>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748b' }}>#</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748b' }}>Name</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748b' }}>Email</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748b' }}>Phone</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748b' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {getFilteredRegs().map((reg: any, i: number) => (
                    <tr key={reg.id} style={{ borderBottom: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}` }}>
                      <td style={{ padding: '0.75rem', fontSize: '0.75rem', color: '#64748b' }}>{i + 1}</td>
                      <td style={{ padding: '0.75rem', fontSize: '0.85rem', fontWeight: 700 }}>{reg.fullName}</td>
                      <td style={{ padding: '0.75rem', fontSize: '0.8rem' }}>{reg.email}</td>
                      <td style={{ padding: '0.75rem', fontSize: '0.8rem' }}>{reg.phone || '-'}</td>
                      <td style={{ padding: '0.75rem', fontSize: '0.75rem' }}>{new Date(reg.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {getFilteredRegs().length === 0 && <tr><td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: '#64748b', fontSize: '0.9rem' }}>No registrations found for this period.</td></tr>}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setIsRegsModalOpen(false)} style={{ padding: '0.6rem 2rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 800, cursor: 'pointer' }}>Close Overview</button>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {isAddUserModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000 }}>
          <div style={{ background: isDarkMode ? '#1e293b' : 'white', width: '400px', padding: '1.5rem', borderRadius: '15px', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0, textTransform: 'uppercase', fontWeight: 900, fontSize: '1rem' }}>Create Account</h3>
              <X style={{ cursor: 'pointer', color: '#64748b' }} size={20} onClick={() => setIsAddUserModalOpen(false)} />
            </div>
            <form onSubmit={handleAddUser} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <input type="text" placeholder="Full Name" value={addUserForm.fullName} onChange={e => setAddUserForm({...addUserForm, fullName: e.target.value})} style={{ padding: '0.6rem', borderRadius: '10px', background: isDarkMode ? '#0f172a' : '#f8fafc', color: isDarkMode ? 'white' : 'black', border: `1px solid ${isDarkMode ? '#475569' : '#e2e8f0'}`, outline: 'none' }} required />
              <input type="email" placeholder="Email Address" value={addUserForm.email} onChange={e => setAddUserForm({...addUserForm, email: e.target.value})} style={{ padding: '0.6rem', borderRadius: '10px', background: isDarkMode ? '#0f172a' : '#f8fafc', color: isDarkMode ? 'white' : 'black', border: `1px solid ${isDarkMode ? '#475569' : '#e2e8f0'}`, outline: 'none' }} required />
              <input type="password" placeholder="Password" value={addUserForm.password} onChange={e => setAddUserForm({...addUserForm, password: e.target.value})} style={{ padding: '0.6rem', borderRadius: '10px', background: isDarkMode ? '#0f172a' : '#f8fafc', color: isDarkMode ? 'white' : 'black', border: `1px solid ${isDarkMode ? '#475569' : '#e2e8f0'}`, outline: 'none' }} required />
              <select value={addUserForm.role} onChange={e => setAddUserForm({...addUserForm, role: e.target.value})} style={{ padding: '0.6rem', borderRadius: '10px', background: isDarkMode ? '#0f172a' : '#f8fafc', color: isDarkMode ? 'white' : 'black', border: `1px solid ${isDarkMode ? '#475569' : '#e2e8f0'}`, outline: 'none', fontWeight: 600 }}>
                <option value="user">User</option><option value="player">Player</option><option value="sponsor">Sponsor</option><option value="manager">Manager</option><option value="admin">Admin</option>
              </select>
              <button type="submit" className="btn-primary" style={{ padding: '0.75rem', marginTop: '0.5rem', fontWeight: 900 }}>Create User</button>
            </form>
          </div>
        </div>
      )}

      {/* Role Edit Modal */}
      {isRoleModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000 }}>
          <div style={{ background: isDarkMode ? '#1e293b' : 'white', width: '350px', padding: '1.5rem', borderRadius: '15px', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}` }}>
            <h3 style={{ margin: '0 0 1rem', textTransform: 'uppercase', fontWeight: 900, fontSize: '1rem' }}>Update Role</h3>
            <select value={newRole} onChange={e => setNewRole(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '10px', background: isDarkMode ? '#0f172a' : '#f8fafc', color: isDarkMode ? 'white' : 'black', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`, marginBottom: '1rem' }}>
              <option value="admin">Admin</option><option value="manager">Manager</option><option value="player">Player</option><option value="sponsor">Sponsor</option><option value="user">User</option>
            </select>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={saveUserRole} style={{ flex: 1, padding: '0.6rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 800, cursor: 'pointer' }}>Save</button>
              <button onClick={() => setIsRoleModalOpen(false)} style={{ flex: 1, padding: '0.6rem', background: 'transparent', color: '#64748b', border: `1px solid #e2e8f0`, borderRadius: '10px', fontWeight: 800, cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {isViewModalOpen && selectedUser && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000 }}>
          <div style={{ background: isDarkMode ? '#1e293b' : 'white', width: '450px', padding: '1.5rem', borderRadius: '15px', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0, textTransform: 'uppercase', fontWeight: 900, fontSize: '1rem' }}>User Overview</h3>
              <X style={{ cursor: 'pointer', color: '#64748b' }} size={20} onClick={() => setIsViewModalOpen(false)} />
            </div>
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '15px', overflow: 'hidden', background: 'var(--primary)' }}>
                {selectedUser.avatarUrl ? <img src={selectedUser.avatarUrl} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: '1.5rem' }}>{selectedUser.fullName?.[0] || 'U'}</div>}
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 0.25rem', fontSize: '1.1rem', fontWeight: 900 }}>{selectedUser.fullName || 'N/A'}</h4>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>{selectedUser.email}</p>
                <span style={{ display: 'inline-block', marginTop: '0.5rem', padding: '0.2rem 0.6rem', borderRadius: '10px', fontSize: '0.65rem', fontWeight: 900, background: 'var(--primary)', color: 'white', textTransform: 'uppercase' }}>{selectedUser.role}</span>
              </div>
            </div>
            <div style={{ borderTop: `1px solid ${isDarkMode ? '#334155' : '#f1f5f9'}`, paddingTop: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div><p style={{ margin: 0, fontSize: '0.6rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 800 }}>User ID</p><p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 700 }}>{selectedUser.id}</p></div>
                <div><p style={{ margin: 0, fontSize: '0.6rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 800 }}>Joined Date</p><p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 700 }}>{new Date(selectedUser.createdAt).toLocaleDateString()}</p></div>
                <div><p style={{ margin: 0, fontSize: '0.6rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 800 }}>Phone</p><p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 700 }}>{selectedUser.phone || '-'}</p></div>
                <div><p style={{ margin: 0, fontSize: '0.6rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 800 }}>Address</p><p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 700 }}>{selectedUser.address || '-'}</p></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Competition Modal */}
      {isCompModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000 }}>
          <div style={{ background: isDarkMode ? '#1e293b' : 'white', width: '450px', padding: '1.5rem', borderRadius: '15px', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0, textTransform: 'uppercase', fontWeight: 900, fontSize: '1rem' }}>{selectedComp ? 'Edit Competition' : 'Create Competition'}</h3>
              <X style={{ cursor: 'pointer', color: '#64748b' }} size={20} onClick={() => { setIsCompModalOpen(false); setSelectedComp(null); setCompForm({ title: '', description: '', date: '', location: '', isPublished: false }); }} />
            </div>
            <form onSubmit={handleCreateComp} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Title</label>
                <input type="text" value={compForm.title} onChange={e => setCompForm({...compForm, title: e.target.value})} style={{ width: '100%', padding: '0.6rem', borderRadius: '10px', background: isDarkMode ? '#0f172a' : '#f8fafc', color: isDarkMode ? 'white' : 'black', border: `1px solid ${isDarkMode ? '#475569' : '#e2e8f0'}`, outline: 'none' }} required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Description</label>
                <textarea value={compForm.description} onChange={e => setCompForm({...compForm, description: e.target.value})} rows={3} style={{ width: '100%', padding: '0.6rem', borderRadius: '10px', background: isDarkMode ? '#0f172a' : '#f8fafc', color: isDarkMode ? 'white' : 'black', border: `1px solid ${isDarkMode ? '#475569' : '#e2e8f0'}`, outline: 'none', resize: 'none' }} required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Date</label>
                  <input type="date" value={compForm.date} onChange={e => setCompForm({...compForm, date: e.target.value})} style={{ width: '100%', padding: '0.6rem', borderRadius: '10px', background: isDarkMode ? '#0f172a' : '#f8fafc', color: isDarkMode ? 'white' : 'black', border: `1px solid ${isDarkMode ? '#475569' : '#e2e8f0'}`, outline: 'none' }} required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Location</label>
                  <input type="text" value={compForm.location} onChange={e => setCompForm({...compForm, location: e.target.value})} style={{ width: '100%', padding: '0.6rem', borderRadius: '10px', background: isDarkMode ? '#0f172a' : '#f8fafc', color: isDarkMode ? 'white' : 'black', border: `1px solid ${isDarkMode ? '#475569' : '#e2e8f0'}`, outline: 'none' }} required />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
                <input type="checkbox" checked={compForm.isPublished} onChange={e => setCompForm({...compForm, isPublished: e.target.checked})} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                <label style={{ fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>Publish immediately</label>
              </div>
              <button type="submit" className="btn-primary" style={{ padding: '0.75rem', marginTop: '1rem', fontWeight: 900 }}>{selectedComp ? 'Save Changes' : 'Create Event'}</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
