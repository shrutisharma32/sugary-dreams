import FlyingButton from 'react-flying-item'
export default function AddToCartButton({
    hasSizesOrExtras, onClick, basePrice, image
}) {
    if (!hasSizesOrExtras) {
        return (
            <div className="flying-button-parent">
                <FlyingButton
                    src={image}
                    targetTop={'5%'}
                    targetLeft={'95%'}
                >
                    <div onClick={onClick}>
                    Add to Cart ₹{basePrice}
                    </div>
                </FlyingButton>
            </div>

        )
    }
    return (
        <button
            type="button"
            onClick={onClick}
            className="bg-primary text-white text-sm hover:bg-hoverbutton rounded-full px-9 py-2 mt-1"
        >
            <span>Add to cart (from ₹{basePrice})</span>

        </button>
    )
}