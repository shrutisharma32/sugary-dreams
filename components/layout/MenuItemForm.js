import EditableImage from '@/components/layout/EditableImage';
import { useEffect, useState } from 'react';
import MenuItemPriceProps from '../layout/MenuItemPriceProps'

export default function MenuItemForm({ onSubmit, menuItem }) {

    const [image, setImage] = useState(menuItem?.image || '');
    const [name, setName] = useState(menuItem?.name || '');
    const [description, setDescription] = useState(menuItem?.description || '');
    const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
    const [sizes, setSizes] = useState(menuItem?.sizes || []);
    const [extraIngredientPrices, setExtraIngredientPrices] = useState(menuItem?.extraIngredientPrices || []);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(menuItem?.category || '')

    useEffect(() => {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories);
            })
        })
    }, []);

    return (
        <form
            onSubmit={ev =>
                onSubmit(ev, {
                    image, name, description, basePrice, sizes, extraIngredientPrices, category,
                })}
            className='mt-8 max-w-2xl mx-auto'
        >
            <div
                className="md:grid gap-4 items-start"
                style={{ gridTemplateColumns: '.3fr .7fr' }}
            >
                <div className=''>
                    <EditableImage link={image} setLink={setImage} />
                </div>
                <div className='grow'>
                    <label>Item name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />
                    <label>Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={event => setDescription(event.target.value)}
                    />
                    <label>Category</label>
                    <select value={category} onChange={ev => setCategory(ev.target.value)}>
                        { categories?.length>0 && categories.map(c => (
                            <option key={c._id} value={c._id}>{c.name}</option>
                        ))
                        }
                    </select>
                    <label>Base Price</label>
                    <input
                        type="text"
                        value={basePrice}
                        onChange={event => setBasePrice(event.target.value)}
                    />
                    <MenuItemPriceProps
                        name={'Sizes'}
                        addLabel={'Add item size'}
                        props={sizes}
                        setProps={setSizes}
                    />

                    <MenuItemPriceProps
                        name={'Extra ingredients'}
                        addLabel={'Add ingredients price'}
                        props={extraIngredientPrices}
                        setProps={setExtraIngredientPrices}
                    />
                    <button type="submit">Save</button>
                </div>
            </div>
        </form>
    )
}