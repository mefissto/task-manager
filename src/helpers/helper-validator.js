const checkCorrectParams = (params, model) => {
  const updates = Object.keys(params);
  const allowedUpdates = Object.keys(model.schema.paths).filter(
    u => u !== '_id' && u !== '__v'
  );

  return updates.every(u => allowedUpdates.includes(u));
};

module.exports = checkCorrectParams;
