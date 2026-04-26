import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { Leaf, Droplets, Sparkles, Heart, Star, ShoppingBag, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const { products, heroImage, whatsapp } = useContext(AppContext);
  const featuredProducts = (products || []).slice(0, 3);

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section style={{ 
        position: 'relative',
        height: '90vh', 
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("${heroImage}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -1
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(90deg, rgba(253, 251, 247, 0.9) 0%, rgba(253, 251, 247, 0.4) 50%, transparent 100%)'
          }}></div>
        </div>

        <div className="container">
          <div style={{ maxWidth: '650px' }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 style={{ fontSize: '5rem', marginBottom: '0.5rem', lineHeight: 0.9 }} className="brand-font">
                Lavena
              </h1>
              <h2 style={{ fontSize: '1.2rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '2rem' }}>
                Saboaria Artesanal
              </h2>
              <div className="divider" style={{ width: '100px', margin: '2rem 0' }}></div>
              <p style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '3rem', fontWeight: 300, lineHeight: 1.6 }}>
                Inspirada na natureza para transformar o seu cuidado diário em um ritual de <span className="gold-text">pureza, leveza e conexão.</span>
              </p>
              
              <div className="flex gap-2">
                <Link to="/produtos" className="btn btn-primary">
                  Conhecer Produtos <ShoppingBag size={18} />
                </Link>
                <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                  WhatsApp <MessageCircle size={18} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brand Essence Section */}
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <span className="gold-text" style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.9rem' }}>Nossa Essência</span>
            <h2 style={{ fontSize: '3rem', marginTop: '1rem' }}>Mais do que um nome, uma essência.</h2>
            <div className="divider" style={{ margin: '2rem auto', width: '200px' }}></div>
          </div>

          <div className="mobile-stack" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2.5rem',
            justifyContent: 'center'
          }}>
            <motion.div whileHover={{ y: -5 }} className="glass card-hover" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', textAlign: 'center' }}>
              <div style={{ height: '220px', overflow: 'hidden' }}>
                <img src="images/essencia/lavar.png" alt="Lavar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '2.5rem 2rem' }}>
                <div style={{ color: 'var(--primary)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                  <Droplets size={32} strokeWidth={1.5} />
                </div>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Lavar</h3>
                <p style={{ color: 'var(--text-muted)' }}>Limpeza suave que cuida da sua pele e acalma a alma.</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="glass card-hover" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', textAlign: 'center', border: '1px solid var(--accent-light)' }}>
              <div style={{ height: '220px', overflow: 'hidden' }}>
                <img src="images/essencia/purificar.png" alt="Purificar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '2.5rem 2rem' }}>
                <div style={{ color: 'var(--primary)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                  <Leaf size={32} strokeWidth={1.5} />
                </div>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Purificar</h3>
                <p style={{ color: 'var(--text-muted)' }}>Ingredientes naturais que renovam suas energias por dentro e por fora.</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="glass card-hover" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', textAlign: 'center' }}>
              <div style={{ height: '220px', overflow: 'hidden' }}>
                <img src="images/essencia/renovar.png" alt="Renovar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '2.5rem 2rem' }}>
                <div style={{ color: 'var(--primary)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                  <Sparkles size={32} strokeWidth={1.5} />
                </div>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Renovar</h3>
                <p style={{ color: 'var(--text-muted)' }}>Transforme cada dia em um novo começo com fragrâncias envolventes.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Specialties (Now Dynamic) */}
      <section className="section-padding" style={{ background: 'var(--secondary)' }}>
        <div className="container">
          <div className="flex justify-between align-center" style={{ marginBottom: '4rem' }}>
            <div>
              <h2 style={{ fontSize: '2.5rem' }}>Destaques da Saboaria</h2>
              <p style={{ color: 'var(--text-muted)' }}>Produtos selecionados para você conhecer nossa qualidade.</p>
            </div>
            <Link to="/produtos" className="btn btn-outline">Ver Catálogo Completo</Link>
          </div>

          <div className="grid-products">
            {featuredProducts.length > 0 ? (
              featuredProducts.map(product => (
                <div key={product.id} className="glass card-hover" style={{ overflow: 'hidden', borderRadius: 'var(--radius-lg)' }}>
                  <div style={{ height: '300px', overflow: 'hidden' }}>
                    <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '2rem' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase' }}>{product.category}</span>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', marginTop: '0.5rem' }}>{product.name}</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem', height: '2.7em', overflow: 'hidden' }}>{product.description}</p>
                    <Link to="/produtos" className="gold-text" style={{ fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Ver no Catálogo →</Link>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ textAlign: 'center', gridColumn: '1 / -1', color: 'var(--text-muted)' }}>Nenhum produto cadastrado ainda.</p>
            )}
          </div>
        </div>
      </section>

      {/* Values / Quote */}
      <section className="section-padding" style={{ textAlign: 'center', position: 'relative' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <Star className="gold-text" size={32} style={{ marginBottom: '2rem' }} />
          <h2 className="serif-font" style={{ fontSize: '2.5rem', fontStyle: 'italic', color: 'var(--text-main)', lineHeight: 1.4 }}>
            "Nossa saboaria nasce do propósito de transformar o cuidado diário em um momento de leveza, frescor e bem-estar."
          </h2>
          <div className="divider" style={{ margin: '3rem auto', width: '100px' }}></div>
          <p className="brand-font" style={{ fontSize: '2rem', color: 'var(--primary-dark)' }}>Sinta a pureza. Viva Lavena.</p>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="section-padding">
        <div className="container">
          <div className="glass" style={{ padding: '4rem', borderRadius: 'var(--radius-lg)', textAlign: 'center', background: 'var(--primary-dark)', color: 'white' }}>
            <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '1rem' }}>Quer levar a Lavena para sua casa?</h2>
            <p style={{ marginBottom: '2.5rem', opacity: 0.9 }}>Peça agora pelo WhatsApp e receba em sua casa com todo carinho.</p>
            <a href={`https://wa.me/${whatsapp}`} className="btn btn-whatsapp" style={{ padding: '16px 40px', fontSize: '1.1rem' }}>
              Falar com um Consultor <MessageCircle />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

