(function ()
{
    'use strict';

    angular
        .module('app.scrumboard')
        .controller('MembersMenuController', MembersMenuController);

    /** @ngInject */
    function MembersMenuController(Board, $mdDialog, $document)
    {
        var vm = this;

        // Data
        vm.board = Board.data;
        vm.newMemberSearchInput = '';

        // Methods
        vm.addNewMember = addNewMember;
        vm.removeMember = removeMember;

        ////////

        /**
         * Add New Member
         */
        function addNewMember()
        {
            console.log('New Member Action');
        }

        /**
         * Remove Member
         */
        function removeMember(ev, memberId)
        {
            var confirm = $mdDialog.confirm({
                title              : 'Remove Member',
                parent             : $document.find('#scrumboard'),
                textContent        : 'Are you sure want to remove member?',
                ariaLabel          : 'remove member',
                targetEvent        : ev,
                clickOutsideToClose: true,
                escapeToClose      : true,
                ok                 : 'Remove',
                cancel             : 'Cancel'
            });

            $mdDialog.show(confirm).then(function ()
            {
                var arr = vm.board.members;
                arr.splice(arr.indexOf(arr.getById(memberId)), 1);

                angular.forEach(vm.board.cards, function (card)
                {
                    if ( card.idMembers && card.idMembers.indexOf(memberId) > -1 )
                    {
                        card.idMembers.splice(card.idMembers.indexOf(memberId), 1);
                    }
                });
            }, function ()
            {
                console.log('canceled');
            });
        }

    }
})();