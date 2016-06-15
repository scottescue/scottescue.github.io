---
layout: post
title: SOLVED - Java instance does not support a 32-bit JVM
subtitle: Encountered when running Glassfish 3 from IntelliJ on OS X... just in case I'm not the only sorry soul still using Glassfish 3 and old JDKs
---

I installed a fresh copy of Glassfish 3 awhile back to work on a client's application.  Both the installation and IntelliJ
configuration were a piece of cake.  But as soon as I attempted to deploy the app and fire up Glassfish, I was greeted with
this warm welcome in my server log, "<i>Java instance does not support a 32-bit JVM</i>."

<!--more-->

What!?  Go home Glassfish you're drunk!  I tried deploying and running the application a few more times from IntelliJ, but
with the same result.  (Surely trying the same thing over and over again is bound to work eventually?)  So then I found
the application server's bin directory and tried launching the server with the <i>startserv</i> script.  Much to my surprise
the server launched without error and served up my application.  Well, crap, surely my trusty IntelliJ isn't letting me down?
Upon inspecting the Glassfish configuration in IntelliJ I noticed that IntelliJ launches the server using the <i>asadmin</i>
utility, rather than <i>startserv</i>.  Sure enough, when I went back to the command line and tried to launch Glassfish
using the <i>asadmin</i> utility I received the same error.


### Problem

It turns out there's a small inconsistency between how the _asadmin_ utility and the _startserv_ script resolve the
_java_ executable.  Take a look at this first snippet from _asadmin_.  You can see that admin-cli.jar is
eventually launched using the _java_ executable referenced by the JAVA variable.  The JAVA variable is initialized to point
to the _java_ executable found on the PATH.  However, if the AS\_JAVA variable is set then the
script overrides the executable from the PATH with the executable found under the location specified in AS\_JAVA.

##### asadmin
{% highlight bash linenos %}
...
JAVA=java
#Depends upon Java from ../config/asenv.conf
if [ ${AS_JAVA} ]; then
    JAVA=${AS_JAVA}/bin/java
fi
exec "$JAVA" -jar "$AS_INSTALL_LIB/admin-cli.jar" "$@"                     
{% endhighlight %}

If you take a look at this next snippet from the _startserv_ script you'll notice that it also ultimately launches the
admin-cli.jar file.  However, in this case the script simply launches the jar using the _java_ executable found
on the PATH without ever checking the AS\_JAVA variable.

##### startserv
{% highlight bash linenos %}
...
AS_INSTALL=`dirname "$0"`/..
AS_INSTALL_LIB="$AS_INSTALL/modules"

exec java -jar "$AS_INSTALL_LIB/admin-cli.jar" start-domain --verbose "$@"
{% endhighlight %}

So what's the path found in AS\_JAVA and where is it initialized?  It just so happens that _asadmin_ pulls that variable, and
many others, from the asenv.conf file.  In my case, the problem was the JDK referred to on line 9 of this _asenv.conf_
snippet.  As the error implied, this JDK did not support a 32 bit JVM instance.

##### asenv.conf
{% highlight bash linenos %}
...
AS_IMQ_LIB="../../mq/lib"
AS_IMQ_BIN="../../mq/bin"
AS_CONFIG="../config"
AS_INSTALL=".."
AS_DEF_DOMAINS_PATH="../domains"
AS_DEF_NODES_PATH="../nodes"
AS_DERBY_INSTALL="../../javadb"
AS_JAVA=/System/Library/Java/JavaVirtualMachines/1.6.0.jdk/Contents/Home
{% endhighlight %}


### Solution

In my case the solution was pretty simple.  I already had a separate Java 7 installation that was available on the PATH, so
I simply commented out the AS\_JAVA assignment in _asenv.conf_.  That prevented the _java_ executable found on the PATH
from being overridden, allowing the _asadmin_ utility to use the same Java 7 installation as _startserv_ without requiring any
modification to the _asadmin_ script.

If you don't already have another JDK installation that supports a 32 bit JVM, you'll need to hunt one down and
install it.  Assuming you want to make that new JDK available on your path, you can use the same solution I did.  Otherwise,
you can update the AS\_JAVA variable in _asenv.conf_ to point to your new installation.  Now you either need to
avoid using _startserv_ altogether, or modify the _startserv_ script to look for the overriding JDK defined in
_asenv.conf_.  I'm not covering Bash-Fu, so you're on your own to make that happen.