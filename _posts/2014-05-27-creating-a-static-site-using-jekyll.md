---
layout: post
title: Creating a Static Site Using Jekyll
subtitle: Presenting the technology behind scottescue.com
---

This is a discussion on how I use Jekyll to generate this static blog.  There are several great 
tutorials on how to get started with Jekyll, so I'm going to hit the high points of my setup without going into great 
detail on how to use Jekyll.

<!--more-->

I've been developing web applications for well over a decade, but amazingly I've never had a web presence of my own.  I've heard 
it said that [the cobbler's kids go shoeless](http://english.stackexchange.com/questions/46681/a-saying-indicating-how-some-professionals-dont-apply-their-skills-for-themselv "Link to discussion on the 'Cobbler's Kids' phenomenon"),
but I've taken that phenomenon to a whole new level.  I'm like the cobbler showing 
up to a trade fair barefoot, and with no shoes in tow.  *"Hi, I'm 
Scott.  I build web applications.  Oh, you actually want to see my work on the web?  Sorry, no can do.  But I'm really good, scouts honor."*
The absurdity of this recently hit me like a ton of bricks.  In my defense, I have done plenty of web work but very little 
of it has been public.  The little that was at one time public, has either since been redesigned or placed behind an authentication wall.  
So I set out to change that by creating this site and I found out about Jekyll along the way.  

### What is Jekyll...and did you say **_static blog_**?
According to the good folks who created it, Jekyll isn't a blogging engine, it's simply a blog-aware static site generator.  However you define it, 
   Jekyll is a tool that allows you to create a static blog.  That's right, I did say static blog... as in consisting solely 
   of plain 'ol HTML, CSS, and JavaScript.  You define the source of your site, including blog entries, using templates and 
   markdown content.  Jekyll processes that source and turns it into a static site.  There is no database or application 
   runtime to secure, deploy, or manage.  Your static site can now be hosted on any simple web server, easily scaled, and even pushed to a CDN 
   to make it as snappy as possible.  
   
### Managing Blog Entries and Site Content
With Jekyll, there is no *"live"*, hosted admin area so the worry of someone defacing or stealing control of
   your blog is basically eliminated.  The source for your site simply lives on your workstation and in source control (there 
    are plenty of free, hosted source control options nowadays -- for the love of all that's holy, please use source control!).  Adding 
    a new blog entry or updating site content is as simple as updating site source on your workstation, regenerating the site with Jekyll, and then
    publishing the resulting site. That's it, *boom, done, thanks for stopping by*!  Actually, on second thought, that doesn't sound so easy
    in practice.  Let's talk about automation.
      
### Automated Build and Deployment
There are many options for automating the Jekyll build and also for publishing the resulting site.  Although this isn't the option I chose, [Github Pages](http://github.io "Github Pages Home")
 is by far the quickest, easiest, and cheapest (as in free) path from soup to nuts.  Combine that
 with [JekyllBootstrap](http://jekyllbootstrap.com/ "JekyllBootstrap Home") and you can have a fully functional blog up 
 and running in minutes, although it won't exactly look original.  Github pages is completely free as long as 
 you don't mind your site's Git repository being public, since private repositories require a subscription.  However, there are plenty of 
   other hosting options.  I chose to host on Amazon S3, in part, because I want to have guaranteed scaling and 
   control over caching.  I also already host content for other sites on Amazon S3, so I like the idea of keeping everything
   in the same place.
   
Without further ado, here's a quick description of the full technology stack I'm using.
  
##### Source Control - [Bitbucket](http://bitbucket.org/ "Bitbucket's Home Page")
My site is stored in a Git repository hosted on Bitbucket.  Since Jekyll was created by a Github founder and is heavily promoted for use on Github, it almost seems insulting to use
Bitbucket for my site's source control.  *Almost*.  What can I say, Bitbucket allows unlimited private repositories for free
and I host several other projects there.  So far I haven't lost any sleep over it.
  
##### Continuous Build / Continuous Deployment - [Wercker](http://wercker.com/ "Wercker's Home Page")
Wercker is a continuous delivery platform that supports Ruby applications, along with several other languages and runtimes.
This is perferct since Jekyll happens to be a Ruby application.  As of this writing, Wercker is still advertised as
being in Beta status.  However, in my experience it's already running as a first class service, especially for the small
needs of my website.  Through Wercker, I was able to create a hook into my site's Bitbucket
repository.  Whenever I push changes, e.g. new posts or style updates, to my Bitbucket respository, Wercker is notified and kicks off a task that has Jekyll
build my site.  As long as the build succeeds, Wercker then kicks off a task to deploy the resulting site to Amazon S3.

##### Updating Amazon S3 & CloudFront Cache - [s3_website](http://github.com/laurilehmijoki/s3_website "s3-website Project Home")
The 's3\_website' Ruby gem helps manage updates to static websites hosted on Amazon S3 and can also expire content cached
with Amazon CloudFront.  Wercker's deployment task for my site simply executes the 's3\_website' gem telling it to update 
my site.  The target Amazon S3 bucket, deployment options, and caching options are specified via a configuration file in
my project's source.  Sensitive information, such as Amazon S3 credentials, are specified in the configuration file as 
references to environment variables.  Wercker allows the values of those environment variables to be securely configured 
application wide.  When the 's3\_website' gem is called at deploy time, the gem reads the configuration file and updates 
Amazon accordingly.

##### Static Website Hosting - [Amazon S3](http://aws.amazon.com/s3/ "Amazon Web Services S3 Home Page")
Amazon S3 (Simple Storage Service) allows almost any data to be stored in the Amazon cloud.  Data files placed into Amazon 
S3 are organized into buckets and given keys. The keys mimic paths in a traditional file structure.
Amazon allows a static website to be served from a S3 bucket simply by checking a configuration option on the bucket.  This 
is a quick, easy, and relatively inexpensive option to host a massively scalable static website.  Amazon S3 scales on 
demand to meet storage and workload needs, without requiring any administrative action.  It's worth noting that Amazon
  requires the use of their Route 53 DNS servers if you want to use a custom domain for a site hosted in an Amazon S3 bucket. 

##### Content Distribution Network - [Amazon CloudFront](http://aws.amazon.com/cloudfront/ "Amazon CloudFront Home Page")
This is, quite simply, the icing on the cake.  My static site could easily by hosted on S3 alone without using CloudFront.  However,
  using a CDN improves the site's response time for most visitors.  CloudFront caches a copy of the latest version of 
  my site at edge locations across the US and Europe.  When a visitor from one of those regions requests a page from my 
  site, their request is serviced quickly from a cache near their ISP's entry point. With the toggle of a configuration 
  option, I could easily have CloudFront cache my site at edge locations  all around the globe.  I choose not to do this
  in order to keep costs down since Amazon charges more for caching in other regions.  Also, the vast majority of my site's 
  visitors originate in either the US or Europe.
  
For more information on static website hosting with Amazon, see [Host a Static Website on Amazon Web Services](http://docs.aws.amazon.com/gettingstarted/latest/swh/website-hosting-intro.html "Link to Host a Static Website on Amazon Web Services")

### The End Result
Well, quite frankly, the end result is what you see here.  Adding new posts and updating content, is now
quick and painless.  I make the changes on my workstation and test them out locally.  When I'm happy, I push to my remote
Bitbucket repository and simply wait for the magic to happen.  Within a few minutes, my changes are published and are
live on this site.  I'm pretty happy with the process and the result.  There are some tweaks I'll be making here and there, 
but this will meet my needs for now.  I have a grand vision for the type of static site I would really like to generate, 
but that's a topic for another time.