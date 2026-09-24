import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminHero from './pages/AdminHero';
import AdminCoreValues from './pages/AdminCoreValues';
import AdminHowItWorks from './pages/AdminHowItWorks';
import AdminWhyChoose from './pages/AdminWhyChoose';
import AdminContactCTA from './pages/AdminContactCTA';
import AdminContactPage from './pages/AdminContactPage';
import AdminAboutPage from './pages/AdminAboutPage';
import AdminProjects from './pages/AdminProjects';
import AdminEnquiries from './pages/AdminEnquiries';
import AdminGenericManager from './components/AdminGenericManager';
import { Wrench, Users, FileText, Newspaper, Quote, Briefcase, Phone } from 'lucide-react';

function AdminApp() {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />

      <Route path="/" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="about-page" element={<AdminAboutPage />} />
        <Route path="hero" element={<AdminHero />} />
        <Route path="core-values" element={<AdminCoreValues />} />
        <Route path="how-it-works" element={<AdminHowItWorks />} />
        <Route path="why-choose" element={<AdminWhyChoose />} />
        <Route path="contact-cta" element={<AdminContactCTA />} />
        <Route path="contact-page" element={<AdminContactPage />} />
        <Route path="projects" element={<AdminProjects />} />
        <Route path="enquiries" element={<AdminEnquiries />} />

        <Route
          path="services"
          element={
            <AdminGenericManager
              title="Services"
              endpoint="/services"
              icon={Wrench}
              fields={[
                { name: 'title', label: 'Service Title', placeholder: 'e.g. Epoxy Flooring Solutions' },
                { name: 'icon', label: 'Icon Name', placeholder: 'e.g. Shield' },
                { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Service description...' }
              ]}
            />
          }
        />

        <Route
          path="team"
          element={
            <AdminGenericManager
              title="Team"
              endpoint="/team"
              icon={Users}
              fields={[
                { name: 'name', label: 'Full Name', placeholder: 'John Doe' },
                { name: 'role', label: 'Job Role / Designation', placeholder: 'Senior Project Manager' },
                { name: 'image_url', label: 'Photo URL', placeholder: 'https://...' },
                { name: 'bio', label: 'Bio / Summary', type: 'textarea' }
              ]}
            />
          }
        />

        <Route
          path="insights"
          element={
            <AdminGenericManager
              title="Insights & Articles"
              endpoint="/insights"
              icon={FileText}
              fields={[
                { name: 'title', label: 'Article Title' },
                { name: 'category', label: 'Category' },
                { name: 'author', label: 'Author' },
                { name: 'summary', label: 'Summary', type: 'textarea' },
                { name: 'content', label: 'Full Content', type: 'textarea' }
              ]}
            />
          }
        />

        <Route
          path="news"
          element={
            <AdminGenericManager
              title="News & Updates"
              endpoint="/news"
              icon={Newspaper}
              fields={[
                { name: 'title', label: 'News Headline' },
                { name: 'category', label: 'Category' },
                { name: 'summary', label: 'Summary', type: 'textarea' },
                { name: 'content', label: 'Full Article', type: 'textarea' }
              ]}
            />
          }
        />

        <Route
          path="testimonials"
          element={
            <AdminGenericManager
              title="Testimonials"
              endpoint="/testimonials"
              icon={Quote}
              fields={[
                { name: 'client_name', label: 'Client Name' },
                { name: 'company', label: 'Company / Organization' },
                { name: 'feedback', label: 'Client Testimonial', type: 'textarea' }
              ]}
            />
          }
        />

        <Route
          path="careers"
          element={
            <AdminGenericManager
              title="Careers"
              endpoint="/careers"
              icon={Briefcase}
              fields={[
                { name: 'title', label: 'Job Opening Title' },
                { name: 'department', label: 'Department' },
                { name: 'location', label: 'Location' },
                { name: 'type', label: 'Job Type (e.g. Full-time)' },
                { name: 'description', label: 'Job Description', type: 'textarea' }
              ]}
            />
          }
        />

        <Route
          path="contact"
          element={
            <AdminGenericManager
              title="Contact Information"
              endpoint="/contact"
              icon={Phone}
              fields={[
                { name: 'address', label: 'Company Address', type: 'textarea' },
                { name: 'phone', label: 'Phone Number' },
                { name: 'email', label: 'Email Address' },
                { name: 'map_embed_url', label: 'Google Maps Embed URL' }
              ]}
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default AdminApp;
