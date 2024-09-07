import { useContext, useState } from "react"
import { CartContext } from "../AppContext"
import MenuItemTile from './MenuItemTile';
import toast from "react-hot-toast";
import Image from "next/image";
import FlyingButton from 'react-flying-item'

export default function MenuItem(menuItem) {
    const {
        image, name, description, basePrice, sizes, extraIngredientPrices
    } = menuItem;

    const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
    const [selectedExtras, setSelectedExtras] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const { addToCart } = useContext(CartContext);

    async function handleAddToCartButtonClick() {

        const hasOptions = sizes.length > 0 || extraIngredientPrices.length > 0;
        if (hasOptions && !showPopup) {
            setShowPopup(true);
            return;
        }

        addToCart(menuItem, selectedSize, selectedExtras);
        await new Promise(resolve => setTimeout(resolve, 1000))
        setShowPopup(false)
        // setTimeout(() => {
        //     setShowPopup(false);
        // }, 1000)
    }

    function handleExtraThingClick(event, extraThing) {
        const checked = event.target.checked;
        if (checked) {
            setSelectedExtras(prev => [...prev, extraThing])
        } else {
            setSelectedExtras(prev => {
                return prev.filter(e => e.name !== extraThing.name)
            })
        }
    }

    let selectedPrice = basePrice;
    if (selectedSize) {
        selectedPrice += selectedSize.price;
    }
    if (selectedExtras?.length > 0) {
        for (const extra of selectedExtras) {
            selectedPrice += extra.price;
        }
    }

    return (
        <>
            {showPopup && (
                <div
                    onClick={() => setShowPopup(false)}
                    className="fixed inset-0 bg-black/80 flex justify-center items-center ">
                    <div
                        onClick={ev => ev.stopPropagation()}
                        className="bg-white p-2 rounded-3xl max-w-md bg-back">
                        <div className="overflow-y-scroll p-2"
                            style={{ maxHeight: 'calc(100vh - 100px)' }}>
                            <Image src={image} alt={name} width={200} height={200} className="mx-auto mb-2" />

                            <h2 className="font-bold text-center text-lg text-primary mb-1">{name}</h2>
                            <p className="text-gray-600 text-center text-sm mb-2">{description}</p>

                            {sizes?.length > 0 && (
                                <div className="py-2">
                                    <h3 className="text-gray-600 mb-1 font-bold text-center">Pick your size</h3>
                                    {sizes.map(size => (
                                        <label
                                        key={size._id}
                                         className="flex items-center gap-2 p-3 border rounded-md ">
                                            <input
                                                type="radio"
                                                name="size"
                                                onChange={() => setSelectedSize(size)}
                                                checked={selectedSize?.name === size.name}
                                            />
                                            {size.name} ₹{basePrice + size.price}
                                        </label>
                                    ))}
                                </div>
                            )}
                            {extraIngredientPrices?.length > 0 && (
                                <div className="py-2">

                                    <h3 className="text-gray-600 mb-1 font-bold text-center">Any Extras?</h3>

                                    {extraIngredientPrices.map(extraThing => (
                                        <label key={extraThing._id} className="flex items-center gap-2 p-3 border rounded-md ">
                                            <input
                                                type="checkbox"
                                                name={extraThing.name}
                                                onChange={ev => handleExtraThingClick(ev, extraThing)}
                                                checked={selectedExtras.map(e => e._id).includes(extraThing._id)}
                                            />
                                            {extraThing.name} +₹{extraThing.price}
                                        </label>
                                    ))}

                                </div>
                            )}
                            <FlyingButton targetTop={'5%'} targetLeft={'95%'} src={image}>

                                <div className="sticky button bottom-2"
                                    onClick={handleAddToCartButtonClick}>
                                    Add to cart ₹{selectedPrice}
                                </div>

                            </FlyingButton>

                            <button className="mt-2" type="button" onClick={() => setShowPopup(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <MenuItemTile
                onAddToCart={handleAddToCartButtonClick}
                {...menuItem}
            />

        </>

    )
}