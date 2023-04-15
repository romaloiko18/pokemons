import { createContext, FC, PropsWithChildren, useContext, useState } from 'react';
import { http } from '../services/api';
import { Ticket } from '../types/ticket';
import ticket from '../pages/ticket';

type TicketsContext = {
  tickets: Ticket[];
  fetchTickets: (projectId: string) => Promise<void>;
  fetchTicket: (projectId: string, ticketId: string) => Promise<void>;
  currentTicket: Ticket | null;
  addNewTicket: (values: { name?: string; description?: string }, projectId?: string) => Promise<void>;
  updateTicket: (values: { status?: string; description?: string; name?: string }, projectId?: string) => Promise<void>;
  isError: boolean;
  isLoading: boolean;
};

const defaultValue: TicketsContext = {
  tickets: [],
  currentTicket: null,

  fetchTickets: async (projectId: string) => {},
  fetchTicket: async (projectId: string, ticketId: string) => {},
  addNewTicket: async (values: { name?: string; description?: string }, projectId?: string) => {},
  updateTicket: async (values: { status?: string; description?: string; name?: string }, projectId?: string) => {},

  isError: false,
  isLoading: false
};

const TicketContext = createContext(defaultValue);

export const TicketContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [currentTicket, setCurrentTicket] = useState<Ticket | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAsyncCallback = async (callback: () => Promise<any>) => {
    try {
      setIsLoading(true);

      await callback();
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTickets = async (projectId: string) => {
    await handleAsyncCallback(async () => {
      const { data } = await http.get<{ tickets: Ticket[]; success: boolean }>(`/ticket/${projectId}`);

      setTickets(data.tickets);
    });
  };

  const fetchTicket = async (projectId: string, ticketId: string) => {
    await handleAsyncCallback(async () => {
      const { data } = await http.get<{ ticket: Ticket; success: boolean }>(`/ticket/${projectId}/${ticketId}`);

      setCurrentTicket(data.ticket);
    });
  };

  const addNewTicket = async (values: { name?: string; description?: string }, projectId?: string) => {
    await handleAsyncCallback(async () => {
      const { data } = await http.post<{ ticket: Ticket; success: boolean }>(`/ticket/${projectId}`, values);

      setTickets((prevState) => [...prevState, data.ticket]);
    });
  };

  const updateTicket = async (values: { status?: string; description?: string; name?: string }, projectId?: string) => {
    await handleAsyncCallback(async () => {
      if (!currentTicket || !projectId) return;
      const { data } = await http.patch<{ ticket: Ticket; success: boolean }>(`/ticket/${projectId}/${currentTicket?._id}`, values);

      setCurrentTicket(data.ticket);
    });
  };

  const value = {
    tickets,
    fetchTickets,
    fetchTicket,
    addNewTicket,
    updateTicket,
    currentTicket,
    isError,
    isLoading
  };

  return <TicketContext.Provider value={value}>{children}</TicketContext.Provider>;
};

export const useTickets = () => {
  return useContext(TicketContext);
};
