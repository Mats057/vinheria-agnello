import { Link } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useCart } from '../../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from '../components/ImageWithFallback';

const productImages = import.meta.glob('../../assets/products/*/1.png', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const fallbackImage =
  'https://images.unsplash.com/photo-1743184579851-5ec9972100b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200';

export function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  const getWineImage = (id: string) => {
    const imagePath = `../../assets/products/${id}/1.png`;
    return productImages[imagePath] ?? fallbackImage;
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col bg-white min-h-screen">
        <Header />
        <main className="flex flex-1 justify-center items-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md text-center"
          >
            <div className="flex justify-center items-center bg-[#FAF8F3] mx-auto mb-6 rounded-full w-24 h-24">
              <ShoppingBag className="w-12 h-12 text-[#8B1538]" />
            </div>
            <h1 className="mb-4 font-['Playfair_Display'] text-[#2C2C2C] text-3xl md:text-4xl">
              Seu Carrinho Está Vazio
            </h1>
            <p className="mb-8 text-gray-600">
              Adicione vinhos ao seu carrinho para continuar comprando.
            </p>
            <div className="flex sm:flex-row flex-col justify-center gap-4">
              <Link
                to="/produtos"
                className="group inline-flex justify-center items-center space-x-2 bg-gradient-to-r from-[#8B1538] to-[#6D0F2C] hover:shadow-xl px-8 py-3 rounded-xl font-semibold text-white transition-all"
              >
                <span>Ver Catálogo</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/quiz"
                className="inline-flex justify-center items-center space-x-2 bg-white hover:bg-gray-50 px-8 py-3 border-2 border-gray-200 rounded-xl font-semibold text-[#2C2C2C] transition-colors"
              >
                <span>Fazer Quiz</span>
              </Link>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  const subtotal = totalPrice;
  const shipping = subtotal >= 200 ? 0 : 29.90;
  const total = subtotal + shipping;

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="mb-2 font-['Playfair_Display'] text-[#2C2C2C] text-3xl md:text-4xl">
            Carrinho de Compras
          </h1>
          <p className="text-gray-600">
            {items.length} {items.length === 1 ? 'item' : 'itens'} no carrinho
          </p>
        </motion.div>

        <div className="gap-8 grid grid-cols-1 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="space-y-4 lg:col-span-2">
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white hover:shadow-md p-6 border border-gray-200 rounded-2xl transition-shadow"
                >
                  <div className="flex gap-6">
                    {/* Image */}
                    <div className="flex-shrink-0 bg-gradient-to-br from-[#FAF8F3] to-[#F5F5F5] rounded-xl w-24 h-32 overflow-hidden">
                      <ImageWithFallback
                        src={getWineImage(item.id)}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <Link
                        to={`/produto/${item.id}`}
                        className="block mb-2 font-['Playfair_Display'] font-semibold text-[#2C2C2C] hover:text-[#8B1538] text-xl transition-colors"
                      >
                        {item.name}
                      </Link>
                      <p className="mb-1 text-gray-600 text-sm">{item.region}</p>
                      <p className="mb-3 text-gray-500 text-sm capitalize">
                        {item.type} • {item.grape}
                      </p>

                      <div className="flex justify-between items-center">
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() =>
                              item.quantity > 1
                                ? updateQuantity(item.id, item.quantity - 1)
                                : removeFromCart(item.id)
                            }
                            className="flex justify-center items-center bg-[#FAF8F3] hover:bg-[#8B1538] rounded-lg w-9 h-9 hover:text-white transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 font-semibold text-[#2C2C2C] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="flex justify-center items-center bg-[#FAF8F3] hover:bg-[#8B1538] rounded-lg w-9 h-9 hover:text-white transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Price and Remove */}
                        <div className="flex items-center space-x-4">
                          <p className="font-['Playfair_Display'] font-semibold text-[#8B1538] text-2xl">
                            R$ {(item.price * item.quantity).toFixed(2)}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="hover:bg-red-50 p-2 rounded-lg text-red-600 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="top-24 sticky bg-white p-6 border-[#8B1538]/20 border-2 rounded-2xl"
            >
              <h2 className="mb-6 font-['Playfair_Display'] text-[#2C2C2C] text-2xl">
                Resumo do Pedido
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-[#2C2C2C]">
                    R$ {subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Frete</span>
                  <span className="font-semibold text-[#2C2C2C]">
                    {shipping === 0 ? (
                      <span className="text-green-600">Grátis</span>
                    ) : (
                      `R$ ${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>

                {shipping > 0 && (
                  <div className="bg-[#FAF8F3] p-3 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Tag className="flex-shrink-0 mt-0.5 w-4 h-4 text-[#8B1538]" />
                      <p className="text-gray-700 text-sm">
                        Frete grátis para compras acima de R$ 200,00
                      </p>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-gray-200 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-[#2C2C2C] text-lg">Total</span>
                    <span className="font-['Playfair_Display'] font-semibold text-[#8B1538] text-3xl">
                      R$ {total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="group flex justify-center items-center space-x-2 bg-gradient-to-r from-[#8B1538] to-[#6D0F2C] hover:shadow-xl py-4 rounded-xl w-full font-semibold text-white text-center transition-all"
              >
                <span>Finalizar Compra</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/produtos"
                className="block bg-white hover:bg-gray-50 mt-3 py-3 border-2 border-gray-200 rounded-xl w-full font-semibold text-[#2C2C2C] text-center transition-colors"
              >
                Continuar Comprando
              </Link>

              {/* Trust Badges */}
              <div className="space-y-3 mt-6 pt-6 border-gray-200 border-t">
                <div className="flex items-center space-x-3 text-gray-600 text-sm">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Transporte climatizado</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600 text-sm">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Embalagem segura</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600 text-sm">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Pagamento seguro</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
