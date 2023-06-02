import React, { FC, PropsWithChildren } from 'react';
import { UserContextProvider } from './user';
import { ProjectContextProvider } from './project';
import { ModalContextProvider } from './modal';
import { TicketContextProvider } from './ticket';

const AppContext: FC<PropsWithChildren> = ({ children }) => {
  return (
    <UserContextProvider>
      <ProjectContextProvider>
        <TicketContextProvider>
          <ModalContextProvider>{children}</ModalContextProvider>
        </TicketContextProvider>
      </ProjectContextProvider>
    </UserContextProvider>
  );
};

export default AppContext;
