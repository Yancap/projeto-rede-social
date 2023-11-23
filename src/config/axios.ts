import ax from 'axios';

export const axios = ax.create({
  baseURL: process.env['URL_SERVER_JSON']
})
