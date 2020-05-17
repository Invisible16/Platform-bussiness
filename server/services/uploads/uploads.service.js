const blobService = require('feathers-blob');
const fs = require('fs-blob-store');
const multer = require('multer');
const hooks = require('./uploads.hooks');

const multipartMiddleware = multer();
const blobStorage = fs('./uploads');

module.exports = function(app) {
  const base = app.get('base');
  app.use(
    `/${base}/uploads`,
    multipartMiddleware.single('uri'),
    (req, res, next) => {
      req.feathers.file = req.file;
      next();
    },
    blobService({ Model: blobStorage }),
    (req, res, next) => {
      const result = res.data;
      const hook = res.hook;
      const condition = hook.type === 'after' && hook.method === 'get' && result.file;
      if (condition) {
        if (result.filename) {
          res.setHeader('Content-disposition', `attachment; filename=${result.filename}`);
        }
        res.type(result.file.MIME);
        res.end(result.file.buffer);
      } else {
        next();
      }
    }
  );
  const service = app.service(`${base}/uploads`);
  service.hooks(hooks);
};
