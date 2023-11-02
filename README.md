# Flight Rising Embed
## A fix for Flight Rising dragon profile embeds on Discord

### Example
<img src="sashimidemo.png">

Review the code [here](proofofconcept.html). Redirection not implemented yet.

### Initial disclaimer
This project is currently in the proof of concept stage and will not be "deployed" for public use before sending a support ticket to ask Flight Rising's team for permission, eventually consulting the community about their suggestions/concerns, and hopefully reaching out to Flight Rising's team a second time to allow them to audit the "release candidate" code before deployment. As I hope to make clear in the [Mission Statement](#mission-statement) section of this writeup, I do not intend to break point 13 of the "Conduct" section of the [Flight Rising Terms of Use](https://flightrising.com/main.php?p=wiki&article=81), and I will take all the steps necessary to reduce this tool's load on Flight Rising's servers before making it publicly accessible.

All of the data gathering necessary to make this tool functional would be achieved by reading the plaintext contents of specific sections of a dragon profile's raw HTML file. As I describe in the ["How it would work"](#how-it-would-work) section of this file, there would be no reverse engineering done to Flight Rising's code or servers, and the tool would not make any more requests, get any more information, or need any more bandwidth than a logged-out user would/could by browsing the site normally.

### Mission statement
As of 2023-10-28, Discord does not embed Flight Rising dragon profile links. While Flight Rising does provide the necessary meta tags for embeds in other platforms, it does not provide the ones necessary for Discord's significantly flawed embed parsing. Regardless, the embed information Flight Rising does provide seems more geared towards hopefully attracting new players to the game (a good thing!) rather than providing useful information for the already established playerbase (which would be good for other reasons!).

This tool hopes to solve the issues with Discord embeds *and* provide useful information to players by giving them the option to embed a card with information they would normally have to copy manually, such as the dragon's image and genes, right in Discord. This would, at the very least, represent a quality-of-life improvement for the dedicated portion of Flight Rising's playerbase that coordinates dragon sales through community Discord servers; and, in the best-case scenario, I believe it could even slightly reduce load on the FR servers by making it unnecessary for multiple players to click the link (and load the entire site) just to check a dragon's genes and/or colors.

While I understand there are safety issues with players coordinating off-site, current on-site messaging features are better geared for asynchronous communication, and implementing on-site instant messaging would cause enough infrastructure and moderation issues that it is (understandably) probably not too high on the developers' priorities list: this creates a situation where players that need instant communication turn to platforms such as Skype or Discord to bridge this gap. Ideally, players would be able to hold these conversations on-site where they can be properly moderated, but as long as there are no on-site replacements for these real-time chatrooms, players will keep using Discord and other external services, which in turn makes tools such as this one necessary (or at least useful) to improve a significant portion of the playerbase's user experience.

### How it would work

The tool will generate an empty redirect page and automatically fill in its meta tags on-demand using information extracted from a dragon profile's raw HTML file (See [here](fetch.js) for a quick proof-of-concept of how this data can be extracted).  This condenses all of the required "scraping" into two HTTP GET requests: one for the raw HTML file (~300kb), and one for the thumbnail image (~150kb), which should be more efficient than, for instance, a player loading the entire website (up to ~4.5mb of bandwidth, in my tests) to get the same information. Moreover, thanks to Discord's aggressive caching of embed thumbnails, these requests would only be necessary roughly once every 30 minutes until the embed card leaves all users' viewports: ideally, this would mean hundreds of users could be served by these same two requests! I currently intend to rely on Discord's caching but, in case it proves insufficient to avoid the possibility of overloading FR servers with these requests, I would adjust accordingly and take the necessary steps to handle caching wherever I host the tool.

Players would use the tool by editing a Flight Rising dragon profile URL so it leads into the redirect page instead. This could be done manually by them adding a prefix to the URL, by manually changing the entire URL into something else, or by using a sed command such as `s/in/g`. For example, for the dragon show above, users would turn a link such as `https://www1.flightrising.com/dragon/89904359` into `https://[TOOL'S DOMAIN]/dragon/09904359`. This workflow draws inspiration from [BetterTwitFix](https://github.com/dylanpdx/BetterTwitFix/), a privacy-first tool created to improve Twitter/X post embedding on Discord, and it is designed to be easy to learn and understand for users who are already familiar with BetterTwitFix or similar services.

After users edit the dragon profile URL, Discord would query the new URL's meta tags to know how/whether to embed its contents, which would trigger the tool's server to generate the redirect page and provide Discord with the meta tags necessary to generate an embed that looks like the one in the "demo" section of this README. If a player were interested in viewing the dragon's in-game profile and decided to click the tool's link, they would be instantly redirected to the original `www1.flightrising.com` URL upon clicking the edited link. This redirection would be instantaneous, and the redirect page's `<body>` tag would be completely empty every single time: players would not see any third party content unrelated to the game or otherwise not under control of Flight Rising, and most definitely not anything indicating this is anything but a third-party tool with no association to Flight Rising or Stormlight Workshop LLC. 

### Privacy and good faith disclaimer
Ideally, this tool would use Cloudflare Workers, and thus it would only be able to run when users requested information. It would not have persistent memory, a database, or even a filesystem to read from at all. No one, including me, would have a record of the dragon profiles (or the contents thereof) being requested through the tool.

Players would only be able to use this tool for dragon profiles they already "have access" to. That is to say: it would not scrape dragon profiles it was not specifically asked for, and there would be no way to use it to monitor new dragon IDs for whatever reason; as such, it would not enable players to harass others by automatically scraping data from their lairs, and its base code would not include any features that would make this malicious "use case".

All of the tool's code would be publicly available on this repository, to enable players to audit and improve its code as they see fit. Absolutely no part of the process would be a "black box", and users would be encouraged to check the code themselves to verify it is in fact safe to use it to generate embed cards for their dragons.

The tool, then, will only function as a forwarder. It will not request or store any information that is not already available to logged-out users visiting Flight Rising's website. It will *not* have a frontend, it will *not* store any logs, it will *not* host any persistent information, and there will *not* be any fields where users could even theoretically input their account credentials by mistake. Therefore, it would not be possible for it to be used to steal account information or for any malicious purposes either by me or a third party.

My intent with creating this tool is just to give back to a community that has been nothing but delightful to me since I joined, and to hopefully improve a lot of people's experiences when talking about our favorite dragon png website. This project is made in good faith and no breach of the Flight Rising Terms of Use or Stormlight Workshop LLC's copyright over Flight Rising is intended.

### Takedowns?
*I will comply with any takedown requests by Stormlight Workshop LLC if they consider that this tool breaks Flight Rising's Terms of Use.*

I would, however, like to use this opportunity to kindly request a chance to discuss this with FR's Engineering team before such a request is issued, as this project is done completely in good faith and I genuinely believe it could represent a significative quality-of-life improvement for a big part of Flight Rising's community. At the very least, I would like to ask that no punitive actions are taken against me or my partner's account, with whom I share an IP address, since no actions have been taken yet.

Thanks for your time and consideration!

### Copyright
Flight Rising is © 2013 - 2023 Stormlight Workshop, LLC. All Rights Reserved to Stormlight Workshop.

The code contained in this repository is licensed under the Opinionated Queer License v1.1.
