import { createContext, FC, PropsWithChildren, useContext, useState } from 'react';

type ModalContext = {
  setIsAddNewTicketModalOpened: (condition: boolean) => void;
  isAddNewTicketModalOpened: boolean;
  isAddNewProjectModalOpened: boolean;
  setIsUpdateTicketModalOpened: (condition: boolean) => void;
  setIsAddNewProjectModalOpened: (condition: boolean) => void;
  isUpdateTicketModalOpened: boolean;
  isTeamModalOpened: boolean;
  setIsTeamModalOpened: (condition: boolean) => void;
};

const defaultValue: ModalContext = {
  setIsAddNewTicketModalOpened: (condition: boolean) => {},
  setIsAddNewProjectModalOpened: (condition: boolean) => {},
  isAddNewTicketModalOpened: false,
  isAddNewProjectModalOpened: false,
  setIsUpdateTicketModalOpened: (condition: boolean) => {},
  isUpdateTicketModalOpened: false,
  setIsTeamModalOpened: (condition: boolean) => {},
  isTeamModalOpened: false
};

export const ModalContext = createContext(defaultValue);

export const ModalContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isAddNewTicketModalOpened, setIsAddNewTicketModalOpened] = useState(false);
  const [isAddNewProjectModalOpened, setIsAddNewProjectModalOpened] = useState(false);
  const [isUpdateTicketModalOpened, setIsUpdateTicketModalOpened] = useState(false);
  const [isTeamModalOpened, setIsTeamModalOpened] = useState(false);

  const value = {
    isAddNewTicketModalOpened,
    isAddNewProjectModalOpened,
    setIsAddNewProjectModalOpened,
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
