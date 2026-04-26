import React from 'react';
import { motion } from 'framer-motion';

export const About = () => (
  <div className="section-padding">
    <div className="container" style={{ maxWidth: '800px' }}>
      <motion.h1 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        style={{ textAlign: 'center', marginBottom: '3rem' }}
      >
        A Essência da Lavena
      </motion.h1>
      
      <div style={{ marginBottom: '4rem' }}>
        <img 
          src="https://images.unsplash.com/photo-1605264964528-06403738d6dc?auto=format&fit=crop&q=80&w=1000" 
          alt="Processo artesanal" 
          style={{ borderRadius: 'var(--radius-lg)', marginBottom: '2rem', width: '100%', height: '400px', objectFit: 'cover' }}
        />
        <h2 style={{ marginBottom: '1.5rem' }}>Nossa História</h2>
        <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
          A Lavena Saboaria nasceu da paixão pela alquimia botânica e pelo desejo de transformar o banho, um momento cotidiano, em uma experiência extraordinária de autocuidado.
        </p>
        <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
          O nome <strong>Lavena</strong> remete à pureza e à leveza da lavanda, nossa primeira inspiração. Cada produto que sai de nossa oficina é fruto de horas de testes, escolha rigorosa de matérias-primas e, acima de tudo, muito amor.
        </p>
      </div>

      <div className="glass" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
        <h3 style={{ marginBottom: '1rem' }}>Nossa Missão</h3>
        <p style={{ fontStyle: 'italic', fontSize: '1.2rem', color: 'var(--primary-dark)' }}>
          "Proporcionar bem-estar através de cosméticos que respeitam o tempo do fazer manual e a sensibilidade de cada pele."
        </p>
      </div>
    </div>
  </div>
);

export const Contact = () => (
  <div className="section-padding">
    <div className="container">
      <h1 style={{ textAlign: 'center', marginBottom: '4rem' }}>Vamos Conversar?</h1>
      
      <div className="grid-products">
        <div className="glass" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)' }}>
          <h3 style={{ marginBottom: '2rem' }}>Envie uma mensagem</h3>
          <form className="flex flex-column gap-1">
            <input placeholder="Seu Nome" style={inputStyle} />
            <input placeholder="Seu E-mail" type="email" style={inputStyle} />
            <textarea placeholder="Como podemos ajudar?" style={{...inputStyle, height: '120px'}} />
            <button className="btn btn-primary">Enviar Mensagem</button>
          </form>
        </div>

        <div className="flex flex-column gap-2" style={{ padding: '2rem' }}>
          <div>
            <h3 style={{ marginBottom: '1rem' }}>Atendimento Direto</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Precisa de um presente personalizado ou tem dúvidas sobre os produtos?</p>
            <a href="https://wa.me/5511999999999" target="_blank" className="btn btn-whatsapp" style={{ width: '100%', justifyContent: 'center' }}>
              Chamar no WhatsApp
            </a>
          </div>
          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Siga-nos</h3>
            <p style={{ color: 'var(--text-muted)' }}>Acompanhe os bastidores da produção no Instagram:</p>
            <a href="#" style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '1.2rem' }}>@lavenasaboaria</a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const inputStyle = { padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '0.9rem' };
