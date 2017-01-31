export const getPackage = (carrier, trackingNumber) => {
  return $.ajax({
    method: "GET",
    url: `https://api.goshippo.com/tracks/${carrier}/${trackingNumber}`
  });
};

export const createPackage = (data) => {
  return $.ajax({
    method: "POST",
    url: "/packages",
    data: data
  });
};
