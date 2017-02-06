export const allPackages = ({ packages }) => {
  let p_ids = Object.keys(packages);
  let pArray = p_ids.map((id) => {
    return packages[id];
  });
  return pArray;
};
