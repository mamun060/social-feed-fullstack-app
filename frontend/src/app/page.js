import CreatePostBox from "@/components/feed/CreatePostBox";
import FeedContainer from "@/components/feed/FeedContainer";
import PostCard from "@/components/feed/PostCard";
import StoriesSection from "@/components/feed/StoriesSection";
import LeftSidebar from "@/components/layouts/LeftSidebar";
import MobileBottomNav from "@/components/layouts/MobileBottomNav";
import MobileHeader from "@/components/layouts/MobileHeader";
import Navbar from "@/components/layouts/Navbar";
import RightSidebar from "@/components/layouts/RightSidebar";

const dummyPosts = [
  {
    id: 1,
    author: "Karim Saif",
    timeAgo: "5 minute ago",
    title: "-Healthy Tracking App",
    postImage: "/images/timeline_img.png",
    stats: { comments: 12, shares: 122, totalReactions: 198 },
  },
  {
    id: 2,
    author: "Another User",
    timeAgo: "1 hour ago",
    title: "My second post title",
    postImage: "/images/timeline_img.png",
    stats: { comments: 5, shares: 20, totalReactions: 50 },
  },
];

export default function Home() {
  return (
    <div className="_layout _layout_main_wrapper">
      <div className="_main_layout">
        <Navbar />
        <MobileHeader />
        <MobileBottomNav />

        {/* 2. Main Grid Layout */}
        <div className="container _custom_container">
          <div className="_layout_inner_wrap">
            <div className="row">
              {/* Left Column */}
              <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                <LeftSidebar />
              </div>

              {/* Middle Column The Feed */}
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <FeedContainer>
                  <StoriesSection />
                  <CreatePostBox />
                  {dummyPosts.map((post) => (
                    <PostCard key={post.id} postData={post} />
                  ))}
                </FeedContainer>
              </div>
              {/* Right Column */}
              <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                <RightSidebar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
