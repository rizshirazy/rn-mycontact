export const sortArray = (data) => {
  return data.sort(function (a, b) {
    var nameA = a.firstName.toUpperCase(); // ignore upper and lowercase
    var nameB = b.firstName.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // names must be equal
    return 0;
  });
};
