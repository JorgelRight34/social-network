import usePostChatMessage from "../../hooks/usePostChatMessage";

const ChatMessageInput = ({
  chat,
  chatId = null,
  receivers,
  className,
  style,
}) => {
  const { message, setMessage, onSubmit } = usePostChatMessage(chat);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    await onSubmit(receivers, chatId);
  };

  const handleOnChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <form onSubmit={handleOnSubmit} className={`${className}`} style={style}>
      <input
        className="form-control rounded-pill"
        name="message"
        placeholder="Write a message"
        value={message}
        onChange={handleOnChange}
      />
    </form>
  );
};

export default ChatMessageInput;
