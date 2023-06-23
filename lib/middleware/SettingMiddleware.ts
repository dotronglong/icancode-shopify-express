import {Request, Response, NextFunction, Handler} from 'express';
import {reply} from '@icancode/express';
import {Session} from '@shopify/shopify-api';
import {toHashMap, HttpError, toView} from '@icancode/base';
import {SettingStorage} from '@icancode/shopify-setting-storage';

/* eslint-disable max-len */
const ResourceNotFoundError = new HttpError(404, 'resource.notfound', 'Resource could not be found');
/* eslint-enable max-len */

/**
 * Returns a middle to get app's settings for shop
 * @param {SettingStorage} settingStorage
 * @return {Handler}
 */
export function getShopAppSettings(settingStorage: SettingStorage): Handler {
  return async (_, response: Response, next: NextFunction) => {
    const session = response.locals.shopify.session as Session;
    const shop = session.shop;
    const app = process.env.SHOPIFY_API_KEY;
    if (shop === undefined || app === undefined) {
      throw ResourceNotFoundError;
    }
    const settings = await settingStorage.getSettings(shop, app);
    reply(response).json(toView(settings.all(), undefined, ['shop', 'app']));
    next();
  };
};

/**
 * Returns a middleware to put app's settings for shop
 * @param {SettingStorage} settingStorage
 * @return {Handler}
 */
export function putShopAppSettings(settingStorage: SettingStorage): Handler {
  return async (request: Request, response: Response, next: NextFunction) => {
    const session = response.locals.shopify.session as Session;
    const shop = session.shop;
    const app = process.env.SHOPIFY_API_KEY;
    if (shop === undefined || app === undefined) {
      throw ResourceNotFoundError;
    }
    await settingStorage.setSettings(shop, app, toHashMap(request.body));
    reply(response).status(200).json({});
    next();
  };
}
