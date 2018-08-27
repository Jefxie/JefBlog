export default function(url, opt, config = {}) {
  const data = new FormData();
  for (const key in opt) {
      console.log(key)
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
  console.log(22, config);
  return new Promise((resolve, reject) => {
    fetch(url, config)
      .then(res => res.json())
      .catch(error => reject(error))
      .then(res => resolve(res));
  });
}
