<writing_block title="DIM-001 — Project Handover for Gemini" format="document"># DIM-001 — Project Handover

1. Project Overview

The project is DIM-001, a personalized Digital Interactive Memory created as a birthday gift for Joy Stephenie.

Brand: iDIM
Product: DIM
DIM means: Digital Interactive Memories.

The purpose of a DIM is to turn personal memories and messages into a small, interactive digital experience that can be opened through a shareable link.

This project is a personalized birthday experience, not a general-purpose mobile application.

2. Main Objective

Complete and deploy DIM-001 as a polished, mobile-first interactive birthday experience.

The experience should feel like a simulated smartphone containing familiar applications, personal memories, music, messages, surprises, and a final birthday reveal.

The experience should work through a web browser without requiring the recipient to install an application.

3. Recipient and Creative Direction

Recipient: Joy Stephenie
Occasion: Birthday
Birthday: 30 October 2026
Favorite colors: Blue and purple
Football team: Manchester United

The experience should be personal, playful, affectionate, surprising, and visually polished.

Avoid turning it into a generic birthday webpage.

4. Technical Approach

The project is being developed using HTML, CSS, and JavaScript.

The developer is learning these technologies and prefers to understand how the implementation works.

Development environment:

Visual Studio Code
GitHub repository
Browser-based testing
Mobile-browser testing using the laptop's local network where appropriate

Keep the existing architecture unless there is a clear technical reason to change it.

Do not rewrite the entire project without first inspecting the existing files.

5. Existing Experience and Planned Flow

The intended experience includes the following sequence:

Date-lock screen.
A playful verification question with a deliberately humorous interaction.
Simulated smartphone lock screen.
Swipe interaction to reach the passcode screen.
Six-digit passcode entry.
Successful-unlock animation with confetti and audio.
Birthday acknowledgement and Continue button.
Simulated smartphone home screen with interactive application cards.
Google Photos memory experience.
Spotify-inspired music experience.
Snapchat-inspired memories experience.
WhatsApp-inspired conversation experience.
Hidden surprise events triggered by application interactions.
A call-style birthday message.
A low-battery warning and simulated shutdown.
Final birthday reveal.

The verification question should be humorous. One answer should behave as the intended clickable answer, while an alternative button should move away when the recipient attempts to select it.

The exact implementation should be inspected in the repository before modifying this sequence.

6. Existing Application Features
Spotify

The Spotify-inspired experience is substantially implemented.

Existing features include:

Intro/banner
A collection of 21 songs
Now-playing interface
Automatic playback progression to the next song

Do not rebuild Spotify unless inspection identifies a genuine problem.

Snapchat

The Snapchat-inspired experience is substantially implemented.

Existing features include:

Inbox sender rows
Sender-specific image and video collections
Left/right navigation
Automatic advancement through images
Video progress based on duration
Automatic progression when a video finishes
Progress indicators

Manual skipping and image/video transitions have been tested.

Keep the existing implementation unless a real bug is discovered.

Google Photos

The Google Photos-inspired experience is currently being developed.

The interface includes:

Landing screen
Memories screen
Header and navigation buttons
Memory heading
Period and date information
Image viewer
Caption
Memory grid
Fullscreen memory viewer

Relevant CSS classes include:

.photos-screen
.photos-landing-screen
.photos-landing-content
.photos-memories-screen
.photos-topbar
.photos-content
.memory-container
.memory-heading
.memory-viewer
.memory-grid
.memory-grid-item
.memory-fullscreen-viewer
.viewer-photo-area
.viewer-memory-image
.viewer-memory-info
.viewer-period
.viewer-date
.viewer-caption

The current JavaScript contains a showMemory() function that reads data from memoryGridItems[currentMemoryIndex] and assigns the selected item's data-src, period, date, and caption to the fullscreen viewer.


Inspect the current HTML and JavaScript.

7. Planned WhatsApp Experience

The WhatsApp-inspired experience has not yet began edvelopment.

The intended experience should include a personalized conversation or birthday message.

A hidden message event should occur after the recipient opens WhatsApp and two additional applications.

The exact trigger logic must be inspected and integrated with the existing application navigation rather than implemented as an unrelated feature.

8. Hidden Events and Ending

Planned hidden events:

A mysterious message popup after WhatsApp and two additional applications have been opened.
A call-style birthday message after one additional application interaction.
The call ends.
A simulated battery warning showing 1% battery.
A simulated shutdown.
The final message: "HAPPY BIRTHDAY, JOY ❤️"

These are planned behaviors, not necessarily completed features. Inspect the repository to determine their actual implementation status.

9. Development Priorities

Work in this order:

Inspect the complete project and determine the real implementation status.
Implement the WhatsApp-inspired experience.
Implement and test hidden event triggers.
Implement the call-style reveal.
Implement the battery warning and shutdown.
Implement the final birthday reveal.
Integrate the complete flow.
Test the experience on a real phone.
Deploy and perform final checks.

The recipient's birthday is 30 October 2026. The original plan was to deploy on 28 October and perform the final phone test on 29 October. Reassess the schedule against the actual current date and remaining work.

10. Developer Preferences

The developer is a beginner in HTML, CSS, and JavaScript.

Follow these rules:

Inspect existing code before making changes.
Explain the cause of a bug before proposing a fix.
Prefer small, targeted edits over complete file replacements.
Avoid rebuilding features that already work.
Explain where each code change belongs.
Preserve working features and existing naming conventions.
Avoid unnecessary libraries, frameworks, or dependencies.
Keep the experience lightweight and mobile-first.
Test changes after implementation.
Do not assume that a feature is complete merely because it was described in the plan.
If information is missing, inspect the repository or ask a focused question instead of inventing an answer.
Clearly distinguish verified facts from assumptions.
11. First Task for Gemini

Start by inspecting the current repository.

Do not immediately modify the code.

First provide:

A concise summary of the current project structure.
The files responsible for the main experience and each application.
A status table distinguishing working, incomplete, broken, and unverified features.
Any dependencies or assets that may be missing.
A recommended implementation order based on the remaining deadline.


</writing_block>