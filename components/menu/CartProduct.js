import Image from "next/image";
import Trash from "@/components/icons/Trash";
import { CartContext, cartProductPrice } from "@/components/AppContext";

export default function CartProduct({product, onRemove, index}) {
    return (
        <div className="flex gap-4 mb-2 border-b p-4 items-center bg-back rounded-2xl">
            <div className="w-24">
                <Image src={product.image} alt="image" width={240} height={240} />
            </div>
            <div className="grow">
                <h3 className="text-hunter font-semibold">
                    {product.name}
                </h3>
                {product.size && (
                    <div className="text-sm text-gray-700">Size: <span>{product.size.name}</span></div>
                )}
                {product.extras?.length > 0 && (
                    <div className="text-sm text-gray-600">

                        {product.extras.map(extra => (
                            <div key={extra._id}>{extra.name}: ₹{extra.price}</div>
                        ))}
                    </div>
                )}
            </div>
            <div className="text-lg text-hunter font-semibold">
                ₹{cartProductPrice(product)}
            </div>
            {!!onRemove && (
                <div className="ml-2">
                <button
                    onClick={() => onRemove(index)}
                    type="button" className="p-2">
                    <Trash />
                </button>
            </div>
            )}
            
        </div>
    )
}