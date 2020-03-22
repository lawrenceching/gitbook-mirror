'use strict';

const Controller = require('egg').Controller;
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;

    if(ctx.req.url === '/') {
      ctx.status = 302;
      ctx.set('Location', '/v/zh-cn/');
      return;
    }

    const target = 'https://imlc.me' + ctx.req.url;
    ctx.logger.info('>>> ' + target);
    const res = await fetch(target);

    if(!res.ok) throw new Error('Source website is not accessible');

    const html = await res.text();
    // await fs.promises.writeFile(path.join('run', 'cache', 'index.html'), html, 'utf8');

    ctx.body = html;
  }
}

module.exports = HomeController;
