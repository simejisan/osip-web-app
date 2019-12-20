import React from 'react';

import Slider from "react-slick/lib";
import Avatar from "@material-ui/core/Avatar";

import Unknown from "assets/images/avatars/avatar_unknown.png"
import Avatar0 from "assets/images/avatars/avatar_example_0.png"
import Avatar1 from "assets/images/avatars/avatar_example_1.png"
import Avatar2 from "assets/images/avatars/avatar_example_2.png"
import Avatar3 from "assets/images/avatars/avatar_example_3.png"
import Avatar4 from "assets/images/avatars/avatar_example_4.png"
import Avatar5 from "assets/images/avatars/avatar_example_5.png"
import Avatar6 from "assets/images/avatars/avatar_example_6.png"
import Avatar7 from "assets/images/avatars/avatar_example_7.png"
import Avatar8 from "assets/images/avatars/avatar_example_8.png"
import Avatar9 from "assets/images/avatars/avatar_example_9.png"
import Avatar10 from "assets/images/avatars/avatar_example_10.png"
import Fab from "@material-ui/core/Fab";
import PropTypes from 'prop-types';

export const avatars = [
    {image: Unknown, url: "assets/images/avatars/avatar_unknown.png"},
    {image: Avatar0, url: "assets/images/avatars/avatar_example_0.png"},
    {image: Avatar1, url: "assets/images/avatars/avatar_example_1.png"},
    {image: Avatar2, url: "assets/images/avatars/avatar_example_2.png"},
    {image: Avatar3, url: "assets/images/avatars/avatar_example_3.png"},
    {image: Avatar4, url: "assets/images/avatars/avatar_example_4.png"},
    {image: Avatar5, url: "assets/images/avatars/avatar_example_5.png"},
    {image: Avatar6, url: "assets/images/avatars/avatar_example_6.png"},
    {image: Avatar7, url: "assets/images/avatars/avatar_example_7.png"},
    {image: Avatar8, url: "assets/images/avatars/avatar_example_8.png"},
    {image: Avatar9, url: "assets/images/avatars/avatar_example_9.png"},
    {image: Avatar10, url: "assets/images/avatars/avatar_example_10.png"}
];

const avatarOptions = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
        {
            breakpoint: 950,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                dots: true
            }
        },
        {
            breakpoint: 560,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                dots: true
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                dots: true
            }
        }
    ]
};

class AvatarSelectSlider extends React.Component {
    constructor(props) {
        super(props);

        let index = avatars.findIndex(avatar => avatar.url === this.props.initialUrl);

        this.state = {
            currentAvatarIndex: index >= 0 ? index : 0
        }
    };

    handleOnAvatarClick(avatar, index) {
        this.props.onChangeAvatar(avatar);
        this.setState({currentAvatarIndex: index})
    };

    render() {
        return (
            <div className="avatar-select">
                <Slider className="slick-slider-cr mt-2" {...this.props.options}>
                    {
                        avatars.map((avatar, index) => {
                            return (
                                <div key={index} className="slick-slide-item">
                                    <Fab onClick={() => this.handleOnAvatarClick(avatar, index)} color="primary"
                                         id={`avatar_item_${index}`}
                                         className={`jr-fab-btn user-avatar-outer ${index === this.state.currentAvatarIndex ? "active" : ""}`}>
                                        <Avatar
                                            alt='avatar_image'
                                            src={avatar.image}
                                            className="user-avatar"/>
                                    </Fab>
                                </div>
                            )
                        })
                    }
                </Slider>
            </div>
        )
    }
}

AvatarSelectSlider.defaultProps = {
    options: avatarOptions,
    initialUrl: ''
};

AvatarSelectSlider.propTypes = {
    onChangeAvatar: PropTypes.func
};

export default AvatarSelectSlider;
