const jwt = require('jsonwebtoken');
const BaseController = require('./BaseController');

const authorResource = require('../resource/AuthorResource');

class AuthorController extends BaseController {
  constructor() {
    super(authorResource, 'authors');
  }

  // eslint-disable-next-line class-methods-use-this
  async login(req, res) {
    const { username, password } = req.body;

    try {
      const isAuthor = await authorResource.findOne({
        where: {
          username,
          password,
        },
      });

      if (!isAuthor) {
        return res.status(500).json({
          message: 'author not found',
        });
      }

      const token = jwt.sign({ id: isAuthor.id }, process.env.JWT_SECRET);

      return res.json({
        token,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.toString(),
      });
    }
  }

  routes() {
    const routes = super.routes();

    routes.post('/auth', this.login.bind(this));

    return routes;
  }
}

module.exports = new AuthorController();