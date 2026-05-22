import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <section className="section" style={{ 
      background: 'radial-gradient(circle at center, #0d214a 0%, #0a1a35 100%)', 
      color: 'white', 
      padding: '1rem 0', 
      borderTop: '1px solid var(--accent)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Secondary subtle bottom line */}
      <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', height: '1px', background: 'var(--secondary)', opacity: 0.1 }}></div>
      
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
           <div style={{ width: '6px', height: '6px', background: 'var(--secondary)', rotate: '45deg' }}></div>
           <h1 style={{ fontSize: '1.25rem', textTransform: 'uppercase', fontWeight: 900, margin: 0, letterSpacing: '1px' }}>{title}</h1>
           <div style={{ width: '6px', height: '6px', background: 'var(--secondary)', rotate: '45deg' }}></div>
        </div>
        
        <div style={{ width: '30px', height: '2px', background: 'var(--accent)', margin: '0.25rem auto 0.5rem' }}></div>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.2rem' }}>
          <div style={{ height: '1px', width: '30px', background: 'var(--secondary)', opacity: 0.3 }}></div>
          <p style={{ color: 'var(--secondary)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '2px', fontSize: '0.6rem', margin: 0 }}>{subtitle}</p>
          <div style={{ height: '1px', width: '30px', background: 'var(--secondary)', opacity: 0.3 }}></div>
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
