import React, { FC, PropsWithChildren } from 'react';
import { UserContextProvider } from './user';
import { ProjectContextProvider } from './project';
import { ModalContextProvider } from './modal';

const AppContext: FC<PropsWithChildren> = ({ children }) => {
  return (
    <UserContextProvider>
      <ProjectContextProvider>
        <ModalContextProvider>{children}</ModalContextProvider>
      </ProjectContextProvider>
    </UserContextProvider>
  );
};

export default AppContext;
