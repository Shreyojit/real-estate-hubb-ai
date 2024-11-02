'use client';

import { useState } from "react";
import EditableImage from "./EditableImage";
import AddressInputs from "./AddressInputs";

export default function UserForm({ user = {}, isAdmin, onSave }) {
  const [userName, setUserName] = useState(user?.name || '');
  const [image, setImage] = useState(user?.image || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
  const [postalCode, setPostalCode] = useState(user?.postalCode || '');
  const [city, setCity] = useState(user?.city || '');
  const [country, setCountry] = useState(user?.country || '');
  const [admin, setAdmin] = useState(user?.admin || false);

  const handleAddressChange = (propName, value) => {
    if (propName === 'phone') setPhone(value);
    if (propName === 'streetAddress') setStreetAddress(value);
    if (propName === 'postalCode') setPostalCode(value);
    if (propName === 'city') setCity(value);
    if (propName === 'country') setCountry(value);
  };

  return (
    <div className="md:flex gap-4">
      <div>
        <div className="p-2 rounded-lg relative max-w-[120px]">
          <EditableImage link={image} setLink={setImage} />
        </div>
      </div>
      <form
        className="grow"
        onSubmit={ev => onSave(ev, { name: userName, image, phone, admin, streetAddress, city, country, postalCode })}
      >
        <label className="text-gray-500 text-sm leading-tight">First and last name</label>
        <input
          type="text"
          placeholder="First and last name"
          value={userName}
          onChange={ev => setUserName(ev.target.value)}
          className="block w-full mb-2 rounded-xl border p-2 border-gray-300 bg-gray-100"
        />

        <label className="text-gray-500 text-sm leading-tight">Email</label>
        <input
          type="email"
          disabled
          value={user.email || ''}
          placeholder="email"
          className="block w-full mb-2 rounded-xl border p-2 border-gray-300 bg-gray-100 cursor-not-allowed text-gray-500"
        />

        <AddressInputs
          addressProps={{ phone, streetAddress, postalCode, city, country }}
          setAddressProp={handleAddressChange}
        />

        {!isAdmin && (
          <div>
            <label
              className="p-2 inline-flex items-center gap-2 mb-2 text-gray-500 text-sm leading-tight"
              htmlFor="adminCb"
            >
              <input
                id="adminCb"
                type="checkbox"
                value="1"
                checked={admin}
                onChange={ev => setAdmin(ev.target.checked)}
                className="mr-2"
              />
              <span>Admin</span>
            </label>
          </div>
        )}

        <button
          type="submit"
          className="flex w-full justify-center gap-2 text-gray-700 font-semibold border border-gray-300 rounded-xl px-6 py-2 bg-primary text-white"
        >
          Save
        </button>
      </form>
    </div>
  );
}
