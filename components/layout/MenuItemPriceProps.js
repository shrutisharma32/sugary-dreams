import Trash from '../icons/Trash'
import Plus from '../icons/Plus'
import ChevronDown from '../icons/ChevronDown'
import ChevronUp from '../icons/ChevronUp'
import { useState } from 'react'

export default function MenuItemPriceProps({ name, addLabel, props, setProps }) {

    const [isOpen, setIsOpen] = useState(false);

    function addProp() {
        setProps(oldProps => {
            return [...oldProps, { name: '', price: 0 }]
        })
    }

    function editProp(event, index, prop) {
        const newValue = event.target.value;
        setProps(prevSizes => {
            const newSizes = [...prevSizes];
            newSizes[index][prop] = newValue;
            return newSizes;
        })
    }

    function removeProp(index) {
        setProps(prev => prev.filter((v, i) => i !== index))
    }

    return (
        <div className="bg-gray-200 p-2 rounded-md mb-2">

            <button
            onClick={() => setIsOpen(prev => !prev)}
             className='inline-flex p-1 border-0 justify-start' type='button'>
                {isOpen && (
                    <ChevronUp />
                )}
                {!isOpen && (
                    <ChevronDown />
                )}
                <span>{name}</span>
                <span>({props?.length})</span>
            </button>

            <div className={isOpen ? 'block' : 'hidden'}>
                {props?.length > 0 && props.map((size, index) => (
                    <div key={index} className="flex gap-2 items-end">
                        <div>
                            <label>Name</label>
                            <input type="text" placeholder='Size name' value={size.name}
                                onChange={ev => editProp(ev, index, 'name')} />
                        </div>
                        <div>
                            <label>Extra price</label>
                            <input type="text" placeholder='Extra price' value={size.price}
                                onChange={ev => editProp(ev, index, 'price')} />
                        </div>
                        <div>
                            <button type='button'
                                className='bg-white mb-2 px-2'
                                onClick={() => removeProp(index)}>
                                <Trash />
                            </button>
                        </div>
                    </div>
                ))}
                <button type='button' className='bg-white items-center'
                    onClick={addProp}>
                    <Plus className='w-5 h-5' />
                    <span>
                        {addLabel}
                    </span>
                </button>
            </div>
        </div>
    )
}