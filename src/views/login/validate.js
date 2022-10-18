export default function validate(formEl) {
  return new Promise(function (resolve) {
    if (!formEl) return resolve(false);
    formEl.validate((valid) => {
      if (valid) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}
