import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';

interface QuoteContextType {
  isModalOpen: boolean;
  openModal: (initialProducts?: string[]) => void;
  closeModal: () => void;
  selectedProducts: string[];
  toggleProduct: (productKey: string) => void;
  clearProducts: () => void;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export const QuoteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const openModal = useCallback((initialProducts: string[] = []) => {
    setSelectedProducts(initialProducts);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProducts([]);
  }, []);

  const toggleProduct = useCallback((productKey: string) => {
    setSelectedProducts(prev =>
      prev.includes(productKey)
        ? prev.filter(p => p !== productKey)
        : [...prev, productKey]
    );
  }, []);

  const clearProducts = useCallback(() => {
    setSelectedProducts([]);
  }, []);

  const value = {
    isModalOpen,
    openModal,
    closeModal,
    selectedProducts,
    toggleProduct,
    clearProducts,
  };

  return (
    <QuoteContext.Provider value={value}>
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuote = () => {
  const context = useContext(QuoteContext);
  if (context === undefined) {
    throw new Error('useQuote must be used within a QuoteProvider');
  }
  return context;
};