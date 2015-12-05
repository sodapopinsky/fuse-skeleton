(function ()
{
    'use strict';

    angular
        .module('app.scrumboard')
        .controller('msSbAddCardController', msSbAddCardController)
        .directive('msSbAddCard', msSbAddCardDirective);

    /** @ngInject */
    function msSbAddCardDirective($document, $compile, $timeout)
    {
        return {
            restrict    : 'A',
            controller  : 'msSbAddCardController',
            controllerAs: 'vm',
            scope       : {
                msListId: '=',
            },
            link        : function (scope, element, attrs, ctrl)
            {
                scope.closeForm = closeForm;
                scope.scrollListContentBottom = scrollListContentBottom;

                var form = '<form ng-submit="vm.addNewCard()" class="ms-sb-add-card-form md-whiteframe-2dp" layout="column">\n\n    <md-input-container flex md-no-float>\n        <input placeholder="Card title" type="text" autocomplete="off"\n               ng-model="vm.newCardName">\n    </md-input-container>\n\n    <div layout="row" layout-align="space-between center">\n        <md-button type="submit"\n                   class="add-button md-accent md-raised"\n                   aria-label="add card">Add\n        </md-button>\n        <md-button ng-click="closeForm()" class="cancel-button md-icon-button"\n                   aria-label="cancel">\n            <md-icon md-font-icon="icon-close"></md-icon>\n        </md-button>\n    </div>\n\n</form>',
                    formEl = '',
                    listContent = element.prev();

                /**
                 * Click Event
                 */
                element.on('click', function (event)
                {
                    event.preventDefault();
                    openForm();
                });

                /**
                 * Open Form
                 */
                function openForm()
                {
                    element.hide();

                    formEl = $compile(form)(scope);

                    listContent.append(formEl);

                    scrollListContentBottom();

                    formEl.find('input').focus();

                    $timeout(function ()
                    {
                        $document.on('click', outSideClick);
                    });

                }

                /**
                 * Close Form
                 */
                function closeForm()
                {
                    formEl.remove();

                    element.next().remove();

                    element.show();

                    PerfectScrollbar.update(listContent[0]);

                    // Clean
                    $document.off('click', outSideClick);
                    scope.$on('$destroy', function ()
                    {
                        $document.off('click', outSideClick);
                    });
                }

                /**
                 * Scroll List to the Bottom
                 */
                function scrollListContentBottom()
                {
                    listContent[0].scrollTop = listContent[0].scrollHeight;
                }

                /**
                 * Click Outside Event Handler
                 * @param event
                 */
                var outSideClick = function (event)
                {
                    var isChild = formEl.has(event.target).length > 0;
                    var isSelf = formEl[0] == event.target;
                    var isInside = isChild || isSelf;

                    if ( !isInside )
                    {
                        closeForm();
                    }
                }

            }
        };
    }

    /** @ngInject */
    function msSbAddCardController($scope, $timeout, Board, utils)
    {
        var vm = this;

        vm.newCardName = '';
        var listId = $scope.msListId;
        var board = Board.data;
        var cards = board.cards;
        var list = board.lists.getById(listId);

        // Methods
        vm.addNewCard = addNewCard;

        /////

        /**
         * Add New Card
         */
        function addNewCard()
        {
            if ( vm.newCardName === '' )
            {
                return;
            }

            var newCardId = utils.guidGenerator();

            cards.push({
                "id"               : newCardId,
                "name"             : vm.newCardName,
                "description"      : '',
                "idAttachmentCover": '',
                "idMembers"        : [],
                "idLabels"         : [],
                "attachments"      : [],
                "subscribed"       : false,
                "checklists"       : [],
                "checkItems"       : 0,
                "checkItemsChecked": 0,
                "comments"         : [],
                "activities"       : [],
                "due"              : null
            });

            list.idCards.push(newCardId);
            $timeout(function ()
            {
                $scope.scrollListContentBottom();
            });

            vm.newCardName = '';

        }
    }
})();