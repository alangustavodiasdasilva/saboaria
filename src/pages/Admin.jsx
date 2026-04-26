import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  LayoutDashboard, Plus, Trash2, Edit3, LogOut, Package, 
  ShoppingCart, DollarSign, Eye, Image as ImageIcon, Settings,
  CheckCircle, AlertCircle, Sparkles, Tag
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Admin = () => {
  const { 
    products, addProduct, updateProduct, deleteProduct, 
    orders, isAdmin, login, logout, heroImage, setHeroImage,
    categories, addCategory, deleteCategory, whatsapp, setWhatsapp
  } = useContext(AppContext);
  
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [isAdding, setIsAdding] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [newCatName, setNewCatName] = useState('');
  const [formData, setFormData] = useState({ 
    name: '', price: 0, category: categories[0] || '', 
    description: '', benefits: '', image: '' 
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (!login(password)) {
      alert('Senha incorreta!');
      setPassword('');
    }
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCatName.trim()) {
      addCategory(newCatName.trim());
      setNewCatName('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check image size (base64)
    if (formData.image && formData.image.length > 2000000) { // ~1.5MB in base64
      alert('A imagem é muito grande! Por favor, use uma imagem menor ou tire um print da foto para reduzir o tamanho.');
      return;
    }

    try {
      if (editProduct) {
        updateProduct(editProduct.id, { ...formData, id: editProduct.id });
        setEditProduct(null);
      } else {
        addProduct(formData);
      }
      setIsAdding(false);
      resetForm();
    } catch (error) {
      alert('Erro ao salvar produto. Tente usar uma foto menor.');
    }
  };

  const resetForm = () => {
    setFormData({ 
      name: '', price: 0, category: categories[0] || '', 
      description: '', benefits: '', image: '' 
    });
  };

  const startEdit = (product) => {
    setEditProduct(product);
    setFormData(product);
    setIsAdding(true);
    setActiveTab('products');
  };

  const cancelEdit = () => {
    setEditProduct(null);
    setIsAdding(false);
    resetForm();
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        
        // Tentativa de compressão leve (apenas se for muito grande)
        if (result.length > 1000000) { // Maior que 1MB
          const img = new Image();
          img.src = result;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const scale = Math.sqrt(1000000 / result.length);
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const compressed = canvas.toDataURL('image/jpeg', 0.8);
            
            if (field === 'hero') setHeroImage(compressed);
            else setFormData({ ...formData, image: compressed });
          };
          img.onerror = () => {
            // Fallback: se der erro na imagem, usa o original
            if (field === 'hero') setHeroImage(result);
            else setFormData({ ...formData, image: result });
          };
        } else {
          // Foto pequena, usa direto
          if (field === 'hero') setHeroImage(result);
          else setFormData({ ...formData, image: result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isAdmin) {
    return (
      <div className="flex align-center justify-center" style={{ minHeight: '80vh', background: 'var(--bg-color)' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass" 
          style={{ padding: '4rem', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: '450px', textAlign: 'center', boxShadow: 'var(--shadow-lg)' }}
        >
          <div style={{ background: 'var(--secondary)', width: '70px', height: '70px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
            <Settings size={32} color="var(--primary-dark)" />
          </div>
          <h2 style={{ marginBottom: '0.5rem', fontSize: '2rem' }}>Área do Gestor</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>Acesse as configurações da Lavena Saboaria.</p>
          
          <form onSubmit={handleLogin} className="flex flex-column gap-1">
            <div style={{ position: 'relative' }}>
              <input 
                type="password" 
                placeholder="Senha de acesso" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ 
                  width: '100%',
                  padding: '16px', 
                  borderRadius: 'var(--radius-sm)', 
                  border: '1px solid var(--secondary)',
                  fontSize: '1rem',
                  outline: 'none',
                  textAlign: 'center'
                }}
              />
            </div>
            <button className="btn btn-primary" type="submit" style={{ justifyContent: 'center', padding: '16px' }}>Entrar no Painel</button>
          </form>
          <p style={{ marginTop: '2rem', fontSize: '0.75rem', color: '#ccc' }}>Acesso restrito a administradores autorizados.</p>
        </motion.div>
      </div>
    );
  }

  const totalRevenue = products.reduce((acc, p) => acc + (p.price || 0), 0);

  return (
    <div className="fade-in" style={{ background: '#f8f9fa', minHeight: '100vh' }}>
      <div className="container" style={{ padding: '40px 0' }}>
        {/* Header */}
        <div className="flex justify-between align-center" style={{ marginBottom: '3rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem' }}>Painel Administrativo</h1>
            <p style={{ color: 'var(--text-muted)' }}>Bem-vindo de volta, gestor Lavena.</p>
          </div>
          <button onClick={logout} className="btn btn-outline" style={{ color: 'var(--text-main)', borderColor: '#ddd' }}>
            <LogOut size={18} /> Sair do Painel
          </button>
        </div>

        {/* Sidebar Tabs */}
        <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2.5rem' }}>
          <aside className="flex flex-column gap-1">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`btn ${activeTab === 'overview' ? 'btn-primary' : 'glass'}`}
              style={{ justifyContent: 'flex-start', width: '100%', padding: '14px 20px' }}
            >
              <LayoutDashboard size={20} /> Visão Geral
            </button>
            <button 
              onClick={() => setActiveTab('products')}
              className={`btn ${activeTab === 'products' ? 'btn-primary' : 'glass'}`}
              style={{ justifyContent: 'flex-start', width: '100%', padding: '14px 20px' }}
            >
              <Package size={20} /> Produtos
            </button>
            <button 
              onClick={() => setActiveTab('categories')}
              className={`btn ${activeTab === 'categories' ? 'btn-primary' : 'glass'}`}
              style={{ justifyContent: 'flex-start', width: '100%', padding: '14px 20px' }}
            >
              <Tag size={20} /> Categorias
            </button>
            <button 
              onClick={() => setActiveTab('visual')}
              className={`btn ${activeTab === 'visual' ? 'btn-primary' : 'glass'}`}
              style={{ justifyContent: 'flex-start', width: '100%', padding: '14px 20px' }}
            >
              <Settings size={20} /> Configurações
            </button>
          </aside>

          <main>
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="grid-products" style={{ marginBottom: '2.5rem', gridTemplateColumns: 'repeat(3, 1fr)' }}>
                  <StatCard icon={<Package color="var(--primary)" />} title="Total de Produtos" value={products.length} />
                  <StatCard icon={<ShoppingCart color="var(--primary)" />} title="Pedidos" value={orders.length} />
                  <StatCard icon={<DollarSign color="var(--primary)" />} title="Valor do Catálogo" value={`R$ ${totalRevenue.toFixed(2)}`} />
                </div>
                
                <div className="glass" style={{ padding: '2.5rem', borderRadius: 'var(--radius-lg)' }}>
                  <h3>Últimas Atividades</h3>
                  <div style={{ marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    Nenhuma atividade recente registrada.
                  </div>
                </div>
              </motion.div>
            )}

            {/* PRODUCTS TAB */}
            {activeTab === 'products' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="glass" style={{ padding: '2.5rem', borderRadius: 'var(--radius-lg)' }}>
                  <div className="flex justify-between align-center" style={{ marginBottom: '2.5rem' }}>
                    <h2>{isAdding ? (editProduct ? 'Editando Produto' : 'Novo Produto') : 'Todos os Produtos'}</h2>
                    {!isAdding && (
                      <button className="btn btn-primary" onClick={() => setIsAdding(true)}>
                        <Plus size={18} /> Adicionar Novo
                      </button>
                    )}
                  </div>

                  {isAdding ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '3rem' }}>
                      {/* FORM SIDE */}
                      <form onSubmit={handleSubmit} className="flex flex-column gap-1">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                          <div className="input-group">
                            <label style={labelStyle}>Nome do Produto</label>
                            <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={inputStyle} />
                          </div>
                          <div className="input-group">
                            <label style={labelStyle}>Preço (R$)</label>
                            <input required type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})} style={inputStyle} />
                          </div>
                          <div className="input-group">
                            <label style={labelStyle}>Categoria</label>
                            <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={inputStyle}>
                              <option value="">Selecione uma categoria</option>
                              {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                          </div>
                          <div className="input-group">
                            <label style={labelStyle}>Imagem do Produto</label>
                            <div className="flex flex-column gap-1">
                              <input 
                                type="file" 
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 'product')}
                                style={{ fontSize: '0.8rem' }}
                              />
                              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Ou cole um link:</span>
                              <input 
                                placeholder="https://..." 
                                value={formData.image} 
                                onChange={e => setFormData({...formData, image: e.target.value})} 
                                style={{...inputStyle, padding: '8px'}} 
                              />
                            </div>
                          </div>
                        </div>
                        <div className="input-group">
                          <label style={labelStyle}>Descrição Emocional</label>
                          <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={{...inputStyle, height: '100px'}} />
                        </div>
                        <div className="input-group">
                          <label style={labelStyle}>Principais Benefícios</label>
                          <textarea required value={formData.benefits} onChange={e => setFormData({...formData, benefits: e.target.value})} style={{...inputStyle, height: '80px'}} />
                        </div>
                        
                        <div className="flex gap-1" style={{ marginTop: '1.5rem' }}>
                          <button type="submit" className="btn btn-primary">{editProduct ? 'Salvar Alterações' : 'Criar Produto'}</button>
                          <button type="button" onClick={cancelEdit} className="btn btn-outline">Cancelar</button>
                        </div>
                      </form>

                      {/* LIVE PREVIEW SIDE */}
                      <div>
                        <h4 style={{ marginBottom: '1.5rem', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>
                          <Eye size={14} /> Pré-visualização Real
                        </h4>
                        <div className="glass" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', pointerEvents: 'none', border: '1px solid var(--primary-light)' }}>
                          <div style={{ height: '200px', overflow: 'hidden' }}>
                            <img src={formData.image || 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&q=80&w=400'} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                          <div style={{ padding: '1.5rem' }}>
                            <span style={{ fontSize: '0.65rem', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase' }}>{formData.category || 'Categoria'}</span>
                            <h3 style={{ fontSize: '1.2rem', margin: '0.25rem 0 0.5rem' }}>{formData.name || 'Nome do Produto'}</h3>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem', height: '3.2em', overflow: 'hidden' }}>{formData.description || 'A descrição aparecerá aqui...'}</p>
                            <div className="flex justify-between align-center">
                              <span style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--primary-dark)' }}>R$ {(formData.price || 0).toFixed(2)}</span>
                              <div className="btn-whatsapp" style={{ padding: '6px 12px', borderRadius: '4px', fontSize: '0.7rem' }}>Pedir</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                          <tr style={{ borderBottom: '2px solid #f0f0f0' }}>
                            <th style={tableHeadStyle}>Produto</th>
                            <th style={tableHeadStyle}>Categoria</th>
                            <th style={tableHeadStyle}>Preço</th>
                            <th style={tableHeadStyle}>Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map(product => (
                            <tr key={product.id} style={{ borderBottom: '1px solid #f9f9f9' }}>
                              <td style={tableCellStyle}>
                                <div className="flex align-center gap-1">
                                  <img src={product.image} alt="" style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} />
                                  <span style={{ fontWeight: 500 }}>{product.name}</span>
                                </div>
                              </td>
                              <td style={tableCellStyle}>{product.category}</td>
                              <td style={tableCellStyle}>R$ {product.price.toFixed(2)}</td>
                              <td style={tableCellStyle}>
                                <div className="flex gap-1">
                                  <button onClick={() => startEdit(product)} className="glass" style={{ padding: '8px', borderRadius: '6px', color: 'var(--primary-dark)' }}><Edit3 size={16} /></button>
                                  <button onClick={() => deleteProduct(product.id)} className="glass" style={{ padding: '8px', borderRadius: '6px', color: 'var(--danger)' }}><Trash2 size={16} /></button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* CATEGORIES TAB */}
            {activeTab === 'categories' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="glass" style={{ padding: '2.5rem', borderRadius: 'var(--radius-lg)' }}>
                  <h2 style={{ marginBottom: '2rem' }}>Gerenciar Categorias</h2>
                  
                  <form onSubmit={handleAddCategory} className="flex gap-1" style={{ marginBottom: '3rem' }}>
                    <input 
                      required 
                      placeholder="Nome da nova categoria" 
                      value={newCatName} 
                      onChange={e => setNewCatName(e.target.value)} 
                      style={{...inputStyle, flex: 1}} 
                    />
                    <button type="submit" className="btn btn-primary">
                      <Plus size={18} /> Adicionar
                    </button>
                  </form>

                  <div className="flex flex-column gap-1">
                    {categories.map(cat => (
                      <div key={cat} className="flex justify-between align-center glass" style={{ padding: '1rem 1.5rem', borderRadius: 'var(--radius-sm)' }}>
                        <span style={{ fontWeight: 500 }}>{cat}</span>
                        <button 
                          onClick={() => {
                            if(window.confirm(`Excluir a categoria "${cat}"?`)) deleteCategory(cat);
                          }} 
                          style={{ color: 'var(--danger)' }}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                    {categories.length === 0 && (
                      <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>Nenhuma categoria cadastrada.</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* VISUAL IDENTITY / SETTINGS TAB */}
            {activeTab === 'visual' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="glass" style={{ padding: '2.5rem', borderRadius: 'var(--radius-lg)' }}>
                  <h2 style={{ marginBottom: '2rem' }}>Configurações Gerais</h2>
                  
                  <div className="flex flex-column gap-2">
                    {/* WhatsApp Setting */}
                    <div className="input-group">
                      <label style={labelStyle}>Número do WhatsApp (com DDD)</label>
                      <div className="flex flex-column gap-1">
                        <input 
                          value={whatsapp} 
                          onChange={e => setWhatsapp(e.target.value.replace(/\D/g, ''))} 
                          style={inputStyle} 
                          placeholder="Ex: 5511999999999"
                        />
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          Digite apenas números, incluindo o 55 e o DDD.
                        </span>
                      </div>
                    </div>

                    <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '1rem 0' }} />

                    <div className="input-group">
                      <label style={labelStyle}>Imagem de Fundo Principal (Hero)</label>
                      <div className="flex flex-column gap-1">
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, 'hero')}
                          style={{ marginBottom: '1rem' }}
                        />
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Ou use um link externo:</span>
                        <input 
                          value={heroImage} 
                          onChange={e => setHeroImage(e.target.value)} 
                          style={inputStyle} 
                          placeholder="https://..."
                        />
                      </div>
                    </div>

                    <div style={{ marginTop: '2rem' }}>
                      <label style={labelStyle}>Pré-visualização do Banner</label>
                      <div style={{ 
                        height: '250px', 
                        borderRadius: 'var(--radius-md)', 
                        backgroundImage: `url("${heroImage}")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '4px solid white',
                        boxShadow: 'var(--shadow-md)'
                      }}>
                        <div className="glass" style={{ padding: '1rem 2rem', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                          <h1 className="brand-font" style={{ fontSize: '2.5rem' }}>Lavena</h1>
                          <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em' }}>SABOARIA ARTESANAL</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-1" style={{ marginTop: '2rem' }}>
                      <button onClick={() => alert('Configurações salvas!')} className="btn btn-primary">Salvar Todas as Configurações</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value }) => (
  <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-md)', textAlign: 'center', background: 'white' }}>
    <div style={{ background: '#f0f4f0', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
      {icon}
    </div>
    <h4 style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</h4>
    <p style={{ fontSize: '2rem', fontWeight: 700, marginTop: '0.5rem', color: 'var(--primary-dark)' }}>{value}</p>
  </div>
);

const inputStyle = { 
  padding: '14px', 
  borderRadius: '8px', 
  border: '1px solid #eee', 
  fontSize: '1rem',
  width: '100%',
  background: '#fafafa',
  outline: 'none',
  transition: 'border-color 0.3s ease'
};

const labelStyle = { 
  display: 'block', 
  marginBottom: '0.8rem', 
  fontWeight: 600, 
  fontSize: '0.9rem',
  color: 'var(--text-main)'
};

const tableHeadStyle = { padding: '1.2rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.9rem' };
const tableCellStyle = { padding: '1.2rem' };

export default Admin;

