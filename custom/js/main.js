var main = function() {
  $(".content-pane").fadeTo(600, 1);

  $(".nav a").on("click", function() {
    navBar.navUpdateActive(this);
    contentPane.updateContent(this);
  });
 
  $(".project").on({mouseenter: projects.markActive,
                    mouseleave: projects.markInactive});
};

var navBar = {
  navUpdateActive: function(navComp) {
    $(".nav").find(".my-navbar-active").removeClass("my-navbar-active");
    if (!$(navComp).hasClass("dropdown-toggle")) {
      $(navComp).parent().addClass("my-navbar-active");
    };
  }
};

var contentPane = {
  updateContent: function(navComp) {
    contentPane.removeContent(navComp);
    contentPane.addContent(navComp);
  },

  removeContent: function(navComp) {
    if (!$(navComp).hasClass("dropdown-toggle")) $(".my-containers").fadeTo(500, 0);
  },

  addContent: function(navComp) {
    if ($(navComp).is("#nav-home")) {
      $(".home-container").fadeTo(500, 1);
    } else if ($(navComp).is("#nav-about")) {
      $(".about-container").fadeTo(500, 1);
    } else if ($(navComp).is("#nav-projects")) {
      $(".projects-container").fadeTo(500, 1);
    };
  }
};

var projects = {
  markInactive: function() {
    if ($(this).hasClass("project-jumbo")) {
      $(this).removeClass("rainbow");
      $(this).children("h1").removeClass("rainbow");
    } else {
      $(this).fadeTo(500, 0.7);
    }
  },

  markActive: function() {
    if ($(this).hasClass("project-jumbo")) {
      $(this).addClass("rainbow");
      $(this).children("h1").addClass("rainbow");
    } else {
      $(this).fadeTo(500, 1);
    }
  }
}

$(document).ready(main);
