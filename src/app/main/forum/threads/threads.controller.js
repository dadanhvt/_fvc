(function() {
    'use strict';

    angular
        .module('app.main.forum')
        .controller('ForumThreadsController', ForumThreadsController);

    /* @ngInject */
    function ForumThreadsController() {
        var cm = this;

        cm.hello = 'Xin Chào ! Nếu đây là chuyến thăm đầu tiên của bạn vào Diễn đàn , hãy chắc chắn kiểm tra quy cách ' +
            'bằng cách nhấn vào liên kết ở dưới . Bạn phải đăng ký trước khi bạn có thể đăng bài : nhấp vào liên kết ' +
            'đăng ký ở trên để tiến hành . Để bắt đầu xem bài viết , chọn diễn đàn mà bạn muốn ghé thăm từ sự chọn lựa bên dưới.';

        cm.register = 'ĐĂNG KÍ';

        cm.forumMenu = [
            {page: "Ngữ Pháp Tiếng Pháp"},
            {page: "Văn Hóa Pháp"},
            {page: "Luyện Thi DELF/TCF"},
            {page: "Chia Sẽ Tài Liệu"},
            {page: "Hỏi Đáp-Tư Vấn"},
            {page: "Thông Tin học Bổng"},
            {page: "Kinh Nghiệm Du Học"},
            {page: "Trao Đổi Mua Bán"},
            {page: "Gia Sư"},
            {page: "Rao Vặt Tại Việt Nam"},
            {page: "Rao Vặt Tại Pháp"},
            {page: "Thông Tin Bổ Ích"},
            {page: "Trung Tâm Dạy Học"}
        ];

        cm.titleInfo = [
            {
                who : "SEZONUL 84 - Sunteti gata ?",
                start : "Bắt đầu bởi Zaharia Cristian ",
                when : "Hôm qua 19:56",
                answer : "Trả lời : 1",
                view : "Xem : 14",
                postsby : "Zaharia Cristian",
                time : "Hôm qua , 07:57"
            },
            {
                who : "SEZONUL 84 - Sunteti gata ?",
                start : "Bắt đầu bởi Zaharia Cristian ",
                when : "Hôm qua 19:56",
                answer : "Trả lời : 1",
                view : "Xem : 14",
                postsby : "Zaharia Cristian",
                time : "Hôm qua , 07:57"
            },
            {
                who : "SEZONUL 84 - Sunteti gata ?",
                start : "Bắt đầu bởi Zaharia Cristian ",
                when : "Hôm qua 19:56",
                answer : "Trả lời : 1",
                view : "Xem : 14",
                postsby : "Zaharia Cristian",
                time : "Hôm qua , 07:57"
            },
            {
                who : "SEZONUL 84 - Sunteti gata ?",
                start : "Bắt đầu bởi Zaharia Cristian ",
                when : "Hôm qua 19:56",
                answer : "Trả lời : 1",
                view : "Xem : 14",
                postsby : "Zaharia Cristian",
                time : "Hôm qua , 07:57"
            },
            {
                who : "SEZONUL 84 - Sunteti gata ?",
                start : "Bắt đầu bởi Zaharia Cristian ",
                when : "Hôm qua 19:56",
                answer : "Trả lời : 1",
                view : "Xem : 14",
                postsby : "Zaharia Cristian",
                time : "Hôm qua , 07:57"
            },
            {
                who : "SEZONUL 84 - Sunteti gata ?",
                start : "Bắt đầu bởi Zaharia Cristian ",
                when : "Hôm qua 19:56",
                answer : "Trả lời : 1",
                view : "Xem : 14",
                postsby : "Zaharia Cristian",
                time : "Hôm qua , 07:57"
            },
            {
                who : "SEZONUL 84 - Sunteti gata ?",
                start : "Bắt đầu bởi Zaharia Cristian ",
                when : "Hôm qua 19:56",
                answer : "Trả lời : 1",
                view : "Xem : 14",
                postsby : "Zaharia Cristian",
                time : "Hôm qua , 07:57"
            },
            {
                who : "SEZONUL 84 - Sunteti gata ?",
                start : "Bắt đầu bởi Zaharia Cristian ",
                when : "Hôm qua 19:56",
                answer : "Trả lời : 1",
                view : "Xem : 14",
                postsby : "Zaharia Cristian",
                time : "Hôm qua , 07:57"
            },
            {
                who : "SEZONUL 84 - Sunteti gata ?",
                start : "Bắt đầu bởi Zaharia Cristian ",
                when : "Hôm qua 19:56",
                answer : "Trả lời : 1",
                view : "Xem : 14",
                postsby : "Zaharia Cristian",
                time : "Hôm qua , 07:57"
            },
            {
                who : "SEZONUL 84 - Sunteti gata ?",
                start : "Bắt đầu bởi Zaharia Cristian ",
                when : "Hôm qua 19:56",
                answer : "Trả lời : 1",
                view : "Xem : 14",
                postsby : "Zaharia Cristian",
                time : "Hôm qua , 07:57"
            },
            {
                who : "SEZONUL 84 - Sunteti gata ?",
                start : "Bắt đầu bởi Zaharia Cristian ",
                when : "Hôm qua 19:56",
                answer : "Trả lời : 1",
                view : "Xem : 14",
                postsby : "Zaharia Cristian",
                time : "Hôm qua , 07:57"
            },
            {
                who : "SEZONUL 84 - Sunteti gata ?",
                start : "Bắt đầu bởi Zaharia Cristian ",
                when : "Hôm qua 19:56",
                answer : "Trả lời : 1",
                view : "Xem : 14",
                postsby : "Zaharia Cristian",
                time : "Hôm qua , 07:57"
            },
            {
                who : "SEZONUL 84 - Sunteti gata ?",
                start : "Bắt đầu bởi Zaharia Cristian ",
                when : "Hôm qua 19:56",
                answer : "Trả lời : 1",
                view : "Xem : 14",
                postsby : "Zaharia Cristian",
                time : "Hôm qua , 07:57"
            },
            {
                who : "SEZONUL 84 - Sunteti gata ?",
                start : "Bắt đầu bởi Zaharia Cristian ",
                when : "Hôm qua 19:56",
                answer : "Trả lời : 1",
                view : "Xem : 14",
                postsby : "Zaharia Cristian",
                time : "Hôm qua , 07:57"
            }
        ];

    }

})();
/**
 * Created by Tri NH on 10/14/2016.
 */
