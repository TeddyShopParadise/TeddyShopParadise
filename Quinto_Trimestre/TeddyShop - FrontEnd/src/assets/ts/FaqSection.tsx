import React, { useState } from 'react';
import { ChevronDown, CreditCard, Truck, Shield, User } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqCategory {
  icon: React.ReactNode;
  title: string;
  questions: FaqItem[];
}

const FaqAccordion: React.FC<{ item: FaqItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion-container">
      <button
        className="accordion-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="accordion-question">{item.question}</span>
        <ChevronDown
          className={`accordion-icon ${
            isOpen ? 'accordion-icon-open' : ''
          }`}
        />
      </button>
      <div
        className="accordion-content"
        style={{
          maxHeight: isOpen ? '500px' : '0',
        }}
        data-state={isOpen ? 'open' : 'closed'}
      >
        <p className="accordion-answer">{item.answer}</p>
      </div>
    </div>
  );
};

const faqData: FaqCategory[] = [
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: "Métodos de Pago",
    questions: [
      {
        question: "¿Qué métodos de pago aceptan?",
        answer: "Aceptamos tarjetas de crédito/débito, transferencias bancarias, PayPal y pagos en efectivo contra entrega en zonas seleccionadas."
      },
      {
        question: "¿Los pagos son seguros?",
        answer: "Sí, todos nuestros pagos están protegidos con encriptación SSL y procesados por pasarelas de pago certificadas."
      }
    ]
  },
  {
    icon: <Truck className="w-6 h-6" />,
    title: "Entregas",
    questions: [
      {
        question: "¿Cuánto tiempo tarda el envío?",
        answer: "Los envíos locales tardan 1-2 días hábiles. Para envíos nacionales, 2-5 días hábiles dependiendo de la ubicación."
      },
      {
        question: "¿Hacen envíos internacionales?",
        answer: "Sí, realizamos envíos internacionales a países seleccionados con un tiempo estimado de entrega de 7-15 días hábiles."
      }
    ]
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Seguridad",
    questions: [
      {
        question: "¿Cómo protegen mis datos personales?",
        answer: "Utilizamos protocolos de seguridad avanzados y nunca compartimos tu información con terceros sin tu consentimiento."
      },
      {
        question: "¿Tienen garantía los productos?",
        answer: "Sí, todos nuestros peluches tienen garantía de 30 días por defectos de fabricación."
      }
    ]
  },
  {
    icon: <User className="w-6 h-6" />,
    title: "Cuentas",
    questions: [
      {
        question: "¿Cómo creo una cuenta?",
        answer: "Puedes crear una cuenta fácilmente desde nuestra página principal haciendo clic en 'Registrarse' y siguiendo los pasos."
      },
      {
        question: "¿Puedo comprar sin crear una cuenta?",
        answer: "Sí, ofrecemos la opción de compra como invitado, aunque una cuenta te permite seguir tus pedidos y acceder a beneficios exclusivos."
      }
    ]
  }
];

const FaqSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(faqData[0].title);

  return (
    <div className="faq-container">
      <div className="category-buttons">
        {faqData.map((category) => (
          <button
            key={category.title}
            onClick={() => setActiveCategory(category.title)}
            className={`category-button ${
              activeCategory === category.title
                ? 'category-button-active'
                : 'category-button-inactive'
            }`}
          >
            {category.icon}
            <span>{category.title}</span>
          </button>
        ))}
      </div>

      <div>
        {faqData
          .find((category) => category.title === activeCategory)
          ?.questions.map((item, index) => (
            <FaqAccordion key={index} item={item} />
          ))}
      </div>
    </div>
  );
};

export default FaqSection;