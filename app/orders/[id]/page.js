'use client';
import { CartContext, cartProductPrice } from "@/components/AppContext";
import SectionHeader from "@/components/layout/SectionHeader";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import AddressInputs from '../../../components/layout/AddressInputs'
import CartProduct from "@/components/menu/CartProduct";

export default function OrderPage() {

    const { clearCart } = useContext(CartContext);
    const [order, setOrder] = useState();
    const [loadingOrder, setLoadingOrder] = useState(true);
    const {id} = useParams();

    useEffect(() => {
        if (typeof window.console !== 'undefined') {
            if (window.location.href.includes('clear-cart=1')) {
                clearCart();
            }
        }

        if(id) {
            setLoadingOrder(true);
           fetch('/api/orders?_id='+id).then(res => {
            res.json().then(orderData => {
                setOrder(orderData);
                setLoadingOrder(false);
            })
           })
        }
    }, [])

    let subtotal = 0;
    if(order?.cartProducts) {
        for(const product of order?.cartProducts) {
            subtotal += cartProductPrice(product);
        }
    }

    return (
        <section className="max-w-2xl mx-auto mt-12">
            <div className="text-center">
                <SectionHeader mainHeader="Your order" />
                <div className="my-4 text-gray-600 text-lg">
                    <p>Thanks for your order</p>
                    <p>We will call you when your order will be on its way.</p>
                </div>
            </div>
            {loadingOrder && (
                <div className="text-center text-gray-500">Loading order...</div>
            )}
            {order && (
                <div className="grid md:grid-cols-2 md:gap-16 mt-8">
                    <div>
                        {order.cartProducts.map(product => (
                            <CartProduct key={product._id} product={product} />
                        ))}

                        <div className="text-right py-2 pr-32 text-gray-500">
                             Subtotal:
                             <span className="text-hunter inline-block w-6 font-bold">₹{subtotal}</span>
                             <br />
                             Delivery:
                             <span className="text-hunter inline-block w-6 font-bold">₹99</span>
                             <br />
                             Total:
                             <span className="text-hunter inline-block w-6 font-bold">₹{subtotal+99}</span>
                             <br />
                        </div>
                        
                    </div>
                    <div className="bg-gray-100 p-4 rounded-2xl">
                        <AddressInputs disabled={true} addressProps={ order } />
                    </div>
                </div>
            )}
        </section>
    )
}