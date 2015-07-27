window.SearcherDisplay = (function($) {
    /**
     * This class provides support for displaying quick search text results to users.
     */
    function SearcherDisplay() { }

    SearcherDisplay.prototype.init = function() {
        this._displayQuickSearch();
    };

    /**
     * This method creates the quick text search entry in navigation menu and wires all required events.
     */
    SearcherDisplay.prototype._displayQuickSearch = function() {
            var quickSearch = $(document.createElement("iframe")),
                   topNavigation = $("#topNavigation"),
                   self = this;

            quickSearch.attr("src", "quicksearch.html");
            quickSearch.css("width", "300px");
            quickSearch.css("height", "50px");
            quickSearch.css("float", "right");
            quickSearch.css("border", "none");

            topNavigation.append(quickSearch);

            window.top.addEventListener("message", function(msg) {
                var msgData = msg.data;

                if (msgData.msgid != "docstrap.quicksearch.done") {
                    return;
                }

                var results = msg.data.results || [];

                self._displaySearchResults(results);
            });
    };

    /**
     * This method displays the quick text search results in a modal dialog.
     */
    SearcherDisplay.prototype._displaySearchResults = function(results) {
            var resultsHolder = $($("#searchResults").find(".modal-body")),
                  fragment = document.createDocumentFragment(),
                  resultsList = document.createElement("ul");

            resultsHolder.empty();

            for (var idx = 0; idx < results.length; idx++) {
                var result = results[idx],
                       item = document.createElement("li"),
                       link = document.createElement("a");

                link.href = result.id;
                link.innerHTML = result.title;

                item.appendChild(link)
                resultsList.appendChild(item);
            }

            fragment.appendChild(resultsList);
            resultsHolder.append(fragment);

            $("#searchResults").modal({"show": true});
    };

    return new SearcherDisplay();
})($);