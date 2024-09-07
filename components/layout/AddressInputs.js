export default function AddressInputs({addressProps, setAddressProp, disabled=false}) {

    const {phone, streetAddress, postalCode, city, country} = addressProps;

    return (
        <>
            <label>Phone</label>
                <input type="tel" placeholder="Phone number" disabled={disabled}
                    value={phone || ''} onChange={event => setAddressProp('phone',event.target.value)}
                />
                <label>Street Address</label>
                <input type="text" placeholder="Street address" disabled={disabled}
                    value={streetAddress || ''} onChange={event => setAddressProp('streetAddress', event.target.value)}
                />
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label>Postal code</label>
                        <input type="text" placeholder="Postal Code" disabled={disabled}
                            value={postalCode || ''} onChange={event => setAddressProp('postalCode', event.target.value)} />
                    </div>
                    <div>
                        <label>City</label>
                        <input type="text" placeholder="City" disabled={disabled}
                            value={city || ''} onChange={event =>setAddressProp('city', event.target.value)} />

                    </div>
                </div>
                <label>Country</label>
                <input type="text" placeholder="Country" disabled={disabled}
                    value={country || ''} onChange={event => setAddressProp('country', event.target.value)}
                />
        </>
    )
}