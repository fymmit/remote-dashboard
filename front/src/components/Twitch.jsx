import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators as twitchActions } from '../store/twitch';
import { useEffect } from 'react';
import TwitchStreamItem from './TwitchStreamItem';
const { REACT_APP_SITEURL: siteUrl } = process.env;

const Twitch = ({ follows, onliners, fetchFollows, fetchOnlineStreams }) => {
  useEffect(() => {
    if (follows.length === 0) {
      fetchFollows();
    }
    else if (onliners.length === 0) {
      fetchOnlineStreams();
    }
  }, [follows, onliners, fetchFollows, fetchOnlineStreams]);

  const onlineList = onliners.map(o => (
    <TwitchStreamItem
      gameName={o.game_name}
      thumbnailUrl={o.thumbnail_url}
      title={o.title}
      viewerCount={o.viewer_count}
      userName={o.user_name}
      func={() => fetch(`${siteUrl}/website?url=https://twitch.tv/${o.user_name}`, { method: 'POST' })}
    />
  ));

  return (
    <div>
      {onlineList}
    </div>
  )
};

const mapState = state => ({
  follows: state.twitch.follows,
  onliners: state.twitch.onliners,
});

const mapActions = dispatch => bindActionCreators({
  ...twitchActions
}, dispatch);

export default connect(mapState, mapActions)(Twitch);
