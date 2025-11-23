import Link from 'next/link';
import Image from 'next/image';

const RightSidebar = () => {
  const friendsList = [
    {
      id: 1,
      name: "Steve Jobs",
      title: "CEO of Apple",
      imageSrc: "/images/people1.png",
      isActive: false,
      time: "5 minute ago",
    },
    {
      id: 2,
      name: "Ryan Roslansky",
      title: "CEO of Linkedin",
      imageSrc: "/images/people2.png",
      isActive: true,
    },
    {
      id: 3,
      name: "Dylan Field",
      title: "CEO of Figma",
      imageSrc: "/images/people3.png",
      isActive: true,
    },
    {
      id: 4,
      name: "Dylan Field",
      title: "CEO of Figma",
      imageSrc: "/images/people3.png",
      isActive: true,
    },
    {
        id: 5,
        name: "Steve Jobs",
        title: "CEO of Apple",
        imageSrc: "/images/people1.png",
        isActive: false,
        time: "5 minute ago",
      },
  ];

  // Reusable Green Status Dot SVG Component
  const ActiveStatusDot = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 14 14">
      <rect width="12" height="12" x="1" y="1" fill="#0ACF83" stroke="#fff" strokeWidth="2" rx="6" />
    </svg>
  );


  return (
    <div className="_layout_right_sidebar_wrap">
      
      {/* section 1: You Might Like  */}
      <div className="_layout_right_sidebar_inner">
        <div className="_right_inner_area_info _padd_t24 _padd_b24 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
          <div className="_right_inner_area_info_content _mar_b24">
            <h4 className="_right_inner_area_info_content_title _title5">You Might Like</h4>
            <span className="_right_inner_area_info_content_txt">
              <Link href="#" className="_right_inner_area_info_content_txt_link">
                See All
              </Link>
            </span>
          </div>
          <hr className="_underline" />
          <div className="_right_inner_area_info_ppl">
            <div className="_right_inner_area_info_box">
              <div className="_right_inner_area_info_box_image">
                <Link href="/profile">
                  <Image 
                    src="/images/Avatar.png" 
                    alt="Radovan SkillArena" 
                    width={48} 
                    height={48} 
                    className="_ppl_img" 
                  />
                </Link>
              </div>
              <div className="_right_inner_area_info_box_txt">
                <Link href="/profile">
                  <h4 className="_right_inner_area_info_box_title">Radovan SkillArena</h4>
                </Link>
                <p className="_right_inner_area_info_box_para">Founder & CEO at Trophy</p>
              </div>
            </div>
            <div className="_right_info_btn_grp">
              <button type="button" className="_right_info_btn_link">Ignore</button>
              <button type="button" className="_right_info_btn_link _right_info_btn_link_active">Follow</button>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Your Friends*/}
      <div className="_layout_right_sidebar_inner">
        <div className="_feed_right_inner_area_card _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
          <div className="_feed_top_fixed">
            <div className="_feed_right_inner_area_card_content _mar_b24">
              <h4 className="_feed_right_inner_area_card_content_title _title5">Your Friends</h4>
              <span className="_feed_right_inner_area_card_content_txt">
                <Link href="/find-friends" className="_feed_right_inner_area_card_content_txt_link">
                  See All
                </Link>
              </span>
            </div>
            <form className="_feed_right_inner_area_card_form">
              <svg className="_feed_right_inner_area_card_form_svg" xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 17 17">
                <circle cx="7" cy="7" r="6" stroke="#666"></circle>
                <path stroke="#666" strokeLinecap="round" d="M16 16l-3-3"></path>
              </svg>
              <input 
                className="form-control me-2 _feed_right_inner_area_card_form_inpt" 
                type="search" 
                placeholder="input search text" 
                aria-label="Search" 
              />
            </form>
          </div>
          
          <div className="_feed_bottom_fixed">
            {friendsList.map((friend) => (
               <div 
                 key={friend.id} 
                 className={`_feed_right_inner_area_card_ppl ${!friend.isActive ? '_feed_right_inner_area_card_ppl_inactive' : ''}`}
               >
               <div className="_feed_right_inner_area_card_ppl_box">
                 <div className="_feed_right_inner_area_card_ppl_image">
                   <Link href="/profile">
                     <Image 
                        src={friend.imageSrc} 
                        alt={friend.name}
                        width={40}
                        height={40} 
                        className="_box_ppl_img" 
                      />
                   </Link>
                 </div>
                 <div className="_feed_right_inner_area_card_ppl_txt">
                   <Link href="/profile">
                     <h4 className="_feed_right_inner_area_card_ppl_title">{friend.name}</h4>
                   </Link>
                   <p className="_feed_right_inner_area_card_ppl_para">{friend.title}</p>
                 </div>
               </div>
               <div className="_feed_right_inner_area_card_ppl_side">
                 {friend.isActive ? <ActiveStatusDot /> : <span>{friend.time}</span>}
               </div>
             </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;