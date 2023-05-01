import { createContext, FC, PropsWithChildren, useContext, useState } from 'react';

type ModalContext = {
  setIsAddNewTicketModalOpened: (condition: boolean) => void;
  isAddNewTicketModalOpened: boolean;
  setIsUpdateTicketModalOpened: (condition: boolean) => void;
  isUpdateTicketModalOpened: boolean;
  isTeamModalOpened: boolean;
  setIsTeamModalOpened: (condition: boolean) => void;
};

const defaultValue: ModalContext = {
  setIsAddNewTicketModalOpened: (condition: boolean) => {},
  isAddNewTicketModalOpened: false,
  setIsUpdateTicketModalOpened: (condition: boolean) => {},
  isUpdateTicketModalOpened: false,
  setIsTeamModalOpened: (condition: boolean) => {},
  isTeamModalOpened: false
};

export const ModalContext = createContext(defaultValue);

export const ModalContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isAddNewTicketModalOpened, setIsAddNewTicketModalOpened] = useState(false);
  const [isUpdateTicketModalOpened, setIsUpdateTicketModalOpened] = useState(false);
  const [isTeamModalOpened, setIsTeamModalOpened] = useState(false);

  const value = {
    isAddNewTicketModalOpened,
    setIsAddNewTicketModalOpened,
    isUpdateTicketModalOpened,
    setIsUpdateTicketModalOpened,
    setIsTeamModalOpened,
    isTeamModalOpened
  };

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};

export const useModal = () => {
  return useContext(ModalContext);
};
