export const verifyPackage = (id) => {
  return $.ajax({
    method: "PATCH",
    url: `/packages/${id}`
  });
};

export const fetchPackage = (carrier, trackingNumber) => {
  return $.ajax({
    method: "GET",
    url: `https://api.goshippo.com/tracks/${carrier}/${trackingNumber}`
  });
};

export const createPackage = (data) => {
  return $.ajax({
    method: "POST",
    url: "/packages",
    data
  });
};
