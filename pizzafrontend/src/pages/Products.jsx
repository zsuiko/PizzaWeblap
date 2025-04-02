import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { useState } from 'react';

const Products = () => {
  const { pizzas, drinks, loading, error } = useShop();
  const [showPizzas, setShowPizzas] = useState(true);
  const [showDrinks, setShowDrinks] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="bg-red-50 p-4 rounded-lg text-center border border-red-200">
      <p className="text-red-600 font-medium">Hiba történt: {error}</p>
    </div>
  );

  const filteredPizzas = pizzas.filter(pizza => 
    pizza.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredDrinks = drinks.filter(drink => 
    drink.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowPizzas(tab === 'all' || tab === 'pizzas');
    setShowDrinks(tab === 'all' || tab === 'drinks');
  };

  return (
    <div className="bg-gradient-to-b from-amber-50 to-white min-h-screen pb-12">
      {/* Hero Section */}
      <div className="bg-amber-500 py-12 px-6 mb-8 shadow-md">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">Termékeink</h1>
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <input
              type="text"
              placeholder="Keresés a termékek között..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 px-6 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-300 pl-12"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 absolute left-4 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto max-w-6xl px-4">
        {/* Category Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm bg-white">
            <button
              onClick={() => handleTabChange('all')}
              className={`px-6 py-2.5 text-sm font-medium rounded-l-lg ${
                activeTab === 'all' 
                ? 'bg-amber-500 text-white' 
                : 'bg-white text-gray-700 hover:bg-amber-100'
              }`}
            >
              Összes
            </button>
            <button
              onClick={() => handleTabChange('pizzas')}
              className={`px-6 py-2.5 text-sm font-medium ${
                activeTab === 'pizzas' 
                ? 'bg-amber-500 text-white' 
                : 'bg-white text-gray-700 hover:bg-amber-100'
              }`}
            >
              Pizzák
            </button>
            <button
              onClick={() => handleTabChange('drinks')}
              className={`px-6 py-2.5 text-sm font-medium rounded-r-lg ${
                activeTab === 'drinks' 
                ? 'bg-amber-500 text-white' 
                : 'bg-white text-gray-700 hover:bg-amber-100'
              }`}
            >
              Üdítők
            </button>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {showPizzas && filteredPizzas.map((pizza) => (
            <div key={pizza.pizzaId} className="group">
              <Link to={`/products/pizza/${pizza.pizzaId}`} className="block">
                <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={pizza.imageUrl} 
                      alt={pizza.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 right-3 bg-amber-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                      {pizza.price} Ft
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-amber-500 transition-colors">{pizza.name}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{pizza.description}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-amber-500 font-medium">Pizza</span>
                      <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-lg text-xs font-medium">Részletek</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}

          {showDrinks && filteredDrinks.map((drink) => (
            <div key={drink.drinkId} className="group">
              <Link to={`/products/drink/${drink.drinkId}`} className="block">
                <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={drink.imageUrl} 
                      alt={drink.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 right-3 bg-amber-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                      {drink.price} Ft
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-amber-500 transition-colors">{drink.name}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{drink.description}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-blue-500 font-medium">Üdítő</span>
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-xs font-medium">Részletek</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        
        {(showPizzas && filteredPizzas.length === 0) && (showDrinks && filteredDrinks.length === 0) && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">Nincs találat a keresési feltételeknek megfelelően</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
