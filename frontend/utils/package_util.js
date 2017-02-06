export const verifyPackage = (id) => {
  return $.ajax({
    method: "PATCH",
    url: `api/packages/${id}`
  });
};

export const fetchPackage = (carrier, trackingNumber) => {
  return $.ajax({
    method: "GET",
    url: `https://api.goshippo.com/tracks/${carrier}/${trackingNumber}`
  });
};

export const fetchAllPackages = (userId) => {
  return $.ajax({
    method: "GET",
    url: "api/packages",
    data: { user_id: userId }
  });
};

export const createPackage = (data) => {
  return $.ajax({
    method: "POST",
    url: "api/packages",
    data
  });
};
