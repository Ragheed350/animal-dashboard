export const objToFormData = (obj: any): FormData => {
  let formData = new FormData();
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const val = obj[key];
      console.log(typeof val);

      try {
        if (typeof val !== 'object') formData.append(key, val);
        else {
          formData.append(key, val);
          // for (const k in val) {
          //   if (Object.prototype.hasOwnProperty.call(val, k)) {
          //     formData.append(key, val[k]);
          //   }
          // }
        }
      } catch (error) {
        throw new Error(error);
      }
    }
  }
  return formData;
};
