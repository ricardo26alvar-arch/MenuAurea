import { MenuItem } from './types';

// MENU DEL DIA (Image 1) - Special featured daily set menu
export const menuDelDia: MenuItem[] = [
  {
    id: 'mdd_caesar',
    name: 'Ensalada César',
    price: 12.50,
    description: 'Lechuga romana fresca, crutones artesanales, queso parmesano añejo y nuestro aderezo César especial de la casa.',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=600&q=80',
    category: 'entradas',
    categoryLabel: 'Entradas'
  },
  {
    id: 'mdd_pollo',
    name: 'Pollo a la Plancha',
    price: 16.00,
    description: 'Pechuga marinada en finas hierbas, cocinada a la parrilla, acompañada de vegetales asados de temporada.',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80',
    category: 'platos_fuertes',
    categoryLabel: 'Platos Fuertes'
  },
  {
    id: 'mdd_alfredo',
    name: 'Pasta Alfredo',
    price: 14.50,
    description: 'Fettuccine artesanal bañado en nuestra cremosa salsa Alfredo tradicional, con un toque de nuez moscada.',
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80',
    category: 'platos_fuertes',
    categoryLabel: 'Platos Fuertes'
  }
];

// FULL COMPREHENSIVE MENU
export const fullMenu: MenuItem[] = [
  // --- DÍA / COCINA MEDITERRÁNEA (Image 2) ---
  // ENTRADAS (Día)
  {
    id: 'dia_egriega',
    name: 'Ensalada griega',
    price: 8.50,
    description: 'Elaborada con vegetales frescos, aceitunas y queso feta de la mejor calidad.',
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=600&q=80',
    category: 'entradas',
    categoryLabel: 'Entradas',
    isDiaOnly: true
  },
  {
    id: 'dia_hummus',
    name: 'Hummus',
    price: 7.00,
    description: 'Puré de garbanzos sazonado con tahini, limón y aceite de oliva, acompañado de pan pita caliente.',
    image: 'https://images.unsplash.com/photo-1616645258469-ec681c17f3ee?auto=format&fit=crop&w=600&q=80',
    category: 'entradas',
    categoryLabel: 'Entradas',
    isDiaOnly: true
  },
  {
    id: 'dia_bruschettes',
    name: 'Bruschettes mediterráneas',
    price: 8.00,
    description: 'Tostadas de pan rústico frotadas con ajo, cubiertas con tomate picado, albahaca fresca y aceite de oliva.',
    image: 'https://images.unsplash.com/photo-1572656631137-7935297eff55?auto=format&fit=crop&w=600&q=80',
    category: 'entradas',
    categoryLabel: 'Entradas',
    isDiaOnly: true
  },
  {
    id: 'dia_falafel',
    name: 'Palafel',
    price: 8.50,
    description: 'Croquetas de garbanzos crujientes acompañadas de una cremosa salsa de yogur y hierbas.',
    image: 'https://images.unsplash.com/photo-1547058886-af77992d8d6f?auto=format&fit=crop&w=600&q=80',
    category: 'entradas',
    categoryLabel: 'Entradas',
    isDiaOnly: true
  },
  {
    id: 'dia_calamares',
    name: 'Calamares fritos',
    price: 10.50,
    description: 'Anillos de calamar rebozados y fritos a la perfección, acompañados de salsa alioli casera.',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80',
    category: 'entradas',
    categoryLabel: 'Entradas',
    isDiaOnly: true
  },

  // PLATOS FUERTES (Día)
  {
    id: 'dia_pesto',
    name: 'Pasta al pesto',
    price: 13.00,
    description: 'Pasta fresca bañada en nuestra salsa de albahaca fresca, piñones, ajo, parmesano y aceite de oliva extra virgen.',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
    category: 'platos_fuertes',
    categoryLabel: 'Platos Fuertes',
    isDiaOnly: true
  },
  {
    id: 'dia_lasana',
    name: 'Lasaña clásica',
    price: 14.00,
    description: 'Capas de pasta rellenas de carne de res premium boloñesa, salsa bechamel sedosa y gratinadas con abundante queso.',
    image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=600&q=80',
    category: 'platos_fuertes',
    categoryLabel: 'Platos Fuertes',
    isDiaOnly: true
  },
  {
    id: 'dia_polloromero',
    name: 'Pollo al romero',
    price: 14.00,
    description: 'Pechuga marinada en romero fresco y ajo, dorada a la plancha con crujientes vegetales de temporada.',
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b98c6?auto=format&fit=crop&w=600&q=80',
    category: 'platos_fuertes',
    categoryLabel: 'Platos Fuertes',
    isDiaOnly: true
  },
  {
    id: 'dia_shawarma',
    name: 'Shawarma de pollo o carne',
    price: 12.50,
    description: 'Láminas de carne marinadas cocinadas lentamente, envueltas en pan de pita con vegetales y salsa de yogur.',
    image: 'https://images.unsplash.com/photo-1561651823-34fed022540e?auto=format&fit=crop&w=600&q=80',
    category: 'platos_fuertes',
    categoryLabel: 'Platos Fuertes',
    isDiaOnly: true
  },
  {
    id: 'dia_pescado',
    name: 'Pescado a la plancha',
    price: 17.00,
    description: 'Filete de pescado fresco sellado a la plancha, servido con finas hierbas y ensalada cítrica.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80',
    category: 'platos_fuertes',
    categoryLabel: 'Platos Fuertes',
    isDiaOnly: true
  },
  {
    id: 'dia_risotto',
    name: 'Risotto de marisco',
    price: 17.00,
    description: 'Cremoso arroz Arborio cocinado a fuego lento con caldo de mariscos fresco, camarones, calamares y mejillones.',
    image: 'https://images.unsplash.com/photo-1515443961218-a51367888e4b?auto=format&fit=crop&w=600&q=80',
    category: 'platos_fuertes',
    categoryLabel: 'Platos Fuertes',
    isDiaOnly: true
  },
  {
    id: 'dia_paella_estrella',
    name: 'Paella Costa Áurea 🥘',
    price: 24.99,
    description: 'Mezcla de mariscos frescos del Pacífico, arroz bomba mediterráneo sazonado con azafrán auténtico y hierbas exclusivas.',
    image: 'https://images.unsplash.com/photo-1515443961218-a51367888e4b?auto=format&fit=crop&w=600&q=80',
    category: 'platos_fuertes',
    categoryLabel: 'Platos Fuertes',
    isDiaOnly: true
  },

  // OPCIONES TIPO RESTOBAR (Día)
  {
    id: 'dia_pizza_margherita',
    name: 'Pizza Margarita',
    price: 14.00,
    description: 'Clásica pizza artesanal con salsa de tomates de la casa, mozzarella fresca y hojas de albahaca.',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80',
    category: 'restobar',
    categoryLabel: 'Opciones Restobar',
    isDiaOnly: true
  },
  {
    id: 'dia_pizza_med',
    name: 'Pizza Mediterránea',
    price: 17.00,
    description: 'Con salsa de tomate, mozzarella, aceitunas negras, pimientos, cebollas rojas, tomates deshidratados y queso feta.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    category: 'restobar',
    categoryLabel: 'Opciones Restobar',
    isDiaOnly: true
  },
  {
    id: 'dia_wrap',
    name: 'Wrap Mediterráneo',
    price: 11.00,
    description: 'Tortilla de trigo rellena de vegetales asados, queso feta desmenuzado, lechuga crujiente y un toque de hummus.',
    image: 'https://images.unsplash.com/photo-1626700051175-6518c4793f0f?auto=format&fit=crop&w=600&q=80',
    category: 'restobar',
    categoryLabel: 'Opciones Restobar',
    isDiaOnly: true
  },
  {
    id: 'dia_burger',
    name: 'Hamburguesa Mediterránea',
    price: 13.50,
    description: 'Jugosa carne de res artesanal con rúcula, tomates secos, queso feta, y una salsa cremosa de yogur y ajo.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    category: 'restobar',
    categoryLabel: 'Opciones Restobar',
    isDiaOnly: true
  },

  // POSTRES (Día)
  {
    id: 'dia_tiramisu',
    name: 'Tiramisú',
    price: 5.00,
    description: 'Postre italiano clásico elaborado con capas de vainillas bañadas en café, crema de mascarpone y cacao.',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80',
    category: 'postres',
    categoryLabel: 'Postres'
  },
  {
    id: 'dia_baklava',
    name: 'Baklava',
    price: 6.50,
    description: 'Delicado hojaldre de pasta filo relleno de pistachos y nueces trituradas, bañado en almíbar de miel aromática.',
    image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=600&q=80',
    category: 'postres',
    categoryLabel: 'Postres',
    isDiaOnly: true
  },
  {
    id: 'dia_pannacotta_dia',
    name: 'Panna cotta',
    price: 4.50,
    description: 'Clásico flan de crema cocida de vainilla con coulis de frutos rojos o maracuyá.',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80',
    category: 'postres',
    categoryLabel: 'Postres',
    isDiaOnly: true
  },
  {
    id: 'dia_helado',
    name: 'Helado frito',
    price: 5.00,
    description: 'Una bola de helado cremoso rebozada con una costra crujiente y frita rápidamente, con hilos de chocolate.',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80',
    category: 'postres',
    categoryLabel: 'Postres'
  },


  // --- NOCHE / STEAKHOUSE & PARRILLA (Image 3) ---
  // ENTRADAS (Noche)
  {
    id: 'noche_chorizos',
    name: 'Chorizos Criollos',
    price: 8.50,
    description: 'Dos deliciosos chorizos de cerdo artesanales asados a la parrilla, servidos con chimichurri rústico de la casa.',
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6e9473be5?auto=format&fit=crop&w=600&q=80',
    category: 'entradas',
    categoryLabel: 'Entradas',
    isNocheOnly: true
  },
  {
    id: 'noche_mollejas',
    name: 'Mollejas al Limón',
    price: 10.00,
    description: 'Mollejas de ternera tiernas por dentro y bien crujientes por fuera, cocinadas a la parrilla con abundante limón.',
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=600&q=80',
    category: 'entradas',
    categoryLabel: 'Entradas',
    isNocheOnly: true
  },
  {
    id: 'noche_provoleta',
    name: 'Provoleta Grillada',
    price: 11.00,
    description: 'Grueso disco de queso provolone sazonado con orégano y un toque de oliva, gratinado a las brasas.',
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80',
    category: 'entradas',
    categoryLabel: 'Entradas',
    isNocheOnly: true
  },
  {
    id: 'noche_empanadas',
    name: 'Empanadas Criollas (x3)',
    price: 9.50,
    description: 'Tres empanadas tradicionales rellenas de carne jugosa cortada a cuchillo, huevo, cebollín y especias.',
    image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=600&q=80',
    category: 'entradas',
    categoryLabel: 'Entradas',
    isNocheOnly: true
  },
  {
    id: 'noche_chinchulines',
    name: 'Chinchulines Crocantes',
    price: 10.50,
    description: 'Deliciosos chinchulines trenzados y asados a las brasas hasta quedar super crujientes, con limón y sal marina.',
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=600&q=80',
    category: 'entradas',
    categoryLabel: 'Entradas',
    isNocheOnly: true
  },

  // PLATOS FUERTES (Noche - Carnes & Cortes)
  {
    id: 'noche_ojobife',
    name: 'Ojo de Bife',
    price: 28.00,
    description: 'Corte premium de 400 gramos, con excelente marmolado que garantiza máxima jugosidad y sabor asado al término deseado.',
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=600&q=80',
    category: 'platos_fuertes',
    categoryLabel: 'Cortes a la Parrilla',
    isNocheOnly: true
  },
  {
    id: 'noche_bifechorizo',
    name: 'Bife de Chorizo',
    price: 25.00,
    description: 'Corte clásico argentino de 350 gramos con una gruesa capa de grasa lateral que otorga un aroma y sabor excepcionales.',
    image: 'https://images.unsplash.com/photo-1546964124-0cce460f38ef?auto=format&fit=crop&w=600&q=80',
    category: 'platos_fuertes',
    categoryLabel: 'Cortes a la Parrilla',
    isNocheOnly: true
  },
  {
    id: 'noche_parrilladamixta',
    name: 'Parrillada Mixta (Para 2)',
    price: 48.00,
    description: 'Perfecto banquete para compartir: Bife de chorizo, pechuga de pollo, chorizos criollos y tiernas mollejas.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
    category: 'platos_fuertes',
    categoryLabel: 'Cortes a la Parrilla',
    isNocheOnly: true
  },
  {
    id: 'noche_asadotira',
    name: 'Asado de Tira',
    price: 22.00,
    description: 'Tres costillas tiernas y jugosas cortadas transversalmente, asadas pacientemente a fuego lento.',
    image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=600&q=80',
    category: 'platos_fuertes',
    categoryLabel: 'Cortes a la Parrilla',
    isNocheOnly: true
  },
  {
    id: 'noche_entrana',
    name: 'Entraña al Fuego',
    price: 26.00,
    description: 'Fina, tierna y extremadamente sabrosa entraña de 300 gramos, asada rápidamente a fuego fuerte.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    category: 'platos_fuertes',
    categoryLabel: 'Cortes a la Parrilla',
    isNocheOnly: true
  },
  {
    id: 'noche_pollo_limon',
    name: 'Pollo Deshuesado al Limón',
    price: 18.00,
    description: 'Medio pollo deshuesado y grillado a las brasas con aderezo de jugo de limón fresco y hierbas silvestres.',
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=600&q=80',
    category: 'platos_fuertes',
    categoryLabel: 'Cortes a la Parrilla',
    isNocheOnly: true
  },
  {
    id: 'noche_parrillada_estrella',
    name: 'Parrillada Especial Costa Áurea 🥩',
    price: 54.99,
    description: 'Selección de nuestros mejores cortes importados: Entraña tierna, ojo de bife asado, mollejas y chorizos asados. Acompañado de papas doradas rústicas.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
    category: 'platos_fuertes',
    categoryLabel: 'Cortes a la Parrilla',
    isNocheOnly: true
  },

  // OPCIONES TIPO RESTOBAR (Noche)
  {
    id: 'noche_choripan',
    name: 'Choripán Premium',
    price: 12.00,
    description: 'Chorizo artesanal asado en pan crujiente y rústico, con salsa criolla fresca y chimichurri casero.',
    image: 'https://images.unsplash.com/photo-1621510456681-23a23cfb5f57?auto=format&fit=crop&w=600&q=80',
    category: 'restobar',
    categoryLabel: 'Sándwiches de Restobar',
    isNocheOnly: true
  },
  {
    id: 'noche_vacio',
    name: 'Sándwich de Vacío',
    price: 15.00,
    description: 'Carne de vacío desmenuzada, cocida a fuego muy lento con cebollas caramelizadas y provolone derretido.',
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=600&q=80',
    category: 'restobar',
    categoryLabel: 'Sándwiches de Restobar',
    isNocheOnly: true
  },
  {
    id: 'noche_lomito',
    name: 'Lomito Completo',
    price: 17.00,
    description: 'Lomo fino tierno asado a la parrilla, con huevo frito, jamón York, provolone, lechuga y rodaja de tomate fresco.',
    image: 'https://images.unsplash.com/photo-1521305916504-4a1121188589?auto=format&fit=crop&w=600&q=80',
    category: 'restobar',
    categoryLabel: 'Sándwiches de Restobar',
    isNocheOnly: true
  },
  {
    id: 'noche_burger_parrilla',
    name: 'Hamburguesa Parrillera',
    price: 16.00,
    description: 'Carne de res madurada y ahumada, fundida con queso cheddar, bacón crocante, tomate asado y chimichurri.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
    category: 'restobar',
    categoryLabel: 'Sándwiches de Restobar',
    isNocheOnly: true
  },

  // POSTRES (Noche additional items)
  {
    id: 'noche_flan',
    name: 'Flan con Dulce de Leche',
    price: 6.50,
    description: 'Flan cremoso casero de vainilla con su clásico caramelo líquido y abundante porción de dulce de leche colonial.',
    image: 'https://images.unsplash.com/photo-1528975604071-b4daafc3798b?auto=format&fit=crop&w=600&q=80',
    category: 'postres',
    categoryLabel: 'Postres',
    isNocheOnly: true
  },
  {
    id: 'noche_pannacotta_noc',
    name: 'Panna cotta',
    price: 6.50,
    description: 'Delicado flan de crema de vainilla con salsas dulces e hilos de chocolate.',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80',
    category: 'postres',
    categoryLabel: 'Postres',
    isNocheOnly: true
  },
  {
    id: 'noche_crepes',
    name: 'Crepes de Dulce de Leche',
    price: 6.00,
    description: 'Dos crepes finos y templados doblados, rellenos con abundante dulce de leche y espolvoreados con azúcar impalpable.',
    image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=600&q=80',
    category: 'postres',
    categoryLabel: 'Postres',
    isNocheOnly: true
  },


  // --- BEBIDAS (BOTH MODES - WITH ADJUSTMENTS) ---
  // SIN ALCOHOL
  {
    id: 'beb_limonada',
    name: 'Limonada natural',
    price: 3.50,
    description: 'Limonada recién exprimida servida con hielo y rodaja de limón. Muy refrescante.',
    image: 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?auto=format&fit=crop&w=600&q=80',
    category: 'bebidas_sin',
    categoryLabel: 'Bebidas Sin Alcohol'
  },
  {
    id: 'beb_jugos_dia',
    name: 'Jugos naturales (naranja, maracuyá, piña)',
    price: 4.00,
    description: 'Refrescantes jugos elaborados con frutas locales de temporada seleccionadas.',
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=600&q=80',
    category: 'bebidas_sin',
    categoryLabel: 'Bebidas Sin Alcohol',
    isDiaOnly: true
  },
  {
    id: 'beb_jugos_noche',
    name: 'Jugos naturales (naranja, maracuyá, piña)',
    price: 6.50,
    description: 'Refrescantes jugos elaborados con frutas locales de temporada seleccionadas.',
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=600&q=80',
    category: 'bebidas_sin',
    categoryLabel: 'Bebidas Sin Alcohol',
    isNocheOnly: true
  },
  {
    id: 'beb_gaseosas_dia',
    name: 'Gaseosas',
    price: 2.50,
    description: 'Coca Cola, Sprite, Fanta u otras opciones en presentación personal helada.',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
    category: 'bebidas_sin',
    categoryLabel: 'Bebidas Sin Alcohol',
    isDiaOnly: true
  },
  {
    id: 'beb_gaseosas_noche',
    name: 'Gaseosas',
    price: 2.20,
    description: 'Coca Cola, Sprite, Fanta u otras opciones en presentación personal helada.',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
    category: 'bebidas_sin',
    categoryLabel: 'Bebidas Sin Alcohol',
    isNocheOnly: true
  },
  {
    id: 'beb_agua',
    name: 'Agua natural o mineral',
    price: 2.00,
    description: 'Agua pura de manantial embotellada, fría o al clima, con o sin gas.',
    image: 'https://images.unsplash.com/photo-1608885898957-a599fb15ec36?auto=format&fit=crop&w=600&q=80',
    category: 'bebidas_sin',
    categoryLabel: 'Bebidas Sin Alcohol'
  },

  // CON ALCOHOL
  {
    id: 'beb_vinocopa',
    name: 'Vino tinto / blanco / rosado (copa)',
    price: 7.00,
    description: 'Copa de vino seleccionada de nuestra excelente cava para maridar con sus alimentos.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80',
    category: 'bebidas_con',
    categoryLabel: 'Bebidas Con Alcohol'
  },
  {
    id: 'beb_vinobotella',
    name: 'Vino tinto / blanco / rosado (botella)',
    price: 28.00, // can range up to 45.00
    description: 'Botella completa de vino de uvas selectas chilenas o argentinas.',
    image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=600&q=80',
    category: 'bebidas_con',
    categoryLabel: 'Bebidas Con Alcohol'
  },
  {
    id: 'beb_sangria_dia',
    name: 'Sangría',
    price: 8.00,
    description: 'Vino tinto aromático macerado con frutas de estación picadas, triple sec y un toque gasificado.',
    image: 'https://images.unsplash.com/photo-1595981267035-7b04ec84a82d?auto=format&fit=crop&w=600&q=80',
    category: 'bebidas_con',
    categoryLabel: 'Bebidas Con Alcohol',
    isDiaOnly: true
  },
  {
    id: 'beb_sangria_noche',
    name: 'Sangría',
    price: 9.00,
    description: 'Vino tinto aromático macerado con frutas de estación picadas, triple sec y un toque gasificado.',
    image: 'https://images.unsplash.com/photo-1595981267035-7b04ec84a82d?auto=format&fit=crop&w=600&q=80',
    category: 'bebidas_con',
    categoryLabel: 'Bebidas Con Alcohol',
    isNocheOnly: true
  },
  {
    id: 'beb_mojito',
    name: 'Mojito',
    price: 9.00,
    description: 'Refrescante cóctel con ron blanco cubano, hojas frescas de menta maceradas, limón fresco y soda.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    category: 'bebidas_con',
    categoryLabel: 'Bebidas Con Alcohol'
  },
  {
    id: 'beb_margarita',
    name: 'Margarita',
    price: 10.00,
    description: 'Equilibrado cóctel con tequila reposado, triple sec de naranja, jugo de limón y corona de sal en la copa.',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80',
    category: 'bebidas_con',
    categoryLabel: 'Bebidas Con Alcohol'
  },
  {
    id: 'beb_cerveza',
    name: 'Cerveza nacional o importada',
    price: 5.00,
    description: 'Variedad de marcas líderes nacionales o importadas en presentación helada.',
    image: 'https://images.unsplash.com/photo-1538251358624-40d13a00f13f?auto=format&fit=crop&w=600&q=80',
    category: 'bebidas_con',
    categoryLabel: 'Bebidas Con Alcohol'
  }
];

// PRODUCTOS ESTRELLA (Highlighted items at the bottom banner)
export const productosEstrella: MenuItem[] = [
  {
    id: 'estrella_paella',
    name: 'Paella Costa Áurea 🥘',
    price: 24.99,
    description: 'Mezcla de mariscos frescos del Pacífico, arroz bomba mediterráneo sazonado con azafrán auténtico y hierbas exclusivas.',
    image: 'https://images.unsplash.com/photo-1515443961218-a51367888e4b?auto=format&fit=crop&w=600&q=80',
    category: 'estrella',
    categoryLabel: 'Producto Estrella',
    isDiaOnly: true
  },
  {
    id: 'estrella_parrillada',
    name: 'Parrillada Especial Costa Áurea 🥩',
    price: 54.99,
    description: 'Selección de nuestros mejores cortes importados: Entraña tierna, ojo de bife asado, mollejas y chorizos asados. Acompañado de papas doradas rústicas.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
    category: 'estrella',
    categoryLabel: 'Producto Estrella',
    isNocheOnly: true
  },
  {
    id: 'estrella_sunset',
    name: 'Golden Sunset 🍹',
    price: 12.00,
    description: 'Cóctel insignia inspirado en los magníficos atardeceres de Puerto Santa Ana, con maracuyá fresca, naranja, ron añejo y jarabe artesanal.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
    category: 'estrella',
    categoryLabel: 'Producto Estrella'
  }
];

// Helper to filter full menu based on Day/Night theme
export const getFilteredMenu = (isNoche: boolean): MenuItem[] => {
  return fullMenu.filter(item => {
    if (isNoche) {
      return !item.isDiaOnly;
    } else {
      return !item.isNocheOnly;
    }
  });
};
