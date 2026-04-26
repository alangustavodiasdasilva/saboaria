import React, { createContext, useState, useEffect } from 'react';
import { initialProducts } from '../data/products';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('lavena_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('lavena_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('lavena_admin_logged') === 'true';
  });

  useEffect(() => {
    try {
      localStorage.setItem('lavena_products', JSON.stringify(products));
    } catch (e) {
      console.error('Erro ao salvar produtos:', e);
      if (e.name === 'QuotaExceededError') {
        alert('Erro: Espaço insuficiente. Tente usar fotos menores ou menos produtos.');
      }
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('lavena_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Erro ao salvar pedidos:', e);
    }
  }, [orders]);

  const addProduct = (product) => {
    setProducts([...products, { ...product, id: Date.now() }]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(products.map(p => p.id === id ? updatedProduct : p));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const addOrder = (order) => {
    setOrders([...orders, { ...order, id: Date.now(), date: new Date().toISOString() }]);
  };

  const login = (password) => {
    if (password === 'admin123') { // Senha simples para o demo
      setIsAdmin(true);
      localStorage.setItem('lavena_admin_logged', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('lavena_admin_logged');
  };

  const [heroImage, setHeroImage] = useState(() => {
    return localStorage.getItem('lavena_hero_image') || 'images/hero_official.png';
  });

  useEffect(() => {
    localStorage.setItem('lavena_hero_image', heroImage);
  }, [heroImage]);

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('lavena_categories');
    return saved ? JSON.parse(saved) : [
      "Sabonete de Colher",
      "Sabonete Líquido",
      "Sabonete em Barra",
      "Geleia de Banho"
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('lavena_categories', JSON.stringify(categories));
    } catch (e) {
      console.error('Erro ao salvar categorias:', e);
    }
  }, [categories]);

  const addCategory = (name) => {
    if (!categories.includes(name)) {
      setCategories([...categories, name]);
    }
  };

  const deleteCategory = (name) => {
    setCategories(categories.filter(c => c !== name));
  };

  const [whatsapp, setWhatsapp] = useState(() => {
    return localStorage.getItem('lavena_whatsapp') || '5511999999999';
  });

  useEffect(() => {
    localStorage.setItem('lavena_whatsapp', whatsapp);
  }, [whatsapp]);

  return (
    <AppContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      orders,
      addOrder,
      isAdmin,
      login,
      logout,
      heroImage,
      setHeroImage,
      categories,
      addCategory,
      deleteCategory,
      importProducts,
      whatsapp,
      setWhatsapp
    }}>
      {children}
    </AppContext.Provider>
  );
};
