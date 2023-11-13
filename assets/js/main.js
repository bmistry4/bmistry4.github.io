
/*
The following code was developed with assistance from OpenAI's ChatGPT-3 language model.
Date: 02/11/23
*/
var CollapsibleModule = (function () {
    var isDragging = false;

    // Handler for mouse down event
    function handleMouseDown(event) {
        isDragging = false;
        // Check for left click
        if (event.which !== 1) {
            isDragging = true;
        }
    }

    // Handler for mouse move event
    function handleMouseMove() {
        isDragging = true;
    }

    // Handler for mouse up event
    function handleMouseUp(event) {
        // Check for non-dragging left click
        if (!isDragging && event.which === 1) {
            toggleCollapsible(this);
        }
    }

    // Toggle collapsible content visibility
    function toggleCollapsible(element) {
        element.classList.toggle("active");
        var children = element.children;
        for (var j = 0; j < children.length; j++) {
            if (children[j].classList.contains("collapsible-content")) {
                var content = children[j];
                // Toggle content visibility based on current state
                if (content.style.maxHeight) {
                    content.style.maxHeight = null; // Collapsed
                } else {
                    content.style.maxHeight = content.scrollHeight + "px"; // Expanded
                }
            }
        }
    }

    // Expand collapsible content on page load
    function expandCollapsibleContent() {
        var coll = document.getElementsByClassName("collapsible");
        for (var i = 0; i < coll.length; i++) {
            toggleCollapsible(coll[i]);
        }
    }

    // Initialize collapsible functionality
    function initialize() {
        var coll = document.getElementsByClassName("collapsible");
        for (var i = 0; i < coll.length; i++) {
            coll[i].addEventListener("mousedown", handleMouseDown);
            coll[i].addEventListener("mousemove", handleMouseMove);
            coll[i].addEventListener("mouseup", handleMouseUp);
        }
        window.addEventListener('load', expandCollapsibleContent);
    }

    // Public method to initialize the module
    return {
        initialize: initialize
    };
})();

// Usage: Initialize the Collapsible Module
CollapsibleModule.initialize();


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// window.addEventListener('scroll', function () {
//     // var nav = document.querySelector('nav');
//     var nav = document.getElementsByID("navbar");

//     if (window.scrollY > 0) {
//         nav.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
//     } else {
//         nav.style.boxShadow = 'none';
//     }
// });
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * Mobile nav toggle
 */
on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
})

/**
 * Mobile nav dropdowns activate
 */
on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
        e.preventDefault()
        this.nextElementSibling.classList.toggle('dropdown-active')
    }
}, true)

/**
 * Scrool with ofset on links with a class name .scrollto
 */
on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
        e.preventDefault()

        let navbar = select('#navbar')
        if (navbar.classList.contains('navbar-mobile')) {
            navbar.classList.remove('navbar-mobile')
            let navbarToggle = select('.mobile-nav-toggle')
            navbarToggle.classList.toggle('bi-list')
            navbarToggle.classList.toggle('bi-x')
        }
        scrollto(this.hash)
    }
}, true)