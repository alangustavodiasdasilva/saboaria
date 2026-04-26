const BASE_URL = import.meta.env.BASE_URL;

export const categories = [
  "Sabonete de Colher",
  "Sabonete Líquido",
  "Sabonete em Barra",
  "Geleia de Banho"
];

export const initialProducts = [
  {
    id: 1,
    name: "Sabonete de Colher Maracujá",
    category: "Sabonete de Colher",
    price: 38.00,
    description: "Refrescância e energia para transformar seu banho em um momento revigorante. Textura cremosa e sensorial.",
    benefits: "Energizante, esfoliante suave e altamente hidratante.",
    image: `${BASE_URL}images/sabonete_colher.png`
  },
  {
    id: 2,
    name: "Sabonete Líquido Melancia",
    category: "Sabonete Líquido",
    price: 42.00,
    description: "Leveza e frescor que deixam sua pele delicadamente perfumada e renovada com o aroma doce da melancia.",
    benefits: "Limpeza suave, pH equilibrado e fragrância duradoura.",
    image: `${BASE_URL}images/sabonete_liquido.png`
  },
  {
    id: 3,
    name: "Sabonete em Barra Mel",
    category: "Sabonete em Barra",
    price: 28.00,
    description: "Nutrição e suavidade que abraçam sua pele com o doce cuidado da natureza e as propriedades do mel.",
    benefits: "Nutritivo, cicatrizante natural e toque sedoso.",
    image: "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 4,
    name: "Sabonete de Colher Mel",
    category: "Sabonete de Colher",
    price: 38.00,
    description: "Um abraço doce e cremoso. O poder nutritivo do mel em uma textura de mousse irresistível.",
    benefits: "Hidratação profunda e restauração da barreira cutânea.",
    image: "https://images.unsplash.com/photo-1590136208404-9bb1f40a120a?auto=format&fit=crop&q=80&w=400"
  }
];

