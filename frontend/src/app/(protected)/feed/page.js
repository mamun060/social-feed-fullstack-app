"use client";
import { useState, useRef, useCallback } from "react";
import CreatePostBox from "@/components/feed/CreatePostBox";
import FeedContainer from "@/components/feed/FeedContainer";
import PostCard from "@/components/feed/PostCard";
import StoriesSection from "@/components/feed/StoriesSection";
import NoPostsFound from "@/components/feed/NoPostsFound";
import LeftSidebar from "@/components/layouts/LeftSidebar";
import MobileBottomNav from "@/components/layouts/MobileBottomNav";
import MobileHeader from "@/components/layouts/MobileHeader";
import Navbar from "@/components/layouts/Navbar";
import RightSidebar from "@/components/layouts/RightSidebar";
import { useGetPostsQuery } from "@/lib/features/postsApi/postApi";

export default function Home() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, isError } = useGetPostsQuery(page);

  const observer = useRef();
  const lastItemRef = useCallback(
    (node) => {
      if (isFetching) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && data?.next) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetching, data?.next],
  );

  if (isLoading && page === 1) return <div>Loading initial posts...</div>;
  if (isError) return <div>Error loading posts.</div>;

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

              {/* Middle Column The Feed */}
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <FeedContainer>
                  <StoriesSection />
                  <CreatePostBox />

                  {/* Initial Load State */}
                  {isLoading && page === 1 ? (
                    <div className="_loading_posts py-4 text-center">
                      <p>Loading your feed...</p>
                    </div>
                  ) : isError ? (
                    <div className="_error_posts py-4 text-center text-red-500">
                      <p>Error loading posts. Please try again later.</p>
                    </div>
                  ) : data?.results && data.results.length > 0 ? (
                    <>
                      {data.results.map((post, index) => {
                        if (data.results.length === index + 1) {
                          return (
                            <div ref={lastItemRef} key={post.id}>
                              <PostCard postData={post} />
                            </div>
                          );
                        } else {
                          // Normal items get no ref
                          return (
                            <div key={post.id}>
                              <PostCard postData={post} />
                            </div>
                          );
                        }
                      })}

                      {/* Loading indicator for subsequent pages */}
                      {isFetching && page > 1 && (
                        <div className="py-6 text-center text-gray-500">
                          <div className="animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                          Loading more posts...
                        </div>
                      )}

                      {/* End of list message */}
                      {!isFetching && !data?.next && (
                        <p className="text-center py-6 text-gray-400 italic">
                          You have caught up! No more posts.
                        </p>
                      )}
                    </>
                  ) : (
                    <NoPostsFound />
                  )}
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
