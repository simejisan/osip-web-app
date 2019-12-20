import React from 'react';
import Slider from "react-slick";

import Service from './components/Service';
import Team from './components/Team';
import ContainerHeader from 'components/ContainerHeader';
import IntlMessages from 'util/IntlMessages';

import featureOne from 'assets/images/features/feature1.jpg'
import featureTwo from 'assets/images/features/feature4.jpg'
import featureThree from 'assets/images/features/favorite.png'
import featureFour from 'assets/images/features/flash.png'

import hoatranAva from 'assets/images/members/hoatran.jpg'
import hoanguyenAva from 'assets/images/members/hoanguyen.jpg'
import hangduongAva from 'assets/images/members/hangduong.jpg'
import tamleAva from 'assets/images/members/tamle.jpg'
import trangphamAva from 'assets/images/members/trangpham.jpg'
import loankhongAva from 'assets/images/members/loankhong.jpg'

const services = [
    {
        id: 'feature-one',
        title: 'Kênh thông tin mua sắm trực tuyến OSIP',
        description: ` Chúng tôi là một dự án start up nhỏ được xây dựng bởi nhóm sinh viên khoa học máy tính đại học công nghệ,
                       xuất phát từ chương trình học phát triển ứng dụng web tại trường. Trang web giúp bạn cập nhật tin tức về 
                       mã giảm giá, các đợt xả hàng của đa phần các trang mua sắm điện tử  một cách nhanh chóng thuận tiện nhất.
                       Thêm nữa, nếu bạn quan tâm đến các xu thế của xã hội, xu hướng mua sắm của mọi người mà lại không có thời 
                       gian tổng hợp, chúng tôi có thể giúp bạn bắt kịp ngay lập tức trên mục từ khóa nổi bật trong ngày. Ngoài 
                       ra bạn có thể giảm thiểu thời gian so sánh giữa các nhà cung cấp tìm kiếm sản phẩm ưng ý, hợp lý nhất cho
                       mình trên mạng bằng cách sử dụng tín năng tìm kiếm sản phẩm của chúng tôi`,
        image: featureOne
    },
    {
        id: 'feature-two',
        title: 'Có thể bạn chưa biết: Từ khóa nổi bật ',
        description: ` Danh sách từ khóa được tìm kiếm hàng đầu trên các trang thương mại điện tử  được cập nhật một cách tự động
                       mỗi 24h giúp người dùng cập nhật thông tin một cách chính xác nhất. Người dùng có thể  lựa chọn xem theo 
                       thứ tự từ số lượt tìm kiếm của từ khóa theo trang thương mại điện tử  mình muốn`,
        image: featureTwo
    },
    {
        id: 'feature-three',
        title: 'Tính năng đặc biệt: Danh sách yêu thích',
        description: ` Ngắm được deal ngon nhưng chưa phải thời để xài ư? Bạn lựa chọn trang web chính xác rồi! Điểm đặc biệt của
                       trang web chúng tôi so với các nơi khác đó chính là khả năng lưu trữ mã giảm giá bạn đã bỏ công lựa chọn
                       từ trước. Bạn không cần thông qua bất kỳ một ứng dụng nào khác, chỉ cần bấm vào biểu tượng trái tim bên cạnh
                       mã giảm giá, bạn có thể xem lại bất cứ khi nào mong muốn. Nhưng cẩn thận với hạn sử dụng của nó nha!`,
        image: featureThree
    },
    {
        id: 'feature-four',
        title: 'HOT HOT: Kiểm tra các sản phẩm Flash Sale',
        description: ` Các đợt Flash Sale của các trang thương mại điện tử đang là xu thế mới hiện nay. Vì chỉ xuất hiện một số mặt
                       hàng cụ thể trong thời gian ngắn nên theo dõi các sản phẩm đó và chọn ra thứ mình thực sự muốn quả thật là 
                       khó khăn không nhỏ đối với khách hàng. Nhưng bạn đã có chúng tôi rồi. Hãy là những người mua sắm thông minh,
                       sử dụng tính năng tra cứu sản phẩm trong đợt giảm giá chớp nhoáng của OSIP là bạn đã có trong tay danh sách 
                       tổng hợp tất cả các sản phẩm trong đợt của nhiều trang mua sắm lớn, tất cả những gì bạn cần quan tâm là lọc
                       ra sản phẩm mình muốn bằng cách gõ vào ô từ khóa để tìm kiếm và đặt mua ngay thôi!`,
        image: featureFour
    },
];
const teams = [
    {
        name: 'Trần Bá Hoà',
        destination: 'Front-end Tech Leader',
        description: `K62CACLC1 - Đại học Công nghệ - ĐHQGHN`,
        image: hoatranAva,
        link: "https://www.facebook.com/hoatrana3"
    },
    {
        name: 'Nguyễn Hữu Hoà',
        destination: 'Back-end Tech Leader',
        description: `K62CACLC1 - Đại học Công nghệ - ĐHQGHN`,
        image: hoanguyenAva,
        link: "https://www.facebook.com/nguyenhuu.hoa.5074"
    },
    {
        name: 'Dương Thị Thuý Hằng',
        destination: 'Main back-end Developer',
        description: `K62CACLC1 - Đại học Công nghệ - ĐHQGHN`,
        image: hangduongAva,
        link: "https://www.facebook.com/duong.hang.77377"
    },
    {
        name: 'Lê Minh Tâm',
        destination: 'Business Analyst & Front-end Developer',
        description: `K62CACLC1 - Đại học Công nghệ - ĐHQGHN`,
        image: tamleAva,
        link: "https://www.facebook.com/gray.angel.1426"
    },
    {
        name: 'Phạm Ngọc Anh Trang',
        destination: 'Main back-end Developer',
        description: `K62CACLC1 - Đại học Công nghệ - ĐHQGHN`,
        image: trangphamAva,
        link: "https://www.facebook.com/kobayashi.kiri"
    },
    {
        name: 'Khổng Thị Mai Loan',
        destination: 'Back-end Developer & Tester',
        description: `K62CACLC1 - Đại học Công nghệ - ĐHQGHN`,
        image: loankhongAva,
        link: "https://www.facebook.com/khongloan1999"
    }
];

const General = ({match}) => {

    const featureOptions = {
        dots: true,
        infinite: true,
        arrows: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const memberOptions = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 950,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: false
                }
            },
            {
                breakpoint: 560,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false
                }
            }
        ]
    };

    return (
        <div className="animated slideInUpTiny animation-duration-3">
            <ContainerHeader
                match={match}
                styleName="text-center"
                title={<IntlMessages id="pages.generalInfo"/>}/>

            <section>
                <Slider className="slick-slider-sec" {...featureOptions}>
                    {
                        services.map((service, index) => {
                            return (
                                <Service key={index} service={service}/>
                            )
                        })
                    }
                </Slider>
            </section>

            <Slider className="slick-slider-cr" {...memberOptions}>
                {
                    teams.map((member, index) => {
                        return (
                            <div key={index} className="slick-slide-item">
                                <Team team={member}/>
                            </div>
                        )
                    })
                }
            </Slider>
        </div>
    );
};

export default General;

