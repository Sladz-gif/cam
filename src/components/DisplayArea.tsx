'use client';

import dynamic from 'next/dynamic';

export type ViewType = 'date' | 'feed';

export type LocationType = 'Birim' | 'Koforidua' | 'Tinga' | 'Sefwi' | 'Tarkwa';

export interface DisplayAreaProps {
  activeView: ViewType;
  selectedLocationIdx: number;
  selectedCameraIdx: number;
  pickedDateIso: string;
  playOpen: boolean;
  viewerOpen: boolean;
  viewerLocationIdx: number;
  viewerFeedIdx: number | null;
  feedSelectionVersion: number;
  onClosePlay: () => void;
  onConfirmPlay: () => void;
  onCloseViewer: () => void;
  onViewerSelectLocation: (idx: number) => void;
  onViewerBack: () => void;
  onViewerSelectFeed: (idx: number) => void;
  onPickDateFromSidebar: (iso: string) => void;
}

const DateDisplay = dynamic(() => import('@/components/DateDisplay'), {
  ssr: false,
});
const LocationFeed = dynamic(() => import('@/components/LocationFeed'), {
  ssr: false,
});

function renderView(props: DisplayAreaProps): React.ReactNode {
  return (
    <LocationFeed
      key={props.feedSelectionVersion}
      locationIdx={props.selectedLocationIdx}
      cameraIdx={props.selectedCameraIdx}
    />
  );
}

export default function DisplayArea(props: DisplayAreaProps) {
  return (
    <div
      className="
        relative
        w-full
        h-full
        min-h-0
        flex
        flex-col
        rounded-[14px]
        sm:rounded-[16px]
        shadow-[
          0_1px_0_rgba(255,255,255,0.75),
          inset_0_0_0_1px_rgba(15,23,42,0.12),
          0_10px_30px_-14px_rgba(15,23,42,0.4),
          inset_0_2px_0_rgba(255,255,255,0.4),
          inset_0_-2px_0_rgba(15,23,42,0.1)
        ]
        bg-gradient-to-b from-[#273449] via-[#1c2638] to-[#0f172a]
        p-[5px]
        sm:p-2
        md:p-2.5
      "
      aria-label="Display area"
      role="region"
    >
      <div
        className="
          relative
          w-full
          flex-1
          min-h-0
          rounded-[10px]
          sm:rounded-[12px]
          overflow-hidden
          screen
          screen-glow
          flex
          flex-col
        "
      >
        <div
          key={props.activeView}
          className="
            relative
            w-full
            flex-1
            min-h-0
            flex
            flex-col
          "
        >
          {renderView(props)}
        </div>

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            scanlines
            z-10
          "
          aria-hidden="true"
        />

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            vignette
            z-20
          "
          aria-hidden="true"
        />

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            crt-curve
            z-[22]
          "
          aria-hidden="true"
        />

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            screen-noise
            z-[23]
          "
          aria-hidden="true"
        />

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            screen-reflection
            z-[24]
          "
          aria-hidden="true"
        />

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            screen-flicker
            z-[25]
          "
          aria-hidden="true"
        />

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            rgb-shift
            z-[26]
          "
          aria-hidden="true"
        />
      </div>

      <DateDisplay
        pickedDateIso={props.pickedDateIso}
        onPickDateChange={props.onPickDateFromSidebar}
        playOpen={props.playOpen}
        viewerOpen={props.viewerOpen}
        viewerLocationIdx={props.viewerLocationIdx}
        viewerFeedIdx={props.viewerFeedIdx}
        onClosePlay={props.onClosePlay}
        onConfirmPlay={props.onConfirmPlay}
        onCloseViewer={props.onCloseViewer}
        onViewerSelectLocation={props.onViewerSelectLocation}
        onViewerBack={props.onViewerBack}
        onViewerSelectFeed={props.onViewerSelectFeed}
        hideMainPanel={true}
      />
    </div>
  );
}
