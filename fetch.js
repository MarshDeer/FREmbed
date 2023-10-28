// This is an extremely rough script I wrote to check whether it was possible to get all the necessary information by reading the raw /dragon/ID.html file and nothing else.
// It does not necessarily represent the exact code I would use on a final version (I would probably use Python, for one), but I'm sharing it to show how all data in use is publicly available to logged-out users and all parsing can be done client-side with a single request to FR servers
// To try it out, review the code under this line and, if satisfied with its security, run it in your browser's console :3

// -------------------- CODE STARTS HERE --------------------

// Info fetching 
  // Breed info
    var drag_name = document.querySelector("h1").textContent // Name is taken from the header
    var drag_id = document.querySelector(".dragon-profile-header-number").textContent // ID is taken from the header
    var drag_sex = document.querySelector("#dragon-profile-icon-sex-tooltip strong").textContent // Sex is taken from the tooltip you get when hovering the icon under the energy bar
    var drag_breed = document.querySelector("#dragon-profile-physical .common-column:nth-of-type(2) .dragon-profile-stats:nth-of-type(2) .dragon-profile-stat-icon-value strong").textContent // Breed is taken from the Physical Attributes tab
    var drag_age = document.querySelector("#dragon-profile-physical .common-column:nth-of-type(2) .dragon-profile-stats:nth-of-type(2) .dragon-profile-stat-icon-value").textContent.replace(drag_breed,'').trim() // Age is taken from the Physical Attributes tab
  // Gene info is all taken from the Physical Attributes tab
    // Inheritable genes
      // Primary
        var prim_gene = document.querySelector("#dragon-profile-primary-gene strong").textContent
        var prim_color = document.querySelector("#dragon-profile-primary-gene").textContent.replace(prim_gene,'')
      // Secondary
        var secd_gene = document.querySelector("#dragon-profile-secondary-gene strong").textContent
        var secd_color = document.querySelector("#dragon-profile-secondary-gene").textContent.replace(secd_gene,'')
      // Tertiary
        var tert_gene = document.querySelector("#dragon-profile-tertiary-gene strong").textContent
        var tert_color = document.querySelector("#dragon-profile-tertiary-gene").textContent.replace(tert_gene,'')
      // Eyes
        var eyes_gene = document.querySelector("#dragon-profile-physical .common-column:nth-of-type(2) .dragon-profile-stats:nth-of-type(3) .dragon-profile-stat-icon-value strong").textContent
        var eyes_color = document.querySelector("#dragon-profile-physical .common-column:nth-of-type(2) .dragon-profile-stats:nth-of-type(3) .dragon-profile-stat-icon-value").textContent.replace(eyes_gene,'').trim()
  // Thumbnail URL
    var thumb_url = document.querySelector("#dragon-profile-dragon-frame img").src
    var thumb_url = thumb_url.substring(0, thumb_url.indexOf('?')); // the ?mtime query string doesn't seem to be required? I trim it just in case it could cause issues

// Render info into browser console output
  // Dragon stats
    console.log(
      "🐉📛:", drag_name, drag_id, "\n",
      "🐉🥚:", drag_age, drag_sex, drag_breed, "\n",
      "🧬1️⃣:", prim_gene, "|", prim_color, "\n",
      "🧬2️⃣:", secd_gene, "|", secd_color, "\n",
      "🧬3️⃣:", tert_gene, "|", tert_color, "\n",
      "🧬👀: ", eyes_gene, "|", eyes_color
    )
  // Thumbnail URL
    console.log(
      "Thumbnail url:", thumb_url
    )
