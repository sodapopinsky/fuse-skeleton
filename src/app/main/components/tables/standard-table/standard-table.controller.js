(function ()
{
    'use strict';

    angular.module('app.components')
        .controller('StandardTableController', StandardTableController);

    /** @ngInject */
    function StandardTableController(api)
    {
        var vm = this;

        // Data
        api.tables.employees.get({}, function (response)
        {
            vm.employees = response.data;
        });

        // Methods

        //////////
    }
})();

