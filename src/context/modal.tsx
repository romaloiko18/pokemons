import { createContext, FC, PropsWithChildren, useContext, useState } from 'react';

type ModalContext = {
  setIsAddNewTicketModalOpened: (condition: boolean) => void;
  isAddNewTicketModalOpened: boolean;
};

const defaultValue: ModalContext = {
  setIsAddNewTicketModalOpened: (condition: boolean) => {},
  isAddNewTicketModalOpened: false
};

export const ModalContext = createContext(defaultValue);

export const ModalContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isAddNewTicketModalOpened, setIsAddNewTicketModalOpened] = useState(false);

  const value = {
    isAddNewTicketModalOpened,
    setIsAddNewTicketModalOpened
  };

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};

export const useModal = () => {
  return useContext(ModalContext);
};
