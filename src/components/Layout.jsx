import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Instagram, Phone, Menu, X, Heart } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="glass" style={{ position: 'sticky', top: 0, zIndex: 1000, padding: '0.8rem 0' }}>
      <div className="container flex justify-between align-center">
        <Link to="/" className="flex align-center gap-1">
          <span className="brand-font" style={{ fontSize: '2.5rem', color: 'var(--primary-dark)', lineHeight: 1 }}>
            Lavena
          </span>
          <span style={{ 
            fontSize: '0.65rem', 
            letterSpacing: '0.2em', 
            textTransform: 'uppercase', 
            color: 'var(--accent)',
            marginTop: '0.5rem',
            marginLeft: '-0.5rem'
          }}>
            Saboaria Artesanal
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="flex gap-2 align-center" style={{ display: 'none', '@media (min-width: 768px)': { display: 'flex' } } }>
          <NavLink to="/" className={({isActive}) => isActive ? 'active-link' : ''} style={{ fontWeight: 500, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Home</NavLink>
          <NavLink to="/produtos" style={{ fontWeight: 500, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Produtos</NavLink>
          <NavLink to="/sobre" style={{ fontWeight: 500, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Sobre</NavLink>
          <NavLink to="/contato" style={{ fontWeight: 500, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Contato</NavLink>
          <Link to="/admin" className="btn btn-outline" style={{ padding: '8px 20px', fontSize: '0.8rem' }}>Gestão</Link>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} style={{ color: 'var(--primary-dark)' }}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fade-in-up" style={{ 
          background: 'var(--bg-color)', 
          position: 'absolute', 
          top: '100%', 
          left: 0, 
          width: '100%', 
          padding: '2rem', 
          boxShadow: 'var(--shadow-md)',
          zIndex: 999
        }}>
          <div className="flex flex-column gap-2 text-center">
            <Link to="/" onClick={() => setIsOpen(false)} style={{ fontSize: '1.2rem', fontWeight: 500 }}>Home</Link>
            <Link to="/produtos" onClick={() => setIsOpen(false)} style={{ fontSize: '1.2rem', fontWeight: 500 }}>Produtos</Link>
            <Link to="/sobre" onClick={() => setIsOpen(false)} style={{ fontSize: '1.2rem', fontWeight: 500 }}>Sobre</Link>
            <Link to="/contato" onClick={() => setIsOpen(false)} style={{ fontSize: '1.2rem', fontWeight: 500 }}>Contato</Link>
            <Link to="/admin" className="btn btn-primary" onClick={() => setIsOpen(false)}>Área do Gestor</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export const Footer = () => (
  <footer style={{ background: 'var(--secondary)', padding: '6rem 0 3rem', marginTop: 'auto' }}>
    <div className="container">
      <div className="grid-products" style={{ marginBottom: '4rem' }}>
        <div>
          <h2 className="brand-font" style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--primary-dark)' }}>Lavena</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '300px' }}>
            Transformando o cuidado diário em um momento de leveza, frescor e bem-estar através da saboaria artesanal.
          </p>
        </div>
        <div>
          <h4 style={{ marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Menu</h4>
          <ul className="flex flex-column gap-1">
            <li><Link to="/produtos" style={{ color: 'var(--text-muted)' }}>Catálogo de Produtos</Link></li>
            <li><Link to="/sobre" style={{ color: 'var(--text-muted)' }}>Nossa História</Link></li>
            <li><Link to="/contato" style={{ color: 'var(--text-muted)' }}>Fale Conosco</Link></li>
            <li><Link to="/admin" style={{ color: 'var(--text-muted)' }}>Área Administrativa</Link></li>
          </ul>
        </div>
        <div>
          <h4 style={{ marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Conecte-se</h4>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Siga-nos para novidades e dicas de autocuidado.</p>
          <div className="flex gap-1">
            <a href="#" className="btn-primary" style={{ padding: '12px', borderRadius: '50%', display: 'flex' }}><Instagram size={20} /></a>
            <a href="#" className="btn-whatsapp" style={{ padding: '12px', borderRadius: '50%', display: 'flex' }}><Phone size={20} /></a>
          </div>
        </div>
      </div>
      
      <div className="divider"></div>
      
      <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
        © 2024 Lavena Saboaria. Feito com <Heart size={14} className="gold-text" fill="var(--accent)" /> para você.
      </div>
    </div>
  </footer>
);

