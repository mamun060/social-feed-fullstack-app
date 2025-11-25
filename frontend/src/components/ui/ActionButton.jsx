export const ActionButton = ({ icon, label, isMobile }) => (
    <button type="button" className="_feed_inner_text_area_bottom_photo_link">
        <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">
        {icon}
        </span>
        {!isMobile && label}
    </button>
);