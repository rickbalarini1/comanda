import React, { useEffect } from 'react';
import { TableCard } from './TableCard';
import { OpenTableModal } from './OpenTableModal';
import { useTableStore } from '../stores/tableStore';

export function TableGrid() {
  const { tables, initializeTables } = useTableStore();

  useEffect(() => {
    initializeTables();
  }, [initializeTables]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">Mesas</h2>
        <div className="flex gap-2">
          <span className="inline-flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            <span className="text-sm text-gray-600">Disponível</span>
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-orange-500"></span>
            <span className="text-sm text-gray-600">Ocupada</span>
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tables.map((table) => (
          <TableCard key={table.id} table={table} />
        ))}
      </div>
      <OpenTableModal />
    </div>
  );
}