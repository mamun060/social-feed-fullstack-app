"use client";
import CreatePostBox from "@/components/feed/CreatePostBox";
import FeedContainer from "@/components/feed/FeedContainer";
import PostCard from "@/components/feed/PostCard";
import StoriesSection from "@/components/feed/StoriesSection";
import LeftSidebar from "@/components/layouts/LeftSidebar";
import MobileBottomNav from "@/components/layouts/MobileBottomNav";
import MobileHeader from "@/components/layouts/MobileHeader";
import Navbar from "@/components/layouts/Navbar";
import RightSidebar from "@/components/layouts/RightSidebar";
import { useGetMyPostsQuery } from "@/lib/features/api/apiSlice";

export default function Home() {
  const {data, isSuccess, isLoading, isError, error} = useGetMyPostsQuery();

  return (
    <div className="_layout _layout_main_wrapper">
      <div className="_main_layout">
        <Navbar />
        <MobileHeader />
        <MobileBottomNav />

        {/* Main Grid Layout */}
        <div className="container _custom_container">
          <div className="_layout_inner_wrap">
            <div className="row">
              {/* Left Column */}
              <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                <LeftSidebar />
              </div>

              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <FeedContainer>
                  <CreatePostBox />
                  {data?.map((post) => (
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
