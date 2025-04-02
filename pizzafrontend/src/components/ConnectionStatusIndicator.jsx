import React from 'react';
import { useShop, ConnectionStatus } from '../context/ShopContext';

const ConnectionStatusIndicator = () => {
  const { connectionStatus } = useShop();

  if (connectionStatus === ConnectionStatus.CONNECTED) {
    return null; // Don't show anything when connected
  }

  return (
    <div className={`fixed bottom-4 right-4 p-3 rounded-lg shadow-lg z-50 ${
      connectionStatus === ConnectionStatus.CONNECTING 
        ? 'bg-yellow-100 text-yellow-800' 
        : 'bg-red-100 text-red-800'
    }`}>
      <div className="flex items-center">
        <div className={`w-3 h-3 rounded-full mr-2 ${
          connectionStatus === ConnectionStatus.CONNECTING 
            ? 'bg-yellow-500 animate-pulse' 
            : 'bg-red-500'
        }`}></div>
        <span className="text-sm font-medium">
          {connectionStatus === ConnectionStatus.CONNECTING 
            ? 'Csatlakozás a szerverhez...' 
            : 'Offline mód (próbaadatok)'}
        </span>
      </div>
    </div>
  );
};

export default ConnectionStatusIndicator;
