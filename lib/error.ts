import {HttpError} from '@icancode/base';

/* eslint-disable max-len */
export const ResourceNotFoundError = new HttpError(404, 'resource.notfound', 'Resource could not be found');
/* eslint-enable max-len */