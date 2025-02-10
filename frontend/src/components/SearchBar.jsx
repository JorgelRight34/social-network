import { useNavigate } from "react-router";
import useFormData from "../hooks/useFormData";

const SearchBar = () => {
  const [formData, setFormData] = useFormData();
  const navigate = useNavigate();

  const handleOnSubmit = (event) => {
    event.preventDefault();
    navigate(`/search/?q=${formData.q}`);
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <input
        className="form-control rounded-pill"
        name="q"
        placeholder="Search on Deep"
        value={formData?.q}
        onChange={setFormData}
      />
    </form>
  );
};

export default SearchBar;
