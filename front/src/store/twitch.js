const types = Object.freeze({
  setFollows: 'SET_FOLLOWS',
  setOnliners: 'SET_ONLINERS',
});

const initial = {
  follows: [],
  onliners: [],
};

export const actionCreators = {
  fetchFollows: () => (dispatch, getState) => {
    (async () => {
      const followList = [];
      let shouldContinue = true;
      let cursor = '';
      while (shouldContinue) {
        const { access_token } = getState().oidc.user;
        const res = await fetch(`https://api.twitch.tv/helix/users/follows?from_id=31473417&first=100&after=${cursor}`, {
          headers: {
            'client-id': 'y1x4l64vfavehsj8k6lg4j9rqdfl6q',
            Authorization: `Bearer ${access_token}`
          }
        });
        const json = await res.json();
        console.log(json);
        const { data, pagination } = json;
        if (pagination.cursor) {
          cursor = pagination.cursor;
        } else {
          shouldContinue = false;
        }
        const d = data.map(x => x.to_id);
        followList.push(...d);
      }
      dispatch({ type: types.setFollows, payload: followList });
    })();
  },
  fetchOnlineStreams: () => (dispatch, getState) => {
    (async () => {
      const { follows } = getState().twitch;
      const onlineList = [];
      let shouldContinue = true;
      let followsIndex = 0;
      let loop = 0;
      while (shouldContinue) {
        loop++;
        const userIdArr = follows.filter((x, i) => (i >= followsIndex && i < loop * 100));
        const userIdQuery = userIdArr.join('&user_id=');
        const { access_token } = getState().oidc.user;
        const res = await fetch(`https://api.twitch.tv/helix/streams?user_id=${userIdQuery}&first=100`, {
          headers: {
            'client-id': 'y1x4l64vfavehsj8k6lg4j9rqdfl6q',
            Authorization: `Bearer ${access_token}`
          }
        });
        followsIndex += userIdArr.length;
        const json = await res.json();
        const { data } = json;
        shouldContinue = followsIndex < follows.length;
        onlineList.push(...data);
      }
      const sortedOnliners = onlineList.sort((a, b) => b.viewer_count - a.viewer_count);
      dispatch({ type: types.setOnliners, payload: sortedOnliners });
    })();
  }
};

export const reducer = (state, action) => {
  const twitchState = state || initial;
  const { payload } = action;
  switch (action.type) {
    case types.setFollows: {
      return {
        ...twitchState,
        follows: payload,
      };
    }
    case types.setOnliners: {
      return {
        ...twitchState,
        onliners: payload,
      };
    }
    default:
      return twitchState;
  }
};
