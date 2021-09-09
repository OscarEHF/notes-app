import moment from 'moment';

export const timeago = (timestamps: string): string => {
  return moment(timestamps).startOf('minutes').fromNow();
};