import React from 'react';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ContainerHeader from 'components/ContainerHeader'
import IntlMessages from 'util/IntlMessages';

const TIPS_LIST = [
    {
        ask: "Mua sắm online giá rẻ đúng nơi đúng lúc",
        answer: `Bí quyết mua sắm online giá rẻ quan trọng nhất là biết mua ở đâu và mua khi nào. Khi mua sắm đúng cửa hàng và đúng thời
        điểm, bạn có thể có được nhiều khuyến mãi và ưu đãi rất hấp dẫn. Thông thường, các cửa hàng online sẽ có các chương
        trình giảm giá mạnh hay khuyến mãi vào các dịp lễ, Tết, Giáng sinh, Quốc tế Phụ nữ… Ngoài ra, nhiều nghiên cứu chỉ ra
        rằng tháng 11 và tháng 1 là những tháng có nhiều khuyến mãi nhất. Trong một tuần thì thứ 3 đến thứ 5 là thời điểm tốt
        nhất để mua sắm online giá rẻ và Chủ nhật là ngày bạn nên tránh mua hàng.`
    },
    {
        ask: "Sử dụng thẻ tín dụng",
        answer: ` Cách mua sắm online bằng thẻ tín dụng khá an toàn và tiện lợi. Người bán hàng thường hoàn lại tiền cho người mua bằng
        phương pháp thanh toán mà người mua sử dụng. Trong trường hợp bạn không hài lòng với món hàng và muốn yêu cầu hoàn lại
        tiền thì việc hoàn tiền qua thẻ sẽ nhanh hơn.
        Trước khi điền thông tin thẻ của mình để thanh toán khi mua sắm online, bạn cần đảm bảo website và nơi bạn mua hàng an
        toàn. Bạn cũng nên lưu lại hóa đơn thanh toán của mình để phòng trường hợp cần đổi trả hàng sau này.`
    },
    {
        ask: "Trò chuyện trực tuyến với người bán",
        answer: `Các trang mua sắm online thường có công cụ để bạn có thể trò chuyện trực tuyến với nhân viên tư vấn bán hàng,
        nhưng người mua hàng online thường ít khi chú ý đến công cụ này.
        
        Để mua sắm online giá rẻ, bạn nên tận dụng chức năng trò chuyện với người bán để xin tư vấn thông tin sản phẩm mình cần
        mua. Đôi khi, bạn còn có thể thuyết phục người bán hàng giảm giá hay khuyến mãi cho mình để mua được sản phẩm ưng ý với
        giá rẻ hơn`
    },
    {
        ask: "Theo dõi các trang của người nổi tiếng",
        answer: `Để thu hút người tiêu dùng, một số thương hiệu đã giới thiệu website và sản phẩm của mình thông qua những người
            nổi tiếng và có ảnh hưởng lớn tới công chúng. Việc theo dõi trang cá nhân hoặc blog của họ sẽ giúp bạn mua sắm online
            giá rẻ hiệu quả hơn vì họ thường chia sẻ thông tin và đánh giá về sản phẩm. Đôi khi, những người nổi tiếng này cũng tặng
            phiếu giảm giá hay mã giảm giá đặc biệt nữa.`
    },
    {
        ask: "Xem kỹ thông tin sản phẩm trước khi mua",
        answer: `Bạn có thể tìm thấy nhiều sản phẩm khi mua sắm online nhưng đôi khi rất khó để đưa ra quyết định sản phẩm nào
            là phù hợp với mình nhất và nên mua kích cỡ, màu sắc nào. Để đảm bảo mua được sản phẩm mình mong muốn, bạn nên xem thật
            kỹ thông tin sản phẩm từ chất liệu, kiểu dáng, kích cỡ đến màu sắc.
    
            Bạn cần đặc biệt lưu ý đến kích cỡ khi mua quần áo hay giày dép trực tuyến. Nếu cần, bạn có thể tận dụng hướng dẫn cách
            chọn kích cỡ và hệ thống hỗ trợ thử đồ online của các cửa hàng để tìm ra kích cỡ vừa vặn với mình.
    
            Đối với mỹ phẩm, bạn cũng cần chú ý cách nhận biết mỹ phẩm giả để tránh mua phải những mỹ phẩm có hại cho làn da.`
    },
    {
        ask: "Kiên nhẫn tìm kiếm sản phẩm phù hợp",
        answer: `Để có thể đảm bảo mua được sản phẩm mình mong muốn với chất lượng tốt và giá thành phải chăng nhất thì bạn cần
        thật kiên nhẫn khi mua sắm online. Bí quyết để mua sắm online giá rẻ là ghi ra danh sách các sản phẩm mà bạn muốn mua,
        sau đó tìm kiếm sản phẩm đó ở một vài trang bán hàng khác nhau.
        
        Khi tìm kiếm sản phẩm ở nhiều trang bán hàng khác nhau, bạn có thể tìm được trang đang có chương trình giảm giá, ưu đãi…
        tại thời điểm bạn muốn mua sản phẩm. Hơn nữa, bạn cũng có thể so sánh kiểu dáng, chất lượng, thông tin sản phẩm cũng như
        giá thành giữa các trang để có sự lựa chọn tốt nhất.`
    },

    {
        ask: "Nhận ưu đãi khi mua hàng lần đầu",
        answer: `Nếu bạn truy cập vào một trang bán hàng trực tuyến mới và quyết định sẽ mua một sản phẩm nào đó ở đây, hãy tìm kiếm những ưu đãi đặc biệt của người bán cho đơn hàng đầu tiên. Đa số các website bán hàng trực tuyến thường có mã giảm giá cho khách hàng mua sắm lần đầu nên đây sẽ là cơ hội để bạn tiết kiệm đấy. `
    },
    {
        ask: "Tận dụng các mã miễn phí giao hàng",
        answer: `Phí vận chuyển hàng hóa là yếu tố làm tăng tổng giá trị đơn hàng khi bạn mua sắm online khá nhiều. Để mua sắm
        online giá rẻ, bạn nên tìm kiếm cơ hội được miễn phí giao hàng. Nhiều trang bán hàng online luôn có sẵn một số mã miễn
        phí giao hàng mỗi tháng cho bạn. Ngoài ra, bạn cũng có thể mua hàng với số lượng lớn để được hưởng chế độ giao hàng miễn
        phí.`
    },
    {
        ask: "Bỏ hàng hóa vào giỏ trước nếu chưa mua",
        answer: `Nếu bạn muốn suy nghĩ và tìm hiểu thêm về một sản phẩm trước khi mua thì có thể lưu sản phẩm đó vào giỏ hàng
            tạm. Đôi khi, các cửa hàng có thể liên hệ với bạn để đề xuất ưu đãi giảm giá cho những sản phẩm bạn đặt trong giỏ hàng
            đấy. Nếu bạn muốn áp dụng bí quyết này thì hãy đăng ký tài khoản đăng ký trên trang web bán hàng trực tuyến bằng địa chỉ
            email đang hoạt động của mình.`
    },
    {
        ask: "Xem xét kỹ các đánh giá về sản phẩm",
        answer: `Mua sắm online đôi khi cần sự thận trọng, đặc biệt là khi bạn mua các thiết bị điện tử hoặc mua hàng từ một cửa
        hàng online mới. Để an toàn hơn, bạn nên tìm hiểu kỹ về cửa hàng cũng như sản phẩm bằng cách xem bình luận và đánh giá
        của người mua hàng trước.
        
        Nhiều cửa hàng trực tuyến cũng cho phép người mua hàng đăng tải hình ảnh thật của sản phẩm để bạn có thể hình dung rõ
        hơn về sản phẩm. Vậy nên, bạn cũng nên dành chút thời gian để đánh giá và bình luận về sản phẩm để cung cấp thông tin
        cho những người mua hàng khác về chất lượng dịch vụ và của sản phẩm.`
    },
];

class Tips extends React.Component {
    state = {
        expanded: null,
        searchValue: '',
        faqsList: [...TIPS_LIST]
    };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    handleSearchValueChange = event => {
        this.setState({
            searchValue: event.target.value
        });
    };

    handleFilterFaqs = event => {
        event.preventDefault();

        this.setState({
            faqsList: TIPS_LIST.filter(faq => {
                return (
                    faq.ask.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
                    faq.answer.toLowerCase().includes(this.state.searchValue.toLowerCase())
                )
            })
        });
    };

    render() {
        const {expanded} = this.state;
        return (
            <div className="app-wrapper animated slideInUpTiny animation-duration-3">

                <ContainerHeader title={<IntlMessages id="pages.tips"/>} match={this.props.match}/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card shadow border-0 bg-white p-2">
                            <form className="m-0" role="search">
                                <div className="search-bar">
                                    <div className="form-group">
                                        <input type="search" className="form-control form-control-lg border-0"
                                               placeholder="Tìm kiếm mẹo mua sắm..."
                                               onChange={this.handleSearchValueChange}/>
                                        <button className="search-icon" onClick={this.handleFilterFaqs}>
                                            <i className="zmdi zmdi-search zmdi-hc-lg"/>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-12">
                        {
                            this.state.faqsList.map((faq, index) => {
                                return (
                                    <ExpansionPanel key={`panel${index}`} expanded={expanded === `panel${index}`}
                                                    onChange={this.handleChange(`panel${index}`)}>
                                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                            {faq.ask}
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <p>{faq.answer}</p>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Tips;

