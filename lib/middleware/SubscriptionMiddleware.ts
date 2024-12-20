import {Response, NextFunction, Handler} from 'express';
import {reply} from '@icancode/express';
import {Session} from '@shopify/shopify-api';
import {ResourceNotFoundError, toView} from '@icancode/base';
import {SubscriptionStorage} from '@icancode/shopify-subscription-storage';

/**
 * Returns a middle to get app's settings for shop
 * @param {SubscriptionStorage} subscriptionStorage
 * @return {Handler}
 */
export function getShopAppSubscription(subscriptionStorage: SubscriptionStorage): Handler { // eslint-disable-line max-len
  return async (_, response: Response, next: NextFunction) => {
    const session = response.locals.shopify.session as Session;
    const shop = session.shop;
    const app = process.env.SHOPIFY_API_KEY;
    if (shop === undefined || app === undefined) {
      throw ResourceNotFoundError;
    }
    const subscription = await subscriptionStorage.getSubscription(shop, app);
    reply(response).json(toView(subscription.all(), {
      exclude: ['shop', 'app'],
    }));
    next();
  };
};
