import Image from "next/image";
import toast from "react-hot-toast";

export default function EditableImage({ link, setLink }) {
    async function handleFileChange(event) {
        const files = event.target.files;
        if (files?.length === 1) {
            const data = new FormData;
            data.set('file', files[0]);
            // setIsUploading(true);
            const uploadPromise = fetch('/api/upload', {
                method: 'POST',
                body: data,
                // headers: {'Content-Type': 'multipart/form-data'} ,
            }).then(response => {
                if (response.ok) {
                    return response.json().then(link => {
                        setLink(link);
                    })
                }
                throw new Error('Something went wrong')
            })

            await toast.promise(uploadPromise, {
                loading: 'Uploading...',
                success: "Upload complete",
                error: 'Upload error'
            })
            // setIsUploading(false);
        }
    }
    return (
        <>
            {link && (
                <Image className="rounded-lg w-full h-full mb-1" src={link} width={250} height={250} alt="avatar" />
            )}
            {!link && (
                <div className="bg-gray-200 text-gray-500 p-3 rounded-lg mb-1 text-center">
                    No image 
                </div>
            )}
            <label>
                <input type="file" className="hidden" onChange={handleFileChange} />
                <span className="text-center block p-1 border border-gray-300 rounded-3xl font-sans cursor-pointer">Edit image</span>
            </label>
        </>
    )
}