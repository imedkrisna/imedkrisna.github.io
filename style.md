---
---

//
// IMPORTS
//

@import "reset";
@import "variables";
// Syntax highlighting @import is at the bottom of this file

/**************/
/* BASE RULES */
/**************/

html {
  font-size: 100%;
}

body {
	background: $white;
  font: 18px/1.4 $helvetica;
  color: $darkGray;
}

.container {
  margin: 0 auto;
  max-width: 740px;
  padding: 0 10px;
  width: 100%;
}

h1, h2, h3, h4, h5, h6 {
  font-family: $helveticaNeue;
  color: $darkerGray;
  font-weight: bold;

  line-height: 1.7;
  margin: 1em 0 15px;
  padding: 0;

  @include mobile {
    line-height: 1.4;
  }
}

h1 {
  font-size: 30px;
  a {
    color: inherit;
  }
}

h2 {
  font-size: 24px;
}

h3 {
  font-size: 20px;
}

h4 {
  font-size: 18px;
  color: $gray;
}

p {
  margin: 15px 0;
}

a {
  color: $blue;
  text-decoration: none;
	cursor: pointer;
  &:hover, &:active {
    color: $blue;
  }
}

table, th, td {
    padding: 5px;
    border-bottom: 1px solid #ddd;
	tr:nth-child(even) {background-color: #f2f2f2;}
}

sup {
  vertical-align: super;
  font-size: smaller;
}

ul, ol {
  margin: 15px 0;
  padding-left: 30px;
}

ul {
  list-style-type: disc;
}

ol {
  list-style-type: decimal;
}

ol ul, ul ol, ul ul, ol ol {
  margin: 0;
}

ul ul, ol ul {
  list-style-type: circle;
}

em, i {
  font-style: italic;
}

strong, b {
  font-weight: bold;
}

img {
  max-width: 100%;
}

// Fixes images in popup boxes from Google Translate
.gmnoprint img {
  max-width: none;
}

.date {
  font-style: italic;
  color: $gray;
}

// Specify the color of the selection
::-moz-selection {
  color: $black;
  background: $lightGray;
}
::selection {
  color: $black;
  background: $lightGray;
}

// Nicolas Gallagher's micro clearfix hack
// http://nicolasgallagher.com/micro-clearfix-hack/
.clearfix:before,
.clearfix:after {
    content: " ";
    display: table;
}

.clearfix:after {
    clear: both;
}

/*********************/
/* LAYOUT / SECTIONS */
/*********************/

//
// .masthead
//

.wrapper-masthead {
  margin-bottom: 50px;
}

.masthead {
  padding: 20px 0;
  border-bottom: 1px solid $lightGray;

  @include mobile {
    text-align: center;
  }
}

.site-avatar {
  float: left;
  width: 70px;
  height: 70px;
  margin-right: 15px;

  @include mobile {
    float: none;
    display: block;
    margin: 0 auto;
  }

  img {
    border-radius: 5px;
  }
}

.site-info {
  float: left;

  @include mobile {
    float: none;
    display: block;
    margin: 0 auto;
  }
}

.site-name {
  margin: 0;
  color: $darkGray;
  cursor: pointer;
  font-family: $helveticaNeue;
  font-weight: 300;
  font-size: 28px;
  letter-spacing: 1px;
}

.site-description {
  margin: -5px 0 0 0;
  color: $gray;
  font-size: 16px;

  @include mobile {
    margin: 3px 0;
  }
}

nav {
  float: right;
  margin-top: 23px; // @TODO: Vertically middle align
  font-family: $helveticaNeue;
  font-size: 18px;

  @include mobile {
    float: none;
    margin-top: 9px;
    display: block;
    font-size: 16px;
  }

  a {
    margin-left: 20px;
    color: $darkGray;
    text-align: right;
    font-weight: 300;
    letter-spacing: 1px;

    @include mobile {
      margin: 0 10px;
      color: $blue;
    }
  }
}

//
// .main
//

.posts > .post {
  padding-bottom: 2em;
  border-bottom: 1px solid $lightGray;
}

.posts > .post:last-child {
  padding-bottom: 1em;
  border-bottom: none;
}

.post {
  blockquote {
    margin: 1.8em .8em;
    border-left: 2px solid $gray;
    padding: 0.1em 1em;
    color: $gray;
    font-size: 22px;
    font-style: italic;
  }

  .comments {
    margin-top: 10px;
  }

  .read-more {
    text-transform: uppercase;
    font-size: 15px;
  }
}

.wrapper-footer {
  margin-top: 50px;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  background-color: $lightGray;
}

footer {
  padding: 20px 0;
  text-align: center;
}

// NEW CODE styling code box
body{
  margin: 0 auto;
  background-color:white;

/*	--------- FONT FAMILY --------
 following are some optional font families. Usually a family 
is safer to choose than a specific font, 
which may not be on the users computer		*/
  font-family:Georgia, Palatino, serif;
/    font-family:"Book Antiqua", Palatino, serif;
/    font-family:Arial, Helvetica, sans-serif;
/    font-family:Tahoma, Verdana, Geneva, sans-serif;
/    font-family:Courier, monospace;
/    font-family:"Times New Roman", Times, serif;

/*	-------------- COLOR OPTIONS ------------
 following are additional color options for base font
you could uncomment another one to easily change the base color 
or add one to a specific element style below         */		
  color: #333333; /* dark gray not black */
/    color: #000000; /* black */
/    color: #666666; /* medium gray  black */	
/    color: #E3E3E3; /* very light gray */
/    color: white; 

  line-height: 1;
/    max-width: 960px;
  max-width: 800px;
  padding: 30px;
  font-size: 18px;
}


p   {
/    font-size: 22px;
  line-height: 150%;
/    max-width: 540px;
  max-width: 960px;
  font-weight: 400;
   color: #333333
}


h1, h2, h3, h4 {
/    color: #111111;
  font-weight: 400;
}

h2, h3, h4, h5, p {
  margin-bottom: 25px;
  padding: 0;
}

h1 {
  margin-bottom: 10px;
  font-size:300%;
  padding: 0px;
  font-variant:small-caps;
}

h2 {
  font-size:150%
/    margin: 24px 0 6px; 
}

h3 {
  font-size:120%
}
h4 {
  font-size:100%
  font-variant:small-caps;

}
h5 {
  font-size:80%
  font-weight: 100;
}

h6 {
  font-size:80%
  font-weight: 100;
  color:red;
  font-variant:small-caps;
}
a {
  color: grey;
  margin: 0;
  padding: 0;
  vertical-align: baseline;
}
a:hover {
  text-decoration: blink;
  color: green;
}
a:visited {
  color: black;
}
ul, ol {
  padding: 0;
  margin: 0px 0px 0px 50px;
}
ul {
  list-style-type: square;
  list-style-position: inside;

}

li {
   line-height:150%    
}
li ul, li ul {
  margin-left: 24px;
}

pre {
  padding: 0px 24px;
  max-width: 800px;
  white-space: pre-wrap;
}
code {
  font-family: Consolas, Monaco, Andale Mono, monospace;
  line-height: 1.5;
  font-size: 13px;
}
aside {
  display: block;
  float: right;
  width: 390px;
}
blockquote {
  border-left:.5em solid #eee;
  padding: 0 1em;
  margin-left:0;
  max-width: 476px;
}
blockquote  cite {
/   font-size:14px;
  line-height:20px;
  color:#bfbfbf;
}
blockquote cite:before {
  content: '\2014 \00A0';
}

blockquote p {  
  color: #666;
  max-width: 460px;
}
hr {
/    width: 540px;
  text-align: left;
  margin: 0 auto 0 0;
  color: #999;
}


// Settled on moving the import of syntax highlighting to the bottom of the CSS
// ... Otherwise it really bloats up the top of the CSS file and makes it difficult to find the start
@import "highlights";
@import "svg-icons";
