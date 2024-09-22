/* eslint-disable react/prop-types */
import Youtube from "react-youtube";
import { useEffect, useRef, useState } from "react";
import {
  RiPlayLine,
  RiPauseFill,
  RiVolumeUpLine,
  RiVolumeMuteLine,
  RiSettings3Fill,
  RiHqFill,
  Ri4kFill,
  RiPauseCircleFill,
  RiPlayCircleFill,
  RiPlayCircleLine,
} from "@remixicon/react";
const YoutubePlayer = ({ videoId }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [Ismute, setIsMute] = useState(false);
  const [videoQuality, setVideoQuality] = useState([]);
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [currentQuality, setCurrentQuality] = useState("auto");
  const [loaded, setLoadded] = useState(0);
  const [isPause, setIsPause] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(100);
  const [hideMassege, setHideMassege] = useState(true);
  const [fistPlay, setFirstPlay] = useState(false);
  const videoQualityLevel = {
    hd2160: "2160 P",
    hd1440: "1440 P",
    hd1080: "1080 P",
    hd720: "720 P",
    large: "480 P",
    medium: "360 P",
    small: "244 P",
    tiny: "144P",
    auto: "auto",
  };
  const player = useRef();
  const timeLine = useRef();
  const volume = useRef();

  useEffect(() => {
    setHideMassege(false);

    setTimeout(() => {
      setHideMassege(true);
    }, 2000);
  }, [volumeLevel]);

  const getTimeUnite = (time) => {
    let total = time;
    let seconde = 0;
    let miunte = 0;
    let hour = 0;

    while (total > 0) {
      if (total < 60) {
        seconde = total;
        break;
      }
      total -= 60;
      miunte += 1;
      if (miunte == 60) {
        miunte = 0;
        hour += 1;
      }
    }

    return {
      hour: (hour.toString().length === 1 && "0") + Math.floor(hour),
      miunte: (miunte < 10 && "0") + Math.floor(miunte),
      seconde: (seconde < 10 && "0") + Math.floor(seconde),
    };
  };
  const changeStateHandle = (e) => {
    if (e.data === Youtube.PlayerState.PLAYING) {
      setIsPlaying(true);
      setIsPause(false);
      setFirstPlay(false);
      setInterval(() => {
        setCurrentTime(player.current.getCurrentTime());
      }, 1);
    } else {
      setIsPlaying(false);
      clearInterval();
    }
    if (e.data === Youtube.PlayerState.PAUSED) {
      setIsPause(true);
    }
  };

  const readyHandle = (e) => {
    player.current = e.target;
    setDuration(player.current.getDuration());
    setFirstPlay(true);
    setInterval(() => {
      setLoadded(player.current.getVideoLoadedFraction());
    }, 1000);
  };
  const playHandle = () => {
    setVideoQuality(player.current.getAvailableQualityLevels());
    setCurrentQuality(player.current.getPlaybackQuality());
  };
  const dragStart = () => {
    setIsDragging(true);
  };
  const dragEnd = () => {
    setIsDragging(false);
  };
  const dragging = (e, parent) => {
    const left = e.nativeEvent.offsetX;
    const width = parent.current.offsetWidth;
    const el1 = parent.current.children[0];
    if (parent === timeLine) {
      const el2 = parent.current.children[1];
      const time = (left / width) * duration;
      el2.innerHTML = `${getTimeUnite(time).hour}:${
        getTimeUnite(time).miunte
      }:${getTimeUnite(time).seconde}`;
      el2.style.left = left + "px";
    }
    if (!isDragging) {
      return;
    }
    e.preventDefault();
    el1.style.width = (left / width) * 100 + "%";
    if (parent == volume) {
      player.current.setVolume(Math.floor((left / width) * 100));
      setVolumeLevel(Math.floor((left / width) * 100));
    }
  };

  //chnage the time line on click
  const changeTimeline = (e, parent) => {
    const width = parent.current.offsetWidth;
    const left = e.nativeEvent.offsetX;
    const el = parent.current.children[0];
    if (parent === timeLine) {
      player.current.seekTo(Math.trunc((left / width) * duration));
    } else if (parent === volume) {
      setVolumeLevel(Math.floor((left / width) * 100));
      player.current.setVolume(Math.floor((left / width) * 100));
    }
    el.style.width = (left / width) * 100 + "%";
  };

  const playVideo = () => {
    player.current.playVideo();
  };
  const pauseVideo = () => {
    player.current.pauseVideo();
  };

  const muteVideo = () => {
    setIsMute(true);
    player.current.mute();
  };
  const unMuteVideo = () => {
    setIsMute(false);
    player.current.unMute();
  };
  const showQualityMenuHandling = () => {
    setShowQualityMenu((prev) => !prev);
  };
  const setQuality = (el) => {
    if (player.current) {
      player.current.setPlaybackQuality(el);
      console.log(el);
    }
  };
  return (
    <div className="YoutubePlayer">
      <Youtube
        videoId={videoId}
        opts={{
          playerVars: {
            controls: 0,
            rel: 0,
          },
        }}
        onStateChange={changeStateHandle}
        onReady={readyHandle}
        onPlay={playHandle}
      />
      <div className="control">
        <div
          className="timeline"
          onClick={(e) => changeTimeline(e, timeLine)}
          ref={timeLine}
          onMouseMove={(e) => dragging(e, timeLine)}
          onMouseDown={dragStart}
          onMouseUp={dragEnd}
          onMouseLeave={dragEnd}
        >
          <span
            className="timeline-inner"
            style={{ width: (Math.trunc(currentTime) / duration) * 100 + "%" }}
          ></span>
          <span className="time"></span>
          <span className="loaded" style={{ width: loaded * 100 + "%" }}></span>
        </div>
        <div className="bar">
          <div className="first">
            <div className={isPlaying ? "play isplay" : "play ispause"}>
              <RiPlayLine className="play-icon icon" onClick={playVideo} />
              <RiPauseFill className="pause-icon icon" onClick={pauseVideo} />
            </div>
            <div
              className={Ismute ? "volume-control mute" : "volume-control up"}
            >
              <RiVolumeMuteLine
                className="mute-icon icon"
                onClick={unMuteVideo}
              />
              <RiVolumeUpLine className="up-icon icon" onClick={muteVideo} />
              <div
                className="volume"
                ref={volume}
                onClick={(e) => changeTimeline(e, volume)}
                onMouseMove={(e) => dragging(e, volume)}
                onMouseDown={dragStart}
                onMouseUp={dragEnd}
                onMouseLeave={dragEnd}
              >
                <span></span>
              </div>
            </div>
            <div className="time">
              <span>
                {getTimeUnite(currentTime).hour}:
                {getTimeUnite(currentTime).miunte}:
                {getTimeUnite(currentTime).seconde}
              </span>
              /
              <span>
                {getTimeUnite(duration).hour}:{getTimeUnite(duration).miunte}:
                {getTimeUnite(duration).seconde}
              </span>
            </div>
          </div>
          <div className="last">
            <div className="video-quality">
              <RiSettings3Fill
                color="white"
                onClick={showQualityMenuHandling}
                className={showQualityMenu && "icon active"}
              />
              <ul className={showQualityMenu && "active"}>
                {videoQuality?.map((el) => (
                  <li
                    key={el}
                    className={currentQuality == el && "active"}
                    onClick={() => setQuality(el)}
                  >
                    {el === "hd1080" && <RiHqFill className="icon" />}
                    {el === "hd1440" && <Ri4kFill className="icon" />}
                    {videoQualityLevel[el]}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <RiPauseCircleFill
        className="pause-icon"
        style={{ display: isPause && "block" }}
        onClick={playVideo}
      />
      <RiPlayCircleLine
        className="play-icon"
        style={{ display: fistPlay && "block" }}
        onClick={playVideo}
      />
      <div className="volume-level" style={{ display: hideMassege && "none" }}>
        Volume : {volumeLevel}
      </div>
    </div>
  );
};

export default YoutubePlayer;
