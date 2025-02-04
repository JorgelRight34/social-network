import useFormInput from "../hooks/useFormInput"
import api from "../api";
import { encodeFileToBase64 } from "../lib/utility-functions";
import { useRef } from "react";

const NewPostForm = () => {
    const [formData, setFormData] = useFormInput();
    const formRef = useRef();
    const fileInputRef = useRef();

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(formRef.current);

        data.append('files', fileInputRef.current.files[0]);

        try {
            await api.post('http://localhost:3000/posts/', data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <form 
                method="post" 
                onSubmit={(e) => handleOnSubmit(e)} 
                encType="multipart/form-data"
                ref={formRef}
            >
                <input 
                    className="form-control mb-3" 
                    name="title" 
                    placeholder="Title" 
                    onBlur={setFormData()} 
                />

                <input 
                    className="form-control mb-3" 
                    name="body" 
                    placeholder="Body" 
                    onBlur={setFormData()} 
                />

                <input 
                    className="form-control mb-3" 
                    type="file" 
                    ref={fileInputRef}
                />

                <button type="submit" className="btn btn-success w-100">Submit</button>
            </form>
        </>
    )
}

export default NewPostForm