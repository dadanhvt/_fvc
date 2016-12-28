(function () {
    'use strict';

    angular
        .module('app.main.forum')
        .controller('ForumIndexController', ForumIndexController);

    /* @ngInject */
    function ForumIndexController() {
        var am = this;
        am.titlehead4 = 'Thông Tin Cộng Đồng';
        am.titlehead3 = 'Rao Vặt';
        am.titlehead2 = 'Thông Tin Du Học';
        am.titlehead1 = 'Trao Đổi Tiếng Pháp';
        am.threadsPosts = 'Threads / Post';
        am.lastPost = 'Last Post';
        am.info4 = [
            {
                title: 'Thông Tin Bổ Ích',
                view: '1000 lượt xem',
                threads: 'Threads',
                viewThread: '28,761',
                post: 'Posts',
                viewPost: '289,987',
                titleMini: 'Title....',
                byname: 'by Name',
                date: 'Today, 07:18 AM'

            },
            {
                title: 'Trung Tâm Dạy Học',
                view: '1000 lượt xem',
                threads: 'Threads',
                viewThread: '28,761',
                post: 'Posts',
                viewPost: '289,987',
                titleMini: 'Title....',
                byname: 'by Name',
                date: 'Today, 07:18 AM'

            }

        ];
        am.info3 = [
            {
                title: 'Trao Đổi Mua Bán',
                view: '1000 lượt xem',
                threads: 'Threads',
                viewThread: '28,761',
                post: 'Posts',
                viewPost: '289,987',
                titleMini: 'Title....',
                byname: 'by Name',
                date: 'Today, 07:18 AM'

            },
            {
                title: 'Gia Sư',
                view: '1000 lượt xem',
                threads: 'Threads',
                viewThread: '28,761',
                post: 'Posts',
                viewPost: '289,987',
                titleMini: 'Title....',
                byname: 'by Name',
                date: 'Today, 07:18 AM'

            },
            {
                title: 'Rao Vặt Tại Việt Nam',
                view: '1000 lượt xem',
                threads: 'Threads',
                viewThread: '28,761',
                post: 'Posts',
                viewPost: '289,987',
                titleMini: 'Title....',
                byname: 'by Name',
                date: 'Today, 07:18 AM'

            },
            {
                title: 'Rao Vặt Tại Pháp',
                view: '1000 lượt xem',
                threads: 'Threads',
                viewThread: '28,761',
                post: 'Posts',
                viewPost: '289,987',
                titleMini: 'Title....',
                byname: 'by Name',
                date: 'Today, 07:18 AM'

            }
        ];
        am.info2 = [
            {
                title: 'Hỏi Đáp Tư Vấn',
                view: '1000 lượt xem',
                threads: 'Threads',
                viewThread: '28,761',
                post: 'Posts',
                viewPost: '289,987',
                titleMini: 'Title....',
                byname: 'by Name',
                date: 'Today, 07:18 AM'

            },
            {
                title: 'Thông Tin Học Bổng',
                view: '1000 lượt xem',
                threads: 'Threads',
                viewThread: '28,761',
                post: 'Posts',
                viewPost: '289,987',
                titleMini: 'Title....',
                byname: 'by Name',
                date: 'Today, 07:18 AM'

            },
            {
                title: 'Kinh Nghiệm Du Học',
                view: '1000 lượt xem',
                threads: 'Threads',
                viewThread: '28,761',
                post: 'Posts',
                viewPost: '289,987',
                titleMini: 'Title....',
                byname: 'by Name',
                date: 'Today, 07:18 AM'

            }
        ];
        am.info1 = [
            {
                title: 'Ngữ Pháp Tiếng Pháp',
                view: '1000 lượt xem',
                threads: 'Threads',
                viewThread: '28,761',
                post: 'Posts',
                viewPost: '289,987',
                titleMini: 'Title....',
                byname: 'by Name',
                date: 'Today, 07:18 AM'

            },
            {
                title: 'Văn Hóa Pháp',
                view: '1000 lượt xem',
                threads: 'Threads',
                viewThread: '28,761',
                post: 'Posts',
                viewPost: '289,987',
                titleMini: 'Title....',
                byname: 'by Name',
                date: 'Today, 07:18 AM'

            },
            {
                title: 'Luyện Thi DELF/TCF',
                view: '1000 lượt xem',
                threads: 'Threads',
                viewThread: '28,761',
                post: 'Posts',
                viewPost: '289,987',
                titleMini: 'Title....',
                byname: 'by Name',
                date: 'Today, 07:18 AM'

            },
            {
                title: 'Chia Sẽ Tài Liệu',
                view: '1000 lượt xem',
                threads: 'Threads',
                viewThread: '28,761',
                post: 'Posts',
                viewPost: '289,987',
                titleMini: 'Title....',
                byname: 'by Name',
                date: 'Today, 07:18 AM'

            }
        ];
    }
})();
