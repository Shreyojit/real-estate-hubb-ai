'use client';

export default function AddressInputs({ addressProps, setAddressProp, disabled = false }) {
  const { phone, streetAddress, postalCode, city, country } = addressProps;

  return (
    <>
      <label className="text-gray-500 text-sm leading-tight">Phone</label>
      <input
        disabled={disabled}
        type="tel"
        placeholder="Phone number"
        value={phone || ''}
        onChange={ev => setAddressProp('phone', ev.target.value)}
        className={`block w-full mb-2 rounded-xl border p-2 ${
          disabled ? 'bg-gray-300 border-0 cursor-not-allowed text-gray-500' : 'border-gray-300 bg-gray-100'
        }`}
      />

      <label className="text-gray-500 text-sm leading-tight">Street address</label>
      <input
        disabled={disabled}
        type="text"
        placeholder="Street address"
        value={streetAddress || ''}
        onChange={ev => setAddressProp('streetAddress', ev.target.value)}
        className={`block w-full mb-2 rounded-xl border p-2 ${
          disabled ? 'bg-gray-300 border-0 cursor-not-allowed text-gray-500' : 'border-gray-300 bg-gray-100'
        }`}
      />

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-gray-500 text-sm leading-tight">Postal code</label>
          <input
            disabled={disabled}
            type="text"
            placeholder="Postal code"
            value={postalCode || ''}
            onChange={ev => setAddressProp('postalCode', ev.target.value)}
            className={`block w-full mb-2 rounded-xl border p-2 ${
              disabled ? 'bg-gray-300 border-0 cursor-not-allowed text-gray-500' : 'border-gray-300 bg-gray-100'
            }`}
          />
        </div>
        <div>
          <label className="text-gray-500 text-sm leading-tight">City</label>
          <input
            disabled={disabled}
            type="text"
            placeholder="City"
            value={city || ''}
            onChange={ev => setAddressProp('city', ev.target.value)}
            className={`block w-full mb-2 rounded-xl border p-2 ${
              disabled ? 'bg-gray-300 border-0 cursor-not-allowed text-gray-500' : 'border-gray-300 bg-gray-100'
            }`}
          />
        </div>
      </div>

      <label className="text-gray-500 text-sm leading-tight">Country</label>
      <input
        disabled={disabled}
        type="text"
        placeholder="Country"
        value={country || ''}
        onChange={ev => setAddressProp('country', ev.target.value)}
        className={`block w-full mb-2 rounded-xl border p-2 ${
          disabled ? 'bg-gray-300 border-0 cursor-not-allowed text-gray-500' : 'border-gray-300 bg-gray-100'
        }`}
      />
    </>
  );
}
