import { createContext, useContext, useState, type ReactNode } from "react";
import { CalBookingModal } from "@/components/site/CalBookingModal";

type CalModalContextType = {
  openCalModal: (calLink?: string) => void;
  closeCalModal: () => void;
  isOpen: boolean;
};

const CalModalContext = createContext<CalModalContextType | undefined>(undefined);

export function CalModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [calLink, setCalLink] = useState("mm-ai-solutions-mzfol6/30min");

  const openCalModal = (customLink?: string) => {
    if (customLink) setCalLink(customLink);
    setIsOpen(true);
  };

  const closeCalModal = () => setIsOpen(false);

  return (
    <CalModalContext.Provider value={{ openCalModal, closeCalModal, isOpen }}>
      {children}
      <CalBookingModal isOpen={isOpen} onClose={closeCalModal} calLink={calLink} />
    </CalModalContext.Provider>
  );
}

export function useCalModal() {
  const context = useContext(CalModalContext);
  if (!context) {
    // Fallback if rendered outside provider
    return {
      openCalModal: () => {
        window.location.href = "/schedule";
      },
      closeCalModal: () => {},
      isOpen: false,
    };
  }
  return context;
}
