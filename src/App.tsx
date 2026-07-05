import React, { useState, useEffect, useMemo } from 'react';
import { 
  motion, 
  AnimatePresence 
} from 'motion/react';
import { 
  Utensils, 
  ShoppingBag, 
  ClipboardList, 
  User as UserIcon, 
  Sun, 
  Moon, 
  Plus, 
  Minus, 
  Trash2, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Check, 
  Sparkles, 
  ChevronRight, 
  Info, 
  AlertCircle,
  Truck,
  Flame,
  Search,
  CheckCircle2,
  SlidersHorizontal,
  Compass,
  FileText
} from 'lucide-react';
import { menuDelDia, fullMenu, productosEstrella, getFilteredMenu } from './data';
import { MenuItem, CartItem, Order, UserProfile } from './types';

export default function App() {
  // STATE MANAGEMENT
  const [isNoche, setIsNoche] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'menu' | 'carrito' | 'pedidos' | 'perfil'>('menu');
  const [menuView, setMenuView] = useState<'dia' | 'completo'>('completo'); // Defaults to completo to show full menu
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Quantities currently selected on cards (not yet added or to adjust increment on card)
  const [cardQuantities, setCardQuantities] = useState<Record<string, number>>({});

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // User Profile preloaded with instructions
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: 'a3@unemi.edu.ec',
    phone: '+593 999 9999',
    address: 'Edificio Torres de la Alborada, Dpto 4B, Guayaquil',
    preferredTheme: 'noche'
  });
  
  // Orders history and tracking
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'CA-9842',
      date: '04 Jul 2026, 14:32',
      items: [
        {
          item: {
            id: 'dia_egriega',
            name: 'Ensalada griega',
            price: 8.50,
            description: '',
            image: '',
            category: 'entradas',
            categoryLabel: 'Entradas'
          },
          quantity: 1
        },
        {
          item: {
            id: 'dia_pesto',
            name: 'Pasta al pesto',
            price: 13.00,
            description: '',
            image: '',
            category: 'platos_fuertes',
            categoryLabel: 'Platos Fuertes'
          },
          quantity: 2
        }
      ],
      subtotal: 34.50,
      tax: 4.14,
      total: 38.64,
      status: 'entregado',
      paymentMethod: 'Tarjeta de Crédito',
      customerDetails: {
        name: '',
        email: 'a3@unemi.edu.ec',
        phone: '+593 98 765 4321',
        address: 'Edificio Torres de la Alborada, Dpto 4B, Guayaquil'
      }
    }
  ]);
  
  // Checkout form state
  const [checkoutName, setCheckoutName] = useState(profile.name);
  const [checkoutEmail, setCheckoutEmail] = useState(profile.email);
  const [checkoutPhone, setCheckoutPhone] = useState(profile.phone);
  const [checkoutAddress, setCheckoutAddress] = useState(profile.address);
  const [checkoutType, setCheckoutType] = useState<'mesa' | 'delivery'>('mesa');
  const [tableNumber, setTableNumber] = useState<string>('5');
  const [paymentMethod, setPaymentMethod] = useState<string>('tarjeta');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<string | null>(null);

  // Sync profile edits
  useEffect(() => {
    setCheckoutName(profile.name);
    setCheckoutEmail(profile.email);
    setCheckoutPhone(profile.phone);
    setCheckoutAddress(profile.address);
  }, [profile]);

  // Validation
  useEffect(() => {
    if (checkoutEmail.trim() === '') {
      setEmailError(false);
    } else {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(!re.test(checkoutEmail));
    }
  }, [checkoutEmail]);

  // Simulated live order tracker state advancing
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(prevOrders => {
        return prevOrders.map(order => {
          if (order.status === 'recibido') {
            triggerToast('👨‍🍳 Su pedido ha comenzado a prepararse en cocina.');
            return { ...order, status: 'preparacion' };
          } else if (order.status === 'preparacion') {
            triggerToast(order.paymentMethod === 'mesa' ? '🍽️ Su comida está lista para servirse en su mesa.' : '🛵 El motorizado ha salido con su pedido.');
            return { ...order, status: 'camino' };
          }
          return order;
        });
      });
    }, 25000); // Progress order status every 25s for realistic demonstration
    return () => clearInterval(interval);
  }, []);

  // Filter full menu dynamically
  const filteredMenuItems = useMemo(() => {
    let items = getFilteredMenu(isNoche);
    
    if (selectedCategory !== 'todos') {
      items = items.filter(item => item.category === selectedCategory);
    }
    
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      items = items.filter(item => 
        item.name.toLowerCase().includes(q) || 
        item.description.toLowerCase().includes(q)
      );
    }
    
    return items;
  }, [isNoche, selectedCategory, searchQuery]);

  // Unique categories helper
  const categories = useMemo(() => {
    const items = getFilteredMenu(isNoche);
    const set = new Set<string>();
    const list: { id: string; label: string }[] = [{ id: 'todos', label: 'Todos' }];
    
    items.forEach(item => {
      if (!set.has(item.category)) {
        set.add(item.category);
        list.push({ id: item.category, label: item.categoryLabel });
      }
    });
    
    return list;
  }, [isNoche]);

  // Toast trigger
  const triggerToast = (message: string) => {
    setShowToast(message);
    setTimeout(() => {
      setShowToast(null);
    }, 35000 / 10); // Show for 3.5 seconds
  };

  // CART OPERATIONS
  const handleCardQtyChange = (itemId: string, increment: boolean) => {
    setCardQuantities(prev => {
      const current = prev[itemId] || 0;
      const next = increment ? current + 1 : Math.max(0, current - 1);
      return { ...prev, [itemId]: next };
    });
  };

  const handleAddToCart = (item: MenuItem, directQuantity?: number) => {
    const qtyToAdd = directQuantity !== undefined ? directQuantity : (cardQuantities[item.id] || 1);
    
    if (qtyToAdd <= 0) {
      triggerToast('Seleccione al menos 1 unidad para añadir.');
      return;
    }

    setCart(prevCart => {
      const existing = prevCart.find(cartItem => cartItem.item.id === item.id);
      if (existing) {
        return prevCart.map(cartItem => 
          cartItem.item.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + qtyToAdd } 
            : cartItem
        );
      } else {
        return [...prevCart, { item, quantity: qtyToAdd }];
      }
    });

    triggerToast(`¡Añadido ${qtyToAdd}x ${item.name} al carrito! 🛒`);
    
    // Reset quantity input back on card
    setCardQuantities(prev => ({ ...prev, [item.id]: 0 }));
  };

  const handleUpdateCartQty = (itemId: string, increment: boolean) => {
    setCart(prevCart => {
      return prevCart.map(cartItem => {
        if (cartItem.item.id === itemId) {
          const newQty = increment ? cartItem.quantity + 1 : cartItem.quantity - 1;
          return { ...cartItem, quantity: Math.max(1, newQty) };
        }
        return cartItem;
      });
    });
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart(prevCart => prevCart.filter(cartItem => cartItem.item.id !== itemId));
    triggerToast('Plato eliminado del carrito.');
  };

  // Calculations
  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, cartItem) => acc + (cartItem.item.price * cartItem.quantity), 0);
  }, [cart]);

  const cartTax = useMemo(() => {
    return cartSubtotal * 0.12; // 12% IVA Ecuador
  }, [cartSubtotal]);

  const cartTotal = useMemo(() => {
    return cartSubtotal + cartTax;
  }, [cartSubtotal, cartTax]);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    if (emailError || checkoutName.trim() === '' || checkoutPhone.trim() === '') {
      triggerToast('Por favor llene los datos obligatorios válidos.');
      return;
    }
    if (checkoutType === 'delivery' && checkoutAddress.trim() === '') {
      triggerToast('Por favor especifique la dirección de entrega.');
      return;
    }

    const orderId = `CA-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const dateStr = now.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }) + `, ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const newOrder: Order = {
      id: orderId,
      date: dateStr,
      items: [...cart],
      subtotal: cartSubtotal,
      tax: cartTax,
      total: cartTotal,
      status: 'recibido',
      paymentMethod: paymentMethod === 'tarjeta' ? 'Tarjeta de Crédito/Débito' : paymentMethod === 'efectivo' ? 'Efectivo' : 'Transferencia Bancaria',
      customerDetails: {
        name: checkoutName,
        email: checkoutEmail,
        phone: checkoutPhone,
        address: checkoutType === 'mesa' ? `Mesa de Servicio #${tableNumber}` : checkoutAddress
      }
    };

    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setActiveTab('pedidos');
    triggerToast(`🎉 ¡Pedido ${orderId} realizado con éxito! Siga el estado en vivo.`);
  };

  const handleAdvanceOrderStatus = (orderId: string) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        let nextStatus: Order['status'] = order.status;
        if (order.status === 'recibido') nextStatus = 'preparacion';
        else if (order.status === 'preparacion') nextStatus = 'camino';
        else if (order.status === 'camino') nextStatus = 'entregado';
        
        triggerToast(`Pedido ${orderId} avanzado a: ${
          nextStatus === 'preparacion' ? 'En Cocina' : nextStatus === 'camino' ? 'Listo / En Camino' : 'Entregado'
        }`);
        return { ...order, status: nextStatus };
      }
      return order;
    }));
  };

  // Helper theme-based styling class generators
  const getThemeBgClass = () => {
    return isNoche 
      ? 'bg-[#122437] text-white transition-colors duration-500' 
      : 'bg-[#203E5F] text-white transition-colors duration-500';
  };

  const getThemeCardClass = () => {
    return isNoche
      ? 'bg-[#182D42] border border-[#C9A84C]/25 text-white rounded-none overflow-hidden transition-all duration-300'
      : 'bg-[#1A334F] border border-[#C9A84C]/20 text-white rounded-none overflow-hidden transition-all duration-300';
  };

  const getThemeTextMutedClass = () => {
    return isNoche ? 'text-white/70' : 'text-white/75';
  };

  const getThemeAccentClass = () => {
    return 'text-[#C9A84C] font-serif italic';
  };

  const getThemeAccentBgClass = () => {
    return isNoche ? 'bg-[#C9A84C] text-[#122437]' : 'bg-[#C9A84C] text-[#203E5F]';
  };

  const getThemeAccentBorderClass = () => {
    return 'border-[#C9A84C]/30';
  };

  const getThemeButtonPrimary = () => {
    return isNoche
      ? 'bg-[#C9A84C] hover:bg-[#d6b75c] text-[#122437] text-xs font-sans tracking-widest uppercase font-bold transition-all duration-200 cursor-pointer rounded-none border border-[#C9A84C]/20'
      : 'bg-[#C9A84C] hover:bg-[#d6b75c] text-[#203E5F] text-xs font-sans tracking-widest uppercase font-bold transition-all duration-200 cursor-pointer rounded-none border border-[#C9A84C]/20';
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans ${getThemeBgClass()}`}>
      
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-md bg-[#1A334F] text-white px-4 py-3 rounded-none shadow-xl flex items-center justify-between border border-[#C9A84C]/40"
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#C9A84C] animate-pulse flex-shrink-0" />
              <span className="text-sm font-medium">{showToast}</span>
            </div>
            <button onClick={() => setShowToast(null)} className="text-white/60 hover:text-white ml-2 text-xs">
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP BRAND HEADER */}
      <header className={`sticky top-0 z-40 px-4 py-4 border-b transition-colors duration-500 ${
        isNoche 
          ? 'bg-[#122437] border-[#C9A84C]/15 shadow-none' 
          : 'bg-[#203E5F] border-[#C9A84C]/15 shadow-none'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Sun/Wave custom SVG logo */}
            <svg className="w-8 h-8" viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 15c-19.3 0-35 15.7-35 35s15.7 35 35 35 35-15.7 35-35-15.7-35-35-35zm0 6c16 0 29 13 29 29S66 79 50 79 21 66 21 50s13-29 29-29z" opacity=".2"/>
              <circle cx="50" cy="46" r="14" fill={isNoche ? '#ffffff' : '#C9A84C'}/>
              <path d="M20 62c8 4 16-2 24-2s15 6 22 6 15-4 22-2" stroke={isNoche ? '#ffffff' : '#C9A84C'} strokeWidth="4" strokeLinecap="round" fill="none"/>
              <path d="M30 70c6 2 12-1 18-1s12 3 17 3 11-2 16-1" stroke={isNoche ? '#ffffff' : '#C9A84C'} strokeWidth="3" strokeLinecap="round" fill="none"/>
            </svg>
            <div>
              <h1 className="text-2xl md:text-3xl font-light italic leading-none">
                Costa <span className="font-sans not-italic font-black text-xl ml-1 uppercase tracking-tighter">Áurea</span>
              </h1>
              <p className="text-[10px] tracking-[0.25em] uppercase font-sans mt-0.5 font-bold opacity-65 text-white">
                Cocina Mediterránea & Parrilla
              </p>
            </div>
          </div>
          
          {/* Day / Night Theme Shift Toggle Switch */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => {
                setIsNoche(!isNoche);
                triggerToast(isNoche ? '💡 Cambiado a ambiente de Día (Mediterráneo)' : '🕯️ Cambiado a ambiente de Noche (Steakhouse & Parrilla)');
              }}
              className={`relative flex items-center h-8 w-20 rounded-full p-1 transition-all duration-300 border cursor-pointer ${
                isNoche 
                  ? 'bg-[#182D42] border-[#C9A84C]/20' 
                  : 'bg-[#1A334F] border-[#C9A84C]/20'
              }`}
              title="Alternar ambiente de Restaurante"
            >
              {/* Pill background label */}
              <span className={`absolute text-[9px] uppercase tracking-wider font-bold right-2.5 transition-all duration-300 ${isNoche ? 'opacity-0' : 'text-white opacity-100'}`}>
                Día
              </span>
              <span className={`absolute text-[9px] uppercase tracking-wider font-bold left-2 text-white transition-all duration-300 ${isNoche ? 'opacity-100' : 'opacity-0'}`}>
                Noche
              </span>
              
              {/* Floating circle */}
              <div className={`w-6 h-6 rounded-full flex items-center justify-center transform transition-transform duration-300 shadow-sm ${
                isNoche ? 'translate-x-12 bg-[#C9A84C]' : 'translate-x-0 bg-[#C9A84C]'
              }`}>
                {isNoche ? (
                  <Moon className="w-3.5 h-3.5 text-[#122437]" />
                ) : (
                  <Sun className="w-3.5 h-3.5 text-[#203E5F]" />
                )}
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 pb-24 md:pb-8 flex flex-col">
        
        {/* TAB 1: MENU VIEWER */}
        {activeTab === 'menu' && (
          <div className="flex-1 flex flex-col gap-6">
            
            {/* HERO BANNER SECTION */}
            <div className={`p-8 rounded-none relative overflow-hidden flex flex-col md:flex-row items-center gap-6 transition-all duration-500 border ${
              isNoche 
                ? 'bg-[#122437] border-[#C9A84C]/15 text-white' 
                : 'bg-[#1A334F] border-[#C9A84C]/15 text-white'
            }`}>
              {/* Radial dot matrix pattern overlay */}
              <div 
                className="absolute inset-0 opacity-[0.15] pointer-events-none" 
                style={{ 
                  backgroundImage: `radial-gradient(${isNoche ? '#ffffff' : '#C9A84C'} 1px, transparent 1px)`, 
                  backgroundSize: '18px 18px' 
                }}
              ></div>

              {/* Left Column Text */}
              <div className="flex-1 z-10 text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] tracking-[0.25em] font-sans font-bold uppercase mb-3 bg-[#C9A84C]/10 text-[#C9A84C]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isNoche ? 'Experiencia Gourmet de Noche' : 'Garantía del Día'}</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-light italic mb-4 leading-tight tracking-tight text-white">
                  {isNoche ? 'Parrilla & Steakhouse' : 'Cocina Mediterránea'}
                </h2>
                <p className="text-xs md:text-sm leading-relaxed max-w-xl opacity-80 mb-6 font-sans text-white/90">
                  {isNoche 
                    ? 'Selección premium de los mejores cortes de carne asados a la brasa ardiente, acompañados de entrantes clásicos criollos en una atmósfera íntima.' 
                    : 'Platos frescos y ligeros, perfectos para disfrutar durante el mediodía con nuestra fina selección de ingredientes de temporada.'
                  }
                </p>
                
                {/* Location Badge */}
                <div className="flex items-center justify-center md:justify-start gap-2 text-[10px] uppercase tracking-widest font-sans font-bold opacity-60">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Puerto Santa Ana, Guayaquil, Ecuador</span>
                </div>
              </div>

              {/* Decorative Right Image */}
              <div className="w-full md:w-1/3 h-44 rounded-none overflow-hidden relative border border-[#C9A84C]/10 z-10">
                <img 
                  src={isNoche 
                    ? 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80' 
                    : 'https://images.unsplash.com/photo-1515443961218-a51367888e4b?auto=format&fit=crop&w=600&q=80'
                  } 
                  alt="Banner de temporada" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#122437]/80 to-transparent flex items-end p-4">
                  <span className="text-white text-[10px] font-sans font-bold uppercase tracking-[0.2em]">
                    {isNoche ? 'Brasa & Fuego' : 'Frescura del Mar'}
                  </span>
                </div>
              </div>
            </div>

            {/* VIEW SELECTOR TOGGLES (Menú del Día vs Carta Completa) */}
            <div className={`flex flex-col sm:flex-row gap-4 items-center justify-between border-b pb-4 ${isNoche ? 'border-[#C9A84C]/10' : 'border-[#C9A84C]/10'}`}>
              <div className={`flex p-1 rounded-none border ${
                isNoche 
                  ? 'bg-[#182D42]/80 border-[#C9A84C]/15' 
                  : 'bg-[#1A334F]/80 border-[#C9A84C]/15'
              }`}>
                <button
                  onClick={() => setMenuView('completo')}
                  className={`px-4 py-2 rounded-none text-[10px] tracking-[0.15em] uppercase font-sans font-bold transition-all duration-200 cursor-pointer ${
                    menuView === 'completo'
                      ? (isNoche ? 'bg-[#C9A84C] text-[#122437]' : 'bg-[#C9A84C] text-[#203E5F]')
                      : 'text-white/60 hover:bg-white/5'
                  }`}
                >
                  Carta Completa
                </button>
                <button
                  onClick={() => {
                    setMenuView('dia');
                    setSelectedCategory('todos');
                  }}
                  className={`px-4 py-2 rounded-none text-[10px] tracking-[0.15em] uppercase font-sans font-bold transition-all duration-200 cursor-pointer ${
                    menuView === 'dia'
                      ? (isNoche ? 'bg-[#C9A84C] text-[#122437]' : 'bg-[#C9A84C] text-[#203E5F]')
                      : 'text-white/60 hover:bg-white/5'
                  }`}
                >
                  Menú del Día
                </button>
              </div>

              {/* Search Bar (Only shown for Carta Completa) */}
              {menuView === 'completo' && (
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
                  <input
                    type="text"
                    placeholder="Buscar plato o bebida..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full text-xs pl-9 pr-4 py-2 rounded-none focus:outline-none focus:ring-1 border transition-all ${
                      isNoche 
                        ? 'bg-[#182D42] border-[#C9A84C]/20 text-white focus:ring-[#C9A84C] focus:border-[#C9A84C]' 
                        : 'bg-[#1A334F] border-[#C9A84C]/20 text-white focus:ring-[#C9A84C] focus:border-[#C9A84C]'
                    }`}
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')} 
                      className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* CATEGORY SELECTOR PILLS (Only shown for Carta Completa) */}
            {menuView === 'completo' && (
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-1.5 rounded-none text-[10px] font-bold uppercase tracking-wider whitespace-nowrap border transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? getThemeAccentBgClass() + ' border-transparent shadow-none'
                        : isNoche
                          ? 'bg-[#182D42] border-[#C9A84C]/15 text-white/70 hover:bg-[#1C3754]'
                          : 'bg-[#1A334F] border-[#C9A84C]/15 text-white/70 hover:bg-[#203E5F]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            )}

            {/* DISH CARDS LAYOUT CONTAINER */}
            <div>
              {menuView === 'dia' ? (
                /* --- MODE: MENÚ DEL DÍA (IMAGE 1 STYLE) --- */
                <div className="flex flex-col gap-6 max-w-2xl mx-auto">
                  <div className="text-center mb-4">
                    <h3 className="text-3xl font-light italic mb-1 text-white">Menú del Día</h3>
                    <p className={`text-xs max-w-md mx-auto opacity-75 ${getThemeTextMutedClass()}`}>
                      Disfruta de nuestros platos insignia servidos hoy con rapidez. Incluye cortesía de pan rústico de la casa.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-8">
                    {menuDelDia.map(dish => {
                      const qty = cardQuantities[dish.id] || 0;
                      return (
                        <div key={dish.id} className={getThemeCardClass()}>
                          {/* Image container 4:3 */}
                          <div className="aspect-[4/3] w-full overflow-hidden relative">
                            <img 
                               src={dish.image} 
                               alt={dish.name} 
                               className="w-full h-full object-cover transition-transform duration-700 hover:scale-102"
                               referrerPolicy="no-referrer"
                            />
                            <div className={`absolute top-4 right-4 text-xs font-sans px-3 py-1 rounded-none font-bold tracking-wider ${
                              isNoche ? 'bg-[#C9A84C] text-[#122437]' : 'bg-[#C9A84C] text-[#203E5F]'
                            }`}>
                              ${dish.price.toFixed(2)}
                            </div>
                          </div>
                          
                          {/* Details panel */}
                          <div className="p-6 flex flex-col gap-4">
                            <div className="flex items-baseline justify-between gap-4 border-b pb-2 border-current/10">
                              <h4 className="text-2xl font-light italic text-white">
                                {dish.name}
                              </h4>
                              <span className="text-lg font-bold font-sans tracking-tight text-[#C9A84C]">
                                ${dish.price.toFixed(2)}
                              </span>
                            </div>
                            
                            <p className={`text-sm leading-relaxed opacity-80 ${getThemeTextMutedClass()}`}>
                              {dish.description}
                            </p>
                            
                            <div className="pt-2 flex items-center justify-between gap-4">
                              {/* Quantity Counter component */}
                              <div className={`flex items-center border rounded-none h-10 px-2 ${
                                isNoche ? 'border-[#C9A84C]/20 bg-[#122437]/50' : 'border-[#C9A84C]/20 bg-[#203E5F]/50'
                              }`}>
                                <button 
                                  onClick={() => handleCardQtyChange(dish.id, false)}
                                  className="w-8 h-full flex items-center justify-center transition-opacity hover:opacity-70 font-bold text-lg"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-10 text-center text-sm font-sans font-bold">
                                  {qty}
                                </span>
                                <button 
                                  onClick={() => handleCardQtyChange(dish.id, true)}
                                  className="w-8 h-full flex items-center justify-center transition-opacity hover:opacity-70 font-bold text-lg"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>

                              {/* Action Button */}
                              <button
                                onClick={() => handleAddToCart(dish, qty > 0 ? qty : 1)}
                                className={`flex-1 h-10 rounded-none flex items-center justify-center gap-2 px-6 ${getThemeButtonPrimary()}`}
                              >
                                <ShoppingBag className="w-4 h-4" />
                                <span>{qty > 0 ? `Añadir (${qty})` : 'Añadir al Pedido'}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* --- MODE: CARTA COMPLETA (FLEXIBLE GRID & DOT LEADERS) --- */
                <div className="flex flex-col gap-10">
                  {filteredMenuItems.length === 0 ? (
                    <div className={`text-center py-16 rounded-none border border-dashed ${
                      isNoche ? 'border-[#C9A84C]/20 bg-[#182D42]/20' : 'border-[#C9A84C]/20 bg-[#1A334F]/20'
                    }`}>
                      <AlertCircle className="w-10 h-10 mx-auto mb-3 opacity-60" />
                      <p className="text-sm font-bold tracking-wide">No se encontraron platos que coincidan con la búsqueda.</p>
                      <button 
                        onClick={() => { setSearchQuery(''); setSelectedCategory('todos'); }} 
                        className="text-xs uppercase tracking-widest underline mt-4 font-bold cursor-pointer opacity-80 hover:opacity-100"
                      >
                        Ver todos los platos
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredMenuItems.map(dish => {
                        const qty = cardQuantities[dish.id] || 0;
                        return (
                          <div key={dish.id} className={getThemeCardClass()}>
                            {/* Card Header image */}
                            <div className="aspect-[16/10] w-full relative overflow-hidden bg-transparent">
                              <img 
                                src={dish.image} 
                                alt={dish.name} 
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-102"
                                referrerPolicy="no-referrer"
                              />
                              <div className={`absolute top-2 left-2 text-[8px] uppercase tracking-[0.2em] font-sans font-bold px-2 py-1 rounded-none ${
                                isNoche ? 'bg-[#C9A84C] text-[#122437]' : 'bg-[#C9A84C] text-[#203E5F]'
                              }`}>
                                {dish.categoryLabel}
                              </div>
                            </div>

                            {/* Card Content body */}
                            <div className="p-5 flex flex-col gap-3">
                              <div className="flex items-start justify-between gap-2 border-b pb-1.5 border-current/10">
                                <h4 className="font-serif font-light italic text-lg leading-tight tracking-tight text-white">
                                  {dish.name}
                                </h4>
                                <span className="font-sans font-bold text-sm tracking-tight shrink-0 text-[#C9A84C]">
                                  ${dish.price.toFixed(2)}
                                </span>
                              </div>
                              
                              <p className={`text-xs line-clamp-2 leading-relaxed min-h-[2.5rem] opacity-75 ${getThemeTextMutedClass()}`}>
                                {dish.description}
                              </p>

                              {/* Interactive selector block */}
                              <div className="pt-1 flex items-center justify-between gap-2">
                                <div className={`flex items-center border rounded-none h-8 px-1.5 ${
                                  isNoche ? 'border-[#C9A84C]/20 bg-[#122437]/50' : 'border-[#C9A84C]/20 bg-[#203E5F]/50'
                                }`}>
                                  <button 
                                    onClick={() => handleCardQtyChange(dish.id, false)}
                                    className="w-5 h-full flex items-center justify-center transition-opacity hover:opacity-75 font-bold text-xs"
                                  >
                                    <Minus className="w-3.5 h-3.5" />
                                  </button>
                                  <span className="w-7 text-center text-xs font-sans font-bold">
                                    {qty}
                                  </span>
                                  <button 
                                    onClick={() => handleCardQtyChange(dish.id, true)}
                                    className="w-5 h-full flex items-center justify-center transition-opacity hover:opacity-75 font-bold text-xs"
                                  >
                                    <Plus className="w-3.5 h-3.5" />
                                  </button>
                                </div>

                                <button
                                  onClick={() => handleAddToCart(dish, qty > 0 ? qty : 1)}
                                  className={`flex-1 h-8 rounded-none text-[10px] px-3 flex items-center justify-center gap-1.5 ${getThemeButtonPrimary()}`}
                                >
                                  <ShoppingBag className="w-3.5 h-3.5" />
                                  <span>{qty > 0 ? `Añadir (${qty})` : 'Añadir'}</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Leader Dot Print Style Quick View List (Traditional Restaurant feel) */}
                  <div className={`p-6 md:p-8 rounded-none border ${
                    isNoche 
                      ? 'bg-[#122437] border-[#C9A84C]/15 text-white' 
                      : 'bg-[#1A334F] border-[#C9A84C]/15 text-white'
                  }`}>
                    <div className="text-center mb-6">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <FileText className="w-5 h-5 opacity-70" />
                        <h3 className="text-2xl font-serif font-light italic">Carta Clásica Resumida</h3>
                      </div>
                      <p className={`text-xs max-w-sm mx-auto opacity-70 ${getThemeTextMutedClass()}`}>
                        Formato tradicional de mesa con listado rápido de especialidades y acompañantes.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 font-serif">
                      {getFilteredMenu(isNoche).slice(0, 10).map(item => (
                        <div key={'dot_' + item.id} className="flex items-end justify-between py-1 group hover:bg-[#C9A84C]/5 rounded px-2 -mx-2 transition-all">
                          <div className="font-medium text-sm">
                            {item.name}
                            <span className="block font-sans font-normal text-[10px] opacity-60 line-clamp-1 mt-0.5">
                              {item.description}
                            </span>
                          </div>
                          <div className="dot-leader hidden sm:block flex-1 mx-2 border-b border-dotted opacity-35 border-current"></div>
                          <div className="font-sans text-sm font-bold shrink-0 ml-2">
                            ${item.price.toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <p className={`text-center text-[10px] italic mt-6 opacity-60 ${getThemeTextMutedClass()}`}>
                      * Los precios incluyen todos los impuestos locales vigentes en Puerto Santa Ana.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* HIGH-END FEATURED PRODUCT ESTRELLA BANNER */}
            <div className={`mt-4 p-8 rounded-none border ${
              isNoche 
                ? 'bg-[#122437] border-[#C9A84C]/15 text-white' 
                : 'bg-[#1A334F] border-[#C9A84C]/15 text-white'
            }`}>
              <div className="flex items-center gap-2 mb-6 border-b pb-2 border-current/15">
                <Flame className="w-5 h-5 text-red-500" />
                <h3 className="text-xl font-serif font-light italic">
                  Especialidades de la Casa
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {productosEstrella
                  .filter(item => isNoche ? !item.isDiaOnly : !item.isNocheOnly)
                  .map(starItem => (
                    <div 
                      key={starItem.id} 
                      className={`flex flex-col sm:flex-row gap-4 p-4 rounded-none border transition-all ${
                        isNoche 
                          ? 'bg-[#182D42] border-[#C9A84C]/15 text-white' 
                          : 'bg-[#1A334F] border-[#C9A84C]/15 text-white'
                      }`}
                    >
                      <img 
                        src={starItem.image} 
                        alt={starItem.name} 
                        className="w-full sm:w-24 h-24 object-cover rounded-none border border-current/10 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-serif font-medium text-sm italic">{starItem.name}</h4>
                          <p className="text-[11px] opacity-75 line-clamp-2 mt-1 font-sans">
                            {starItem.description}
                          </p>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <span className="font-sans font-bold text-sm">
                            ${starItem.price.toFixed(2)}
                          </span>
                          <button
                            onClick={() => handleAddToCart(starItem, 1)}
                            className={`rounded-none text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 transition-opacity hover:opacity-80 cursor-pointer ${
                              isNoche ? 'bg-[#C9A84C] text-[#122437]' : 'bg-[#C9A84C] text-[#203E5F]'
                            }`}
                          >
                            Pedir Estrella
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* CONSUMPTION PRICE GUIDELINES BANNER */}
            <div className={`p-6 md:p-8 rounded-none border ${
              isNoche 
                ? 'bg-[#122437] border-[#C9A84C]/15 text-white' 
                : 'bg-[#1A334F] border-[#C9A84C]/15 text-white'
            }`}>
              <h4 className="text-center font-serif font-light italic text-xl mb-6">
                Promedio de Consumo por Cliente
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className={`p-4 rounded-none border ${
                  isNoche ? 'border-[#C9A84C]/10 bg-[#182D42]' : 'border-[#C9A84C]/10 bg-[#1A334F]'
                }`}>
                  <div className="text-[9px] uppercase font-bold tracking-widest opacity-60 mb-1 text-[#C9A84C]">CONSUMO BÁSICO</div>
                  <div className="text-xl font-light italic font-serif text-white">$25 a $35</div>
                  <div className="text-[10px] opacity-60 mt-1 font-sans">Entrada + Plato Fuerte + Bebida</div>
                </div>
                <div className={`p-4 rounded-none border relative ${
                  isNoche ? 'border-[#C9A84C]/25 bg-[#182D42]' : 'border-[#C9A84C]/25 bg-[#1A334F]'
                }`}>
                  <div className={`absolute -top-2.5 left-1/2 -translate-x-1/2 text-[8px] font-sans font-bold px-2 py-0.5 rounded-none uppercase tracking-widest ${
                    isNoche ? 'bg-[#C9A84C] text-[#122437]' : 'bg-[#C9A84C] text-[#203E5F]'
                  }`}>Recomendado</div>
                  <div className="text-[9px] uppercase font-bold tracking-widest opacity-60 mb-1 text-[#C9A84C]">EXPERIENCIA COMPLETA</div>
                  <div className="text-xl font-light italic font-serif text-white">$40 a $60</div>
                  <div className="text-[10px] opacity-60 mt-1 font-sans">Entrada + Fuerte + Postre + Cóctel</div>
                </div>
                <div className={`p-4 rounded-none border ${
                  isNoche ? 'border-[#C9A84C]/10 bg-[#182D42]' : 'border-[#C9A84C]/10 bg-[#1A334F]'
                }`}>
                  <div className="text-[9px] uppercase font-bold tracking-widest opacity-60 mb-1 text-[#C9A84C]">CONSUMO NOCTURNO</div>
                  <div className="text-xl font-light italic font-serif text-white">$20 a $50</div>
                  <div className="text-[10px] opacity-60 mt-1 font-sans">Depende de Cócteles & Opciones</div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: SHOPPING CART (CARRITO) */}
        {activeTab === 'carrito' && (
          <div className="max-w-3xl w-full mx-auto flex flex-col gap-6">
            
            <h2 className="text-3xl font-serif font-light italic pb-2 border-b border-current/10">
              Mi Pedido
            </h2>

            {cart.length === 0 ? (
              <div className={`text-center py-16 rounded-none border ${
                isNoche ? 'bg-[#122437] border-[#C9A84C]/15 text-white' : 'bg-[#1A334F] border-[#C9A84C]/15 text-white'
              } p-8 shadow-none`}>
                <ShoppingBag className="w-16 h-16 mx-auto opacity-50 mb-4" />
                <h3 className="text-xl font-serif font-light italic mb-1">Su carrito está vacío</h3>
                <p className="text-xs opacity-75 max-w-sm mx-auto mb-6">
                  Explore nuestro menú mediterráneo o de parrilla y añada platos para comenzar su experiencia gastronómica.
                </p>
                <button
                  onClick={() => setActiveTab('menu')}
                  className={`px-6 py-2.5 rounded-none ${getThemeButtonPrimary()}`}
                >
                  Explorar la Carta
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                
                {/* Cart Items List */}
                <div className="lg:col-span-2 flex flex-col gap-4">
                  {cart.map(cartItem => (
                    <div 
                      key={'cart_' + cartItem.item.id}
                      className={`flex gap-4 p-4 border rounded-none items-center justify-between ${
                        isNoche ? 'bg-[#182D42] border-[#C9A84C]/15 text-white' : 'bg-[#1A334F] border-[#C9A84C]/15 text-white'
                      }`}
                    >
                      <img 
                        src={cartItem.item.image} 
                        alt={cartItem.item.name} 
                        className="w-16 h-16 object-cover rounded-none border border-current/10 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif font-medium text-sm italic truncate">
                          {cartItem.item.name}
                        </h4>
                        <p className="text-xs font-sans font-bold opacity-70 mt-0.5">
                          ${cartItem.item.price.toFixed(2)} c/u
                        </p>
                      </div>

                      {/* Quantity adjusting panel */}
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={() => handleUpdateCartQty(cartItem.item.id, false)}
                          className="w-7 h-7 border border-current/30 rounded-none flex items-center justify-center hover:bg-current/10 transition-all text-xs cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-sans font-bold">
                          {cartItem.quantity}
                        </span>
                        <button 
                          onClick={() => handleUpdateCartQty(cartItem.item.id, true)}
                          className="w-7 h-7 border border-current/30 rounded-none flex items-center justify-center hover:bg-current/10 transition-all text-xs cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Delete item button */}
                      <button
                        onClick={() => handleRemoveFromCart(cartItem.item.id)}
                        className="p-2 opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
                        title="Eliminar de mi orden"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {/* Pricing Subtotal Block */}
                  <div className={`p-5 rounded-none border text-xs flex flex-col gap-2.5 ${
                    isNoche ? 'bg-[#122437] border-[#C9A84C]/15 text-white' : 'bg-[#1A334F]/80 border-[#C9A84C]/15 text-white'
                  }`}>
                    <div className="flex justify-between items-center opacity-80">
                      <span>Subtotal de consumo:</span>
                      <span className="font-sans font-bold text-sm">${cartSubtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center opacity-80">
                      <span>Impuesto local IVA (12%):</span>
                      <span className="font-sans font-bold text-sm">${cartTax.toFixed(2)}</span>
                    </div>
                    <hr className="border-current/10" />
                    <div className="flex justify-between items-center font-serif text-sm font-bold">
                      <span className="text-brand-wood dark:text-brand-accent-gold uppercase tracking-wider">Monto Total a Pagar:</span>
                      <span className="font-mono text-base text-brand-burgundy dark:text-white">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Checkout Order Form */}
                <div className={`p-6 rounded-none border flex flex-col gap-4 ${
                  isNoche ? 'bg-[#122437] border-[#C9A84C]/15 text-white' : 'bg-[#1A334F] border-[#C9A84C]/15 text-white'
                }`}>
                  <h3 className="font-serif font-light italic text-lg border-b pb-1.5 uppercase tracking-wider">
                    Confirmar Pedido
                  </h3>

                  <form onSubmit={handlePlaceOrder} className="flex flex-col gap-4 text-xs">
                    
                    {/* Dining Type Toggle */}
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-widest opacity-60 mb-1.5">
                        Tipo de Servicio
                      </label>
                      <div className={`grid grid-cols-2 gap-1 p-1 rounded-none border ${
                        isNoche ? 'bg-[#182D42] border-[#C9A84C]/15' : 'bg-[#1A334F] border-[#C9A84C]/15'
                      }`}>
                        <button
                          type="button"
                          onClick={() => setCheckoutType('mesa')}
                          className={`py-1.5 rounded-none text-[10px] tracking-wider uppercase font-bold transition-all cursor-pointer ${
                            checkoutType === 'mesa'
                              ? (isNoche ? 'bg-[#C9A84C] text-[#122437]' : 'bg-[#C9A84C] text-[#203E5F]')
                              : 'opacity-60 hover:opacity-100'
                          }`}
                        >
                          En Mesa
                        </button>
                        <button
                          type="button"
                          onClick={() => setCheckoutType('delivery')}
                          className={`py-1.5 rounded-none text-[10px] tracking-wider uppercase font-bold transition-all cursor-pointer ${
                            checkoutType === 'delivery'
                              ? (isNoche ? 'bg-[#C9A84C] text-[#122437]' : 'bg-[#C9A84C] text-[#203E5F]')
                              : 'opacity-60 hover:opacity-100'
                          }`}
                        >
                          A Domicilio
                        </button>
                      </div>
                    </div>

                    {/* Table Number selector */}
                    {checkoutType === 'mesa' ? (
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-widest opacity-60 mb-1">
                          Número de Mesa
                        </label>
                        <select
                          value={tableNumber}
                          onChange={(e) => setTableNumber(e.target.value)}
                          className={`w-full border rounded-none p-2 focus:outline-none focus:ring-1 bg-transparent ${
                            isNoche 
                              ? 'border-[#C9A84C]/25 text-white focus:ring-[#C9A84C]' 
                              : 'border-[#C9A84C]/25 text-white focus:ring-[#C9A84C]'
                          }`}
                        >
                          {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(n => (
                            <option key={n} value={n} className={isNoche ? 'bg-[#122437] text-white' : 'bg-[#203E5F] text-white'}>Mesa #{n} (Puerto Santa Ana)</option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      /* Address Input */
                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-widest opacity-60 mb-1">
                          Dirección Completa de Envío *
                        </label>
                        <textarea
                          required
                          rows={2}
                          placeholder="Calle, número de casa, referencias..."
                          value={checkoutAddress}
                          onChange={(e) => setCheckoutAddress(e.target.value)}
                          className={`w-full border rounded-none p-2 focus:outline-none focus:ring-1 bg-transparent ${
                            isNoche 
                              ? 'border-[#C9A84C]/25 text-white focus:ring-[#C9A84C]' 
                              : 'border-[#C9A84C]/25 text-white focus:ring-[#C9A84C]'
                          }`}
                        />
                      </div>
                    )}

                    <hr className="border-current/10" />

                    {/* Contact Details */}
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-widest opacity-60 mb-1">
                        Nombre del Cliente *
                      </label>
                      <input
                        type="text"
                        required
                        value={checkoutName}
                        onChange={(e) => setCheckoutName(e.target.value)}
                        className={`w-full border rounded-none p-2 focus:outline-none focus:ring-1 bg-transparent ${
                          isNoche 
                            ? 'border-[#C9A84C]/25 text-white focus:ring-[#C9A84C]' 
                            : 'border-[#C9A84C]/25 text-white focus:ring-[#C9A84C]'
                        }`}
                        placeholder="Ej. Roberto Alvarado"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-widest opacity-60 mb-1">
                        Correo Electrónico (Para Facturación) *
                      </label>
                      <input
                        type="email"
                        required
                        value={checkoutEmail}
                        onChange={(e) => setCheckoutEmail(e.target.value)}
                        className={`w-full border p-2 rounded-none focus:outline-none focus:ring-1 bg-transparent ${
                          emailError 
                            ? 'border-red-500 focus:ring-red-500 bg-red-950/10' 
                            : isNoche 
                              ? 'border-[#C9A84C]/25 text-white focus:ring-[#C9A84C]' 
                              : 'border-[#C9A84C]/25 text-white focus:ring-[#C9A84C]'
                        }`}
                        placeholder="Ej. ralvaradoa3@unemi.edu.ec"
                      />
                      {emailError && (
                        <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3 h-3" /> Formato de correo no válido.
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-widest opacity-60 mb-1">
                        Teléfono Móvil *
                      </label>
                      <input
                        type="tel"
                        required
                        value={checkoutPhone}
                        onChange={(e) => setCheckoutPhone(e.target.value)}
                        className={`w-full border rounded-none p-2 focus:outline-none focus:ring-1 bg-transparent ${
                          isNoche 
                            ? 'border-[#C9A84C]/25 text-white focus:ring-[#C9A84C]' 
                            : 'border-[#C9A84C]/25 text-white focus:ring-[#C9A84C]'
                        }`}
                        placeholder="Ej. +593 98 765 4321"
                      />
                    </div>

                    <hr className="border-current/10" />

                    {/* Payment Method Selector */}
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-widest opacity-60 mb-1.5">
                        Método de Pago
                      </label>
                      <div className="flex flex-col gap-2">
                        {[
                          { id: 'tarjeta', label: '💳 Tarjeta de Crédito/Débito' },
                          { id: 'efectivo', label: '💵 Efectivo en el Local' },
                          { id: 'transferencia', label: '🏦 Transferencia Directa' }
                        ].map(method => (
                          <label 
                            key={method.id} 
                            className={`flex items-center gap-2 p-2.5 rounded-none border cursor-pointer transition-all ${
                              paymentMethod === method.id 
                                ? (isNoche ? 'border-[#C9A84C] bg-[#122437]/40 font-bold' : 'border-[#C9A84C] bg-[#1A334F]/40 font-bold')
                                : (isNoche ? 'border-[#C9A84C]/15 opacity-70 hover:opacity-100' : 'border-[#C9A84C]/15 opacity-70 hover:opacity-100')
                            }`}
                          >
                            <input
                              type="radio"
                              name="payment_method"
                              checked={paymentMethod === method.id}
                              onChange={() => setPaymentMethod(method.id)}
                              className="accent-current"
                            />
                            <span className="font-sans text-[11px] uppercase tracking-wider">{method.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Terms Acknowledge */}
                    <div className="flex items-start gap-1.5 text-[10px] opacity-70 leading-relaxed mt-2">
                      <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span>
                        Al realizar el pedido, el sistema reservará los ingredientes para ser despachados desde nuestra cocina en Puerto Santa Ana.
                      </span>
                    </div>

                    {/* Submit Order button */}
                    <button
                      type="submit"
                      disabled={cart.length === 0 || emailError || checkoutName.trim() === '' || checkoutPhone.trim() === ''}
                      className={`w-full py-3 rounded-none mt-2 flex items-center justify-center gap-2 font-sans font-bold text-xs tracking-widest uppercase ${
                        cart.length === 0 || emailError || checkoutName.trim() === '' || checkoutPhone.trim() === ''
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : getThemeButtonPrimary()
                      }`}
                    >
                      <Check className="w-4 h-4" />
                      <span>Confirmar e Iniciar Pedido</span>
                    </button>

                  </form>
                </div>

              </div>
            )}

          </div>
        )}

        {/* TAB 3: ORDER STATUS (PEDIDOS) */}
        {activeTab === 'pedidos' && (
          <div className="max-w-3xl w-full mx-auto flex flex-col gap-6">
            
            <h2 className="text-3xl font-serif font-light italic pb-2 border-b border-current/10">
              Seguimiento de Pedidos
            </h2>

            {orders.length === 0 ? (
              <div className={`text-center py-16 rounded-none border ${
                isNoche ? 'bg-[#122437] border-[#C9A84C]/15 text-white' : 'bg-[#1A334F] border-[#C9A84C]/15 text-white'
              } p-8 shadow-none`}>
                <ClipboardList className="w-16 h-16 mx-auto opacity-50 mb-3" />
                <h3 className="text-lg font-serif font-light italic mb-1">Sin historial de pedidos</h3>
                <p className="text-xs opacity-75 max-w-sm mx-auto mb-4">
                  Todavía no ha realizado pedidos hoy. Agregue algunos platos exquisitos de Costa Áurea y confírmelos.
                </p>
                <button
                  onClick={() => setActiveTab('menu')}
                  className={`px-5 py-2.5 rounded-none ${getThemeButtonPrimary()}`}
                >
                  Ver el Menú Completo
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-8">
                
                {/* Active Tracking Box for the latest order */}
                {orders[0].status !== 'entregado' && (
                  <div className={`p-6 rounded-none border-2 flex flex-col gap-6 ${
                    isNoche 
                      ? 'bg-[#122437] border-[#C9A84C]/25 text-white' 
                      : 'bg-[#1A334F] border-[#C9A84C]/25 text-white'
                  }`}>
                    
                    {/* Header info */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b pb-4 border-current/10">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-none ${
                            isNoche ? 'bg-[#C9A84C] text-[#122437]' : 'bg-[#C9A84C] text-[#203E5F]'
                          }`}>
                            EN VIVO
                          </span>
                          <h3 className="font-serif font-light italic text-lg">Orden {orders[0].id}</h3>
                        </div>
                        <p className="text-[11px] opacity-75 mt-0.5 font-sans">Realizado hoy: {orders[0].date}</p>
                      </div>
                      
                      {/* Simulation control button */}
                      <button
                        onClick={() => handleAdvanceOrderStatus(orders[0].id)}
                        className={`text-[10px] uppercase tracking-widest font-bold py-1.5 px-3 rounded-none border transition-all flex items-center gap-1 cursor-pointer ${
                          isNoche 
                            ? 'bg-[#C9A84C]/5 border-[#C9A84C]/35 text-[#C9A84C] hover:bg-[#C9A84C]/15' 
                            : 'bg-[#C9A84C]/5 border-[#C9A84C]/35 text-[#C9A84C] hover:bg-[#C9A84C]/15'
                        }`}
                        title="Simular paso de preparación"
                      >
                        <Sparkles className="w-3 h-3 animate-spin-slow" />
                        <span>Simular Siguiente Paso</span>
                      </button>
                    </div>

                    {/* Timeline Tracker */}
                    <div className="relative pt-4 pb-2">
                      {/* Connection bar */}
                      <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 h-[2px] bg-current/15 z-0"></div>
                      <div 
                        className="absolute top-1/2 -translate-y-1/2 left-4 h-[2px] bg-current z-0 transition-all duration-1000"
                        style={{
                          width: orders[0].status === 'recibido' ? '12%' : 
                                 orders[0].status === 'preparacion' ? '50%' : 
                                 orders[0].status === 'camino' ? '88%' : '100%'
                        }}
                      ></div>

                      {/* Milestones */}
                      <div className="relative z-10 grid grid-cols-4 justify-between items-center text-center">
                        {[
                          { id: 'recibido', label: 'Recibido', desc: 'Cocina notificada' },
                          { id: 'preparacion', label: 'En Cocina', desc: 'Preparando platos' },
                          { id: 'camino', label: orders[0].customerDetails.address.includes('Mesa') ? 'Listo' : 'En Camino', desc: 'Saliendo de barra' },
                          { id: 'entregado', label: 'Entregado', desc: '¡Buen Provecho!' }
                        ].map((stage, idx) => {
                          const stages = ['recibido', 'preparacion', 'camino', 'entregado'];
                          const currentIdx = stages.indexOf(orders[0].status);
                          const stageIdx = stages.indexOf(stage.id);
                          const isCompleted = stageIdx <= currentIdx;
                          const isActive = stage.id === orders[0].status;

                          return (
                            <div key={stage.id} className="flex flex-col items-center">
                              <div className={`w-8 h-8 rounded-none flex items-center justify-center border transition-all duration-500 ${
                                isCompleted 
                                  ? (isNoche ? 'bg-[#C9A84C] border-[#C9A84C] text-[#122437]' : 'bg-[#C9A84C] border-[#C9A84C] text-[#203E5F]') 
                                  : (isNoche ? 'bg-[#182D42] border-[#C9A84C]/20 text-white/40' : 'bg-[#1A334F] border-[#C9A84C]/20 text-white/40')
                              } ${isActive ? 'ring-4 ring-current/25 font-bold scale-110' : ''}`}>
                                {isCompleted ? (
                                  <Check className="w-4 h-4 stroke-[3px]" />
                                ) : (
                                  <span className="text-xs font-bold font-sans">{idx + 1}</span>
                                )}
                              </div>
                              <span className={`text-[10px] font-bold mt-2 leading-none uppercase tracking-widest block ${
                                isCompleted ? 'opacity-100' : 'opacity-40'
                              }`}>
                                {stage.label}
                              </span>
                              <span className="text-[8px] opacity-50 hidden sm:block mt-1 max-w-[80px] leading-tight">
                                {stage.desc}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Active Order Summary list */}
                    <div className={`p-4 rounded-none border flex flex-col gap-3 ${
                      isNoche ? 'bg-[#182D42] border-[#C9A84C]/15' : 'bg-[#1A334F] border-[#C9A84C]/15'
                    }`}>
                      <h4 className="font-serif font-light italic text-sm border-b pb-1 border-current/15">
                        Detalles del Pedido
                      </h4>
                      
                      <div className="flex flex-col gap-2 max-h-36 overflow-y-auto pr-1">
                        {orders[0].items.map(cartItem => (
                          <div key={'active_dish_' + cartItem.item.id} className="flex justify-between items-center text-xs">
                            <span className="font-semibold">
                              {cartItem.quantity}x {cartItem.item.name}
                            </span>
                            <span className="opacity-75 font-sans font-bold">
                              ${(cartItem.item.price * cartItem.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <hr className="border-current/10" />

                      <div className="flex justify-between items-center text-xs opacity-85">
                        <span>Forma de envío:</span>
                        <span className="font-semibold">
                          {orders[0].customerDetails.address}
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-xs opacity-85">
                        <span>Método de pago:</span>
                        <span className="font-semibold">
                          {orders[0].paymentMethod}
                        </span>
                      </div>

                      <div className="flex justify-between items-center font-serif font-light text-base border-t pt-1.5 border-current/10">
                        <span className="text-[10px] uppercase tracking-widest font-bold">VALOR TOTAL (CON IVA):</span>
                        <span className="font-sans font-bold text-lg">${orders[0].total.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Manual Delivery Complete trigger */}
                    <div className="flex justify-end">
                      <button
                        onClick={() => {
                          setOrders(prev => prev.map((order, idx) => {
                            if (idx === 0) return { ...order, status: 'entregado' };
                            return order;
                          }));
                          triggerToast('🍽️ ¡Gracias por ordenar en Costa Áurea! Disfrute sus alimentos.');
                        }}
                        className={`px-5 py-2 rounded-none text-xs font-sans tracking-widest uppercase flex items-center gap-1.5 ${getThemeButtonPrimary()}`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Confirmar Entrega</span>
                      </button>
                    </div>

                  </div>
                )}

                {/* Historical Log */}
                <div className="flex flex-col gap-4">
                  <h3 className="font-serif font-light italic text-xl border-b pb-1 border-current/10 uppercase tracking-wider">
                    Historial de Órdenes
                  </h3>

                  {orders.map((order, index) => (
                    <div 
                      key={'history_' + order.id} 
                      className={`p-4 border rounded-none flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center ${
                        isNoche ? 'bg-[#182D42]/60 border-[#C9A84C]/15 text-white' : 'bg-[#1A334F]/60 border-[#C9A84C]/15 text-white'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-serif font-light italic text-base">
                            Código: {order.id}
                          </span>
                          <span className={`text-[8px] uppercase tracking-[0.15em] font-bold px-2 py-0.5 rounded-none ${
                            order.status === 'entregado'
                              ? 'bg-green-950/20 text-green-500 border border-green-500/20'
                              : 'bg-yellow-950/20 text-yellow-500 border border-yellow-500/20'
                          }`}>
                            {order.status === 'recibido' ? 'Recibido' : 
                             order.status === 'preparacion' ? 'En Cocina' : 
                             order.status === 'camino' ? 'Listo/Camino' : 'Entregado'}
                          </span>
                        </div>
                        <p className="text-[10px] opacity-70 mt-1">Realizado: {order.date}</p>
                        <p className="text-[10px] opacity-70 mt-0.5">
                          Destino: {order.customerDetails.address}
                        </p>
                      </div>

                      <div className="text-left sm:text-right flex sm:flex-col justify-between items-center sm:items-end w-full sm:w-auto border-t sm:border-0 pt-2 sm:pt-0 border-current/10">
                        <div className="text-[10px] opacity-70">
                          {order.items.reduce((sum, i) => sum + i.quantity, 0)} platos ordenados
                        </div>
                        <div className="font-sans font-bold text-sm mt-0.5">
                          ${order.total.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

          </div>
        )}

        {/* TAB 4: PROFILE & RESTAURANT INFO (PERFIL) */}
        {activeTab === 'perfil' && (
          <div className="max-w-3xl w-full mx-auto flex flex-col gap-6">
            
            <h2 className="text-3xl font-serif font-light italic pb-2 border-b border-current/10">
              Perfil de Cliente & Ubicación
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              
              {/* Profile details edit form */}
              <div className={`p-6 rounded-none border flex flex-col gap-4 ${
                isNoche ? 'bg-[#122437] border-[#C9A84C]/15 text-white' : 'bg-[#1A334F] border-[#C9A84C]/15 text-white'
              }`}>
                <h3 className="font-serif font-light italic text-lg border-b pb-1.5 uppercase tracking-wider">
                  Datos de mi Cuenta
                </h3>

                <div className="flex flex-col gap-4 text-xs">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest opacity-60 mb-1">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      className={`w-full border rounded-none p-2.5 focus:outline-none focus:ring-1 bg-transparent font-medium ${
                        isNoche 
                          ? 'border-[#C9A84C]/25 text-white focus:ring-[#C9A84C]' 
                          : 'border-[#C9A84C]/25 text-white focus:ring-[#C9A84C]'
                      }`}
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest opacity-60 mb-1">
                      Correo Electrónico (Registrado)
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        disabled
                        className={`w-full border rounded-none p-2.5 bg-transparent opacity-55 cursor-not-allowed font-mono text-[11px] ${
                          isNoche ? 'border-[#C9A84C]/25 text-white' : 'border-[#C9A84C]/25 text-white'
                        }`}
                        value={profile.email}
                      />
                      <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-bold px-2 py-0.5 rounded-none uppercase ${
                        isNoche ? 'bg-[#C9A84C]/20 text-white' : 'bg-[#C9A84C]/20 text-white'
                      }`}>
                        Fijo
                      </span>
                    </div>
                    <p className="text-[10px] opacity-60 mt-1 italic">
                      Este correo electrónico se utiliza para su perfil de usuario único.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest opacity-60 mb-1">
                      Teléfono Móvil
                    </label>
                    <input
                      type="tel"
                      className={`w-full border rounded-none p-2.5 focus:outline-none focus:ring-1 bg-transparent font-medium ${
                        isNoche 
                          ? 'border-[#C9A84C]/25 text-white focus:ring-[#C9A84C]' 
                          : 'border-[#C9A84C]/25 text-white focus:ring-[#C9A84C]'
                      }`}
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest opacity-60 mb-1">
                      Dirección Habitual de Envío
                    </label>
                    <textarea
                      rows={2}
                      className={`w-full border rounded-none p-2.5 focus:outline-none focus:ring-1 bg-transparent font-medium ${
                        isNoche 
                          ? 'border-[#C9A84C]/25 text-white focus:ring-[#C9A84C]' 
                          : 'border-[#C9A84C]/25 text-white focus:ring-[#C9A84C]'
                      }`}
                      value={profile.address}
                      onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        triggerToast('💾 Datos guardados de forma segura en local.');
                      }}
                      className={`w-full py-2.5 rounded-none text-xs font-sans font-bold tracking-widest uppercase ${getThemeButtonPrimary()}`}
                    >
                      Guardar Información
                    </button>
                  </div>
                </div>
              </div>

              {/* Location & Opening Hours */}
              <div className="flex flex-col gap-6">
                
                {/* Location Card */}
                <div className={`p-6 rounded-none border flex flex-col gap-4 ${
                  isNoche ? 'bg-[#122437]/80 border-[#C9A84C]/15 text-white' : 'bg-[#1A334F]/80 border-[#C9A84C]/15 text-white'
                }`}>
                  <h3 className="font-serif font-light italic text-lg border-b pb-1 uppercase tracking-wider">
                    Ubicación
                  </h3>

                  <div className="flex flex-col gap-3 text-xs">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold">Puerto Santa Ana</p>
                        <p className="opacity-80 mt-0.5">Edificio Astillero, Planta Baja Local 3</p>
                        <p className="opacity-65 italic">Guayaquil, Ecuador</p>
                      </div>
                    </div>
                    
                    <hr className="border-current/10" />

                    <div className="flex items-start gap-2">
                      <Clock className="w-5 h-5 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold">Horarios de Atención</p>
                        <div className="mt-1.5 flex flex-col gap-1 opacity-80">
                          <p><span className="font-semibold uppercase tracking-wider text-[10px]">Día (Mediodía):</span> 12:00 PM - 5:00 PM</p>
                          <p><span className="font-semibold uppercase tracking-wider text-[10px]">Noche (Cena):</span> 6:00 PM - 12:00 AM</p>
                          <p className="text-[10px] italic opacity-75 mt-0.5">* Los domingos cerramos a las 9:00 PM</p>
                        </div>
                      </div>
                    </div>

                    <hr className="border-current/10" />

                    <div className="flex items-start gap-2">
                      <Phone className="w-4 h-4 shrink-0 mt-0.5" />
                      <p className="opacity-80">+593 4 234 5678</p>
                    </div>

                    <div className="flex items-start gap-2">
                      <Mail className="w-4 h-4 shrink-0 mt-0.5" />
                      <p className="opacity-80">contacto@costaaurea.com</p>
                    </div>
                  </div>
                </div>

                {/* Visual Location Mock */}
                <div className={`rounded-none border h-40 relative ${
                  isNoche ? 'border-[#C9A84C]/15 text-white' : 'border-[#C9A84C]/15 text-white'
                }`}>
                  <div className={`absolute inset-0 flex flex-col items-center justify-center p-4 text-center ${
                    isNoche ? 'bg-[#182D42]' : 'bg-[#1A334F]'
                  }`}>
                    <Compass className="w-8 h-8 animate-spin-slow mb-2 text-current" />
                    <span className="font-serif font-light italic text-sm">VISTA DEL PUERTO SANTA ANA</span>
                    <span className="text-[9px] opacity-70 uppercase tracking-widest max-w-[200px] mt-1">
                      Frente al magnífico Río Guayas, al pie del faro del cerro Santa Ana.
                    </span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

      </main>

      {/* MOBILE BOTTOM NAVIGATION (Matches exact items in Image 1: Menú, Carrito, Pedidos, Perfil) */}
      <nav className={`fixed bottom-0 left-0 right-0 z-40 border-t flex px-2 py-2.5 transition-colors duration-500 ${
        isNoche 
          ? 'bg-[#122437] border-[#C9A84C]/20 text-white shadow-[0_-8px_16px_rgba(201,168,76,0.08)]' 
          : 'bg-[#1A334F] border-[#C9A84C]/20 text-white shadow-[0_-8px_16px_rgba(201,168,76,0.08)]'
      }`}>
        <div className="max-w-md w-full mx-auto flex items-center justify-around">
          
          {/* Tab 1: Menú */}
          <button
            onClick={() => setActiveTab('menu')}
            className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-none transition-all duration-300 w-16 cursor-pointer ${
              activeTab === 'menu'
                ? 'font-bold border-b-2 border-current scale-105'
                : 'opacity-40 hover:opacity-100'
            }`}
          >
            <Utensils className="w-5 h-5" />
            <span className="text-[10px] uppercase tracking-wider font-bold mt-0.5">Menú</span>
          </button>

          {/* Tab 2: Carrito */}
          <button
            onClick={() => setActiveTab('carrito')}
            className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-none transition-all duration-300 w-16 cursor-pointer ${
              activeTab === 'carrito'
                ? 'font-bold border-b-2 border-current scale-105'
                : 'opacity-40 hover:opacity-100'
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="text-[10px] uppercase tracking-wider font-bold mt-0.5">Carrito</span>
            {cart.length > 0 && (
              <span className={`absolute -top-1 -right-1 font-bold text-[9px] w-4.5 h-4.5 rounded-none flex items-center justify-center animate-bounce shadow-sm ${
                isNoche ? 'bg-[#C9A84C] text-[#122437]' : 'bg-[#C9A84C] text-[#203E5F]'
              }`}>
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>

          {/* Tab 3: Pedidos */}
          <button
            onClick={() => setActiveTab('pedidos')}
            className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-none transition-all duration-300 w-16 cursor-pointer ${
              activeTab === 'pedidos'
                ? 'font-bold border-b-2 border-current scale-105'
                : 'opacity-40 hover:opacity-100'
            }`}
          >
            <ClipboardList className="w-5 h-5" />
            <span className="text-[10px] uppercase tracking-wider font-bold mt-0.5">Pedidos</span>
            {orders.some(o => o.status !== 'entregado') && (
              <span className={`absolute -top-1 -right-1 font-bold text-[9px] w-4.5 h-4.5 rounded-none flex items-center justify-center animate-pulse shadow-sm ${
                isNoche ? 'bg-red-500 text-[#122437]' : 'bg-red-600 text-[#203E5F]'
              }`}>
                !
              </span>
            )}
          </button>

          {/* Tab 4: Perfil */}
          <button
            onClick={() => setActiveTab('perfil')}
            className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-none transition-all duration-300 w-16 cursor-pointer ${
              activeTab === 'perfil'
                ? 'font-bold border-b-2 border-current scale-105'
                : 'opacity-40 hover:opacity-100'
            }`}
          >
            <UserIcon className="w-5 h-5" />
            <span className="text-[10px] uppercase tracking-wider font-bold mt-0.5">Perfil</span>
          </button>

        </div>
      </nav>

    </div>
  );
}
