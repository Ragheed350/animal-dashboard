export const FileToBase64 = (file: File | Blob | undefined) =>
  new Promise<string>((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(file!);
    reader.onload = () => resolve(reader.result!.toString());
    reader.onerror = (error) => reject(error);
  });
