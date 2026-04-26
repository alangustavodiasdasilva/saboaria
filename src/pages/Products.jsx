import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ShoppingBag, Leaf, Sparkles, Heart } from 'lucide-react';

const Products = () => {
  const { products, categories, whatsapp } = useContext(AppContext);
  const [filter, setFilter] = useState('Todas');

  // Defensive check for products array
  const safeProducts = products || [];

  const filteredProducts = filter === 'Todas' 
    ? safeProducts 
    : safeProducts.filter(p => p && p.category === filter);

  return (
    <div className="fade-in">
      {/* Header Section */}
      <section style={{ 
        background: 'var(--secondary)', 
        padding: '80px 0 60px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <span className="gold-text" style={{ textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '0.85rem', fontWeight: 600 }}>Coleções Exclusivas</span>
          <h1 style={{ fontSize: '3.5rem', marginTop: '1rem' }}>Nosso Catálogo</h1>
          <p style={{ maxWidth: '600px', margin: '1.5rem auto 0', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            Cada aroma foi cuidadosamente selecionado para despertar seus sentidos e transformar seu ritual de cuidado.
          </p>
        </div>
        
        {/* Decorative Leaf Icon */}
        <div style={{ position: 'absolute', right: '-20px', top: '20px', opacity: 0.05, transform: 'rotate(15deg)' }}>
          <Leaf size={200} color="var(--primary-dark)" />
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          {/* Filtros */}
          <div className="flex gap-1 justify-center" style={{ marginBottom: '5rem', flexWrap: 'wrap' }}>
            <button 
              className={`btn ${filter === 'Todas' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setFilter('Todas')}
              style={{ borderRadius: 'var(--radius-sm)', fontSize: '0.8rem' }}
            >
              Todas
            </button>
            {categories && categories.map(cat => (
              <button 
                key={cat}
                className={`btn ${filter === cat ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setFilter(cat)}
                style={{ borderRadius: 'var(--radius-sm)', fontSize: '0.8rem' }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Lista de Produtos */}
          <div className="grid-products">
            <AnimatePresence>
              {filteredProducts.map(product => {
                if (!product) return null;
                const price = typeof product.price === 'number' ? product.price : 0;
                
                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="glass card-hover"
                    style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
                  >
                      <div style={{ position: 'relative', height: '320px', overflow: 'hidden' }}>
                        <img 
                          src={product.image || 'images/hero_official.png'} 
                          alt={product.name} 
                          onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = 'images/hero_official.png';
                          }}
                          style={{ height: '100%', width: '100%', objectFit: 'cover' }} 
                        />
                      <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem' }}>
                        <span className="glass" style={{ background: 'rgba(253, 251, 247, 0.8)', padding: '6px 14px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--primary-dark)' }}>
                          {product.category}
                        </span>
                      </div>
                    </div>
                    
                    <div style={{ padding: '2.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3 style={{ marginBottom: '1rem', fontSize: '1.8rem' }}>{product.name}</h3>
                      
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: 1.6, flex: 1 }}>
                        {product.description}
                      </p>

                      <div style={{ marginBottom: '2rem', borderTop: '1px solid var(--secondary)', paddingTop: '1.5rem' }}>
                        <div className="flex align-center gap-1 gold-text" style={{ marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          <Sparkles size={14} /> Benefícios
                        </div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontStyle: 'italic' }}>{product.benefits || 'Produto artesanal com ingredientes selecionados.'}</p>
                      </div>

                      <div className="flex justify-between align-center" style={{ marginTop: 'auto' }}>
                        <div className="flex flex-column">
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Investimento</span>
                          <span style={{ fontWeight: 700, fontSize: '1.6rem', color: 'var(--primary-dark)' }}>R$ {price.toFixed(2)}</span>
                        </div>
                        <a 
                          href={`https://wa.me/${whatsapp}?text=Olá! Gostaria de encomendar o ${product.name} - Valor: R$ ${price.toFixed(2)}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn btn-whatsapp"
                          style={{ padding: '12px 20px', borderRadius: 'var(--radius-sm)' }}
                        >
                          <MessageCircle size={18} /> Pedir
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          
          {filteredProducts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <Leaf size={48} className="gold-text" style={{ opacity: 0.3, marginBottom: '1rem' }} />
              <p style={{ color: 'var(--text-muted)' }}>Nenhum produto encontrado nesta categoria no momento.</p>
            </div>
          )}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="section-padding" style={{ background: 'var(--bg-color)', borderTop: '1px solid var(--secondary)' }}>
        <div className="container">
          <div className="grid-products" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', textAlign: 'center', gap: '3rem' }}>
            <div>
              <Leaf className="gold-text" size={32} style={{ marginBottom: '1rem' }} />
              <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>100% Natural</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Ingredientes vegetais de alta qualidade.</p>
            </div>
            <div>
              <Heart className="gold-text" size={32} style={{ marginBottom: '1rem' }} />
              <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Feito à Mão</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Produção artesanal com intenção e carinho.</p>
            </div>
            <div>
              <Sparkles className="gold-text" size={32} style={{ marginBottom: '1rem' }} />
              <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Hipoalergênico</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Fórmulas suaves testadas para sua pele.</p>
            </div>
            <div>
              <ShoppingBag className="gold-text" size={32} style={{ marginBottom: '1rem' }} />
              <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Envio Seguro</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Embalagens sustentáveis e protegidas.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;


