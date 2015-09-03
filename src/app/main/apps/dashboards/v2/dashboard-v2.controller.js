(function ()
{
    'use strict';

    angular.module('app.dashboard-v2')
        .controller('DashboardV2Controller', DashboardV2Controller);

    /** @ngInject */
    function DashboardV2Controller()
    {
        var vm = this;

        // Data
        vm.widget1 = {
            title   : 'ANALYTICS',
            subtitle: 'Last 30 days',
            chart   : {
                columns: [
                    {
                        id    : 'Visitors',
                        name  : 'Visitors',
                        color : 'lightgrey',
                        values: '30,75,290,400,150,250,75,210,125,92,30,75,290,400',
                        type  : 'bar'
                    },
                    {
                        id    : 'Bounce',
                        name  : 'Bounce',
                        color : 'green',
                        values: '26,62,210,349,90,241,69,120,100,20,10,10,189,165',
                        type  : 'spline'
                    }
                ]
            }
        };

        vm.widget2 = {
            title   : 'STORAGE CAPACITY',
            value   : 80,
            detail  : 'This is the back side. You can show detailed information here.',
        };

        vm.widget3 = {
            title: 'ONLINE MEMBERS',
            value: 658,
            icon: 'icon-account'
        };

        vm.widget4 = {
            title: 'MEMBERS FOR PAST 30 DAYS',
            value: 55,
            icon: 'icon-account-plus'
        };

        vm.widget5 = {
            title: 'TOTAL MEMBERS',
            value: 59962,
            icon: 'icon-account-multiple'
        };

        //////////

    }

})();
