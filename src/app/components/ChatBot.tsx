import { useState, useRef, useEffect, useCallback } from 'react';
import { X, Send, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import giulioBackground from '../../assets/home/Giulio.jpeg';
import logoChatSvg from '../../assets/chatbot/logo_chat.svg';

// ============================================================================
// ENUMS E TIPOS
// ============================================================================

/** Fases principais da conversa com o usuário */
enum ConversationPhase {
  GREETING = 'greeting',
  OCCASION = 'occasion',
  RECOMMENDATION = 'recommendation',
  FINISHED = 'finished',
}

/** Tipos de vinho suportados pelo sommelier */
enum WineType {
  TINTO = 'tinto',
  BRANCO = 'branco',
  ROSE = 'rosé',
  ESPUMANTE = 'espumante',
}

/** Estrutura de uma mensagem no chat */
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  wineRecommendation?: WineRecommendationCard;
}

/** Dados de recomendação de vinho exibidos em card */
interface WineRecommendationCard {
  name: string;
  image: string;
  price: number;
  productId: string;
}

/** Rastreamento das preferências do usuário durante a conversa */
interface UserPreferences {
  wineType?: WineType;
  occasion?: string;
  conversationPhase: ConversationPhase;
}

/** Props do componente ChatBot */
interface ChatBotProps {
  onClose: () => void;
}

/** Estrutura da resposta do bot */
interface BotResponse {
  response: string;
  wineId?: WineId;
}

// ============================================================================
// DADOS E CONSTANTES
// ============================================================================

/** Catálogo de vinhos com informações de preço e imagem */
const wineData = {
  'tannat-gran-reserva': {
    name: 'Tannat Gran Reserva',
    price: 148,
    image: new URL('../../assets/products/tannat-gran-reserva/1.png', import.meta.url).href,
  },
  'merlot-reserva-especial': {
    name: 'Merlot Reserva Especial',
    price: 128,
    image: new URL('../../assets/products/merlot-reserva-especial/1.png', import.meta.url).href,
  },
  'chardonnay-premium': {
    name: 'Chardonnay Premium',
    price: 118,
    image: new URL('../../assets/products/chardonnay-premium/1.png', import.meta.url).href,
  },
  'espumante-brut-nature': {
    name: 'Espumante Brut Nature',
    price: 98,
    image: new URL('../../assets/products/espumante-brut-nature/1.png', import.meta.url).href,
  },
  'rose-elegance': {
    name: 'Rosé Elegance',
    price: 88,
    image: new URL('../../assets/products/rose-elegance/1.png', import.meta.url).href,
  },
} as const;

type WineId = keyof typeof wineData;

/** Mapeamento de termos para tipos de vinho (inclui variações com/sem acento) */
const WINE_TYPE_MAPPING: Record<string, WineType> = {
  tinto: WineType.TINTO,
  branco: WineType.BRANCO,
  rose: WineType.ROSE,
  rosé: WineType.ROSE,
  espumante: WineType.ESPUMANTE,
};

/** Mapeamento de termos para ocasiões de consumo */
const OCCASION_MAPPING: Record<string, string> = {
  carne: 'carne vermelha',
  churrasco: 'carne vermelha',
  'carne vermelha': 'carne vermelha',
  peixe: 'peixe/frutos do mar',
  fruto: 'peixe/frutos do mar',
  'frutos do mar': 'peixe/frutos do mar',
  seafood: 'peixe/frutos do mar',
  celebracao: 'celebração',
  celebração: 'celebração',
  festa: 'celebração',
  brinde: 'celebração',
  refeicao: 'refeição diária',
  refeição: 'refeição diária',
  jantar: 'refeição diária',
  almoco: 'refeição diária',
  almoço: 'refeição diária',
  diario: 'refeição diária',
  diário: 'refeição diária',
};

/** Palavras-chave para reconhecer tipos de resposta do usuário */
const RESPONSE_KEYWORDS = {
  affirmative: ['sim', 'yes', 'outra', 'outro', 'mais', 'novamente'],
  negative: ['nao', 'não', 'no', 'ok', 'obrigado'],
} as const;

// ============================================================================
// FUNÇÕES AUXILIARES
// ============================================================================

/**
 * Normaliza texto removendo acentos para comparação case-insensitive
 * @example normalizeInput('não') // 'nao'
 * @example normalizeInput('Rosé') // 'rose'
 */
const normalizeInput = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, ''); // Remove diacríticos Unicode
};

/**
 * Verifica se entrada contém palavra-chave, ignorando acentos e maiúsculas
 */
const containsKeyword = (input: string, keywords: readonly string[]): boolean => {
  const normalized = normalizeInput(input);
  return keywords.some((keyword) =>
    normalized.includes(normalizeInput(keyword))
  );
};

/**
 * Formata mensagens markdown e quebras de linha para HTML
 */
const formatMessage = (text: string): string => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>');
};

/**
 * Detecta e atualiza preferências do usuário baseado em sua entrada
 * Controla as transições entre fases da conversa
 */
const detectUserPreferences = (
  input: string,
  currentPrefs: UserPreferences
): UserPreferences => {
  const normalized = normalizeInput(input);
  const newPrefs = { ...currentPrefs };

  // ========== USO: Em phase RECOMMENDATION ==========
  if (currentPrefs.conversationPhase === ConversationPhase.RECOMMENDATION) {
    // Usuário quer mais sugestões
    if (containsKeyword(input, RESPONSE_KEYWORDS.affirmative)) {
      return {
        conversationPhase: ConversationPhase.GREETING,
      };
    }

    // Usuário encerra a conversa
    if (containsKeyword(input, RESPONSE_KEYWORDS.negative)) {
      return {
        ...currentPrefs,
        conversationPhase: ConversationPhase.FINISHED,
      };
    }

    return newPrefs;
  }

  // ========== DETECÇÃO: De tipo de vinho ==========
  const detectedWineType = Object.entries(WINE_TYPE_MAPPING).find(([key]) =>
    normalized.includes(normalizeInput(key))
  )?.[1];

  if (detectedWineType) {
    newPrefs.wineType = detectedWineType;
    newPrefs.conversationPhase = ConversationPhase.OCCASION;
    return newPrefs;
  }

  // ========== DETECÇÃO: De ocasião ==========
  if (currentPrefs.wineType && currentPrefs.conversationPhase === ConversationPhase.OCCASION) {
    const detectedOccasion = Object.entries(OCCASION_MAPPING).find(([key]) =>
      normalized.includes(normalizeInput(key))
    )?.[1];

    if (detectedOccasion) {
      newPrefs.occasion = detectedOccasion;
      newPrefs.conversationPhase = ConversationPhase.RECOMMENDATION;
      return newPrefs;
    }
  }

  return newPrefs;
};

/**
 * Recomenda um vinho baseado nas preferências do usuário
 */
const getWineRecommendation = (prefs: UserPreferences): BotResponse => {
  const { wineType, occasion } = prefs;

  if (wineType === WineType.TINTO && occasion === 'carne vermelha') {
    return {
      response:
        '**Minha recomendação: Tannat Gran Reserva** 🏆\n\nEncorpado com taninos estruturados, perfeito para carnes vermelhas.\n\nGostaria de outra sugestão?',
      wineId: 'tannat-gran-reserva',
    };
  }

  if (wineType === WineType.BRANCO && occasion === 'peixe/frutos do mar') {
    return {
      response:
        '**Minha recomendação: Chardonnay Premium** ✨\n\nFresco, aromático e elegante. Realça todos os sabores de peixes e frutos do mar.\n\nGostaria de outra sugestão?',
      wineId: 'chardonnay-premium',
    };
  }

  if (wineType === WineType.ESPUMANTE) {
    return {
      response:
        '**Minha recomendação: Espumante Brut Nature** 🥂\n\nFeito com Chardonnay e Pinot Noir, com perlage fino e persistente. Perfeito para celebrações!\n\nGostaria de outra sugestão?',
      wineId: 'espumante-brut-nature',
    };
  }

  if (wineType === WineType.ROSE) {
    return {
      response:
        '**Minha recomendação: Rosé Elegance** 🌹\n\nVersátil e refrescante. Perfeito para diversos momentos.\n\nGostaria de outra sugestão?',
      wineId: 'rose-elegance',
    };
  }

  return {
    response:
      '**Minha recomendação: Merlot Reserva Especial** 🍷\n\nEncorpado e versátil. Uma excelente escolha!\n\nGostaria de outra sugestão?',
    wineId: 'merlot-reserva-especial',
  };
};

/**
 * Gera resposta do bot baseada no estado atual da conversa
 * Responsável por toda a lógica de fluxo conversacional
 */
const generateBotResponse = (userInput: string, prefs: UserPreferences): BotResponse => {
  const input = normalizeInput(userInput);

  // ========== FASE: FINISHED ==========
  if (prefs.conversationPhase === ConversationPhase.FINISHED) {
    return {
      response: 'Obrigado por usar o Sr. Giulio! 🍷 Volte sempre que precisar de uma sugestão.',
    };
  }

  // ========== FASE: RECOMMENDATION ==========
  if (
    prefs.wineType &&
    prefs.occasion &&
    prefs.conversationPhase === ConversationPhase.RECOMMENDATION
  ) {
    if (containsKeyword(userInput, RESPONSE_KEYWORDS.affirmative)) {
      return {
        response:
          'Ótimo! Vamos encontrar outra sugestão.\n\nQual tipo de vinho você prefere desta vez? Tinto, branco, rosé ou espumante?',
      };
    }

    if (containsKeyword(userInput, RESPONSE_KEYWORDS.negative)) {
      return {
        response:
          'Fico feliz em ajudar! 🍷\n\nVolte sempre que precisar de uma sugestão. Aproveite seu vinho! 🥂',
      };
    }

    return getWineRecommendation(prefs);
  }

  // ========== FASE: OCCASION ==========
  if (prefs.wineType && prefs.conversationPhase === ConversationPhase.OCCASION) {
    if (input.includes(normalizeInput('carne'))) {
      return {
        response: 'Ótimo! Para carnes vermelhas, tenho a recomendação perfeita para você.',
      };
    }
    if (input.includes(normalizeInput('peixe'))) {
      return {
        response: 'Perfeito! Para peixes e frutos do mar, tenho uma sugestão excelente.',
      };
    }
    if (input.includes(normalizeInput('celebra'))) {
      return {
        response: 'Maravilhoso! Para celebrações, tenho o vinho ideal.',
      };
    }
    if (
      input.includes(normalizeInput('refeicao')) ||
      input.includes(normalizeInput('jantar')) ||
      input.includes(normalizeInput('almoco'))
    ) {
      return {
        response: 'Entendi! Para uma refeição agradável, tenho a sugestão certa para você.',
      };
    }

    return {
      response:
        'Para oferecer a melhor recomendação, pode me dizer para qual ocasião?\n\nPor exemplo:\n• Carne vermelha\n• Peixe/Frutos do mar\n• Celebração\n• Refeição diária',
    };
  }

  // ========== FASE: GREETING ==========
  if (prefs.conversationPhase === ConversationPhase.GREETING || !prefs.wineType) {
    if (input.includes(normalizeInput('tinto'))) {
      return {
        response:
          'Ótima escolha! Vinhos tintos são ricos e complexos. 🍷\n\nPara qual ocasião você busca um vinho tinto? Pode ser para carne vermelha, celebração ou apenas para desfrutar?',
      };
    }

    if (input.includes(normalizeInput('branco'))) {
      return {
        response:
          'Excelente! Vinhos brancos são frescos e versáteis. ✨\n\nVocê prefere um branco para peixes e frutos do mar, ou para uma ocasião especial?',
      };
    }

    if (input.includes(normalizeInput('rose'))) {
      return {
        response:
          'Que pintura! Rosés são perfeitos para diversas ocasiões. 🌹\n\nPara qual uso? Almoço, celebração ou algo mais casual?',
      };
    }

    if (input.includes(normalizeInput('espumante'))) {
      return {
        response:
          'Perfeito! Espumantes são ideais para celebrações. 🥂\n\nEm qual ocasião você gostaria de desfrutá-lo?',
      };
    }

    return {
      response:
        'Desculpe, não consegui identificar a preferência. Pode me dizer se prefere:\n• Tinto\n• Branco\n• Rosé\n• Espumante',
    };
  }

  return {
    response:
      'Para ajudá-lo melhor, me diga:\n• Que tipo de vinho prefere? (tinto, branco, rosé, espumante)\n• Para qual ocasião?\n\nAssim faço a melhor recomendação! 🍷',
  };
};

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export function ChatBot({ onClose }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Sou o Sr. Giulio, seu sommelier digital. Bem-vindo à Vinheria Agnello! 🍷\n\nPara começar, me diga: você prefere vinhos tintos, brancos, rosés ou espumantes?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [preferences, setPreferences] = useState<UserPreferences>({
    conversationPhase: ConversationPhase.GREETING,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll automático para o final das mensagens
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  /**
   * Trata o envio de mensagens:
   * 1. Detecta preferências do usuário
   * 2. Aguarda 800ms
   * 3. Gera resposta do bot
   * 4. Adiciona mensagem do bot com recomendação (se houver)
   */
  const handleSend = useCallback(() => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    const updatedPrefs = detectUserPreferences(inputValue, preferences);
    setPreferences(updatedPrefs);

    setTimeout(() => {
      const { response, wineId } = generateBotResponse(inputValue, updatedPrefs);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date(),
        wineRecommendation: wineId
          ? {
              name: wineData[wineId].name,
              image: wineData[wineId].image,
              price: wineData[wineId].price,
              productId: wineId,
            }
          : undefined,
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 800);
  }, [inputValue, preferences]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  const memoizedFormatMessage = useCallback((text: string) => formatMessage(text), []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-end p-4 md:p-6 bg-black/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 100 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 100 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
      >
        {/* ===== HEADER ===== */}
        <div className="bg-gradient-to-r from-[#8B1538] to-[#6D0F2C] text-white p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <img src={logoChatSvg} alt="Chat" className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-['Playfair_Display'] font-semibold text-lg">
                  Sr. Giulio
                </h3>
                <p className="text-sm text-white/80">Sommelier Digital</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Fechar chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-white/90">
            Sempre online para ajudá-lo
          </p>
        </div>

        {/* ===== MENSAGENS ===== */}
        <div
          className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#FAF8F3]"
          style={{
            backgroundImage: `linear-gradient(rgba(250, 248, 243, 0.58), rgba(250, 248, 243, 0.58)), url(${giulioBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`flex items-start space-x-2 max-w-[80%] ${
                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === 'user'
                        ? 'bg-[#8B1538]'
                        : ''
                    }`}
                  >
                    {message.sender === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <img src={logoChatSvg} alt="Bot" className="w-8 h-8" />
                    )}
                  </div>
                  <div>
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.sender === 'user'
                          ? 'bg-[#8B1538] text-white'
                          : 'bg-white text-[#2C2C2C] shadow-sm'
                      }`}
                    >
                      <p
                        className="text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: memoizedFormatMessage(message.text),
                        }}
                      />
                    </div>

                    {/* Wine Recommendation Card */}
                    {message.wineRecommendation && (
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() =>
                          (window.location.href = `/produto/${message.wineRecommendation!.productId}`)
                        }
                        className="mt-3 w-full max-w-xs bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer border border-gray-200"
                        aria-label={`Ver detalhes de ${message.wineRecommendation.name}`}
                      >
                        <div className="flex gap-3 p-3">
                          <div className="w-20 h-24 bg-gradient-to-b from-[#8B1538] to-[#6D0F2C] rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                            <img
                              src={message.wineRecommendation.image}
                              alt={message.wineRecommendation.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex-1 text-left">
                            <h4 className="font-semibold text-[#2C2C2C] text-sm">
                              {message.wineRecommendation.name}
                            </h4>
                            <p className="text-2xl font-bold text-[#8B1538] mt-1">
                              R$ {message.wineRecommendation.price}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">Clique para mais detalhes</p>
                          </div>
                        </div>
                      </motion.button>
                    )}
                    <p className="text-xs text-gray-500 mt-1 px-2">
                      {message.timestamp.toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* ===== INPUT ===== */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex items-end space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua mensagem..."
              className="flex-1 px-4 py-3 bg-[#FAF8F3] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B1538] focus:border-transparent resize-none"
              aria-label="Digite sua mensagem"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="p-3 bg-gradient-to-br from-[#8B1538] to-[#6D0F2C] text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Enviar mensagem"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
