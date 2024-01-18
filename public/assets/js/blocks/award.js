
$(function() {

    $('.preview').fancybox({
        padding: 0,
        helpers: {
            overlay: {
                locked: false
            }
        }
    });

    var sourceList, portfolioList, emptyEl, items, btnIcon, btn, isFromOtherList, hasBeenOver, index, itemToReplace, draggableOptions, itemsInRow;

    emptyEl = $("<div>", {
        class: "awards-list__item-empty"
    });

    portfolioList = $(".awards-chosen-list");

    draggableOptions = {
        revert: "invalid",
        connectToSortable: portfolioList,
        start: function(event, ui) {
            ui.helper.data("index", ui.helper.index());
            sourceList = $(this).parent();
            isFromOtherList = true;
            hasBeenOver = false;
        },
        stop: function(event, ui) {
            isFromOtherList = false;
            // if (hasBeenOver && isOut) {
            //    itemToReplace.next().replaceWith(ui.helper); 
            // }
        }
    }

    $(".awards-source-list  .awards-list__item").draggable(draggableOptions);

    portfolioList.sortable({
        placeholder: "awards-list__item-empty",
        cancel: ".awards-list__item-empty",
        tolerance: "pointer",
        over: function(event, ui) {
            if (isFromOtherList) {
                $(ui.placeholder).css('display', 'none');

                if (!hasBeenOver) {
                    index = ui.item.data("index");
                    if (index) {
                        itemToReplace = $(sourceList.children()[index - 1]);
                        itemToReplace.after(emptyEl.clone());
                    } else {
                        sourceList.prepend(emptyEl.clone());
                    }
                    
                    hasBeenOver = true;
                }
            }
        },
        start: function(event, ui) {
            ui.item.removeClass("counter");
        },
        stop: function(event, ui) {
            ui.item.addClass("counter");
        },
        receive: function(event, ui) {
            ui.item.draggable("disable");
            items = portfolioList.children(".awards-list__item-empty:not(.ui-sortable-placeholder)");
            $(items[items.length - 1]).remove();
            if (!ui.item.data("source")) {
                ui.item.data("source", sourceList);
            }
            changeIcon(ui.item);
            handleRows();
        }
    });

    $(".awards-list").on("click", ".btn-swap",function(e) {
        e.preventDefault();
        item = $(this).parent().parent().parent();

        sourceList = item.data("source") || item.parent();

        if (changeIcon(item)) {

            addAward(sourceList, item);
        } else {

            removeAward(item);
        }

        handleRows();
    });


    function addAward(sourceList, item) {

        items = portfolioList.children(".awards-list__item-empty:not(.ui-sortable-placeholder)");
        index = item.index();

        item.replaceWith(emptyEl.clone());
        $(items[0]).replaceWith(item);

        item.data("source", sourceList);
        item.data("index", index);
    }

    function removeAward(item) {
        index = item.data("index");
        items = sourceList.children(".awards-list__item, .awards-list__item-empty");

        item.replaceWith(emptyEl.clone());

        $(items[index]).replaceWith(item);

        item.draggable(draggableOptions);
    }

    function changeIcon(item) {
        btn = item.find(".btn-swap");
        btnIcon = btn.find("i");

        if (btnIcon.hasClass("icon-check")) {

            btnIcon.removeClass("icon-check").addClass("icon-times");
            btn.attr("data-hint", "Убрать");
            return true;
        } else {

            btnIcon.removeClass("icon-times").addClass("icon-check");
            btn.attr("data-hint", "Добавить");
            return false;
        }
    }

    itemsInRow = portfolioList.children().length;

    function handleRows() {
        items = portfolioList.children(".awards-list__item-empty:not(.ui-sortable-placeholder)");

        if (items.length === 0) {
            for (i = 0; i < itemsInRow; i++) {
                portfolioList.append(emptyEl.clone());
            }   
        } else if (items.length > itemsInRow) {
            for (i = 0; i < itemsInRow; i++) {
                $(items[i]).remove();
            }
        }
    }

    function counter(currentCount) {
        var count = currentCount || 0;
        return function() {
            return count += 1;
        }
    }
});