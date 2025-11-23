import CreatePostBox from "./CreatePostBox";

export default function Feed() {
  return (
    <div className="_layout_middle_wrap">
      <div className="_layout_middle_inner">
        
        {/* 1. Story Section (Desktop) */}
        <div className="_feed_inner_ppl_card _mar_b16">
          <div className="row">
             {/* Story 1 (You) */}
             <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col">
                <div className="_feed_inner_profile_story _b_radious6">
                   <div className="_feed_inner_profile_story_image">
                      <img src="/images/card_ppl1.png" alt="Story" className="_profile_story_img" />
                      <p className="_feed_inner_story_para">Your Story</p>
                   </div>
                </div>
             </div>
             {/* Story 2 (Others) */}
             <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col">
                <div className="_feed_inner_public_story _b_radious6">
                   <div className="_feed_inner_public_story_image">
                      <img src="/images/card_ppl2.png" alt="Story" className="_public_story_img" />
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* 2. Create Post Text Area */}
        <CreatePostBox />

        {/* 3. Timeline Posts */}
        {/* You can map through data here later */}
        <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16">
           <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">
              <h4 className="_feed_inner_timeline_post_title">-Healthy Tracking App</h4>
              <div className="_feed_inner_timeline_image">
                 <img src="/images/timeline_img.png" alt="" className="_time_img" />
              </div>
           </div>
           {/* Reactions and comments sections go here */}
        </div>

      </div>
    </div>
  );
}