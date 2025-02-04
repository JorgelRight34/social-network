import { Carousel } from "react-bootstrap";
import RoundedPill from "./RoundedPill";
import { useState } from "react";
import Dialog from "./Dialog";
import DialogBody from "./DialogBody";
import PostChat from "./PostChat";
import { useSelector } from "react-redux";
import DeletePostBtn from "./DeletePostBtn";
import CustomCarousel from "./CustomCarousel";
import { useNavigate } from "react-router";

const Post = ({ className='', post }) => {
    const navigate = useNavigate();
    const { user } = useSelector(state => state.user);

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
                <CustomCarousel media={post.media} />
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
                        <RoundedPill onClick={() => navigate(
                            `/post/${post.user.username}/${post._id}`, 
                            {
                                state: { post: post }
                            }
                        )}>
                            <span className="material-symbols-outlined">
                                chat
                            </span>
                            &nbsp; 0
                        </RoundedPill>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Post