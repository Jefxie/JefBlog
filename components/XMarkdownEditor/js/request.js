export default function(url, opt, config = {}) {
  const data = new FormData();
  for (const key in opt) {
    data.append(key, opt[key]);
  }
  config = Object.assign(
    {
      withCredentials: false,
      method: "POST"
    },
    config,
    { body: data }
  );
  return new Promise((resolve, reject) => {
    fetch(url, config)
      .then(res => res.json())
      .catch(error => reject(error))
      .then(res => resolve(res));
  });
}
