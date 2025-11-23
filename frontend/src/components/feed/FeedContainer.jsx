const FeedContainer = ({ children }) => {
  return (
    <div className="_layout_middle_wrap">
      <div className="_layout_middle_inner">
        {children}
      </div>
    </div>
  );
};

export default FeedContainer;