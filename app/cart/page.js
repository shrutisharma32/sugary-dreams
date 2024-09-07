'use client';
import { CartContext, cartProductPrice } from "@/components/AppContext";
import SectionHeader from "@/components/layout/SectionHeader";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Trash from "@/components/icons/Trash";
import AddressInputs from "@/components/layout/AddressInputs";
import CartProduct from '../../components/menu/CartProduct'
import { useProfile } from "@/components/UseProfile";
import toast from "react-hot-toast";

export default function CartPage() {
    const { cartProducts, removeCartProduct } = useContext(CartContext)
    const [address, setAddress] = useState({})
    const { data: profileData } = useProfile();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (window.location.href.includes('canceled=1')) {
                toast.error('Payment Failed 😞')
            }
        }
    }, [])

    useEffect(() => {
        if (profileData?.city) {
            const { phone, streetAddress, city, postalCode, country } = profileData;
            const addressFromProfile = {
                phone, streetAddress, city, postalCode, country
            }
            setAddress(addressFromProfile)
        }
    }, [profileData])

    let subtotal = 0;
    for (const p of cartProducts) {
        subtotal += cartProductPrice(p);
    }

    function handleAddressChange(propName, value) {
        setAddress(prevAddress => ({ ...prevAddress, [propName]: value }))
    }

    async function proceedToCheckout(event) {
        event.preventDefault();
        // grab address and cart products 
        const promise = new Promise((resolve, reject) => {
            fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    address,
                    cartProducts,
                })
            }).then(async (response) => {
                // redirect to stripe 
                if (response.ok) {
                    resolve();
                    window.location = await response.json();
                }
                else {
                    reject();
                }
            })
        })

        await toast.promise(promise, {
            loading: 'Preparing your order...',
            success: 'Redirecting to Payment',
            error: 'Something went wrong...Please try again later.'
        })


    }

    if (cartProducts?.length === 0) {
        return (
            <section className="mt-8 text-center">
                <SectionHeader mainHeader="Cart" />
                <p className="text-center mt-7 text-xl text-gray-600">Your shopping cart is empty ☹️</p>
            </section>
        )
    }

    return (
        <section className="mt-8">
            <div className="text-center">
                <SectionHeader mainHeader={'Cart'} />
            </div>

            <div className="grid grid-cols-2 mt-8 gap-8">
                <div>
                    {cartProducts?.length === 0 && (
                        <div>No products in your Shopping cart</div>
                    )}
                    {cartProducts?.length > 0 && cartProducts.map((product, index) => (
                        <CartProduct
                            key={index}
                            product={product}
                            onRemove={removeCartProduct}
                            index={index}
                        />
                    ))}
                    <div className="py-2 flex justify-end items-center pr-32">
                        <div className="text-gray-500 text-hunter ">
                            SubTotal: <br />
                            Delivery: <br />
                            Total:
                        </div>
                        <div className=" font-semibold pl-2 text-hoverbutton text-right">
                            ₹{subtotal} <br />
                            ₹99 <br />
                            ₹{subtotal + 99}
                        </div>
                    </div>

                </div>
                <div className="bg-back p-4 rounded-2xl">
                    <h2 className="font-bold text-center text-xl text-hunter uppercase">Checkout</h2>
                    <form onSubmit={proceedToCheckout}>
                        <AddressInputs
                            addressProps={address}
                            setAddressProp={handleAddressChange}
                        />
                        <button type="submit">Pay ₹{subtotal + 99}</button>
                    </form>
                </div>
            </div>
        </section>
    )
}