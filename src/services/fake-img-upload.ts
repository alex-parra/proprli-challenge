/*
  Fake Image Uploads
  Read image to base64 and show image via base64-url (string)
*/

function upload(imgs:File[]) {
  const promises = imgs.map((x) => getImage(x).then(img => img));
  return Promise.all(promises);
}

function getImage(file:File) :Promise<string|ArrayBuffer|null> {
  return new Promise((resolve, reject) => {
    const fReader = new FileReader();
    fReader.onload = () => resolve(fReader.result)
    fReader.readAsDataURL(file);
  })
}

export { upload }
