import { Link } from 'react-router';
import { Star, ShoppingCart } from 'lucide-react';
import { Wine } from '../../data/wines';
import { motion } from 'motion/react';
import { useCart } from '../../context/CartContext';
import { ImageWithFallback } from './ImageWithFallback';

import reservaTintoCabernetSauvignon1 from '../../assets/products/reserva-tinto-cabernet-sauvignon/1.png';
import chardonnayPremium1 from '../../assets/products/chardonnay-premium/1.png';
import merlotReservaEspecial1 from '../../assets/products/merlot-reserva-especial/1.png';
import roseElegance1 from '../../assets/products/rose-elegance/1.png';
import espumanteBrutNature1 from '../../assets/products/espumante-brut-nature/1.png';
import tannatGranReserva1 from '../../assets/products/tannat-gran-reserva/1.png';

interface ProductCardProps {
  wine: Wine;
}

const productCardImages: Record<string, string> = {
  'reserva-tinto-cabernet-sauvignon': reservaTintoCabernetSauvignon1,
  'chardonnay-premium': chardonnayPremium1,
  'merlot-reserva-especial': merlotReservaEspecial1,
  'rose-elegance': roseElegance1,
  'espumante-brut-nature': espumanteBrutNature1,
  'tannat-gran-reserva': tannatGranReserva1,
};

export function ProductCard({ wine }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(wine);
  };

  const imageSrc =
    productCardImages[wine.id] ||
    'https://images.unsplash.com/photo-1743184579851-5ec9972100b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600';

  return (
    <Link to={`/produto/${wine.id}`}>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 h-full flex flex-col"
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-[#FAF8F3] to-[#F5F5F5]">
          <ImageWithFallback
            src={imageSrc}
            alt={wine.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.05 }}
            onClick={handleAddToCart}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2.5 bg-white text-[#8B1538] rounded-full font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center space-x-2 shadow-lg hover:bg-[#8B1538] hover:text-white"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="text-sm">Adicionar</span>
          </motion.button>

          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-white/95 backdrop-blur-sm text-[#8B1538] text-xs font-semibold uppercase tracking-wider rounded-full">
              {wine.type}
            </span>
          </div>

          <div className="absolute top-4 right-4 flex items-center space-x-1 px-2.5 py-1 bg-white/95 backdrop-blur-sm rounded-full">
            <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
            <span className="text-xs font-semibold text-[#2C2C2C]">
              {wine.rating.toFixed(1)}
            </span>
          </div>
        </div>

        <div className="p-5 flex-1 flex flex-col">
          <div className="flex-1">
            <h3 className="font-['Playfair_Display'] font-semibold text-lg text-[#2C2C2C] mb-2 line-clamp-2 group-hover:text-[#8B1538] transition-colors">
              {wine.name}
            </h3>

            <div className="space-y-1.5 mb-3">
              <p className="text-sm text-gray-600">
                <span className="font-medium text-[#8B1538]">{wine.grape}</span>
              </p>
              <p className="text-sm text-gray-500">{wine.region}</p>
              <p className="text-xs text-gray-400">Safra {wine.year}</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div>
              <p className="text-2xl font-['Playfair_Display'] font-semibold text-[#8B1538]">
                R$ {wine.price.toFixed(2)}
              </p>
              <p className="text-xs text-gray-500">À vista</p>
            </div>
            <div className="w-10 h-10 bg-[#FAF8F3] group-hover:bg-[#8B1538] rounded-full flex items-center justify-center transition-colors">
              <ShoppingCart className="w-5 h-5 text-[#8B1538] group-hover:text-white transition-colors" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}