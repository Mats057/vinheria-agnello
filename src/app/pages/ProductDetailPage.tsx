import { useParams, Link } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { getWineById } from '../../data/wines';
import { useCart } from '../../context/CartContext';
import {
  Star,
  ArrowLeft,
  ShoppingCart,
  Check,
  Calendar,
  MapPin,
  Grape,
  Thermometer,
  Wine as WineIcon,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from '../components/ImageWithFallback';

import reservaTintoCabernetSauvignon1 from '../../assets/products/reserva-tinto-cabernet-sauvignon/1.png';
import reservaTintoCabernetSauvignon2 from '../../assets/products/reserva-tinto-cabernet-sauvignon/2.png';

import chardonnayPremium1 from '../../assets/products/chardonnay-premium/1.png';
import chardonnayPremium2 from '../../assets/products/chardonnay-premium/2.png';

import merlotReservaEspecial1 from '../../assets/products/merlot-reserva-especial/1.png';
import merlotReservaEspecial2 from '../../assets/products/merlot-reserva-especial/2.png';

import roseElegance1 from '../../assets/products/rose-elegance/1.png';
import roseElegance2 from '../../assets/products/rose-elegance/2.png';

import espumanteBrutNature1 from '../../assets/products/espumante-brut-nature/1.png';
import espumanteBrutNature2 from '../../assets/products/espumante-brut-nature/2.png';

import tannatGranReserva1 from '../../assets/products/tannat-gran-reserva/1.png';
import tannatGranReserva2 from '../../assets/products/tannat-gran-reserva/2.png';

const productImages: Record<string, string[]> = {
  'reserva-tinto-cabernet-sauvignon': [
    reservaTintoCabernetSauvignon1,
    reservaTintoCabernetSauvignon2,
  ],
  'chardonnay-premium': [
    chardonnayPremium1,
    chardonnayPremium2,
  ],
  'merlot-reserva-especial': [
    merlotReservaEspecial1,
    merlotReservaEspecial2,
  ],
  'rose-elegance': [
    roseElegance1,
    roseElegance2,
  ],
  'espumante-brut-nature': [
    espumanteBrutNature1,
    espumanteBrutNature2,
  ],
  'tannat-gran-reserva': [
    tannatGranReserva1,
    tannatGranReserva2,
  ],
};

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const wine = id ? getWineById(id) : undefined;
  const { addToCart } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);

  const fallbackImageByType = (type: string) => {
    switch (type) {
      case 'tinto':
        return 'https://images.unsplash.com/photo-1743184579851-5ec9972100b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800';
      case 'branco':
        return 'https://images.unsplash.com/photo-1586370434639-0fe43b2d32d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800';
      case 'rosé':
        return 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800';
      case 'espumante':
        return 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800';
      default:
        return 'https://images.unsplash.com/photo-1743184579851-5ec9972100b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800';
    }
  };

  if (!wine) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="w-20 h-20 bg-[#FAF8F3] rounded-full flex items-center justify-center mx-auto mb-6">
            <WineIcon className="w-10 h-10 text-[#8B1538]" />
          </div>
          <h1 className="font-['Playfair_Display'] text-3xl text-[#2C2C2C] mb-4">
            Vinho não encontrado
          </h1>
          <Link
            to="/produtos"
            className="inline-flex items-center space-x-2 text-[#8B1538] font-semibold hover:text-[#6D0F2C] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar para o catálogo</span>
          </Link>
        </div>
      </div>
    );
  }

  const images = productImages[wine.id] || [fallbackImageByType(wine.type)];

  const handlePrevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(wine);
    }
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            to="/produtos"
            className="inline-flex items-center space-x-2 text-[#8B1538] font-semibold hover:text-[#6D0F2C] transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Voltar ao Catálogo</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <div className="sticky top-24">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-[#FAF8F3] to-[#F5F5F5] shadow-2xl">
                <ImageWithFallback
                  src={images[currentImage]}
                  alt={`${wine.name} - imagem ${currentImage + 1}`}
                  className="w-full h-full object-cover"
                />

                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white text-[#2C2C2C] rounded-full shadow-lg flex items-center justify-center transition"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white text-[#2C2C2C] rounded-full shadow-lg flex items-center justify-center transition"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              <div className="absolute top-6 left-6">
                <span className="px-4 py-2 bg-white/95 backdrop-blur-sm text-[#8B1538] font-semibold uppercase tracking-wider rounded-full shadow-lg">
                  {wine.type}
                </span>
              </div>

              <div className="absolute top-6 right-6 flex items-center space-x-2 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg">
                <Star className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                <span className="font-semibold text-[#2C2C2C]">
                  {wine.rating.toFixed(1)}
                </span>
              </div>

              {images.length > 1 && (
                <div className="flex justify-center gap-3 mt-4">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition ${currentImage === index
                          ? 'border-[#8B1538]'
                          : 'border-transparent'
                        }`}
                    >
                      <ImageWithFallback
                        src={image}
                        alt={`${wine.name} miniatura ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl text-[#2C2C2C] mb-4">
              {wine.name}
            </h1>

            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(wine.rating)
                        ? 'fill-[#D4AF37] text-[#D4AF37]'
                        : 'text-gray-300'
                      }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                ({wine.reviews.length} {wine.reviews.length === 1 ? 'avaliação' : 'avaliações'})
              </span>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              {wine.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-start space-x-3 p-4 bg-[#FAF8F3] rounded-xl">
                <Grape className="w-5 h-5 text-[#8B1538] mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Uva</p>
                  <p className="font-semibold text-[#2C2C2C]">{wine.grape}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-[#FAF8F3] rounded-xl">
                <MapPin className="w-5 h-5 text-[#8B1538] mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Região</p>
                  <p className="font-semibold text-[#2C2C2C]">{wine.region}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-[#FAF8F3] rounded-xl">
                <Calendar className="w-5 h-5 text-[#8B1538] mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Safra</p>
                  <p className="font-semibold text-[#2C2C2C]">{wine.year}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-[#FAF8F3] rounded-xl">
                <Thermometer className="w-5 h-5 text-[#8B1538] mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Temperatura</p>
                  <p className="font-semibold text-[#2C2C2C]">{wine.technicalSheet.temperature}</p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-[#8B1538]/20 rounded-2xl p-6 mb-8">
              <div className="flex items-baseline space-x-2 mb-6">
                <span className="font-['Playfair_Display'] text-5xl font-semibold text-[#8B1538]">
                  R$ {wine.price.toFixed(2)}
                </span>
                <span className="text-gray-600">à vista</span>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <label className="font-semibold text-[#2C2C2C]">Quantidade:</label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 bg-[#FAF8F3] hover:bg-[#8B1538] hover:text-white rounded-lg font-semibold transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 bg-[#FAF8F3] hover:bg-[#8B1538] hover:text-white rounded-lg font-semibold transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-gradient-to-r from-[#8B1538] to-[#6D0F2C] text-white rounded-xl font-semibold text-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 group"
              >
                <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>Adicionar ao Carrinho</span>
              </button>
            </div>

            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-xl"
                >
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-green-800 font-medium">
                    Adicionado ao carrinho com sucesso!
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-['Playfair_Display'] text-3xl text-[#2C2C2C] mb-6">
            Ficha Técnica
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-[#FAF8F3] rounded-xl">
              <p className="text-sm text-gray-600 mb-2">Teor Alcoólico</p>
              <p className="text-xl font-semibold text-[#2C2C2C]">{wine.technicalSheet.alcohol}</p>
            </div>
            <div className="p-6 bg-[#FAF8F3] rounded-xl">
              <p className="text-sm text-gray-600 mb-2">Doçura</p>
              <p className="text-xl font-semibold text-[#2C2C2C] capitalize">{wine.sweetness}</p>
            </div>
            <div className="p-6 bg-[#FAF8F3] rounded-xl">
              <p className="text-sm text-gray-600 mb-2">Corpo</p>
              <p className="text-xl font-semibold text-[#2C2C2C] capitalize">{wine.body}</p>
            </div>
            <div className="p-6 bg-[#FAF8F3] rounded-xl">
              <p className="text-sm text-gray-600 mb-2">Potencial de Guarda</p>
              <p className="text-xl font-semibold text-[#2C2C2C]">{wine.agingPotential}</p>
            </div>
            <div className="p-6 bg-[#FAF8F3] rounded-xl md:col-span-2">
              <p className="text-sm text-gray-600 mb-2">Harmonizações</p>
              <div className="flex flex-wrap gap-2">
                {wine.technicalSheet.pairings.map((pairing, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white text-[#8B1538] rounded-full text-sm font-medium"
                  >
                    {pairing}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {wine.reviews.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-['Playfair_Display'] text-3xl text-[#2C2C2C] mb-6">
              Avaliações dos Clientes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {wine.reviews.map((review) => (
                <div key={review.id} className="p-6 bg-white border border-gray-200 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating
                              ? 'fill-[#D4AF37] text-[#D4AF37]'
                              : 'text-gray-300'
                            }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3 leading-relaxed">{review.comment}</p>
                  <p className="font-semibold text-[#2C2C2C]">{review.author}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}
      </main>

      <Footer />
    </div>
  );
}