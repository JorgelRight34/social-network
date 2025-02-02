export const encodeFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]); // Remove the Base64 prefix
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
}