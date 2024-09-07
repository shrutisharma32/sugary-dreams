import AddToCartButton from './AddToCartButton';

export default function MenuItemTile({ onAddToCart, ...item }) {
    const { image, description, name, basePrice, sizes, extraIngredientPrices } = item;
    const hasSizesOrExtras = sizes?.length > 0 || extraIngredientPrices?.length > 0;
    return (
        <div className="bg-back hover:bg-hoverbg hover:shadow-md hover:shadow-black/25 transition-all p-4 rounded-lg text-center">

            <div className="text-center">
                <img src={image} className="max-h-auto max-h-44 block mx-auto" alt="cheesecake" />
            </div>

            <h4 className="font-semibold text-hunter mt-4 text-xl line-clamp-1">{name}</h4>
            <p className="text-gray-500 text-sm mt-1 mb-3 line-clamp-3">
                {description}
            </p>
            <AddToCartButton
                image={image}
                hasSizesOrExtras={hasSizesOrExtras}
                onClick={onAddToCart}
                basePrice={basePrice}
            />
        </div>
    )
}