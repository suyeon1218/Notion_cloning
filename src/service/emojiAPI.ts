import { requestEmojiAPI } from '~/api';
import { EMOJI } from '~/constants';
import { Emoji } from '~/types';
import { makeQueryString } from '~/utils';

const baseQueryKey = {
  access_key: import.meta.env.VITE_EMOJI_API_KEY,
};

const emojiAPI = {
  getEmojiByGroup: async (groupKeyword: string) => {
    const emoji = await requestEmojiAPI.get<Emoji[]>(
      `/${EMOJI.API.CATEGORY}/${groupKeyword}?${makeQueryString(baseQueryKey)}`
    );

    return emoji;
  },
  // getEmojiBySubCategory: async (category) => {
  //   const emoji = await makeRequest.get<Emoji[]>();

  //   return emoji;
  // },
};

export default emojiAPI;
