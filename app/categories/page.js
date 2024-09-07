'use client';
import UserTabs from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";
import { useProfile } from '@/components/UseProfile'
import toast from "react-hot-toast";
import DeleteButton from "../../components/DeleteButton";

export default function CategoriesPage() {

    const { loading: profileLoading, data: profileData } = useProfile();
    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState([]);
    const [editedCategory, setEditedCategory] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    function fetchCategories() {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories);
            })
        })
    }

    async function handleCategorySubmit(event) {
        event.preventDefault();
        const creationPromise = new Promise(async (resolve, reject) => {
            const data = { name: categoryName };
            if (editedCategory) {
                data._id = editedCategory._id;
            }
            const response = await fetch('/api/categories', {
                method: editedCategory ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            setCategoryName('')
            fetchCategories();
            setEditedCategory(null)
            if (response.ok) resolve(); else reject();
        })
        await toast.promise(creationPromise, {
            loading: editedCategory ? 'Updating category' : 'Creating your new Category...',
            success: editedCategory ? 'Category updated' : 'Category created',
            error: 'Error, sorry...'
        })
    }

    async function handleDeleteClick(_id) {
        const promise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/categories?_id='+_id, {
                method: 'DELETE',
            });
            if(response.ok) resolve();
            else reject();
        })

        await toast.promise(promise, {
            loading: 'Deleting...',
            success: 'Deleted',
            error: 'Error'
        })
        
        fetchCategories();
        
    }

    if (profileLoading) {
        return <div className="text-center mt-32 text-gray-500">Loading User Info...</div>
    }
    if (!profileData.admin) {
        return <div className="text-center mt-16 text-gray-500">Not an Admin</div>
    }

    return (
        <section className="mt-16 max-w-2xl mx-auto">
            <UserTabs isAdmin={true} />
            <form className="mt-8" onSubmit={handleCategorySubmit}>
                <div className="flex gap-2 items-end">
                    <div className="grow">
                        <label>
                            {editedCategory ? 'Update Category' : 'New Category name'}
                            {editedCategory && (
                                <>: <b> {editedCategory.name}</b></>
                            )}
                        </label>
                        <input
                            type="text"
                            value={categoryName}
                            onChange={event => setCategoryName(event.target.value)}
                        />
                    </div>
                    <div className="pb-2 flex gap-2">
                        <button type="submit" className="border border-primary">
                            {editedCategory ? 'Update' : 'Create'}
                        </button>
                        <button type="button"
                        onClick={() => {
                            setEditedCategory(null)
                            setCategoryName('')
                        }}>Cancel</button>
                    </div>
                </div>
            </form>
            <h2 className="text-sm text-gray-500 mt-8 mb-2">Existing categories:</h2>
            <div>
                {categories?.length > 0 && categories.map(c => (
                    <div key={c._id} className="bg-gray-200 items-center mb-1 p-2 px-4  rounded-xl flex gap-2">
                        <div className="grow">
                            {c.name}
                        </div>
                        <div className="flex gap-1">
                            <button
                                type="button"
                                onClick={() => {
                                    setEditedCategory(c);
                                    setCategoryName(c.name)
                                }}>
                                Edit
                            </button>
                            
                            <DeleteButton label="Delete" 
                            onDelete={() => handleDeleteClick(c._id)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}