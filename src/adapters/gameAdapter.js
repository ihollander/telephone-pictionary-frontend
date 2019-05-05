const API_ROOT = "http://localhost:3456";
const DEFAULT_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

export default (() => {
  const getAll = () => fetchAndParse(`${API_ROOT}/api/games`);

  const getOne = id => fetchAndParse(`${API_ROOT}/api/games/${id}`);

  const create = () =>
    fetchAndParse(`${API_ROOT}/api/games`, {
      method: "POST",
      headers: {
        ...DEFAULT_HEADERS
      }
    });

  const update = (id, game) =>
    fetchAndParse(`${API_ROOT}/api/games/${id}`, {
      method: "POST",
      headers: {
        ...DEFAULT_HEADERS
      },
      body: JSON.stringify(game)
    });

  const fetchAndParse = (endpoint, options = {}) =>
    fetch(endpoint, options).then(r => {
      if (r.ok) {
        return r.json();
      } else {
        throw r;
      }
    });

  return {
    getAll,
    getOne,
    create,
    update
  };
})();
