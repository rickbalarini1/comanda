import { create } from 'zustand';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

interface Table {
  id: number;
  status: 'available' | 'occupied';
  customerName: string | null;
  guests: number;
  total: number;
  startTime?: Date;
  orders: OrderItem[];
}

interface TableStore {
  tables: Table[];
  selectedTable: Table | null;
  isModalOpen: boolean;
  isOrderModalOpen: boolean;
  initializeTables: () => void;
  selectTable: (table: Table) => void;
  closeModal: () => void;
  closeOrderModal: () => void;
  openTable: (tableId: number, customerName: string, guests: number) => void;
  addOrder: (tableId: number, order: OrderItem) => void;
  removeOrder: (tableId: number, orderId: string) => void;
}

export const useTableStore = create<TableStore>((set) => ({
  tables: [],
  selectedTable: null,
  isModalOpen: false,
  isOrderModalOpen: false,

  initializeTables: () => {
    const initialTables = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      status: 'available' as const,
      customerName: null,
      guests: 0,
      total: 0,
      orders: [],
    }));
    set({ tables: initialTables });
  },

  selectTable: (table) => {
    if (table.status === 'available') {
      set({ selectedTable: table, isModalOpen: true, isOrderModalOpen: false });
    } else {
      set({ selectedTable: table, isModalOpen: false, isOrderModalOpen: true });
    }
  },

  closeModal: () => {
    set({ isModalOpen: false, selectedTable: null });
  },

  closeOrderModal: () => {
    set({ isOrderModalOpen: false, selectedTable: null });
  },

  openTable: (tableId, customerName, guests) => {
    set((state) => ({
      tables: state.tables.map((table) =>
        table.id === tableId
          ? {
              ...table,
              status: 'occupied',
              customerName,
              guests,
              startTime: new Date(),
              total: 0,
              orders: [],
            }
          : table
      ),
      isModalOpen: false,
      selectedTable: null,
    }));
  },

  addOrder: (tableId, order) => {
    set((state) => ({
      tables: state.tables.map((table) =>
        table.id === tableId
          ? {
              ...table,
              orders: [...table.orders, order],
              total: table.total + order.price * order.quantity,
            }
          : table
      ),
    }));
  },

  removeOrder: (tableId, orderId) => {
    set((state) => ({
      tables: state.tables.map((table) => {
        if (table.id === tableId) {
          const orderToRemove = table.orders.find((o) => o.id === orderId);
          return {
            ...table,
            orders: table.orders.filter((o) => o.id !== orderId),
            total: orderToRemove
              ? table.total - orderToRemove.price * orderToRemove.quantity
              : table.total,
          };
        }
        return table;
      }),
    }));
  },
}));