import React, { useState } from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useTableStore } from '../stores/tableStore';

const MENU_ITEMS = {
  'Espetos Tradicionais': [
    { name: 'Carne', price: 8.00 },
    { name: 'Frango', price: 8.00 },
    { name: 'Panceta', price: 8.00 },
    { name: 'Pão de Alho', price: 8.00 },
    { name: 'Kafta', price: 8.00 },
    { name: 'Medalhão', price: 8.00 },
    { name: 'Linguiça', price: 8.00 },
  ],
  'Espetos Gourmet': [
    { name: 'Carne Gourmet', price: 12.50 },
    { name: 'Frango Gourmet', price: 12.50 },
    { name: 'Panceta Gourmet', price: 12.50 },
    { name: 'Pão de Alho com Catupiry', price: 12.50 },
    { name: 'Kafta Gourmet', price: 12.50 },
    { name: 'Medalhão Gourmet', price: 12.50 },
    { name: 'Linguiça Gourmet', price: 12.50 },
  ],
  'Espetos Especiais': [
    { name: 'Queijo Coalho', price: 8.50 },
    { name: 'Muçarela', price: 8.50 },
  ],
  'Acompanhamentos': [
    { name: 'Mandioca com Alho', price: 10.00 },
    { name: 'Vinagrete', price: 10.00 },
  ],
  'Bebidas': [
    { name: 'Suco Natural', price: 10.00 },
    { name: 'Refrigerante', price: 5.00 },
    { name: 'Água 500ml', price: 4.00 },
    { name: 'Antarctica', price: 10.00 },
    { name: 'Heineken', price: 15.00 },
    { name: 'Original', price: 12.00 },
  ],
};

export function OrderModal() {
  const { selectedTable, isOrderModalOpen, closeOrderModal, addOrder, removeOrder } = useTableStore();
  const [selectedCategory, setSelectedCategory] = useState('Espetos Tradicionais');
  const [quantity, setQuantity] = useState(1);

  if (!isOrderModalOpen || !selectedTable) return null;

  const handleAddOrder = (item: { name: string; price: number }) => {
    const order = {
      id: Math.random().toString(36).substr(2, 9),
      name: item.name,
      price: item.price,
      quantity,
      category: selectedCategory,
    };
    addOrder(selectedTable.id, order);
    setQuantity(1);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Mesa {selectedTable.id} - {selectedTable.customerName}
            </h2>
            <p className="text-sm text-gray-600">
              {selectedTable.guests} pessoas • R$ {selectedTable.total.toFixed(2)}
            </p>
          </div>
          <button
            onClick={closeOrderModal}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Menu Section */}
          <div className="w-2/3 p-4 overflow-y-auto">
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              {Object.keys(MENU_ITEMS).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {MENU_ITEMS[selectedCategory as keyof typeof MENU_ITEMS].map((item) => (
                <div
                  key={item.name}
                  className="p-4 border rounded-lg hover:border-orange-500 cursor-pointer"
                  onClick={() => handleAddOrder(item)}
                >
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-orange-600 font-medium">
                    R$ {item.price.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Orders Section */}
          <div className="w-1/3 border-l p-4 overflow-y-auto bg-gray-50">
            <h3 className="font-semibold mb-4">Pedidos da Mesa</h3>
            <div className="space-y-3">
              {selectedTable.orders.map((order) => (
                <div key={order.id} className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{order.name}</p>
                      <p className="text-sm text-gray-600">
                        {order.quantity}x • R$ {(order.price * order.quantity).toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeOrder(selectedTable.id, order.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {selectedTable.orders.length === 0 && (
                <p className="text-gray-500 text-center">Nenhum pedido ainda</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}