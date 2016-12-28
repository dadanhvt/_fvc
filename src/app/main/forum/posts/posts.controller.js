(function () {
    'use strict';

    angular
        .module('app.main.forum')
        .controller('ForumPostController', ForumPostController);

    /* @ngInject */

    function ForumPostController($mdDialog) {
        var zm = this;
        zm.hello = 'Xin Chào ! Nếu đây là chuyến thăm đầu tiên của bạn vào Diễn đàn , hãy chắc chắn kiểm tra quy cách ' +
            'bằng cách nhấn vào liên kết ở dưới . Bạn phải đăng ký trước khi bạn có thể đăng bài : nhấp vào liên kết ' +
            'đăng ký ở trên để tiến hành . Để bắt đầu xem bài viết , chọn diễn đàn mà bạn muốn ghé thăm từ sự chọn lựa bên dưới.';
        zm.tieude = 'SEZONUL 84 - Sunteti gata ?';
        zm.titleInfo = [
            {
                dateEdit:'Last Edit : 15/7/1997 lúc 18:06',
                numbers:'#1',
                datePost :'Ngày 15/7/1996 lúc 18:06',
                title: 'Title',
                name: 'Bom Binladen',
                date: 'Ngày Tham Gia : 15/8/2013',
                postition:'Admin Forum',
                content: "ply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsumply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsumpply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsumly dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
                button:'TRẢ LỜI',
                datepost:'Date Post : 20/11/1996'
            },
            {
                dateEdit:'Last Edit : 15/7/1997 lúc 18:06',
                numbers:'#2',
                datePost :'Ngày 15/7/1996 lúc 18:06',
                title: 'Title',
                name: 'Bom Binladen',
                postition:'Admin Forum',
                date: 'Ngày Tham Gia : 15/8/2013',
                content: "ply ply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsumdummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
                button:'TRẢ LỜI',
                datepost:'Date Post : 20/11/1996'
            }
        ];


    }
})();

/**
 * Created by Tri NH on 10/17/2016.
 */
