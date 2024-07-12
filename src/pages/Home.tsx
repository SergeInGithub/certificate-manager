import React, { useState } from 'react';
import { Sidebar } from '@components';
import { menuItems } from '@data';
import { MenuItem } from '@utils/types';
import '../assets/styles/pages/home.css';

export function Home() {
  const [selectedItem, setSelectedItem] = useState<MenuItem>(menuItems[0]);

  return (
    <div className="home">
      <Sidebar setSelectedItem={setSelectedItem} />

      <div className="content">
        {selectedItem ? <p>{selectedItem.content}</p> : <p>Select an item</p>}
      </div>
    </div>
  );
}
