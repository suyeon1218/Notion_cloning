import { requestEmojiAPI } from '~/api';
import { EMOJI } from '~/constants';
import { Emoji } from '~/types';
import { makeQueryString } from '~/utils';

const baseQueryKey = {
  access_key: import.meta.env.VITE_EMOJI_API_KEY,
};

export interface EmojiError {
  status: string;
  message: string;
}

const emojiAPI = {
  getEmojiByGroup: async (groupKeyword: string) => {
    const emoji = await requestEmojiAPI.get<Emoji[]>(
      `${EMOJI.API.CATEGORY}/${groupKeyword}?${makeQueryString(baseQueryKey)}`
    );

    return emoji;
  },
  getEmojiByKeyword: async (keyword: string) => {
    const emoji = requestEmojiAPI.get<Emoji[] | EmojiError>(
      `${EMOJI.API.EMOJI}?${makeQueryString({
        ...baseQueryKey,
        search: keyword,
      })}`
    );

    return emoji;
  },
};

export default emojiAPI;
