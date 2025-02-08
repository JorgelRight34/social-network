import { useState } from "react";

const useFormData = () => {
  const [formData, setFormData] = useState({});

  const handleOnChange = () => (event) => {
    const input = event.target;
    setFormData((prev) => ({ ...prev, [input.name]: input.value }));
  };

  return [formData, handleOnChange];
};

export default useFormData;
