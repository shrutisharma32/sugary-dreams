'use client';
import { useProfile } from "@/components/UseProfile";
import SectionHeader from "@/components/layout/SectionHeader";
import UserTabs from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";
import { dbTimeForHuman } from '../../libs/datetime'
import Link from "next/link";

export default function OrdersPage() {

    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const { loading, data: profile } = useProfile();

    useEffect(() => {
        fetchOrders();
    }, [])

    function fetchOrders() {
        setLoadingOrders(true);
        fetch('/api/orders').then(res => {
            res.json().then(orders => {
                setOrders(orders.reverse());
                setLoadingOrders(false);
            })
        })
    }
    return (
        <section className="mt-16 max-w-2xl mx-auto">
            <UserTabs isAdmin={profile.admin} />
            <div className="mt-8" >
            {loadingOrders && (
                <div className="text-center text-gray-500">Loading orders...</div>
            )}
                {orders?.length > 0 && orders.map(order => (
                    <div key={order._id} className="bg-back mb-2 rounded-xl p-4 flex flex-col md:flex-row gap-6 items-center">

                        <div className="grow flex flex-col md:flex-row gap-6 items-center">
                            <div>
                                <div className={
                                    (order.paid ? 'bg-green-500' : 'bg-red-400')
                                    + ' p-2 rounded-md text-white text-center text-sm w-20'
                                }>
                                    {order.paid ? 'Paid' : 'Not paid'}
                                </div>
                            </div>
                            <div className="grow">
                                <div className="flex gap-2 items-center mb-1">
                                    <div className="grow">{order.userEmail}</div>
                                    <div className="text-gray-500 text-sm">
                                        {dbTimeForHuman(order.createdAt)}
                                    </div>
                                </div>

                                <div className="text-gray-500 text-xs">
                                    {order.cartProducts.map(p => p.name).join(', ')}
                                </div>
                            </div>

                        </div>


                        <div>
                            <Link href={"/orders/" + order._id} className="button text-center ">
                                Show
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    )
}