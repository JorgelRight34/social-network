import { useState } from "react";

const SearchUserBar = ({ className, style }) => {
  const [query, setQuery] = useState("");

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    let response;

    try {
      response = await api.get(`/users/${username}`);
    } catch (err) {
      console.error(err);
      return;
    }
  };

  const handleOnChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <>
      <form onSubmit={handleOnSubmit} className={`${className}`} style={style}>
        <input
          className="form-control rounded-pill"
          name="username"
          placeholder="Enter a username"
          value={query}
          onChange={handleOnChange}
        />
      </form>
    </>
  );
};

export default SearchUserBar;
