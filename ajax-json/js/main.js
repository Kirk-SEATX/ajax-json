// The following comments are settings for various linters
// Not sure if a reported error matters? Look it up at http://linterrors.com/js
/*global console: false, window: false, document: false*/

/*jslint es5: true */
/*jslint node: false*/
/*jslint browser: true*/
/*jslint devel: true*/
/*jslint plusplus: true */

/*jshint es5: true */
/*jshint globalstrict: true*/
/*jshint jquery: true*/
/*jshint node: false*/
/*jshint browser: true*/
/*jshint devel: true*/

/*eslint-env jquery */
/*eslint-env browser*/
/*eslint no-console: 0*/
(function () {
  "use strict";
  // The DOM is now loaded and can be manipulated
  var DEBUG = true;
  $("button").button(); // Enhance buttons with jQueryUI
  var $form = $(document.forms.requestImagesForm);
  if (DEBUG) {
    console.log("$form", $form);
  }

  // TODO: In the requestImages function, make an AJAX request for JSONP data
  // and append the item descriptions (which include images) into the #images
  // HTML element.
  // See the example called "Loads the four most recent pictures of Mount
  // Rainier from the Flickr JSONP API."
  // at: https://api.jquery.com/jQuery.getJSON/
  // but get the tags from the #searchTags form HTML element.
  // Make sure you use jQuery's .done and .fail AJAX methods.
  //
  // Inside .done you must
  // a. Replace all content inside the #images HTML element
  // so it doesn't have content from other AJAX requests in it.
  // You must use this line of code to get an item's description
  // (this is required in the rubric):
  // $images.append($("<div>").append(item.description));
  // Display all the items, unlike the example which only loads 4 items from
  // Flickr.
  // b. Animate the icon on the submit button by removing from the
  // $submiticon the iconoir-wifi-off, iconoir-wifi, and spin classes and
  // adding the iconoir-search class so the user will know the button can be
  // used again to search Flickr.
  // c. At the end of the .done function you need to alter the new elements
  // just successfully loaded from Flickr:
  // Use the jQuery attr function to make ONLY all of the <a> elements (the links)
  // inside the div with the id of "images" have the target of "_blank" so when
  // users click on them they open in a new window or tab. Also add the class
  // flickrimage to ONLY all of the img elements inside the div with the id of "images"
  // so that will be animated bigger with a blue glowing outline if a user hovers
  // their mouse over it.
  //
  // Inside .fail let the user know that a failure occurred (which can
  // happen if your Wi-Fi is turned off) by:
  // a. Using the console.log function to say the search of Flickr failed.
  // b. Animate the icon on the submit button by removing from the
  // $submiticon the iconoir-search, iconoir-wifi, and spin classes and
  // adding the iconoir-wifi-off class to indicate to the user that the
  // search of Flickr failed.
  var requestImages = function () {
    var $submiticon = $("#submiticon");
    // if user submit make the icon switch to wifi and spin
    $submiticon
      .removeClass("iconoir-wifi-off iconoir-search")
      .addClass("iconoir-wifi spin");
    // TODO: Write your code after this line in this requestImages function

    // bind flickrUrl to flickrAPI url for readability
    var $searchTags = $("#searchTags").val();
    var $images = $("#images");
    var flickrURL =
      "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    $.getJSON(flickrURL, {
      // tags comes from input to $searchTags
      // TODO: write the get value from searchTags
      tags: $searchTags,
      tagmode: "any",
      format: "json",
    })
      .done(function (data) {
        //  empty the images div
        $images.empty();
        // look through the data returned from flickr
        $.each(data.items, function (i, item) {
          // append a new div for each image and a description to each div
          $("#images").append($("<div>").append(item.description));
        });
        // set all links to open in a new page
        $("#images a").attr("target", "_blank");
        // add flickrimage class to all images
        $("img").addClass("flickrimage");
        // if results have returned remove the wifi icon and stop spin show the search icon
        $submiticon.removeClass("iconoir-wifi spin").addClass("iconoir-search");
      })
      .fail(function () {
        console.log("Search failed");
        $submiticon.removeClass("spin").addClass("iconoir-wifi-off");
      });
  };

  if ($form) {
    // TODO MAYBE: Bind the submit event to a function that prevents
    // the default action
    // and then calls the requestImages function.
    $form.on("submit", function (event) {
      if (DEBUG) {
        console.log("Handler for $form.submit() called.");
      }
      // TODO DONE: Prevent the default behavior of the form submit event, by
      // using the event parameter
      event.preventDefault();
      if (event) {
        // TODO DONE: Call the requestImages function
        requestImages();
      }

      // TODO DONE: return false (the old way of preventing the default
      // behavior of the form submit event)
      return false;
    });

    // Make the initial AJAX request as the page loads
    requestImages();
  }

  /* From https://graphicdon.com/2020/07/01/a-complete-guide-to-dark-mode-on-the-web/ */
  var btn = document.querySelector(".btn-toggle");
  var prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  var currentTheme = localStorage.getItem("theme");
  if (currentTheme === "dark") {
    document.body.classList.toggle("dark-theme");
  } else if (currentTheme === "light") {
    document.body.classList.toggle("light-theme");
  }

  btn.addEventListener("click", function (event) {
    if (DEBUG) {
      console.log("btn click event:", event);
    }
    var theme = "dark";
    if (prefersDarkScheme.matches) {
      document.body.classList.toggle("light-theme");
      theme = document.body.classList.contains("light-theme")
        ? "light"
        : "dark";
    } else {
      document.body.classList.toggle("dark-theme");
      theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
    }
    localStorage.setItem("theme", theme);
  });
})(); // See: https://developer.mozilla.org/en-US/docs/Glossary/IIFE
