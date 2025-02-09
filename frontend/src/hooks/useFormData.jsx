import { useState } from "react";

const useFormData = (defaultData = {}) => {
  const [formData, setFormData] = useState(defaultData);

  const handleOnChange = (event) => {
    const input = event.target;
    setFormData((prev) => ({ ...prev, [input.name]: input.value }));
  };

  return [formData, handleOnChange];
};

export default useFormData;
