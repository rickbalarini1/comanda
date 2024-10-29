import React from 'react';
import { Layout } from './components/Layout';
import { TableGrid } from './components/TableGrid';
import { OpenTableModal } from './components/OpenTableModal';
import { OrderModal } from './components/OrderModal';

function App() {
  return (
    <Layout>
      <TableGrid />
      <OpenTableModal />
      <OrderModal />
    </Layout>
  );
}

export default App;