import React from 'react';

import dataSource from './mock';
import AddressBookTable from './AddressBookTable';

export default function AddressBook() {
  return <AddressBookTable dataSource={dataSource} />;
}

AddressBook.propTypes = {};
