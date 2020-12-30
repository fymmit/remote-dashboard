const TwitchStreamItem = ({
  userName,
  title,
  viewerCount,
  thumbnailUrl,
  gameName,
  func,
}) => {
  const fixedUrl = thumbnailUrl.replace('{width}', 160).replace('{height}', 90);
  return (
    <div onClick={() => func()}>
      <div>{title}</div>
      <div className="row">
        <img src={fixedUrl} />
        <div>{userName}</div>
        <div>{gameName}</div>
        <div>{viewerCount}</div>
      </div>
    </div>
  )
};

export default TwitchStreamItem;
