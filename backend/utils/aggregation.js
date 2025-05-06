export const normalize = (value, min, max, flip = false) => {
  const base = {
    $cond: {
      if: { $eq: [min, max] },
      then: 1,
      else: { $divide: [{ $subtract: [value, min] }, { $subtract: [max, min] }] },
    },
  };

  return flip ? { $subtract: [1, base] } : base;
};

export const balance = (value1, weight1, value2, weight2) => {
  return { $add: [{ $multiply: [value1, weight1] }, { $multiply: [value2, weight2] }] };
};
