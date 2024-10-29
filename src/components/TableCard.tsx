import React from 'react';
import { Users2, Receipt, Clock, PlusCircle } from 'lucide-react';
import { useTableStore } from '../stores/tableStore';

interface TableProps {
  table: {
    id: number;
    status: 'available' | 'occupied';
    customerName: string | null;
    guests: number;
    total: number;
    startTime?: Date;
    orders: Array<{
      id: string;
      name: string;
      price: number;
      quantity: number;
    }>;
  };
}

export function TableCard({ table }: TableProps) {
  const selectTable = useTableStore((state) => state.selectTable);
  const isAvailable = table.status === 'available';

  const getElapsedTime = (startTime?: Date) => {
    if (!startTime) return '';
    const elapsed = new Date().getTime() - startTime.getTime();
    const hours = Math.floor(elapsed / (1000 * 60 * 60));
    const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}min`;
  };

  return (
    <div
      onClick={() => selectTable(table)}
      className={`
        rounded-lg shadow-md p-4 transition-all hover:shadow-lg cursor-pointer
        ${isAvailable ? 'bg-white border-l-4 border-green-500' : 'bg-white border-l-4 border-orange-500'}
      `}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800">Mesa {table.id}</h3>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium
            ${isAvailable ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}
          `}
        >
          {isAvailable ? 'Disponível' : 'Ocupada'}
        </span>
      </div>

      {!isAvailable && table.customerName && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600">
            <Users2 className="w-4 h-4" />
            <span className="text-sm">{table.customerName} ({table.guests})</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{getElapsedTime(table.startTime)}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Receipt className="w-4 h-4" />
            <span className="text-sm">R$ {table.total.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <PlusCircle className="w-4 h-4" />
            <span className="text-sm">{table.orders.length} itens</span>
          </div>
        </div>
      )}

      {isAvailable && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            selectTable(table);
          }}
          className="mt-2 w-full bg-orange-600 text-white py-2 px-4 rounded-lg
            hover:bg-orange-700 transition-colors text-sm font-medium"
        >
          Abrir Mesa
        </button>
      )}
    </div>
  );
}