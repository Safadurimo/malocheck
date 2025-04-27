var isValid = function (mp_id) {
  return true;
};

var analyse = function (mp_id) {
  return {
    mp_id: mp_id,
    valid: true,
    error: null,
  };
};
var generate = function () {
  return "12345678901";
};

export { isValid, analyse, generate };
