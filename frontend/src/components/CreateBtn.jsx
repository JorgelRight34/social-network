import { useState } from "react"
import Dialog from "./Dialog"
import NewPostForm from "./NewPostForm"
import DialogBody from "./DialogBody";

const CreateBtn = ({ }) => {
    const [isDialogShowing, setIsDialogShowing] = useState(false);

    return (
        <>
            <span 
                className="rounded-pill border me-3 px-3 p-1 hover shadow-sm"
                onClick={() => setIsDialogShowing(true)}
            >
                + Create
            </span>
            <Dialog className={"p-lg-3"} show={isDialogShowing}>
                <DialogBody title="Create" onHide={() => setIsDialogShowing(false)}>
                    <NewPostForm />
                </DialogBody>
            </Dialog>
        </>
    )
}

export default CreateBtn