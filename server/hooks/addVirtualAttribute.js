// addVirtualAttribute({
//   webUrl: (message) => `http://example.com/messages/${message.id}`
// })
module.exports = function addVirtualAttribute(virtuals) {
  let serializer = function(item) {
    item = item.toJSON ? item.toJSON() : item; // hack for sequelize

    let virtual;
    for (virtual in virtuals) {
      item[virtual] = virtuals[virtual](item);
    }
  };

  return function(hook) {
    let result = hook.type === 'before' ? hook.data : hook.result;

    if (hook.method === 'find' || Array.isArray(result)) {
      result = (result.data || result).forEach(serializer);
    } else {
      result = serializer(result);
    }
  };
};
