'use strict';

const Controller = require('egg').Controller;
const fetch = require('node-fetch');
const _ = require('lodash');

const cache = {};

class HomeController extends Controller {
  async index() {
    const { ctx } = this;

    if (ctx.req.url === '/') {
      ctx.status = 302;
      ctx.set('Location', '/v/zh-cn/');
      return;
    }

    const getHtml = cache[ctx.req.url] || _.debounce(async () => {

      const target = 'https://imlc.me' + ctx.req.url;
      ctx.logger.info('>>> ' + target);
      try {
        const res = await fetch(target);
        if (!res.ok) return '<html><body><p>500 Server Internal Error</p></body></html>';
        const html = await res.text();
        return html;
      } catch (e) {
        this.ctx.logger.warn(e.message);
        return '<html><body><p>500 Server Internal Error</p></body></html>';
      }

    }, this.ctx.app.config.cacheExpireTime, {
      leading: true,
      trailing: false,
    });

    cache[ctx.req.url] = getHtml;

    ctx.body = await getHtml();
  }
}

module.exports = HomeController;
