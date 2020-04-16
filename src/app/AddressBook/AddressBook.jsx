import React from 'react';

import data from './mock';
import AddressBookTable from './AddressBookTable';

export default function AddressBook() {
  return <AddressBookTable data={data} />;
}

AddressBook.propTypes = {};
