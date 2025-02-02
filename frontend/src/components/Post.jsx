import { Carousel } from "react-bootstrap";
import RoundedPill from "./RoundedPill";
import { useState } from "react";
import Dialog from "./Dialog";
import DialogBody from "./DialogBody";
import PostChat from "./PostChat";
import { useSelector } from "react-redux";
import DeletePostBtn from "./DeletePostBtn";

const Post = ({ className='', post, size=10 }) => {
    const [isChatShowing, setIsChatShowing] = useState(false);
    const { user } = useSelector(state => state.user);

    const renderImage = (media) => {
        return (
            <img 
                className="img-fluid w-100" 
                src={`http://localhost:3000/static/${media}`} 
                style={{height: `${size * 1.6}rem`, objectFit: 'contain'}}
            />
        )
    }

    const showChatDialog = () => {
        setIsChatShowing(true);
    }

    return (
        <>
            <div className={`bg-primary border rounded-3 shadow-sm ${className}`}>
                <div className="p-3">
                    <div className="d-flex align-items-center">
                        <span className="me-auto">
                            {post.user?.username} 
                        </span>
                        {post.user?.username == user?.username ? (
                            <DeletePostBtn post={post} />
                        ) : ''}
                    </div>
                    <div>
                        {post.title}
                    </div>
                </div>
                {post.media.length > 0 ? (
                    <div className="bg-black">
                        {post.media.length > 1 ? (
                            <Carousel>
                                {post.media.map(media => (
                                    <Carousel.Item>
                                        {renderImage(media)}
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        ): renderImage(post.media[0])}
                    </div>
                ): ''}
                <div>
                    <div className="p-3">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore ducimus ad, molestiae laborum velit quam nulla alias harum corrupti voluptas, cupiditate reprehenderit deleniti accusamus quas aliquam blanditiis, placeat vitae aliquid.
                    </div>
                    <div className="d-flex align-items-center p-3">
                        <RoundedPill className={"me-3"}>
                            <span className="material-symbols-outlined">
                                mood
                            </span>
                            &nbsp; 0
                        </RoundedPill>
                        <RoundedPill onClick={showChatDialog}>
                            <span className="material-symbols-outlined">
                                chat
                            </span>
                            &nbsp; 0
                        </RoundedPill>
                    </div>
                </div>
            </div>
            <Dialog className={"p-lg-3"} show={isChatShowing}>
               <DialogBody title={post.title} onHide={() => setIsChatShowing(false)}>
                    {/* Avoid fetching without opening the dialog */}
                    {isChatShowing ? <PostChat post={post} /> : ''}
               </DialogBody>
            </Dialog>
        </>
    )
}

export default Post