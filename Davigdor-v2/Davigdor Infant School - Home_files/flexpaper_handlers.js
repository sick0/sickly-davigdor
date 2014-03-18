/**
 █▒▓▒░ The FlexPaper Project

 This file is part of FlexPaper.

 FlexPaper is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, version 3 of the License.

 FlexPaper is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with FlexPaper.  If not, see <http://www.gnu.org/licenses/>.

 For more information on FlexPaper please see the FlexPaper project
 home page: http://flexpaper.devaldi.com
 */

$(function() {
    /**
     * Handles the event of external links getting clicked in the document.
     *
     * @example onExternalLinkClicked("http://www.google.com")
     *
     * @param String link
     */
    jQuery('.flexpaper_viewer').bind('onExternalLinkClicked',function(e,link){
        window.location.href = link;
    });

    /**
     * Recieves progress information about the document being loaded
     *
     * @example onProgress( 100,10000 );
     *
     * @param int loaded
     * @param int total
     */
    jQuery('.flexpaper_viewer').bind('onProgress',function(e,loadedBytes,totalBytes){
// console.log ('onProgress');
    });

    /**
     * Handles the event of a document is in progress of loading
     *
     */
    jQuery('.flexpaper_viewer').bind('onDocumentLoading',function(e){
// console.log ('onDocumentLoading');
    });

    /**
     * Handles the event of a document is in progress of loading
     *
     */
    jQuery('.flexpaper_viewer').bind('onPageLoading',function(e,pageNumber){
// console.log ('onPageLoading');
    });

    /**
     * Receives messages about the current page being changed
     *
     * @example onCurrentPageChanged( 10 );
     *
     * @param int pagenum
     */
    jQuery('.flexpaper_viewer').bind('onCurrentPageChanged',function(e,pagenum){
// console.log ('onCurrentPageChanged');
    });

    /**
     * Receives messages about the document being loaded
     *
     * @example onDocumentLoaded( 20 );
     *
     * @param int totalPages
     */
    jQuery('.flexpaper_viewer').bind('onDocumentLoaded',function(e,totalPages){
// console.log ('onDocumentLoaded');
    });

    /**
     * Receives messages about the page loaded
     *
     * @example onPageLoaded( 1 );
     *
     * @param int pageNumber
     */
    jQuery('.flexpaper_viewer').bind('onPageLoaded',function(e,pageNumber){
// console.log ('onPageLoaded');
    });

    /**
     * Receives messages about the page loaded
     *
     * @example onErrorLoadingPage( 1 );
     *
     * @param int pageNumber
     */
    jQuery('.flexpaper_viewer').bind('onErrorLoadingPage',function(e,pageNumber){
// console.log ('onErrorLoadingPage');
    });

    /**
     * Receives error messages when a document is not loading properly
     *
     * @example onDocumentLoadedError( "Network error" );
     *
     * @param String errorMessage
     */
    jQuery('.flexpaper_viewer').bind('onDocumentLoadedError',function(e,errMessage){
// console.log ('onDocumentLoadedError');
    });

    /**
     * Receives error messages when a document has finished printed
     *
     * @example onDocumentPrinted();
     *
     */
    jQuery('.flexpaper_viewer').bind('onDocumentPrinted',function(e){
// console.log ('onDocumentPrinted');
    });
});