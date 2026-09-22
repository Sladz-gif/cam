This directory holds the video file played by the `Play Video` button.

Drop an MP4 here named `sample.mp4` to use it, or edit
`src/components/VideoPlayer.tsx` to point `<source src="...">` at a different
path / remote URL. See the project README for details and royalty-free sample
video sources (Big Buck Bunny, Google sample bucket, etc).

This file intentionally left empty; browsers gracefully handle a missing MP4.
