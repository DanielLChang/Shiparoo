export const getPackage = () => {
  return $.ajax({
    method: "GET",
    url: "https://api.goshippo.com/tracks/"
  });
};

export const createPackage = (data) => {
  return $.ajax({
    method: "POST",
    url: "/packages",
    data: data
  });
};
