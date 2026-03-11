import { Link } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Shield, Truck, Award, ArrowRight, Sparkles, Wine as WineIcon, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { wines } from '../../data/wines';
import { ProductCard } from '../components/ProductCard';

export function HomePage() {
  const featuredWines = wines.slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1656361281529-c6776ededefa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
              alt="Vineyard sunset"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          </div>

          {/* Hero Content */}
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl text-white"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-[#D4AF37] uppercase tracking-widest text-sm mb-4 flex items-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Tradição desde 1985</span>
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-['Playfair_Display'] text-5xl md:text-7xl mb-6 leading-tight"
              >
                A Arte do Vinho<br />
                <span className="text-[#D4AF37]">Seleção Premium</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-xl"
              >
                Descubra vinhos excepcionais cuidadosamente selecionados pela família Agnello. 
                Uma experiência que une tradição italiana e expertise brasileira.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  to="/produtos"
                  className="group px-8 py-4 bg-gradient-to-r from-[#8B1538] to-[#6D0F2C] text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-[#8B1538]/50 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Explorar Catálogo</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link
                  to="/quiz"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold border-2 border-white/30 hover:bg-white/20 transition-all flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Fazer Quiz</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, repeat: Infinity, duration: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-1.5 h-1.5 bg-white rounded-full"
              />
            </div>
          </motion.div>
        </section>

        {/* Trust Badges */}
        <section className="py-16 bg-[#FAF8F3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-4 bg-gradient-to-br from-[#8B1538] to-[#6D0F2C] rounded-xl">
                  <Truck className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-[#2C2C2C] mb-2">
                    Transporte Climatizado
                  </h3>
                  <p className="text-gray-600">
                    Seus vinhos protegidos durante toda a jornada, garantindo qualidade e sabor.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-4 bg-gradient-to-br from-[#8B1538] to-[#6D0F2C] rounded-xl">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-[#2C2C2C] mb-2">
                    Embalagem Segura
                  </h3>
                  <p className="text-gray-600">
                    Proteção premium para garantir que cada garrafa chegue em perfeitas condições.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-4 bg-gradient-to-br from-[#8B1538] to-[#6D0F2C] rounded-xl">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-[#2C2C2C] mb-2">
                    Curadoria Especializada
                  </h3>
                  <p className="text-gray-600">
                    Cada vinho selecionado por nosso sommelier com mais de 30 anos de experiência.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Wines */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-[#8B1538] uppercase tracking-widest text-sm mb-3">
                Seleção Premium
              </p>
              <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl text-[#2C2C2C] mb-4">
                Vinhos em Destaque
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Nossa seleção especial dos vinhos mais apreciados por nossos clientes
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredWines.map((wine, index) => (
                <motion.div
                  key={wine.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard wine={wine} />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link
                to="/produtos"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-[#8B1538] to-[#6D0F2C] text-white rounded-xl font-semibold hover:shadow-xl transition-all group"
              >
                <span>Ver Todo Catálogo</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Wine Categories */}
        <section className="py-20 bg-[#FAF8F3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-[#8B1538] uppercase tracking-widest text-sm mb-3">
                Nosso Catálogo
              </p>
              <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl text-[#2C2C2C] mb-4">
                Explore Nossas Categorias
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                De tintos robustos a espumantes delicados, temos o vinho perfeito para cada momento
              </p>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: 'Tintos',
                  type: 'tinto',
                  description: 'Encorpados e complexos',
                  image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
                },
                {
                  name: 'Brancos',
                  type: 'branco',
                  description: 'Frescos e elegantes',
                  image: 'https://static.millesima.com/s3/attachements/editorial/h412px/drywhitewine.jpg',
                },
                {
                  name: 'Rosés',
                  type: 'rosé',
                  description: 'Delicados e frutados',
                  image: 'https://decantervinhos.vtexassets.com/arquivos/ids/159531-800-1040?v=638798215744070000&width=600&aspect=true',
                },
                {
                  name: 'Espumantes',
                  type: 'espumante',
                  description: 'Borbulhantes e festivos',
                  image: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
                },
              ].map((category, index) => (
                <motion.div
                  key={category.type}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={`/produtos?type=${category.type}`}
                    className="group block relative h-72 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#8B1538]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative h-full flex flex-col justify-end p-6">
                      <h3 className="font-['Playfair_Display'] text-2xl font-semibold text-white mb-1">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-300 mb-3">{category.description}</p>
                      <div className="flex items-center space-x-1 text-[#D4AF37] text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <span>Explorar</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative h-[500px] rounded-2xl overflow-hidden"
              >
                <img
                  src="https://images.unsplash.com/photo-1769521838105-5d68119e88be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                  alt="Wine cellar"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <p className="text-[#8B1538] uppercase tracking-widest text-sm mb-3">
                  Nossa História
                </p>
                <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl text-[#2C2C2C] mb-6">
                  A Família Agnello
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Fundada pelo Sr. Giulio e sua esposa Bianca em 1985, a Vinheria Agnello 
                  nasceu do sonho de compartilhar a paixão italiana por vinhos de qualidade 
                  com o Brasil.
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Com mais de três décadas de experiência, nos tornamos referência em 
                  curadoria e atendimento personalizado. Hoje, digitalizamos nossa expertise 
                  para que você possa experimentar a mesma dedicação no conforto da sua casa.
                </p>
                <Link
                  to="/sobre"
                  className="inline-flex items-center space-x-2 text-[#8B1538] font-semibold hover:text-[#6D0F2C] transition-colors group"
                >
                  <span>Conheça Nossa História</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-[#FAF8F3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-[#8B1538] uppercase tracking-widest text-sm mb-3">
                Depoimentos
              </p>
              <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl text-[#2C2C2C] mb-4">
                O Que Nossos Clientes Dizem
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-[#D4AF37]" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4 leading-relaxed">
                  "Sempre fui intimidada pelo mundo dos vinhos, mas o quiz de recomendação 
                  me ajudou a encontrar vinhos perfeitos para meu paladar! A entrega foi 
                  super rápida e a embalagem impecável."
                </p>
                <p className="font-semibold text-[#2C2C2C]">Marina Silva</p>
                <p className="text-sm text-gray-500">Cliente desde 2025</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white p-8 rounded-2xl shadow-sm"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-[#D4AF37]" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4 leading-relaxed">
                  "A qualidade da seleção é excepcional. Como apreciador de vinhos há anos, 
                  posso afirmar que a Vinheria Agnello mantém o mesmo padrão de excelência 
                  da loja física no ambiente online."
                </p>
                <p className="font-semibold text-[#2C2C2C]">Roberto Martins</p>
                <p className="text-sm text-gray-500">Cliente desde 2020</p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
