Needed for any good project, especially on GitHub (Will automatically used to describe the project).

P.I.T.A. to write if you don´t know Markdown, but there´s a HTML <=> Markdown converter available.
Check: http://pandoc.org/getting-started.html

Better write a *.bat for it once you know how it works and put it on gitignore

Sample bat:

REM Paste the following into you own bat-file, stop after next "REM"
pandoc readme.html -f html -t markdown -s -o README.MD
REM Will convert readme.html (better formatting options for anyone who downloaded your project) to README.MD

Needs to be checked out and maybe manually corrected BEFORE uploading though:
Try: http://dillinger.io/
